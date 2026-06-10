import { Eye } from "lucide-react";
import type { VisitCounts } from "../../services/visitApi";

type ViewCounterProps = {
  counts: VisitCounts | null;
};

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1
});

export function ViewCounter({ counts }: ViewCounterProps) {
  return (
    <div
      className="hidden min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 text-sm text-slate-300 transition hover:border-accent-cyan/35 light:border-slate-950/10 light:bg-slate-950/[0.035] light:text-slate-700 sm:inline-flex"
      title={counts ? `${counts.uniqueVisitors} unique visitors (${counts.totalViews} total views)` : "Loading views"}
      aria-label={counts ? `${counts.uniqueVisitors} unique portfolio visitors` : "Portfolio view count loading"}
    >
      <Eye aria-hidden="true" size={15} className="text-accent-cyan" />
      <span className="hidden text-[11px] uppercase tracking-[0.2em] text-slate-500 light:text-slate-600 lg:inline">
        views
      </span>
      <span className="font-semibold text-slate-100 light:text-slate-950">
        {counts ? compactFormatter.format(counts.uniqueVisitors) : "--"}
      </span>
    </div>
  );
}
