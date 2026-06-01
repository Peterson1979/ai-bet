"use client";

import { useEffect } from "react";
import { getConsent } from "@/app/lib/consent";

export default function AnalyticsProvider() {
  useEffect(() => {
    const consent = getConsent();

    // Google Consent Mode v2 default
    window.gtag =
      window.gtag ||
      function () {
        // @ts-ignore
        (window.dataLayer = window.dataLayer || []).push(arguments);
      };

    window.gtag("consent", "default", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.ads ? "granted" : "denied",
      ad_user_data: consent.ads ? "granted" : "denied",
      ad_personalization: consent.ads ? "granted" : "denied",
    });

    // GA4 init (replace ID)
    window.gtag("js", new Date());
    window.gtag("config", "G-XXXXXXXXXX");
  }, []);

  return null;
}