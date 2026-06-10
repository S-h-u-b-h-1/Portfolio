import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Layers, Target, X, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ProjectItem } from "../../data";
import { externalLinkProps } from "../../utils/links";

type CaseStudyModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

const sectionLabels = [
  { key: "problem", label: "Problem" },
  { key: "role", label: "My role" }
] as const;

type ListSectionProps = {
  title: string;
  items: string[];
};

function ListSection({ title, items }: ListSectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <section className="rounded-3xl border border-black/5 bg-white/40 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">{title}</h3>
      <ul className="mt-5 grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4">
            <CheckCircle2 className="mt-0.5 shrink-0 text-accent-cyan" size={20} />
            <span className="text-base leading-relaxed text-slate-700 dark:text-slate-300">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          {/* Backdrop blur layer */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md dark:bg-black/60" />

          <motion.article
            data-testid="case-study-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/85 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80"
          >
            {/* Header */}
            <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-black/10 bg-white/60 p-6 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/60 sm:p-8">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-widest text-accent-cyan">// case.study</p>
                <h2
                  id="case-study-title"
                  className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
                >
                  {project.title}
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.summary}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="group grid size-12 shrink-0 place-items-center rounded-2xl border border-black/5 bg-white/60 text-slate-500 transition hover:-translate-y-1 hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                aria-label="Close case study"
              >
                <X aria-hidden="true" size={24} className="transition group-hover:scale-110" />
              </button>
            </header>

            {/* Content Body */}
            <div className="overflow-y-auto p-6 sm:p-8">
              <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
                {/* Main Content */}
                <div className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {sectionLabels.map((section) => (
                      <section key={section.key} className="rounded-3xl border border-black/5 bg-white/40 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                          {section.label}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                          {project[section.key]}
                        </p>
                      </section>
                    ))}
                  </div>

                  <ListSection title="Process" items={project.process} />
                  <ListSection title="Features" items={project.features} />
                  <ListSection title="Impact" items={project.impact} />
                  <ListSection title="Future Improvements" items={project.futureImprovements} />
                </div>

                {/* Sidebar */}
                <aside className="space-y-6">
                  {project.links.live && !project.links.live.startsWith("TODO") && (
                    <a
                      href={project.links.live}
                      {...externalLinkProps(project.links.live)}
                      className="group flex min-h-[4rem] w-full items-center justify-center gap-3 rounded-2xl border border-accent-cyan bg-accent-cyan px-6 py-4 text-lg font-bold text-slate-950 transition hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    >
                      Open Project
                      <ExternalLink aria-hidden="true" size={20} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}

                  <section className="rounded-3xl border border-black/5 bg-white/40 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
                    <div className="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-50">
                      <Layers aria-hidden="true" size={22} className="text-accent-purple" />
                      Tech Stack
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-xl border border-black/10 bg-white px-4 py-2 font-mono text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-3xl border border-black/5 bg-white/40 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
                    <div className="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-slate-50">
                      <Target aria-hidden="true" size={22} className="text-accent-emerald" />
                      Categories
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/10 px-4 py-2 font-mono text-sm font-bold text-accent-cyan"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
