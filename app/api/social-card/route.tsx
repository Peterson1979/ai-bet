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
          background: "linear-gradient(180deg, #050b16 0%, #0a1323 45%, #08111f 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          padding: "44px",
        }}
      >
        {/* felső fénycsík */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "70px",
            right: "70px",
            height: "2px",
            background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(56,189,248,0.9) 50%, rgba(0,0,0,0) 100%)",
            display: "flex",
          }}
        />

        {/* külső fényes keret */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            borderRadius: "34px",
            border: "1px solid rgba(56,189,248,0.22)",
            display: "flex",
          }}
        />

        {/* belső panel */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "28px",
            border: "1px solid rgba(56,189,248,0.18)",
            background: "linear-gradient(180deg, rgba(8,16,30,0.94) 0%, rgba(7,14,26,0.96) 100%)",
            padding: "38px",
            boxShadow: "0 0 0 1px rgba(125,211,252,0.06)",
          }}
        >
          {/* HEADER */}
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
                width: "100%",
                borderRadius: "26px",
                border: "1px solid rgba(56,189,248,0.28)",
                background: "linear-gradient(180deg, rgba(10,19,35,0.98) 0%, rgba(7,13,24,0.98) 100%)",
                padding: "22px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 14px 30px rgba(0,0,0,0.28)",
              }}
            >
              <div
                style={{
                  fontSize: 74,
                  fontWeight: 900,
                  letterSpacing: 1,
                  color: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                }}
              >
                MATCH
                <span
                  style={{
                    color: "#38bdf8",
                    marginLeft: "8px",
                    display: "flex",
                  }}
                >
                  SIGNAL
                </span>
              </div>

              <div
                style={{
                  marginTop: "18px",
                  borderRadius: "999px",
                  padding: "10px 22px",
                  border: "1px solid rgba(56,189,248,0.35)",
                  background: "linear-gradient(180deg, rgba(15,27,48,1) 0%, rgba(11,21,39,1) 100%)",
                  color: "#93c5fd",
                  fontSize: 24,
                  fontWeight: 800,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {league}
              </div>
            </div>
          </div>

          {/* MATCH PANEL */}
          <div
            style={{
              marginTop: "22px",
              width: "100%",
              borderRadius: "28px",
              border: "1px solid rgba(56,189,248,0.22)",
              background: "linear-gradient(180deg, rgba(9,18,34,0.98) 0%, rgba(7,14,26,0.98) 100%)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 16px 34px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "392px",
                  minHeight: "118px",
                  borderRadius: "24px",
                  border: "1px solid rgba(56,189,248,0.22)",
                  background: "linear-gradient(180deg, #11213d 0%, #0b1629 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "18px",
                  fontSize: 54,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: "#ffffff",
                  boxShadow: "0 10px 18px rgba(0,0,0,0.22)",
                }}
              >
                {homeTeam}
              </div>

              <div
                style={{
                  width: "128px",
                  minHeight: "118px",
                  borderRadius: "28px",
                  border: "1px solid rgba(56,189,248,0.34)",
                  background: "linear-gradient(180deg, #153056 0%, #0b1a30 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                  fontWeight: 900,
                  color: "#7dd3fc",
                  boxShadow: "0 0 0 1px rgba(56,189,248,0.1)",
                }}
              >
                VS
              </div>

              <div
                style={{
                  width: "392px",
                  minHeight: "118px",
                  borderRadius: "24px",
                  border: "1px solid rgba(56,189,248,0.22)",
                  background: "linear-gradient(180deg, #11213d 0%, #0b1629 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "18px",
                  fontSize: 54,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: "#ffffff",
                  boxShadow: "0 10px 18px rgba(0,0,0,0.22)",
                }}
              >
                {awayTeam}
              </div>
            </div>

            <div
              style={{
                marginTop: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 24,
                fontWeight: 700,
                color: "#dbeafe",
              }}
            >
              {startTime}
            </div>
          </div>

          {/* STATS */}
          <div
            style={{
              marginTop: "22px",
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "298px",
                borderRadius: "26px",
                border: "1px solid rgba(56,189,248,0.24)",
                background: "linear-gradient(180deg, #12213b 0%, #0c172a 100%)",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  background: "linear-gradient(180deg, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.08) 100%)",
                  border: "1px solid rgba(56,189,248,0.16)",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#7dd3fc",
                  letterSpacing: 1,
                }}
              >
                PICK
              </div>

              <div
                style={{
                  marginTop: "20px",
                  fontSize: 30,
                  fontWeight: 900,
                  lineHeight: 1.12,
                  color: "#fcd34d",
                  display: "flex",
                }}
              >
                {prediction}
              </div>
            </div>

            <div
              style={{
                width: "298px",
                borderRadius: "26px",
                border: "1px solid rgba(245,158,11,0.24)",
                background: "linear-gradient(180deg, #1a2135 0%, #111827 100%)",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  background: "linear-gradient(180deg, rgba(250,204,21,0.18) 0%, rgba(250,204,21,0.08) 100%)",
                  border: "1px solid rgba(250,204,21,0.16)",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fde68a",
                  letterSpacing: 1,
                }}
              >
                VALUE SIGNAL
              </div>

              <div
                style={{
                  marginTop: "16px",
                  fontSize: 48,
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#facc15",
                  display: "flex",
                }}
              >
                {valueLabel}
              </div>
            </div>

            <div
              style={{
                width: "298px",
                borderRadius: "26px",
                border: "1px solid rgba(234,179,8,0.22)",
                background: "linear-gradient(180deg, #1a2135 0%, #111827 100%)",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 14px 28px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  background: "linear-gradient(180deg, rgba(250,204,21,0.16) 0%, rgba(250,204,21,0.07) 100%)",
                  border: "1px solid rgba(250,204,21,0.14)",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fde68a",
                  letterSpacing: 1,
                }}
              >
                RISK TIER
              </div>

              <div
                style={{
                  marginTop: "16px",
                  fontSize: 40,
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#facc15",
                  display: "flex",
                }}
              >
                {riskLabel}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              marginTop: "22px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(56,189,248,0.22)",
                background: "linear-gradient(180deg, rgba(12,22,40,0.98) 0%, rgba(10,18,34,0.98) 100%)",
                padding: "12px 24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 22,
                fontWeight: 800,
                color: "#dbeafe",
                textAlign: "center",
              }}
            >
              BASED ON {bookmakerCount} BOOKMAKERS
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "999px",
                border: "1px solid rgba(250,204,21,0.34)",
                background: "linear-gradient(180deg, #fde047 0%, #facc15 100%)",
                padding: "22px 30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#111827",
                fontSize: 34,
                fontWeight: 900,
                boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
              }}
            >
              GET MORE AI PICKS
            </div>

            <div
              style={{
                marginTop: "4px",
                fontSize: 30,
                fontWeight: 800,
                color: "#dbeafe",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
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