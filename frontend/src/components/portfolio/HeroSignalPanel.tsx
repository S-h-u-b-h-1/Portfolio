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
      className="relative overflow-hidden rounded-lg border border-accent-cyan/12 bg-slate-950/70 p-4 shadow-glow backdrop-blur light:bg-white/90"
      aria-label="Portfolio signal summary"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent" />
      <div className="relative space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent-cyan">// live.profile</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50 light:text-slate-950">
              AI + data builder
            </h2>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-accent-emerald" />
            <span className="size-2.5 rounded-full bg-accent-cyan" />
            <span className="size-2.5 rounded-full bg-accent-purple" />
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
          <p className="font-mono text-xs text-slate-400 light:text-slate-600">
            {profile.photo.status === "placeholder" ? "// replace.with.real.photo" : "// verified.portrait"}
          </p>
        </div>

        {/* Skill cards removed to emphasize portrait */}
      </div>
    </motion.aside>
  );
}
