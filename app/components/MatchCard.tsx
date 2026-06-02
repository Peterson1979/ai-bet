import { useState } from "react";
import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

/* =========================
   UTILS
========================= */

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

function getBetLabel(confidence: number, edge: number) {
  if (confidence >= 75 && edge >= 5) return "🟢 VALUE BET";
  if (confidence >= 55) return "🟡 OK BET";
  return "🔴 RISKY";
}

function getBetColor(label: string) {
  if (label.includes("VALUE")) return "text-emerald-300 border-emerald-400/30 bg-emerald-500/10";
  if (label.includes("OK")) return "text-yellow-300 border-yellow-400/30 bg-yellow-500/10";
  return "text-red-300 border-red-400/30 bg-red-500/10";
}

/* =========================
   COMPONENT
========================= */

export default function MatchCard({ data }: Props) {
  const [open, setOpen] = useState(false);

  const confidence = data.confidence ?? 0;
  const edge = data.edge ?? 0;
  const risk = (data.risk ?? 0) / 10; // 🔥 FIXED SCALE (0–10)
  const bestOdds = data.bestOdds ?? data.odds ?? 0;

  const betLabel = getBetLabel(confidence, edge);
  const betColor = getBetColor(betLabel);

  return (
    <article
      className="
        relative overflow-hidden
        rounded-[26px]
        border border-cyan-400/20
        bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14]
        p-5
        shadow-[0_0_30px_rgba(56,189,248,0.10)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-cyan-300/50
        hover:shadow-[0_0_60px_rgba(56,189,248,0.25)]
      "
    >

      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">

        <div className="flex flex-col gap-2">

          {/* BET LABEL */}
          <span className={`text-sm font-black px-3 py-1 rounded-full border w-fit ${betColor}`}>
            {betLabel}
          </span>

          {/* MAIN TIP (HIGHLIGHTED) */}
          <span className="text-xl font-black text-white leading-tight">
            {data.recommendedBet}
          </span>

          {/* CONFIDENCE */}
          <span className="text-[12px] text-slate-300 font-bold">
            Confidence: {confidence}%
          </span>

        </div>

        <span className="text-[11px] text-slate-300">
          {data.startTime
            ? new Date(data.startTime).toLocaleString()
            : "TBD"}
        </span>

      </div>

      {/* MATCH */}
      <h3 className="text-lg font-black text-white">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      <span className="inline-block mt-2 text-[11px] text-cyan-300">
        {data.league}
      </span>

      {/* ODDS (NO BOOKMAKER NAME) */}
      <div className="mt-4 flex justify-between items-center rounded-xl bg-[#0B1220] p-3 border border-cyan-400/10">

        <div>
          <p className="text-[10px] text-slate-400 uppercase">Bookmaker</p>
          <p className="text-white font-semibold opacity-0">
            hidden
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase">Odds</p>
          <p className="text-emerald-300 font-black text-lg">
            {bestOdds}
          </p>
        </div>

      </div>

      {/* EDGE / RISK */}
      <div className="mt-4 flex justify-between text-[12px] text-slate-300">

        <span>
          Edge: <span className="text-cyan-300 font-bold">{edge.toFixed(1)}%</span>
        </span>

        <span>
          Risk: <span className="text-red-300 font-bold">{risk.toFixed(1)}/10</span>
        </span>

      </div>

      {/* AI EXPLANATION (COLLAPSIBLE) */}
      <div className="mt-3">

        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-cyan-300 font-bold"
        >
          {open ? "Hide AI explanation ▲" : "Show AI explanation ▼"}
        </button>

        {open && (
          <p className="mt-2 text-sm text-slate-200 leading-6">
            {data.explanation || "AI analysis unavailable."}
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
          rounded-xl border border-cyan-400/20
          bg-cyan-500/10
          py-2 text-sm font-bold text-cyan-300
          hover:bg-cyan-400/20
          transition
        "
      >
        View Odds
      </a>

    </article>
  );
}