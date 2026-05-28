import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

export default function MatchCard({ data }: Props) {
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
      {/* 3D METAL EDGE EFFECT */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/5 shadow-inner" />

      {/* GLOW BACKDROP */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 left-10 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-3">
        <span
          className="
            rounded-full
            border border-cyan-400/30
            bg-cyan-400/10
            px-3 py-1

            text-[11px] font-semibold uppercase tracking-wider
            text-cyan-300

            shadow-[0_0_12px_rgba(34,211,238,0.15)]
          "
        >
          {data.league}
        </span>

        <span className="text-[11px] text-slate-400">
          {new Date(data.startTimeUtc).toLocaleString()}
        </span>
      </div>

      {/* MATCH TITLE */}
      <h3 className="relative mt-4 text-lg font-black leading-6 text-white tracking-wide">
        {data.eventName}
      </h3>

      {/* ODDS STRONG FOCUS STRIP */}
      <div
        className="
          relative mt-4 flex items-center justify-between
          rounded-xl
          border border-cyan-400/15
          bg-[#0B1220]

          px-4 py-3

          shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]
        "
      >
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Bookmaker
          </p>
          <p className="text-sm font-semibold text-white">
            {data.bookmaker || "—"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Odds
          </p>
          <p
            className="
              text-xl font-black
              text-emerald-300
              drop-shadow-[0_0_10px_rgba(16,185,129,0.25)]
            "
          >
            {data.odds ?? "—"}
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="relative mt-4 grid grid-cols-2 gap-3">
        <div
          className="
            rounded-xl
            border border-cyan-400/10
            bg-[#0B1220]

            p-3
            shadow-inner
          "
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Confidence
          </p>
          <p className="mt-1 text-xl font-black text-cyan-300">
            {data.confidence}%
          </p>
        </div>

        <div
          className="
            rounded-xl
            border border-cyan-400/10
            bg-[#0B1220]

            p-3
            shadow-inner
          "
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Risk
          </p>
          <p className="mt-1 text-xl font-black text-orange-400">
            {data.risk}/100
          </p>
        </div>
      </div>

      {/* RECOMMENDED BET */}
      <div
        className="
          relative mt-4 rounded-xl
          border border-cyan-400/15
          bg-gradient-to-r from-[#0B1220] to-[#0E1A2B]

          p-3
        "
      >
        <p className="text-[10px] uppercase tracking-wider text-slate-500">
          Recommended Bet
        </p>
        <p className="mt-2 text-base font-semibold text-white">
          {data.recommendedBet}
        </p>
      </div>

      {/* ANALYSIS */}
      <p className="relative mt-4 text-sm leading-6 text-slate-300">
        {data.shortAnalysis}
      </p>

      {/* CTA */}
      <a
        href={data.ctaUrl}
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