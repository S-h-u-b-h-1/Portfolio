import { Bot, ShieldCheck } from "lucide-react";
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

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";

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
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-black/5 dark:prose-pre:bg-white/5 whitespace-pre-wrap">
            <ReactMarkdown>{message.content}</ReactMarkdown>
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
