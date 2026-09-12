import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { createPortfolioVisit, getIdentifiedVisitors, getPortfolioVisitCounts } from "../services/visits.service";
import { optionalString, requiredString } from "../utils/validation";
import { HttpError } from "../utils/http-error";

function getClientIp(req: Request) {
  const forwardedFor = req.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwardedFor) {
    return forwardedFor;
  }

  return req.get("x-real-ip") || req.ip;
}

export async function createPortfolioVisitController(req: Request, res: Response, next: NextFunction) {
  try {
    const { visitorId, sessionId, path, referrer, language, timezone, utmSource, utmMedium, utmCampaign } = req.body ?? {};

    const counts = await createPortfolioVisit({
      visitorId: requiredString(visitorId, "visitorId", { max: 160 }),
      sessionId: requiredString(sessionId, "sessionId", { max: 160 }),
      path: optionalString(path, "path", { max: 2048 }) ?? "/",
      referrer: optionalString(referrer, "referrer", { max: 2048 }) ?? req.get("referer"),
      userAgent: req.get("user-agent"),
      ipAddress: getClientIp(req),
      language: optionalString(language, "language", { max: 64 }),
      timezone: optionalString(timezone, "timezone", { max: 64 }),
      utmSource: optionalString(utmSource, "utmSource", { max: 64 }),
      utmMedium: optionalString(utmMedium, "utmMedium", { max: 64 }),
      utmCampaign: optionalString(utmCampaign, "utmCampaign", { max: 64 })
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

function getVisitAdminToken(req: Request) {
  const bearerToken = req.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  const explicitHeaderToken = req.get("x-visit-admin-token");

  return (explicitHeaderToken || bearerToken || "").trim();
}

export async function getIdentifiedVisitorsController(req: Request, res: Response, next: NextFunction) {
  try {
    if (!env.VISIT_ADMIN_TOKEN || getVisitAdminToken(req) !== env.VISIT_ADMIN_TOKEN) {
      throw new HttpError(401, "Missing or invalid visit admin token.");
    }

    const requestedLimit = typeof req.query.limit === "string" ? req.query.limit : undefined;
    const rawLimit = requestedLimit ? Number(requestedLimit) : 50;
    const limit = Number.isFinite(rawLimit) ? Math.floor(rawLimit) : 50;

    const identifiedVisitors = await getIdentifiedVisitors(limit);

    res.json({
      success: true,
      ...identifiedVisitors
    });
  } catch (error) {
    next(error);
  }
}
