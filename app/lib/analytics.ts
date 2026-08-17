import { isAnalyticsAllowed } from "./consent";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AffiliateClickEventParams = {
  bookmaker_name: string;
  sport?: string;
  market?: string;
  placement?: string;
};

export function trackAffiliateClick(params: AffiliateClickEventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  if (!isAnalyticsAllowed()) return;

  // Never send full affiliate URLs, tracking tokens, user info, or PII
  window.gtag("event", "affiliate_click", {
    bookmaker: params.bookmaker_name,
    sport: params.sport || "general",
    market: params.market || "general",
    placement: params.placement || "matchcard",
  });
}

export function trackSportNavigation(sport: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  if (!isAnalyticsAllowed()) return;

  window.gtag("event", "sport_navigation", {
    sport,
  });
}
