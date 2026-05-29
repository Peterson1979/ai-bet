import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

export default function MatchCard({ data }: Props) {
  const isValueBet = data.isValueBet;
  const edge = data.edge;
  const implied = data.impliedProbability;
  const bestOdds = data.bestOdds;

  return (
    <article
      className="
        relative overflow-hidden
        rounded-[28px]

        border border-cyan-400/25
        bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#070B14]

        p-5

        shadow-[0_0_35px_rgba(56,189,248,0.10)]
        ring-1 ring-white/5

        transition-all duration-300 ease-out

        hover:-translate-y-1
        hover:border-cyan-300/60
        hover:shadow-[0_0_60px_rgba(56,189,248,0.25)]
        hover:ring-cyan-400/20
      "
    >
      {/* VALUE BET BADGE */}
      {isValueBet && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-300 border border-green-400/30">
          VALUE BET
        </div>
      )}

      {/* 3D EDGE */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/5 shadow-inner" />

      {/* GLOW */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 left-10 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-3">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          {data.league}
        </span>

        <span className="text-[11px] text-slate-400">
          {data.startTime
            ? new Date(data.startTime).toLocaleString()
            : "TBD"}
        </span>
      </div>

      {/* MATCH TITLE */}
      <h3 className="relative mt-4 text-lg font-black leading-6 text-white tracking-wide">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      {/* ODDS STRIP */}
      <div className="relative mt-4 flex items-center justify-between rounded-xl border border-cyan-400/15 bg-[#0B1220] px-4 py-3 shadow-inner">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Bookmaker
          </p>
          <p className="text-sm font-semibold text-white">
            {data.bookmaker || "Unknown"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Odds
          </p>
          <p className="text-xl font-black text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.25)]">
            {bestOdds ?? data.odds ?? "—"}
          </p>
        </div>
      </div>

      {/* EDGE + AI METRICS */}
      {(edge !== undefined || implied !== undefined) && (
        <div className="relative mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              AI Edge
            </p>
            <p className="mt-1 text-lg font-black text-cyan-300">
              {edge ? `+${edge.toFixed(1)}%` : "—"}
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Implied
            </p>
            <p className="mt-1 text-lg font-black text-orange-300">
              {implied ? `${implied.toFixed(1)}%` : "—"}
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Risk
            </p>
            <p className="mt-1 text-lg font-black text-red-300">
              {data.risk ?? 0}/100
            </p>
          </div>
        </div>
      )}

      {/* AI RECOMMENDATION */}
      <div className="relative mt-4 rounded-xl border border-cyan-400/15 bg-gradient-to-r from-[#0B1220] to-[#0E1A2B] p-3">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">
          AI Prediction
        </p>

        <p className="mt-2 text-base font-semibold text-white">
          {data.recommendedBet || "No recommendation"}
        </p>
      </div>

      {/* ANALYSIS */}
      <p className="relative mt-4 text-sm leading-6 text-slate-300">
        {data.explanation || "AI analysis unavailable."}
      </p>

      {/* CTA */}
      <a
        href={data.bookmakerUrl || "#"}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="
          relative mt-5 flex w-full items-center justify-center

          rounded-xl
          border border-cyan-400/30

          bg-gradient-to-r from-cyan-500/10 to-blue-500/10

          px-4 py-3

          text-sm font-bold text-cyan-300

          transition-all duration-300

          hover:bg-cyan-400/20
          hover:border-cyan-300/60
          hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]

          active:scale-[0.98]
        "
      >
        {data.ctaLabel || "View Odds"}
      </a>

      {/* DISCLAIMER */}
      {data.disclaimer && (
        <p className="relative mt-3 text-[11px] text-slate-500">
          {data.disclaimer}
        </p>
      )}
    </article>
  );
}