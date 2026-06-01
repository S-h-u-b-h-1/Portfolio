import { getApiUrl } from "../config/env";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  purpose: string;
  message: string;
};

export type ContactApiResponse = {
  success: boolean;
  id: string;
  message: string;
};

export async function sendContactMessage(
  payload: ContactPayload,
  signal?: AbortSignal
): Promise<ContactApiResponse> {
  const response = await fetch(getApiUrl("/api/contact"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    signal
  });

  const data = (await response.json().catch(() => null)) as Partial<ContactApiResponse> | null;

  if (!response.ok) {
    throw new Error(data?.message ?? "Message could not be sent right now.");
  }

  return {
    success: Boolean(data?.success),
    id: data?.id ?? "",
    message: data?.message ?? "Message received."
  };
}
