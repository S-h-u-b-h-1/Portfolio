import "dotenv/config";

function numberFromEnv(key: string, fallback: number) {
  const rawValue = process.env[key];
  const parsed = rawValue ? Number(rawValue) : fallback;

  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeProvider(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();

  if (normalized === "local") {
    return "local";
  }

  if (normalized === "gemini" || normalized === "google" || normalized === "google-gemini") {
    return "gemini";
  }

  return "openai-compatible";
}

const AI_PROVIDER = normalizeProvider(process.env.AI_PROVIDER);
const DEFAULT_AI_BASE_URL =
  AI_PROVIDER === "gemini" ? "https://generativelanguage.googleapis.com/v1beta" : "https://api.openai.com/v1";
const DEFAULT_AI_MODEL = AI_PROVIDER === "gemini" ? "gemini-flash-latest" : "gpt-4o-mini";

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: numberFromEnv("PORT", 5001),
  FRONTEND_URL: process.env.FRONTEND_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DATABASE_URL: process.env.DATABASE_URL,
  VISITOR_HASH_SALT: process.env.VISITOR_HASH_SALT ?? "portfolio-visit-salt",
  AI_PROVIDER,
  AI_API_KEY: process.env.AI_API_KEY ?? process.env.OPENAI_API_KEY ?? process.env.GEMINI_API_KEY,
  AI_BASE_URL: normalizeUrl(process.env.AI_BASE_URL ?? process.env.OPENAI_BASE_URL ?? DEFAULT_AI_BASE_URL),
  AI_MODEL: process.env.AI_MODEL ?? process.env.OPENAI_MODEL ?? process.env.GEMINI_MODEL ?? DEFAULT_AI_MODEL,
  AI_TIMEOUT_MS: numberFromEnv("AI_TIMEOUT_MS", 7000)
};
