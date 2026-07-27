"use client";

import Script from "next/script";

export default function AdSense() {
  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7714565858088235"
      crossOrigin="anonymous"
    />
  );
}