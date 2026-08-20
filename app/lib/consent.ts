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

export type ConsentAuthority = "pending" | "google" | "custom";

export type CustomConsentState = {
  analytics: boolean;
  ads: false;
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
    __tcfapi?: (
      command: string,
      version: number,
      callback: (tcData: any, success: boolean) => void
    ) => void;
  }
}

const CUSTOM_CONSENT_KEY = "matchsignal_consent";
export const FALLBACK_TIMEOUT_MS = 2800;

let currentAuthority: ConsentAuthority = "pending";
let currentGoogleValues: GoogleConsentValues | null = null;
let fallbackTimer: NodeJS.Timeout | null = null;
let orchestratorInitialized = false;

export function normalizeGoogleStatus(val: unknown): GoogleConsentStatus {
  if (val === "GRANTED" || val === 1 || val === "1") return "GRANTED";
  if (val === "DENIED" || val === 2 || val === "2") return "DENIED";
  if (val === "NOT_APPLICABLE" || val === 3 || val === "3") return "NOT_APPLICABLE";
  if (val === "NOT_CONFIGURED" || val === 4 || val === "4") return "NOT_CONFIGURED";
  return "UNKNOWN";
}

export function getAuthority(): ConsentAuthority {
  return currentAuthority;
}

export function getGoogleValues(): GoogleConsentValues | null {
  return currentGoogleValues;
}

export function isGoogleAnalyticsAuthoritative(values?: GoogleConsentValues | null): boolean {
  if (!values) return false;
  return values.analyticsStorage === "GRANTED" || values.analyticsStorage === "DENIED";
}

export function isGoogleAnalyticsNotApplicable(values?: GoogleConsentValues | null): boolean {
  if (!values) return false;
  return values.analyticsStorage === "NOT_APPLICABLE";
}

/**
 * Checks if GA4 analytics collection is permitted based on active authority:
 * - "google": governed strictly by Google CMP analyticsStorage === "GRANTED"
 * - "custom": governed by custom MatchSignal analytics choice (localStorage)
 * - "pending": ALWAYS false (GA4 blocked on fresh page load)
 */
export function isAnalyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;

  if (currentAuthority === "google") {
    return currentGoogleValues?.analyticsStorage === "GRANTED";
  }

  if (currentAuthority === "custom") {
    const custom = getCustomConsent();
    return custom?.analytics === true;
  }

  return false;
}

