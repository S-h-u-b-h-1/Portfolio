import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  GitPullRequest,
  ServerCog,
  Sparkles,
  Trophy
} from "lucide-react";
import { CTAButton } from "../components/portfolio/CTAButton";
import { HeroSignalPanel } from "../components/portfolio/HeroSignalPanel";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { StatCard } from "../components/portfolio/StatCard";
import { frontendEnv } from "../config/env";
import { profile, projects } from "../data";

const featuredProjectIds = ["rashtram-ai", "zomato-data-analysis", "hair-salon-website"];

const homeStats = [
  {
    label: "LeetCode rating",
    value: "1700+",
    description: "Contest rating showing algorithmic strength.",
    icon: Trophy,
    accent: "violet"
  },
  {
    label: "DSA problems",
    value: "300+",
    description: "Consistent practice across interview and contest patterns.",
    icon: Trophy,
    accent: "emerald"
  },
  {
    label: "Internships",
    value: "2",
    description: "AI/ML engineering plus hiring research and strategy work.",
    icon: BriefcaseBusiness,
    accent: "blue"
  },
  {
    label: "GPA",
    value: "8.5",
    description: "Through first and second year of B.Tech CS & AI.",
    icon: GraduationCap,
    accent: "cyan"
  },
  {
    label: "Open source PRs",
    value: "15+",
    description: "Hacktoberfest and GitHub contribution signal.",
    icon: GitPullRequest,
    accent: "emerald"
  },
  {
    label: "Production RAG system",
    value: "1",
    description: "Rashtram AI for public policy intelligence.",
    icon: BrainCircuit,
    accent: "cyan"
  }
] as const;

const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.id));

const proofSignals = [
  {
    label: "Best-fit roles",
    value: "AI, data, software",
    description: "Built for internship and early engineering conversations."
  },
  {
    label: "Flagship proof",
    value: "Rashtram AI",
    description: "A live RAG system around public policy intelligence."
  },
  {
    label: "Data proof",
    value: "Zomato analytics",
    description: "Dashboard-led business analysis and insight extraction."
  },
  {
    label: "Client proof",
    value: "Salon website",
    description: "Freelance delivery for a real customer-facing business."
  }
] as const;

const roleFitCards = [
  {
    title: "AI/ML internships",
    description: "RAG, LLM app thinking, retrieval workflows, and applied AI product judgment.",
    proof: "Rashtram AI",
    icon: BrainCircuit
  },
  {
    title: "Data analytics roles",
    description: "Cleaning data, finding patterns, building dashboards, and translating results into business insight.",
    proof: "Zomato analysis",
    icon: ServerCog
  },
  {
    title: "Software internships",
    description: "React, TypeScript, Node APIs, Prisma, REST endpoints, and deployment-ready product surfaces.",
    proof: "This portfolio stack",
    icon: Code2
  },
  {
    title: "Full-stack freelance",
    description: "Client-focused websites with clear services, contact flows, responsive UI, and practical delivery.",
    proof: "Hair salon website",
    icon: BriefcaseBusiness
  }
] as const;

function hasLiveProjectLink(project: (typeof projects)[number]) {
  return !project.links.live.startsWith("TODO");
}

