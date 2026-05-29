import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

/* =========================
   CONFIDENCE SYSTEM
========================= */

function getConfidenceLevel(confidence?: number) {
  if (confidence === undefined || confidence === null) return "low";
  if (confidence >= 75) return "high";
  if (confidence >= 50) return "mid";
  return "low";
}

function getConfidenceColor(level: string) {
  switch (level) {
    case "high":
      return "text-emerald-300 border-emerald-400/40 bg-emerald-500/10";
    case "mid":
      return "text-yellow-300 border-yellow-400/40 bg-yellow-500/10";
    default:
      return "text-red-300 border-red-400/40 bg-red-500/10";
  }
}

function getConfidenceHeatColor(value: number) {
  if (value >= 75) return "from-emerald-400 via-cyan-400 to-blue-400";
  if (value >= 50) return "from-yellow-400 via-orange-400 to-amber-400";
  return "from-red-500 via-red-400 to-orange-300";
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

/* =========================
   LIVE SIGNAL SYSTEM
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
      return "bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.35)]";
    case "ACTIVE":
      return "bg-cyan-500/15 text-cyan-200 border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.25)]";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/20";
  }
}

/* =========================
   COMPONENT
========================= */

export default function MatchCard({ data }: Props) {
  const edge = data.edge ?? 0;
  const implied = data.impliedProbability ?? 0;
  const risk = data.risk ?? 0;
  const bestOdds = data.bestOdds ?? data.odds ?? 0;

  const confidence = data.confidence ?? 0;
  const confidenceLevel = getConfidenceLevel(confidence);
  const confidenceStyle = getConfidenceColor(confidenceLevel);

  const edgeVsRisk = clamp((edge - risk) + 50);
  const confidenceGradient = getConfidenceHeatColor(confidence);

  const signal = getSignal(confidence, edge);
  const signalStyle = getSignalStyle(signal);

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

      {/* BG FX */}

      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-10 h-52 w-52 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* =========================
          TOP BADGES
      ========================= */}

      <div className="relative flex items-start justify-between mb-4">

        <div className="flex flex-col gap-2">

          {/* AI PICK */}

          <div className="flex flex-wrap items-center gap-2">

            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-200">
              AI PICK
            </span>

            {signal !== "WEAK" && (
              <span
                className={
                  rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider
                  ${signalStyle}
                  ${signal === "STRONG" ? "animate-pulse" : ""}
                }
              >
                {signal} SIGNAL
              </span>
            )}

          </div>

          {/* VALUE BET */}

          {data.isValueBet && (
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-300 border border-green-400/30 w-fit">
              VALUE BET
            </span>
          )}

          {/* CONFIDENCE */}

          <span
            className={rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider w-fit ${confidenceStyle}}
          >
            confidence: {confidence}%
          </span>

          {/* HEATMAP CONFIDENCE BAR */}

          <div className="w-36">

            <div className="flex items-center justify-between mb-1 text-[9px] uppercase tracking-wider text-slate-400">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>

            <div className="relative w-full h-3 bg-white/10 border border-white/10 rounded-full overflow-hidden shadow-inner">

              {/* GRID */}

              <div className="absolute inset-0 flex justify-between opacity-30">
                <div className="w-px bg-white/20" />
                <div className="w-px bg-white/20" />
                <div className="w-px bg-white/20" />
                <div className="w-px bg-white/20" />
              </div>

              {/* FILL */}

              <div
                className={
                  h-full rounded-full
                  bg-gradient-to-r ${confidenceGradient}
                  shadow-[0_0_12px_rgba(34,211,238,0.6)]
                  transition-all duration-500
                }
                style={{ width: ${clamp(confidence)}% }}
              />

            </div>

          </div>

        </div>

        <span className="text-[11px] text-slate-200 font-medium">
          {data.startTime
            ? new Date(data.startTime).toLocaleString()
            : "TBD"}
        </span>

      </div>

      {/* =========================
          LEAGUE
      ========================= */}

      <div className="relative">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-200">
          {data.league}
        </span>
      </div>

      {/* =========================
          MATCH TITLE
      ========================= */}

      <h3 className="relative mt-4 text-lg font-black leading-6 text-white tracking-wide">
        {data.homeTeam} vs {data.awayTeam}
      </h3>

      {/* =========================
          ODDS
      ========================= */}

      <div className="relative mt-4 flex items-center justify-between rounded-xl border border-cyan-400/15 bg-[#0B1220] px-4 py-3 shadow-inner">

        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-100 font-bold">
            Bookmaker
          </p>

          <p className="text-sm font-semibold text-white">
            {data.bookmaker || "Unknown"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-slate-100 font-bold">
            Odds
          </p>

          <p className="text-xl font-black text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]">
            {bestOdds}
          </p>
        </div>

      </div>

      {/* =========================
          EDGE vs RISK
      ========================= */}

      <div className="mt-4 rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3">

        <div className="flex items-center justify-between mb-2">

          <p className="text-[10px] uppercase tracking-wider text-slate-100 font-bold">
            Edge vs Risk
          </p>

          <span className="text-[10px] text-cyan-200 font-bold">
            {edgeVsRisk.toFixed(0)}/100
          </span>

        </div>

        <div className="relative w-full h-3 bg-white/10 border border-white/10 rounded-full overflow-hidden shadow-inner">

          {/* EDGE */}

          <div
            className="
              absolute top-0 left-0 h-3
              bg-gradient-to-r from-cyan-400 to-blue-400
              shadow-[0_0_14px_rgba(34,211,238,0.45)]
            "
            style={{ width: ${clamp(edge)}% }}
          />

          {/* RISK */}

          <div
            className="
              absolute top-0 left-0 h-3
              bg-gradient-to-r from-red-500/70 to-orange-400/70
            "
            style={{ width: ${clamp(risk)}% }}
          />

        </div>

        <div className="mt-2 flex items-center justify-between text-[11px]">

          <span className="font-bold text-cyan-200">
            EDGE: {edge.toFixed(1)}%
          </span>

          <span className="font-bold text-red-300">
            RISK: {risk}/100
          </span>

        </div>

        <div className="mt-2 text-[11px] font-bold text-cyan-200">
          AI dominance: {edge > risk ? "EDGE" : "RISK"}
        </div>

      </div>

      {/* =========================
          METRICS GRID
      ========================= */}

      <div className="mt-4 grid grid-cols-3 gap-3">

        <div className="rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3 shadow-inner">

          <p className="text-[10px] uppercase tracking-wider text-slate-100 font-bold">
            AI Edge
          </p>

          <div className="mt-2 relative w-full h-2 bg-white/10 border border-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_10px_rgba(34,211,238,0.45)]"
              style={{ width: ${clamp(edge)}% }}
            />

          </div>

          <p className="mt-2 text-lg font-black text-cyan-300">
            {edge ? +${edge.toFixed(1)}% : "—"}
          </p>

        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3 shadow-inner">

          <p className="text-[10px] uppercase tracking-wider text-slate-100 font-bold">
            Implied
          </p>

          <div className="mt-2 relative w-full h-2 bg-white/10 border border-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-orange-400 to-yellow-300 shadow-[0_0_10px_rgba(251,191,36,0.35)]"
              style={{ width: ${clamp(implied)}% }}
            />

          </div>

          <p className="mt-2 text-lg font-black text-orange-300">
            {implied ? ${implied.toFixed(1)}% : "—"}
          </p>

        </div>

        <div className="rounded-xl border border-cyan-400/10 bg-[#0B1220] p-3 shadow-inner">

          <p className="text-[10px] uppercase tracking-wider text-slate-100 font-bold">
            Risk
          </p>

          <div className="mt-2 relative w-full h-2 bg-white/10 border border-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-400 shadow-[0_0_10px_rgba(239,68,68,0.35)]"
              style={{ width: ${clamp(risk)}% }}
            />

          </div>

          <p className="mt-2 text-lg font-black text-red-300">
            {risk}/100
          </p>

        </div>

      </div>

      {/* =========================
          AI REASONING
      ========================= */}

      <div className="mt-4 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-[#0B1220] to-[#0E1A2B] p-3">

        <p className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
          AI Reasoning
        </p>

        <p className="mt-2 text-sm text-slate-200 leading-6">
          {data.explanation || "AI analysis unavailable."}
        </p>

      </div>

      {/* =========================
          CTA
      ========================= */}

      <a
        href={data.bookmakerUrl || "#"}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="
          mt-5 flex w-full items-center justify-center
          rounded-xl border border-cyan-400/30
          bg-gradient-to-r from-cyan-500/10 to-blue-500/10
          px-4 py-3 text-sm font-bold text-cyan-300
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
        <p className="mt-3 text-[11px] text-slate-400">
          {data.disclaimer}
        </p>
      )}

    </article>
  );
}