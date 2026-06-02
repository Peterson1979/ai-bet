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
    const consent = getConsent();

    const analytics = consent?.analytics ?? false;
    const ads = consent?.ads ?? false;

    window.dataLayer = window.dataLayer || [];

    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        window.dataLayer.push(args);
      };

    window.gtag("consent", "default", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: ads ? "granted" : "denied",
      ad_user_data: ads ? "granted" : "denied",
      ad_personalization: ads ? "granted" : "denied",
    });

    window.gtag("js", new Date());
    window.gtag("config", "G-XXXXXXXXXX");
  }, []);

  return null;
}