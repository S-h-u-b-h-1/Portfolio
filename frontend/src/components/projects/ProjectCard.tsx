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
      className="group flex min-h-[28rem] flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white/60 p-6 backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-xl light:border-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs font-bold text-slate-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-accent-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-cyan">
          {project.status === "placeholder" ? "planned" : "case study"}
        </span>
      </div>

      <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-slate-50">
        {project.title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-4 grid gap-3 border-t border-black/5 pt-4 dark:border-white/5">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <Target aria-hidden="true" size={12} />
              Impact
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-700 line-clamp-2 dark:text-slate-300">
              {project.impact[0]}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <Layers aria-hidden="true" size={12} />
              Stack
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {project.techStack.slice(0, 3).join(" • ")}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onViewCaseStudy(project)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-transparent bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          View Case Study
          <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} />
        </button>
      </div>
    </motion.article>
  );
}
