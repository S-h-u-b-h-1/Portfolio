import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { CaseStudyModal } from "../components/projects/CaseStudyModal";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectFilterBar, type ProjectFilter } from "../components/projects/ProjectFilterBar";
import { projectCategories, projects, type ProjectItem } from "../data";

const featuredProjectIds = ["employee-task-management", "rashtram-ai", "zomato-data-analysis", "hair-salon-website"];

function matchesSearch(project: ProjectItem, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    project.title,
    project.summary,
    project.problem,
    project.role,
    ...project.categories,
    ...project.tags,
    ...project.techStack,
    ...project.impact
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useSEO({
    title: "Projects & Case Studies | Shubhaang Kataruka",
    description: "Explore tech projects by Shubhaang Kataruka, including Rashtram AI (RAG policy system), employee billing SaaS, and data analytics work.",
    keywords: "projects portfolio, case studies, Rashtram AI, full stack SaaS, Zomato data analysis, python, react projects"
  });

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const categoryMatches =
          selectedCategory === "All" ||
          project.categories.some((category) => category === selectedCategory);

        return categoryMatches && matchesSearch(project, searchQuery);
      }),
    [searchQuery, selectedCategory]
  );

  const isDefaultView = selectedCategory === "All" && !searchQuery.trim();
  const featuredProjects = filteredProjects.filter((project) => featuredProjectIds.includes(project.id));
  const otherProjects = filteredProjects.filter((project) => !featuredProjectIds.includes(project.id));

  const closeCaseStudy = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-slate-50">
          Selected Works & Case Studies
        </h1>
        <p className="mt-4 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
          Focused project case studies demonstrating AI, data, and software engineering capabilities. Rashtram AI is the flagship project, supported by analytics and full-stack work.
        </p>
      </div>

      <ProjectFilterBar
        categories={projectCategories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        resultCount={filteredProjects.length}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />

      {isDefaultView ? (
        <>
          <motion.section layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewCaseStudy={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.section>

          {otherProjects.length > 0 ? (
            <section className="rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md light:border-slate-900/10 dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Archive</span>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">Other Work</h2>
                </div>
                <p className="text-base text-slate-500 dark:text-slate-400">
                  Smaller proof areas available for discussion.
                </p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {otherProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white/80 p-5 text-left transition hover:border-accent-cyan/40 hover:shadow-md light:border-slate-900/10 dark:border-white/5 dark:bg-black/20"
                  >
                    <span>
                      <span className="block font-bold text-slate-900 dark:text-slate-100">{project.title}</span>
                      <span className="mt-1 block text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        {project.summary}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" size={18} className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-accent-cyan dark:text-slate-600" />
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <motion.section layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewCaseStudy={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.section>
      )}

      {filteredProjects.length === 0 ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-black/5 bg-white/60 p-12 text-center backdrop-blur-md light:border-slate-900/10 dark:border-white/10 dark:bg-white/5"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500">
            <Search size={20} />
          </span>
          <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-50">
            No projects found
          </h2>
          <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
            No project matches the current filter or search query.
          </p>
        </motion.section>
      ) : null}

      <CaseStudyModal project={selectedProject} onClose={closeCaseStudy} />
    </div>
  );
}
