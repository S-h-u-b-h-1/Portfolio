import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later."
    });
  }
});

export const visitRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Math.max(20, Math.floor((env.VISIT_SESSION_TTL_MINUTES || 30) * 2)),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many visit requests. Please try again later."
    });
  }
});
