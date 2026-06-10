type SuggestedQuestionGridProps = {
  questions: readonly string[];
  disabled?: boolean;
  onSelect: (question: string) => void;
};

export function SuggestedQuestionGrid({ questions, disabled = false, onSelect }: SuggestedQuestionGridProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center" aria-label="Suggested questions">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(question)}
          className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:border-accent-cyan/50 hover:bg-accent-cyan/10 hover:text-accent-cyan active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
