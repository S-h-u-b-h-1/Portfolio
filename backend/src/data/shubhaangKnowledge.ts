export const UNVERIFIED_FALLBACK = "I don't have verified information about that specific detail, but I can tell you all about Shubhaang Kataruka's extensive background in AI engineering, data systems, full-stack development, and his major projects like Rashtram AI. What would you like to explore?";

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
      id: "who-is-shubhaang",
      question: "Who is Shubhaang Kataruka?",
      keywords: ["who is", "about", "shubhaang", "profile", "introduction", "background", "summary", "intro", "tell me about"],
      answer: "Shubhaang Kataruka is an ambitious AI Engineer and Data Systems Builder currently completing his B.Tech at Newton School of Technology (Rishihood University). He stands out through his dual focus on cutting-edge AI (like production RAG systems) and robust data pipelines. He is passionate about building products that solve real business problems."
    },
    {
      id: "why-hire",
      question: "Why should I hire Shubhaang Kataruka?",
      keywords: ["hire", "recruit", "why", "different", "fit", "stand out", "unique", "reason", "value", "hire him"],
      answer: "Shubhaang Kataruka is a uniquely ambitious AI Engineer and Data Systems Builder. Unlike typical candidates, he blends deep technical skills—proven by his production-grade RAG system (Rashtram AI) and full-stack SaaS apps (AKKC Task Management)—with sharp business acumen, proven by his MDRT qualification. He doesn't just write code; he builds scalable systems tied to real business impact."
    },
    {
      id: "all-projects",
      question: "What projects has Shubhaang Kataruka built?",
      keywords: ["projects", "project", "work", "built", "demo", "live", "links", "portfolio", "what has he built"],
      answer: "Shubhaang Kataruka's featured work includes: \n1) Employee Task Management & Billing platform for A K Kataruka and Company (https://akkc-eight.vercel.app)\n2) Rashtram AI, a public policy RAG system (https://rashtramai.vercel.app/)\n3) Zomato Data Analysis, a Tableau-backed analytics project (https://public.tableau.com/app/profile/kush.puri/viz/Zomato_Delivery_Analysis/Dashboard1)\n4) A freelance Hair Salon Website (https://www.themaxxsalon.shop/)."
    },
    {
      id: "akkc-project",
      question: "Tell me about the Employee Task Management project.",
      keywords: ["employee", "task management", "billing", "kataruka", "akkc", "client portal", "internal platform"],
      answer: "The Employee Task Management & Billing solution is a comprehensive full-stack platform Shubhaang Kataruka built for A K Kataruka and Company. It centralizes employee task assignments, tracks billable hours, and automates secure client billing, replacing manual spreadsheet workflows with a robust dashboard. Live demo: https://akkc-eight.vercel.app."
    },
    {
      id: "rashtram-ai",
      question: "What is Rashtram AI?",
      keywords: ["rashtram", "rag", "public policy", "policy", "bills", "parliament", "government", "ai assistant"],
      answer: "Rashtram AI is Shubhaang Kataruka's flagship project—a RAG-based public policy intelligence system. It leverages Vector search, Embeddings, and LLMs to help users quickly understand dense parliamentary bills, policies, discussions, and citizen impact. Live demo: https://rashtramai.vercel.app/."
    },
    {
      id: "zomato-analytics",
      question: "What is his Zomato Data Analysis project?",
      keywords: ["zomato", "data analysis", "tableau", "dashboard", "analytics", "business insights", "pandas"],
      answer: "His Zomato Data Analysis project focuses on extracting actionable business insights from restaurant, customer, pricing, and rating data. Using Python, Pandas, SQL, and Tableau, he cleaned and segmented the data to build an interactive public dashboard showcasing strong exploratory data analysis skills."
    },
    {
      id: "skills-overview",
      question: "What are his strongest technical skills?",
      keywords: ["skills", "technical", "strongest", "stack", "tools", "technologies", "languages", "proficient"],
      answer: "His strongest technical areas are divided into four core pillars: \n1) AI & ML: RAG, NLP, LLM applications, Embeddings, Vector Databases.\n2) Data & Analytics: SQL, PostgreSQL, Pandas, Tableau, EDA.\n3) Software Engineering: React, TypeScript, Node.js, Express, Prisma, REST APIs, Tailwind CSS.\n4) Problem Solving: DSA, Algorithms (LeetCode 1700+ rating)."
    },
    {
      id: "internships",
      question: "What internships has Shubhaang Kataruka done?",
      keywords: ["internship", "internships", "intern", "experience", "work experience", "rashtram", "placement"],
      answer: "Shubhaang Kataruka has completed two key internships: \n1) AI/ML Engineer Intern at Rashtram School of Public Leadership, where he built the core RAG architecture for Rashtram AI.\n2) Hiring Research & Strategy Intern with the Rishihood Placement and Career Advancement Team, building data-driven evaluation frameworks for student analytics."
    },
    {
      id: "education",
      question: "What is his education background?",
      keywords: ["education", "college", "university", "rishihood", "newton", "gpa", "student", "year", "degree", "btech", "csai", "academic"],
      answer: "Shubhaang Kataruka is currently a 3rd-year B.Tech student majoring in Computer Science & Artificial Intelligence at Newton School of Technology (Rishihood University), expected to graduate in 2028. He maintains an excellent academic record with an 8.5 GPA."
    },
    {
      id: "dsa-leetcode",
      question: "What are his DSA and LeetCode achievements?",
      keywords: ["leetcode", "dsa", "algorithm", "algorithms", "rating", "problems", "competitive", "programming", "coding"],
      answer: "Shubhaang Kataruka is highly proficient in problem solving. He holds a 1700+ LeetCode contest rating and has successfully solved over 300+ Data Structures and Algorithms (DSA) problems, demonstrating a consistent and disciplined approach to competitive programming."
    },
    {
      id: "open-source",
      question: "Does he have open-source experience?",
      keywords: ["hacktoberfest", "open source", "opensource", "github", "pull request", "pr", "contributions"],
      answer: "Yes, Shubhaang Kataruka is very active in open source. He earned the prestigious Hacktoberfest Super Contributor recognition in both 2024 and 2025, demonstrating his ability to collaborate on large codebases via GitHub pull requests."
    },
    {
      id: "pan-iit-la",
      question: "Tell me about his involvement in the PanIIT Conference in Los Angeles.",
      keywords: ["pan iit", "delegate", "long beach", "representative", "los angeles", "la", "conference", "booth", "manage"],
      answer: "Shubhaang Kataruka was selected as a delegate to represent his college at the highly prestigious PAN IIT 2026 Conference in Los Angeles, California. During the conference, he successfully managed the college booth, networking with global tech leaders and showcasing strong leadership and communication skills on an international platform."
    },
    {
      id: "leadership-business",
      question: "What is his leadership and business background?",
      keywords: ["leadership", "business", "finance", "investment", "stock", "mdrt", "sponsorship", "house captain", "acumen"],
      answer: "Beyond pure engineering, Shubhaang Kataruka has an exceptional business and leadership background. He is the youngest MDRT qualifier FY25 at Aditya Birla Capital (ABSLI). He also represented his college at the PAN IIT Conference in Los Angeles (managing their booth), served as Sponsorship Manager for his college tech fest, and has a keen interest in stock market analysis and investment planning."
    },
    {
      id: "roles-looking-for",
      question: "What roles is he looking for?",
      keywords: ["roles", "looking", "career", "job", "opportunity", "opportunities", "hiring", "open to", "hire"],
      answer: "Shubhaang Kataruka is actively looking for high-context technical roles. He is a perfect fit for AI/ML engineering internships, data analytics roles, data engineering positions, full-stack software engineering internships, or complex full-stack freelance projects where business logic meets technology."
    },
    {
      id: "contact",
      question: "How can I contact him?",
      keywords: ["contact", "email", "reach out", "message", "linkedin", "github", "connect"],
      answer: "You can reach Shubhaang Kataruka via email at shubhaangkataruka221@gmail.com, connect with him on LinkedIn (https://www.linkedin.com/in/shubhaangkataruka/), or use the contact form on this portfolio website to send him a direct message."
    }
  ] satisfies KnowledgeResponse[]
};
