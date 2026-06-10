import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon?: LucideIcon;
  accent?: "cyan" | "violet" | "emerald" | "blue" | "fuchsia";
  index?: number;
};

const accentClasses = {
  cyan: "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30",
  violet: "text-accent-violet bg-accent-violet/10 border-accent-violet/30",
  emerald: "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/30",
  blue: "text-accent-blue bg-accent-blue/10 border-accent-blue/30",
  fuchsia: "text-accent-fuchsia bg-accent-fuchsia/10 border-accent-fuchsia/30"
};

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  accent = "cyan",
  index = 0
}: StatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
      className="group min-h-40 rounded-lg border border-border bg-white/[0.045] p-4 backdrop-blur transition hover:-translate-y-1 hover:border-accent-cyan/45 hover:bg-white/[0.07] light:bg-white/85 light:hover:bg-white"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs text-slate-500 light:text-slate-500">
          0x{String(index + 1).padStart(2, "0")}
        </p>
        {Icon ? (
          <span className={cn("grid size-9 place-items-center rounded-lg border", accentClasses[accent])}>
            <Icon aria-hidden="true" size={17} />
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-normal text-slate-50 light:text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-200 light:text-slate-800">{label}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">{description}</p>
    </motion.article>
  );
}

