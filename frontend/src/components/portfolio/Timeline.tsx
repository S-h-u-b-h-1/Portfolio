import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

export type TimelineItem = {
  id: string;
  marker: string;
  title: string;
  period: string;
  description: string;
  details: string[];
  tags?: string[];
  icon?: LucideIcon;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-accent-cyan via-white/20 to-accent-emerald/40 sm:block" />
      <div className="space-y-5">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
              className="relative grid gap-4 sm:grid-cols-[2.5rem_1fr] sm:gap-5"
            >
              <div className="relative z-10 flex items-start sm:justify-center">
                <span className="grid size-10 place-items-center rounded-lg border border-accent-cyan/35 bg-background text-accent-cyan shadow-glow light:bg-white">
                  {Icon ? <Icon aria-hidden="true" size={18} /> : <span className="font-mono text-xs">{item.marker}</span>}
                </span>
              </div>

              <div className="rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur transition hover:border-accent-cyan/40 light:bg-white/90">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-xs text-accent-emerald">{item.marker}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-50 light:text-slate-950">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-slate-500 light:text-slate-600">{item.period}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300 light:text-slate-700">
                  {item.description}
                </p>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-400 light:text-slate-600">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-cyan" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                {item.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-slate-300 light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
