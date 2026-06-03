// app/betting-tools/page.tsx
"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import SimpleFooter from "@/app/components/SimpleFooter";

// ========================
// ODDS CONVERTER
// ========================
function OddsConverter() {
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
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <h2 className="text-xl font-black text-white mb-2">Odds Converter</h2>
      <p className="text-sm text-slate-400 mb-6">
        Convert between decimal, fractional and American odds
      </p>

      <input
        type="number"
        value={decimal}
        onChange={(e) => setDecimal(e.target.value)}
        placeholder="e.g. 2.50"
        className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
      />

      {valid && (
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: "Fractional", value: toFractional(d) },
            { label: "American", value: toAmerican(d) },
            { label: "Implied", value: toImplied(d) },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center"
            >
              <div className="text-[10px] text-slate-400">{item.label}</div>
              <div className="text-xl font-black text-cyan-300 mt-2">
                {item.value}
              </div>
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
function BetCalculator() {
  const [stake, setStake] = useState("");
  const [odds, setOdds] = useState("");

  const s = parseFloat(stake);
  const o = parseFloat(odds);

  const valid = !isNaN(s) && !isNaN(o) && s > 0 && o > 1;
  const profit = valid ? ((o - 1) * s).toFixed(2) : null;
  const total = valid ? (o * s).toFixed(2) : null;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <h2 className="text-xl font-black text-white mb-2">Bet Calculator</h2>
      <p className="text-sm text-slate-400 mb-6">Calculate winnings</p>

      <div className="grid grid-cols-2 gap-4">
        <input
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          placeholder="Stake"
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
        <input
          value={odds}
          onChange={(e) => setOdds(e.target.value)}
          placeholder="Odds"
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
      </div>

      {valid && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-center">
            <div className="text-xs text-slate-400">Profit</div>
            <div className="text-2xl font-black text-emerald-300">
              ${profit}
            </div>
          </div>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-center">
            <div className="text-xs text-slate-400">Return</div>
            <div className="text-2xl font-black text-cyan-300">${total}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// BANKROLL MANAGER
// ========================
function BankrollManager() {
  const [bankroll, setBankroll] = useState("");
  const [odds, setOdds] = useState("");
  const [prob, setProb] = useState("");

  const b = parseFloat(bankroll);
  const o = parseFloat(odds);
  const p = parseFloat(prob) / 100;

  const valid = !isNaN(b) && !isNaN(o) && !isNaN(p) && b > 0 && o > 1;

  const kelly = valid ? Math.max(0, (p * (o - 1) - (1 - p)) / (o - 1)) : null;

  const stake = kelly !== null ? (kelly * b).toFixed(2) : null;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <h2 className="text-xl font-black text-white mb-2">
        Bankroll Manager
      </h2>
      <p className="text-sm text-slate-400 mb-6">Kelly Criterion</p>

      <div className="grid grid-cols-3 gap-3">
        <input
          placeholder="Bankroll"
          value={bankroll}
          onChange={(e) => setBankroll(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
        <input
          placeholder="Odds"
          value={odds}
          onChange={(e) => setOdds(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
        <input
          placeholder="Win %"
          value={prob}
          onChange={(e) => setProb(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
      </div>

      {valid && kelly !== null && (
        <div className="mt-5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-center">
          <div className="text-sm text-slate-400">Recommended Stake</div>
          <div className="text-3xl font-black text-cyan-300">
            ${stake}
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// VALUE BET FINDER
// ========================
function ValueBetFinder() {
  const [fairOdds, setFairOdds] = useState("");
  const [bookOdds, setBookOdds] = useState("");

  const f = parseFloat(fairOdds);
  const b = parseFloat(bookOdds);

  const valid = !isNaN(f) && !isNaN(b) && f > 1 && b > 1;

  const edge = valid ? (100 / f - 100 / b) : null;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <h2 className="text-xl font-black text-white mb-2">
        Value Bet Finder
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Fair odds"
          value={fairOdds}
          onChange={(e) => setFairOdds(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
        <input
          placeholder="Book odds"
          value={bookOdds}
          onChange={(e) => setBookOdds(e.target.value)}
          className="rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white"
        />
      </div>

      {valid && (
        <div className="mt-5 text-center">
          <div className="text-lg font-black text-cyan-300">
            Edge: {edge?.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// PAGE
// ========================
export default function BettingToolsPage() {
  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />

      <div className="pt-[70px] max-w-[1500px] mx-auto px-4 pb-16">
        <h1 className="text-4xl font-black mb-10">
          Betting Tools
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OddsConverter />
          <BetCalculator />
          <BankrollManager />
          <ValueBetFinder />
        </div>
      </div>

      <SimpleFooter />
    </main>
  );
}