import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 75) return "text-emerald-300";
  if (confidence >= 50) return "text-yellow-300";
  return "text-red-300";
}

function getSignal(confidence: number, edge: number) {
  if (confidence >= 80 && edge >= 8) return "STRONG";
  if (confidence >= 65 && edge >= 4) return "ACTIVE";
  return "WEAK";
}

export default function MatchCard({ data }: Props) {
  const confidence = data.confidence ?? 0;
  const edge = data.edge ?? 0;
  const risk = data.risk ?? 0;
  const odds = data.bestOdds ?? data.odds ?? 0;

  const signal = getSignal(confidence, edge);
  const confidenceColor = getConfidenceColor(confidence);

  return (
    <article className="
      relative overflow-hidden
      rounded-[24px]
      border border-cyan-400/20
      bg-gradient-to-b from-[#0B1220] to-[#0F172A]
      p-5
      shadow-[0_0_25px_rgba(56,189,248,0.08)]
      transition hover:-translate-y-1
    ">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <span className="text-[11px] font-bold text-cyan-300 uppercase">
          {signal} signal
        </span>

        <span className={`text-sm font-bold ${confidenceColor}`}>
          {confidence}%
        </span>

      </div>

      {/* MATCH */}
      <h3 className="mt-3 text-lg font-black text-white">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      <p className="mt-1 text-xs text-slate-400">
        {data.league} • {data.startTime ? new Date(data.startTime).toLocaleString() : "TBD"}
      </p>

      {/* ODDS */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0B1220] p-3 border border-cyan-400/10">

        <div>
          <p className="text-[10px] text-slate-400 uppercase">Book</p>
          <p className="text-sm text-white font-semibold">
            {data.bookmaker || "Unknown"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase">Odds</p>
          <p className="text-lg font-black text-emerald-300">
            {odds}
          </p>
        </div>

      </div>

      {/* SIMPLE EDGE BAR */}
      <div className="mt-4">

        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Edge</span>
          <span>Risk {risk}/100</span>
        </div>

        <div className="relative mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">

          <div
            className="absolute h-full bg-cyan-400"
            style={{ width: `${clamp(edge)}%` }}
          />

          <div
            className="absolute h-full bg-red-500/50"
            style={{ width: `${clamp(risk)}%` }}
          />

        </div>

      </div>

      {/* AI REASON (SHORT) */}
      <p className="mt-4 text-sm text-slate-300 line-clamp-2">
        {data.explanation || "No analysis available."}
      </p>

      {/* CTA */}
      <a
        href={data.bookmakerUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-4 flex justify-center
          rounded-xl bg-cyan-500/10
          border border-cyan-400/20
          py-2 text-sm font-bold text-cyan-300
          hover:bg-cyan-400/20
        "
      >
        View Odds
      </a>

    </article>
  );
}