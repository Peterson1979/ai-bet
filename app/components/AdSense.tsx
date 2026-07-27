"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent } from "@/app/lib/consent";

export default function AdSense() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    setAllowed(!!consent?.ads);
  }, []);

  if (!allowed) return null;

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7714565858088235"
      crossOrigin="anonymous"
    />
  );
}