import { ImageResponse } from "next/og";

export const runtime = "edge";

function qp(v: string | null, fallback = "") {
  return v ?? fallback;
}

function formatValueDiff(valueDiff: string) {
  const n = Number(valueDiff);
  if (Number.isNaN(n)) return valueDiff;
  return n >= 0 ? `+${n.toFixed(2)}%` : `${n.toFixed(2)}%`;
}

function formatRiskTier(riskTier: string) {
  return riskTier ? riskTier.toUpperCase() : "MEDIUM";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const league = qp(searchParams.get("league"), "FIFA WORLD CUP");
  const homeTeam = qp(searchParams.get("homeTeam"), "HOME TEAM");
  const awayTeam = qp(searchParams.get("awayTeam"), "AWAY TEAM");
  const prediction = qp(searchParams.get("prediction"), "Pick");
  const valueDiff = qp(searchParams.get("valueDiff"), "0.00");
  const riskTier = qp(searchParams.get("riskTier"), "Medium");
  const startTime = qp(searchParams.get("startTime"), "");
  const bookmakerCount = qp(searchParams.get("bookmakerCount"), "0");

  const valueLabel = formatValueDiff(valueDiff);
  const riskLabel = formatRiskTier(riskTier);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1080px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #07101d 0%, #0b1324 55%, #08111f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "54px",
        }}
      >
        {/* háttér glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "rgba(34, 211, 238, 0.16)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-140px",
            right: "-100px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "rgba(59, 130, 246, 0.14)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "260px",
            left: "60px",
            right: "60px",
            height: "1px",
            background: "rgba(56, 189, 248, 0.22)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "720px",
            left: "60px",
            right: "60px",
            height: "1px",
            background: "rgba(56, 189, 248, 0.18)",
            display: "flex",
          }}
        />

        {/* content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: "#f8fafc",
                letterSpacing: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              MATCH
              <span style={{ color: "#38bdf8", marginLeft: "8px", display: "flex" }}>
                SIGNAL
              </span>
            </div>

            <div
              style={{
                marginTop: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 24px",
                borderRadius: "999px",
                border: "1px solid rgba(56,189,248,0.45)",
                background: "rgba(12, 22, 40, 0.9)",
                color: "#93c5fd",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {league}
            </div>
          </div>

          {/* Match row */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div
                style={{
                  width: "420px",
                  minHeight: "112px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "24px",
                  border: "1px solid rgba(56,189,248,0.28)",
                  background: "rgba(9, 18, 34, 0.92)",
                  color: "#ffffff",
                  fontSize: 56,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  padding: "20px",
                }}
              >
                {homeTeam}
              </div>

              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "999px",
                  border: "2px solid rgba(56,189,248,0.45)",
                  background: "linear-gradient(180deg, #0d1b31 0%, #0b1528 100%)",
                  color: "#38bdf8",
                  fontSize: 42,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                VS
              </div>

              <div
                style={{
                  width: "420px",
                  minHeight: "112px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "24px",
                  border: "1px solid rgba(56,189,248,0.28)",
                  background: "rgba(9, 18, 34, 0.92)",
                  color: "#ffffff",
                  fontSize: 56,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  padding: "20px",
                }}
              >
                {awayTeam}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 24,
                color: "#cbd5e1",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {startTime}
            </div>
          </div>

          {/* Stat cards */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "18px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                width: "312px",
                borderRadius: "26px",
                border: "2px solid rgba(56,189,248,0.36)",
                background: "linear-gradient(180deg, rgba(13,24,43,0.98) 0%, rgba(9,17,31,0.98) 100%)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: "#38bdf8",
                  fontWeight: 800,
                  letterSpacing: 1,
                  display: "flex",
                }}
              >
                PICK
              </div>
              <div
                style={{
                  marginTop: "16px",
                  fontSize: 28,
                  color: "#facc15",
                  fontWeight: 900,
                  lineHeight: 1.12,
                  display: "flex",
                }}
              >
                {prediction}
              </div>
            </div>

            <div
              style={{
                width: "312px",
                borderRadius: "26px",
                border: "2px solid rgba(250,204,21,0.32)",
                background: "linear-gradient(180deg, rgba(13,24,43,0.98) 0%, rgba(9,17,31,0.98) 100%)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: "#f8d34f",
                  fontWeight: 800,
                  letterSpacing: 1,
                  display: "flex",
                }}
              >
                VALUE SIGNAL
              </div>
              <div
                style={{
                  marginTop: "16px",
                  fontSize: 46,
                  color: "#facc15",
                  fontWeight: 900,
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {valueLabel}
              </div>
            </div>

            <div
              style={{
                width: "312px",
                borderRadius: "26px",
                border: "2px solid rgba(251,191,36,0.34)",
                background: "linear-gradient(180deg, rgba(13,24,43,0.98) 0%, rgba(9,17,31,0.98) 100%)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: "#fde68a",
                  fontWeight: 800,
                  letterSpacing: 1,
                  display: "flex",
                }}
              >
                RISK TIER
              </div>
              <div
                style={{
                  marginTop: "16px",
                  fontSize: 40,
                  color: "#facc15",
                  fontWeight: 900,
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {riskLabel}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "18px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(56,189,248,0.28)",
                fontSize: 22,
                color: "#dbeafe",
                fontWeight: 700,
              }}
            >
              BASED ON {bookmakerCount} BOOKMAKERS
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "999px",
                padding: "20px 28px",
                background: "linear-gradient(90deg, #facc15 0%, #fde047 100%)",
                color: "#0b1220",
                fontSize: 34,
                fontWeight: 900,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              GET MORE AI PICKS
            </div>

            <div
              style={{
                fontSize: 28,
                color: "#c7d2fe",
                fontWeight: 700,
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Free AI Betting Tips – Football, NBA, Tennis & More
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