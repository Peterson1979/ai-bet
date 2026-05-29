import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

/* =========================
   SIMPLE SIGNAL SYSTEM
========================= */

function getSignal(confidence?: number, edge?: number) {
  const c = confidence ?? 0;
  const e = edge ?? 0;

  if (c >= 80 && e >= 8) return "STRONG";
  if (c >= 65 && e >= 4) return "ACTIVE";
  return "WEAK";
}

function getSignalStyle(signal: string) {
  switch (signal) {
    case "STRONG":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
    case "ACTIVE":
      return "bg-cyan-500/15 text-cyan-200 border-cyan-400/40";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/20";
  }
}

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

  const signal = getSignal(confidence, edge);
  const signalStyle = getSignalStyle(signal);

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

          {/* SIGNAL */}
          <span
            className={`
              rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider
              ${signalStyle}
            `}
          >
            {signal} SIGNAL
          </span>

          {/* CONFIDENCE BAR */}
          <div className="w-40">
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                style={{ width: `${clamp(confidence)}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] text-slate-300">
              Confidence: {confidence}%
            </p>
          </div>

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
            {data.bestOdds ?? data.odds}
          </p>
        </div>

      </div>

      {/* EDGE / RISK (SIMPLIFIED) */}
      <div className="mt-3 text-[11px] text-slate-300 flex justify-between">
        <span>Edge: {edge.toFixed(1)}%</span>
        <span className="text-red-300">Risk: {risk}/100</span>
      </div>

      {/* REASONING (SHORTENED) */}
      <p className="mt-3 text-sm text-slate-200 leading-5">
        {data.explanation
          ? data.explanation.slice(0, 140) + "..."
          : "AI analysis unavailable."}
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