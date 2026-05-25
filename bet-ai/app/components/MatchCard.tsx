"use client";

type AIData = {
  prediction: string;
  confidence: number;
  risk: "low" | "medium" | "high";
  reasoning: string;
  alternativeTip?: string;
  summary: string;
};

type Props = {
  home: string;
  away: string;
  league: string;
  data: AIData;
};

function riskColor(risk: string) {
  if (risk === "low") return "#22c55e";
  if (risk === "medium") return "#f59e0b";
  return "#ef4444";
}

export default function MatchCard({
  home,
  away,
  league,
  data,
}: Props) {
  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: 16,
        padding: 16,
        border: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div>
        <div style={{ fontSize: 12, opacity: 0.6 }}>{league}</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>
          {home} vs {away}
        </div>
      </div>

      <div
        style={{
          padding: 12,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 12,
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.6 }}>AI VERDICT</div>
        <div style={{ fontWeight: 800 }}>{data.prediction}</div>
        <div style={{ fontSize: 13, opacity: 0.7 }}>
          Confidence: {data.confidence}%
        </div>
      </div>

      <div style={{ fontSize: 13, opacity: 0.85 }}>
        <div style={{ fontSize: 12, opacity: 0.6 }}>WHY</div>
        {data.reasoning}
      </div>

      <div>
        <span style={{ opacity: 0.6, fontSize: 12 }}>Risk: </span>
        <span
          style={{
            color: riskColor(data.risk),
            fontWeight: 800,
          }}
        >
          {data.risk.toUpperCase()}
        </span>
      </div>

      {data.alternativeTip && (
        <div style={{ fontSize: 13, opacity: 0.8 }}>
          Safer option: {data.alternativeTip}
        </div>
      )}

      <div style={{ fontSize: 12, opacity: 0.5 }}>
        {data.summary}
      </div>

      <a
        href="#affiliate"
        style={{
          marginTop: 8,
          padding: "10px 14px",
          background: "#22c55e",
          color: "#000",
          fontWeight: 800,
          borderRadius: 10,
          textAlign: "center",
          textDecoration: "none",
        }}
      >
        BET NOW
      </a>
    </div>
  );
}