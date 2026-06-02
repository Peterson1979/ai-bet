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
    const consent = getConsent() ?? {
      analytics: false,
      ads: false,
    };

    window.dataLayer = window.dataLayer || [];

    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        window.dataLayer.push(args);
      };

    window.gtag("consent", "default", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.ads ? "granted" : "denied",
      ad_user_data: consent.ads ? "granted" : "denied",
      ad_personalization: consent.ads ? "granted" : "denied",
    });

    window.gtag("js", new Date());
    window.gtag("config", "G-XXXXXXXXXX");
  }, []);

  return null;
}