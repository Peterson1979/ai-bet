"use client";

import { useEffect, useState } from "react";

const KEY = "ai_tips_gdpr_seen";

export default function GDPRModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(KEY);
    if (!seen) setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem(KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 flex items-center justify-center p-4">
      <div className="max-w-lg rounded-2xl bg-[#0B1220] border border-cyan-400/20 p-6 text-white">

        <h2 className="text-xl font-black">GDPR Notice</h2>

        <p className="mt-4 text-sm text-slate-200">
          We process limited data (analytics, cookies, email newsletter). You can opt out at any time.
        </p>

        <button
          onClick={close}
          className="mt-6 w-full rounded-lg bg-cyan-500/20 py-2 font-bold text-cyan-300"
        >
          I Understand
        </button>

      </div>
    </div>
  );
}