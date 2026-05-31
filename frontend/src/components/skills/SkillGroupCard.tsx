import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { SkillGroup } from "../../data";
import { cn } from "../../utils/cn";

type SkillGroupCardProps = {
  group: SkillGroup;
  icon: LucideIcon;
  index: number;
};

const levelClasses = {
  Strong: "border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald",
  Working: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  Exploring: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple"
};

export function SkillGroupCard({ group, icon: Icon, index }: SkillGroupCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.42, delay: index * 0.04, ease: "easeOut" }}
      className="flex h-full min-h-[23rem] flex-col rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-accent-cyan/45 hover:bg-white/[0.07] light:bg-white/85 light:hover:bg-white"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-accent-cyan">
            0x{String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-normal text-slate-50 light:text-slate-950">
            {group.title}
          </h2>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
          <Icon aria-hidden="true" size={20} />
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-400 light:text-slate-600">{group.summary}</p>

      <div className="mt-5 grid gap-3">
        {group.skills.map((skill) => (
          <div
            key={skill.name}
            className="rounded-lg border border-white/10 bg-slate-950/35 p-3 light:border-slate-950/10 light:bg-slate-950/[0.035]"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-100 light:text-slate-950">{skill.name}</h3>
              <span
                className={cn(
                  "shrink-0 rounded-md border px-2 py-1 font-mono text-[0.68rem]",
                  levelClasses[skill.level]
                )}
              >
                {skill.level}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500 light:text-slate-600">{skill.proof}</p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

