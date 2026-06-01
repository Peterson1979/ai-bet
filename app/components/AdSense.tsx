"use client";

import { useEffect } from "react";
import { getConsent } from "@/app/lib/consent";

export default function AdSense() {
  useEffect(() => {
    const consent = getConsent();

    if (!consent.ads) return;

    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.setAttribute("data-ad-client", "ca-pub-XXXXXXXXXXXX");

    document.body.appendChild(script);
  }, []);

  return null;
}