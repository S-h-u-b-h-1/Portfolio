import { LoaderCircle, Send } from "lucide-react";
import type { FormEvent } from "react";

type ChatComposerProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function ChatComposer({ value, isLoading, onChange, onSubmit }: ChatComposerProps) {
  const canSubmit = value.trim().length > 0 && !isLoading;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-gradient-to-br from-slate-900/70 to-slate-800/60 p-3 light:bg-white">
      <label className="sr-only" htmlFor="ask-ai-input">
        Ask Shubhaang AI a question
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <textarea
          id="ask-ai-input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ask about projects, skills, internships, achievements, or career fit..."
          rows={2}
          className="min-h-16 flex-1 resize-none rounded-xl border border-white/8 bg-slate-900/50 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-white light:text-slate-950"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-0 bg-gradient-to-r from-accent-cyan to-accent.blue px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:cursor-not-allowed disabled:opacity-55 sm:self-stretch"
        >
          {isLoading ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" size={17} />
          ) : (
            <Send aria-hidden="true" size={17} />
          )}
          {isLoading ? "Thinking" : "Send"}
        </button>
      </div>
    </form>
  );
}

