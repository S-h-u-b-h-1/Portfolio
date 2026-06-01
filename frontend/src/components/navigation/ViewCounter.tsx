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
      className="hidden min-h-10 items-center gap-2 rounded-lg border border-border bg-white/5 px-3 text-sm text-slate-300 light:bg-slate-950/5 light:text-slate-700 sm:inline-flex"
      title={counts ? `${counts.totalViews} total views, ${counts.uniqueVisitors} unique visitors` : "Loading views"}
      aria-label={counts ? `${counts.totalViews} total portfolio views` : "Portfolio view count loading"}
    >
      <Eye aria-hidden="true" size={16} className="text-accent-emerald" />
      <span className="font-mono text-xs text-slate-500 light:text-slate-600">views</span>
      <span className="font-semibold text-slate-100 light:text-slate-950">
        {counts ? compactFormatter.format(counts.totalViews) : "--"}
      </span>
    </div>
  );
}
