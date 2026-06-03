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
  const toFractional = (d: number) => {
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    const denom = 100;
    const num = Math.round((d - 1) * denom);
    const g = gcd(num, denom);
    return `${num/g}/${denom/g}`;
  };
  const toAmerican = (d: number) => d >= 2 ? `+${Math.round((d-1)*100)}` : `${Math.round(-100/(d-1))}`;
  const toImplied  = (d: number) => `${(100/d).toFixed(1)}%`;
  const d = parseFloat(decimal);
  const valid = !isNaN(d) && d > 1;

  return (
    <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🔄</span>
        <div>
          <h2 className="text-xl font-black text-white">Odds Converter</h2>
          <p className="text-sm text-slate-400">Convert between decimal, fractional and American odds</p>
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Decimal Odds</label>
        <input type="number" value={decimal} onChange={(e) => setDecimal(e.target.value)} placeholder="e.g. 2.50"
          className="w-full rounded-xl border border-cyan-400/20 bg-[#060B14] px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:outline-none" />
      </div>
      {valid && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[{ label: "Fractional", value: toFractional(d) }, { label: "American", value: toAmerican(d) }, { label: "Implied %", value: toImplied(d) }].map((item) => (
            <div key={item.label} className="rounded-xl border border-cyan-400/15 bg-[#060B14] p-4 text-center">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
              <div className="mt-2 text-xl font-black text-cyan-300">{item.value}</div>
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
  const [odds,  setOdds]  = useState("");
  const s = parseFloat(stake), o = parseFloat(odds);
  const valid  = !isNaN(s) && !isNaN(o) && s > 0 && o > 1;
  const profit = valid ? ((o-1)*s).toFixed(2) : null;
  const total  = valid ? (o*s).toFixed(2) : null;

  return (
    <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🧮</span>
        <div>
          <h2 className="text-xl font-black text-white">Bet Calculator</h2>
          <p className="text-sm text-slate-400">Calculate potential winnings instantly</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Stake ($)</label>
          <input type="number" value={stake} onChange={(e) => setStake(e.target.value)} placeholder="e.g. 100"
            className="w-full rounded-xl border border-cyan-400/20 bg-[#060B14] px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Decimal Odds</label>
          <input type="number" value={odds} onChange={(e) => setOdds(e.target.value)} placeholder="e.g. 2.50"
            className="w-full rounded-xl border border-cyan-400/20 bg-[#060B14] px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:outline-none" />
        </div>
      </div>
      {valid && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profit</div>
            <div className="mt-2 text-2xl font-black text-emerald-300">${profit}</div>
          </div>
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Return</div>
            <div className="mt-2 text-2xl font-black text-cyan-300">${total}</div>
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
  const [odds,     setOdds]     = useState("");
  const [prob,     setProb]     = useState("");
  const b = parseFloat(bankroll), o = parseFloat(odds), p = parseFloat(prob)/100;
  const valid = !isNaN(b) && !isNaN(o) && !isNaN(p) && b > 0 && o > 1 && p > 0 && p < 1;
  const kelly     = valid ? Math.max(0, (p*(o-1)-(1-p))/(o-1)) : null;
  const halfKelly = kelly !== null ? kelly*0.5 : null;
  const stake     = kelly !== null ? (kelly*b).toFixed(2) : null;
  const halfStake = halfKelly !== null ? (halfKelly*b).toFixed(2) : null;

  return (
    <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">💰</span>
        <div>
          <h2 className="text-xl font-black text-white">Bankroll Manager</h2>
          <p className="text-sm text-slate-400">Kelly Criterion — optimal stake calculator</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Bankroll ($)", value: bankroll, set: setBankroll, placeholder: "e.g. 1000" },
          { label: "Decimal Odds", value: odds,     set: setOdds,     placeholder: "e.g. 2.50" },
          { label: "Win Prob. (%)", value: prob,    set: setProb,     placeholder: "e.g. 55"   },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
              className="w-full rounded-xl border border-cyan-400/20 bg-[#060B14] px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:outline-none" />
          </div>
        ))}
      </div>
      {valid && kelly !== null && kelly > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Kelly Stake</div>
            <div className="mt-2 text-2xl font-black text-cyan-300">${stake}</div>
            <div className="text-[10px] text-slate-400 mt-1">{(kelly*100).toFixed(1)}% of bankroll</div>
          </div>
          <div className="rounded-xl border border-yellow-400/30 bg-yellow-500/10 p-4 text-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Half Kelly (safer)</div>
            <div className="mt-2 text-2xl font-black text-yellow-300">${halfStake}</div>
            <div className="text-[10px] text-slate-400 mt-1">{((halfKelly??0)*100).toFixed(1)}% of bankroll</div>
          </div>
        </div>
      )}
      {valid && kelly === 0 && (
        <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-center">
          <p className="text-sm text-red-300 font-semibold">No value — Kelly suggests no stake.</p>
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
  const fair = parseFloat(fairOdds), book = parseFloat(bookOdds);
  const valid = !isNaN(fair) && !isNaN(book) && fair > 1 && book > 1;
  const edge    = valid ? (100/fair) - (100/book) : null;
  const isValue = edge !== null && edge > 0;

  return (
    <div className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">📊</span>
        <div>
          <h2 className="text-xl font-black text-white">Value Bet Finder</h2>
          <p className="text-sm text-slate-400">Compare fair odds vs bookmaker odds to find edge</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Your Fair Odds</label>
          <input type="number" value={fairOdds} onChange={(e) => setFairOdds(e.target.value)} placeholder="e.g. 2.00"
            className="w-full rounded-xl border border-cyan-400/20 bg-[#060B14] px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bookmaker Odds</label>
          <input type="number" value={bookOdds} onChange={(e) => setBookOdds(e.target.value)} placeholder="e.g. 2.20"
            className="w-full rounded-xl border border-cyan-400/20 bg-[#060B14] px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/60 focus:outline-none" />
        </div>
      </div>
      {valid && edge !== null && (
        <div className={`mt-5 rounded-xl border p-4 text-center ${isValue ? "border-emerald-400/30 bg-emerald-500/10" : "border-red-400/30 bg-red-500/10"}`}>
          <div className="text-lg font-black">
            {isValue
              ? <span className="text-emerald-300">✅ Value Bet! Edge: +{edge.toFixed(2)}%</span>
              : <span className="text-red-300">❌ No Value. Edge: {edge.toFixed(2)}%</span>}
          </div>
          <p className="mt-2 text-sm text-slate-300">
            {isValue
              ? "The bookmaker offers better odds than your fair estimate. This is a value bet."
              : "Bookmaker odds are lower than your fair estimate. Avoid this bet."}
          </p>
        </div>
      )}
    </div>
  );
}

// ========================
// METRICS EXPLAINER
// ========================
const METRICS = [
  { emoji: "📈", title: "AI Edge", desc: "The edge is the difference between the AI's estimated win probability and the implied bookmaker probability. A positive edge (e.g. +8%) means the bookmaker may be undervaluing the outcome — this is where value bets are found. Generally, an edge above 5% is considered significant." },
  { emoji: "🎯", title: "Confidence Score", desc: "Confidence (0–100) reflects how strongly the AI believes in its prediction based on statistical signals, historical match data, team form and market movements. Scores above 70 indicate high-conviction picks. Below 50 means the AI sees significant uncertainty." },
  { emoji: "📊", title: "Implied Probability", desc: "Implied probability converts bookmaker decimal odds into a percentage. Odds of 2.00 = 50% implied probability. Odds of 1.50 = 66.7%. When the AI's estimated probability exceeds the implied probability, a positive edge exists. Always compare across multiple bookmakers to find the best line." },
  { emoji: "⚠️", title: "Risk Score", desc: "Risk (1–100) estimates prediction volatility and uncertainty. Low risk (under 35) = stable, predictable conditions. Medium risk (35–65) = moderate uncertainty. High risk (above 65) = volatile matchup. High-risk picks may offer bigger odds but are less reliable — size your bets accordingly using the Kelly Criterion calculator above." },
];

function MetricsExplainer() {
  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-2xl font-black text-white md:text-3xl">Understanding AI Betting Metrics</h2>
        <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-cyan-400/40 to-transparent" />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {METRICS.map((m) => (
          <div key={m.title} className="rounded-[24px] border border-cyan-400/15 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{m.emoji}</span>
              <h3 className="text-base font-black text-cyan-300">{m.title}</h3>
            </div>
            <p className="text-sm leading-6 text-slate-300">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ========================
// PAGE
// ========================
export default function BettingToolsPage() {
  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />
      <div className="pt-[70px]">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 pb-16">

          <div className="py-12">
            <h1 className="text-4xl font-black text-white md:text-5xl">
              Betting <span className="text-cyan-400">Tools</span>
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Free calculators to help you bet smarter — odds converter, bet calculator, bankroll manager and value bet finder.
            </p>
          </div>

          {/* TOOLS GRID */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <OddsConverter />
            <BetCalculator />
            <BankrollManager />
            <ValueBetFinder />
          </div>

          {/* METRICS EXPLAINER */}
          <MetricsExplainer />

          {/* AFFILIATE CTA */}
          <div className="mt-12 rounded-[24px] border border-cyan-400/20 bg-gradient-to-r from-[#0B1220] via-[#0F172A] to-[#111827] p-8 text-center">
            <h3 className="text-2xl font-black text-white">Ready to bet with an edge?</h3>
            <p className="mt-3 text-slate-300 max-w-xl mx-auto">
              Use these tools with our AI picks and find the best odds at top-rated sportsbooks.
            </p>
            <a href="/betting" className="mt-6 inline-block rounded-full border border-cyan-400/30 bg-cyan-500/10 px-8 py-3 text-sm font-bold uppercase tracking-wider text-cyan-300 transition-all hover:bg-cyan-400/20 hover:border-cyan-300/60">
              View Top Betting Sites →
            </a>
          </div>

        </div>
        <SimpleFooter />
      </div>
    </main>
  );
}
