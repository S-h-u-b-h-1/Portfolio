import { Router } from "express";
import { createPortfolioVisitController, getIdentifiedVisitorsController, getPortfolioVisitCountController } from "../controllers/visits.controller";
import { visitRateLimiter } from "../middleware/rate-limit.middleware";

export const visitsRouter = Router();

visitsRouter.get("/count", visitRateLimiter, getPortfolioVisitCountController);
visitsRouter.get("/identified", visitRateLimiter, getIdentifiedVisitorsController);
visitsRouter.post("/", visitRateLimiter, createPortfolioVisitController);
