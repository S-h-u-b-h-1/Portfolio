import { motion } from "framer-motion";
import { ArrowRight, Bot, BrainCircuit, BriefcaseBusiness, Code2, ServerCog, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "../hooks/useTypewriter";
import { ChatComposer } from "../components/ai/ChatComposer";
import { ChatMessageBubble, type ChatMessage } from "../components/ai/ChatMessageBubble";
import { SuggestedQuestionGrid } from "../components/ai/SuggestedQuestionGrid";
import { profile, projects } from "../data";
import { askShubhaangAI } from "../services/chatApi";

const featuredProjectIds = ["employee-task-management", "rashtram-ai", "zomato-data-analysis", "hair-salon-website"];
const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.id));

const suggestedQuestions = [
  "What is Rashtram AI?",
  "Why should I hire Shubhaang?",
  "What are his strongest technical skills?",
  "Tell me about his full-stack experience."
] as const;

const initialMessage: ChatMessage = {
  id: "assistant-intro",
  role: "assistant",
  content: "Hey, I am Shubhaang's Assistant. How can I help you?",
  meta: {
    provider: "local",
    sources: ["verified-portfolio-knowledge"]
  }
};

const CONNECTION_ERROR_MESSAGE = "I could not connect to the AI service right now. Please try again.";

