import { motion } from "framer-motion";
import { Bot, Database, LineChart, Rocket } from "lucide-react";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { Timeline } from "../components/portfolio/Timeline";
import { profile } from "../data";
import { aboutTimeline } from "../data/aboutTimeline";

const focusCards = [
  {
    title: "AI systems",
    description: "RAG, NLP, embeddings, and product flows that make complex information easier to use.",
    icon: Bot
  },
  {
    title: "Data foundations",
    description: "SQL, databases, dashboards, and analytics that turn raw data into decisions.",
    icon: Database
  },
  {
    title: "Business lens",
    description: "Finance, stock market analysis, sponsorship, and investment planning awareness.",
    icon: LineChart
  },
  {
    title: "Execution track",
    description: "Internships, freelance work, DSA practice, open source, and leadership experience.",
    icon: Rocket
  }
] as const;

export function AboutPage() {
  return (
    <div className="space-y-16 pb-8">
      <SectionHeader
        eyebrow="// about.story"
        title="A CS & AI student with a systems mind and business-aware instincts."
        description={profile.longBio}
        headingLevel="h1"
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {focusCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
              className="rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur transition hover:border-accent-cyan/40 light:bg-white/85"
            >
              <span className="grid size-10 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
                <Icon aria-hidden="true" size={18} />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-slate-50 light:text-slate-950">
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-400 light:text-slate-600">
                {card.description}
              </p>
            </motion.article>
          );
        })}
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
        <div className="space-y-6">
          <SectionHeader
            eyebrow="// trajectory.map"
            title="From school leadership to AI/data execution."
            description="The timeline connects academic consistency, leadership, internships, public policy AI, global representation, and current career direction."
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-lg border border-border bg-white/[0.04] p-5 backdrop-blur light:bg-white/85"
          >
            <p className="font-mono text-xs text-accent-cyan">// operating.principles</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300 light:text-slate-700">
              {profile.differentiators.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <Timeline items={aboutTimeline} />
      </section>
    </div>
  );
}
