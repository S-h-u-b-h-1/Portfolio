const DEFAULT_RESUME_URL = "/resume/Shubhaang_Kataruka_Resume_PLACEHOLDER.html";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  apiBaseUrl: normalizeUrl(API_BASE_URL),
  resumeUrl: resolvePath(import.meta.env.VITE_RESUME_URL, DEFAULT_RESUME_URL),
  siteUrl: normalizeUrl(import.meta.env.VITE_SITE_URL)
};

export function getApiBaseUrl() {
  if (!frontendEnv.apiBaseUrl) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  return frontendEnv.apiBaseUrl;
}