function createMessageId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function HomePage() {
  const navigate = useNavigate();

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [askInput, setAskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  
  const typedName = useTypewriter([
    "Shubhaang.",
    "an AI Engineer.",
    "a Builder."
  ], 100, 2500);

  const abortControllerRef = useRef<AbortController | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatExpanded) {
      transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isLoading, isChatExpanded]);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    []
  );

  const submitQuestion = useCallback(
    async (questionText?: string) => {
      const question = (questionText ?? askInput).trim();

      if (!question || isLoading) return;

      setIsChatExpanded(true);
      setAskInput("");
      setErrorMessage("");
      setIsLoading(true);
      abortControllerRef.current?.abort();

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const userMessage: ChatMessage = {
        id: createMessageId("user"),
        role: "user",
        content: question
      };

      setMessages((currentMessages) => [...currentMessages, userMessage]);

      try {
        const response = await askShubhaangAI(question, abortController.signal);
        const assistantMessage: ChatMessage = {
          id: createMessageId("assistant"),
          role: "assistant",
          content: response.answer,
          meta: {
            provider: response.provider,
            sources: response.sources
          }
        };

        setMessages((currentMessages) => [...currentMessages, assistantMessage]);
      } catch (error) {
        if (abortController.signal.aborted) return;

        setErrorMessage(error instanceof Error ? error.message : CONNECTION_ERROR_MESSAGE);
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: createMessageId("assistant-error"),
            role: "assistant",
            content: CONNECTION_ERROR_MESSAGE,
            meta: {
              provider: "local",
              sources: ["verified-portfolio-knowledge"]
            }
          }
        ]);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [askInput, isLoading]
  );

  return (
    <div className="space-y-32 pb-16">
      {/* HERO SECTION (Chat only) */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-6 px-4"
        >
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-6xl dark:text-slate-50">
            Let's talk.
          </h1>
          <p className="max-w-md text-base text-slate-500 dark:text-slate-400">
            Ask my AI assistant anything about my experience, skills, or projects.
          </p>

          {/* Integrated Chat Widget */}
          <div className="mt-4 w-full max-w-2xl overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-2xl backdrop-blur-xl transition-all duration-500 light:border-slate-900/10 dark:border-white/10 dark:bg-[#0f1115]/80">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-3 dark:border-white/5">
              <div className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan">
                  <Bot size={14} aria-hidden="true" />
                </span>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">Ask Shubhaang AI</p>
              </div>
              <p className="text-sm text-slate-500">Online</p>
            </div>

            {/* Transcript (collapsible) */}
            <motion.div 
              initial={false}
              animate={{ height: isChatExpanded ? "24rem" : "0px", opacity: isChatExpanded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col gap-4 overflow-y-auto px-6"
              style={{ paddingTop: isChatExpanded ? "1rem" : "0", paddingBottom: isChatExpanded ? "1rem" : "0" }}
            >
              {messages.map((message) => (
                <ChatMessageBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <ChatMessageBubble
                  message={{ id: "assistant-loading", role: "assistant", content: "Thinking..." }}
                />
              )}
              <div ref={transcriptEndRef} />
            </motion.div>

            {/* Composer */}
            <div className="border-t border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.01]">
              <div className="mb-4 text-left">
                <SuggestedQuestionGrid
                  questions={suggestedQuestions}
                  disabled={isLoading}
                  onSelect={(q) => {
                    setAskInput(q);
                    submitQuestion(q);
                  }}
                />
              </div>

              {errorMessage && (
                <p className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-left text-xs text-red-500 dark:text-red-300">
                  {errorMessage}
                </p>
              )}

              <ChatComposer
                value={askInput}
                isLoading={isLoading}
                onChange={setAskInput}
                onSubmit={() => void submitQuestion()}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT ME SECTION (Scroll Down) */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-16 pb-12 text-center" id="about">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/50 px-5 py-2 text-sm font-semibold text-slate-600 backdrop-blur-md light:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span className="size-2 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            AI Engineer + Data Systems Builder
          </div>

          <h2 className="mt-4 text-5xl font-black tracking-tighter text-slate-900 sm:text-7xl md:text-8xl dark:text-slate-50">
            Hi, I'm <br className="sm:hidden" />
            <span className="text-black dark:text-white">
              {typedName}
              <span className="animate-pulse font-light text-slate-400">|</span>
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            I specialize in building scalable AI systems, data products, and full-stack applications. With a strong foundation in CS & AI, I transform complex data into actionable software solutions.
          </p>
        </motion.div>
      </section>

      {/* BENTO BOX GRID (ABOUT & STATS) */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[12rem_12rem]">
          {/* Bento Item 1: GPA/Academics */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="group relative col-span-1 overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md transition hover:border-accent-cyan/40 hover:shadow-lg light:border-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] md:row-span-1"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Academics</span>
                <span className="flex size-10 items-center justify-center rounded-full bg-accent-cyan/10 text-accent-cyan">
                  <BrainCircuit size={16} />
                </span>
              </div>
              <div>
                <p className="text-5xl font-black text-slate-900 dark:text-slate-50">8.5 GPA</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
            className="group relative col-span-1 overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md transition hover:border-accent-violet/40 hover:shadow-lg light:border-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] md:col-span-2 md:row-span-1"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Problem Solving</span>
                <span className="flex size-10 items-center justify-center rounded-full bg-accent-violet/10 text-accent-violet">
                  <Code2 size={16} />
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-6xl font-black text-slate-900 dark:text-slate-50">1700+</p>
                  <p className="mt-2 text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">LeetCode Rating</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">300+</p>
                  <p className="text-sm font-medium text-slate-500">DSA Problems Solved</p>
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
            className="group relative col-span-1 overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md transition hover:border-accent-emerald/40 hover:shadow-lg light:border-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] md:col-span-2 md:row-span-1"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Experience</span>
                <span className="flex size-10 items-center justify-center rounded-full bg-accent-emerald/10 text-accent-emerald">
                  <BriefcaseBusiness size={16} />
                </span>
              </div>
              <div>
                <p className="text-4xl font-black text-slate-900 dark:text-slate-50">2 Internships</p>
                <p className="mt-2 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300">
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
            className="group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-6 backdrop-blur-md transition hover:border-accent-fuchsia/40 hover:shadow-lg light:border-slate-900/10 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] md:row-span-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-500">Community</span>
              <span className="flex size-10 items-center justify-center rounded-full bg-accent-fuchsia/10 text-accent-fuchsia">
                <Sparkles size={16} />
              </span>
            </div>
            <div>
              <p className="text-5xl font-black text-slate-900 dark:text-slate-50">15+ PRs</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Active open-source contributor. Hacktoberfest participant with strong GitHub activity.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* FEATURED PROJECTS BENTO */}
      <section className="mx-auto max-w-5xl" id="projects">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50">Featured Work</h2>
          <button
            onClick={() => navigate("/projects")}
            className="group flex items-center gap-2 text-base font-semibold text-accent-cyan transition hover:text-accent-cyan/80"
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
              className="group flex min-h-[24rem] cursor-pointer flex-col overflow-hidden rounded-3xl border border-black/5 bg-white/80 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-black/10 hover:shadow-xl light:border-slate-900/10 dark:border-white/10 dark:bg-[#13151a] dark:hover:border-white/20"
              onClick={() => navigate("/projects")}
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover:bg-accent-cyan group-hover:text-white dark:bg-white/5 dark:text-slate-400">
                  <ServerCog size={18} />
                </div>
                <ArrowRight size={18} className="text-slate-400 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-50">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">{project.summary}</p>
              
              <div className="mt-auto pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent-emerald">Impact</p>
                <p className="text-sm leading-relaxed text-slate-700 line-clamp-2 dark:text-slate-300">{project.impact[0]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-200">
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
