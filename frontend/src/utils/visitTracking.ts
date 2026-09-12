import { frontendEnv } from "../config/env";

const VISITOR_ID_KEY = "portfolio-visitor-id";
const VISIT_SESSION_KEY = "portfolio-visit-session";

const VISIT_SESSION_TTL_MS = frontendEnv.visitSessionTtlMinutes * 60 * 1000;

const inMemoryStorage: {
  visitorId?: string;
  visitSession?: {
    id: string;
    lastRecordedAt: number;
  };
} = {};

type StoredVisitSession = {
  id: string;
  lastRecordedAt: number;
};

function safeGetItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage is unavailable or blocked.
  }
}

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getOrCreateVisitorId() {
  if (inMemoryStorage.visitorId) {
    return inMemoryStorage.visitorId;
  }

  const persistedVisitorId = safeGetItem(VISITOR_ID_KEY);

  if (persistedVisitorId && persistedVisitorId.length > 0) {
    inMemoryStorage.visitorId = persistedVisitorId;
    return persistedVisitorId;
  }

  const generatedId = createVisitorId();
  safeSetItem(VISITOR_ID_KEY, generatedId);
  inMemoryStorage.visitorId = generatedId;

  return generatedId;
}

function parseVisitSession(rawValue: string | null) {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredVisitSession | null;

    if (!parsed || typeof parsed !== "object" || typeof parsed.id !== "string" || parsed.id.length === 0) {
      return null;
    }

    if (typeof parsed.lastRecordedAt !== "number" || !Number.isFinite(parsed.lastRecordedAt)) {
      return null;
    }

    return {
      id: parsed.id,
      lastRecordedAt: parsed.lastRecordedAt
    };
  } catch {
    return null;
  }
}

export function getOrCreateVisitSession(state: { now: number } = { now: Date.now() }) {
  const now = state.now;

  if (inMemoryStorage.visitSession) {
    const isExpired = now - inMemoryStorage.visitSession.lastRecordedAt > VISIT_SESSION_TTL_MS;
    return {
      sessionId: inMemoryStorage.visitSession.id,
      shouldRecord: isExpired
    };
  }

  const persistedSession = parseVisitSession(safeGetItem(VISIT_SESSION_KEY));

  if (!persistedSession) {
    const newSession = {
      id: createVisitorId(),
      lastRecordedAt: 0
    };
    inMemoryStorage.visitSession = newSession;
    safeSetItem(VISIT_SESSION_KEY, JSON.stringify(newSession));

    return {
      sessionId: newSession.id,
      shouldRecord: true
    };
  }

  inMemoryStorage.visitSession = persistedSession;

  return {
    sessionId: persistedSession.id,
    shouldRecord: now - persistedSession.lastRecordedAt > VISIT_SESSION_TTL_MS
  };
}

export function markVisitRecorded(sessionId: string) {
  const now = Date.now();
  const currentSession = {
    id: sessionId,
    lastRecordedAt: now
  };

  inMemoryStorage.visitSession = currentSession;
  safeSetItem(VISIT_SESSION_KEY, JSON.stringify(currentSession));
}

function getSearchParam(param: string) {
  if (typeof window === "undefined") {
    return undefined;
  }

  return new URLSearchParams(window.location.search).get(param) ?? undefined;
}

function normalizeTrackedPath(path: string) {
  return path.split("#")[0].split("?")[0] || "/";
}

export function extractVisitContext(path: string) {
  return {
    path: normalizeTrackedPath(path),
    language: typeof navigator !== "undefined" ? navigator.language : undefined,
    timezone: (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch {
        return undefined;
      }
    })(),
    utmSource: getSearchParam("utm_source")?.slice(0, 64),
    utmMedium: getSearchParam("utm_medium")?.slice(0, 64),
    utmCampaign: getSearchParam("utm_campaign")?.slice(0, 64)
  };
}
