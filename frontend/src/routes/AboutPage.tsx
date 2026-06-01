import { motion } from "framer-motion";
import { Bot, Code2, Database } from "lucide-react";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { profile } from "../data";

const focusCards = [
  {
    title: "AI systems",
    description: "RAG, NLP, embeddings, and LLM applications for real knowledge workflows.",
    icon: Bot
  },
  {
    title: "Data products",
    description: "SQL, databases, dashboards, and analytics that turn raw data into decisions.",
    icon: Database
  },
  {
    title: "Software delivery",
    description: "React, TypeScript, Node.js, APIs, and responsive product interfaces.",
    icon: Code2
  }
] as const;

export function AboutPage() {
  return (
    <div className="space-y-12 pb-8">
      <SectionHeader
        eyebrow="// about"
        title="Focused on AI systems, data products, and scalable software."
        description={profile.longBio}
        headingLevel="h1"
      />

      <section className="grid gap-4 md:grid-cols-3">
        {focusCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="rounded-lg border border-border bg-white/[0.04] p-5 backdrop-blur transition hover:border-accent-cyan/35 light:bg-white/85"
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

      <section className="rounded-lg border border-border bg-white/[0.035] p-5 backdrop-blur light:bg-white/85 md:p-7">
        <p className="font-mono text-xs text-accent-cyan">// operating.principles</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {profile.differentiators.map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-7 text-slate-300 light:text-slate-700">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-cyan" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
