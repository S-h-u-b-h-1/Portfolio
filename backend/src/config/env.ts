import "dotenv/config";

function numberFromEnv(key: string, fallback: number) {
  const rawValue = process.env[key];
  const parsed = rawValue ? Number(rawValue) : fallback;

  return Number.isFinite(parsed) ? parsed : fallback;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: numberFromEnv("PORT", 5001),
  FRONTEND_URL: process.env.FRONTEND_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  DATABASE_URL: process.env.DATABASE_URL,
  AI_PROVIDER: process.env.AI_PROVIDER ?? "openai-compatible",
  AI_API_KEY: process.env.AI_API_KEY ?? process.env.OPENAI_API_KEY,
  AI_BASE_URL: (process.env.AI_BASE_URL ?? process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/+$/, ""),
  AI_MODEL: process.env.AI_MODEL ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini"
};
