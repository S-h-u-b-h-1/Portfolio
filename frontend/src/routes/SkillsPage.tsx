import { motion } from "framer-motion";
import {
  BarChart3,
  Binary,
  BrainCircuit,
  ServerCog,
  Trophy
} from "lucide-react";
import { skills } from "../data";
import { cn } from "../utils/cn";

const skillIcons = {
  "ai-ml": BrainCircuit,
  "data-analytics": BarChart3,
  "software-engineering": ServerCog,
  "problem-solving": Binary
} as const;

const levelStyles = {
  Strong: "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)]",
  Working: "border-white/10 bg-white/5 text-slate-300 light:border-black/10 light:bg-black/5 light:text-slate-700",
  Exploring: "border-accent-purple/30 bg-accent-purple/10 text-accent-purple"
};

export function SkillsPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-sm font-bold uppercase tracking-widest text-accent-cyan"
        >
          // technical.capabilities
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-4xl font-black tracking-tight text-slate-900 md:text-6xl dark:text-slate-50"
        >
          A lean stack built for <span className="text-accent-cyan">scale.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl leading-relaxed text-slate-600 dark:text-slate-400"
        >
          Organized around the work Shubhaang Kataruka wants to do next: building intelligent AI systems, crafting data products, and engineering full-stack software.
        </motion.p>
      </section>

      {/* Bento Grid */}
      <section className="grid gap-6 md:grid-cols-2">
        {skills.map((group, index) => {
          const Icon = skillIcons[group.id as keyof typeof skillIcons] ?? Trophy;

          return (
            <motion.article
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 p-8 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent-cyan/30 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]",
                index === 0 || index === 3 ? "md:col-span-2 md:flex-row md:items-center md:gap-12" : "flex-col"
              )}
            >
              <div className={cn("flex-1", index === 0 || index === 3 ? "md:max-w-md" : "")}>
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-cyan/10 text-accent-cyan transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent-cyan group-hover:text-white">
                    <Icon aria-hidden="true" size={28} />
                  </span>
                  <p className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                    0x{String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <h2 className="mt-6 text-3xl font-black text-slate-900 dark:text-slate-50">
                  {group.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  {group.summary}
                </p>
              </div>

              <div className={cn("mt-8 flex flex-1 flex-wrap gap-3", index === 0 || index === 3 ? "md:mt-0" : "")}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={cn(
                      "flex flex-col gap-1 rounded-xl border px-4 py-3 transition-colors hover:border-accent-cyan/60",
                      levelStyles[skill.level as keyof typeof levelStyles] || levelStyles.Working
                    )}
                  >
                    <span className="text-sm font-bold">{skill.name}</span>
                    <span className="text-xs opacity-70">{skill.proof}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
}
