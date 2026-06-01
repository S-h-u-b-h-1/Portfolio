import { motion } from "framer-motion";
import { Bot, Database, LockKeyhole, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatComposer } from "../components/ai/ChatComposer";
import { ChatMessageBubble, type ChatMessage } from "../components/ai/ChatMessageBubble";
import { SuggestedQuestionGrid } from "../components/ai/SuggestedQuestionGrid";
import { SectionHeader } from "../components/portfolio/SectionHeader";
import { askShubhaangAI } from "../services/chatApi";

const suggestedQuestions = [
  "What is Rashtram AI?",
  "Why should I hire Shubhaang?",
  "What are his strongest technical skills?",
  "Which projects show his AI/ML ability?",
  "What is his data analytics experience?",
  "What is his full-stack experience?",
  "Tell me about his leadership and business background."
] as const;

const initialMessage: ChatMessage = {
  id: "assistant-intro",
  role: "assistant",
  content:
    "Hi, I’m Ask Shubhaang AI. If an AI provider is configured, I answer with Shubhaang’s verified portfolio knowledge as context. If not, I safely fall back to local verified answers.",
  meta: {
    provider: "local",
    sources: ["verified-portfolio-knowledge"]
  }
};

const CONNECTION_ERROR_MESSAGE = "I could not connect to the AI service right now. Please try again.";

const guardrailCards = [
  {
    title: "Provider-ready",
    description: "Uses Gemini or any OpenAI-compatible provider when configured on the backend.",
    icon: Database
  },
  {
    title: "No guessing",
    description: "Unknown details return a verified-information fallback.",
    icon: LockKeyhole
  },
  {
    title: "Recruiter-ready",
    description: "Best for projects, skills, internships, achievements, and fit.",
    icon: Sparkles
  }
] as const;

function createMessageId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function AskAIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  useEffect(
    () => () => {
      abortControllerRef.current?.abort();
    },
    []
  );

  const submitQuestion = useCallback(
    async (questionText?: string) => {
      const question = (questionText ?? input).trim();

      if (!question || isLoading) {
        return;
      }

      setInput("");
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
        if (abortController.signal.aborted) {
          return;
        }

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
    [input, isLoading]
  );

  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="// ask.shubhaang.ai"
        title="Ask Shubhaang AI."
        description="A grounded portfolio assistant for questions about Shubhaang’s AI projects, data work, software skills, internships, and career fit."
        headingLevel="h1"
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {guardrailCards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur light:bg-white/85"
            >
              <span className="grid size-10 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
                <Icon aria-hidden="true" size={18} />
              </span>
              <h2 className="mt-4 text-base font-semibold text-slate-50 light:text-slate-950">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400 light:text-slate-600">{card.description}</p>
            </motion.article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.68fr_0.32fr]">
        <div className="rounded-lg border border-border bg-white/[0.045] p-4 backdrop-blur light:bg-white/85 sm:p-5">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <span className="grid size-10 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
              <Bot aria-hidden="true" size={19} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-50 light:text-slate-950">Ask Shubhaang AI</h2>
              <p className="font-mono text-xs text-slate-500 light:text-slate-600">POST /api/chat</p>
            </div>
          </div>

          <div className="mt-5 flex max-h-[34rem] min-h-[26rem] flex-col gap-4 overflow-y-auto pr-1" aria-live="polite">
            {messages.map((message) => (
              <ChatMessageBubble key={message.id} message={message} />
            ))}
            {isLoading ? (
              <ChatMessageBubble
                message={{
                  id: "assistant-loading",
                  role: "assistant",
                  content: "Reading verified portfolio context..."
                }}
              />
            ) : null}
            <div ref={transcriptEndRef} />
          </div>

          {errorMessage ? (
            <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-200 light:text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <div className="mt-5">
            <ChatComposer
              value={input}
              isLoading={isLoading}
              onChange={setInput}
              onSubmit={() => void submitQuestion()}
            />
          </div>
        </div>

        <aside className="space-y-5">
          <SuggestedQuestionGrid
            questions={suggestedQuestions}
            disabled={isLoading}
            onSelect={(question) => void submitQuestion(question)}
          />

          <section className="rounded-lg border border-border bg-white/[0.045] p-5 backdrop-blur light:bg-white/85">
            <p className="font-mono text-sm text-accent-emerald">// response.policy</p>
            <div className="mt-3 space-y-3 text-sm leading-7 text-slate-400 light:text-slate-600">
              <p>The assistant should answer only from verified portfolio data. Missing details use:</p>
              <p className="rounded-lg border border-white/10 bg-slate-950/45 px-3 py-2 font-mono text-xs text-slate-300 light:border-slate-950/10 light:bg-white light:text-slate-700">
                I do not have verified information about that yet.
              </p>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
