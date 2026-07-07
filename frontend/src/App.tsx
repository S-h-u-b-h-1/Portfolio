import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { AppLayout } from "./components/layout/AppLayout";
import { PageLoader } from "./components/layout/PageLoader";

const HomePage = lazy(() => import("./routes/HomePage").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./routes/AboutPage").then((m) => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import("./routes/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ExperiencePage = lazy(() => import("./routes/ExperiencePage").then((m) => ({ default: m.ExperiencePage })));
const SkillsPage = lazy(() => import("./routes/SkillsPage").then((m) => ({ default: m.SkillsPage })));
const AchievementsPage = lazy(() => import("./routes/AchievementsPage").then((m) => ({ default: m.AchievementsPage })));
const WritingPage = lazy(() => import("./routes/WritingPage").then((m) => ({ default: m.WritingPage })));
const ContactPage = lazy(() => import("./routes/ContactPage").then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import("./routes/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

export default function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

