import { Router } from "express";
import { getPortfolioSnapshot } from "../controllers/portfolio.controller";

export const portfolioRouter = Router();

portfolioRouter.get("/", getPortfolioSnapshot);

