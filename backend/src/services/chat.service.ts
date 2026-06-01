import { env } from "../config/env";
import { shubhaangKnowledge, UNVERIFIED_FALLBACK, type KnowledgeResponse } from "../data/shubhaangKnowledge";
import { prisma } from "../utils/prisma";

type ChatResponse = {
  answer: string;
  source: "local-knowledge" | "ai-provider";
  provider: "local" | "openai-compatible" | "gemini";
  sources: string[];
};

type LocalChatResponse = ChatResponse & {
  isMatched: boolean;
};

const KNOWLEDGE_SOURCE = "verified-portfolio-knowledge";
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "about",
  "for",
  "has",
  "have",
  "his",
  "is",
  "me",
  "of",
  "on",
  "the",
  "to",
  "what",
  "which",
  "who",
  "why"
]);

export async function createChatResponse(message: string): Promise<ChatResponse> {
  const trimmedMessage = message.trim();
  const localResponse = createLocalResponse(trimmedMessage);
  const shouldUseRemoteProvider = env.AI_PROVIDER !== "local" && Boolean(env.AI_API_KEY);

  const response = shouldUseRemoteProvider
    ? await createProviderResponse(trimmedMessage).catch(() => toChatResponse(localResponse))
    : toChatResponse(localResponse);

  await prisma.chatLog
    .create({
      data: {
        question: trimmedMessage,
        answer: response.answer,
        provider: response.provider,
        sources: response.sources
      }
    })
    .catch(() => undefined);

  return response;
}

function createLocalResponse(message: string): LocalChatResponse {
  const normalizedMessage = normalizeText(message);
  const matchedAnswer = findBestLocalAnswer(normalizedMessage);

  return {
    answer: matchedAnswer?.answer ?? UNVERIFIED_FALLBACK,
    isMatched: Boolean(matchedAnswer),
    source: "local-knowledge",
    provider: "local",
    sources: [KNOWLEDGE_SOURCE]
  };
}

function toChatResponse(response: LocalChatResponse): ChatResponse {
  return {
    answer: response.answer,
    source: response.source,
    provider: response.provider,
    sources: response.sources
  };
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^\w\s+#/-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function findBestLocalAnswer(normalizedMessage: string): KnowledgeResponse | undefined {
  let bestMatch: { response: KnowledgeResponse; score: number } | undefined;
  const messageTokens = new Set(tokenize(normalizedMessage));

  for (const response of shubhaangKnowledge.responses) {
    const keywordScore = response.keywords.reduce((currentScore, keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      const keywordTokens = tokenize(normalizedKeyword);

      if (normalizedMessage.includes(normalizedKeyword)) {
        return currentScore + 8 + keywordTokens.length;
      }

      const overlapCount = keywordTokens.filter((token) => messageTokens.has(token)).length;
      if (keywordTokens.length > 1 && overlapCount === keywordTokens.length) {
        return currentScore + 5 + overlapCount;
      }

      return currentScore + overlapCount;
    }, 0);

    const questionTokenScore = tokenize(response.question).filter((token) => messageTokens.has(token)).length;
    const score = keywordScore + questionTokenScore;

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { response, score };
    }
  }

  return bestMatch && bestMatch.score >= 2 ? bestMatch.response : undefined;
}

async function createProviderResponse(message: string): Promise<ChatResponse> {
  if (shouldUseGeminiNativeApi()) {
    return createGeminiResponse(message);
  }

  return createOpenAICompatibleResponse(message);
}

function shouldUseGeminiNativeApi() {
  return (
    env.AI_PROVIDER === "gemini" ||
    (env.AI_BASE_URL.includes("generativelanguage.googleapis.com") && !env.AI_BASE_URL.includes("/openai"))
  );
}

function createSystemPrompt() {
  return [
    "You are Ask Shubhaang AI, a portfolio assistant for Shubhaang Kataruka.",
    "Answer only using the verified profile knowledge provided below.",
    "Do not invent facts, links, employers, dates, metrics, credentials, or contact details.",
    "Keep answers concise, professional, and recruiter-friendly.",
    `If the answer is not in the knowledge base, say exactly: ${UNVERIFIED_FALLBACK}`,
    "Focus on Shubhaang's AI, data analytics, software engineering, projects, internships, education, and technical achievements.",
    "Do not over-emphasize non-tech achievements unless directly asked.",
    "Verified profile knowledge:",
    JSON.stringify(shubhaangKnowledge, null, 2)
  ].join("\n\n");
}

function readGeminiText(payload: {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
}) {
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text).filter(Boolean).join("").trim();
}

async function createOpenAICompatibleResponse(message: string): Promise<ChatResponse> {
  const systemPrompt = createSystemPrompt();

  const response = await fetch(`${env.AI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.AI_API_KEY}`
    },
    body: JSON.stringify({
      model: env.AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    throw new Error(`AI provider failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return {
    answer: payload.choices?.[0]?.message?.content?.trim() ?? UNVERIFIED_FALLBACK,
    source: "ai-provider",
    provider: "openai-compatible",
    sources: [KNOWLEDGE_SOURCE, "openai-compatible-provider"]
  };
}

async function createGeminiResponse(message: string): Promise<ChatResponse> {
  const response = await fetch(`${env.AI_BASE_URL}/models/${env.AI_MODEL}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": env.AI_API_KEY ?? ""
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: createSystemPrompt() }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: message }]
        }
      ],
      generationConfig: {
        temperature: 0.2
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini provider failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return {
    answer: readGeminiText(payload) ?? UNVERIFIED_FALLBACK,
    source: "ai-provider",
    provider: "gemini",
    sources: [KNOWLEDGE_SOURCE, "gemini-provider"]
  };
}
