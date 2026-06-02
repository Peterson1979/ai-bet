"use client";

import { useState, useEffect } from "react";
import { getConsent, setConsent } from "@/app/lib/consent";

export default function AnalyticsToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) return;

    setEnabled(consent.analytics);
  }, []);

  const toggle = () => {
    const current = getConsent();

    const newState = !enabled;

    setConsent({
      analytics: newState,
      ads: current?.ads ?? false,
    });

    setEnabled(newState);
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      className="text-xs text-cyan-300 underline"
    >
      Analytics: {enabled ? "ON" : "OFF"}
    </button>
  );
}