import { createHash } from "node:crypto";
import { env } from "../config/env";
import { classifyDatabaseIssue, type DatabaseIssue } from "./database-health.service";
import { prisma } from "../utils/prisma";

const BOT_PATTERNS = [
  "bot",
  "crawler",
  "crawl",
  "spider",
  "headless",
  "curl",
  "wget",
  "python-requests",
  "httpclient",
  "postman",
  "insomnia",
  "fetch",
  "slackbot",
  "facebookexternalhit",
  "bingpreview"
];

export type CreatePortfolioVisitInput = {
  visitorId: string;
  sessionId: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  language?: string;
  timezone?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type PortfolioVisitCounts = {
  totalViews: number;
  uniqueVisitors: number;
  storageAvailable: boolean;
  storageIssue?: DatabaseIssue;
  prismaCode?: string;
};

export type IdentifiedVisitorRecord = {
  visitorId: string;
  contact: {
    name: string;
    email: string;
    company?: string | null;
    purpose: string;
    message: string;
    createdAt: string;
  };
  firstVisitAt?: string;
  lastVisitAt?: string;
  firstPath?: string;
  lastPath?: string;
  visitCount: number;
};

const MAX_PATH_LENGTH = 2048;
const MAX_REFERRER_LENGTH = 2048;
const MAX_USER_AGENT_LENGTH = 512;
const MAX_META_LENGTH = 64;
const MAX_MESSAGE_LENGTH = 4000;

function truncate(value: string | undefined, maxLength: number) {
  if (!value) {
    return undefined;
  }

  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function hashIpAddress(ipAddress: string | undefined) {
  if (!ipAddress) {
    return undefined;
  }

  return createHash("sha256").update(`${env.VISITOR_HASH_SALT}:${ipAddress}`).digest("hex");
}

function isLikelyBot(userAgent: string | undefined) {
  const normalized = userAgent?.toLowerCase() ?? "";
  return BOT_PATTERNS.some((pattern) => normalized.includes(pattern));
}

function sessionWindowStart() {
  const ttlMinutes = Math.max(env.VISIT_SESSION_TTL_MINUTES, 1);
  return new Date(Date.now() - ttlMinutes * 60 * 1000);
}

export async function createPortfolioVisit(input: CreatePortfolioVisitInput) {
  if (isLikelyBot(input.userAgent)) {
    return getPortfolioVisitCounts();
  }

  const normalizedVisitorId = input.visitorId.trim();
  const normalizedSessionId = input.sessionId.trim();
  const normalizedPath = truncate(input.path, MAX_PATH_LENGTH) ?? "/";
  const normalizedReferrer = truncate(input.referrer, MAX_REFERRER_LENGTH);
  const normalizedUserAgent = truncate(input.userAgent, MAX_USER_AGENT_LENGTH);
  const normalizedLanguage = truncate(input.language, MAX_META_LENGTH);
  const normalizedTimezone = truncate(input.timezone, MAX_META_LENGTH);
  const normalizedUtmSource = truncate(input.utmSource, MAX_META_LENGTH);
  const normalizedUtmMedium = truncate(input.utmMedium, MAX_META_LENGTH);
  const normalizedUtmCampaign = truncate(input.utmCampaign, MAX_META_LENGTH);

  const sessionBoundary = sessionWindowStart();

  try {
    const existingVisit = await prisma.portfolioVisit.findFirst({
      where: {
        sessionId: normalizedSessionId,
        createdAt: {
          gte: sessionBoundary
        }
      },
      select: {
        id: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (existingVisit) {
      await prisma.portfolioVisit.update({
        where: {
          id: existingVisit.id
        },
        data: {
          path: normalizedPath,
          referrer: normalizedReferrer,
          language: normalizedLanguage,
          timezone: normalizedTimezone,
          utmSource: normalizedUtmSource,
          utmMedium: normalizedUtmMedium,
          utmCampaign: normalizedUtmCampaign,
          userAgent: normalizedUserAgent
        }
      });

      return getPortfolioVisitCounts();
    }

    await prisma.portfolioVisit.create({
      data: {
        visitorId: normalizedVisitorId,
        sessionId: normalizedSessionId,
        path: normalizedPath,
        referrer: normalizedReferrer,
        userAgent: normalizedUserAgent,
        ipHash: hashIpAddress(input.ipAddress),
        language: normalizedLanguage,
        timezone: normalizedTimezone,
        utmSource: normalizedUtmSource,
        utmMedium: normalizedUtmMedium,
        utmCampaign: normalizedUtmCampaign
      }
    });

    return getPortfolioVisitCounts();
  } catch {
    return getPortfolioVisitCounts();
  }
}

export async function getPortfolioVisitCounts(): Promise<PortfolioVisitCounts> {
  try {
    const [rawTotalViews, rawUniqueVisitors] = await Promise.all([
      prisma.$queryRaw<Array<{ count: number }>>`
        SELECT COUNT(DISTINCT "sessionId")::int as count FROM "PortfolioVisit"
      `,
      prisma.$queryRaw<Array<{ count: number }>>`
        SELECT COUNT(DISTINCT "visitorId")::int as count FROM "PortfolioVisit"
      `
    ]);

    return {
      totalViews: rawTotalViews[0]?.count ?? 0,
      uniqueVisitors: rawUniqueVisitors[0]?.count ?? 0,
      storageAvailable: true
    };
  } catch (error) {
    const diagnosis = classifyDatabaseIssue(error);

    return {
      totalViews: 0,
      uniqueVisitors: 0,
      storageAvailable: false,
      storageIssue: diagnosis.issue,
      prismaCode: diagnosis.prismaCode
    };
  }
}

export async function getIdentifiedVisitors(limit = 50): Promise<{ generatedAt: string; visitors: IdentifiedVisitorRecord[] }> {
  const normalizedLimit = Math.min(Math.max(limit, 1), 500);

  const contactMessages = await prisma.contactMessage.findMany({
    where: {
      visitorId: {
        not: null
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: normalizedLimit
  });

  const ids: string[] = [];
  const latestMessageByVisitor = new Map<string, (typeof contactMessages)[number]>();

  for (const message of contactMessages) {
    if (!message.visitorId) {
      continue;
    }

    if (!latestMessageByVisitor.has(message.visitorId)) {
      latestMessageByVisitor.set(message.visitorId, message);
      ids.push(message.visitorId);
    }
  }

  if (ids.length === 0) {
    return {
      generatedAt: new Date().toISOString(),
      visitors: []
    };
  }

  const visitEvents = await prisma.portfolioVisit.findMany({
    where: {
      visitorId: {
        in: ids
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  const visitSummary = new Map<
    string,
    {
      firstVisitAt: string;
      lastVisitAt: string;
      firstPath: string;
      lastPath: string;
      visitCount: number;
    }
  >();

  for (const visit of visitEvents) {
    const previous = visitSummary.get(visit.visitorId);

    if (!previous) {
      visitSummary.set(visit.visitorId, {
        firstVisitAt: visit.createdAt.toISOString(),
        lastVisitAt: visit.createdAt.toISOString(),
        firstPath: visit.path,
        lastPath: visit.path,
        visitCount: 1
      });
      continue;
    }

    previous.lastVisitAt = visit.createdAt.toISOString();
    previous.lastPath = visit.path;
    previous.visitCount += 1;
  }

  const visitors: IdentifiedVisitorRecord[] = [];

  for (const visitorId of ids) {
    const message = latestMessageByVisitor.get(visitorId);

    if (!message) {
      continue;
    }

    const summary = visitSummary.get(visitorId);

    visitors.push({
      visitorId,
      contact: {
        name: message.name,
        email: message.email,
        company: message.company,
        purpose: message.purpose,
        message: truncate(message.message, MAX_MESSAGE_LENGTH) ?? message.message,
        createdAt: message.createdAt.toISOString()
      },
      firstVisitAt: summary?.firstVisitAt,
      lastVisitAt: summary?.lastVisitAt,
      firstPath: summary?.firstPath,
      lastPath: summary?.lastPath,
      visitCount: summary?.visitCount ?? 0
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    visitors
  };
}
