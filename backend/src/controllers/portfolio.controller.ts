import type { Request, Response } from "express";
import { portfolioData } from "../data/portfolio";

export function getPortfolioSnapshot(_req: Request, res: Response) {
  res.json(portfolioData);
}
