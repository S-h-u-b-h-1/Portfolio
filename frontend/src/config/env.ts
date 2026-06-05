const DEFAULT_RESUME_URL = "/resume/Shubhaang_Kataruka_Resume_PLACEHOLDER.html";
const DEFAULT_API_BASE_URL = "http://localhost:5001";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (typeof window !== "undefined" ? window.location.origin : "");

function normalizeUrl(value: string | undefined) {
  return value?.trim().replace(/\/+$/, "") ?? "";
}

function resolvePath(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

export function isPlaceholderValue(value: string | undefined) {
  if (!value) {
    return true;
  }

  const normalizedValue = value.trim().toLowerCase();
  return normalizedValue.startsWith("todo") || normalizedValue.includes("placeholder");
}

export const frontendEnv = {
  apiBaseUrl: normalizeUrl(API_BASE_URL) || DEFAULT_API_BASE_URL,
  resumeUrl: resolvePath(import.meta.env.VITE_RESUME_URL, DEFAULT_RESUME_URL),
  siteUrl: normalizeUrl(import.meta.env.VITE_SITE_URL)
};

export function getApiBaseUrl() {
  return frontendEnv.apiBaseUrl;
}

export function getApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();

  if (baseUrl.endsWith("/api") && normalizedPath.startsWith("/api/")) {
    return `${baseUrl}${normalizedPath.replace(/^\/api/, "")}`;
  }

  return `${baseUrl}${normalizedPath}`;
}
