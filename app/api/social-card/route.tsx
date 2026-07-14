import { ImageResponse } from "next/og";

export const runtime = "edge";

function qp(v: string | null, fallback = "") {
  return v ?? fallback;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const league = qp(searchParams.get("league"), "MatchSignal");
  const homeTeam = qp(searchParams.get("homeTeam"), "Home");
  const awayTeam = qp(searchParams.get("awayTeam"), "Away");
  const prediction = qp(searchParams.get("prediction"), "Pick");
  const market = qp(searchParams.get("market"), "Market");
  const odds = qp(searchParams.get("odds"), "0.00");
  const valueDiff = qp(searchParams.get("valueDiff"), "0.00");
  const riskTier = qp(searchParams.get("riskTier"), "Medium");
  const startTime = qp(searchParams.get("startTime"), "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1080px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(180deg, #0b1220 0%, #111827 100%)",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#7dd3fc", fontWeight: 700, letterSpacing: 1 }}>
            MATCHSIGNAL
          </div>

          <div style={{ marginTop: 24, fontSize: 22, color: "#93c5fd" }}>
            {league}
          </div>

          <div style={{ marginTop: 24, fontSize: 58, fontWeight: 800, lineHeight: 1.05 }}>
            {homeTeam}
          </div>

          <div style={{ marginTop: 8, marginBottom: 8, fontSize: 34, color: "#94a3b8" }}>
            vs
          </div>

          <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.05 }}>
            {awayTeam}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            ["Pick", prediction],
            ["Odds", odds],
            ["Value Signal", `+${valueDiff}%`],
            ["Risk Tier", riskTier],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                width: "468px",
                display: "flex",
                flexDirection: "column",
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: 20,
                padding: 24,
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8" }}>{label}</div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 34,
                  fontWeight: 800,
                  color: label === "Value Signal" ? "#22c55e" : "#ffffff",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, color: "#cbd5e1" }}>{market}</div>
            <div style={{ marginTop: 8, fontSize: 20, color: "#94a3b8" }}>{startTime}</div>
          </div>
          <div style={{ fontSize: 18, color: "#64748b" }}>Free AI betting analysis</div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}