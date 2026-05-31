import knowledgeBase from "../data/knowledge-base.json";
import { env } from "../config/env";
import { prisma } from "../utils/prisma";

type ChatResponse = {
  answer: string;
  provider: "local" | "openai-compatible";
  sources: string[];
};

type KnowledgeAnswer = {
  question: string;
  keywords: string[];
  answer: string;
};

type LocalChatResponse = ChatResponse & {
  isMatched: boolean;
};

const UNVERIFIED_FALLBACK = "I don’t have verified information about that yet.";

export async function createChatResponse(question: string): Promise<ChatResponse> {
  const trimmedQuestion = question.trim();
  const localResponse = createLocalResponse(trimmedQuestion);
  const shouldUseRemoteProvider = !localResponse.isMatched && Boolean(env.OPENAI_API_KEY);

  const response = shouldUseRemoteProvider
    ? await createOpenAICompatibleResponse(trimmedQuestion).catch(() => toChatResponse(localResponse))
    : toChatResponse(localResponse);

  await prisma.chatLog
    .create({
      data: {
        question: trimmedQuestion,
        answer: response.answer,
        provider: response.provider,
        sources: response.sources
      }
    })
    .catch(() => undefined);

  return response;
}

function createLocalResponse(question: string): LocalChatResponse {
  const normalizedQuestion = question.toLowerCase();
  const answers = knowledgeBase.answers as KnowledgeAnswer[];

  const matchedAnswer = answers.find((entry) =>
    entry.keywords.some((keyword) => normalizedQuestion.includes(keyword.toLowerCase()))
  );

  return {
    answer: matchedAnswer?.answer ?? UNVERIFIED_FALLBACK,
    isMatched: Boolean(matchedAnswer),
    provider: "local",
    sources: ["local-knowledge-base"]
  };
}

function toChatResponse(response: LocalChatResponse): ChatResponse {
  return {
    answer: response.answer,
    provider: response.provider,
    sources: response.sources
  };
}

async function createOpenAICompatibleResponse(question: string): Promise<ChatResponse> {
  const systemPrompt = [
    "You are Ask Shubhaang AI, a portfolio assistant for Shubhaang Kataruka.",
    "Answer only from the provided knowledge base.",
    `If the answer is not in the knowledge base, say exactly: ${UNVERIFIED_FALLBACK}`,
    "Do not invent links, dates, employers, metrics, credentials, or personal details.",
    JSON.stringify(knowledgeBase)
  ].join("\n\n");

  const response = await fetch(`${env.OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question }
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
    provider: "openai-compatible",
    sources: ["local-knowledge-base", "openai-compatible-provider"]
  };
}
