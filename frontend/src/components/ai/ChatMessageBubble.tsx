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

const providerLabels: Record<ChatApiResponse["provider"], string> = {
  local: "Local knowledge fallback",
  "openai-compatible": "OpenAI-compatible provider",
  gemini: "Gemini provider"
};

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isAssistant = message.role === "assistant";
  const Icon = isAssistant ? Bot : UserRound;

  return (
    <article className={cn("flex gap-4", isAssistant ? "justify-start" : "justify-end")}>
      {isAssistant ? (
        <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-accent-cyan/25 bg-accent-cyan/12 text-accent-cyan">
          <Icon aria-hidden="true" size={18} />
        </span>
      ) : null}

      <div
        className={cn(
          "max-w-[min(48rem,100%)] rounded-3xl px-6 py-5 transition-shadow duration-300",
          isAssistant
            ? "shadow-2xl bg-gradient-to-br from-slate-900/85 to-slate-800/75 text-slate-100"
            : "border border-accent-cyan bg-accent-cyan text-slate-950"
        )}
      >
        <p className="whitespace-pre-wrap text-base leading-7">{message.content}</p>
        {message.meta ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 text-xs text-slate-300">
            <ShieldCheck aria-hidden="true" size={14} className="text-accent-emerald" />
            <span className="font-medium">{providerLabels[message.meta.provider]}</span>
            <span className="text-slate-500">/</span>
            <span className="opacity-80">{message.meta.sources.join(", ")}</span>
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
