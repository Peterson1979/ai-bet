import { ImageResponse } from "next/og";

export const runtime = "edge";

function qp(v: string | null, fallback = "") {
  return v ?? fallback;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const league = qp(searchParams.get("league"), "FIFA World Cup");
  const homeTeam = qp(searchParams.get("homeTeam"), "Home Team");
  const awayTeam = qp(searchParams.get("awayTeam"), "Away Team");
  const prediction = qp(searchParams.get("prediction"), "Pick");
  const valueDiff = qp(searchParams.get("valueDiff"), "0.00");
  const riskTier = qp(searchParams.get("riskTier"), "Medium");
  const startTime = qp(searchParams.get("startTime"), "");
  const bookmakerCount = qp(searchParams.get("bookmakerCount"), "0");

  const valueNumber = Number(valueDiff);
  const valueLabel =
    Number.isNaN(valueNumber)
      ? valueDiff
      : valueNumber >= 0
        ? `+${valueNumber.toFixed(2)}%`
        : `${valueNumber.toFixed(2)}%`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1080px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08111f",
          color: "#ffffff",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#22d3ee",
              letterSpacing: 2,
              display: "flex",
            }}
          >
            MATCHSIGNAL
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#93c5fd",
              display: "flex",
            }}
          >
            {league}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                fontSize: 58,
                fontWeight: 800,
                maxWidth: "390px",
                display: "flex",
                lineHeight: 1.1,
              }}
            >
              {homeTeam}
            </div>

            <div
              style={{
                fontSize: 42,
                fontWeight: 800,
                color: "#22d3ee",
                display: "flex",
              }}
            >
              VS
            </div>

            <div
              style={{
                fontSize: 58,
                fontWeight: 800,
                maxWidth: "390px",
                display: "flex",
                justifyContent: "flex-end",
                textAlign: "right",
                lineHeight: 1.1,
              }}
            >
              {awayTeam}
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#cbd5e1",
              display: "flex",
            }}
          >
            {startTime}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "300px",
              background: "#0f172a",
              border: "2px solid #22d3ee",
              borderRadius: "24px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 700, display: "flex" }}>
              PICK
            </div>
            <div style={{ fontSize: 34, color: "#84cc16", fontWeight: 800, display: "flex" }}>
              {prediction}
            </div>
          </div>

          <div
            style={{
              width: "300px",
              background: "#0f172a",
              border: "2px solid #22c55e",
              borderRadius: "24px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ fontSize: 20, color: "#4ade80", fontWeight: 700, display: "flex" }}>
              VALUE SIGNAL
            </div>
            <div style={{ fontSize: 34, color: "#4ade80", fontWeight: 800, display: "flex" }}>
              {valueLabel}
            </div>
          </div>

          <div
            style={{
              width: "300px",
              background: "#0f172a",
              border: "2px solid #facc15",
              borderRadius: "24px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div style={{ fontSize: 20, color: "#fde68a", fontWeight: 700, display: "flex" }}>
              RISK TIER
            </div>
            <div style={{ fontSize: 34, color: "#fde68a", fontWeight: 800, display: "flex" }}>
              {riskTier.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 22, color: "#cbd5e1", display: "flex" }}>
            Based on {bookmakerCount} bookmakers
          </div>

          <div
            style={{
              background: "#84cc16",
              color: "#0f172a",
              borderRadius: "999px",
              padding: "18px 24px",
              fontSize: 30,
              fontWeight: 800,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            GET MORE AI PICKS
          </div>

          <div style={{ fontSize: 20, color: "#93c5fd", display: "flex" }}>
            Free AI Betting Tips – Football, NBA, Tennis & More
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}