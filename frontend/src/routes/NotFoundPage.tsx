import { Link } from "react-router-dom";
import { PageShell } from "../components/layout/PageShell";

export function NotFoundPage() {
  return (
    <PageShell
      eyebrow="// route.missing"
      title="This route does not exist yet."
      description="Use the navigation to return to the portfolio."
    >
      <Link to="/" className="inline-flex rounded-lg bg-accent-cyan px-4 py-3 text-sm font-semibold text-slate-950">
        Back to home
      </Link>
    </PageShell>
  );
}

