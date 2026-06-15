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
const PRIVATE_FAMILY_TOKENS = new Set(["parents", "parent", "father", "mother", "family", "dad", "mom"]);
const PRIVATE_FAMILY_RESPONSE_ID = "private-family-info";

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
  if (isPrivateFamilyQuestion(normalizedMessage)) {
    return shubhaangKnowledge.responses.find((response) => response.id === PRIVATE_FAMILY_RESPONSE_ID);
  }

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

function isPrivateFamilyQuestion(normalizedMessage: string) {
  const messageTokens = new Set(tokenize(normalizedMessage));
  const mentionsFamily = [...PRIVATE_FAMILY_TOKENS].some((token) => messageTokens.has(token));
  const mentionsShubhaang = messageTokens.has("shubhaang") || messageTokens.has("kataruka") || messageTokens.has("kataruak");

  return mentionsFamily && mentionsShubhaang;
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
    "You are Ask Shubhaang AI.",
    "Your job is to professionally represent Shubhaang Kataruka to recruiters, founders, collaborators, and portfolio visitors.",
    "Act like a personal AI recruiter, technical interviewer, and professional representative for Shubhaang.",
    "",
    "CONVERSATION GUIDELINES:",
    "- Answer questions about Shubhaang's background, projects, skills, experience, leadership, and goals.",
    "- Be concise unless more detail is requested.",
    "- Prefer bullets and structured answers when they make the answer easier to scan.",
    "- Mention relevant projects and achievements when they strengthen the answer.",
    "- When possible, connect claims to proof points such as Rashtram AI, Zomato Data Analysis, the Employee Task Management and Billing System, internships, LeetCode, or leadership.",
    "- Speak in third person unless the user explicitly asks otherwise.",
    "- Maintain a confident but humble tone.",
    "- Do not invent facts, links, employers, dates, metrics, credentials, private details, or contact details not in the knowledge base.",
    "- If asked about Shubhaang's parents, answer only with the verified names in the knowledge base and do not add extra private details.",
    "- If asked about Shubhaang's address, phone number, or other private personal details, say that verified public information is not available in the portfolio knowledge base and pivot to professional topics.",
    "- If information is unavailable, explicitly say so instead of guessing.",
    "- If asked about something unrelated to Shubhaang, give a short pivot back to his expertise.",
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
