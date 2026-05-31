import { achievements } from "./achievements";
import { education } from "./education";
import { experience } from "./experience";
import { faqs } from "./faqs";
import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";
import { writingInsights } from "./writingInsights";

export const aiKnowledgeBase = {
  assistantName: "Ask Shubhaang AI",
  guardrails: [
    "Answer only from verified portfolio data.",
    "Do not invent links, dates, employers, metrics, or credentials.",
    "Use placeholder language when proof or assets are still marked TODO.",
    "Keep answers ambitious but not arrogant."
  ],
  suggestedQuestions: faqs.map((faq) => faq.question),
  verifiedFacts: {
    profile,
    education,
    experience,
    projects,
    skills,
    achievements,
    writingInsights
  },
  fallbackAnswers: faqs
};

