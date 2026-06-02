import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export type DatabaseIssue =
  | "missing-database-url"
  | "invalid-database-url"
  | "database-auth-failed"
  | "database-does-not-exist"
  | "database-unreachable"
  | "database-timeout"
  | "database-ssl-error"
  | "missing-table-or-migration"
  | "database-error";

export type DatabaseHealthStatus = {
  status: "ok" | "error";
  canConnect: boolean;
  checkedAt: string;
  env: {
    hasDatabaseUrl: boolean;
    hasDirectUrl: boolean;
    databaseUrlType: "pooled" | "direct" | "unknown" | "missing";
    directUrlType: "pooled" | "direct" | "unknown" | "missing";
  };
  issue?: DatabaseIssue;
  prismaCode?: string;
  errorName?: string;
  errorMessage?: string;
};

function classifyUrl(value: string | undefined): DatabaseHealthStatus["env"]["databaseUrlType"] {
  if (!value) {
    return "missing";
  }

  try {
    const host = new URL(value).hostname;
    return host.includes("-pooler.") ? "pooled" : "direct";
  } catch {
    return "unknown";
  }
}

function getErrorName(error: unknown) {
  if (error && typeof error === "object") {
    const constructorName = error.constructor?.name;
    const namedError = "name" in error && typeof error.name === "string" ? error.name : undefined;
    return constructorName || namedError;
  }

  return undefined;
}

function getPrismaCode(error: unknown) {
  if (error && typeof error === "object") {
    const possibleCode = "code" in error && typeof error.code === "string" ? error.code : undefined;
    const possibleErrorCode =
      "errorCode" in error && typeof error.errorCode === "string" ? error.errorCode : undefined;

    return possibleErrorCode ?? possibleCode;
  }

  return undefined;
}

function sanitizeErrorMessage(error: unknown) {
  const rawMessage = error instanceof Error ? error.message : String(error);

  return rawMessage
    .replace(/postgres(?:ql)?:\/\/\S+/gi, "postgresql://<redacted>")
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, "<email-redacted>")
    .replace(/\bnpg_[A-Za-z0-9]+\b/g, "<secret-redacted>")
    .replace(/(password|apikey|api_key|secret|token)=([^&\s]+)/gi, "$1=<redacted>")
    .slice(0, 360);
}

function classifyByCode(code: string | undefined): DatabaseIssue | undefined {
  switch (code) {
    case "P1000":
      return "database-auth-failed";
    case "P1001":
      return "database-unreachable";
    case "P1002":
      return "database-timeout";
    case "P1003":
      return "database-does-not-exist";
    case "P1013":
      return "invalid-database-url";
    case "P2021":
    case "P2022":
      return "missing-table-or-migration";
    default:
      return undefined;
  }
}

function classifyByMessage(message: string): DatabaseIssue | undefined {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("authentication failed") || normalizedMessage.includes("invalid password")) {
    return "database-auth-failed";
  }

  if (normalizedMessage.includes("does not exist")) {
    return "database-does-not-exist";
  }

  if (normalizedMessage.includes("can't reach") || normalizedMessage.includes("could not connect")) {
    return "database-unreachable";
  }

  if (normalizedMessage.includes("timed out") || normalizedMessage.includes("timeout")) {
    return "database-timeout";
  }

  if (normalizedMessage.includes("ssl") || normalizedMessage.includes("tls")) {
    return "database-ssl-error";
  }

  if (normalizedMessage.includes("portfolio") && normalizedMessage.includes("does not exist")) {
    return "missing-table-or-migration";
  }

  return undefined;
}

export function classifyDatabaseIssue(
  error: unknown
): Pick<DatabaseHealthStatus, "issue" | "prismaCode" | "errorName" | "errorMessage"> {
  if (!process.env.DATABASE_URL) {
    return { issue: "missing-database-url" };
  }

  const errorMessage = sanitizeErrorMessage(error);
  const prismaCode = getPrismaCode(error);
  const codedIssue = classifyByCode(prismaCode);
  const messageIssue = classifyByMessage(errorMessage);
  const errorName = getErrorName(error);

  if (codedIssue || messageIssue) {
    return {
      issue: codedIssue ?? messageIssue,
      prismaCode,
      errorName,
      errorMessage
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return { issue: "database-error", prismaCode: error.errorCode, errorName, errorMessage };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return { issue: "database-error", prismaCode: error.code, errorName, errorMessage };
  }

  return { issue: "database-error", prismaCode, errorName, errorMessage };
}

function buildBaseStatus(): Omit<DatabaseHealthStatus, "status" | "canConnect"> {
  return {
    checkedAt: new Date().toISOString(),
    env: {
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      hasDirectUrl: Boolean(process.env.DIRECT_URL),
      databaseUrlType: classifyUrl(process.env.DATABASE_URL),
      directUrlType: classifyUrl(process.env.DIRECT_URL)
    }
  };
}

export async function getDatabaseHealth(): Promise<DatabaseHealthStatus> {
  const baseStatus = buildBaseStatus();

  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      ...baseStatus,
      status: "ok",
      canConnect: true
    };
  } catch (error) {
    const diagnosis = classifyDatabaseIssue(error);

    return {
      ...baseStatus,
      status: "error",
      canConnect: false,
      ...diagnosis
    };
  }
}
