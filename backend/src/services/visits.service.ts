import { createHash } from "node:crypto";
import { env } from "../config/env";
import { classifyDatabaseIssue, type DatabaseIssue } from "./database-health.service";
import { prisma } from "../utils/prisma";

export type CreatePortfolioVisitInput = {
  visitorId: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
};

export type PortfolioVisitCounts = {
  totalViews: number;
  uniqueVisitors: number;
  storageAvailable: boolean;
  storageIssue?: DatabaseIssue;
  prismaCode?: string;
};

const MAX_PATH_LENGTH = 2048;
const MAX_REFERRER_LENGTH = 2048;
const MAX_USER_AGENT_LENGTH = 512;

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

export async function createPortfolioVisit(input: CreatePortfolioVisitInput) {
  await prisma.portfolioVisit
    .create({
      data: {
        visitorId: input.visitorId,
        path: truncate(input.path, MAX_PATH_LENGTH) ?? "/",
        referrer: truncate(input.referrer, MAX_REFERRER_LENGTH),
        userAgent: truncate(input.userAgent, MAX_USER_AGENT_LENGTH),
        ipHash: hashIpAddress(input.ipAddress)
      }
    })
    .catch(() => undefined);

  return getPortfolioVisitCounts();
}

export async function getPortfolioVisitCounts(): Promise<PortfolioVisitCounts> {
  try {
    const [totalViews, visitorGroups] = await Promise.all([
      prisma.portfolioVisit.count(),
      prisma.portfolioVisit.groupBy({
        by: ["visitorId"]
      })
    ]);

    return {
      totalViews,
      uniqueVisitors: visitorGroups.length,
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
