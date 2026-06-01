import { getApiUrl } from "../config/env";

export type ChatApiResponse = {
  answer: string;
  source?: "local-knowledge" | "ai-provider";
  provider: "local" | "openai-compatible";
  sources: string[];
};

export async function askShubhaangAI(question: string, signal?: AbortSignal): Promise<ChatApiResponse> {
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

  if (!response.ok) {
    throw new Error(data?.error ?? data?.message ?? "I could not connect to the AI service right now. Please try again.");
  }

  if (!data?.answer) {
    throw new Error("I could not connect to the AI service right now. Please try again.");
  }

  return {
    answer: data.answer,
    source: data.source,
    provider: data.provider ?? "local",
    sources: data.sources ?? ["local-knowledge-base"]
  };
}
