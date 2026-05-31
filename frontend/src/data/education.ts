import type { EducationItem } from "./types";

export const education = [
  {
    id: "rishihood-nst-btech-csai",
    institution: "Rishihood University x Newton School of Technology",
    program: "B.Tech Computer Science & Artificial Intelligence",
    location: "India",
    timeframe: "Current - 3rd year",
    score: "GPA 8.5 through first and second year",
    summary:
      "Computer Science and Artificial Intelligence program focused on software engineering, AI systems, data, and applied technical problem-solving.",
    highlights: [
      "Current 3rd-year CS & AI student",
      "Strong interest in AI/ML, RAG, analytics, SQL, databases, dashboards, and full-stack systems",
      "Represented college at PAN IIT 2026 in Long Beach, California",
      "Sponsorship Manager for college tech fest"
    ]
  },
  {
    id: "bhavans-schooling",
    institution: "Bharatiya Vidya Bhavan / Bhavan's Gangabux Kanoria Vidyamandir",
    program: "CBSE Schooling",
    location: "India",
    timeframe: "School years",
    score: "Class 10: 93% | Class 12: 91%",
    summary:
      "Academic foundation with leadership exposure through school responsibilities and national-level participation.",
    highlights: [
      "Class 10 CBSE: 93%",
      "Class 12 CBSE: 91%",
      "Served as House Captain",
      "Participated in and helped manage National Integration Camp"
    ]
  }
] satisfies EducationItem[];

