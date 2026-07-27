"use client";

import { useEffect } from "react";
import { getConsent } from "@/app/lib/consent";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function AnalyticsProvider() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        window.dataLayer.push(args);
      };

    const consent = getConsent() ?? {
      analytics: false,
      ads: false,
    };

    // Google Consent Mode v2
    window.gtag("consent", "default", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.ads ? "granted" : "denied",
      ad_user_data: consent.ads ? "granted" : "denied",
      ad_personalization: consent.ads ? "granted" : "denied",
    });

    window.gtag("js", new Date());

  }, []);

  return null;
}