import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

export default function MatchCard({ data }: Props) {
  return (
    <article
      className="
        relative overflow-hidden
<<<<<<< Updated upstream

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
=======
        rounded-[26px]
        border border-cyan-400/20
        bg-gradient-to-b from-[#0F172A] to-[#0B1220]
        p-5

        shadow-[0_0_30px_rgba(56,189,248,0.08)]
        transition duration-300

        hover:-translate-y-1
        hover:border-cyan-400/50
        hover:shadow-[0_0_45px_rgba(56,189,248,0.18)]
      "
    >
      {/* GLOW EFFECT BACKDROP */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-20 left-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="relative flex items-center justify-between gap-3">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
>>>>>>> Stashed changes
          {data.league}
        </div>

<<<<<<< Updated upstream
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
=======
        <span className="text-[11px] text-slate-400">
          {new Date(data.startTimeUtc).toLocaleString()}
        </span>
      </div>

      {/* MATCH */}
      <h3 className="relative mt-4 text-lg font-black leading-6 text-white">
        {data.eventName}
      </h3>

      {/* ODDS STRIP */}
      <div className="relative mt-4 flex items-center justify-between rounded-xl border border-cyan-400/10 bg-[#111C31] px-4 py-3">
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
          <p className="text-lg font-black text-cyan-300">
            {data.odds ?? "—"}
          </p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="relative mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-cyan-400/10 bg-[#111C31] p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Confidence
          </p>
          <p className="mt-1 text-xl font-black text-cyan-300">
>>>>>>> Stashed changes
            {data.confidence}%
          </p>
        </div>

<<<<<<< Updated upstream
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
=======
        <div className="rounded-xl border border-cyan-400/10 bg-[#111C31] p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Risk
          </p>
          <p className="mt-1 text-xl font-black text-green-400">
>>>>>>> Stashed changes
            {data.risk}/100
          </p>
        </div>
      </div>

<<<<<<< Updated upstream
=======
      {/* RECOMMENDED BET */}
      <div className="relative mt-4 rounded-xl border border-cyan-400/10 bg-[#111C31] p-3">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">
          Recommended Bet
        </p>
        <p className="mt-2 text-base font-semibold text-white">
          {data.recommendedBet}
        </p>
      </div>

>>>>>>> Stashed changes
      {/* EXPLANATION */}
      <p className="relative mt-4 text-sm leading-6 text-slate-300">
        {data.shortAnalysis}
      </p>

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
      {/* CTA */}
      <a
        href={data.ctaUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="
          relative mt-5 flex w-full items-center justify-center
<<<<<<< Updated upstream

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
=======
          rounded-xl border border-cyan-400/30
          bg-cyan-400/10
          px-4 py-3
          text-sm font-bold text-cyan-300

          transition
          hover:bg-cyan-400/20
          hover:border-cyan-400/50
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
>>>>>>> Stashed changes
    </article>
  );
}