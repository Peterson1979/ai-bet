"use client";

import { useState } from "react";
import { MatchCardData } from "../types/match";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  data: MatchCardData;
  lang?: Lang;
};

/* =========================
   RISK TIER
========================= */

function getRiskConfig(tier: string) {
  if (tier === "Low") return {
    emoji: "🟢",
    label: "Low Risk",
    color: "text-emerald-300 border-emerald-400/40 bg-emerald-500/10",
  };
  if (tier === "Medium") return {
    emoji: "🟡",
    label: "Medium Risk",
    color: "text-yellow-300 border-yellow-400/40 bg-yellow-500/10",
  };
  return {
    emoji: "🔴",
    label: "High Risk",
    color: "text-red-300 border-red-400/40 bg-red-500/10",
  };
}

/* =========================
   BET TYPE → GLOSSARY KEY
========================= */

const BET_TYPE_TO_KEY: Record<string, string> = {
  "home win": "homeWin",
  "away win": "awayWin",
  "draw no bet": "drawNoBet",
  "double chance": "doubleChance",
  "match winner": "matchWinner",
  "moneyline": "moneyline",
  "moneyline (fight winner)": "moneyline",
  "over 1.5 goals": "over15",
  "under 4.5 goals": "under45",
  "over 4.5 goals": "over45",
  "under 7.5 goals": "under75",
  "over 18.5 games": "over185Games",
  "under 30.5 games": "under305Games",
  "player to win a set": "playerToWinSet",
  "handicap games (+3.5)": "handicapGames",
  "over 149.5 points": "over1495Points",
  "under 179.5 points": "under1795Points",
  "over 33.5 points": "over335Points",
  "under 54.5 points": "under545Points",
  "over 7.5 runs": "over75Runs",
  "under 9.5 runs": "under95Runs",
  "team total over": "teamTotalOver",
  "team total under": "teamTotalUnder",
  "team total over 1.5": "teamTotalOver15",
  "run line (-1.5)": "runLine",
  "method of victory (ko/tko or decision)": "methodOfVictory",
  "method of victory": "methodOfVictory",
  "over 2.5 rounds": "over25Rounds",
  "under 2.5 rounds": "under25Rounds",
};

/* =========================
   MARKET TOOLTIP
========================= */

function MarketTooltip({ market, t, lang }: { market: string; t: any; lang: string }) {
  const [visible, setVisible] = useState(false);
  const glossary = t.glossary?.markets ?? {};
  const key = BET_TYPE_TO_KEY[market?.toLowerCase() ?? ""];
  const entry = key
    ? (glossary as Record<string, { term: string; definition: string }>)[key]
    : undefined;

  if (!entry) return null;

  return (
    <div className="relative inline-flex items-center ml-1">
      <button
        onClick={(e) => { e.stopPropagation(); setVisible(!visible); }}
        className="text-cyan-400 hover:text-cyan-200 transition text-[14px] leading-none"
        aria-label="Market info"
      >
        ⓘ
      </button>
      {visible && (
        <div className="absolute left-6 top-0 z-50 w-56 max-w-[calc(100vw-2rem)] rounded-[14px] border-2 border-cyan-300/40 bg-[#0B1220] p-3 shadow-[0_8px_40px_rgba(34,211,238,0.2)] text-left">
          <p className="text-[11px] font-black text-cyan-300 uppercase tracking-wider mb-1">
            {entry.term}
          </p>
          <p className="text-[12px] text-slate-300 leading-5">
  {entry.definition}
</p>

<a
  href={`/${lang}/betting-glossary`}
  className="mt-2 inline-block text-[11px] text-cyan-400 hover:text-cyan-200 font-bold"
>
  {t.glossary?.learnMore ?? "Learn more →"}
</a>
        </div>
      )}
    </div>
  );
}

/* =========================
   VALUE SIGNAL
========================= */

function getValueSignal(bestOdds: number, impliedProbability: number): {
  label: string;
  color: string;
} | null {
  if (!bestOdds || !impliedProbability) return null;
  const fairOdds = 100 / impliedProbability;
  const diff = ((bestOdds - fairOdds) / fairOdds) * 100;
  if (diff >= 5) return { label: "⚡ Value odds", color: "text-emerald-300" };
  if (diff <= -5) return { label: "⚠ Below market", color: "text-red-300" };
  return { label: "≈ Fair price", color: "text-slate-400" };
}

