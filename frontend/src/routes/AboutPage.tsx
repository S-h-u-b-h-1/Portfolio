import { motion } from "framer-motion";
import { Bot, Code2, Database } from "lucide-react";
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
    <div className="space-y-12 pb-16">
      <div className="grid gap-8 md:grid-cols-2 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[4/5] md:aspect-auto w-full overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/10 shadow-xl"
        >
          <img 
            src="https://6a23120466b5d7d9ebc84556.imgix.net/IMG_7243.jpeg" 
            alt="Shubhaang Kataruka" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-4xl font-black text-white sm:text-5xl">Shubhaang.</h1>
            <p className="mt-2 text-lg font-bold text-accent-cyan">AI Engineer & Builder</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center rounded-[2rem] border border-black/5 bg-white/60 p-8 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-10"
        >
          <p className="font-mono text-sm font-bold text-accent-cyan uppercase tracking-widest">// about</p>
          <h2 className="mt-6 text-4xl font-black leading-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            Focused on AI systems, data products, and scalable software.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {profile.longBio}
          </p>
        </motion.div>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {focusCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="group rounded-3xl border border-black/5 bg-white/60 p-8 backdrop-blur-md transition hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-accent-cyan/10 text-accent-cyan transition group-hover:bg-accent-cyan group-hover:text-white">
                <Icon aria-hidden="true" size={24} />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-50">
                {card.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {card.description}
              </p>
            </motion.article>
          );
        })}
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        className="rounded-3xl border border-black/5 bg-white/60 p-8 backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-10"
      >
        <p className="font-mono text-sm font-bold text-accent-cyan uppercase tracking-widest">// operating.principles</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {profile.differentiators.map((item) => (
            <div key={item} className="flex gap-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              <span className="mt-2.5 size-2 shrink-0 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
