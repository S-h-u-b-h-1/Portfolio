export const UNVERIFIED_FALLBACK = "I don't have that specific detail. Ask me about Shubhaang's AI projects, internships, or technical skills instead.";

export type KnowledgeResponse = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const shubhaangKnowledge = {
  profile: {
    name: "Shubhaang Kataruka",
    headline: "AI Engineer | Data Analytics | Software Development",
    currentStudy: "3rd-year B.Tech (Computer Science & Artificial Intelligence), Newton School of Technology — Rishihood University (expected 2028). Holds an 8.5 GPA.",
    summary: "Technology-driven student and builder focused on AI, ML, RAG systems, full-stack development, FinTech, and data analytics. Ambitious product-minded engineer aiming to build AI-powered solutions that solve real-world problems.",
    location: "India / Kolkata",
    interests: [
      "Artificial Intelligence",
      "Generative AI",
      "RAG (Retrieval Augmented Generation)",
      "Full-stack development",
      "FinTech",
      "Data analytics",
      "Public policy technology",
      "Entrepreneurship",
      "Stock market analysis",
      "Investment planning"
    ]
  },
  projects: [
    {
      name: "Employee Task Management & Billing",
      summary: "A comprehensive employee task management and automated billing solution built for A K Kataruka and Company.",
      url: "https://akkc-eight.vercel.app",
      highlights: ["Task management", "Automated billing", "Client portal", "Full-stack SaaS", "Business solution", "React", "TypeScript", "Node.js"]
    },
    {
      name: "Rashtram AI",
      summary: "A flagship RAG-based public policy intelligence system that helps users understand parliamentary bills, policies, discussions, and citizen impact through retrieval-augmented AI.",
      url: "https://rashtramai.vercel.app/",
      highlights: ["RAG architecture", "LLM application", "Vector search", "Public policy intelligence", "AI engineering"]
    },
    {
      name: "Zomato Data Analysis",
      summary: "A data analytics project focused on extracting business insights from restaurant, customer, pricing, and rating data using Python, Pandas, and SQL.",
      url: "https://public.tableau.com/app/profile/kush.puri/viz/Zomato_Delivery_Analysis/Dashboard1",
      highlights: ["Data cleaning", "Exploratory analysis", "SQL/Pandas", "Tableau/Sheets dashboards", "Business insights"]
    },
    {
      name: "Hair Salon Website",
      summary: "A client-focused full-stack website built for a hair salon with a modern responsive interface, booking systems, and service lists.",
      url: "https://www.themaxxsalon.shop/",
      highlights: ["Full-stack development", "Client work", "Responsive UI", "React", "Tailwind CSS"]
    }
  ],
  experience: [
    {
      role: "AI/ML Engineer Intern",
      organization: "Rashtram School of Public Leadership",
      summary: "Worked on Rashtram AI — an AI-powered research assistant for government policy, bills, and public-policy research. Responsibilities included building RAG systems, data collection and processing, vector database implementation, prompt engineering, and product-focused AI development."
    },
    {
      role: "Hiring Research & Strategy Intern",
      organization: "Rishihood / Placement & Career Advancement Team",
      summary: "Worked on student analytics, hiring intelligence, and academic profile systems. Built data-driven evaluation frameworks to support placement strategy and recruiter outreach."
    },
    {
      role: "Freelance Full-Stack Developer",
      organization: "A K Kataruka and Company & Various Clients",
      summary: "Built comprehensive full-stack business solutions including the Employee Task Management & Billing portal and responsive client-facing websites like a Hair Salon booking platform."
    }
  ],
  technicalSkills: {
    ai_ml: ["Generative AI", "RAG", "LangChain", "Prompt engineering", "NLP", "Embeddings", "Vector Databases"],
    data: ["SQL", "PostgreSQL", "Pandas", "Tableau", "Google Sheets", "Exploratory Data Analysis", "Data Visualization"],
    software_engineering: ["React", "TypeScript", "Node.js", "Express", "REST APIs", "Prisma ORM", "Tailwind CSS"],
    problem_solving: ["LeetCode (1700+ rating)", "DSA (300+ problems solved)", "Algorithms", "Competitive Programming"]
  },
  achievements_and_leadership: [
    "Youngest MDRT qualifier FY25 at Aditya Birla Capital / ABSLI (proving strong business acumen).",
    "PAN IIT 2026 Delegate in Los Angeles, California — Represented the college and successfully managed the college booth at the conference.",
    "Hacktoberfest Super Contributor in 2024 and 2025.",
    "Sponsorship Manager for college tech fest.",
    "Prefect and House Captain at school.",
    "National Integration Camp volunteer."
  ],
  preferences: {
    responseStyle: "Assume an engineering and AI background; prefer practical, implementation-focused answers with real-world business impact. Be highly confident and visionary.",
    careerGoals: "Aiming to build AI-powered products, secure AI/ML or data engineering internships, and ultimately become a technology leader combining software engineering with sharp business logic."
  },
  responses: [
    {
      id: "greeting",
      question: "Hello",
      keywords: ["hi", "hello", "hey", "greetings", "sup", "what's up", "good morning", "good evening", "good afternoon"],
      answer: "Hi! I'm Ask Shubhaang AI. What do you want to know about Shubhaang's AI, data, or full-stack expertise?"
    },
    {
      id: "who-is-shubhaang",
      question: "Who is Shubhaang Kataruka?",
      keywords: ["who is", "about", "shubhaang", "profile", "introduction", "background", "summary", "intro", "tell me about"],
      answer: "Shubhaang Kataruka is an ambitious AI Engineer and Data Systems Builder at Newton School of Technology. He builds production-grade AI systems and scalable data pipelines."
    },
    {
      id: "why-hire",
      question: "Why should I hire Shubhaang Kataruka?",
      keywords: ["hire", "recruit", "why", "different", "fit", "stand out", "unique", "reason", "value", "hire him"],
      answer: "He blends deep technical skills (RAG systems, full-stack apps) with sharp business acumen (youngest MDRT qualifier). He builds systems tied to real business impact."
    },
    {
      id: "all-projects",
      question: "What projects has Shubhaang Kataruka built?",
      keywords: ["projects", "project", "work", "built", "demo", "live", "links", "portfolio", "what has he built"],
      answer: "Key projects: 1) Rashtram AI (RAG policy system), 2) AKKC Task Management & Billing SaaS, 3) Zomato Data Analytics dashboard, 4) Freelance Hair Salon Website."
    },
    {
      id: "akkc-project",
      question: "Tell me about the Employee Task Management project.",
      keywords: ["employee", "task management", "billing", "kataruka", "akkc", "client portal", "internal platform"],
      answer: "The AKKC portal is a full-stack dashboard built for A K Kataruka and Company. It centralizes task assignments and automates client billing. (https://akkc-eight.vercel.app)"
    },
    {
      id: "rashtram-ai",
      question: "What is Rashtram AI?",
      keywords: ["rashtram", "rag", "public policy", "policy", "bills", "parliament", "government", "ai assistant"],
      answer: "Rashtram AI is his flagship RAG system. It leverages Vector search and LLMs to answer questions about dense parliamentary bills and public policy. (https://rashtramai.vercel.app/)"
    },
    {
      id: "zomato-analytics",
      question: "What is his Zomato Data Analysis project?",
      keywords: ["zomato", "data analysis", "tableau", "dashboard", "analytics", "business insights", "pandas"],
      answer: "Using Python, Pandas, SQL, and Tableau, he analyzed restaurant data to build an interactive dashboard showcasing actionable business insights."
    },
    {
      id: "skills-overview",
      question: "What are his strongest technical skills?",
      keywords: ["skills", "technical", "strongest", "stack", "tools", "technologies", "languages", "proficient"],
      answer: "His stack includes AI (RAG, NLP, Vector DBs), Data (SQL, Pandas, Tableau), Full-Stack (React, TypeScript, Node.js), and strong DSA (LeetCode 1700+)."
    },
    {
      id: "internships",
      question: "What internships has Shubhaang Kataruka done?",
      keywords: ["internship", "internships", "intern", "experience", "work experience", "rashtram", "placement"],
      answer: "He interned as an AI/ML Engineer at Rashtram School of Public Leadership (building a RAG system) and as a Data Strategy Intern at Rishihood University."
    },
    {
      id: "education",
      question: "What is his education background?",
      keywords: ["education", "college", "university", "rishihood", "newton", "gpa", "student", "year", "degree", "btech", "csai", "academic"],
      answer: "He is a 3rd-year B.Tech student majoring in CS & AI at Newton School of Technology (expected 2028), holding an 8.5 GPA."
    },
    {
      id: "dsa-leetcode",
      question: "What are his DSA and LeetCode achievements?",
      keywords: ["leetcode", "dsa", "algorithm", "algorithms", "rating", "problems", "competitive", "programming", "coding"],
      answer: "He has a 1700+ LeetCode contest rating and has solved over 300+ DSA problems."
    },
    {
      id: "open-source",
      question: "Does he have open-source experience?",
      keywords: ["hacktoberfest", "open source", "opensource", "github", "pull request", "pr", "contributions"],
      answer: "Yes, he was recognized as a Hacktoberfest Super Contributor in both 2024 and 2025."
    },
    {
      id: "pan-iit-la",
      question: "Tell me about his involvement in the PanIIT Conference in Los Angeles.",
      keywords: ["pan iit", "delegate", "long beach", "representative", "los angeles", "la", "conference", "booth", "manage"],
      answer: "He was selected as a delegate to represent his college at the PAN IIT 2026 Conference in Los Angeles, managing their booth and networking globally."
    },
    {
      id: "leadership-business",
      question: "What is his leadership and business background?",
      keywords: ["leadership", "business", "finance", "investment", "stock", "mdrt", "sponsorship", "house captain", "acumen"],
      answer: "He is the youngest MDRT qualifier FY25 at Aditya Birla Capital, managed a booth at PAN IIT LA, and has strong interests in finance and stock markets."
    },
    {
      id: "roles-looking-for",
      question: "What roles is he looking for?",
      keywords: ["roles", "looking", "career", "job", "opportunity", "opportunities", "hiring", "open to", "hire"],
      answer: "He is looking for AI/ML engineering internships, data analytics roles, or full-stack engineering positions."
    },
    {
      id: "contact",
      question: "How can I contact him?",
      keywords: ["contact", "email", "reach out", "message", "linkedin", "github", "connect"],
      answer: "Email him at shubhaangkataruka221@gmail.com or connect on LinkedIn. You can also use the contact form on this site."
    }
  ] satisfies KnowledgeResponse[]
};
