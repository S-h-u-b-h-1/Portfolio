import { PageShell } from "../components/layout/PageShell";
import { useSEO } from "../hooks/useSEO";

export function WritingPage() {
  useSEO({
    title: "Writing & Insights | Shubhaang Kataruka",
    description: "Technical writing and business insights by Shubhaang Kataruka on RAG architecture, public policy intelligence, and data analytics.",
    keywords: "technical articles, blog, insights, RAG research, data engineering thoughts"
  });

  return (
    <PageShell
      eyebrow="// insight.archive"
      title="Short writing and technical-business insights."
      description="Static insight cards will start here, covering RAG for public policy, Zomato analytics, SQL for AI students, and business thinking for developers."
    />
  );
}

