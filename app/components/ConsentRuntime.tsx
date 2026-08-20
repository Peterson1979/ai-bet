"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CookieBanner from "@/app/components/CookieBanner";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { isConsentFreePolicyPath } from "@/app/lib/consentRoutes";
import { ADSENSE_SCRIPT_ID, ADSENSE_SCRIPT_SRC } from "@/app/lib/googleConfig";

declare global {
  interface Window {
    __matchsignalConsentDefaultsInitialized?: boolean;
  }
}

function enableGoogleBootstrapAfterPolicyNavigation() {
  if (!window.__matchsignalConsentDefaultsInitialized) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    window.__matchsignalConsentDefaultsInitialized = true;
  }

  if (!document.getElementById(ADSENSE_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = ADSENSE_SCRIPT_SRC;
    document.head.appendChild(script);
  }
}

export default function ConsentRuntime({
  initialGoogleServicesEnabled,
}: {
  initialGoogleServicesEnabled: boolean;
}) {
  const pathname = usePathname();
  const routeEnablesGoogle = !isConsentFreePolicyPath(pathname);
  const [googleServicesEnabled, setGoogleServicesEnabled] = useState(initialGoogleServicesEnabled);

  useEffect(() => {
    if (!routeEnablesGoogle || googleServicesEnabled) return;
    enableGoogleBootstrapAfterPolicyNavigation();
    setGoogleServicesEnabled(true);
  }, [googleServicesEnabled, routeEnablesGoogle]);

  return (
    <>
      {googleServicesEnabled ? <GoogleAnalytics /> : null}
      <CookieBanner googleCmpEnabled={googleServicesEnabled} />
    </>
  );
}
