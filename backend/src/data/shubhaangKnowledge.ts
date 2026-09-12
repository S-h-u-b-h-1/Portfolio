import knowledgeBase from "./knowledge-base.json";
import faqs from "./faqs.json";

export const UNVERIFIED_FALLBACK =
  knowledgeBase.guardrails?.fallback ??
  "I don't have that specific information in my knowledge base. Please visit Shubhaang's LinkedIn, GitHub, or contact him directly for more details.";

export type KnowledgeResponse = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

type FaqEntry = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const shubhaangKnowledge = {
  assistant: knowledgeBase.assistant,
  personality: knowledgeBase.personality,
  guardrails: {
    ...knowledgeBase.guardrails,
    fallback: UNVERIFIED_FALLBACK
  },
  profile: knowledgeBase.profile,
  professionalSummary: knowledgeBase.professionalSummary,
  interests: knowledgeBase.interests,
  technicalSkills: knowledgeBase.technicalSkills,
  projects: knowledgeBase.projects,
  experience: knowledgeBase.experience,
  leadership: knowledgeBase.leadership,
  careerGoals: knowledgeBase.careerGoals,
  faqExamples: knowledgeBase.faqExamples,
  specialBehaviors: knowledgeBase.specialBehaviors,
  responses: [
    {
      id: "greeting",
      question: "Hello",
      keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening", "good afternoon"],
      answer:
        "Hi, I'm Ask Shubhaang AI. Ask me about Shubhaang's AI projects, data analytics work, full-stack systems, internships, leadership, or why he could be a strong fit for your team."
    },
    ...((faqs as FaqEntry[]).map((entry) => ({
      ...entry
    })) as KnowledgeResponse[])
  ] satisfies KnowledgeResponse[]
};
