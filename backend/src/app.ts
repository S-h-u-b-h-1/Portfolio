import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { apiRouter } from "./routes";

export const app = express();

const developmentOrigins =
  env.NODE_ENV !== "production"
    ? ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"]
    : [];
const corsOrigins = [env.CORS_ORIGIN, env.FRONTEND_URL, ...developmentOrigins]
  .flatMap((origin) => origin?.split(",") ?? [])
  .map((origin) => origin.trim())
  .filter(Boolean);

const uniqueCorsOrigins = Array.from(new Set(corsOrigins));

app.use(
  cors({
    origin: uniqueCorsOrigins.length > 0 ? uniqueCorsOrigins : env.NODE_ENV === "production" ? false : true,
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
