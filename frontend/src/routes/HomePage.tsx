import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CalendarCheck,
  Download,
  GraduationCap,
  Mail,
  Medal,
  Trophy
} from "lucide-react";
import { CTAButton } from "../components/portfolio/CTAButton";
import { HeroSignalPanel } from "../components/portfolio/HeroSignalPanel";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { StatCard } from "../components/portfolio/StatCard";
import { frontendEnv } from "../config/env";
import { profile } from "../data";

const heroWords = ["AI/ML", "RAG", "SQL", "dashboards", "full-stack", "finance"];

const homeStats = [
  {
    label: "GPA",
    value: "8.5",
    description: "Through first and second year of B.Tech CS & AI.",
    icon: GraduationCap,
    accent: "cyan"
  },
  {
    label: "LeetCode problems",
    value: "300+",
    description: "Consistent DSA practice across problem-solving patterns.",
    icon: Trophy,
    accent: "emerald"
  },
  {
    label: "LeetCode rating",
    value: "1700+",
    description: "Contest rating showing algorithmic strength.",
    icon: Trophy,
    accent: "purple"
  },
  {
    label: "Internships",
    value: "2",
    description: "AI/ML engineering plus hiring research and strategy.",
    icon: BriefcaseBusiness,
    accent: "blue"
  },
  {
    label: "MDRT qualifier",
    value: "FY25",
    description: "Youngest qualifier at Aditya Birla Capital / ABSLI.",
    icon: Medal,
    accent: "emerald"
  },
  {
    label: "PAN IIT representative",
    value: "2026",
    description: "Represented college in Long Beach, California.",
    icon: CalendarCheck,
    accent: "cyan"
  }
] as const;

export function HomePage() {
  return (
    <div className="space-y-20 pb-8">
      <section className="grid min-h-[calc(100vh-8rem)] items-center gap-10 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 px-3 py-2 font-mono text-xs text-accent-cyan">
            <span className="size-2 rounded-full bg-accent-emerald" />
            // system.identity
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal text-slate-50 light:text-slate-950 sm:text-5xl lg:text-6xl">
            Shubhaang Kataruka builds AI and data systems with business-aware execution.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 light:text-slate-700 sm:text-lg">
            {profile.roleSummary} He is focused on AI/ML, RAG, analytics, SQL, databases,
            dashboards, full-stack development, stock market analysis, and investment planning.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {heroWords.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 + index * 0.07 }}
                className="rounded-md border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-xs text-slate-300 light:border-slate-950/10 light:bg-white/80 light:text-slate-700"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton to="/projects" icon={ArrowRight} variant="primary">
              View Work
            </CTAButton>
            <CTAButton to="/ask-ai" icon={Bot}>
              Ask AI About Me
            </CTAButton>
            <CTAButton href={frontendEnv.resumeUrl} icon={Download}>
              Download Resume
            </CTAButton>
            <CTAButton to="/contact" icon={Mail} variant="quiet">
              Contact Me
            </CTAButton>
          </div>
        </motion.div>

        <HeroSignalPanel />
      </section>

      <section className="space-y-8">
        <SectionHeader
          eyebrow="// verified.metrics"
          title="Proof points for recruiters, founders, and mentors."
          description="A compact snapshot of academic consistency, DSA practice, internships, business execution, and global representation."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeStats.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              accent={stat.accent}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-lg border border-border bg-white/[0.035] p-5 backdrop-blur light:bg-white/85 md:grid-cols-[0.9fr_1.1fr] md:p-7">
        <div>
          <p className="font-mono text-sm text-accent-emerald">// current.vector</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 light:text-slate-950">
            Technical depth with a practical business lens.
          </h2>
        </div>
        <p className="text-sm leading-7 text-slate-300 light:text-slate-700 sm:text-base">
          {profile.shortBio} The portfolio is shaped for roles where building useful systems
          matters as much as understanding the domain, the user, and the business impact.
        </p>
      </section>
    </div>
  );
}
