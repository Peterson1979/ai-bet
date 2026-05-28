import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

export default function MatchCard({ data }: Props) {
  return (
    <article
      className="
        relative overflow-hidden

        rounded-[22px]

        border border-cyan-400/20

        bg-gradient-to-b
        from-[#162033]
        to-[#0B1220]

        p-5

        shadow-[0_15px_40px_rgba(0,0,0,0.65)]

        transition-all duration-300

        hover:-translate-y-1
        hover:border-cyan-400/50

        hover:shadow-[0_20px_50px_rgba(0,0,0,0.75),0_0_30px_rgba(56,189,248,0.16)]
      "
    >
      {/* metallic glow layer */}
      <div
        className="
          pointer-events-none
          absolute inset-0

          bg-gradient-to-br
          from-white/10
          via-transparent
          to-transparent

          opacity-30
        "
      />

      {/* top glow line */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-cyan-400/20" />

      {/* HEADER */}
      <div className="relative flex items-center justify-between">
        <div
          className="
            rounded-full
            border border-cyan-400/30
            bg-cyan-400/10

            px-3 py-1

            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]

            text-cyan-300

            shadow-[0_0_15px_rgba(56,189,248,0.12)]
          "
        >
          {data.league}
        </div>

        <div className="text-[11px] text-slate-500">
          {new Date(data.startTime).toLocaleString()}
        </div>
      </div>

      {/* MATCH */}
      <div className="relative mt-4">
        <h3 className="text-xl font-black leading-tight text-white">
          {data.homeTeam}
        </h3>

        <div className="my-1 text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
          VS
        </div>

        <h3 className="text-xl font-black leading-tight text-white">
          {data.awayTeam}
        </h3>
      </div>

      {/* ODDS PANEL */}
      <div
        className="
          relative mt-5

          rounded-2xl

          border border-green-400/20

          bg-gradient-to-b
          from-[#1A2438]
          to-[#111827]

          p-4

          shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]
        "
      >
        <div className="flex items-center justify-between">

          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Best Odds
            </p>

            <div className="mt-2 text-2xl font-black text-green-400">
              {data.odds}
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Pick
            </p>

            <div className="mt-2 text-sm font-semibold text-white">
              {data.recommendedBet}
            </div>
          </div>
        </div>
      </div>

      {/* AI DATA */}
      <div className="relative mt-4 grid grid-cols-2 gap-3">

        <div
          className="
            rounded-xl
            border border-cyan-400/15
            bg-[#111827]
            p-3

            shadow-[inset_0_0_12px_rgba(0,0,0,0.7)]
          "
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Confidence
          </p>

          <p className="mt-1 text-lg font-black text-cyan-300">
            {data.confidence}%
          </p>
        </div>

        <div
          className="
            rounded-xl
            border border-purple-400/15
            bg-[#111827]
            p-3

            shadow-[inset_0_0_12px_rgba(0,0,0,0.7)]
          "
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Risk
          </p>

          <p className="mt-1 text-lg font-black text-purple-300">
            {data.risk}/100
          </p>
        </div>
      </div>

      {/* EXPLANATION */}
      <p className="relative mt-4 text-sm leading-6 text-slate-400">
        {data.explanation}
      </p>

      {/* BOOKMAKER */}
      <div
        className="
          relative mt-5

          flex items-center justify-between

          rounded-xl

          border border-[#253047]

          bg-[#111827]

          px-4 py-3
        "
      >
        <div className="flex items-center gap-3">

          {/* logo placeholder */}
          <div
            className="
              h-10 w-10 rounded-lg

              border border-cyan-400/20

              bg-gradient-to-b
              from-[#1E293B]
              to-[#0F172A]
            "
          />

          <div>
            <div className="text-sm font-semibold text-white">
              {data.bookmaker}
            </div>

            <div className="text-[11px] text-slate-500">
              Verified odds provider
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <a
        href={data.bookmakerUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="
          relative mt-5 flex w-full items-center justify-center

          rounded-xl

          border border-cyan-300/40

          bg-gradient-to-b
          from-cyan-300
          to-cyan-400

          px-4 py-3

          text-sm font-black text-black

          shadow-[0_12px_30px_rgba(56,189,248,0.28)]

          transition-all duration-300

          hover:scale-[1.01]
          hover:shadow-[0_15px_40px_rgba(56,189,248,0.35)]
        "
      >
        View Odds at {data.bookmaker}
      </a>
    </article>
  );
}