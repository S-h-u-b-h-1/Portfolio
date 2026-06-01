import {
  BarChart3,
  Binary,
  BrainCircuit,
  ServerCog,
  Trophy
} from "lucide-react";
import { SkillGroupCard } from "../components/skills/SkillGroupCard";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { skills } from "../data";

const skillIcons = {
  "ai-ml": BrainCircuit,
  "data-analytics": BarChart3,
  "software-engineering": ServerCog,
  "problem-solving": Binary
} as const;

const skillHighlights = [
  { label: "AI focus", value: "RAG + LLM apps" },
  { label: "Data", value: "SQL + PostgreSQL" },
  { label: "Software", value: "React + Node.js" },
  { label: "Problem solving", value: "1700+ rating" }
] as const;

export function SkillsPage() {
  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// skills.matrix"
        title="A lean technical stack for AI, data, and software roles."
        description="Organized around the work Shubhaang wants to do next: AI systems, data products, full-stack software, and problem solving."
        headingLevel="h1"
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skillHighlights.map((highlight) => (
          <div
            key={highlight.label}
            className="rounded-lg border border-border bg-white/[0.045] p-4 backdrop-blur light:bg-white/85"
          >
            <p className="font-mono text-xs text-slate-500 light:text-slate-600">{highlight.label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-50 light:text-slate-950">{highlight.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {skills.map((group, index) => (
          <SkillGroupCard
            key={group.id}
            group={group}
            icon={skillIcons[group.id as keyof typeof skillIcons] ?? Trophy}
            index={index}
          />
        ))}
      </section>
    </div>
  );
}
