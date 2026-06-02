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

    const analyticsGranted = consent?.analytics ?? false;
    const adsGranted = consent?.ads ?? false;

    window.dataLayer = window.dataLayer || [];

    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };

    window.gtag("consent", "default", {
      analytics_storage: analyticsGranted ? "granted" : "denied",
      ad_storage: adsGranted ? "granted" : "denied",
      ad_user_data: adsGranted ? "granted" : "denied",
      ad_personalization: adsGranted ? "granted" : "denied",
    });

    window.gtag("js", new Date());

    window.gtag("config", "G-XXXXXXXXXX");
  }, []);

  return null;
}
