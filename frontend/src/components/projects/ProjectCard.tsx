import { motion } from "framer-motion";
import { ArrowRight, Layers, Target } from "lucide-react";
import type { ProjectItem } from "../../data";

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
  onViewCaseStudy: (project: ProjectItem) => void;
};

export function ProjectCard({ project, index, onViewCaseStudy }: ProjectCardProps) {
  return (
    <motion.article
      data-testid={`project-card-${project.slug}`}
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
      className="flex h-full min-h-[27rem] flex-col rounded-2xl border border-border bg-gradient-to-br from-slate-950/70 to-slate-900/60 p-0 backdrop-blur transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-accent-cyan/45 light:bg-gradient-to-br light:from-slate-50 light:to-slate-100 light:border-slate-200"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-accent-cyan">
            0x{String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-normal text-slate-50 light:text-slate-950">
            {project.title}
          </h2>
        </div>
        <span className="rounded-md border border-accent-emerald/30 bg-accent-emerald/10 px-2 py-1 font-mono text-xs text-accent-emerald">
          {project.status === "placeholder" ? "planned" : "case study"}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300 light:text-slate-700">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 5).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-xs text-slate-300 light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100 light:text-slate-950">
            <Target aria-hidden="true" size={16} className="text-accent-emerald" />
            Impact
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">
            {project.impact[0]}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-100 light:text-slate-950">
            <Layers aria-hidden="true" size={16} className="text-accent-purple" />
            Tech stack
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">
            {project.techStack.slice(0, 4).join(" / ")}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onViewCaseStudy(project)}
        className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-r from-accent-cyan to-accent-blue px-5 py-3 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
      >
        View Case Study
        <ArrowRight aria-hidden="true" size={17} strokeWidth={2.2} />
      </button>
      </div>
    </motion.article>
  );
}
