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

/* =========================
   COMPONENT
========================= */

export default function MatchCard({ data }: Props) {
  const confidence = data.confidence ?? 0;
  const edge = data.edge ?? 0;
  const risk = data.risk ?? 0;
  const bestOdds = data.bestOdds ?? data.odds ?? 0;

  return (
    <article
      className="
        relative overflow-hidden
        rounded-[24px]
        border border-cyan-400/20
        bg-gradient-to-b from-[#0B1220] to-[#0F172A]
        p-5
        shadow-[0_0_25px_rgba(56,189,248,0.08)]
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">

        <div className="flex flex-col gap-2">

          {/* AI PICK */}
          <span className="
            rounded-full border border-cyan-400/30
            bg-cyan-500/10 px-3 py-1
            text-[10px] font-bold uppercase tracking-wider
            text-cyan-300
          ">
            AI PICK
          </span>

          {/* RECOMMENDED BET */}
          <span className="
            rounded-full border border-emerald-400/40
            bg-emerald-500/15 px-3 py-1
            text-[11px] font-bold uppercase tracking-wider
            text-emerald-300
          ">
            {data.recommendedBet}
          </span>

          {/* CONFIDENCE */}
          <span className="
            rounded-full border border-white/10
            bg-white/5 px-3 py-1
            text-[10px] font-bold uppercase
            text-slate-200
          ">
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

      {/* ODDS */}
      <div className="mt-4 flex justify-between items-center rounded-xl bg-[#0B1220] p-3 border border-cyan-400/10">

        <div>
          <p className="text-[10px] text-slate-400 uppercase">Bookmaker</p>
          <p className="text-white font-semibold">
            {data.bookmaker || "Unknown"}
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
      <div className="mt-4 flex justify-between text-[11px] text-slate-300">
        <span>Edge: {edge.toFixed(1)}%</span>
        <span className="text-red-300">Risk: {risk}/100</span>
      </div>

      {/* AI EXPLANATION */}
      <p className="mt-3 text-sm text-slate-200 leading-5">
        {data.explanation || "AI analysis unavailable."}
      </p>

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
        "
      >
        View Odds
      </a>

    </article>
  );
}