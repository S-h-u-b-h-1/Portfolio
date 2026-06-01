export const UNVERIFIED_FALLBACK = "I do not have verified information about that yet.";

export type KnowledgeResponse = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const shubhaangKnowledge = {
  profile: {
    name: "Shubhaang Kataruka",
    current:
      "3rd-year B.Tech Computer Science & Artificial Intelligence student at Rishihood University x Newton School of Technology",
    positioning: "AI Engineer + Data Systems Builder",
    tagline: "Building AI-powered systems, data products, and scalable software.",
    interests: [
      "AI/ML",
      "RAG",
      "data analytics",
      "SQL",
      "databases",
      "full-stack development"
    ]
  },
  projects: [
    {
      name: "Rashtram AI",
      summary:
        "A RAG-based public policy intelligence system that helps users understand parliamentary bills, policies, and citizen impact.",
      url: "https://rashtramai.vercel.app/",
      highlights: ["RAG architecture", "LLM application", "vector search", "public policy intelligence", "AI engineering"]
    },
    {
      name: "Zomato Data Analysis",
      summary:
        "A data analytics project focused on extracting business insights from restaurant, customer, pricing, and rating data.",
      url: "https://public.tableau.com/app/profile/kush.puri/viz/Zomato_Delivery_Analysis/Dashboard1",
      highlights: ["data cleaning", "exploratory analysis", "SQL/Pandas", "Tableau/Sheets dashboards", "business insights"]
    },
    {
      name: "Hair Salon Website",
      summary:
        "A client-focused full-stack website built for a hair salon with a modern responsive interface.",
      url: "https://www.themaxxsalon.shop/",
      highlights: ["full-stack development", "client work", "responsive UI", "booking/contact/service sections"]
    }
  ],
  experience: [
    {
      role: "AI/ML Engineer Intern",
      organization: "Rashtram School of Public Leadership",
      summary: "Worked on Rashtram AI, a RAG-based assistant for public policy, bills, discussions, and citizen impact."
    },
    {
      role: "Hiring Research & Strategy Intern",
      organization: "Rishihood / Placement & Career Advancement Team",
      summary: "Supported hiring research, role research, and placement strategy during first semester."
    },
    {
      role: "Freelance Full-Stack Developer",
      organization: "Hair Salon Website",
      summary: "Built a responsive client-facing website with service, booking/contact, and business presentation sections."
    }
  ],
  technicalHighlights: [
    "LeetCode 1700+ rating",
    "300+ DSA problems solved",
    "GPA 8.5",
    "Hacktoberfest Super Contributor 2024 & 2025",
    "PAN IIT 2026 delegate"
  ],
  additionalBackground: [
    "Youngest MDRT qualifier FY25 at Aditya Birla Capital / ABSLI",
    "Sponsorship Manager for college tech fest",
    "School leadership and National Integration Camp involvement",
    "Interest in stock market patterns and investment planning"
  ],
  responses: [
    {
      id: "rashtram-ai",
      question: "What is Rashtram AI?",
      keywords: ["rashtram", "rag", "public policy", "policy", "bills", "parliament"],
      answer:
        "Rashtram AI is Shubhaang's flagship RAG-based public policy intelligence system. It helps users understand parliamentary bills, policies, discussions, and citizen impact through retrieval-augmented AI. Live demo: https://rashtramai.vercel.app/."
    },
    {
      id: "why-hire",
      question: "Why should I hire Shubhaang?",
      keywords: ["hire", "recruit", "why", "different", "fit"],
      answer:
        "Shubhaang is positioned as an AI Engineer and Data Systems Builder. He combines CS & AI fundamentals with a production RAG project, data analytics work, SQL/database thinking, full-stack development, and disciplined problem solving."
    },
    {
      id: "skills",
      question: "What are his strongest technical skills?",
      keywords: ["skills", "technical", "strongest", "stack", "tools"],
      answer:
        "His strongest technical areas are RAG, NLP, LLM applications, embeddings, vector databases, SQL, PostgreSQL, data analytics, React, TypeScript, Node.js, Express, Prisma, REST APIs, and DSA."
    },
    {
      id: "ai-ml",
      question: "Which projects show his AI/ML ability?",
      keywords: ["ai", "ml", "machine learning", "llm", "ai/ml", "ability"],
      answer:
        "Rashtram AI is the clearest AI/ML proof point. It applies RAG, LLM application design, vector search, and public policy intelligence to a real-world knowledge problem."
    },
    {
      id: "data-analytics",
      question: "What is his data analytics experience?",
      keywords: ["data", "analytics", "zomato", "sql", "pandas", "dashboard", "tableau", "sheets"],
      answer:
        "His data analytics experience includes Zomato Data Analysis, where he focuses on data cleaning, exploratory analysis, SQL/Pandas workflows, dashboards, and business insights from restaurant, customer, pricing, and rating data. Public Tableau dashboard: https://public.tableau.com/app/profile/kush.puri/viz/Zomato_Delivery_Analysis/Dashboard1."
    },
    {
      id: "full-stack",
      question: "What is his full-stack experience?",
      keywords: ["full-stack", "full stack", "software", "react", "node", "freelance", "website", "client"],
      answer:
        "His full-stack experience includes a freelance hair salon website with a responsive interface, booking/contact/service sections, and modern client-facing delivery. Live client site: https://www.themaxxsalon.shop/. The portfolio itself also uses React, TypeScript, Express, Prisma, and REST APIs."
    },
    {
      id: "education",
      question: "What is his education?",
      keywords: ["education", "college", "university", "rishihood", "newton", "gpa", "student"],
      answer:
        "Shubhaang is a 3rd-year B.Tech Computer Science & Artificial Intelligence student at Rishihood University x Newton School of Technology with an 8.5 GPA through first and second year."
    },
    {
      id: "internships",
      question: "What internships has Shubhaang done?",
      keywords: ["internship", "internships", "intern", "experience", "rashtram", "placement"],
      answer:
        "Shubhaang has worked as an AI/ML Engineer Intern at Rashtram School of Public Leadership and as a Hiring Research & Strategy Intern with the Rishihood placement and career advancement team."
    },
    {
      id: "dsa",
      question: "What are his DSA and LeetCode achievements?",
      keywords: ["leetcode", "dsa", "algorithm", "algorithms", "rating", "problems", "competitive"],
      answer:
        "Shubhaang has a 1700+ LeetCode contest rating and has solved 300+ DSA problems, showing consistent problem-solving practice."
    },
    {
      id: "open-source",
      question: "What is his open-source experience?",
      keywords: ["hacktoberfest", "open source", "opensource", "github", "pull request", "pr"],
      answer:
        "Shubhaang was a Hacktoberfest Super Contributor in 2024 and 2025, showing open-source participation and GitHub collaboration."
    },
    {
      id: "pan-iit",
      question: "What is his PAN IIT background?",
      keywords: ["pan iit", "delegate", "long beach", "representative"],
      answer:
        "Shubhaang represented his college as a PAN IIT 2026 delegate in Long Beach, California."
    },
    {
      id: "leadership-business",
      question: "Tell me about his leadership and business background.",
      keywords: ["leadership", "business", "finance", "investment", "stock", "mdrt", "sponsorship", "house captain"],
      answer:
        "Shubhaang's secondary leadership and business background includes PAN IIT 2026 representation, Sponsorship Manager work, school leadership, National Integration Camp involvement, interest in stock market patterns and investment planning, and youngest MDRT qualifier FY25 at Aditya Birla Capital / ABSLI."
    },
    {
      id: "roles",
      question: "What roles is he looking for?",
      keywords: ["roles", "looking", "career", "job", "opportunity", "opportunities"],
      answer:
        "The portfolio positions Shubhaang for AI/ML internships, data analytics roles, data engineering or database-heavy roles, software engineering internships, and full-stack freelance or client work."
    }
  ] satisfies KnowledgeResponse[]
};
