import { Bot, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { ChatApiResponse } from "../../services/chatApi";
import { cn } from "../../utils/cn";

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  meta?: Pick<ChatApiResponse, "provider" | "sources">;
};

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

const providerLabels: Record<ChatApiResponse["provider"], string> = {
  local: "Local knowledge fallback",
  "openai-compatible": "OpenAI-compatible provider",
  gemini: "Gemini provider"
};

function useTypingReveal(content: string, enabled: boolean) {
  const [visibleContent, setVisibleContent] = useState(enabled ? "" : content);
  const [isTyping, setIsTyping] = useState(enabled);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!enabled || prefersReducedMotion || content.length === 0) {
      setVisibleContent(content);
      setIsTyping(false);
      return;
    }

    setVisibleContent("");
    setIsTyping(true);

    let currentIndex = 0;
    const chunkSize = content.length > 600 ? 4 : 2;
    const intervalMs = content.length > 600 ? 12 : 18;

    const intervalId = window.setInterval(() => {
      currentIndex = Math.min(content.length, currentIndex + chunkSize);
      setVisibleContent(content.slice(0, currentIndex));

      if (currentIndex >= content.length) {
        window.clearInterval(intervalId);
        setIsTyping(false);
      }
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [content, enabled]);

  return { visibleContent, isTyping };
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";
  const { visibleContent, isTyping } = useTypingReveal(message.content, isAssistant);

  return (
    <article className={cn("flex w-full", isAssistant ? "justify-start" : "justify-end")}>
      <div className="flex max-w-[85%] gap-3 items-end">
        {isAssistant && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-black/5 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            <Bot aria-hidden="true" size={16} />
          </span>
        )}
        
        <div
          className={cn(
            "px-5 py-3.5 text-sm leading-relaxed",
            isAssistant
              ? "rounded-3xl rounded-bl-xl bg-slate-50 border border-black/5 text-slate-800 dark:bg-white/5 dark:border-white/5 dark:text-slate-200"
              : "rounded-3xl rounded-br-xl bg-accent-cyan/10 border border-accent-cyan/20 text-cyan-700 dark:bg-accent-cyan/10 dark:border-accent-cyan/20 dark:text-accent-cyan"
          )}
        >
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-p:leading-relaxed prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-pre:bg-black/5 dark:prose-pre:bg-white/5 [&_*:first-child]:mt-0 [&_*:last-child]:mb-0">
            <ReactMarkdown>{visibleContent}</ReactMarkdown>
            {isTyping ? (
              <span className="ml-1 inline-block h-4 w-1 translate-y-0.5 animate-pulse rounded-full bg-slate-400 dark:bg-slate-500" />
            ) : null}
          </div>
          {message.meta ? (
            <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-black/5 pt-2 text-[10px] text-slate-500 dark:border-white/5 dark:text-slate-400">
              <ShieldCheck aria-hidden="true" size={12} className="text-accent-emerald" />
              <span>{providerLabels[message.meta.provider]}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
