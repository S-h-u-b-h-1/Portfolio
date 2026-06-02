import { getApiUrl } from "../config/env";

export type VisitCounts = {
  totalViews: number;
  uniqueVisitors: number;
  storageAvailable?: boolean;
  storageIssue?: string;
  prismaCode?: string;
};

export type VisitPayload = {
  visitorId: string;
  path: string;
  referrer?: string;
};

export async function fetchVisitCounts(signal?: AbortSignal): Promise<VisitCounts> {
  const response = await fetch(getApiUrl("/api/visits/count"), {
    signal
  });

  if (!response.ok) {
    throw new Error("Unable to load portfolio visit count.");
  }

  return response.json() as Promise<VisitCounts>;
}

export async function recordPortfolioVisit(payload: VisitPayload, signal?: AbortSignal): Promise<VisitCounts> {
  const response = await fetch(getApiUrl("/api/visits"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    signal
  });

  if (!response.ok) {
    throw new Error("Unable to record portfolio visit.");
  }

  return response.json() as Promise<VisitCounts>;
}
