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

/* =========================
   COMPONENT
========================= */

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

          <span className="text-xl font-black text-white leading-tight">
            {data.recommendedBet}
          </span>

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