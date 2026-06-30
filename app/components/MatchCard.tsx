"use client";

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
   COMPONENT
========================= */

export default function MatchCard({ data, lang = "en" }: Props) {
  const t = translations[lang] ?? translations.en;
  const riskConfig = getRiskConfig(data.riskTier ?? "High");
  const bestOdds = data.bestOdds ?? 0;
  const bookmakerCount = data.bookmakerCount ?? 0;

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
        <span className="text-[11px] text-slate-300 whitespace-nowrap">
          {data.startTime
            ? new Date(data.startTime).toLocaleString()
            : t.tbd}
        </span>
      </div>

      {/* TEAMS */}
      <h3 className="text-lg font-black text-white leading-tight mb-4">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      {/* RISK TIER + PICK */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`text-sm font-black px-3 py-1 rounded-full border w-fit ${riskConfig.color}`}
        >
          {riskConfig.emoji} {riskConfig.label}
        </span>
        <span className="text-sm font-black text-white">
          {data.prediction}
        </span>
      </div>

      {/* MARKET LABEL */}
      <div className="mb-4">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
          {t.matchMarket ?? "Market"}
        </span>
        <p className="text-sm text-cyan-300 font-bold mt-1">
          {data.market}
        </p>
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

      {/* ODDS */}
      <div className="rounded-xl border-2 border-cyan-300/40 bg-[#0B1220] p-3 flex items-center justify-between shadow-inner mb-4">
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
        </div>
        <span className="text-xl font-black text-emerald-300">
          {bestOdds > 0 ? bestOdds : "—"}
        </span>
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