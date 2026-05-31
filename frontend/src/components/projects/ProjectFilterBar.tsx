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
    <section className="rounded-lg border border-border bg-white/[0.045] p-4 backdrop-blur light:bg-white/85">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block min-w-0 flex-1">
          <span className="sr-only">Search projects</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search projects, tags, tech stack..."
            className="h-12 w-full rounded-lg border border-white/10 bg-slate-950/70 pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-white light:text-slate-950"
          />
        </label>

        <div className="flex items-center gap-2 text-sm text-slate-400 light:text-slate-600">
          <SlidersHorizontal aria-hidden="true" size={17} />
          <span>{resultCount} project{resultCount === 1 ? "" : "s"}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Project categories">
        {filterOptions.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan",
                isSelected
                  ? "border-accent-cyan bg-accent-cyan text-slate-950"
                  : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-accent-cyan/50 hover:text-accent-cyan light:border-slate-950/10 light:bg-slate-950/[0.035] light:text-slate-700"
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
