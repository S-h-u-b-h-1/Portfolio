import type { ProjectItem } from "./types";

export const projectCategories = [
  "AI/ML",
  "Data Analytics",
  "Full Stack",
  "Public Policy",
  "Business",
  "Freelance",
  "Open Source"
] as const;

export const projects = [
  {
    id: "rashtram-ai",
    title: "Rashtram AI",
    slug: "rashtram-ai",
    status: "case-study-needed",
    categories: ["AI/ML", "Public Policy", "Full Stack"],
    tags: ["RAG", "LLM App", "Vector Search", "Public Policy", "AI Engineering"],
    summary:
      "A RAG-based public policy intelligence system that helps users understand parliamentary bills, policies, and citizen impact.",
    problem:
      "Public policy documents and parliamentary material can be dense, fragmented, and difficult for learners or citizens to interpret quickly.",
    role:
      "AI/ML Engineer Intern responsible for helping build the assistant experience and RAG-oriented product flow.",
    techStack: ["RAG", "LLM application", "Embeddings", "Vector search", "Full-stack app", "Policy knowledge base"],
    process: [
      "Mapped target users such as policy students, UPSC aspirants, law students, public leadership learners, and citizens",
      "Structured policy content for retrieval and response generation",
      "Designed answers around clarity, context, and real-world impact"
    ],
    features: [
      "Policy and bill Q&A",
      "Contextual explanations",
      "Citizen-impact framing",
      "Public policy knowledge retrieval"
    ],
    impact: [
      "Made complex policy material easier to explore through an AI-first interface",
      "Created a concrete production RAG system around public leadership education"
    ],
    futureImprovements: [
      "Add citations and source snippets for every answer",
      "Add document upload and comparison flows",
      "Add evaluation sets for answer accuracy and groundedness"
    ],
    links: {
      live: "https://rashtramai.vercel.app/",
      repo: "TODO_REPO_URL",
      caseStudy: "/projects/rashtram-ai"
    },
    image: "/project-images/rashtram-ai-placeholder.png",
    proofStatus: "Live demo added. Add screenshots and verified architecture notes."
  },
  {
    id: "zomato-data-analysis",
    title: "Zomato Data Analysis",
    slug: "zomato-data-analysis",
    status: "case-study-needed",
    categories: ["Data Analytics", "Business"],
    tags: ["Data Cleaning", "EDA", "SQL/Pandas", "Dashboards", "Business Insights"],
    summary:
      "A data analytics project focused on extracting business insights from restaurant, customer, pricing, and rating data.",
    problem:
      "Restaurant marketplace data contains useful business signals, but the value appears only after cleaning, segmenting, visualizing, and interpreting patterns.",
    role:
      "Data analyst responsible for extracting insights and translating them into business-friendly observations.",
    techStack: ["Python", "Pandas", "SQL", "Tableau", "Google Sheets", "EDA"],
    process: [
      "Cleaned and explored restaurant/customer/business data",
      "Compared ratings, pricing, cuisine, and location patterns",
      "Prepared dashboard-ready insights for decision-making"
    ],
    features: [
      "Business insight cards",
      "Charts and dashboard views",
      "Customer behavior observations",
      "Rating, pricing, and location trend analysis"
    ],
    impact: [
      "Showcases analytical thinking and business interpretation",
      "Connects data work with market, customer, and restaurant strategy"
    ],
    futureImprovements: [
      "Add interactive filters by city, cuisine, price band, and rating",
      "Add SQL query breakdowns",
      "Add notebook and SQL walkthrough links"
    ],
    links: {
      live: "https://public.tableau.com/app/profile/kush.puri/viz/Zomato_Delivery_Analysis/Dashboard1",
      repo: "TODO_REPO_URL",
      caseStudy: "/projects/zomato-data-analysis"
    },
    image: "/project-images/zomato-analysis-placeholder.png",
    proofStatus: "Public Tableau dashboard added. Add dataset source, notebook, and final insight notes."
  },
  {
    id: "hair-salon-website",
    title: "Hair Salon Website",
    slug: "hair-salon-website",
    status: "case-study-needed",
    categories: ["Full Stack", "Freelance"],
    tags: ["Client Website", "Responsive UI", "Booking", "Services", "Contact"],
    summary:
      "A client-focused full-stack website built for a hair salon with a modern responsive interface.",
    problem:
      "The business needed a modern web presence that could present services clearly and make customer contact or booking easier.",
    role:
      "Freelance full-stack developer responsible for designing and building the website experience.",
    techStack: ["React", "Tailwind CSS", "Node.js", "Responsive design", "Contact forms"],
    process: [
      "Translated business needs into website sections",
      "Designed mobile-first service, booking, and contact flows",
      "Built a polished, responsive client-facing UI"
    ],
    features: [
      "Service listings",
      "Booking/contact call-to-actions",
      "Responsive layout",
      "Business-friendly landing sections"
    ],
    impact: [
      "Created practical client-facing freelance delivery experience",
      "Shows ability to build for real business needs"
    ],
    futureImprovements: [
      "Add booking calendar integration",
      "Add admin-editable services",
      "Add performance and SEO reporting"
    ],
    links: {
      live: "https://www.themaxxsalon.shop/",
      repo: "TODO_REPO_URL",
      caseStudy: "/projects/hair-salon-website"
    },
    image: "/project-images/hair-salon-placeholder.png",
    proofStatus: "Live client site added. Add client-approved screenshots when available."
  },
  {
    id: "hacktoberfest-open-source",
    title: "Hacktoberfest Contributions",
    slug: "hacktoberfest-open-source",
    status: "placeholder",
    categories: ["Open Source"],
    tags: ["Hacktoberfest", "GitHub", "Open Source", "Collaboration"],
    summary:
      "Open-source contribution track connected to Hacktoberfest Super Contributor recognition in 2024 and 2025.",
    problem:
      "Open-source work requires understanding unfamiliar codebases, communicating changes, and contributing within existing project standards.",
    role:
      "Contributor across eligible repositories and issues during Hacktoberfest participation.",
    techStack: ["Git", "GitHub", "Pull requests", "Issue tracking", "Code review"],
    process: [
      "Identified contribution opportunities",
      "Worked within repository guidelines",
      "Submitted improvements through pull requests"
    ],
    features: [
      "Open-source contribution record",
      "GitHub collaboration",
      "Issue-based delivery"
    ],
    impact: [
      "Earned Hacktoberfest Super Contributor status in 2024 and 2025",
      "Shows consistency and collaboration beyond coursework"
    ],
    futureImprovements: [
      "Add selected pull requests",
      "Add repository names and contribution summaries",
      "Add screenshots or certificate links"
    ],
    links: {
      live: "TODO_HACKTOBERFEST_PROFILE_URL",
      repo: "TODO_GITHUB_URL",
      caseStudy: "/projects/hacktoberfest-open-source"
    },
    image: "/project-images/open-source-placeholder.png",
    proofStatus: "Add contribution links and certificates."
  },
  {
    id: "sql-tableau-sheets-dashboards",
    title: "SQL/Tableau Dashboard Work",
    slug: "sql-tableau-sheets-dashboards",
    status: "placeholder",
    categories: ["Data Analytics", "Business"],
    tags: ["SQL", "Tableau", "Google Sheets", "Dashboards", "Business Analytics"],
    summary:
      "Placeholder collection for SQL dashboards, Tableau dashboards, and Google Sheets analytics work.",
    problem:
      "Business and operational data becomes more useful when transformed into clear queries, dashboards, and repeatable reporting views.",
    role:
      "Analyst/developer building query-driven dashboards and business insight views.",
    techStack: ["SQL", "Tableau", "Google Sheets", "PostgreSQL", "Data cleaning", "Dashboard design"],
    process: [
      "Define the business question",
      "Clean and model the data",
      "Build SQL queries and dashboard views",
      "Summarize insights for non-technical readers"
    ],
    features: [
      "SQL query examples",
      "Dashboard screenshots",
      "Business metric cards",
      "Filterable reporting views"
    ],
    impact: [
      "Creates a dedicated proof area for analytics and SQL strengths",
      "Supports roles involving data, BI, and database-heavy work"
    ],
    futureImprovements: [
      "Add 2-3 finished dashboard examples",
      "Add downloadable datasets or query snippets",
      "Add before/after insight notes"
    ],
    links: {
      live: "TODO_DASHBOARD_URL",
      repo: "TODO_REPO_URL",
      caseStudy: "/projects/sql-tableau-sheets-dashboards"
    },
    image: "/project-images/dashboards-placeholder.png",
    proofStatus: "Add dashboard exports, query samples, and public links."
  }
] satisfies ProjectItem[];
