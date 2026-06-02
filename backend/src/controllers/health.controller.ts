import type { Request, Response } from "express";
import { getDatabaseHealth } from "../services/database-health.service";

export function getHealth(_req: Request, res: Response) {
  res.json({
    status: "ok"
  });
}

export async function getDatabaseHealthController(_req: Request, res: Response) {
  const status = await getDatabaseHealth();
  res.status(status.canConnect ? 200 : 503).json(status);
}
