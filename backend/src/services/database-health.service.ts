import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export type DatabaseIssue =
  | "missing-database-url"
  | "invalid-database-url"
  | "database-unreachable"
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

export function classifyDatabaseIssue(error: unknown): Pick<DatabaseHealthStatus, "issue" | "prismaCode"> {
  if (!process.env.DATABASE_URL) {
    return { issue: "missing-database-url" };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    if (error.errorCode === "P1001") {
      return { issue: "database-unreachable", prismaCode: error.errorCode };
    }

    if (error.errorCode === "P1013") {
      return { issue: "invalid-database-url", prismaCode: error.errorCode };
    }

    return { issue: "database-error", prismaCode: error.errorCode };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021" || error.code === "P2022") {
      return { issue: "missing-table-or-migration", prismaCode: error.code };
    }

    return { issue: "database-error", prismaCode: error.code };
  }

  return { issue: "database-error" };
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
