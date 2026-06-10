import { motion } from "framer-motion";
import { BrainCircuit, Code2, Database, ServerCog } from "lucide-react";
import { profile } from "../../data";

const signalRows = [
  { label: "AI systems", value: "RAG + LLM apps", icon: BrainCircuit },
  { label: "Data products", value: "SQL + dashboards", icon: Database },
  { label: "Software", value: "React + Node APIs", icon: ServerCog },
  { label: "Problem solving", value: "DSA + algorithms", icon: Code2 }
];

export function HeroSignalPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl border border-accent-violet/20 bg-panel p-4 shadow-glow hover:shadow-glow-hover backdrop-blur-md transition-shadow duration-500 light:bg-white/90"
      aria-label="Portfolio signal summary"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent-violet to-transparent opacity-80" />
      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent-cyan font-semibold tracking-wider uppercase">
              // Visionary
            </p>
            <h2 className="mt-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 light:from-slate-900 light:to-slate-600">
              AI + data builder
            </h2>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-accent-emerald animate-pulse" />
            <span className="size-2.5 rounded-full bg-accent-cyan animate-pulse delay-75" />
            <span className="size-2.5 rounded-full bg-accent-fuchsia animate-pulse delay-150" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <figure className="portrait-figure">
            <div className="portrait-inner">
              <img
                src={profile.photo.src}
                alt={profile.photo.alt}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </figure>
        </div>
        <div className="mt-4 text-center">
        </div>

        {/* Skill cards removed to emphasize portrait */}
      </div>
    </motion.aside>
  );
}
