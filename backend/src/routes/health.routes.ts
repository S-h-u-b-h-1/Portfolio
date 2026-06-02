import { Router } from "express";
import { getDatabaseHealthController, getHealth } from "../controllers/health.controller";

export const healthRouter = Router();

healthRouter.get("/", getHealth);
healthRouter.get("/db", getDatabaseHealthController);
