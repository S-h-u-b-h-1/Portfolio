import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { AchievementItem } from "../../data";
import { cn } from "../../utils/cn";

type AchievementCardProps = {
  achievement: AchievementItem;
  icon: LucideIcon;
  index: number;
  featured?: boolean;
};

export function AchievementCard({ achievement, icon: Icon, index, featured = false }: AchievementCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.42, delay: index * 0.04, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-accent-cyan/45 hover:bg-white/[0.07] light:bg-white/85 light:hover:bg-white",
        featured && "md:col-span-2"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/70 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-accent-emerald">
            priority.{String(achievement.priority).padStart(2, "0")}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-normal text-slate-50 light:text-slate-950 sm:text-2xl">
            {achievement.title}
          </h2>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-accent-purple/25 bg-accent-purple/10 text-accent-purple">
          <Icon aria-hidden="true" size={20} />
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-slate-300 light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700">
          {achievement.year}
        </span>
        <span className="rounded-md border border-accent-cyan/20 bg-accent-cyan/10 px-2.5 py-1 font-mono text-xs text-accent-cyan">
          {achievement.organization}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300 light:text-slate-700">{achievement.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {achievement.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 bg-slate-950/30 px-2.5 py-1 text-xs font-medium text-slate-300 light:border-slate-950/10 light:bg-white light:text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

