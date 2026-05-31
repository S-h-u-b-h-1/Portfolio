import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { CaseStudyModal } from "../components/projects/CaseStudyModal";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectFilterBar, type ProjectFilter } from "../components/projects/ProjectFilterBar";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { projectCategories, projects, type ProjectItem } from "../data";

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

  const closeCaseStudy = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// featured.work"
        title="Project case studies across AI, analytics, full-stack, business, and open source."
        description="A focused portfolio index for Rashtram AI, analytics dashboards, freelance delivery, open-source contributions, and business-aware technical work."
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