export function HomePage() {
  return (
    <div className="space-y-24 pb-8">
      <section className="grid min-h-[calc(100vh-8rem)] items-center gap-10 py-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.82fr)] lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl lg:order-1 order-2"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 px-3 py-2 font-mono text-xs text-accent-cyan">
            <span className="size-2 rounded-full bg-accent-emerald" />
            // AI Engineer + Data Systems Builder
          </div>

          <h1 className="mt-6 max-w-4xl text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia animate-text-gradient sm:text-7xl lg:text-[5.5rem] leading-none hero-float">
            SHUBHAANG KATARUKA
          </h1>

          <p className="mt-6 text-xl font-semibold text-slate-200 light:text-slate-800 sm:text-2xl drop-shadow-md">
            {profile.headline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 light:text-slate-700 sm:text-lg">
            I build AI-powered products, data-driven solutions, and scalable software systems.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton to="/projects" icon={ArrowRight} variant="primary">
              View Projects
            </CTAButton>
            <CTAButton to="/ask-ai" icon={Bot}>
              Ask Shubhaang AI
            </CTAButton>
            <CTAButton href={frontendEnv.resumeUrl} icon={Download}>
              Download Resume
            </CTAButton>
          </div>
        </motion.div>

        <div className="lg:order-2 order-1">
          <HeroSignalPanel />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Portfolio proof summary">
        {proofSignals.map((signal, index) => (
          <motion.article
            key={signal.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-4 backdrop-blur light:border-slate-950/10 light:bg-white/85"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500 light:text-slate-600">
              {signal.label}
            </p>
            <p className="mt-3 text-base font-semibold text-slate-50 light:text-slate-950">{signal.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">{signal.description}</p>
          </motion.article>
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeader
          eyebrow="// career.signal"
          title="Focused signals for AI, data, and software roles."
          description="A compact snapshot of problem solving, applied AI, internships, open-source practice, and academic consistency."
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

      <section className="space-y-8">
        <SectionHeader
          eyebrow="// recruiter.scan"
          title="What a recruiter should notice first."
          description="A focused map from role type to concrete proof, so the portfolio is easy to evaluate in under a minute."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roleFitCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.36, delay: index * 0.05, ease: "easeOut" }}
                className="flex min-h-[16rem] flex-col rounded-lg border border-border bg-white/[0.04] p-5 backdrop-blur transition hover:border-accent-cyan/40 hover:bg-white/[0.06] light:bg-white/85"
              >
                <span className="grid size-11 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
                  <Icon aria-hidden="true" size={19} />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-slate-50 light:text-slate-950">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400 light:text-slate-600">{card.description}</p>
                <div className="mt-auto pt-5">
                  <p className="inline-flex items-center gap-2 rounded-md border border-accent-emerald/20 bg-accent-emerald/10 px-2.5 py-1 font-mono text-xs text-accent-emerald">
                    <Sparkles aria-hidden="true" size={13} />
                    {card.proof}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeader
          eyebrow="// featured.projects"
          title="Three projects that define the portfolio."
          description="The strongest proof areas: AI engineering, data analytics, and client-focused full-stack development."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="flex min-h-[23rem] flex-col rounded-lg border border-border bg-white/[0.04] p-5 backdrop-blur transition hover:border-accent-cyan/45 hover:bg-white/[0.06] light:bg-white/85"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs text-accent-cyan">
                  0x{String(index + 1).padStart(2, "0")}
                </p>
                <ServerCog aria-hidden="true" size={18} className="text-slate-500" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-slate-50 light:text-slate-950">{project.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 light:text-slate-700">{project.summary}</p>
              <div className="mt-5 border-l-2 border-accent-emerald/50 pl-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent-emerald">Impact</p>
                <p className="mt-2 text-sm leading-6 text-slate-300 light:text-slate-700">{project.impact[0]}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-xs text-slate-400 light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <CTAButton
                  to="/projects"
                  icon={ArrowRight}
                  variant={index === 0 ? "primary" : "secondary"}
                  className="w-full"
                >
                  View Case Study
                </CTAButton>
                {hasLiveProjectLink(project) ? (
                  <CTAButton href={project.links.live} icon={ExternalLink} variant="quiet" className="w-full">
                    Live Proof
                  </CTAButton>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-lg border border-border bg-white/[0.03] p-5 backdrop-blur light:bg-white/85 md:grid-cols-[0.9fr_1.1fr] md:p-7">
        <div>
          <p className="font-mono text-sm text-accent-cyan">// current.vector</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-50 light:text-slate-950">
            Building toward useful AI and data systems.
          </h2>
        </div>
        <p className="text-sm leading-7 text-slate-300 light:text-slate-700 sm:text-base">
          {profile.roleSummary} The portfolio is shaped for internships and client work where
          practical engineering, reliable data, and clean software matter.
        </p>
      </section>
    </div>
  );
}
