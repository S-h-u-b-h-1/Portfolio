import { getApiUrl } from "../config/env";
import { createLocalChatFallback } from "./localChatFallback";

export type ChatApiResponse = {
  answer: string;
  source?: "local-knowledge" | "ai-provider";
  provider: "local" | "openai-compatible" | "gemini";
  sources: string[];
};

export async function askShubhaangAI(question: string, signal?: AbortSignal): Promise<ChatApiResponse> {
  try {
    const response = await fetch(getApiUrl("/api/chat"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: question }),
      signal
    });

    const data = (await response.json().catch(() => null)) as Partial<ChatApiResponse> & {
      error?: string;
      message?: string;
    } | null;

    if (!response.ok || !data?.answer) {
      return createLocalChatFallback(question);
    }

    return {
      answer: data.answer,
      source: data.source,
      provider: data.provider ?? "local",
      sources: data.sources ?? ["verified-portfolio-knowledge"]
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    return createLocalChatFallback(question);
  }
}
