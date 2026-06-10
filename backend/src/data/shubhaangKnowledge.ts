export const UNVERIFIED_FALLBACK = "I'm still learning the specifics of that! However, I can tell you all about Shubhaang's background in AI engineering, data systems, and his major projects like Rashtram AI. What would you like to know?";

export type KnowledgeResponse = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const shubhaangKnowledge = {
  profile: {
    name: "Shubhaang Kataruka",
    headline: "AI Engineer + Data Systems Builder",
    currentStudy:
      "B.Tech (Computer Science & Artificial Intelligence), Newton School of Technology — Rishihood University (expected 2028)",
    summary:
      "Technology-driven student and builder focused on AI, ML, RAG systems, full-stack development, FinTech, and data analytics. Ambitious product-minded engineer aiming to build AI-powered solutions that solve real-world problems.",
    interests: [
      "Artificial Intelligence",
      "Generative AI",
      "RAG (Retrieval Augmented Generation)",
      "Full-stack development",
      "FinTech",
      "Data analytics",
      "Public policy technology",
      "Entrepreneurship"
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
  moreProjects: [
    {
      name: "FinNews",
      summary: "Full-stack financial news platform with authentication, search, filtering, and article management.",
      tech: ["React", "Node.js", "Express", "PostgreSQL", "Prisma"],
      features: ["Authentication", "Search & Filtering", "Pagination", "Article management"]
    },
    {
      name: "BeWise",
      summary: "Travel budget and expense planner with multi-trip management and analytics.",
      features: ["Expense categorization", "Budget tracking", "Financial analytics"]
    },
    {
      name: "FinScope",
      summary: "Finance and investment calculation platform (SIP, lumpsum, ROI analysis).",
      features: ["SIP calculators", "ROI analysis", "Financial planning tools"]
    }
  ],
  experience: [
    {
      role: "AI/ML Engineer Intern",
      organization: "Rashtram School of Public Leadership",
      summary:
        "Worked on Rashtram AI — an AI-powered research assistant for government policy, bills, and public-policy research. Responsibilities included building RAG systems, data collection and processing, vector database implementation, prompt engineering, and product-focused AI development."
    },
    {
      role: "Hiring Research & Strategy Intern",
      organization: "Rishihood / Placement & Career Advancement Team",
      summary:
        "Worked on student analytics, hiring intelligence, and academic profile systems. Built data-driven evaluation frameworks to support placement strategy and recruiter outreach."
    },
    {
      role: "Freelance Full-Stack Developer",
      organization: "Hair Salon Website",
      summary: "Built a responsive client-facing website with service, booking/contact, and business presentation sections."
    }
  ],
  technicalSkills: {
    programmingLanguages: ["Python", "JavaScript", "SQL"],
    web: ["React", "Node.js", "Express", "REST APIs", "TypeScript"],
    databases: ["PostgreSQL", "Neon", "Prisma ORM"],
    ml: ["Generative AI", "RAG", "LangChain", "Prompt engineering", "Vector DBs (Pinecone compatible)"],
    data: ["Pandas", "Tableau", "Exploratory Data Analysis", "Statistics"],
    tools: ["Git", "GitHub", "Vercel", "Render", "Postman"]
  },
  technicalHighlights: [
    "LeetCode 1700+ rating",
    "300+ DSA problems solved",
    "GPA 8.5",
    "Hacktoberfest Super Contributor 2024 & 2025",
    "PAN IIT 2026 delegate"
  ],
  financeAndLeadership: [
    "Youngest MDRT qualifier FY25 at Aditya Birla Capital / ABSLI",
    "Sponsorship Manager for college tech fest",
    "Prefect and House Captain at school",
    "National Integration Camp volunteer",
    "Interest and experience in mutual funds and stock market investing"
  ],
  additionalBackground: [
    "School leadership and National Integration Camp involvement"
  ],
  preferences: {
    responseStyle:
      "Assume engineering and AI background; prefer practical, implementation-focused answers with code examples and trade-offs when relevant. Concise for simple questions, and detailed for architecture/career guidance.",
    careerGoals:
      "Become a technology leader and entrepreneur building AI-powered products; pursue internships at leading companies; publish research and build startups in AI/FinTech/Public Policy Technology."
  },
  responses: [
    {
      id: "detailed-overview",
      question: "Who is Shubhaang Kataruka?",
      keywords: ["who is", "about", "shubhaang", "profile", "introduction"],
      answer:
        "Shubhaang Kataruka is a visionary AI Engineer and Data Systems Builder currently completing his B.Tech at Newton School of Technology. He stands out through his dual focus on cutting-edge AI (like production RAG systems) and robust data pipelines. His ambition is to lead technology teams and build impactful AI products."
    },
    {
      id: "overview",
      question: "Who is Shubhaang Kataruka?",
      keywords: ["shubhaang", "who is", "about", "profile", "portfolio", "background", "summary", "intro", "introduction"],
      answer:
        "Shubhaang Kataruka is a 3rd-year B.Tech CS & AI student at Rishihood University x Newton School of Technology, positioned as an AI Engineer + Data Systems Builder. He focuses on AI/ML, RAG, data analytics, SQL, databases, and full-stack development."
    },
    {
      id: "featured-projects",
      question: "What projects has Shubhaang built?",
      keywords: ["projects", "project", "work", "built", "demo", "live", "links", "dashboard", "website"],
      answer:
        "Shubhaang's featured work includes Rashtram AI, a public policy RAG system (https://rashtramai.vercel.app/); Zomato Data Analysis, a Tableau-backed analytics project (https://public.tableau.com/app/profile/kush.puri/viz/Zomato_Delivery_Analysis/Dashboard1); and a freelance Hair Salon Website (https://www.themaxxsalon.shop/)."
    },
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
      keywords: ["hire", "recruit", "why", "different", "fit", "stand out", "unique"],
      answer:
        "Shubhaang is a uniquely ambitious AI Engineer and Data Systems Builder. Unlike typical candidates, he blends deep AI technical skills (like his production RAG system, Rashtram AI) with a sharp business acumen proven by his MDRT qualification. He doesn't just write code; he builds scalable systems that solve real business problems."
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
      keywords: ["education", "college", "university", "rishihood", "newton", "gpa", "student", "year", "studying", "study", "3rd", "third", "grad", "graduation", "btech", "csai"],
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
