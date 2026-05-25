"use client";

import TrackLink from "./TrackLink";

type Props = {
  slug: string;
  league: string;
  home: string;
  away: string;
  prediction: string;
  confidence: number;
  odds?: number;
};

function getEdge(confidence: number, odds?: number) {
  if (!odds) return null;

  const implied = 100 / odds;
  const diff = confidence - implied;

  if (diff >= 8) return "VALUE BET";
  if (diff >= 0) return "FAIR VALUE";
  return "NO VALUE";
}

function labelPrediction(p: string) {
  const map: Record<string, string> = {
    BTTS: "Both Teams To Score",
    "Home Win": "Home Team Victory",
    "Away Win": "Away Team Victory",
    "Draw": "Draw",
  };

  return map[p] || p;
}

export default function MatchCard(props: Props) {
  const edge = getEdge(props.confidence, props.odds);

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: 14,
        padding: 16,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* MATCH HEADER */}
      <div style={{ fontWeight: 700, fontSize: 16 }}>
        {props.home} vs {props.away}
      </div>

      <div style={{ opacity: 0.6, fontSize: 13 }}>
        {props.league}
      </div>

      {/* AI PREDICTION */}
      <div style={{ marginTop: 10 }}>
        <b>AI Prediction:</b>{" "}
        {labelPrediction(props.prediction)} ({props.confidence}%)
      </div>

      {/* BOOKMAKER */}
      {props.odds && (
        <div style={{ marginTop: 6, fontSize: 13, opacity: 0.7 }}>
          Bookmaker Odds: {props.odds}
        </div>
      )}

      {/* EDGE */}
      {edge && (
        <div
          style={{
            marginTop: 8,
            fontWeight: 700,
            color:
              edge === "VALUE BET" ? "#22c55e" : "#f59e0b",
          }}
        >
          {edge}
        </div>
      )}

      {/* ACTIONS */}
      <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
        <TrackLink league={props.league} slug={props.slug}>
          Open Analysis
        </TrackLink>

        <a
          href="#"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #333",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Compare Odds
        </a>
      </div>
    </div>
  );
}