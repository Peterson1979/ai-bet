"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  isAnalyticsAllowed,
  initConsentOrchestrator,
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
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Initial check (always false on mount while authority is pending)
    setAllowed(isAnalyticsAllowed());

    // Register orchestrator listener to update allowed state when authority or consent updates
    const cleanup = initConsentOrchestrator(() => {
      setAllowed(isAnalyticsAllowed());
    });

    return cleanup;
  }, []);

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
