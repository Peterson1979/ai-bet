"use client";

import { useState, useEffect } from "react";
import {
  getCustomConsent,
  updateCustomConsent,
  hasCustomConsentChoice,
  initGoogleCmpListener,
  isGoogleCmpNotApplicable,
  GoogleConsentValues,
} from "@/app/lib/consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [googleValues, setGoogleValues] = useState<GoogleConsentValues | null>(null);

  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [adsAllowed, setAdsAllowed] = useState(false);

  useEffect(() => {
    // Listen to Google CMP status updates
    initGoogleCmpListener((vals: GoogleConsentValues) => {
      setGoogleValues(vals);

      // Only show custom banner if Google CMP is explicitly NOT_APPLICABLE and user hasn't made a choice
      if (isGoogleCmpNotApplicable(vals)) {
        if (!hasCustomConsentChoice()) {
          setVisible(true);
        }
      } else {
        // Hide custom banner for GRANTED, DENIED, NOT_CONFIGURED, and UNKNOWN
        setVisible(false);
        setShowCustomize(false);
      }
    });

    // Listen for manual request to reopen custom consent settings
    const handleOpen = () => {
      const current = getCustomConsent();
      if (current) {
        setAnalyticsAllowed(current.analytics);
        setAdsAllowed(current.ads);
      }
      setShowCustomize(true);
      setVisible(true);
    };

    window.addEventListener("matchsignal_open_consent", handleOpen);
    return () => {
      window.removeEventListener("matchsignal_open_consent", handleOpen);
    };
  }, []);

  // If banner is not visible or Google CMP is not NOT_APPLICABLE, render nothing
  if (!visible) return null;

  const handleAcceptAll = () => {
    updateCustomConsent({ analytics: true, ads: true });
    setVisible(false);
    setShowCustomize(false);
  };

  const handleRejectNonEssential = () => {
    updateCustomConsent({ analytics: false, ads: false });
    setVisible(false);
    setShowCustomize(false);
  };

  const handleSaveCustom = () => {
    updateCustomConsent({ analytics: analyticsAllowed, ads: adsAllowed });
    setVisible(false);
    setShowCustomize(false);
  };

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-0 left-0 right-0 z-[999] bg-[#070D18]/95 backdrop-blur-md border-t border-cyan-400/30 p-4 md:p-6 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
    >
      <div className="mx-auto max-w-5xl">
        {!showCustomize ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-xs md:text-sm text-slate-200 leading-relaxed space-y-1">
              <p className="font-bold text-white text-sm">Privacy &amp; Cookie Choices</p>
              <p className="text-slate-300">
                MatchSignal uses strictly necessary storage for site operations. We also use analytics (GA4) and advertising (Google AdSense) with your consent to measure traffic and deliver relevant experiences.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 border border-slate-600 rounded-xl hover:text-white hover:border-slate-400 transition"
              >
                Customize
              </button>

              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-xs font-bold text-slate-200 border border-cyan-500/40 bg-cyan-950/40 rounded-xl hover:bg-cyan-900/60 transition"
              >
                Necessary Only
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 text-xs font-black text-black bg-cyan-400 rounded-xl hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white">Customize Consent Preferences</h3>
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="rounded-xl border border-white/10 bg-[#050A14] p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">Necessary</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">Always Active</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Required for site navigation, security, and storing your consent preferences.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#050A14] p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">Analytics (GA4)</span>
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                  />
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Helps us measure site traffic, page views, and feature usage to improve performance.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#050A14] p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">Advertising (AdSense)</span>
                  <input
                    type="checkbox"
                    checked={adsAllowed}
                    onChange={(e) => setAdsAllowed(e.target.checked)}
                    className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                  />
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Enables advertising delivery through Google AdSense.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-xs font-semibold text-slate-300 border border-slate-600 rounded-xl hover:text-white transition"
              >
                Reject All Non-Essential
              </button>

              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2 text-xs font-black text-black bg-cyan-400 rounded-xl hover:bg-cyan-300 transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}