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

      {/* BACKGROUND FX */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-20 left-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative flex items-start justify-between mb-4">

        <div className="flex flex-col gap-2">

          {/* AI PICK (cleaned, no heavy badge feel) */}
          <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">
            AI PICK
          </span>

          {/* RECOMMENDED BET (HIGHLIGHTED CORE VALUE) */}
          <span className="text-lg font-black text-white leading-tight">
            {data.recommendedBet}
          </span>

          {/* CONFIDENCE */}
          <span className="text-[11px] font-bold text-slate-300">
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

      {/* EDGE / RISK (kept, but cleaner) */}
      <div className="mt-4 flex justify-between text-[12px] text-slate-300">

        <span>
          Edge: <span className="text-cyan-300 font-bold">{edge.toFixed(1)}%</span>
        </span>

        <span>
          Risk: <span className="text-red-300 font-bold">{risk}/100</span>
        </span>

      </div>

      {/* AI EXPLANATION (IMPROVED UX) */}
      <p className="mt-3 text-sm text-slate-200 leading-6 line-clamp-3">
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
          hover:bg-cyan-400/20
          transition
        "
      >
        View Odds
      </a>

    </article>
  );
}