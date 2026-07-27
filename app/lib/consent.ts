export type ConsentState = {
  analytics: boolean;
  ads: boolean;
};

const KEY = "matchsignal_consent";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setConsent(state: ConsentState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}