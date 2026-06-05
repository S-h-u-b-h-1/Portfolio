import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
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
const LANGGRAPH_SOURCE = "langgraph-langchain";
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

const AssistantGraphState = Annotation.Root({
  question: Annotation<string>(),
  answer: Annotation<string>(),
  provider: Annotation<"openai-compatible" | "gemini">()
});

type AssistantGraph = ReturnType<typeof buildAssistantGraph>;

let cachedAssistantGraph: AssistantGraph | undefined;

export async function createChatResponse(message: string): Promise<ChatResponse> {
  const trimmedMessage = message.trim();
  const shouldUseRemoteProvider = env.AI_PROVIDER !== "local" && Boolean(env.AI_API_KEY);

  let response: ChatResponse;

  if (shouldUseRemoteProvider) {
    response = await createProviderResponse(trimmedMessage).catch(async () => {
      return toChatResponse(createLocalResponse(trimmedMessage));
    });
  } else {
    response = toChatResponse(createLocalResponse(trimmedMessage));
  }

  prisma.chatLog
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
  const provider = shouldUseGeminiNativeApi() ? "gemini" : "openai-compatible";
  const graph = getAssistantGraph();
  const result = await withTimeout(
    graph.invoke({
      question: message,
      answer: "",
      provider
    }),
    env.AI_TIMEOUT_MS
  );

  return {
    answer: result.answer?.trim() || UNVERIFIED_FALLBACK,
    source: "ai-provider",
    provider,
    sources: [KNOWLEDGE_SOURCE, LANGGRAPH_SOURCE, provider === "gemini" ? "langchain-google-genai" : "langchain-openai"]
  };
}

function shouldUseGeminiNativeApi() {
  return (
    env.AI_PROVIDER === "gemini" ||
    (env.AI_BASE_URL.includes("generativelanguage.googleapis.com") && !env.AI_BASE_URL.includes("/openai"))
  );
}

function createSystemPrompt() {
  return [
    "You are Ask Shubhaang AI, a friendly and professional portfolio assistant for Shubhaang Kataruka.",
    "Your primary purpose is to answer questions about Shubhaang's profile, experience, projects, and achievements.",
    "",
    "CONVERSATION GUIDELINES:",
    "- Respond naturally to greetings (hello, hi, hey, etc.) with a friendly introduction and offer to help.",
    "- For small talk or casual questions, respond briefly and professionally, then pivot to Shubhaang-related topics.",
    "- For questions about Shubhaang's profile: Use the verified knowledge provided below. Be accurate and professional.",
    "- Do not invent facts, links, employers, dates, metrics, credentials, or contact details not in the knowledge base.",
    "- Keep answers concise, engaging, and recruiter-friendly.",
    "- If a specific profile question is not in the knowledge base, say: 'I do not have verified information about that yet.'",
    "- Focus on AI/ML, data analytics, software engineering, projects, internships, education, and technical achievements.",
    "",
    "VERIFIED PROFILE KNOWLEDGE:",
    JSON.stringify(shubhaangKnowledge, null, 2)
  ].join("\n\n");
}

function getAssistantGraph() {
  cachedAssistantGraph ??= buildAssistantGraph();
  return cachedAssistantGraph;
}

function buildAssistantGraph() {
  const chatModel = createLangChainChatModel();

  async function generateAnswer(state: typeof AssistantGraphState.State) {
    const response = await chatModel.invoke([
      new SystemMessage(createSystemPrompt()),
      new HumanMessage(state.question)
    ]);

    return {
      answer: readMessageContent(response.content)
    };
  }

  return new StateGraph(AssistantGraphState)
    .addNode("generate_answer", generateAnswer)
    .addEdge(START, "generate_answer")
    .addEdge("generate_answer", END)
    .compile();
}

function createLangChainChatModel(): BaseChatModel {
  if (shouldUseGeminiNativeApi()) {
    return new ChatGoogleGenerativeAI({
      model: env.AI_MODEL,
      apiKey: env.AI_API_KEY,
      temperature: 0.2,
      maxOutputTokens: 420,
      maxRetries: 0
    });
  }

  return new ChatOpenAI({
    model: env.AI_MODEL,
    apiKey: env.AI_API_KEY,
    temperature: 0.2,
    maxTokens: 420,
    maxRetries: 0,
    timeout: env.AI_TIMEOUT_MS,
    configuration: {
      baseURL: env.AI_BASE_URL
    }
  });
}

function readMessageContent(content: AIMessage["content"]) {
  if (typeof content === "string") {
    return content.trim();
  }

  return content
    .map((part) => {
      if (typeof part === "string") {
        return part;
      }

      return "text" in part && typeof part.text === "string" ? part.text : "";
    })
    .join("")
    .trim();
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timeoutId = setTimeout(() => reject(new Error("AI provider timed out.")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
