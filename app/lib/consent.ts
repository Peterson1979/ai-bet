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

export type ConsentAuthority = "pending" | "google" | "custom" | "blocked";

export type TcfState = {
  cmpStatus?: string;
  eventStatus?: string;
  displayStatus?: string;
  gdprApplies?: boolean;
  tcString?: string;
  listenerId?: number;
};

export type CustomConsentState = {
  analytics: boolean;
  ads: false;
  timestamp: number;
};

type TcfApiCallback = (data: Record<string, unknown>, success?: boolean) => void;
type GoogleFcCallback = Record<string, () => void>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    googlefc?: {
      callbackQueue?: GoogleFcCallback[];
      getGoogleConsentModeValues?: () => Record<string, unknown>;
      showRevocationMessage?: () => void;
    };
    __tcfapi?: (
      command: string,
      version: number,
      callback: TcfApiCallback,
      parameter?: number
    ) => void;
  }
}

const CUSTOM_CONSENT_KEY = "matchsignal_consent";
export const CMP_BOOTSTRAP_TIMEOUT_MS = 8000;

let currentAuthority: ConsentAuthority = "pending";
let currentGoogleValues: GoogleConsentValues | null = null;
let currentTcfState: TcfState | null = null;
let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
let orchestratorInitialized = false;
let tcfListenerRegistered = false;
let tcfListenerId: number | null = null;

export function normalizeGoogleStatus(value: unknown): GoogleConsentStatus {
  if (value === "GRANTED" || value === 1 || value === "1") return "GRANTED";
  if (value === "DENIED" || value === 2 || value === "2") return "DENIED";
  if (value === "NOT_APPLICABLE" || value === 3 || value === "3") return "NOT_APPLICABLE";
  if (value === "NOT_CONFIGURED" || value === 4 || value === "4") return "NOT_CONFIGURED";
  return "UNKNOWN";
}

export function getAuthority(): ConsentAuthority {
  return currentAuthority;
}

export function getGoogleValues(): GoogleConsentValues | null {
  return currentGoogleValues;
}

export function getTcfState(): TcfState | null {
  return currentTcfState;
}

export function isAnalyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;

  if (currentAuthority === "google") {
    return currentGoogleValues?.analyticsStorage === "GRANTED";
  }

  if (currentAuthority === "custom") {
    return getCustomConsent()?.analytics === true;
  }

  return false;
}

export function getCustomConsent(): CustomConsentState | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(CUSTOM_CONSENT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.analytics !== "boolean") return null;
    return {
      analytics: parsed.analytics,
      ads: false,
      timestamp: typeof parsed.timestamp === "number" ? parsed.timestamp : Date.now(),
    };
  } catch {
    return null;
  }
}

export function hasCustomConsentChoice(): boolean {
  return getCustomConsent() !== null;
}

function notifyState() {
  window.dispatchEvent(
    new CustomEvent("matchsignal_authority_updated", {
      detail: {
        authority: currentAuthority,
        googleValues: currentGoogleValues,
        tcfState: currentTcfState,
      },
    })
  );
}

