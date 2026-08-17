"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  isAnalyticsAllowed,
  initGoogleCmpListener,
  GoogleConsentValues,
} from "@/app/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function GA4PageViewTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!enabled || !GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;

    const queryString = searchParams?.toString();
    const url = pathname + (queryString ? `?${queryString}` : "");

    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams, enabled]);

  return null;
}

export default function GoogleAnalytics() {
  const [googleValues, setGoogleValues] = useState<GoogleConsentValues | null>(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(isAnalyticsAllowed(googleValues));

    // Register Google CMP listener for Funding Choices / Privacy & Messaging
    initGoogleCmpListener((vals) => {
      setGoogleValues(vals);
      setAllowed(isAnalyticsAllowed(vals));
    });

    // Register listener for custom consent updates
    const handleCustomUpdate = () => {
      setAllowed(isAnalyticsAllowed(googleValues));
    };

    window.addEventListener("matchsignal_consent_updated", handleCustomUpdate);
    return () => {
      window.removeEventListener("matchsignal_consent_updated", handleCustomUpdate);
    };
  }, [googleValues]);

  // Basic Mode: Do NOT load or initialize GA4 script until analytics permission is granted
  if (!GA_ID || !allowed) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              send_page_view: false
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GA4PageViewTracker enabled={allowed} />
      </Suspense>
    </>
  );
}
