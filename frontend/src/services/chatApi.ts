import { getApiBaseUrl } from "../config/env";

export type ChatApiResponse = {
  answer: string;
  provider: "local" | "openai-compatible";
  sources: string[];
};

export async function askShubhaangAI(question: string, signal?: AbortSignal): Promise<ChatApiResponse> {
  const response = await fetch(`${getApiBaseUrl()}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question }),
    signal
  });

  if (!response.ok) {
    throw new Error("Unable to reach Ask Shubhaang AI right now.");
  }

  return response.json() as Promise<ChatApiResponse>;
}
