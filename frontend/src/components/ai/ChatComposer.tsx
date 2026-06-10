import { LoaderCircle, Send } from "lucide-react";
import { type FormEvent, useRef, useEffect } from "react";

type ChatComposerProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatComposer({ value, isLoading, onChange, onSubmit }: ChatComposerProps) {
  const canSubmit = value.trim().length > 0 && !isLoading;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      onSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <label className="sr-only" htmlFor="ask-ai-input">
        Ask Shubhaang AI a question
      </label>
      <div className="flex items-end gap-2 rounded-[2rem] border border-black/10 bg-white pl-5 pr-2 py-2 shadow-inner transition focus-within:border-accent-cyan/50 focus-within:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:focus-within:bg-white/10">
        <textarea
          ref={textareaRef}
          id="ask-ai-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (canSubmit) onSubmit();
            }
          }}
          placeholder="Ask anything about Shubhaang..."
          rows={1}
          className="max-h-[120px] min-h-[1.5rem] flex-1 resize-none bg-transparent py-2.5 text-sm leading-relaxed text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-cyan text-slate-950 transition hover:scale-105 hover:bg-accent-cyan/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:scale-100 disabled:opacity-50"
        >
          {isLoading ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
          ) : (
            <Send aria-hidden="true" size={16} className="ml-0.5" />
          )}
        </button>
      </div>
    </form>
  );
}
