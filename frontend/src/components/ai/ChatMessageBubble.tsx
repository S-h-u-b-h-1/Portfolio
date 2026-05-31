import { Bot, ShieldCheck, UserRound } from "lucide-react";
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

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";
  const Icon = isAssistant ? Bot : UserRound;

  return (
    <article className={cn("flex gap-3", isAssistant ? "justify-start" : "justify-end")}>
      {isAssistant ? (
        <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan">
          <Icon aria-hidden="true" size={18} />
        </span>
      ) : null}

      <div
        className={cn(
          "max-w-[min(42rem,100%)] rounded-lg border px-4 py-3",
          isAssistant
            ? "border-border bg-white/[0.045] text-slate-200 light:bg-white light:text-slate-800"
            : "border-accent-cyan bg-accent-cyan text-slate-950"
        )}
      >
        <p className="whitespace-pre-wrap text-sm leading-7">{message.content}</p>
        {message.meta ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 text-xs text-slate-400 light:border-slate-950/10 light:text-slate-600">
            <ShieldCheck aria-hidden="true" size={14} className="text-accent-emerald" />
            <span>{message.meta.provider === "local" ? "Local knowledge base" : "OpenAI-compatible provider"}</span>
            <span className="text-slate-600 light:text-slate-400">/</span>
            <span>{message.meta.sources.join(", ")}</span>
          </div>
        ) : null}
      </div>

      {!isAssistant ? (
        <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg border border-accent-emerald/25 bg-accent-emerald/10 text-accent-emerald">
          <Icon aria-hidden="true" size={18} />
        </span>
      ) : null}
    </article>
  );
}

