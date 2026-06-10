import { Search, SlidersHorizontal } from "lucide-react";
import type { ProjectCategory } from "../../data";
import { cn } from "../../utils/cn";

type ProjectFilter = ProjectCategory | "All";

type ProjectFilterBarProps = {
  categories: readonly ProjectCategory[];
  selectedCategory: ProjectFilter;
  searchQuery: string;
  resultCount: number;
  onCategoryChange: (category: ProjectFilter) => void;
  onSearchChange: (query: string) => void;
};

export function ProjectFilterBar({
  categories,
  selectedCategory,
  searchQuery,
  resultCount,
  onCategoryChange,
  onSearchChange
}: ProjectFilterBarProps) {
  const filterOptions: readonly ProjectFilter[] = ["All", ...categories];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block min-w-0 flex-1 max-w-md">
          <span className="sr-only">Search projects</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search projects, tags..."
            className="h-12 w-full rounded-full border border-black/5 bg-white/60 pl-12 pr-4 text-sm text-slate-900 outline-none backdrop-blur-md transition placeholder:text-slate-500 focus:border-accent-cyan/50 focus:bg-white/90 focus:ring-4 focus:ring-accent-cyan/10 light:border-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:focus:bg-white/10"
          />
        </label>

        <div className="flex items-center gap-2 px-2 text-sm font-medium text-slate-500">
          <SlidersHorizontal aria-hidden="true" size={16} />
          <span>{resultCount} {resultCount === 1 ? "project" : "projects"}</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Project categories">
        {filterOptions.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan",
                isSelected
                  ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
                  : "border border-black/5 bg-white/60 text-slate-600 hover:bg-white/90 hover:text-slate-900 light:border-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export type { ProjectFilter };
