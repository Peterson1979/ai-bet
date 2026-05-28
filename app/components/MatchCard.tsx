import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

export default function MatchCard({ data }: Props) {
  return (
    <article
      className="
        relative overflow-hidden rounded-[18px]
        border border-[#1E293B]
        bg-[#0F172A]
        p-4

        transition-all duration-300
        hover:-translate-y-1

        hover:border-cyan-400/60
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(56,189,248,0.18)]
      "
    >
      {/* subtle metallic highlight layer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-40" />

      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-3">
        <span
          className="
            rounded-full
            border border-cyan-400/30
            bg-cyan-500/10
            px-3 py-1
            text-[11px] font-medium uppercase tracking-wider
            text-cyan-300
            shadow-[0_0_12px_rgba(56,189,248,0.15)]
          "
        >
          {data.league}
        </span>

        <span className="text-[11px] text-slate-500">
          {new Date(data.startTime).toLocaleString()}
        </span>
      </div>

      {/* MATCH */}
      <h3 className="relative mt-3 text-lg font-bold text-white">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      {/* ODDS */}
      <div className="relative mt-2 text-[12px] text-slate-400">
        {data.oddsLabel}
      </div>

      {/* STATS */}
      <div className="relative mt-4 grid grid-cols-2 gap-3">

        <div
          className="
            rounded-xl
            border border-cyan-400/20
            bg-[#111C31]
            p-3

            shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]
          "
        >
          <p className="text-[10px] uppercase tracking-wide text-slate-500">
            Confidence
          </p>
          <p className="mt-1 text-base font-bold text-cyan-300">
            {data.confidence}%
          </p>
        </div>

        <div
          className="
            rounded-xl
            border border-green-400/20
            bg-[#111C31]
            p-3

            shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]
          "
        >
          <p className="text-[10px] uppercase tracking-wide text-slate-500">
            Risk
          </p>
          <p className="mt-1 text-base font-bold text-green-400">
            {data.risk}/100
          </p>
        </div>
      </div>

      {/* BET */}
      <div
        className="
          relative mt-4 rounded-xl
          border border-purple-500/20
          bg-[#111C31]
          p-3

          shadow-[inset_0_0_12px_rgba(0,0,0,0.7)]
        "
      >
        <p className="text-[10px] uppercase tracking-wide text-slate-500">
          Recommended Bet
        </p>

        <p className="mt-1 text-sm font-semibold text-white">
          {data.recommendedBet}
        </p>
      </div>

      {/* EXPLANATION */}
      <p className="relative mt-4 text-sm leading-6 text-slate-400">
        {data.explanation}
      </p>

      {/* CTA BUTTON (HARDENED / METAL STYLE) */}
      <a
        href={data.bookmakerUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="
          relative mt-5 flex w-full items-center justify-center

          rounded-xl
          border border-cyan-400/40
          bg-gradient-to-b from-cyan-300 to-cyan-400

          px-4 py-3
          text-sm font-semibold text-black

          shadow-[0_10px_25px_rgba(56,189,248,0.25)]

          transition-all duration-300
          hover:shadow-[0_12px_35px_rgba(56,189,248,0.35)]
          hover:scale-[1.01]
        "
      >
        {data.ctaLabel}
      </a>

      {/* BOOKMAKER */}
      <p className="relative mt-3 text-[11px] text-slate-600">
        Bookmaker: {data.bookmaker}
      </p>
    </article>
  );
}