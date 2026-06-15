import { faqs } from "../data";
import type { ChatApiResponse } from "./chatApi";

const UNVERIFIED_FALLBACK =
  "I don't have that specific information in my knowledge base. Please visit Shubhaang's LinkedIn, GitHub, or contact him directly for more details.";
const FALLBACK_SOURCE = "frontend-verified-knowledge";
const STOP_WORDS = new Set(["a", "an", "and", "are", "for", "has", "his", "is", "of", "the", "to", "what", "which", "who", "why"]);

type LocalFallbackAnswer = {
  keywords: string[];
  answer: string;
};

const fallbackAnswers: LocalFallbackAnswer[] = [
  {
    keywords: ["shubhaang", "kataruka", "kataruak", "who is", "about", "profile", "background", "intro", "introduction"],
    answer:
      "Shubhaang Kataruka is a 3rd-year B.Tech student in Computer Science and Artificial Intelligence at Rishihood University x Newton School of Technology.\n\nHe is an AI engineer and data systems builder focused on turning complex information into useful products:\n\n- **AI Applications:** Builds RAG systems and LLM-powered tools, including Rashtram AI for public policy intelligence.\n- **Data Analytics & Databases:** Works with SQL, PostgreSQL, Pandas, dashboards, and business intelligence workflows.\n- **Full-Stack Development:** Ships practical web applications with React, TypeScript, Node.js, Express, Prisma, and REST APIs."
  },
  {
    keywords: ["projects", "project", "built", "work", "demo", "live", "links"],
    answer:
      "Featured projects include:\n\n- **Rashtram AI:** RAG-based public policy intelligence platform.\n- **Employee Task Management and Billing System:** Full-stack business workflow system.\n- **Zomato Data Analysis:** SQL/Pandas analytics and dashboard-style business insights.\n- **AI Adoption Project:** Streamlit analytics platform for organizational AI adoption trends."
  },
  ...faqs.map((faq) => ({
    keywords: faq.keywords,
    answer: faq.answer
  }))
];

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^\w\s+#/-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function findFallbackAnswer(question: string) {
  const normalizedQuestion = normalizeText(question);
  const questionTokens = new Set(tokenize(question));
  let bestMatch: { answer: string; score: number } | undefined;

  for (const fallbackAnswer of fallbackAnswers) {
    const score = fallbackAnswer.keywords.reduce((currentScore, keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      const keywordTokens = tokenize(normalizedKeyword);

      if (normalizedQuestion.includes(normalizedKeyword)) {
        return currentScore + 8 + keywordTokens.length;
      }

      return currentScore + keywordTokens.filter((token) => questionTokens.has(token)).length;
    }, 0);

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { answer: fallbackAnswer.answer, score };
    }
  }

  return bestMatch && bestMatch.score >= 2 ? bestMatch.answer : UNVERIFIED_FALLBACK;
}

export function createLocalChatFallback(question: string): ChatApiResponse {
  return {
    answer: findFallbackAnswer(question),
    source: "local-knowledge",
    provider: "local",
    sources: [FALLBACK_SOURCE]
  };
}
