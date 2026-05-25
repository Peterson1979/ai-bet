"use client";

type Props = {
  slug: string;
  league: string;
  home: string;
  away: string;
  prediction: string;
  confidence: number;
  odds?: number;
  analysis?: string;
};

type Risk = {
  label: "Low risk" | "Medium risk" | "High risk" | "Unknown";
  color: string;
};

function getRisk(conf: number, odds?: number): Risk {
  if (!odds) {
    return {
      label: "Unknown",
      color: "#94a3b8",
    };
  }

  const implied = 100 / odds;
  const edge = conf - implied;

  if (edge >= 8) {
    return {
      label: "Low risk",
      color: "#22c55e",
    };
  }

  if (edge >= 0) {
    return {
      label: "Medium risk",
      color: "#f59e0b",
    };
  }

  return {
    label: "High risk",
    color: "#ef4444",
  };
}

function getConfidenceLabel(conf: number) {
  if (conf >= 80) return "Strong AI signal";
  if (conf >= 65) return "Moderate AI signal";
  return "Weak signal";
}

export default function MatchCard({
  slug,
  league,
  home,
  away,
  prediction,
  confidence,
  odds,
  analysis,
}: Props) {
  const risk = getRisk(confidence, odds);

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #0f172a, #0b1220)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      {/* HEADER */}
      <div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>{league}</div>

        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>
          {home} <span style={{ opacity: 0.6 }}>vs</span> {away}
        </div>
      </div>

      {/* AI BLOCK */}
      <div
        style={{
          padding: 12,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.6 }}>
          AI PREDICTION
        </div>

        <div style={{ fontWeight: 700, marginTop: 4 }}>
          {prediction}
        </div>

        <div style={{ marginTop: 4, fontSize: 13, opacity: 0.8 }}>
          {getConfidenceLabel(confidence)} · {confidence}%
        </div>
      </div>

      {/* ANALYSIS */}
      <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.4 }}>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>
          SHORT ANALYSIS
        </div>

        {analysis ||
          `${home} shows stronger statistical form compared to ${away}.`}
      </div>

      {/* METRICS */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          fontSize: 12,
        }}
      >
        <div>
          <div style={{ opacity: 0.6 }}>Confidence</div>
          <div style={{ fontWeight: 700 }}>{confidence}%</div>
        </div>

        <div>
          <div style={{ opacity: 0.6 }}>Risk</div>
          <div style={{ fontWeight: 700, color: risk.color }}>
            {risk.label}
          </div>
        </div>

        <div>
          <div style={{ opacity: 0.6 }}>Odds</div>
          <div style={{ fontWeight: 700 }}>
            {odds ?? "N/A"}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <a
          href={`#bet-${slug}`}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "10px 12px",
            background: "#22c55e",
            color: "#000",
            fontWeight: 800,
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          BET NOW
        </a>

        <a
          href={`/predictions/${slug}`}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "10px 12px",
            background: "rgba(255,255,255,0.05)",
            color: "#e5e7eb",
            fontWeight: 600,
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          DETAILS
        </a>
      </div>
    </div>
  );
}