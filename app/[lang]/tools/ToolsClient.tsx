"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PartnerSportsbooksList from "@/app/components/PartnerSportsbooksList";
import { translations, Lang } from "@/app/lib/i18n";

// ========================
// ODDS CONVERTER
// ========================
function OddsConverter({ t }: { t: any }) {
  const [decimal, setDecimal] = useState("");

  function gcd(a: number, b: number): number {
    if (!b) return a;
    return gcd(b, a % b);
  }

  const toFractional = (d: number) => {
    const denom = 100;
    const num = Math.round((d - 1) * denom);
    const g = gcd(num, denom) || 1;
    return `${num / g}/${denom / g}`;
  };

  const toAmerican = (d: number) =>
    d >= 2 ? `+${Math.round((d - 1) * 100)}` : `${Math.round(-100 / (d - 1))}`;

  const toImplied = (d: number) => `${(100 / d).toFixed(1)}%`;

  const d = parseFloat(decimal);
  const valid = !isNaN(d) && d > 1;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <h2 className="text-xl font-black text-white mb-2">{t.tools.oddsConverter}</h2>
      <p className="text-sm text-slate-400 mb-6">{t.tools.oddsConverterDesc}</p>

      <input
        type="number"
        value={decimal}
        onChange={(e) => setDecimal(e.target.value)}
        placeholder="2.50"
        className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
      />

      {valid && (
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: t.tools.fractional, value: toFractional(d) },
            { label: t.tools.american, value: toAmerican(d) },
            { label: t.tools.implied, value: toImplied(d) },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center">
              <div className="text-[10px] text-slate-400">{item.label}</div>
              <div className="text-xl font-black text-cyan-300 mt-2">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ========================
// BET CALCULATOR
// ========================
function BetCalculator({ t }: { t: any }) {
  const [stake, setStake] = useState("");
  const [odds, setOdds] = useState("");

  const s = parseFloat(stake);
  const o = parseFloat(odds);

  const valid = !isNaN(s) && !isNaN(o) && s > 0 && o > 1;

  const totalReturn = valid ? s * o : 0;
  const profit = valid ? totalReturn - s : 0;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <h2 className="text-xl font-black text-white mb-2">{t.tools.betCalculator}</h2>
      <p className="text-sm text-slate-400 mb-6">{t.tools.betCalculatorDesc}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          placeholder={t.tools.stake}
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
        <input
          type="number"
          placeholder={t.tools.odds}
          value={odds}
          onChange={(e) => setOdds(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
      </div>

      {valid && (
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center">
            <div className="text-[10px] text-slate-400">{t.tools.profit}</div>
            <div className="text-xl font-black text-emerald-400 mt-2">${profit.toFixed(2)}</div>
          </div>
          <div className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center">
            <div className="text-[10px] text-slate-400">{t.tools.return}</div>
            <div className="text-xl font-black text-cyan-300 mt-2">${totalReturn.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// BANKROLL MANAGER (KELLY)
// ========================
function BankrollManager({ t }: { t: any }) {
  const [bankroll, setBankroll] = useState("");
  const [odds, setOdds] = useState("");
  const [prob, setProb] = useState("");

  const b = parseFloat(bankroll);
  const o = parseFloat(odds);
  const p = parseFloat(prob) / 100;

  const valid = !isNaN(b) && !isNaN(o) && !isNaN(p) && b > 0 && o > 1 && p > 0 && p < 1;

  let kellyStake = 0;
  if (valid) {
    const q = 1 - p;
    const bOdds = o - 1;
    const kellyFraction = (bOdds * p - q) / bOdds;
    if (kellyFraction > 0) {
      kellyStake = b * kellyFraction;
    }
  }

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <h2 className="text-xl font-black text-white mb-2">{t.tools.bankroll}</h2>
      <p className="text-sm text-slate-400 mb-6">{t.tools.kelly}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <input
          placeholder={t.tools.bankroll}
          value={bankroll}
          onChange={(e) => setBankroll(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-3 py-3 text-white"
        />
        <input
          placeholder={t.tools.odds}
          value={odds}
          onChange={(e) => setOdds(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-3 py-3 text-white"
        />
        <input
          placeholder={t.tools.winPercent}
          value={prob}
          onChange={(e) => setProb(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-3 py-3 text-white"
        />
      </div>

      {valid && (
        <div className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center mt-5">
          <div className="text-[10px] text-slate-400">{t.tools.recommendedStake}</div>
          <div className="text-2xl font-black text-cyan-300 mt-2">${kellyStake.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}

// ========================
// VALUE BET FINDER
// ========================
function ValueBetFinder({ t }: { t: any }) {
  const [fairOdds, setFairOdds] = useState("");
  const [bookOdds, setBookOdds] = useState("");

  const f = parseFloat(fairOdds);
  const b = parseFloat(bookOdds);

  const valid = !isNaN(f) && !isNaN(b) && f > 1 && b > 1;
  const edge = valid ? (100 / f - 100 / b) : null;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <h2 className="text-xl font-black text-white mb-2">{t.tools.valueFinder}</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder={t.tools.fairOdds}
          value={fairOdds}
          onChange={(e) => setFairOdds(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
        <input
          placeholder={t.tools.bookOdds}
          value={bookOdds}
          onChange={(e) => setBookOdds(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
      </div>

      {valid && (
        <div className="mt-5 text-center text-cyan-300 font-black">
          Edge: {edge?.toFixed(2)}%
        </div>
      )}
    </div>
  );
}

// ========================
// COMPONENT
// ========================
export default function ToolsClient({ lang }: { lang: Lang }) {
  const t = translations[lang] ?? translations.en;

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />

      <div className="pt-[70px] max-w-[1500px] mx-auto px-4 pb-16">
        <h1 className="text-4xl font-black mb-2 pt-12">{t.tools.title}</h1>
        <p className="text-slate-300 mb-10">{t.tools.subtitle}</p>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OddsConverter t={t} />
            <BetCalculator t={t} />
            <BankrollManager t={t} />
            <ValueBetFinder t={t} />
          </div>

          <aside className="h-fit xl:sticky xl:top-24">
            <PartnerSportsbooksList lang={lang} countryCode={lang === "hu" ? "HU" : undefined} variant="footer" />
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
