-- Add richer metadata + session identity to portfolio visits
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "visitorId" TEXT;

ALTER TABLE "PortfolioVisit"
  ADD COLUMN IF NOT EXISTS "sessionId" TEXT NOT NULL DEFAULT 'legacy-session';

ALTER TABLE "PortfolioVisit"
  ADD COLUMN IF NOT EXISTS "language" TEXT,
  ADD COLUMN IF NOT EXISTS "timezone" TEXT,
  ADD COLUMN IF NOT EXISTS "utmSource" TEXT,
  ADD COLUMN IF NOT EXISTS "utmMedium" TEXT,
  ADD COLUMN IF NOT EXISTS "utmCampaign" TEXT;

CREATE INDEX IF NOT EXISTS "PortfolioVisit_sessionId_idx" ON "PortfolioVisit" ("sessionId");
CREATE INDEX IF NOT EXISTS "PortfolioVisit_visitorId_sessionId_idx" ON "PortfolioVisit" ("visitorId", "sessionId");

-- Existing data migration path for historical rows with empty session id.
UPDATE "PortfolioVisit" SET "sessionId" = 'legacy-session' WHERE "sessionId" IS NULL OR "sessionId" = '';

-- Remove default now that we enforce app-level creation with explicit session ids.
ALTER TABLE "PortfolioVisit" ALTER COLUMN "sessionId" DROP DEFAULT;
