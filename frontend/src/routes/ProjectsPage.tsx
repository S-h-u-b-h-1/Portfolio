import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { CaseStudyModal } from "../components/projects/CaseStudyModal";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectFilterBar, type ProjectFilter } from "../components/projects/ProjectFilterBar";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { projectCategories, projects, type ProjectItem } from "../data";

const featuredProjectIds = ["rashtram-ai", "zomato-data-analysis", "hair-salon-website"];

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
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// featured.work"
        title="Focused project case studies for AI, data, and software roles."
        description="Rashtram AI is the flagship project, supported by analytics and client-facing full-stack work."
        headingLevel="h1"
      />

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
          <motion.section layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            <section className="rounded-lg border border-border bg-white/[0.03] p-5 backdrop-blur light:bg-white/85">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-slate-500 light:text-slate-600">// other.work</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-50 light:text-slate-950">Other Work</h2>
                </div>
                <p className="text-sm text-slate-500 light:text-slate-600">
                  Smaller proof areas available for discussion.
                </p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {otherProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-accent-cyan/35 hover:bg-white/[0.055] light:border-slate-950/10 light:bg-white"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-slate-100 light:text-slate-950">{project.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500 light:text-slate-600">
                        {project.summary}
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" size={17} className="shrink-0 text-accent-cyan" />
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <motion.section layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          className="rounded-lg border border-border bg-white/[0.045] p-8 text-center backdrop-blur light:bg-white/85"
        >
          <p className="font-mono text-sm text-accent-cyan">// no.match</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 light:text-slate-950">
            No projects match that filter.
          </h2>
          <p className="mt-3 text-sm text-slate-400 light:text-slate-600">
            No visible project data matches the current query.
          </p>
        </motion.section>
      ) : null}

      <CaseStudyModal project={selectedProject} onClose={closeCaseStudy} />
    </div>
  );
}
