import { faqs, profile, projects } from "../data";
import type { ChatApiResponse } from "./chatApi";

const UNVERIFIED_FALLBACK = "I do not have verified information about that yet.";
const FALLBACK_SOURCE = "frontend-verified-knowledge";
const STOP_WORDS = new Set(["a", "an", "and", "are", "for", "has", "his", "is", "of", "the", "to", "what", "which", "who", "why"]);

type LocalFallbackAnswer = {
  keywords: string[];
  answer: string;
};

const fallbackAnswers: LocalFallbackAnswer[] = [
  {
    keywords: ["shubhaang", "who is", "about", "profile", "background", "intro", "introduction"],
    answer: `${profile.name} is a ${profile.roleSummary} ${profile.shortBio}`
  },
  {
    keywords: ["projects", "project", "built", "work", "demo", "live", "links"],
    answer: `Featured projects include ${projects
      .slice(0, 3)
      .map((project) => `${project.title}${project.links.live.startsWith("TODO") ? "" : ` (${project.links.live})`}`)
      .join(", ")}.`
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
