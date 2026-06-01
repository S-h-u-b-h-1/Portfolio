import type { NextFunction, Request, Response } from "express";
import { createPortfolioVisit, getPortfolioVisitCounts } from "../services/visits.service";
import { optionalString, requiredString } from "../utils/validation";

function getClientIp(req: Request) {
  const forwardedFor = req.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || req.ip;
}

export async function createPortfolioVisitController(req: Request, res: Response, next: NextFunction) {
  try {
    const { visitorId, path, referrer } = req.body ?? {};

    const counts = await createPortfolioVisit({
      visitorId: requiredString(visitorId, "visitorId", { max: 160 }),
      path: optionalString(path, "path", { max: 2048 }) ?? "/",
      referrer: optionalString(referrer, "referrer", { max: 2048 }) ?? req.get("referer"),
      userAgent: req.get("user-agent"),
      ipAddress: getClientIp(req)
    });

    res.status(201).json({
      success: true,
      ...counts
    });
  } catch (error) {
    next(error);
  }
}

export async function getPortfolioVisitCountController(_req: Request, res: Response, next: NextFunction) {
  try {
    const counts = await getPortfolioVisitCounts();
    res.json(counts);
  } catch (error) {
    next(error);
  }
}
