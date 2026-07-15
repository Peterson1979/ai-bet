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

function getLeagueIcon(league: string) {
  const l = league.toLowerCase();

  if (
    l.includes("nba") ||
    l.includes("basketball") ||
    l.includes("euroleague")
  ) return "🏀";

  if (
    l.includes("tennis") ||
    l.includes("atp") ||
    l.includes("wta") ||
    l.includes("us open") ||
    l.includes("wimbledon")
  ) return "🎾";

  if (
    l.includes("mlb") ||
    l.includes("baseball")
  ) return "⚾";

  if (
    l.includes("nhl") ||
    l.includes("hockey")
  ) return "🏒";

  if (
    l.includes("ufc") ||
    l.includes("mma") ||
    l.includes("boxing") ||
    l.includes("fight")
  ) return "🥊";

  if (
    l.includes("soccer") ||
    l.includes("football") ||
    l.includes("fifa") ||
    l.includes("premier league") ||
    l.includes("champions league") ||
    l.includes("la liga") ||
    l.includes("serie a") ||
    l.includes("bundesliga")
  ) return "⚽";

  return "🏆";
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
  const leagueIcon = getLeagueIcon(league);

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
          background: "linear-gradient(180deg, #040913 0%, #0a1424 45%, #08111f 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          padding: "38px",
        }}
      >
        {/* outer frame */}
        <div
          style={{
            position: "absolute",
            inset: "16px",
            borderRadius: "34px",
            border: "1px solid rgba(56,189,248,0.18)",
            boxShadow: "0 0 0 1px rgba(125,211,252,0.04)",
            display: "flex",
          }}
        />

        {/* top glow line */}
        <div
          style={{
            position: "absolute",
            top: "18px",
            left: "120px",
            right: "120px",
            height: "2px",
            background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(56,189,248,0.85) 50%, rgba(0,0,0,0) 100%)",
            display: "flex",
          }}
        />

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
            border: "1px solid rgba(56,189,248,0.14)",
            background: "linear-gradient(180deg, rgba(7,14,27,0.98) 0%, rgba(8,16,31,0.98) 100%)",
            padding: "34px",
          }}
        >
          {/* header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "28px",
                border: "1px solid rgba(56,189,248,0.24)",
                background: "linear-gradient(180deg, rgba(10,19,35,1) 0%, rgba(7,13,24,1) 100%)",
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 18px 35px rgba(0,0,0,0.30)",
              }}
            >
              <div
                style={{
                  fontSize: 76,
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
                <span
                  style={{
                    marginLeft: "8px",
                    color: "#38bdf8",
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
                  padding: "12px 24px",
                  border: "1px solid rgba(56,189,248,0.32)",
                  background: "linear-gradient(180deg, #13233e 0%, #0d182c 100%)",
                  color: "#dbeafe",
                  fontSize: 24,
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
                }}
              >
                <span style={{ display: "flex", fontSize: 24 }}>{leagueIcon}</span>
                <span style={{ display: "flex" }}>{league}</span>
              </div>
            </div>
          </div>

          {/* matchup */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "28px",
                border: "1px solid rgba(56,189,248,0.22)",
                background: "linear-gradient(180deg, rgba(9,18,34,0.98) 0%, rgba(7,14,26,0.98) 100%)",
                padding: "22px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 18px 34px rgba(0,0,0,0.26)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "space-between",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "390px",
                    minHeight: "118px",
                    borderRadius: "24px",
                    border: "1px solid rgba(56,189,248,0.20)",
                    background: "linear-gradient(180deg, #142746 0%, #0c172b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: 52,
                    fontWeight: 900,
                    lineHeight: 1.05,
                    padding: "18px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  {homeTeam}
                </div>

                <div
                  style={{
                    width: "132px",
                    minHeight: "118px",
                    borderRadius: "30px",
                    border: "1px solid rgba(56,189,248,0.28)",
                    background: "linear-gradient(180deg, #183662 0%, #10213d 60%, #0b1629 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7dd3fc",
                    fontSize: 42,
                    fontWeight: 900,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  VS
                </div>

                <div
                  style={{
                    width: "390px",
                    minHeight: "118px",
                    borderRadius: "24px",
                    border: "1px solid rgba(56,189,248,0.20)",
                    background: "linear-gradient(180deg, #142746 0%, #0c172b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: 52,
                    fontWeight: 900,
                    lineHeight: 1.05,
                    padding: "18px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
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
                  textAlign: "center",
                  fontSize: 24,
                  color: "#dbeafe",
                  fontWeight: 700,
                }}
              >
                {startTime}
              </div>
            </div>
          </div>

          {/* stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              marginTop: "2px",
            }}
          >
            <div
              style={{
                width: "298px",
                borderRadius: "28px",
                border: "1px solid rgba(56,189,248,0.24)",
                background: "linear-gradient(180deg, rgba(20,33,58,0.98) 0%, rgba(12,23,42,0.98) 100%)",
                padding: "20px",
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
                  border: "1px solid rgba(56,189,248,0.20)",
                  background: "linear-gradient(180deg, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0.06) 100%)",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  color: "#7dd3fc",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              >
                PICK
              </div>

              <div
                style={{
                  marginTop: "18px",
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
                borderRadius: "28px",
                border: "1px solid rgba(250,204,21,0.22)",
                background: "linear-gradient(180deg, rgba(27,33,50,0.98) 0%, rgba(15,22,38,0.98) 100%)",
                padding: "20px",
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
                  border: "1px solid rgba(250,204,21,0.20)",
                  background: "linear-gradient(180deg, rgba(250,204,21,0.16) 0%, rgba(250,204,21,0.06) 100%)",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  color: "#fde68a",
                  fontSize: 18,
                  fontWeight: 800,
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
                  color: "#facc15",
                  display: "flex",
                  lineHeight: 1,
                }}
              >
                {valueLabel}
              </div>
            </div>

            <div
              style={{
                width: "298px",
                borderRadius: "28px",
                border: "1px solid rgba(250,204,21,0.22)",
                background: "linear-gradient(180deg, rgba(27,33,50,0.98) 0%, rgba(15,22,38,0.98) 100%)",
                padding: "20px",
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
                  border: "1px solid rgba(250,204,21,0.20)",
                  background: "linear-gradient(180deg, rgba(250,204,21,0.16) 0%, rgba(250,204,21,0.06) 100%)",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  color: "#fde68a",
                  fontSize: 18,
                  fontWeight: 800,
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
                  color: "#facc15",
                  display: "flex",
                  lineHeight: 1,
                }}
              >
                {riskLabel}
              </div>
            </div>
          </div>

          {/* footer */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(56,189,248,0.22)",
                background: "linear-gradient(180deg, rgba(12,22,40,1) 0%, rgba(10,18,34,1) 100%)",
                padding: "12px 22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#dbeafe",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              BASED ON {bookmakerCount} BOOKMAKERS
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "999px",
                border: "1px solid rgba(253,224,71,0.34)",
                background: "linear-gradient(180deg, #fef08a 0%, #facc15 52%, #eab308 100%)",
                padding: "10px",
                display: "flex",
                boxShadow: "0 14px 26px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "999px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0) 100%)",
                  padding: "18px 26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  color: "#111827",
                  fontSize: 34,
                  fontWeight: 900,
                  textAlign: "center",
                }}
              >
                <span style={{ display: "flex" }}>GET MORE AI PICKS</span>
                <span style={{ display: "flex", fontSize: 30 }}>→</span>
              </div>
            </div>

            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: "#dbeafe",
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
      emoji: "twemoji",
    }
  );
}