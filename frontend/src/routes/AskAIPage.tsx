import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatComposer } from "../components/ai/ChatComposer";
import { ChatMessageBubble, type ChatMessage } from "../components/ai/ChatMessageBubble";
import { SuggestedQuestionGrid } from "../components/ai/SuggestedQuestionGrid";
import { askShubhaangAI } from "../services/chatApi";

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
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 pb-12 pt-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.01] p-4 pl-6">
          <span className="flex size-8 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
            <Bot size={16} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-sm font-semibold text-slate-100">Ask Shubhaang AI</h1>
            <p className="text-xs text-slate-400">Online • Ready to answer</p>
          </div>
        </div>

        <div className="flex h-[28rem] flex-col gap-4 overflow-y-auto p-4 sm:h-[32rem] sm:p-6" aria-live="polite">
          {messages.map((message) => (
            <ChatMessageBubble key={message.id} message={message} />
          ))}
          {isLoading ? (
            <ChatMessageBubble
              message={{
                id: "assistant-loading",
                role: "assistant",
                content: "Thinking..."
              }}
            />
          ) : null}
          <div ref={transcriptEndRef} />
        </div>

        <div className="border-t border-white/10 bg-white/[0.01] p-4 sm:p-6">
          <div className="mb-4">
            <SuggestedQuestionGrid
              questions={suggestedQuestions}
              disabled={isLoading}
              onSelect={(question) => void submitQuestion(question)}
            />
          </div>

          {errorMessage ? (
            <p className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-xs text-red-300">
              {errorMessage}
            </p>
          ) : null}

          <ChatComposer
            value={input}
            isLoading={isLoading}
            onChange={setInput}
            onSubmit={() => void submitQuestion()}
          />
        </div>
      </motion.div>
    </div>
  );
}
