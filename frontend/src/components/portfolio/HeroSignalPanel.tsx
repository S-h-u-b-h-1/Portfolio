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
      className="relative overflow-hidden rounded-lg border border-accent-cyan/20 bg-slate-950/70 p-4 shadow-glow backdrop-blur light:bg-white/90"
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

        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] light:border-slate-950/10 light:bg-slate-950/[0.035]">
          <div className="aspect-[4/5] max-h-[18rem] w-full overflow-hidden">
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              className="size-full object-cover"
              loading="eager"
            />
          </div>
          <div className="border-t border-white/10 px-3 py-2 light:border-slate-950/10">
            <p className="font-mono text-xs text-slate-500 light:text-slate-600">
              {profile.photo.status === "placeholder" ? "// replace.with.real.photo" : "// verified.portrait"}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {signalRows.map((row, index) => {
            const Icon = row.icon;

            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.38 + index * 0.08 }}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] px-3 py-3 light:border-slate-950/10 light:bg-slate-950/[0.035]"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                  <Icon aria-hidden="true" size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-100 light:text-slate-950">{row.label}</p>
                  <p className="truncate font-mono text-xs text-slate-500 light:text-slate-600">{row.value}</p>
                </div>
                <span className="font-mono text-xs text-accent-emerald">0{index + 1}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 light:border-slate-950/10">
          {["RAG", "SQL", "React"].map((item) => (
            <div key={item} className="rounded-lg bg-white/[0.04] px-3 py-2 text-center light:bg-slate-950/[0.04]">
              <p className="font-mono text-xs text-slate-400 light:text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
