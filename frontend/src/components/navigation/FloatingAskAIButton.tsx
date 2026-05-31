import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

export function FloatingAskAIButton() {
  return (
    <Link
      to="/ask-ai"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-lg border border-accent-cyan/40 bg-background/90 px-4 py-3 text-sm font-semibold text-accent-cyan shadow-glow backdrop-blur transition hover:-translate-y-0.5 hover:border-accent-cyan hover:bg-accent-cyan hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan light:bg-white/90 sm:bottom-6 sm:right-6"
      aria-label="Ask Shubhaang AI"
    >
      <Bot aria-hidden="true" size={18} />
      <span className="hidden sm:inline">Ask AI</span>
    </Link>
  );
}

