import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { apiRouter } from "./routes";

export const app = express();

const corsOrigins = [env.CORS_ORIGIN, env.FRONTEND_URL, env.NODE_ENV !== "production" ? "http://localhost:5173" : ""]
  .flatMap((origin) => origin?.split(",") ?? [])
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOrigin = corsOrigins.length > 1 ? Array.from(new Set(corsOrigins)) : corsOrigins[0];

app.use(
  cors({
    origin: corsOrigin || false,
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.json({
    name: "Shubhaang Kataruka Portfolio API",
    status: "ok",
    docs: "/api/health"
  });
});

app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
