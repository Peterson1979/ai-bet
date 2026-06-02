"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/app/lib/consent";

export default function GDPRModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) setOpen(true);
  }, []);

  const acceptAll = () => {
    setConsent({ analytics: true, ads: true });
    setOpen(false);
  };

  const rejectAll = () => {
    setConsent({ analytics: false, ads: false });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center p-4">
      <div className="max-w-lg rounded-2xl bg-[#0B1220] border border-cyan-400/20 p-6 text-white">

        <h2 className="text-xl font-black">Privacy & Cookies</h2>

        <p className="mt-4 text-sm text-slate-200">
          We use cookies for analytics (GA4), advertising (AdSense) and newsletter tracking.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={rejectAll}
            className="w-full rounded-lg border border-slate-500 py-2 text-sm"
          >
            Reject
          </button>

          <button
            onClick={acceptAll}
            className="w-full rounded-lg bg-cyan-500/20 py-2 font-bold text-cyan-300"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}