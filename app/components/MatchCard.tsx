"use client";

import { useState } from "react";
import { MatchCardData } from "../types/match";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  data: MatchCardData;
  lang?: Lang;
};

/* =========================
   BET LABEL SYSTEM
========================= */

function getBetLabel(confidence: number, edge: number, t: any) {
  if (confidence >= 75 && edge >= 5) return t.valueBet;
  if (confidence >= 55) return t.okBet;
  return t.riskyBet;
}

function getBetColor(label: string) {
  if (label.includes("VALUE"))
    return "text-emerald-300 border-emerald-400/40 bg-emerald-500/10";
  if (label.includes("OK"))
    return "text-yellow-300 border-yellow-400/40 bg-yellow-500/10";
  return "text-red-300 border-red-400/40 bg-red-500/10";
}
const BET_TYPE_TO_KEY: Record<string, string> = {
  "home win": "homeWin",
  "away win": "awayWin",
  "draw no bet": "drawNoBet",
  "double chance": "doubleChance",
  "match winner": "matchWinner",
  "moneyline": "moneyline",
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
  "method of victory": "methodOfVictory",
  "over 2.5 rounds": "over25Rounds",
  "under 2.5 rounds": "under25Rounds",
};
/* =========================
   COMPONENT
========================= */
/* =========================
   BET TOOLTIP
========================= */

function BetTooltip({ betType, t, lang }: { betType: string; t: any; lang: string }) {
  const [visible, setVisible] = useState(false);

  const glossary = t.glossary?.markets ?? {};
  const key = BET_TYPE_TO_KEY[betType?.toLowerCase() ?? ""];
  const entry = key ? (glossary as Record<string, { term: string; definition: string }>)[key] : undefined;

  if (!entry) return null;

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={(e) => { e.stopPropagation(); setVisible(!visible); }}
        className="text-cyan-400 hover:text-cyan-200 transition text-[14px] leading-none"
        aria-label="Bet type info"
      >
        ⓘ
      </button>

      {visible && (
        <div className="absolute left-6 top-0 z-50 w-64 rounded-[14px] border-2 border-cyan-300/40 bg-[#0B1220] p-3 shadow-[0_8px_40px_rgba(34,211,238,0.2)] text-left">
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
export default function MatchCard({ data, lang = "en" }: Props) {
  const [open, setOpen] = useState(false);

  const t = translations[lang] ?? translations.en;

  const confidence = data.confidence ?? 0;
  const edge = data.edge ?? 0;

  const risk = (data.risk ?? 0) / 10;
  const bestOdds = data.bestOdds ?? data.odds ?? 0;
  const implied = data.impliedProbability ?? 0;

  const betLabel = getBetLabel(confidence, edge, t);
  const betColor = getBetColor(betLabel);

  const evScore = confidence - implied;

  return (
    <article
      className="
        relative overflow-hidden
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
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-300">
            {t.matchSignal}
          </span>

          <span
            className={`text-sm font-black px-3 py-1 rounded-full border w-fit ${betColor}`}
          >
            {betLabel}
          </span>

          <div className="flex items-center gap-2 group relative">
            <span className="text-xl font-black text-white leading-tight">
              {(() => {
                const key = BET_TYPE_TO_KEY[data.recommendedBet?.toLowerCase() ?? ""];
                const markets = t.glossary?.markets as Record<string, { term: string; definition: string }> ?? {};
                return key && markets[key] ? markets[key].term : data.recommendedBet;
              })()}
            </span>
            <BetTooltip betType={data.recommendedBet} t={t} lang={lang} />
          </div>

          <span className="text-[12px] text-slate-300 font-bold">
            {t.confidence}: {confidence}%<span className="text-[11px] opacity-60 ml-1"></span>
          </span>
        </div>

        <span className="text-[11px] text-slate-300">
          {data.startTime
            ? new Date(data.startTime).toLocaleString()
            : t.tbd}
        </span>
      </div>

      <h3 className="text-lg font-black text-white">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      <span className="inline-block mt-2 text-[11px] text-cyan-300">
        {data.league}
      </span>

      {/* ODDS */}
      <div className="mt-4 rounded-xl border-2 border-cyan-300/40 bg-[#0B1220] p-3 flex items-center justify-between shadow-inner">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {t.odds}
        </span>

        <span className="text-xl font-black text-emerald-300">
          {bestOdds}
        </span>
      </div>

      {/* EDGE + RISK */}
      <div className="mt-4 flex justify-between text-[12px] text-slate-300">
        <span>
          {t.edge}:{" "}
          <span className="text-cyan-300 font-bold">
            {edge.toFixed(1)}%
          </span>
        </span>

        <span>
          {t.risk}:{" "}
          <span className="text-red-300 font-bold">
            {risk.toFixed(1)}/10
          </span>
        </span>
      </div>

      {/* EV */}
      <div className="mt-4 rounded-xl border-2 border-cyan-300/30 bg-gradient-to-r from-[#0B1220] to-[#0E1A2B] p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
            {t.ev}
          </p>

          <span
            className={`text-sm font-black ${
              evScore >= 0 ? "text-emerald-300" : "text-red-300"
            }`}
          >
            {evScore >= 0 ? "+" : ""}
            {evScore.toFixed(1)}
          </span>
        </div>

        <p className="mt-2 text-[11px] text-slate-300 leading-5">
          {evScore >= 0 ? t.positiveEV : t.negativeEV}
        </p>
      </div>

      {/* EXPLANATION */}
      <div className="mt-3">
        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-cyan-300 font-bold"
        >
          {open ? t.hideExplanation : t.showExplanation}
        </button>

        {open && (
          <p className="mt-2 text-sm text-slate-200 leading-6">
            {data.explanation || t.noExplanation}
          </p>
        )}
      </div>

      {/* CTA */}
      <a
        href={data.bookmakerUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-4 flex justify-center
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