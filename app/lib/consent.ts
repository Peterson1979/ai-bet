export type ConsentState = {
  analytics: boolean;
  ads: boolean;
};

const KEY = "ai_tips_consent";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setConsent(state: ConsentState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}