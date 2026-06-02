"use client";

import { useEffect } from "react";
import { getConsent } from "@/app/lib/consent";

export default function AdSense() {
  useEffect(() => {
    const consent = getConsent();

    if (!consent?.ads) return;

    if (typeof window === "undefined") return;

    const existingScript = document.querySelector(
      'script[src*="adsbygoogle.js"]'
    );

    if (existingScript) return;

    const script = document.createElement("script");

    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

    script.async = true;

    script.setAttribute("data-ad-client", "ca-pub-XXXXXXXXXXXX");

    document.head.appendChild(script);
  }, []);

  return null;
}