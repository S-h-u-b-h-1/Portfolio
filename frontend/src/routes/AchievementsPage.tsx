import { Award, CalendarCheck, GraduationCap, Medal, Sparkles, Trophy } from "lucide-react";
import { AchievementCard } from "../components/achievements/AchievementCard";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { achievements } from "../data";

const technicalHighlightIds = [
  "hacktoberfest-super-contributor-2024-2025",
  "leetcode-1700-rating",
  "dsa-300-problems",
  "gpa-8-5",
  "pan-iit-2026-long-beach"
] as const;

const achievementIcons = {
  "hacktoberfest-super-contributor-2024-2025": Sparkles,
  "leetcode-1700-rating": Trophy,
  "dsa-300-problems": Medal,
  "gpa-8-5": GraduationCap,
  "pan-iit-2026-long-beach": CalendarCheck
} as const;

const additionalBackground = [
  "Youngest MDRT qualifier FY25 at Aditya Birla Capital / ABSLI.",
  "Sponsorship Manager for college tech fest.",
  "House Captain in school.",
  "National Integration Camp participant/manager.",
  "Interested in stock market patterns and investment planning."
] as const;

const technicalHighlights = achievements
  .filter((achievement) => technicalHighlightIds.includes(achievement.id as (typeof technicalHighlightIds)[number]))
  .sort((a, b) => a.priority - b.priority);

export function AchievementsPage() {
  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// technical.highlights"
        title="Technical Highlights"
        description="A quieter, recruiter-friendly view of Shubhaang Kataruka’s strongest technical signals: open source, DSA, academics, and representation."
        headingLevel="h1"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {technicalHighlights.map((achievement, index) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            icon={achievementIcons[achievement.id as keyof typeof achievementIcons] ?? Award}
            index={index}
            featured={index === 0}
          />
        ))}
      </section>

      <section className="rounded-lg border border-border bg-white/[0.03] p-5 backdrop-blur light:bg-white/85 md:p-6">
        <p className="font-mono text-xs text-slate-500 light:text-slate-600">// secondary.background</p>
        <h2 className="mt-3 text-xl font-semibold text-slate-50 light:text-slate-950">
          Additional Leadership & Business Background
        </h2>
        <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-400 light:text-slate-600 md:grid-cols-2">
          {additionalBackground.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
