import {
  Binary,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Rocket,
  ShieldCheck
} from "lucide-react";
import type { TimelineItem } from "../components/portfolio/Timeline";

export const aboutTimeline = [
  {
    id: "school-leadership",
    marker: "0x01",
    title: "School leadership",
    period: "School years",
    description:
      "Built early responsibility through school leadership and team coordination.",
    details: [
      "Class 10 CBSE: 93% and Class 12 CBSE: 91%",
      "Served as House Captain",
      "Participated in and helped manage National Integration Camp"
    ],
    tags: ["Leadership", "Coordination"],
    icon: ShieldCheck
  },
  {
    id: "rishihood-nst",
    marker: "0x02",
    title: "Rishihood University x Newton School of Technology",
    period: "Current - 3rd year",
    description:
      "Studying B.Tech Computer Science & Artificial Intelligence with an 8.5 GPA through the first and second year.",
    details: [
      "Focused on AI/ML, databases, SQL, dashboards, and full-stack engineering",
      "Developing a technical profile with business and public policy awareness",
      "Building toward applied AI and analytics-heavy opportunities"
    ],
    tags: ["CS & AI", "8.5 GPA", "Systems"],
    icon: GraduationCap
  },
  {
    id: "hiring-research",
    marker: "0x03",
    title: "Hiring Research Internship",
    period: "First semester",
    description:
      "Worked with the Rishihood placement and career advancement team on hiring research and strategy.",
    details: [
      "Studied hiring patterns and role expectations",
      "Supported placement strategy and career opportunity research",
      "Learned how companies evaluate skill, communication, and readiness"
    ],
    tags: ["Research", "Strategy", "Career"],
    icon: BriefcaseBusiness
  },
  {
    id: "rashtram-ai",
    marker: "0x04",
    title: "Rashtram AI Internship",
    period: "AI/ML intern",
    description:
      "Built Rashtram AI, a RAG-based public policy assistant for policies, parliamentary bills, discussions, and citizen impact.",
    details: [
      "Worked with retrieval-augmented generation concepts",
      "Focused on simplifying complex public policy material",
      "Connected AI systems with law, governance, and citizen understanding"
    ],
    tags: ["RAG", "Public Policy", "NLP"],
    icon: Landmark
  },
  {
    id: "pan-iit-2026",
    marker: "0x05",
    title: "PAN IIT 2026",
    period: "Long Beach, California",
    description:
      "Represented college at PAN IIT 2026, strengthening exposure to global networks, leadership spaces, and technical ambition.",
    details: [
      "Represented Rishihood x NST at an international event",
      "Gained exposure to founders, mentors, and technology leaders",
      "Brought back a broader view of what technical careers can become"
    ],
    tags: ["Representation", "Network", "Leadership"],
    icon: Binary
  },
  {
    id: "current-goals",
    marker: "0x06",
    title: "Current AI/data/full-stack goals",
    period: "Now",
    description:
      "Building a portfolio around AI engineering, data analytics, databases, and scalable software.",
    details: [
      "Targeting internships and projects in AI/ML, analytics, and full-stack development",
      "Strengthening SQL, dashboards, and database-backed product thinking",
      "Combining technical execution with real-world product and user needs"
    ],
    tags: ["AI/ML", "Analytics", "Full Stack"],
    icon: Rocket
  }
] satisfies TimelineItem[];
