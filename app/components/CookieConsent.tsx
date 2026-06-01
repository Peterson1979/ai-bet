"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "ai_tips_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] bg-[#0B1220] border-t border-cyan-400/20 p-4 text-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">

        <p className="text-sm text-slate-200">
          We use cookies for analytics (Google Analytics) and advertising (Google AdSense).
        </p>

        <div className="flex gap-3">
          <button onClick={decline} className="px-4 py-2 text-sm border rounded-lg">
            Decline
          </button>

          <button onClick={accept} className="px-4 py-2 text-sm font-bold text-cyan-300">
            Accept
          </button>
        </div>

      </div>
    </div>
  );
}