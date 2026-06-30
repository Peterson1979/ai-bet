"use client";

import { MatchCardData } from "../types/match";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  data: MatchCardData;
  lang?: Lang;
};

/* =========================
   COMPONENT
========================= */

export default function MatchCard({ data, lang = "en" }: Props) {
  const t = translations[lang] ?? translations.en;

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
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-300">
            {t.matchSignal}
          </span>

          <h3 className="text-lg font-black text-white leading-tight">
            {data.homeTeam} vs {data.awayTeam}
          </h3>

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

      {/* AI PREVIEW */}
      <div className="mt-2 rounded-xl border-2 border-cyan-300/20 bg-[#0B1220] p-3">
        <p className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold mb-1">
          {t.matchPreview ?? "Match Preview"}
        </p>
        <p className="text-sm text-slate-200 leading-6">
          {data.preview || t.noExplanation}
        </p>
      </div>

      {/* ODDS */}
      <div className="mt-4 rounded-xl border-2 border-cyan-300/40 bg-[#0B1220] p-3 flex items-center justify-between shadow-inner">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {t.odds}
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