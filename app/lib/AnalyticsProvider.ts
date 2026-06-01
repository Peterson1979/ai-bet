"use client";
import { useEffect } from "react";
import { getConsent } from "@/app/lib/consent";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function AnalyticsProvider() {
  useEffect(() => {
    const consent = getConsent();

    // Google Consent Mode v2 default
    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        (window.dataLayer = window.dataLayer || []).push(args);
      };

    window.gtag("consent", "default", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.ads ? "granted" : "denied",
      ad_user_data: consent.ads ? "granted" : "denied",
      ad_personalization: consent.ads ? "granted" : "denied",
    });

    // GA4 init — cseréld le a saját GA4 ID-dre
    window.gtag("js", new Date());
    window.gtag("config", "G-XXXXXXXXXX");
  }, []);

  return null;
}
