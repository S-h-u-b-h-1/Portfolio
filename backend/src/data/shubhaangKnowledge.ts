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
        "Hi, I'm Ask Shubhaang AI. Ask me about Shubhaang's AI projects, data analytics work, full-stack systems, internships, leadership, or why he could be a strong fit for your team."
    },
    {
      id: "who-is-shubhaang",
      question: "Who is Shubhaang Kataruka?",
      keywords: [
        "who is",
        "about",
        "shubhaang",
        "kataruka",
        "kataruak",
        "profile",
        "introduction",
        "background",
        "summary",
        "intro",
        "tell me about"
      ],
      answer:
        "Shubhaang Kataruka is a 3rd-year B.Tech student in Computer Science and Artificial Intelligence at Rishihood University x Newton School of Technology.\n\nHe is an AI engineer and data systems builder focused on turning complex information into useful products:\n\n- **AI Applications:** Builds RAG systems and LLM-powered tools, including Rashtram AI for public policy intelligence.\n- **Data Analytics & Databases:** Works with SQL, PostgreSQL, Pandas, dashboards, and business intelligence workflows.\n- **Full-Stack Development:** Ships practical web applications with React, TypeScript, Node.js, Express, Prisma, and REST APIs."
    },
    {
      id: "why-hire",
      question: "Why should I hire Shubhaang?",
      keywords: ["hire", "recruit", "why", "fit", "stand out", "value", "hire him"],
      answer:
        "Shubhaang is a strong fit for teams that need someone who can learn fast, build seriously, and connect AI with real business problems.\n\nHe brings:\n\n- **AI engineering proof:** Rashtram AI, a RAG-based public policy intelligence system.\n- **Data ability:** SQL, Pandas, dashboards, and analytics projects like Zomato Data Analysis.\n- **Full-stack execution:** React, TypeScript, Node.js, Express, PostgreSQL, Prisma, and deployed business applications.\n- **Problem-solving discipline:** 1700+ LeetCode rating and 300+ DSA problems solved.\n- **Initiative:** Internships, freelance work, open-source contributions, and leadership experience."
    },
    {
      id: "what-makes-him-different",
      question: "What makes him different?",
      keywords: ["different", "unique", "stand out", "what makes him", "why him", "edge"],
      answer:
        "Shubhaang stands out because he works across **AI, data systems, and software engineering** instead of staying in one narrow lane.\n\nHe does not only study concepts; he builds applied systems: a RAG policy assistant, analytics dashboards, workflow automation tools, and full-stack business applications."
    },
    {
      id: "open-to-opportunities",
      question: "Is he open to opportunities?",
      keywords: ["open", "opportunities", "roles", "looking", "career", "job", "internship", "collaboration", "available"],
      answer:
        "Yes. Shubhaang is open to internships, collaborations, and project opportunities where he can build meaningful technology.\n\nBest-fit areas:\n\n- AI Engineering\n- Machine Learning Applications\n- Data Analytics\n- Data Engineering\n- Full-Stack Product Development\n- Impact-driven technology initiatives"
    },
    {
      id: "all-projects",
      question: "What projects has Shubhaang built?",
      keywords: ["projects", "project", "work", "built", "demo", "live", "links", "portfolio", "what has he built"],
      answer:
        "Shubhaang's strongest projects show a mix of AI, analytics, and full-stack execution:\n\n- **Rashtram AI:** RAG-based public policy intelligence platform. Demo: https://rashtramai.vercel.app\n- **Employee Task Management and Billing System:** Full-stack business workflow system. Demo: https://akkc-eight.vercel.app\n- **Zomato Data Analysis:** Data cleaning, EDA, SQL/Pandas analysis, and dashboard-style business insights.\n- **AI Adoption Project:** Streamlit analytics platform for organizational AI adoption trends. Demo: https://kataruka.streamlit.app"
    },
    {
      id: "rashtram-ai",
      question: "What is Rashtram AI?",
      keywords: ["rashtram", "rag", "public policy", "policy", "bills", "parliament", "government", "ai assistant"],
      answer:
        "Rashtram AI is Shubhaang's flagship AI project: a RAG-based public policy intelligence platform.\n\nIt helps users understand parliamentary bills, policies, amendments, and societal impact through retrieval, context-aware search, and LLM-powered answers. It demonstrates his ability to apply AI to dense, high-context knowledge domains.\n\nDemo: https://rashtramai.vercel.app"
    },
    {
      id: "ai-projects",
      question: "Which projects demonstrate his AI capabilities?",
      keywords: ["ai", "ml", "machine learning", "ai capability", "ai capabilities", "llm", "rag project"],
      answer:
        "His clearest AI proof point is **Rashtram AI**, where he worked with RAG, LLM application design, embeddings, vector search, and policy intelligence.\n\nThe **AI Adoption Project** adds an analytics angle by exploring how organizations integrate AI through dashboards and trend visualization."
    },
    {
      id: "zomato-analytics",
      question: "What is his data analytics experience?",
      keywords: ["data", "analytics", "zomato", "sql", "pandas", "dashboard", "tableau", "business intelligence"],
      answer:
        "Shubhaang's data analytics experience is strongest in cleaning, exploring, querying, and presenting business data.\n\nIn **Zomato Data Analysis**, he used Python, Pandas, SQL, EDA, visualization, and dashboard thinking to find patterns in restaurant and customer data and convert them into business-friendly insights."
    },
    {
      id: "employee-task-management",
      question: "Tell me about the Employee Task Management and Billing System.",
      keywords: ["employee", "task management", "billing", "kataruka", "akkc", "client portal", "invoice", "workflow"],
      answer:
        "The Employee Task Management and Billing System is a full-stack business application built for A K Kataruka & Company.\n\nIt helps manage employee tasks, client work, billing operations, invoice generation, role-based access, and operational analytics. This project shows Shubhaang's ability to build software for real workflow problems, not just portfolio demos.\n\nDemo: https://akkc-eight.vercel.app"
    },
    {
      id: "ai-adoption-project",
      question: "What is the AI Adoption Project?",
      keywords: ["ai adoption", "streamlit", "kataruka streamlit", "adoption analytics", "trend visualization"],
      answer:
        "The AI Adoption Project is an analytics platform for understanding how organizations adopt artificial intelligence.\n\nIt uses interactive dashboards and trend visualization to turn AI adoption data into business insights. It highlights Shubhaang's interest in the intersection of AI, analytics, and decision-making.\n\nDemo: https://kataruka.streamlit.app"
    },
    {
      id: "full-stack",
      question: "What is his full-stack development experience?",
      keywords: ["full-stack", "full stack", "software", "react", "node", "express", "freelance", "website", "frontend", "backend"],
      answer:
        "Shubhaang has full-stack experience across frontend, backend, APIs, and databases.\n\nHis stack includes React, TypeScript, Node.js, Express, REST APIs, PostgreSQL, and Prisma. His proof points include the Employee Task Management and Billing System, this portfolio backend, and client-facing freelance websites."
    },
    {
      id: "skills-overview",
      question: "What are his strongest technical skills?",
      keywords: ["skills", "technical", "strongest", "stack", "tools", "technologies", "languages", "proficient"],
      answer:
        "Shubhaang's strongest technical areas are:\n\n- **AI/ML:** RAG, NLP, embeddings, vector databases, LLM applications, prompt engineering.\n- **Data:** SQL, PostgreSQL, Pandas, Tableau, dashboards, exploratory data analysis.\n- **Software:** React, TypeScript, Node.js, Express, Prisma, REST APIs.\n- **Problem Solving:** 1700+ LeetCode rating and 300+ DSA problems solved."
    },
    {
      id: "internships",
      question: "What internships has Shubhaang completed?",
      keywords: ["internship", "internships", "intern", "experience", "work experience", "rashtram", "placement", "strategy"],
      answer:
        "Shubhaang has completed two key internships:\n\n- **AI/ML Engineer Intern, Rashtram School of Public Leadership:** Worked on RAG systems, policy intelligence, LLM applications, and AI product development.\n- **Hiring Research and Strategy Intern, Rishihood University:** Worked around research, strategy, talent acquisition, and leadership exposure."
    },
    {
      id: "education",
      question: "What is his education background?",
      keywords: ["education", "college", "university", "rishihood", "newton", "gpa", "cgpa", "student", "year", "degree", "btech", "csai", "academic"],
      answer:
        "Shubhaang is pursuing a B.Tech in Computer Science and Artificial Intelligence at Rishihood University x Newton School of Technology.\n\nHe is currently in his 3rd year, has an 8.5 CGPA, and is expected to graduate in 2028."
    },
    {
      id: "career-goals",
      question: "What are his career goals?",
      keywords: ["career goals", "goals", "short term", "long term", "future", "aspiration", "aspirations"],
      answer:
        "Short term, Shubhaang wants to build production-grade AI systems, strengthen his data and database expertise, and gain hands-on industry experience.\n\nLong term, he aims to become an AI and Data Systems Engineer who builds intelligent products that improve decision-making and create practical societal impact."
    },
    {
      id: "leadership",
      question: "Tell me about his leadership experience.",
      keywords: ["leadership", "business", "finance", "investment", "stock", "mdrt", "pan iit", "sponsorship", "house captain", "national integration"],
      answer:
        "Shubhaang's leadership record shows initiative beyond coursework:\n\n- PAN IIT 2026 representative\n- Hacktoberfest Super Contributor\n- Youngest MDRT Qualifier FY25 at Aditya Birla Capital\n- House Captain\n- National Integration Camp Volunteer\n\nThese experiences show ownership, communication, adaptability, and execution under responsibility."
    },
    {
      id: "dsa-leetcode",
      question: "What are his DSA and LeetCode achievements?",
      keywords: ["leetcode", "dsa", "algorithm", "algorithms", "rating", "problems", "competitive", "programming", "coding"],
      answer:
        "Shubhaang has a 1700+ LeetCode contest rating and has solved 300+ DSA problems.\n\nThat record shows consistent problem-solving practice across algorithms, data structures, and interview-style coding patterns."
    },
    {
      id: "open-source",
      question: "Does he have open-source experience?",
      keywords: ["hacktoberfest", "open source", "opensource", "github", "pull request", "pr", "contributions"],
      answer:
        "Yes. Shubhaang has Hacktoberfest Super Contributor recognition and experience working through GitHub-based open-source workflows.\n\nThat signals comfort with unfamiliar codebases, pull requests, collaboration, and contribution discipline."
    },
    {
      id: "contact",
      question: "How can I contact him?",
      keywords: ["contact", "email", "reach out", "message", "linkedin", "github", "connect"],
      answer:
        "You can contact Shubhaang by email at shubhaangkataruka22012007@gmail.com or connect with him on LinkedIn: https://www.linkedin.com/in/shubhaangkataruka\n\nFor code and project work, his GitHub is: https://github.com/S-h-u-b-h-1"
    }
  ] satisfies KnowledgeResponse[]
};
