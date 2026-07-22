import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

function qp(v: string | null, fallback = ""): string {
  return v ?? fallback;
}

function isMissingNumericInput(value: string): boolean {
  return value.trim() === "";
}

function formatPercent(value: string, withPlus = false): string {
  if (isMissingNumericInput(value)) return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return value || "—";
  const prefix = withPlus && n > 0 ? "+" : "";
  return `${prefix}${n.toFixed(1)}%`;
}

function formatOdds(value: string): string {
  if (isMissingNumericInput(value)) return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return value || "—";
  return n.toFixed(2);
}

function fitTeamName(name: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = name.trim();

  if (clean.length <= 12) return { text: clean, fontSize: 50, lineHeight: 1.05 };
  if (clean.length <= 18) return { text: clean, fontSize: 44, lineHeight: 1.06 };
  if (clean.length <= 24) return { text: clean, fontSize: 38, lineHeight: 1.08 };
  return { text: clean, fontSize: 32, lineHeight: 1.1 };
}

function fitLeagueName(name: string): { text: string; fontSize: number } {
  const clean = name.trim();

  if (clean.length <= 18) return { text: clean, fontSize: 38 };
  if (clean.length <= 28) return { text: clean, fontSize: 34 };
  if (clean.length <= 38) return { text: clean, fontSize: 28 };
  return { text: clean, fontSize: 24 };
}

function fitPrediction(prediction: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = prediction.trim();

  if (clean.length <= 14) return { text: clean, fontSize: 28, lineHeight: 1.12 };
  if (clean.length <= 22) return { text: clean, fontSize: 24, lineHeight: 1.12 };
  if (clean.length <= 34) return { text: clean, fontSize: 20, lineHeight: 1.14 };
  return { text: clean, fontSize: 18, lineHeight: 1.15 };
}

function fitMarket(text: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = text.trim();

  if (clean.length <= 18) return { text: clean, fontSize: 22, lineHeight: 1.12 };
  if (clean.length <= 28) return { text: clean, fontSize: 19, lineHeight: 1.13 };
  return { text: clean, fontSize: 17, lineHeight: 1.14 };
}

function fitWhy(text: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = text.trim();

  if (clean.length <= 54) return { text: clean, fontSize: 19, lineHeight: 1.22 };
  if (clean.length <= 84) return { text: clean, fontSize: 17, lineHeight: 1.24 };
  return { text: clean, fontSize: 15, lineHeight: 1.25 };
}

function getLeagueIcon(league: string): string {
  const l = league.toLowerCase();

  if (l.includes("nba") || l.includes("basketball") || l.includes("euroleague")) return "🏀";
  if (l.includes("tennis") || l.includes("atp") || l.includes("wta") || l.includes("us open") || l.includes("wimbledon")) return "🎾";
  if (l.includes("mlb") || l.includes("baseball")) return "⚾";
  if (l.includes("nhl") || l.includes("hockey")) return "🏒";
  if (l.includes("ufc") || l.includes("mma") || l.includes("boxing") || l.includes("fight")) return "🥊";
  if (
    l.includes("soccer") ||
    l.includes("football") ||
    l.includes("fifa") ||
    l.includes("premier league") ||
    l.includes("champions league") ||
    l.includes("la liga") ||
    l.includes("serie a") ||
    l.includes("bundesliga")
  ) {
    return "⚽";
  }

  return "🏆";
}

