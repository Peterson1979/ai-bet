"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PartnerSportsbooksList from "@/app/components/PartnerSportsbooksList";
import { translations, Lang } from "@/app/lib/i18n";

// ========================
// ODDS CONVERTER
// ========================
function OddsConverter({ t }: { t: any }) {
  const [decimal, setDecimal] = useState("2.10");

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
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_0_30px_rgba(56,189,248,0.04)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black text-white">{t.tools.oddsConverter}</h2>
        <span className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-300">
          Conversion Tool
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-6">{t.tools.oddsConverterDesc}</p>

      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
        Enter Decimal Odds:
      </label>
      <input
        type="number"
        step="0.01"
        value={decimal}
        onChange={(e) => setDecimal(e.target.value)}
        placeholder="2.10"
        className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white font-mono text-lg focus:border-cyan-400 focus:outline-none"
      />

      {valid && (
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { label: t.tools.fractional, value: toFractional(d) },
            { label: t.tools.american, value: toAmerican(d) },
            { label: t.tools.implied, value: toImplied(d) },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
              <div className="text-xl font-black text-cyan-300 mt-1 font-mono">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ========================
// BET PAYOUT CALCULATOR
// ========================
function BetCalculator({ t }: { t: any }) {
  const [stake, setStake] = useState("50");
  const [odds, setOdds] = useState("2.25");

  const s = parseFloat(stake);
  const o = parseFloat(odds);

  const valid = !isNaN(s) && !isNaN(o) && s > 0 && o > 1;

  const totalReturn = valid ? s * o : 0;
  const profit = valid ? totalReturn - s : 0;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_0_30px_rgba(56,189,248,0.04)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black text-white">{t.tools.betCalculator}</h2>
        <span className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
          Payout Calculator
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-6">{t.tools.betCalculatorDesc}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Stake ($):
          </label>
          <input
            type="number"
            placeholder={t.tools.stake}
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Decimal Odds:
          </label>
          <input
            type="number"
            step="0.01"
            placeholder={t.tools.odds}
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {valid && (
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="rounded-xl border border-emerald-400/20 bg-[#060B14] p-4 text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.tools.profit}</div>
            <div className="text-xl font-black text-emerald-400 mt-1 font-mono">${profit.toFixed(2)}</div>
          </div>
          <div className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.tools.return}</div>
            <div className="text-xl font-black text-cyan-300 mt-1 font-mono">${totalReturn.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// BANKROLL MANAGER (KELLY CRITERION)
// ========================
function BankrollManager({ t }: { t: any }) {
  const [bankroll, setBankroll] = useState("1000");
  const [odds, setOdds] = useState("2.10");
  const [prob, setProb] = useState("52");

  const b = parseFloat(bankroll);
  const o = parseFloat(odds);
  const p = parseFloat(prob) / 100;

  const valid = !isNaN(b) && !isNaN(o) && !isNaN(p) && b > 0 && o > 1 && p > 0 && p < 1;

  let fullKellyStake = 0;
  let halfKellyStake = 0;
  let quarterKellyStake = 0;

  if (valid) {
    const q = 1 - p;
    const bOdds = o - 1;
    const kellyFraction = (bOdds * p - q) / bOdds;
    if (kellyFraction > 0) {
      fullKellyStake = b * kellyFraction;
      halfKellyStake = fullKellyStake * 0.5;
      quarterKellyStake = fullKellyStake * 0.25;
    }
  }

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_0_30px_rgba(56,189,248,0.04)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black text-white">{t.tools.bankroll}</h2>
        <span className="rounded-lg border border-purple-400/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-bold text-purple-300">
          Kelly Sizing
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-6">{t.tools.kelly}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Bankroll ($)
          </label>
          <input
            placeholder={t.tools.bankroll}
            value={bankroll}
            onChange={(e) => setBankroll(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-3 py-2.5 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Decimal Odds
          </label>
          <input
            placeholder={t.tools.odds}
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-3 py-2.5 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Est. Win %
          </label>
          <input
            placeholder="52"
            value={prob}
            onChange={(e) => setProb(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-3 py-2.5 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {valid && (
        <div className="grid grid-cols-3 gap-2 mt-5">
          <div className="rounded-xl border border-purple-400/20 bg-[#060B14] p-3 text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Quarter Kelly (0.25x)</div>
            <div className="text-lg font-black text-emerald-400 mt-1 font-mono">${quarterKellyStake.toFixed(2)}</div>
          </div>
          <div className="rounded-xl border border-purple-400/20 bg-[#060B14] p-3 text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Half Kelly (0.50x)</div>
            <div className="text-lg font-black text-cyan-300 mt-1 font-mono">${halfKellyStake.toFixed(2)}</div>
          </div>
          <div className="rounded-xl border border-purple-400/20 bg-[#060B14] p-3 text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Full Kelly (1.0x)</div>
            <div className="text-lg font-black text-purple-300 mt-1 font-mono">${fullKellyStake.toFixed(2)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// VALUE BET & EDGE CALCULATOR
// ========================
function ValueBetFinder({ t }: { t: any }) {
  const [fairOdds, setFairOdds] = useState("2.00");
  const [bookOdds, setBookOdds] = useState("2.15");

  const f = parseFloat(fairOdds);
  const b = parseFloat(bookOdds);

  const valid = !isNaN(f) && !isNaN(b) && f > 1 && b > 1;
  const edge = valid ? ((b / f) - 1) * 100 : null;
  const ev = valid ? (((100 / f) / 100) * (b - 1) - (1 - ((100 / f) / 100))) * 100 : null;

  return (
    <div className="rounded-[24px] border-2 border-cyan-400/30 bg-gradient-to-b from-[#0B1220] to-[#0F172A] p-6 shadow-[0_0_30px_rgba(56,189,248,0.04)]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-black text-white">{t.tools.valueFinder}</h2>
        <span className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-300">
          +EV Edge Tool
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-6">
        Compare your calculated fair odds against the sportsbook price to discover value edge percentage and expected value.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Calculated Fair Odds:
          </label>
          <input
            type="number"
            step="0.01"
            placeholder={t.tools.fairOdds}
            value={fairOdds}
            onChange={(e) => setFairOdds(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Offered Bookmaker Odds:
          </label>
          <input
            type="number"
            step="0.01"
            placeholder={t.tools.bookOdds}
            value={bookOdds}
            onChange={(e) => setBookOdds(e.target.value)}
            className="w-full rounded-xl border border-cyan-400/30 bg-[#060B14] px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {valid && (
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Value Edge</div>
            <div className={`text-xl font-black mt-1 font-mono ${edge !== null && edge > 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {edge !== null ? (edge > 0 ? `+${edge.toFixed(2)}%` : `${edge.toFixed(2)}%`) : "N/A"}
            </div>
          </div>
          <div className="rounded-xl border border-cyan-400/20 bg-[#060B14] p-4 text-center">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Expected Value (+EV)</div>
            <div className={`text-xl font-black mt-1 font-mono ${ev !== null && ev > 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {ev !== null ? (ev > 0 ? `+${ev.toFixed(2)}%` : `${ev.toFixed(2)}%`) : "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// MAIN TOOLS CLIENT
// ========================
export default function ToolsClient({ lang }: { lang: Lang }) {
  const t = translations[lang] ?? translations.en;
  const countryCode = lang === "hu" ? "HU" : undefined;

  return (
    <main className="min-h-screen bg-[#060B14] text-white">
      <Header />

      <div className="pt-[80px] max-w-[1500px] mx-auto px-4 pb-20">
        
        {/* HERO TITLE */}
        <div className="pt-10 mb-10 text-left">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">
            Interactive Betting Calculators
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            {t.tools.title}
          </h1>
          <p className="mt-4 text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            {t.tools.subtitle}. Practice mathematical bankroll discipline, convert odds across international formats, compute expected value, and calibrate Kelly staking sizing.
          </p>
        </div>

        {/* CALCULATORS GRID + SIDEBAR */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 items-start mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OddsConverter t={t} />
            <BetCalculator t={t} />
            <BankrollManager t={t} />
            <ValueBetFinder t={t} />
          </div>

          <aside className="h-fit xl:sticky xl:top-24">
            <PartnerSportsbooksList lang={lang} countryCode={countryCode} variant="footer" />
          </aside>
        </div>

        {/* CRAWLABLE EDUCATIONAL TEXT: MATHEMATICAL FOUNDATIONS */}
        <div className="rounded-[28px] border-2 border-cyan-400/20 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14] p-8 md:p-12 shadow-[0_0_40px_rgba(56,189,248,0.06)]">
          <div className="mb-10 border-b border-cyan-400/15 pb-6">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              The Mathematics of Sports Betting Calculators
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-4xl">
              Understanding the underlying mathematics behind betting odds conversion, bankroll sizing, and Expected Value (+EV) is critical to separating disciplined long-term betting analysis from pure chance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            
            {/* ARTICLE 1: ODDS CONVERSION */}
            <article className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <span>🔄</span>
                1. How Odds Conversion & Implied Probability Work
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Betting odds represent the financial payout of an event and inversely reflect its break-even implied probability. For European decimal odds, converting to implied probability follows a direct reciprocal formula:
              </p>
              <div className="rounded-xl border border-cyan-400/20 bg-[#0B1220] p-3 text-xs font-mono text-cyan-200 mb-4">
                Implied Probability (%) = (1 / Decimal Odds) × 100
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For example, decimal odds of 2.50 translate to (1 / 2.50) = 40.0% implied probability. American odds of +150 mean risking $100 to make $150 profit (equating to 2.50 decimal), while Fractional odds of 6/4 equal (6/4) + 1 = 2.50.
              </p>
            </article>

            {/* ARTICLE 2: EXPECTED VALUE (+EV) */}
            <article className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <span>⚡</span>
                2. Expected Value (+EV) Mathematical Proof
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Expected Value measures the average outcome of a wager if repeated under identical circumstances. The mathematical formula combines true probability and potential payout:
              </p>
              <div className="rounded-xl border border-cyan-400/20 bg-[#0B1220] p-3 text-xs font-mono text-cyan-200 mb-4">
                EV = (P_win × (Decimal Odds - 1)) - (P_lose × 1)
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If our un-vigged market model estimates a true 52% win probability on an outcome priced at 2.10: EV = (0.52 × 1.10) - (0.48 × 1.0) = 0.572 - 0.480 = +0.092 (+9.2% expected edge). Over hundreds of bets, disciplined +EV wagers converge toward positive returns despite short-term swings.
              </p>
            </article>

            {/* ARTICLE 3: KELLY CRITERION */}
            <article className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <span>🛡️</span>
                3. The Kelly Criterion & Fractional Bankroll Sizing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Originally published by J. L. Kelly Jr. in 1956 at Bell Labs, the Kelly Criterion calculates the mathematically optimal percentage of capital to allocate to an advantageous wager:
              </p>
              <div className="rounded-xl border border-cyan-400/20 bg-[#0B1220] p-3 text-xs font-mono text-cyan-200 mb-4">
                f* = (b × p - q) / b, where b = Odds - 1, p = Probability, q = 1 - p
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Because full Kelly sizing can result in high volatility during adverse variance streaks, professional sports bettors almost universally adopt <strong className="text-cyan-300">Fractional Kelly (0.25x or 0.50x)</strong> to reduce drawdowns while maintaining exponential growth characteristics.
              </p>
            </article>

            {/* ARTICLE 4: EXPLOITING VALUE */}
            <article className="rounded-2xl border border-cyan-400/15 bg-[#060B14]/70 p-6">
              <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <span>🎯</span>
                4. Why Comparing Sportsbook Odds Generates Edge
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Different sportsbooks hold varying levels of liability, risk tolerance, and customer bias. When one bookmaker offers 2.10 while the market consensus fair price is 1.95, an exploitable pricing inefficiency emerges.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                MatchSignal systematically monitors multi-bookmaker datasets to detect these discrepancies and display transparent Value Signals with bookmaker sampling depth.
              </p>
            </article>

          </div>

          {/* INTERNAL NAVIGATION CALLOUT */}
          <div className="border-t border-cyan-400/15 pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/${lang}/guides/expected-value-sports-betting`}
                className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                Read Deep Guide on Expected Value →
              </Link>
              <Link
                href={`/${lang}/guides/bankroll-management`}
                className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                Read Bankroll Management Guide →
              </Link>
            </div>
            <Link
              href={`/${lang}/betting-glossary`}
              className="rounded-xl border border-cyan-400/20 bg-[#0B1220] px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition"
            >
              Explore Full Betting Glossary →
            </Link>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
