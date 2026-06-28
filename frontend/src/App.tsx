import { Route, Routes } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { AppLayout } from "./components/layout/AppLayout";
import { AboutPage } from "./routes/AboutPage";
import { AchievementsPage } from "./routes/AchievementsPage";
import { ContactPage } from "./routes/ContactPage";
import { ExperiencePage } from "./routes/ExperiencePage";
import { HomePage } from "./routes/HomePage";
import { NotFoundPage } from "./routes/NotFoundPage";
import { ProjectsPage } from "./routes/ProjectsPage";
import { SkillsPage } from "./routes/SkillsPage";
import { WritingPage } from "./routes/WritingPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

