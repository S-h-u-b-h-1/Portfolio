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
      title={counts ? `${counts.totalViews} total views, ${counts.uniqueVisitors} unique visitors` : "Loading views"}
      aria-label={counts ? `${counts.totalViews} total portfolio views` : "Portfolio view count loading"}
    >
      <Eye aria-hidden="true" size={15} className="text-accent-cyan" />
      <div className="flex items-center gap-1.5">
        <span className="hidden text-[11px] uppercase tracking-[0.2em] text-slate-500 light:text-slate-600 lg:inline">
          Unique
        </span>
        <span className="font-semibold text-slate-100 light:text-slate-950">
          {counts ? compactFormatter.format(counts.uniqueVisitors) : "--"}
        </span>
      </div>
      <div className="h-3 w-px bg-white/10 mx-1 light:bg-black/10" />
      <div className="flex items-center gap-1.5">
        <span className="hidden text-[11px] uppercase tracking-[0.2em] text-slate-500 light:text-slate-600 lg:inline">
          Total
        </span>
        <span className="font-semibold text-slate-100 light:text-slate-950">
          {counts ? compactFormatter.format(counts.totalViews) : "--"}
        </span>
      </div>
    </div>
  );
}
