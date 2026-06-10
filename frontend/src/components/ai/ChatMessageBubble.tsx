import { Bot, ShieldCheck } from "lucide-react";
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
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400">
            <Bot aria-hidden="true" size={16} />
          </span>
        )}
        
        <div
          className={cn(
            "px-5 py-3.5 text-sm leading-relaxed",
            isAssistant
              ? "rounded-3xl rounded-bl-xl bg-white/5 border border-white/5 text-slate-200"
              : "rounded-3xl rounded-br-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.meta ? (
            <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/5 pt-2 text-[10px] text-slate-400">
              <ShieldCheck aria-hidden="true" size={12} className="text-accent-emerald" />
              <span>{providerLabels[message.meta.provider]}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
