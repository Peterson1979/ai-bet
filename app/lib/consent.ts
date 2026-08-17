export type GoogleConsentStatus =
  | "GRANTED"
  | "DENIED"
  | "NOT_APPLICABLE"
  | "NOT_CONFIGURED"
  | "UNKNOWN";

export type GoogleConsentValues = {
  analyticsStorage: GoogleConsentStatus;
  adStorage: GoogleConsentStatus;
  adUserData: GoogleConsentStatus;
  adPersonalization: GoogleConsentStatus;
};

export type CustomConsentState = {
  analytics: boolean;
  ads: boolean;
  timestamp: number;
};

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    googlefc?: {
      callbackQueue?: any[];
      getGoogleConsentModeValues?: () => any;
      showRevocationMessage?: () => void;
    };
  }
}

const CUSTOM_CONSENT_KEY = "matchsignal_consent";

export function normalizeGoogleStatus(val: unknown): GoogleConsentStatus {
  if (val === "GRANTED" || val === 1 || val === "1") return "GRANTED";
  if (val === "DENIED" || val === 2 || val === "2") return "DENIED";
  if (val === "NOT_APPLICABLE" || val === 3 || val === "3") return "NOT_APPLICABLE";
  if (val === "NOT_CONFIGURED" || val === 4 || val === "4") return "NOT_CONFIGURED";
  return "UNKNOWN";
}

/**
 * Checks if Google CMP is NOT_APPLICABLE (non-EEA/UK/CH traffic).
 * Only in this case is the custom MatchSignal banner the active consent authority.
 */
export function isGoogleCmpNotApplicable(values?: GoogleConsentValues | null): boolean {
  if (!values) return false;
  return (
    values.analyticsStorage === "NOT_APPLICABLE" ||
    values.adStorage === "NOT_APPLICABLE"
  );
}

/**
 * Evaluates whether GA4 analytics collection is permitted.
 * - GRANTED: Allowed via Google CMP.
 * - DENIED: Blocked via Google CMP.
 * - NOT_CONFIGURED: Blocked (Configuration failure / Fail closed).
 * - UNKNOWN / null: Blocked (Waiting for consent resolution).
 * - NOT_APPLICABLE: Controlled by custom MatchSignal consent choice.
 */
export function isAnalyticsAllowed(googleValues?: GoogleConsentValues | null): boolean {
  if (typeof window === "undefined") return false;

  if (googleValues) {
    if (googleValues.analyticsStorage === "GRANTED") return true;
    if (googleValues.analyticsStorage === "DENIED") return false;
    if (googleValues.analyticsStorage === "NOT_CONFIGURED") return false;
    if (googleValues.analyticsStorage === "UNKNOWN") return false;
    if (googleValues.analyticsStorage === "NOT_APPLICABLE") {
      const custom = getCustomConsent();
      return custom?.analytics === true;
    }
  }

  // If Google CMP values are not yet received, fail closed
  return false;
}

export function getCustomConsent(): CustomConsentState | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(CUSTOM_CONSENT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.analytics === "boolean" && typeof parsed.ads === "boolean") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function hasCustomConsentChoice(): boolean {
  return getCustomConsent() !== null;
}

export function updateCustomConsent(state: { analytics: boolean; ads: boolean }): CustomConsentState {
  const newState: CustomConsentState = {
    analytics: Boolean(state.analytics),
    ads: Boolean(state.ads),
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOM_CONSENT_KEY, JSON.stringify(newState));

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: newState.analytics ? "granted" : "denied",
        ad_storage: newState.ads ? "granted" : "denied",
        ad_user_data: newState.ads ? "granted" : "denied",
        ad_personalization: newState.ads ? "granted" : "denied",
      });
    }

    window.dispatchEvent(
      new CustomEvent("matchsignal_consent_updated", { detail: newState })
    );
  }

  return newState;
}

export function initGoogleCmpListener(onUpdate: (values: GoogleConsentValues) => void) {
  if (typeof window === "undefined") return;

  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

  window.googlefc.callbackQueue.push({
    CONSENT_MODE_DATA_READY: () => {
      try {
        if (typeof window.googlefc?.getGoogleConsentModeValues === "function") {
          const raw = window.googlefc.getGoogleConsentModeValues();
          const parsed: GoogleConsentValues = {
            analyticsStorage: normalizeGoogleStatus(raw?.analyticsStoragePurposeConsentStatus),
            adStorage: normalizeGoogleStatus(raw?.adStoragePurposeConsentStatus),
            adUserData: normalizeGoogleStatus(raw?.adUserDataPurposeConsentStatus),
            adPersonalization: normalizeGoogleStatus(raw?.adPersonalizationPurposeConsentStatus),
          };
          onUpdate(parsed);
        }
      } catch (err) {
        console.warn("[consent] Error reading googlefc consent mode values:", err);
      }
    },
  });
}

export function triggerReopenConsent(googleValues?: GoogleConsentValues | null) {
  if (typeof window === "undefined") return;

  // If custom banner is the active authority (NOT_APPLICABLE), open custom UI
  if (isGoogleCmpNotApplicable(googleValues)) {
    window.dispatchEvent(new CustomEvent("matchsignal_open_consent"));
    return;
  }

  // If Google CMP is applicable / configured, use official callbackQueue revocation trigger
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

  if (typeof window.googlefc.showRevocationMessage === "function") {
    try {
      window.googlefc.showRevocationMessage();
      return;
    } catch {
      // Fallback
    }
  }

  window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
}