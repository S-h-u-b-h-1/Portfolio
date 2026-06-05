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
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-gradient-to-br from-slate-900/75 to-slate-800/65 p-4 shadow-glow light:bg-white"
    >
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
          className="min-h-[4.5rem] flex-1 resize-none rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-base leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-accent-cyan/70 focus:ring-2 focus:ring-accent-cyan/20 light:border-slate-950/10 light:bg-transparent light:text-slate-950"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-transparent px-6 py-3 text-base font-semibold text-accent-cyan transition hover:bg-white/10 light:hover:bg-slate-950/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:cursor-not-allowed disabled:opacity-55 sm:self-stretch"
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

