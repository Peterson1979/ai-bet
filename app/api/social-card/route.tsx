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

  const valueLabel =
    Number(valueDiff) >= 0 ? `+${Number(valueDiff).toFixed(2)}%` : `${Number(valueDiff).toFixed(2)}%`;

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
          background:
            "radial-gradient(circle at top left, #1d4ed8 0, #020617 40%), radial-gradient(circle at bottom right, #22c55e 0, #020617 45%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Felső rész: logó + liga + meccs + idő */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 8, color: "#22d3ee" }}>
            MATCH<span style={{ color: "#38bdf8" }}>SIGNAL</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 16px",
              borderRadius: 999,
              backgroundColor: "#0f172a",
              border: "1px solid #38bdf8",
              fontSize: 22,
            }}
          >
            <span style={{ fontSize: 22 }}>🏆</span>
            <span style={{ fontWeight: 700 }}>{league}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 8,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.05 }}>{homeTeam}</div>
            </div>

            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: "#22d3ee",
                textShadow: "0 0 24px rgba(56,189,248,0.6)",
              }}
            >
              VS
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ fontSize: 56, fontWeight: 900, textAlign: "right", lineHeight: 1.05 }}>
                {awayTeam}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 8,
              fontSize: 22,
              color: "#cbd5e1",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              📅 <span>{startTime}</span>
            </span>
          </div>
        </div>

        {/* Középső rész: 3 fő blokk */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 32,
          }}
        >
          {/* PICK */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              padding: 24,
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              border: "2px solid rgba(56,189,248,0.6)",
              boxShadow: "0 18px 60px rgba(56,189,248,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8", marginBottom: 12 }}>
              PICK
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#22c55e", lineHeight: 1.2 }}>
              {prediction}
            </div>
          </div>

          {/* VALUE SIGNAL */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              padding: 24,
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              border: "2px solid rgba(34,197,94,0.7)",
              boxShadow: "0 18px 60px rgba(34,197,94,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#4ade80", marginBottom: 12 }}>
              VALUE SIGNAL
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#4ade80" }}>{valueLabel}</div>
            <div style={{ marginTop: 6, fontSize: 18, color: "#a5b4fc" }}>Positive edge</div>
          </div>

          {/* RISK TIER */}
          <div
            style={{
              flex: 1,
              borderRadius: 24,
              padding: 24,
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              border: "2px solid rgba(250,204,21,0.7)",
              boxShadow: "0 18px 60px rgba(250,204,21,0.35)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fde68a", marginBottom: 12 }}>
              RISK TIER
            </div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#fde68a" }}>
              {riskTier.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Alsó rész: based on + CTA + slogan */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 32,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#cbd5e1",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span>👥</span>
            <span>
              Based on{" "}
              <span style={{ fontWeight: 800, color: "#e5e7eb" }}>{bookmakerCount}</span> bookmakers
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 999,
                padding: "16px 28px",
                background:
                  "linear-gradient(90deg, #22c55e 0%, #a3e635 40%, #38bdf8 100%)",
                color: "#022c22",
                fontSize: 24,
                fontWeight: 900,
                textAlign: "center",
                boxShadow: "0 20px 80px rgba(56,189,248,0.6)",
              }}
            >
              GET MORE AI PICKS
            </div>

            <div
              style={{
                fontSize: 18,
                color: "#cbd5e1",
                textAlign: "right",
              }}
            >
              <div style={{ fontWeight: 800 }}>MATCHSIGNAL</div>
              <div>Free AI Betting Tips – Football, NBA, Tennis & More</div>
            </div>
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