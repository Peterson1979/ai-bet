"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Lang } from "@/app/lib/i18n";
import { PRIVACY_COPY } from "@/app/lib/localizedUiCopy";
import {
  getCustomConsent,
  updateCustomConsent,
  hasCustomConsentChoice,
  getAuthority,
  initConsentOrchestrator,
} from "@/app/lib/consent";

export default function CookieBanner() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "en";
  const copy = PRIVACY_COPY[lang] ?? PRIVACY_COPY.en;
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const auth = getAuthority();
      if (auth === "custom") {
        if (!hasCustomConsentChoice()) {
          setVisible(true);
        } else {
          setVisible(false);
          setShowCustomize(false);
        }
      } else if (auth === "google") {
        setVisible(false);
        setShowCustomize(false);
      } else {
        // Pending
        setVisible(false);
      }
    };

    updateVisibility();
    const cleanup = initConsentOrchestrator(updateVisibility);

    // Listen for manual request to reopen custom consent settings
    const handleOpen = () => {
      const current = getCustomConsent();
      if (current) {
        setAnalyticsAllowed(current.analytics);
      }
      setShowCustomize(true);
      setVisible(true);
    };

    window.addEventListener("matchsignal_open_consent", handleOpen);
    return () => {
      cleanup();
      window.removeEventListener("matchsignal_open_consent", handleOpen);
    };
  }, []);

  if (!visible) return null;

  const handleAllowAnalytics = () => {
    updateCustomConsent({ analytics: true });
    setVisible(false);
    setShowCustomize(false);
  };

  const handleNecessaryOnly = () => {
    updateCustomConsent({ analytics: false });
    setVisible(false);
    setShowCustomize(false);
  };

  const handleSaveCustom = () => {
    updateCustomConsent({ analytics: analyticsAllowed });
    setVisible(false);
    setShowCustomize(false);
  };

  return (
    <aside
      aria-label={copy.ariaLabel}
      className="fixed bottom-0 left-0 right-0 z-[999] bg-[#070D18]/95 backdrop-blur-md border-t border-cyan-400/30 p-4 md:p-6 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
    >
      <div className="mx-auto max-w-5xl">
        {!showCustomize ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-xs md:text-sm text-slate-200 leading-relaxed space-y-1">
              <p className="font-bold text-white text-sm">{copy.title}</p>
              <p className="text-slate-300">{copy.intro}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 border border-slate-600 rounded-xl hover:text-white hover:border-slate-400 transition"
              >{copy.customize}</button>

              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="px-4 py-2 text-xs font-bold text-slate-200 border border-cyan-500/40 bg-cyan-950/40 rounded-xl hover:bg-cyan-900/60 transition"
              >{copy.necessaryOnly}</button>

              <button
                type="button"
                onClick={handleAllowAnalytics}
                className="px-5 py-2 text-xs font-black text-black bg-cyan-400 rounded-xl hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20"
              >{copy.allowAnalytics}</button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white">{copy.customizeTitle}</h3>
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                × {copy.close}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="rounded-xl border border-white/10 bg-[#050A14] p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">{copy.necessary}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">{copy.alwaysActive}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {copy.necessaryDesc}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#050A14] p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">{copy.analytics}</span>
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                  />
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {copy.analyticsDesc}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#050A14] p-3.5 opacity-75">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">{copy.advertising}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">{copy.googleCmp}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {copy.advertisingDesc}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="px-4 py-2 text-xs font-semibold text-slate-300 border border-slate-600 rounded-xl hover:text-white transition"
              >{copy.necessaryOnly}</button>

              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2 text-xs font-black text-black bg-cyan-400 rounded-xl hover:bg-cyan-300 transition"
              >{copy.savePreferences}</button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}