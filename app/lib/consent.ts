// app/lib/consent.ts

import Cookies from "js-cookie";

export type ConsentState = {
  analytics: boolean;
  ads: boolean;
};

const COOKIE_NAME = "ai_tips_consent";

export function getConsent(): ConsentState {
  const raw = Cookies.get(COOKIE_NAME);

  if (!raw) {
    return { analytics: false, ads: false };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { analytics: false, ads: false };
  }
}

export function setConsent(state: ConsentState) {
  Cookies.set(COOKIE_NAME, JSON.stringify(state), {
    expires: 365,
    sameSite: "Lax",
  });
}