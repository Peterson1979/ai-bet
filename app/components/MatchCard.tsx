"use client";

import { MatchCardData } from "../types/match";

type Props = {
  data: MatchCardData;
};

export default function MatchCard({ data }: Props) {
  return (
    <article
      style={{
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(15,23,42,0.92)",
        padding: 22,
        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      {/* TOP */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#22c55e",
            textTransform: "uppercase",
          }}
        >
          {data.sport} • {data.league}
        </div>

        <div
          style={{
            fontSize: 12,
            opacity: 0.7,
          }}
        >
          Confidence {data.confidence}%
        </div>
      </div>

      {/* MATCH */}
      <h3
        style={{
          fontSize: 24,
          fontWeight: 800,
          marginBottom: 6,
        }}
      >
        {data.eventName}
      </h3>

      <div
        style={{
          opacity: 0.65,
          fontSize: 14,
          marginBottom: 20,
        }}
      >
        {data.startTimeUtc}
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <div
          style={{
            background: "#111827",
            borderRadius: 16,
            padding: 14,
          }}
        >
          <div
            style={{
              fontSize: 11,
              opacity: 0.6,
              marginBottom: 6,
            }}
          >
            AI VERDICT
          </div>

          <div
            style={{
              fontWeight: 700,
            }}
          >
            {data.verdict}
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            borderRadius: 16,
            padding: 14,
          }}
        >
          <div
            style={{
              fontSize: 11,
              opacity: 0.6,
              marginBottom: 6,
            }}
          >
            RECOMMENDED BET
          </div>

          <div
            style={{
              fontWeight: 700,
            }}
          >
            {data.recommendedBet}
          </div>
        </div>
      </div>

      {/* RISK */}
      <div
        style={{
          marginTop: 14,
          background: "#111827",
          borderRadius: 16,
          padding: 14,
        }}
      >
        <div
          style={{
            fontSize: 11,
            opacity: 0.6,
            marginBottom: 6,
          }}
        >
          RISK SCORE
        </div>

        <div
          style={{
            fontWeight: 700,
          }}
        >
          {data.riskScore}/100
        </div>
      </div>

      {/* ANALYSIS */}
      <p
        style={{
          marginTop: 18,
          lineHeight: 1.7,
          opacity: 0.88,
          fontSize: 14,
        }}
      >
        {data.shortAnalysis}
      </p>

      {/* CTA */}
      <a
        href={data.ctaUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        style={{
          marginTop: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          background: "#22c55e",
          color: "#000",
          padding: "14px 18px",
          borderRadius: 14,
          fontWeight: 800,
          textDecoration: "none",
        }}
      >
        {data.ctaLabel}
      </a>

      {/* BOOKMAKER */}
      {data.bookmakerName && (
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          via {data.bookmakerName}
        </div>
      )}

      {/* DISCLAIMER */}
      {data.disclaimer && (
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            opacity: 0.45,
            lineHeight: 1.5,
          }}
        >
          {data.disclaimer}
        </div>
      )}
    </article>
  );
}