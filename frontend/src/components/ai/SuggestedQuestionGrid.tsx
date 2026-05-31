type SuggestedQuestionGridProps = {
  questions: readonly string[];
  disabled?: boolean;
  onSelect: (question: string) => void;
};

export function SuggestedQuestionGrid({ questions, disabled = false, onSelect }: SuggestedQuestionGridProps) {
  return (
    <section aria-labelledby="suggested-questions-title">
      <div className="flex items-center justify-between gap-4">
        <h2 id="suggested-questions-title" className="font-mono text-sm text-accent-cyan">
          // suggested.questions
        </h2>
        <p className="text-xs text-slate-500 light:text-slate-600">{questions.length} prompts</p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(question)}
            className="min-h-12 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm leading-6 text-slate-300 transition hover:border-accent-cyan/55 hover:bg-accent-cyan/10 hover:text-accent-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:cursor-not-allowed disabled:opacity-55 light:border-slate-950/10 light:bg-white light:text-slate-700"
          >
            {question}
          </button>
        ))}
      </div>
    </section>
  );
}