/* =========================
   LOCAL TIME
========================= */

function LocalTime({ utcTime }: { utcTime: string }) {
  const local = new Date(utcTime).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <span className="text-[10px] text-slate-500 mt-1 block">
      🕐 {local}
    </span>
  );
}

/* =========================
   COMPONENT
========================= */

export default function MatchCard({ data, lang = "en" }: Props) {
  const t = translations[lang] ?? translations.en;
  const riskConfig = getRiskConfig(data.riskTier ?? "High");
  const bestOdds = data.bestOdds ?? 0;
  const bookmakerCount = data.bookmakerCount ?? 0;
  const implied = data.impliedProbability ?? 0;
  const valueSignal = getValueSignal(bestOdds, implied);

  return (
    <article
      className="
        relative overflow-visible
        rounded-[26px]
        border-4 border-cyan-300/80
        bg-gradient-to-b from-[#070D18] via-[#0B1220] to-[#050A12]
        p-5
        shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_18px_0_rgba(0,0,0,0.6),0_45px_120px_rgba(56,189,248,0.35)]
        transition-all duration-300
        hover:-translate-y-2
        hover:scale-[1.03]
        hover:border-cyan-200
        hover:shadow-[0_0_0_2px_rgba(34,211,238,0.6),0_25px_0_rgba(0,0,0,0.7),0_70px_160px_rgba(56,189,248,0.5)]
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-300">
            {t.matchSignal}
          </span>
          <span className="inline-block text-[11px] text-cyan-300">
            {data.league}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-300 whitespace-nowrap">
            {data.startTime
              ? new Date(data.startTime).toLocaleString()
              : t.tbd}
          </span>
          {data.startTime && <LocalTime utcTime={data.startTime} />}
        </div>
      </div>

      {/* TEAMS */}
      <h3 className="text-lg font-black text-white leading-tight mb-4">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      {/* RISK TIER + PICK */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className={`text-sm font-black px-3 py-1 rounded-full border w-fit ${riskConfig.color}`}>
          {riskConfig.emoji} {riskConfig.label}
        </span>
        <span className="text-sm font-black text-white">
          {data.prediction}
        </span>
      </div>

      {/* MARKET LABEL + TOOLTIP */}
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
          {t.matchMarket ?? "Market"}
        </span>
        <div className="flex items-center mt-1">
          <p className="text-sm text-cyan-300 font-bold">
            {data.market}
          </p>
          <MarketTooltip market={data.market} t={t} lang={lang} />
        </div>
      </div>

      {/* REASONING */}
      <div className="rounded-xl border-2 border-cyan-300/20 bg-[#0B1220] p-3 mb-4">
        <p className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold mb-1">
          {t.matchPreview ?? "Analysis"}
        </p>
        <p className="text-sm text-slate-200 leading-6">
          {data.reasoning || t.noExplanation}
        </p>
      </div>

      {/* ODDS + IMPLIED PROB + VALUE SIGNAL */}
      <div className="rounded-xl border-2 border-cyan-300/40 bg-[#0B1220] p-3 mb-4 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t.odds} · {data.prediction}
            </span>
            {bookmakerCount > 0 && (
              <span className="text-[10px] text-slate-500 mt-1">
                {t.basedOnBookmakers
                  ? t.basedOnBookmakers.replace("{count}", String(bookmakerCount))
                  : `Based on ${bookmakerCount} bookmakers`}
              </span>
            )}
            {implied > 0 && (
              <span className="text-[10px] text-slate-400 mt-1">
                {t.impliedProb ?? "Implied"}: {implied.toFixed(1)}%
              </span>
            )}
            {valueSignal && (
              <span className={`text-[10px] font-bold mt-1 ${valueSignal.color}`}>
                {valueSignal.label}
              </span>
            )}
          </div>
          <span className="text-xl font-black text-emerald-300">
            {bestOdds > 0 ? bestOdds : "—"}
          </span>
        </div>
      </div>

      {/* CTA */}
<a
  href={data.bookmakerUrl || "#"}
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-2 flex justify-center
    rounded-xl border-2 border-cyan-300/40
    bg-cyan-500/10
    py-2 text-sm font-bold text-cyan-200
    hover:bg-cyan-400/20
    transition
  "
>
  {t.viewOdds}
</a>
    </article>
  );
}