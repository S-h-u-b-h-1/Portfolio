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
      className="flex h-full min-h-[27rem] flex-col rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-accent-cyan/45 hover:bg-white/[0.07] light:bg-white/85 light:hover:bg-white"
    >
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
        className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent-cyan/55 bg-accent-cyan/10 px-4 py-2.5 text-sm font-semibold text-accent-cyan transition hover:border-accent-cyan hover:bg-accent-cyan hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
      >
        View Case Study
        <ArrowRight aria-hidden="true" size={17} strokeWidth={2.2} />
      </button>
    </motion.article>
  );
}