export function getCustomConsent(): CustomConsentState | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(CUSTOM_CONSENT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.analytics === "boolean") {
      return {
        analytics: Boolean(parsed.analytics),
        ads: false, // Custom fallback NEVER grants advertising consent
        timestamp: typeof parsed.timestamp === "number" ? parsed.timestamp : Date.now(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function hasCustomConsentChoice(): boolean {
  return getCustomConsent() !== null;
}

export function setAuthority(authority: ConsentAuthority, googleVals?: GoogleConsentValues | null) {
  currentAuthority = authority;
  if (googleVals !== undefined) {
    currentGoogleValues = googleVals;
  }

  if (typeof window !== "undefined") {
    // If switching to custom authority with stored analytics=true, issue Consent Mode update
    if (authority === "custom") {
      const custom = getCustomConsent();
      if (custom?.analytics === true && typeof window.gtag === "function") {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }
    }

    window.dispatchEvent(
      new CustomEvent("matchsignal_authority_updated", {
        detail: { authority: currentAuthority, googleValues: currentGoogleValues },
      })
    );
  }
}

/**
 * Updates custom analytics consent.
 * MUST ALWAYS force ad_storage, ad_user_data, and ad_personalization to denied.
 */
export function updateCustomConsent(state: { analytics: boolean }): CustomConsentState {
  const newState: CustomConsentState = {
    analytics: Boolean(state.analytics),
    ads: false,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOM_CONSENT_KEY, JSON.stringify(newState));

    if (currentAuthority === "custom" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: newState.analytics ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    window.dispatchEvent(
      new CustomEvent("matchsignal_consent_updated", { detail: newState })
    );
  }

  return newState;
}

/**
 * Orchestrates Google CMP listener and fallback timeout for the page lifecycle.
 */
export function initConsentOrchestrator(onStateChange?: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (!orchestratorInitialized) {
    orchestratorInitialized = true;

    const clearFallbackTimer = () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
    };

    const startFallbackTimer = () => {
      clearFallbackTimer();
      if (currentAuthority !== "pending") return;

      fallbackTimer = setTimeout(() => {
        if (currentAuthority === "pending") {
          setAuthority("custom", currentGoogleValues);
        }
      }, FALLBACK_TIMEOUT_MS);
    };

    startFallbackTimer();

    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: () => {
        // The Google CMP framework API is available before consent data exists.
        // Use TCF gdprApplies to decide which UI owns consent for this visitor.
        clearFallbackTimer();

        if (typeof window.__tcfapi !== "function") {
          startFallbackTimer();
          return;
        }

        window.__tcfapi("addEventListener", 0, (tcData, success) => {
          if (!success || !tcData) {
            startFallbackTimer();
            return;
          }

          if (tcData.gdprApplies === true) {
            clearFallbackTimer();
            setAuthority("google", currentGoogleValues);
          } else if (tcData.gdprApplies === false) {
            clearFallbackTimer();
            setAuthority("custom", currentGoogleValues);
          }
        });
      },

      CONSENT_MODE_DATA_READY: () => {
        try {
          if (typeof window.googlefc?.getGoogleConsentModeValues !== "function") {
            return;
          }

          const raw = window.googlefc.getGoogleConsentModeValues();
          const parsed: GoogleConsentValues = {
            analyticsStorage: normalizeGoogleStatus(raw?.analyticsStoragePurposeConsentStatus),
            adStorage: normalizeGoogleStatus(raw?.adStoragePurposeConsentStatus),
            adUserData: normalizeGoogleStatus(raw?.adUserDataPurposeConsentStatus),
            adPersonalization: normalizeGoogleStatus(raw?.adPersonalizationPurposeConsentStatus),
          };

          currentGoogleValues = parsed;

          if (isGoogleAnalyticsAuthoritative(parsed)) {
            clearFallbackTimer();
            setAuthority("google", parsed);
          } else if (isGoogleAnalyticsNotApplicable(parsed)) {
            clearFallbackTimer();
            setAuthority("custom", parsed);
          } else if (currentAuthority === "google") {
            // Keep Google authoritative while consent is still being resolved.
            setAuthority("google", parsed);
          }
        } catch (err) {
          console.warn("[consent] Error handling CONSENT_MODE_DATA_READY:", err);
        }
      },
    });
  }

  const handleUpdate = () => {
    if (onStateChange) onStateChange();
  };

  window.addEventListener("matchsignal_authority_updated", handleUpdate);
  window.addEventListener("matchsignal_consent_updated", handleUpdate);

  return () => {
    window.removeEventListener("matchsignal_authority_updated", handleUpdate);
    window.removeEventListener("matchsignal_consent_updated", handleUpdate);
  };
}

export function triggerReopenConsent() {
  if (typeof window === "undefined") return;

  // If Google CMP is active / authoritative for analytics or ads, use Google revocation
  if (currentAuthority === "google") {
    if (typeof window.googlefc?.showRevocationMessage === "function") {
      try {
        window.googlefc.showRevocationMessage();
        return;
      } catch (err) {
        console.warn("[consent] Error invoking showRevocationMessage:", err);
      }
    } else {
      window.googlefc = window.googlefc || {};
      window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
      window.googlefc.callbackQueue.push({
        CONSENT_DATA_READY: () => {
          if (typeof window.googlefc?.showRevocationMessage === "function") {
            window.googlefc.showRevocationMessage();
          }
        },
      });
      return;
    }
  }

  // Otherwise, reopen custom analytics fallback UI
  window.dispatchEvent(new CustomEvent("matchsignal_open_consent"));
}