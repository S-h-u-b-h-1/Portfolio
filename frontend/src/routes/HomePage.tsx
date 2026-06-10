import { motion } from "framer-motion";
import { ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, Code2, ServerCog, Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile, projects } from "../data";

const featuredProjectIds = ["rashtram-ai", "zomato-data-analysis", "hair-salon-website"];
const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.id));

export function HomePage() {
  const navigate = useNavigate();
  const [askInput, setAskInput] = useState("");

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askInput.trim()) {
      navigate("/ask-ai", { state: { initialQuery: askInput } });
    }
  };

  return (
    <div className="space-y-32 pb-16">
      {/* HERO SECTION */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-1.5 text-xs font-semibold text-slate-400 backdrop-blur-md">
            <span className="size-2 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            AI Engineer + Data Systems Builder
          </div>

          <h1 className="text-5xl font-black tracking-tighter text-slate-50 sm:text-7xl md:text-8xl">
            Hi, I'm <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia bg-clip-text text-transparent animate-text-gradient">
              Shubhaang Kataruka
            </span>
          </h1>

          {/* Mini Inline Chat / Search widget */}
          <div className="mt-8 w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-2 shadow-2xl backdrop-blur-xl transition hover:border-accent-cyan/30">
            <div className="flex items-center justify-center gap-2 border-b border-white/5 py-2">
              <p className="text-xs text-slate-500">Ask Shubhaang AI</p>
            </div>
            <form onSubmit={handleAskSubmit} className="relative mt-2">
              <div className="flex items-center gap-2 rounded-full border border-white/5 bg-black/20 px-4 py-1.5 transition focus-within:border-accent-cyan/50 focus-within:bg-black/40">
                <input
                  type="text"
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={!askInput.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-cyan text-slate-950 transition hover:scale-105 disabled:opacity-50"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* BENTO BOX GRID (ABOUT & STATS) */}
      <section className="mx-auto max-w-5xl" id="about">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[12rem_12rem]">
          {/* Bento Item 1: GPA/Academics */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="group relative col-span-1 overflow-hidden rounded-3xl border border-[var(--card-border)] bg-gradient-to-br from-[var(--card)] to-transparent p-6 backdrop-blur-md transition hover:border-accent-cyan/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] md:row-span-1"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Academics</span>
                <span className="flex size-8 items-center justify-center rounded-full bg-white/5 text-accent-cyan">
                  <BrainCircuit size={16} />
                </span>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-50">8.5 GPA</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  B.Tech CS & AI at Newton School of Technology. Strong foundation in data structures and algorithms.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Bento Item 2: Central Featured Tech / LeetCode */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group relative col-span-1 overflow-hidden rounded-3xl border border-[var(--card-border)] bg-gradient-to-br from-[var(--card)] to-transparent p-6 backdrop-blur-md transition hover:border-accent-violet/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] md:col-span-2 md:row-span-1"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Problem Solving</span>
                <span className="flex size-8 items-center justify-center rounded-full bg-white/5 text-accent-violet">
                  <Code2 size={16} />
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-5xl font-black text-slate-50">1700+</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">LeetCode Rating</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-200">300+</p>
                  <p className="text-xs text-slate-500">DSA Problems Solved</p>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Bento Item 3: Career / Internships */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group relative col-span-1 overflow-hidden rounded-3xl border border-[var(--card-border)] bg-gradient-to-br from-[var(--card)] to-transparent p-6 backdrop-blur-md transition hover:border-accent-emerald/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] md:col-span-2 md:row-span-1"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Experience</span>
                <span className="flex size-8 items-center justify-center rounded-full bg-white/5 text-accent-emerald">
                  <BriefcaseBusiness size={16} />
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-50">2 Internships</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                  Real-world experience in AI/ML engineering and strategic hiring analysis. Combining technical depth with business understanding.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Bento Item 4: Open Source */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--card-border)] bg-gradient-to-br from-[var(--card)] to-transparent p-6 backdrop-blur-md transition hover:border-accent-fuchsia/40 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)] md:row-span-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Community</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/5 text-accent-fuchsia">
                <Sparkles size={16} />
              </span>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-50">15+ PRs</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Active open-source contributor. Hacktoberfest participant with strong GitHub activity.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* FEATURED PROJECTS BENTO */}
      <section className="mx-auto max-w-5xl" id="projects">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-50">Featured Work</h2>
          <button
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-2 text-sm font-semibold text-accent-cyan transition hover:text-white"
          >
            View all projects
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex min-h-[24rem] cursor-pointer flex-col overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card)] p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl"
              onClick={() => navigate("/projects")}
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-full bg-white/5 text-slate-300 transition group-hover:bg-accent-cyan group-hover:text-slate-950">
                  <ServerCog size={18} />
                </div>
                <ArrowRight size={18} className="text-slate-500 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-50">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-3">{project.summary}</p>
              
              <div className="mt-auto pt-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-accent-emerald">Impact</p>
                <p className="text-xs leading-relaxed text-slate-300 line-clamp-2">{project.impact[0]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
