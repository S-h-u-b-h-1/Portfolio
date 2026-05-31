import { Router } from "express";
import { chatRouter } from "./chat.routes";
import { contactRouter } from "./contact.routes";
import { healthRouter } from "./health.routes";
import { portfolioRouter } from "./portfolio.routes";
import { profileRouter } from "./profile.routes";
import { projectsRouter } from "./projects.routes";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/portfolio", portfolioRouter);
apiRouter.use("/chat", chatRouter);
apiRouter.use("/contact", contactRouter);
