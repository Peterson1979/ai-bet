import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

export default function MatchCard({ data }: Props) {
  return (
    <article className="rounded-[22px] border border-[#1E293B] bg-[#0F172A] p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
          {data.league}
        </span>

        <span className="text-[11px] text-slate-500">
          {data.startTimeUtc}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-7 text-white">
        {data.eventName}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-800 bg-[#111C31] p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Confidence
          </p>

          <p className="mt-1 text-lg font-bold text-cyan-300">
            {data.confidence}%
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111C31] p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Risk
          </p>

          <p className="mt-1 text-lg font-bold text-green-400">
            {data.riskScore}/100
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-[#111C31] p-3">
        <p className="text-[11px] uppercase tracking-wide text-slate-500">
          Recommended Bet
        </p>

        <p className="mt-2 text-sm font-medium text-white">
          {data.recommendedBet}
        </p>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
        {data.shortAnalysis}
      </p>

      <a
        href={data.ctaUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-5 flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
      >
        {data.ctaLabel}
      </a>

      {data.disclaimer && (
        <p className="mt-3 text-[11px] leading-5 text-slate-500">
          {data.disclaimer}
        </p>
      )}
    </article>
  );
}