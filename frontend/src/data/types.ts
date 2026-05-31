export type ProfileStat = {
  label: string;
  value: string;
  description: string;
};

export type Profile = {
  name: string;
  headline: string;
  roleSummary: string;
  shortBio: string;
  longBio: string;
  location: string;
  currentStatus: string;
  interests: string[];
  focusAreas: string[];
  differentiators: string[];
  stats: ProfileStat[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    leetcode: string;
    resume: string;
  };
};

export type EducationItem = {
  id: string;
  institution: string;
  program: string;
  location: string;
  timeframe: string;
  score?: string;
  summary: string;
  highlights: string[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  type: "Internship" | "Freelance" | "Leadership" | "Business";
  timeframe: string;
  location: string;
  summary: string;
  responsibilities: string[];
  tags: string[];
  proofUrl: string;
};

export type ProjectCategory =
  | "AI/ML"
  | "Data Analytics"
  | "Full Stack"
  | "Business"
  | "Public Policy"
  | "Freelance"
  | "Open Source";

export type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  status: "case-study-ready" | "case-study-needed" | "in-progress" | "placeholder";
  categories: ProjectCategory[];
  tags: string[];
  summary: string;
  problem: string;
  role: string;
  techStack: string[];
  process: string[];
  features: string[];
  impact: string[];
  futureImprovements: string[];
  links: {
    live: string;
    repo: string;
    caseStudy: string;
  };
  image: string;
  proofStatus: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  skills: Array<{
    name: string;
    level: "Strong" | "Working" | "Exploring";
    proof: string;
  }>;
};

export type AchievementItem = {
  id: string;
  title: string;
  organization: string;
  year: string;
  summary: string;
  tags: string[];
  proofUrl: string;
  priority: number;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote: string;
  status: "placeholder" | "ready";
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export type WritingInsight = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  status: "draft" | "outline" | "published";
};

