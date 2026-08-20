"use client";

import { triggerReopenConsent } from "@/app/lib/consent";

export default function ManageCookieButton({ label = "Manage Cookie Preferences" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => triggerReopenConsent()}
      className="px-5 py-2.5 rounded-xl border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 transition cursor-pointer"
    >
      {label}
    </button>
  );
}
