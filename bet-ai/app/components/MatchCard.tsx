"use client";

type Props = {
  home: string;
  away: string;
  league: string;
  prediction: string;
  analysis: string;
  risk: string;
  alternativeTip?: string;
  slug: string;
};

export default function MatchCard({
  home,
  away,
  league,
  prediction,
  analysis,
  risk,
  alternativeTip,
  slug,
}: Props) {
  return (
    <div
      style={{
        background: "#0f172a",
        padding: 16,
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* MATCH */}
      <div style={{ fontSize: 18, fontWeight: 800 }}>
        {home} vs {away}
      </div>

      <div style={{ opacity: 0.6, fontSize: 13 }}>{league}</div>

      {/* AI PICK */}
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12, opacity: 0.6 }}>AI PREDICTION</div>
        <div style={{ fontWeight: 800 }}>{prediction}</div>
      </div>

      {/* ANALYSIS */}
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12, opacity: 0.6 }}>SHORT ANALYSIS</div>
        <div style={{ fontSize: 13 }}>{analysis}</div>
      </div>

      {/* RISK */}
      <div style={{ marginTop: 10 }}>
        <b>Risk:</b> {risk}
      </div>

      {/* OPTIONAL */}
      {alternativeTip && (
        <div style={{ marginTop: 6, opacity: 0.8 }}>
          Safer option: {alternativeTip}
        </div>
      )}

      {/* CTA */}
      <a
        href={`/affiliate/${slug}`}
        style={{
          display: "inline-block",
          marginTop: 12,
          padding: "10px 14px",
          background: "#22c55e",
          color: "#000",
          borderRadius: 8,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        BET NOW
      </a>
    </div>
  );
}