function updateConsentModeFromCustomChoice() {
  if (typeof window.gtag !== "function") return;
  const analytics = getCustomConsent()?.analytics === true;
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function setAuthority(authority: ConsentAuthority, googleValues?: GoogleConsentValues | null) {
  currentAuthority = authority;
  if (googleValues !== undefined) currentGoogleValues = googleValues;

  if (authority === "custom") updateConsentModeFromCustomChoice();
  notifyState();
}

function clearFallbackTimer() {
  if (!fallbackTimer) return;
  clearTimeout(fallbackTimer);
  fallbackTimer = null;
}

function tcfHasVisibleUiOrDecision(state: TcfState): boolean {
  if (state.displayStatus === "visible" || state.eventStatus === "cmpuishown") return true;
  return (
    (state.eventStatus === "tcloaded" || state.eventStatus === "useractioncomplete") &&
    typeof state.tcString === "string" &&
    state.tcString.length > 0
  );
}

function readTcfState(data: Record<string, unknown>): TcfState {
  return {
    cmpStatus: typeof data.cmpStatus === "string" ? data.cmpStatus : undefined,
    eventStatus: typeof data.eventStatus === "string" ? data.eventStatus : undefined,
    displayStatus: typeof data.displayStatus === "string" ? data.displayStatus : undefined,
    gdprApplies: typeof data.gdprApplies === "boolean" ? data.gdprApplies : undefined,
    tcString: typeof data.tcString === "string" ? data.tcString : undefined,
    listenerId: typeof data.listenerId === "number" ? data.listenerId : undefined,
  };
}

function handleTcfUpdate(data: Record<string, unknown>, success?: boolean) {
  if (success === false) return;

  const state = readTcfState(data);
  currentTcfState = state;
  if (typeof state.listenerId === "number") tcfListenerId = state.listenerId;

  if (state.gdprApplies === false && state.cmpStatus === "loaded") {
    clearFallbackTimer();
    setAuthority("custom", currentGoogleValues);
    return;
  }

  if (state.gdprApplies === true) {
    if (state.cmpStatus === "error") {
      clearFallbackTimer();
      setAuthority("blocked", currentGoogleValues);
      return;
    }

    if (state.cmpStatus === "loaded" && tcfHasVisibleUiOrDecision(state)) {
      clearFallbackTimer();
      setAuthority("google", readGoogleConsentModeValues() ?? currentGoogleValues);
      return;
    }
  }

  notifyState();
}

function parseGoogleConsentValues(raw: Record<string, unknown>): GoogleConsentValues {
  return {
    analyticsStorage: normalizeGoogleStatus(raw.analyticsStoragePurposeConsentStatus),
    adStorage: normalizeGoogleStatus(raw.adStoragePurposeConsentStatus),
    adUserData: normalizeGoogleStatus(raw.adUserDataPurposeConsentStatus),
    adPersonalization: normalizeGoogleStatus(raw.adPersonalizationPurposeConsentStatus),
  };
}

function readGoogleConsentModeValues(): GoogleConsentValues | null {
  if (typeof window.googlefc?.getGoogleConsentModeValues !== "function") return null;
  return parseGoogleConsentValues(window.googlefc.getGoogleConsentModeValues());
}

function hasGooglePurposeDecision(values: GoogleConsentValues): boolean {
  return Object.values(values).some((value) => value === "GRANTED" || value === "DENIED");
}

function consentModeIsNotApplicable(values: GoogleConsentValues): boolean {
  const statuses = Object.values(values);
  return statuses.includes("NOT_APPLICABLE") && statuses.every(
    (value) => value === "NOT_APPLICABLE" || value === "NOT_CONFIGURED"
  );
}

function registerTcfListener() {
  if (tcfListenerRegistered || typeof window.__tcfapi !== "function") return;
  tcfListenerRegistered = true;

  // The CMP API major version remains 2; Google's CMP reports apiVersion 2.3.
  window.__tcfapi("addEventListener", 2, handleTcfUpdate);

  window.addEventListener("pagehide", () => {
    if (tcfListenerId === null || typeof window.__tcfapi !== "function") return;
    window.__tcfapi("removeEventListener", 2, () => {}, tcfListenerId);
    tcfListenerId = null;
    tcfListenerRegistered = false;
  }, { once: true });
}

function startFallbackTimer() {
  clearFallbackTimer();
  fallbackTimer = setTimeout(() => {
    if (currentAuthority !== "pending") return;

    if (typeof window.__tcfapi !== "function") {
      setAuthority("custom", currentGoogleValues);
      return;
    }

    let answered = false;
    window.__tcfapi("ping", 2, (data) => {
      if (answered || currentAuthority !== "pending") return;
      answered = true;
      const state = readTcfState(data);
      currentTcfState = { ...currentTcfState, ...state };

      if (state.gdprApplies === false) {
        setAuthority("custom", currentGoogleValues);
      } else if (state.gdprApplies === true || data.cmpLoaded === true) {
        // An applicable or loaded TCF CMP without a visible UI/decision fails closed.
        setAuthority("blocked", currentGoogleValues);
      } else {
        setAuthority("custom", currentGoogleValues);
      }
    });
  }, CMP_BOOTSTRAP_TIMEOUT_MS);
}

export function updateCustomConsent(state: { analytics: boolean }): CustomConsentState {
  const next: CustomConsentState = {
    analytics: Boolean(state.analytics),
    ads: false,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(CUSTOM_CONSENT_KEY, JSON.stringify(next));
    if (currentAuthority === "custom") updateConsentModeFromCustomChoice();
    window.dispatchEvent(new CustomEvent("matchsignal_consent_updated", { detail: next }));
  }

  return next;
}

export function initConsentOrchestrator(
  onStateChange?: () => void,
  options: { googleCmpEnabled?: boolean } = {}
): () => void {
  if (typeof window === "undefined") return () => {};

  const googleCmpEnabled = options.googleCmpEnabled !== false;
  if (!googleCmpEnabled) {
    setAuthority("custom", null);
  } else if (!orchestratorInitialized) {
    orchestratorInitialized = true;
    if (currentAuthority === "custom" && currentGoogleValues === null && currentTcfState === null) {
      currentAuthority = "pending";
    }
    startFallbackTimer();

    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: registerTcfListener,
    });
    window.googlefc.callbackQueue.push({
      CONSENT_MODE_DATA_READY: () => {
        try {
          const values = readGoogleConsentModeValues();
          if (!values) return;
          currentGoogleValues = values;

          if (hasGooglePurposeDecision(values)) {
            clearFallbackTimer();
            setAuthority("google", values);
          } else if (consentModeIsNotApplicable(values) && currentTcfState?.gdprApplies !== true) {
            clearFallbackTimer();
            setAuthority("custom", values);
          } else {
            notifyState();
          }
        } catch (error) {
          console.warn("[consent] Unable to read Google Consent Mode values:", error);
        }
      },
    });
  }

  const handleUpdate = () => onStateChange?.();
  window.addEventListener("matchsignal_authority_updated", handleUpdate);
  window.addEventListener("matchsignal_consent_updated", handleUpdate);
  onStateChange?.();

  return () => {
    window.removeEventListener("matchsignal_authority_updated", handleUpdate);
    window.removeEventListener("matchsignal_consent_updated", handleUpdate);
  };
}

export function triggerReopenConsent() {
  if (typeof window === "undefined") return;

  const googleControlsApply =
    currentAuthority === "google" ||
    currentAuthority === "blocked" ||
    currentTcfState?.gdprApplies === true;

  if (googleControlsApply) {
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push({
      CONSENT_API_READY: () => {
        try {
          window.googlefc?.showRevocationMessage?.();
        } catch (error) {
          console.warn("[consent] Unable to open Google privacy settings:", error);
        }
      },
    });
    return;
  }

  window.dispatchEvent(new CustomEvent("matchsignal_open_consent"));
}
