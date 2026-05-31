import {
  Award,
  BadgeDollarSign,
  CalendarCheck,
  Crown,
  Flag,
  GraduationCap,
  HeartHandshake,
  Medal,
  Sparkles,
  Trophy
} from "lucide-react";
import { AchievementCard } from "../components/achievements/AchievementCard";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { achievements } from "../data";

const achievementIcons = {
  "youngest-mdrt-fy25": BadgeDollarSign,
  "pan-iit-2026-long-beach": CalendarCheck,
  "hacktoberfest-super-contributor-2024-2025": Sparkles,
  "leetcode-1700-rating": Trophy,
  "dsa-300-problems": Medal,
  "gpa-8-5": GraduationCap,
  "sponsorship-manager-tech-fest": HeartHandshake,
  "school-house-captain": Crown,
  "national-integration-camp": Flag
} as const;

const achievementSignals = [
  { label: "Business", value: "Youngest MDRT qualifier FY25" },
  { label: "Global exposure", value: "PAN IIT 2026 representative" },
  { label: "Open source", value: "Hacktoberfest 2024 & 2025" },
  { label: "DSA", value: "1700+ rating / 300+ problems" }
] as const;

const sortedAchievements = [...achievements].sort((a, b) => a.priority - b.priority);

export function AchievementsPage() {
  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// achievement.log"
        title="A balanced record across academics, DSA, business, open source, and leadership."
        description="These achievements show a profile built beyond coursework: strong technical practice, business-facing execution, college representation, and early leadership."
        headingLevel="h1"
      />

      <section className="grid gap-4 lg:grid-cols-4">
        {achievementSignals.map((signal, index) => (
          <div
            key={signal.label}
            className="rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur light:bg-white/85"
          >
            <p className="font-mono text-xs text-accent-cyan">
              signal.{String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-base font-semibold text-slate-50 light:text-slate-950">
              {signal.label}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">{signal.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedAchievements.map((achievement, index) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            icon={achievementIcons[achievement.id as keyof typeof achievementIcons] ?? Award}
            index={index}
            featured={index < 3}
          />
        ))}
      </section>
    </div>
  );
}