function getRiskColors(riskTier: string) {
  switch (riskTier.toLowerCase()) {
    case "low":
      return {
        text: "#86efac",
        border: "rgba(74,222,128,0.35)",
        bg: "linear-gradient(180deg, rgba(22,101,52,0.28) 0%, rgba(6,78,59,0.22) 100%)",
      };
    case "medium":
      return {
        text: "#fde68a",
        border: "rgba(250,204,21,0.35)",
        bg: "linear-gradient(180deg, rgba(133,77,14,0.28) 0%, rgba(113,63,18,0.22) 100%)",
      };
    default:
      return {
        text: "#fca5a5",
        border: "rgba(248,113,113,0.35)",
        bg: "linear-gradient(180deg, rgba(127,29,29,0.30) 0%, rgba(69,10,10,0.24) 100%)",
      };
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const league = qp(searchParams.get("league"), "MATCHSIGNAL");
  const homeTeam = qp(searchParams.get("homeTeam"), "HOME TEAM");
  const awayTeam = qp(searchParams.get("awayTeam"), "AWAY TEAM");
  const prediction = qp(searchParams.get("prediction"), "Pick");
  const market = qp(searchParams.get("market"), "Market");
  const riskTier = qp(searchParams.get("riskTier"), "Medium");
  const startTime = qp(searchParams.get("startTime"), "");
  const bookmakerCount = qp(searchParams.get("bookmakerCount"), "0");

  const partnerOdds = qp(searchParams.get("partnerOdds"), "");
  const marketAverageOdds = qp(searchParams.get("marketAverageOdds"), "");
  const fairOdds = qp(searchParams.get("fairOdds"), "");
  const fairProbability = qp(searchParams.get("fairProbability"), "");
  const estimatedValuePct = qp(searchParams.get("estimatedValuePct"), "");
  const consensusImpliedProb = qp(searchParams.get("consensusImpliedProb"), "");
  const bookmakerSpreadPct = qp(searchParams.get("bookmakerSpreadPct"), "");

  const why1 = qp(searchParams.get("why1"), "");
  const why2 = qp(searchParams.get("why2"), "");

  const leagueIcon = getLeagueIcon(league);
  const riskColors = getRiskColors(riskTier);

  const leagueFit = fitLeagueName(league);
  const homeFit = fitTeamName(homeTeam);
  const awayFit = fitTeamName(awayTeam);
  const predictionFit = fitPrediction(prediction);
  const marketFit = fitMarket(market);

  const whyLines = [why1, why2].filter(Boolean).slice(0, 2);
  const whyFits = whyLines.map((line) => fitWhy(line));

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
          padding: "36px",
        }}
      >
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

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "28px",
            border: "1px solid rgba(56,189,248,0.14)",
            background: "linear-gradient(180deg, rgba(7,14,27,0.98) 0%, rgba(8,16,31,0.98) 100%)",
            padding: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ fontSize: 34 }}>{leagueIcon}</div>
              <div
                style={{
                  fontSize: leagueFit.fontSize,
                  fontWeight: 900,
                  color: "#dbeafe",
                  display: "flex",
                }}
              >
                {leagueFit.text}
              </div>
            </div>

            <div
              style={{
                borderRadius: "999px",
                border: `1px solid ${riskColors.border}`,
                background: riskColors.bg,
                color: riskColors.text,
                padding: "10px 18px",
                fontSize: 22,
                fontWeight: 900,
                display: "flex",
              }}
            >
              {riskTier.toUpperCase()} RISK
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "26px",
                border: "1px solid rgba(56,189,248,0.22)",
                background: "linear-gradient(180deg, rgba(9,18,34,0.98) 0%, rgba(7,14,26,0.98) 100%)",
                padding: "20px",
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
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "390px",
                    minHeight: "110px",
                    borderRadius: "22px",
                    border: "1px solid rgba(56,189,248,0.20)",
                    background: "linear-gradient(180deg, #142746 0%, #0c172b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: homeFit.fontSize,
                    fontWeight: 900,
                    lineHeight: homeFit.lineHeight,
                    padding: "18px",
                  }}
                >
                  {homeFit.text}
                </div>

                <div
                  style={{
                    width: "120px",
                    minHeight: "110px",
                    borderRadius: "28px",
                    border: "1px solid rgba(56,189,248,0.28)",
                    background: "linear-gradient(180deg, #183662 0%, #10213d 60%, #0b1629 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7dd3fc",
                    fontSize: 38,
                    fontWeight: 900,
                  }}
                >
                  VS
                </div>

                <div
                  style={{
                    width: "390px",
                    minHeight: "110px",
                    borderRadius: "22px",
                    border: "1px solid rgba(56,189,248,0.20)",
                    background: "linear-gradient(180deg, #142746 0%, #0c172b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#ffffff",
                    fontSize: awayFit.fontSize,
                    fontWeight: 900,
                    lineHeight: awayFit.lineHeight,
                    padding: "18px",
                  }}
                >
                  {awayFit.text}
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: 22,
                  color: "#dbeafe",
                  fontWeight: 700,
                }}
              >
                {startTime}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "26px",
                border: "1px solid rgba(56,189,248,0.22)",
                background: "linear-gradient(180deg, rgba(10,19,35,1) 0%, rgba(7,13,24,1) 100%)",
                padding: "18px 22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#7dd3fc",
                  letterSpacing: 1.2,
                  display: "flex",
                }}
              >
                PICK
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: predictionFit.fontSize,
                  fontWeight: 900,
                  lineHeight: predictionFit.lineHeight,
                  color: "#fcd34d",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                {predictionFit.text}
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: marketFit.fontSize,
                  fontWeight: 700,
                  lineHeight: marketFit.lineHeight,
                  color: "#dbeafe",
                  display: "flex",
                  textAlign: "center",
                }}
              >
                {marketFit.text}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <MetricCard label="PARTNER ODDS" value={formatOdds(partnerOdds)} accent="#7dd3fc" />
            <MetricCard label="MARKET AVERAGE" value={formatOdds(marketAverageOdds)} accent="#c4b5fd" />
            <MetricCard label="ESTIMATED VALUE" value={formatPercent(estimatedValuePct, true)} accent="#facc15" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <MetricCard label="FAIR ODDS" value={formatOdds(fairOdds)} accent="#93c5fd" />
            <MetricCard label="FAIR PROBABILITY" value={formatPercent(fairProbability)} accent="#a7f3d0" />
            <MetricCard label="BOOKMAKERS" value={bookmakerCount || "0"} accent="#fca5a5" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <MetricCard
              label="MARKET CONSENSUS"
              value={formatPercent(consensusImpliedProb)}
              accent="#67e8f9"
            />
            <MetricCard
              label="VS MARKET AVERAGE"
              value={formatPercent(bookmakerSpreadPct, true)}
              accent="#f9a8d4"
            />
            <MetricCard label="RISK" value={riskTier.toUpperCase()} accent={riskColors.text} />
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: "24px",
              border: "1px solid rgba(56,189,248,0.20)",
              background: "linear-gradient(180deg, rgba(9,18,34,0.98) 0%, rgba(7,14,26,0.98) 100%)",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#67e8f9",
                  letterSpacing: 1.1,
                  display: "flex",
                }}
              >
                WHY THIS SIGNAL
              </div>

              {whyFits.length > 0 ? (
                whyFits.map((item, idx) => (
                  <div
                    key={`why-${idx}`}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        color: "#67e8f9",
                        fontSize: 18,
                        marginTop: "1px",
                        display: "flex",
                      }}
                    >
                      •
                    </div>
                    <div
                      style={{
                        color: "#e2e8f0",
                        fontSize: item.fontSize,
                        lineHeight: item.lineHeight,
                        display: "flex",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: 18,
                    lineHeight: 1.25,
                    display: "flex",
                  }}
                >
                  Market context and AI ranking support this pick.
                </div>
              )}
            </div>

            <div
              style={{
                marginTop: "14px",
                borderRadius: "999px",
                border: "1px solid rgba(253,224,71,0.34)",
                background: "linear-gradient(180deg, #fef08a 0%, #facc15 52%, #eab308 100%)",
                padding: "6px",
                display: "flex",
                boxShadow: "0 14px 26px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0) 100%)",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "#111827",
                  fontSize: 22,
                  fontWeight: 900,
                  textAlign: "center",
                }}
              >
                <span style={{ display: "flex" }}>MORE AI PICKS AT MATCHSIGNAL</span>
                <span style={{ display: "flex", fontSize: 20 }}>→</span>
              </div>
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

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      style={{
        width: "318px",
        borderRadius: "24px",
        border: `1px solid ${accent}33`,
        background: "linear-gradient(180deg, rgba(20,33,58,0.98) 0%, rgba(12,23,42,0.98) 100%)",
        padding: "18px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 1,
          color: accent,
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "12px",
          fontSize: 34,
          fontWeight: 900,
          lineHeight: 1.05,
          color: "#f8fafc",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}