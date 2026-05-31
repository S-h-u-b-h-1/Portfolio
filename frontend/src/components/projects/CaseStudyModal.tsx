import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Layers, Target, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ProjectItem } from "../../data";

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
  return (
    <section>
      <h3 className="text-base font-semibold text-slate-50 light:text-slate-950">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 light:text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-cyan" />
            <span>{item}</span>
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
          className="fixed inset-0 z-[80] overflow-y-auto bg-slate-950/85 px-4 py-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <div className="flex min-h-full items-start justify-center sm:items-center">
            <motion.article
              data-testid="case-study-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-accent-cyan/20 bg-background shadow-[0_24px_90px_rgba(0,0,0,0.45)] light:bg-white"
            >
              <div className="sticky top-0 z-10 border-b border-border bg-background/95 p-5 backdrop-blur light:bg-white/95 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-accent-cyan">// case.study</p>
                    <h2
                      id="case-study-title"
                      className="mt-2 text-2xl font-semibold tracking-normal text-slate-50 light:text-slate-950 sm:text-3xl"
                    >
                      {project.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 light:text-slate-700">
                      {project.summary}
                    </p>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-accent-cyan/50 hover:text-accent-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
                    aria-label="Close case study"
                  >
                    <X aria-hidden="true" size={18} />
                  </button>
                </div>
              </div>

              <div className="grid gap-7 p-5 sm:p-6 lg:grid-cols-[0.65fr_0.35fr]">
                <div className="space-y-7">
                  {sectionLabels.map((section) => (
                    <section key={section.key}>
                      <h3 className="text-base font-semibold text-slate-50 light:text-slate-950">
                        {section.label}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300 light:text-slate-700">
                        {project[section.key]}
                      </p>
                    </section>
                  ))}

                  <ListSection title="Process" items={project.process} />
                  <ListSection title="Features" items={project.features} />
                  <ListSection title="Impact" items={project.impact} />
                  <ListSection title="Future improvements" items={project.futureImprovements} />
                </div>

                <aside className="space-y-5">
                  <section className="rounded-lg border border-border bg-white/[0.045] p-4 light:bg-slate-950/[0.035]">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-50 light:text-slate-950">
                      <Layers aria-hidden="true" size={16} className="text-accent-purple" />
                      Tech stack
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-slate-300 light:border-slate-950/10 light:bg-white light:text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-lg border border-border bg-white/[0.045] p-4 light:bg-slate-950/[0.035]">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-50 light:text-slate-950">
                      <Target aria-hidden="true" size={16} className="text-accent-emerald" />
                      Categories
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-md border border-accent-cyan/20 bg-accent-cyan/10 px-2.5 py-1 font-mono text-xs text-accent-cyan"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-lg border border-border bg-white/[0.045] p-4 light:bg-slate-950/[0.035]">
                    <h3 className="text-sm font-semibold text-slate-50 light:text-slate-950">Proof status</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">
                      {project.proofStatus}
                    </p>
                  </section>

                  {project.links.live.startsWith("TODO") ? null : (
                    <a
                      href={project.links.live}
                      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-accent-cyan bg-accent-cyan px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                    >
                      Open project
                      <ExternalLink aria-hidden="true" size={16} />
                    </a>
                  )}
                </aside>
              </div>
            </motion.article>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
