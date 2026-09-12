import { useEffect, useState } from "react";
import { fetchVisitCounts, recordPortfolioVisit, type VisitCounts, type VisitPayload } from "../services/visitApi";
import {
  extractVisitContext,
  getOrCreateVisitorId,
  getOrCreateVisitSession,
  markVisitRecorded
} from "../utils/visitTracking";

export function usePortfolioVisits(path: string) {
  const [counts, setCounts] = useState<VisitCounts | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function syncVisitCount() {
      const { sessionId, shouldRecord } = getOrCreateVisitSession();
      const visitorId = getOrCreateVisitorId();
      const context = extractVisitContext(path);

      try {
        if (!shouldRecord) {
          const latestCounts = await fetchVisitCounts(abortController.signal);
          setCounts(latestCounts);
          return;
        }

        const payload: VisitPayload = {
          visitorId,
          sessionId,
          path: context.path,
          referrer: document.referrer || undefined,
          language: context.language,
          timezone: context.timezone,
          utmSource: context.utmSource,
          utmMedium: context.utmMedium,
          utmCampaign: context.utmCampaign
        };

        const nextCounts = await recordPortfolioVisit(payload, abortController.signal);

        markVisitRecorded(sessionId);
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
