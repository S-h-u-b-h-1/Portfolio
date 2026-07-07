import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { experience } from "../data";
import { useSEO } from "../hooks/useSEO";

export function ExperiencePage() {
  useSEO({
    title: "Experience & Internships | Shubhaang Kataruka",
    description: "Shubhaang Kataruka's professional experience as an AI/ML Engineer Intern, Data Strategy Intern, and freelance full-stack developer.",
    keywords: "career history, internships, AI ML intern, Rishihood placement intern, software engineering work"
  });

  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// experience"
        title="Internships and client work tied to AI, data, and software."
        description="A concise view of the work most relevant to AI/ML internships, analytics roles, software engineering internships, and full-stack client projects."
        headingLevel="h1"
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {experience.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            className="flex h-full flex-col rounded-lg border border-border bg-white/[0.04] p-5 backdrop-blur light:bg-white/85"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-accent-cyan">{item.type}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-50 light:text-slate-950">
                  {item.role}
                </h2>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
                <BriefcaseBusiness aria-hidden="true" size={18} />
              </span>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-300 light:text-slate-700">
              {item.organization}
            </p>
            <p className="mt-1 font-mono text-xs text-slate-500 light:text-slate-600">
              {item.timeframe}
            </p>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300 light:text-slate-700">
              {item.responsibilities.slice(0, 3).map((responsibility) => (
                <li key={responsibility} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-cyan" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {item.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-xs text-slate-400 light:border-slate-950/10 light:bg-slate-950/[0.04] light:text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
