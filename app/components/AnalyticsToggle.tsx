"use client";

import { useState, useEffect } from "react";
import { getConsent, setConsent } from "@/app/lib/consent";

export default function AnalyticsToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    setEnabled(consent.analytics);
  }, []);

  const toggle = () => {
    const newState = !enabled;

    setConsent({
      analytics: newState,
      ads: getConsent().ads,
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