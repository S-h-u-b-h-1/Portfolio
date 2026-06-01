import { Router } from "express";
import { createPortfolioVisitController, getPortfolioVisitCountController } from "../controllers/visits.controller";

export const visitsRouter = Router();

visitsRouter.get("/count", getPortfolioVisitCountController);
visitsRouter.post("/", createPortfolioVisitController);
