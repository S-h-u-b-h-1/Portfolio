-- CreateTable
CREATE TABLE "PortfolioVisit" (
    "id" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "userAgent" TEXT,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PortfolioVisit_visitorId_idx" ON "PortfolioVisit"("visitorId");

-- CreateIndex
CREATE INDEX "PortfolioVisit_path_idx" ON "PortfolioVisit"("path");

-- CreateIndex
CREATE INDEX "PortfolioVisit_createdAt_idx" ON "PortfolioVisit"("createdAt");
