export const UNVERIFIED_FALLBACK =
  "I don't have that specific information in my knowledge base. Please visit Shubhaang's LinkedIn, GitHub, or contact him directly for more details.";

export type KnowledgeResponse = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const shubhaangKnowledge = {
  assistant: {
    name: "Ask Shubhaang AI",
    role: "Personal AI Assistant for Shubhaang Kataruka",
    purpose:
      "Represent Shubhaang Kataruka professionally and answer questions about his background, projects, experience, skills, achievements, interests, and career aspirations."
  },
  personality: {
    tone: ["Professional", "Friendly", "Confident", "Concise", "Helpful"],
    principles: [
      "Be ambitious but never arrogant.",
      "Use evidence from the portfolio and verified data.",
      "Emphasize problem-solving and learning ability.",
      "Speak in third person unless explicitly asked otherwise."
    ]
  },
  guardrails: {
    rules: [
      "Only answer using verified portfolio information.",
      "Never fabricate employers, salaries, metrics, links, dates, or credentials.",
      "If a detail is unavailable, explicitly say so.",
      "Do not claim technologies or achievements without evidence.",
      "Never exaggerate accomplishments.",
      "Do not provide personal phone numbers, addresses, passwords, or private information."
    ],
    fallback: UNVERIFIED_FALLBACK
  },
  profile: {
    name: "Shubhaang Kataruka",
    headline: "AI Engineer | Data Analytics | Software Development",
    positioning: "AI Engineer and Data Systems Builder",
    education: {
      degree: "B.Tech in Computer Science and Artificial Intelligence",
      year: "3rd Year",
      institution: "Rishihood University x Newton School of Technology",
      graduationYear: "2028",
      cgpa: "8.5"
    },
    location: "Kolkata, India",
    email: "shubhaangkataruka22012007@gmail.com",
    portfolio: "https://shubhaangkataruka.vercel.app",
    linkedin: "https://www.linkedin.com/in/shubhaangkataruka",
    github: "https://github.com/S-h-u-b-h-1",
    leetcode: "https://leetcode.com/u/Shubh_2201/"
  },
  professionalSummary: {
    summary:
      "Shubhaang Kataruka is a Computer Science and Artificial Intelligence undergraduate specializing in AI applications, data analytics, databases, and full-stack development. He enjoys building products that combine intelligent systems with practical business applications. His work spans Retrieval-Augmented Generation systems, analytics dashboards, workflow automation, and end-to-end web applications."
  },
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Retrieval-Augmented Generation (RAG)",
    "Data Analytics",
    "SQL and Databases",
    "Business Intelligence Dashboards",
    "Full Stack Development",
    "Public Policy Technology",
    "Stock Market Analytics",
    "Investment Planning",
    "Data Engineering"
  ],
  technicalSkills: {
    languages: ["Python", "JavaScript", "TypeScript", "SQL"],
    frontend: ["React", "Vite", "HTML", "CSS"],
    backend: ["Node.js", "Express.js", "REST APIs"],
    databases: ["PostgreSQL", "Prisma ORM", "Neon Database"],
    ai_ml: [
      "Retrieval-Augmented Generation (RAG)",
      "Natural Language Processing",
      "Embeddings",
      "Vector Databases",
      "LLM Application Development",
      "Prompt Engineering"
    ],
    analytics: [
      "Pandas",
      "Exploratory Data Analysis",
      "Data Cleaning",
      "Business Analytics",
      "Dashboard Development",
      "Tableau"
    ],
    tools: ["Git", "GitHub", "Vercel", "Render", "Postman"],
    problemSolving: {
      leetcodeRating: "1700+",
      problemsSolved: "300+"
    }
  },
  projects: [
    {
      name: "Rashtram AI",
      type: "Flagship AI Project",
      description:
        "An AI-powered public policy intelligence platform built using Retrieval-Augmented Generation. It helps users understand parliamentary bills, policies, amendments, and their societal impact.",
      technologies: ["RAG", "LLMs", "Embeddings", "Vector Search", "Pinecone", "Policy Intelligence"],
      demo: "https://rashtramai.vercel.app",
      highlights: [
        "Policy search and question answering",
        "Bill summarization",
        "Context-aware retrieval",
        "AI-assisted policy understanding"
      ]
    },
    {
      name: "Zomato Data Analysis",
      type: "Data Analytics Project",
      description:
        "A comprehensive data analytics project focused on extracting business insights from restaurant and customer datasets.",
      technologies: ["Python", "Pandas", "SQL", "EDA", "Visualization", "Tableau"],
      highlights: [
        "Data cleaning",
        "Exploratory data analysis",
        "Business intelligence dashboards",
        "Trend identification and insights"
      ]
    },
    {
      name: "Employee Task Management and Billing System",
      type: "Full Stack Business Application",
      description:
        "A workflow management platform developed for A K Kataruka & Company to manage employee tasks, client work, billing operations, and organizational productivity.",
      technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma"],
      demo: "https://akkc-eight.vercel.app",
      highlights: [
        "Role-based authentication",
        "Task assignment and tracking",
        "Billing management",
        "Invoice generation",
        "Analytics dashboard"
      ]
    },
    {
      name: "AI Adoption Project",
      type: "AI and Analytics Platform",
      description:
        "A platform that analyzes organizational AI adoption trends and provides insights into how businesses are integrating artificial intelligence technologies.",
      technologies: ["Python", "Data Analytics", "Streamlit", "Dashboard Development"],
      demo: "https://kataruka.streamlit.app",
      highlights: [
        "AI adoption analytics",
        "Interactive dashboards",
        "Trend visualization",
        "Business insights"
      ]
    }
  ],
  experience: [
    {
      role: "AI/ML Engineer Intern",
      organization: "Rashtram School of Public Leadership",
      focus: ["RAG Systems", "Policy Intelligence", "LLM Applications", "AI Product Development"]
    },
    {
      role: "Hiring Research and Strategy Intern",
      organization: "Rishihood University",
      focus: ["Research", "Strategy", "Talent Acquisition", "Leadership"]
    },
    {
      role: "Freelance Full Stack Developer",
      focus: ["Client Websites", "Business Applications", "End-to-End Development"]
    }
  ],
  leadership: {
    achievements: [
      "PAN IIT 2026 Representative",
      "Hacktoberfest Super Contributor",
      "Youngest MDRT Qualifier FY25 at Aditya Birla Capital",
      "House Captain",
      "National Integration Camp Volunteer"
    ],
    qualities: ["Leadership", "Ownership", "Initiative", "Problem Solving", "Adaptability", "Continuous Learning"]
  },
  careerGoals: {
    shortTerm: [
      "Build production-grade AI systems",
      "Deepen expertise in data analytics and databases",
      "Gain hands-on industry experience"
    ],
    longTerm: [
      "Become an AI and Data Systems Engineer",
      "Build technology products with societal impact",
      "Create intelligent systems that improve decision-making"
    ],
    targetRoles: [
      "AI Engineer",
      "Machine Learning Engineer",
      "Data Analyst",
      "Data Engineer",
      "Software Engineer",
      "Full Stack Developer"
    ]
  },
  faqExamples: [
    "Who is Shubhaang Kataruka?",
    "Why should I hire Shubhaang?",
    "What makes him different?",
    "Is he open to opportunities?",
    "What are his strongest technical skills?",
    "Which projects demonstrate his AI capabilities?",
    "What is Rashtram AI?",
    "What is his data analytics experience?",
    "What is his full-stack development experience?",
    "What internships has he completed?",
    "What are his career goals?",
    "What technologies does he work with?",
    "Tell me about his leadership experience.",
    "How can I contact him?"
  ],
  responses: [
    {
      id: "greeting",
      question: "Hello",
      keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening", "good afternoon"],
      answer:
        "Hi, I'm Ask Shubhaang AI. I can answer questions about Shubhaang's AI work, data skills, projects, internships, leadership, and career goals."
    },
    {
      id: "who-is-shubhaang",
      question: "Who is Shubhaang Kataruka?",
      keywords: ["who is", "about", "shubhaang", "profile", "introduction", "background", "summary", "intro", "tell me about"],
      answer:
        "Shubhaang Kataruka is a 3rd-year B.Tech CS & AI student at Rishihood University x Newton School of Technology. He is focused on AI applications, data analytics, databases, and full-stack software systems."
    },
    {
      id: "why-hire",
      question: "Why should I hire Shubhaang?",
      keywords: ["hire", "recruit", "why", "fit", "stand out", "value", "hire him"],
      answer:
        "Shubhaang brings a combination of:\n- Strong CS and AI fundamentals\n- Hands-on experience building production-oriented AI systems\n- Data analytics and database expertise\n- Full-stack engineering capability\n- Proven initiative through internships and leadership experiences\n- A track record of building practical, impact-driven projects"
    },
    {
      id: "what-makes-him-different",
      question: "What makes him different?",
      keywords: ["different", "unique", "stand out", "what makes him", "why him", "edge"],
      answer:
        "Shubhaang sits at the intersection of AI, data systems, and software engineering. Instead of focusing only on theory, he prefers building practical systems, from public policy intelligence platforms and analytics dashboards to business workflow automation tools."
    },
    {
      id: "open-to-opportunities",
      question: "Is he open to opportunities?",
      keywords: ["open", "opportunities", "roles", "looking", "career", "job", "internship", "collaboration", "available"],
      answer:
        "Yes. Shubhaang is interested in internships and collaborations involving:\n- AI Engineering\n- Machine Learning Applications\n- Data Analytics\n- Data Engineering\n- Full-Stack Product Development\n- Impact-driven technology initiatives"
    },
    {
      id: "all-projects",
      question: "What projects has Shubhaang built?",
      keywords: ["projects", "project", "work", "built", "demo", "live", "links", "portfolio", "what has he built"],
      answer:
        "His key projects include Rashtram AI, Zomato Data Analysis, Employee Task Management and Billing System, and the AI Adoption Project."
    },
    {
      id: "rashtram-ai",
      question: "What is Rashtram AI?",
      keywords: ["rashtram", "rag", "public policy", "policy", "bills", "parliament", "government", "ai assistant"],
      answer:
        "Rashtram AI is Shubhaang's flagship RAG-based public policy intelligence platform. It helps users understand parliamentary bills, policies, amendments, and societal impact through context-aware retrieval and LLM-powered answers. Demo: https://rashtramai.vercel.app"
    },
    {
      id: "ai-projects",
      question: "Which projects demonstrate his AI capabilities?",
      keywords: ["ai", "ml", "machine learning", "ai capability", "ai capabilities", "llm", "rag project"],
      answer:
        "Rashtram AI is the strongest AI proof point, showing RAG, LLM application development, embeddings, vector search, and policy intelligence. The AI Adoption Project also shows his analytics approach to understanding how organizations integrate AI."
    },
    {
      id: "zomato-analytics",
      question: "What is his data analytics experience?",
      keywords: ["data", "analytics", "zomato", "sql", "pandas", "dashboard", "tableau", "business intelligence"],
      answer:
        "His analytics work includes Zomato Data Analysis, where he used Python, Pandas, SQL, EDA, visualization, and Tableau-style dashboard thinking to extract business insights from restaurant and customer data."
    },
    {
      id: "employee-task-management",
      question: "Tell me about the Employee Task Management and Billing System.",
      keywords: ["employee", "task management", "billing", "kataruka", "akkc", "client portal", "invoice", "workflow"],
      answer:
        "The Employee Task Management and Billing System is a full-stack business application for A K Kataruka & Company. It supports task assignment, tracking, billing management, invoice generation, role-based access, and operational analytics. Demo: https://akkc-eight.vercel.app"
    },
    {
      id: "ai-adoption-project",
      question: "What is the AI Adoption Project?",
      keywords: ["ai adoption", "streamlit", "kataruka streamlit", "adoption analytics", "trend visualization"],
      answer:
        "The AI Adoption Project analyzes organizational AI adoption trends through interactive dashboards and business insight views. Demo: https://kataruka.streamlit.app"
    },
    {
      id: "full-stack",
      question: "What is his full-stack development experience?",
      keywords: ["full-stack", "full stack", "software", "react", "node", "express", "freelance", "website", "frontend", "backend"],
      answer:
        "Shubhaang builds end-to-end web applications using React, TypeScript, Node.js, Express, REST APIs, PostgreSQL, and Prisma. His full-stack work includes the Employee Task Management and Billing System and client-facing freelance websites."
    },
    {
      id: "skills-overview",
      question: "What are his strongest technical skills?",
      keywords: ["skills", "technical", "strongest", "stack", "tools", "technologies", "languages", "proficient"],
      answer:
        "His strongest areas are AI application development, RAG, NLP, embeddings, vector databases, SQL, PostgreSQL, data analytics, React, TypeScript, Node.js, Express, Prisma, REST APIs, and DSA."
    },
    {
      id: "internships",
      question: "What internships has Shubhaang completed?",
      keywords: ["internship", "internships", "intern", "experience", "work experience", "rashtram", "placement", "strategy"],
      answer:
        "He has worked as an AI/ML Engineer Intern at Rashtram School of Public Leadership and as a Hiring Research and Strategy Intern at Rishihood University."
    },
    {
      id: "education",
      question: "What is his education background?",
      keywords: ["education", "college", "university", "rishihood", "newton", "gpa", "cgpa", "student", "year", "degree", "btech", "csai", "academic"],
      answer:
        "Shubhaang is a 3rd-year B.Tech student in Computer Science and Artificial Intelligence at Rishihood University x Newton School of Technology, graduating in 2028 with an 8.5 CGPA."
    },
    {
      id: "career-goals",
      question: "What are his career goals?",
      keywords: ["career goals", "goals", "short term", "long term", "future", "aspiration", "aspirations"],
      answer:
        "Short term, Shubhaang wants to build production-grade AI systems, deepen data and database expertise, and gain hands-on industry experience. Long term, he aims to become an AI and Data Systems Engineer building intelligent products with societal impact."
    },
    {
      id: "leadership",
      question: "Tell me about his leadership experience.",
      keywords: ["leadership", "business", "finance", "investment", "stock", "mdrt", "pan iit", "sponsorship", "house captain", "national integration"],
      answer:
        "His leadership and achievement record includes PAN IIT 2026 representation, Hacktoberfest Super Contributor recognition, youngest MDRT Qualifier FY25 at Aditya Birla Capital, House Captain experience, and National Integration Camp volunteering."
    },
    {
      id: "dsa-leetcode",
      question: "What are his DSA and LeetCode achievements?",
      keywords: ["leetcode", "dsa", "algorithm", "algorithms", "rating", "problems", "competitive", "programming", "coding"],
      answer:
        "He has a 1700+ LeetCode contest rating and has solved 300+ DSA problems, showing consistent interview-style problem-solving practice."
    },
    {
      id: "open-source",
      question: "Does he have open-source experience?",
      keywords: ["hacktoberfest", "open source", "opensource", "github", "pull request", "pr", "contributions"],
      answer:
        "Yes. He has Hacktoberfest Super Contributor recognition and experience contributing through GitHub-based open-source workflows."
    },
    {
      id: "contact",
      question: "How can I contact him?",
      keywords: ["contact", "email", "reach out", "message", "linkedin", "github", "connect"],
      answer:
        "You can contact Shubhaang at shubhaangkataruka22012007@gmail.com or connect with him on LinkedIn: https://www.linkedin.com/in/shubhaangkataruka"
    }
  ] satisfies KnowledgeResponse[]
};
