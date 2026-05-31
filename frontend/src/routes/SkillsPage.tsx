import {
  BarChart3,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Layout,
  ServerCog,
  Trophy,
  UsersRound
} from "lucide-react";
import { SkillGroupCard } from "../components/skills/SkillGroupCard";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { skills } from "../data";

const skillIcons = {
  programming: Code2,
  frontend: Layout,
  backend: ServerCog,
  database: Database,
  "ai-ml": BrainCircuit,
  analytics: BarChart3,
  dsa: Binary,
  "business-finance": BriefcaseBusiness,
  leadership: UsersRound
} as const;

const skillHighlights = [
  { label: "Core stack", value: "Python / TS / SQL" },
  { label: "AI focus", value: "RAG + NLP" },
  { label: "Analytics", value: "EDA + dashboards" },
  { label: "DSA proof", value: "1700+ rating" },
  { label: "Business", value: "MDRT FY25" },
  { label: "Leadership", value: "PAN IIT 2026" }
] as const;

export function SkillsPage() {
  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// skills.matrix"
        title="A technical skill matrix with data, AI, full-stack, and business depth."
        description="Organized for recruiters to quickly see where Shubhaang can contribute: implementation, analytics, databases, AI systems, DSA, finance-aware product thinking, and leadership."
        headingLevel="h1"
      />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

