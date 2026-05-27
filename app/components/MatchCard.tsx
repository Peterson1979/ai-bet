export type MatchCardBase = {
  disclaimer?: string;
  updatedAt: string;
};

type MatchCardProps = {
  match: MatchCardBase;
};

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <article className="card-panel flex h-full flex-col justify-between p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_22px_rgba(56,189,248,0.12)]">
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
            {match.league}
          </span>

          <span className="text-[11px] text-slate-500">
            {match.startTimeUtc}
          </span>
        </div>

        <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white">
          {match.eventName}
        </h3>

        <p className="mt-2 text-xs text-slate-400">
          {match.league}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-800 bg-[#111C31] p-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              Confidence
            </p>
            <p className="mt-1 text-lg font-bold text-cyan-300">
              {match.confidence}%
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#111C31] p-3">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              Risk
            </p>
            <p className="mt-1 text-lg font-bold text-green-400">
              {match.riskScore}/100
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-slate-800 bg-[#111C31] p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Recommended Bet
          </p>

          <p className="mt-2 text-sm font-medium text-white">
            {match.recommendedBet}
          </p>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
          {match.shortAnalysis}
        </p>
      </div>

      <div className="mt-5">
        <a
          href={match.ctaUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 glow-cyan"
        >
          {match.ctaLabel}
        </a>

        {match.disclaimer && (
          <p className="mt-3 text-[11px] leading-5 text-slate-500">
            {match.disclaimer}
          </p>
        )}
      </div>
    </article>
  );
}