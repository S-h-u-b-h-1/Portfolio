import { env } from "../config/env";
import { shubhaangKnowledge, UNVERIFIED_FALLBACK, type KnowledgeResponse } from "../data/shubhaangKnowledge";
import { prisma } from "../utils/prisma";

type ChatResponse = {
  answer: string;
  source: "local-knowledge" | "ai-provider";
  provider: "local" | "openai-compatible";
  sources: string[];
};

type LocalChatResponse = ChatResponse & {
  isMatched: boolean;
};

export async function createChatResponse(message: string): Promise<ChatResponse> {
  const trimmedMessage = message.trim();
  const localResponse = createLocalResponse(trimmedMessage);
  const shouldUseRemoteProvider = Boolean(env.AI_API_KEY);

  const response = shouldUseRemoteProvider
    ? await createOpenAICompatibleResponse(trimmedMessage).catch(() => toChatResponse(localResponse))
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
    sources: ["local-knowledge-base"]
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

function findBestLocalAnswer(normalizedMessage: string): KnowledgeResponse | undefined {
  let bestMatch: { response: KnowledgeResponse; score: number } | undefined;

  for (const response of shubhaangKnowledge.responses) {
    const score = response.keywords.reduce((currentScore, keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      return normalizedMessage.includes(normalizedKeyword) ? currentScore + normalizedKeyword.split(" ").length : currentScore;
    }, 0);

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { response, score };
    }
  }

  return bestMatch?.response;
}

async function createOpenAICompatibleResponse(message: string): Promise<ChatResponse> {
  const systemPrompt = [
    "You are Ask Shubhaang AI, a portfolio assistant for Shubhaang Kataruka.",
    "Answer only using the verified profile knowledge provided below.",
    "Do not invent facts.",
    "Keep answers concise, professional, and recruiter-friendly.",
    `If the answer is not in the knowledge base, say exactly: ${UNVERIFIED_FALLBACK}`,
    "Focus on Shubhaang's AI, data analytics, software engineering, projects, internships, education, and technical achievements.",
    "Do not over-emphasize non-tech achievements unless directly asked.",
    JSON.stringify(shubhaangKnowledge)
  ].join("\n\n");

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
    sources: ["local-knowledge-base", "openai-compatible-provider"]
  };
}
