// app/components/Footer.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const LEGAL_LINKS = [
  { href: "/legal/privacy-policy",       label: "Privacy Policy"       },
  { href: "/legal/terms-of-use",         label: "Terms of Use"         },
  { href: "/legal/affiliate-disclosure", label: "Affiliate Disclosure" },
  { href: "/legal/responsible-gambling", label: "Responsible Gambling" },
  { href: "/legal/cookie-policy",        label: "Cookie Policy"        },
  { href: "/legal/ai-disclaimer",        label: "AI Disclaimer"        },
  { href: "/legal/earnings-disclaimer",  label: "Earnings Disclaimer"  },
  { href: "/legal/contact",              label: "Contact"              },
];

const METRICS = [
  {
    title: "AI Edge",
    short: "Difference between bookmaker and AI probability.",
    full: "The edge represents the difference between the implied bookmaker probability and the estimated AI probability. A positive edge (e.g. +8%) suggests the bookmaker may be undervaluing the outcome, potentially indicating a value bet opportunity.",
  },
  {
    title: "Confidence",
    short: "AI confidence score from 0–100.",
    full: "The confidence score (0–100) reflects how strongly the AI model believes in its prediction based on statistical signals, historical match data, form analysis and market movements. Scores above 70 indicate high conviction picks.",
  },
  {
    title: "Implied Probability",
    short: "Probability derived from bookmaker odds.",
    full: "Implied probability converts bookmaker decimal odds into a percentage. For example, odds of 2.00 imply a 50% chance. When the AI's estimated probability exceeds this, a positive edge exists. Always compare implied probability across multiple bookmakers.",
  },
  {
    title: "Risk",
    short: "Volatility and uncertainty level (1–100).",
    full: "Risk score (1–100) estimates the volatility and uncertainty of the prediction. Low risk (under 35) indicates stable, predictable conditions. High risk (above 65) means greater uncertainty — these picks may offer higher odds but lower reliability.",
  },
];

function MetricsAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {METRICS.map((m, i) => (
        <div
          key={m.title}
          className="rounded-2xl border border-cyan-400/10 bg-[#0F172A] overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-sm font-black text-cyan-300">{m.title}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:block">{m.short}</span>
              <span className="text-cyan-400 text-lg">{open === i ? "−" : "+"}</span>
            </div>
          </button>
          {open === i && (
            <div className="px-5 pb-4">
              <p className="text-sm leading-6 text-slate-300">{m.full}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">

      {/* METRICS ACCORDION */}
      <div className="border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1500px] px-4 py-14 md:px-6">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-white">
              Betting Metrics Explained
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Understanding AI betting metrics helps evaluate prediction quality and value opportunities.
            </p>
          </div>
          <MetricsAccordion />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-6">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <h4 className="text-lg font-black text-white">AI Betting Insights</h4>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              AI-generated sports betting analysis for informational purposes only.
              No guarantee of winnings. Gamble responsibly. 18+
            </p>
          </div>

          {/* LEGAL LINKS */}
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[#1E293B] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-slate-500">
            © {new Date().getFullYear()} AI Betting Platform. All rights reserved.
          </p>
          <p className="text-[12px] text-slate-500">
            For entertainment purposes only · 18+ · Gamble Responsibly
          </p>
        </div>

      </div>
    </footer>
  );
}
