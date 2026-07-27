"use client";

import { useState, useEffect } from "react";
import { getConsent, setConsent } from "@/app/lib/consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent() ?? {
      analytics: false,
      ads: false,
    };

    if (!consent.analytics && !consent.ads) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    setConsent({ analytics: true, ads: true });
    window.location.reload();
  };

  const rejectAll = () => {
    setConsent({ analytics: false, ads: false });
    window.location.reload();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] bg-[#0B1220] border-t border-cyan-400/30 p-4 text-white">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm text-slate-200">
          We use cookies for analytics (GA4) and advertising (Google AdSense).Google may use cookies to personalize ads and measure advertising performance.
        </p>

        <div className="flex gap-3">
          <button
            onClick={rejectAll}
            className="px-4 py-2 text-sm border border-slate-500 rounded-lg"
          >
            Reject
          </button>

          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm bg-cyan-500 text-black font-bold rounded-lg"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}