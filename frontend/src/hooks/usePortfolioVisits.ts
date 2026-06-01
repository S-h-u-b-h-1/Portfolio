import { useEffect, useState } from "react";
import { fetchVisitCounts, recordPortfolioVisit, type VisitCounts } from "../services/visitApi";

const VISITOR_ID_KEY = "portfolio-visitor-id";
const TRACKED_PATHS_KEY = "portfolio-tracked-paths";

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrCreateVisitorId() {
  const existingVisitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (existingVisitorId) {
    return existingVisitorId;
  }

  const visitorId = createVisitorId();
  localStorage.setItem(VISITOR_ID_KEY, visitorId);
  return visitorId;
}

function getTrackedPaths() {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(TRACKED_PATHS_KEY) ?? "[]") as string[]);
  } catch {
    return new Set<string>();
  }
}

function rememberTrackedPath(path: string) {
  const trackedPaths = getTrackedPaths();
  trackedPaths.add(path);
  sessionStorage.setItem(TRACKED_PATHS_KEY, JSON.stringify(Array.from(trackedPaths)));
}

export function usePortfolioVisits(path: string) {
  const [counts, setCounts] = useState<VisitCounts | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const trackedPaths = getTrackedPaths();

    async function syncVisitCount() {
      try {
        if (trackedPaths.has(path)) {
          setCounts(await fetchVisitCounts(abortController.signal));
          return;
        }

        const visitorId = getOrCreateVisitorId();
        const nextCounts = await recordPortfolioVisit(
          {
            visitorId,
            path,
            referrer: document.referrer || undefined
          },
          abortController.signal
        );

        rememberTrackedPath(path);
        setCounts(nextCounts);
      } catch {
        if (!abortController.signal.aborted) {
          setCounts((currentCounts) => currentCounts ?? null);
        }
      }
    }

    void syncVisitCount();

    return () => {
      abortController.abort();
    };
  }, [path]);

  return counts;
}
