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

function normalizeLabel(text: string): string {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[()\-–—/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shouldHideMarket(prediction: string, market: string): boolean {
  const p = normalizeLabel(prediction);
  const m = normalizeLabel(market);

  if (!p || !m) return false;
  if (p === m) return true;
  if (p.includes(m) || m.includes(p)) return true;

  return false;
}

function fitTeamName(name: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = name.trim();

  if (clean.length <= 12) return { text: clean, fontSize: 50, lineHeight: 1.03 };
  if (clean.length <= 18) return { text: clean, fontSize: 44, lineHeight: 1.04 };
  if (clean.length <= 24) return { text: clean, fontSize: 38, lineHeight: 1.05 };
  return { text: clean, fontSize: 33, lineHeight: 1.07 };
}

function fitLeagueName(name: string): { text: string; fontSize: number } {
  const clean = name.trim();

  if (clean.length <= 18) return { text: clean, fontSize: 31 };
  if (clean.length <= 28) return { text: clean, fontSize: 27 };
  if (clean.length <= 38) return { text: clean, fontSize: 23 };
  return { text: clean, fontSize: 20 };
}

function fitPrediction(prediction: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = prediction.trim();

  if (clean.length <= 14) return { text: clean, fontSize: 31, lineHeight: 1.08 };
  if (clean.length <= 22) return { text: clean, fontSize: 27, lineHeight: 1.1 };
  if (clean.length <= 34) return { text: clean, fontSize: 23, lineHeight: 1.12 };
  return { text: clean, fontSize: 20, lineHeight: 1.14 };
}

function fitMarket(text: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = text.trim();

  if (clean.length <= 18) return { text: clean, fontSize: 22, lineHeight: 1.08 };
  if (clean.length <= 28) return { text: clean, fontSize: 19, lineHeight: 1.1 };
  return { text: clean, fontSize: 17, lineHeight: 1.12 };
}

function fitWhy(text: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = text.trim();

  if (clean.length <= 54) return { text: clean, fontSize: 18, lineHeight: 1.2 };
  if (clean.length <= 84) return { text: clean, fontSize: 16, lineHeight: 1.22 };
  return { text: clean, fontSize: 15, lineHeight: 1.24 };
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
      return { text: "#86efac", border: "rgba(134,239,172,0.32)" };
    case "medium":
      return { text: "#fde68a", border: "rgba(253,230,138,0.32)" };
    default:
      return { text: "#fca5a5", border: "rgba(252,165,165,0.32)" };
  }
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
        flex: 1,
        borderRadius: "20px",
        border: `1px solid ${accent}33`,
        background: "linear-gradient(180deg, rgba(20,33,58,0.98) 0%, rgba(12,23,42,0.98) 100%)",
        padding: "14px 10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "94px",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: 0.8,
          color: accent,
          display: "flex",
          textAlign: "center",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "8px",
          fontSize: 28,
          fontWeight: 900,
          lineHeight: 1.03,
          color: "#f8fafc",
          display: "flex",
          textAlign: "center",
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
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

  const partnerOdds = qp(searchParams.get("partnerOdds"), "");
  const marketAverageOdds = qp(searchParams.get("marketAverageOdds"), "");
  const fairOdds = qp(searchParams.get("fairOdds"), "");
  const fairProbability = qp(searchParams.get("fairProbability"), "");
  const estimatedValuePct = qp(searchParams.get("estimatedValuePct"), "");

  const why1 = qp(searchParams.get("why1"), "");
  const why2 = qp(searchParams.get("why2"), "");

  const leagueIcon = getLeagueIcon(league);
  const riskColors = getRiskColors(riskTier);

  const leagueFit = fitLeagueName(league);
  const homeFit = fitTeamName(homeTeam);
  const awayFit = fitTeamName(awayTeam);
  const predictionFit = fitPrediction(prediction);

  const hideMarketLine = shouldHideMarket(prediction, market);
  const displayMarket = hideMarketLine ? "" : market;
  const marketFit = fitMarket(displayMarket || " ");

  const whyLines = [why1, why2].filter(Boolean).slice(0, 2);
  const whyFits = whyLines.map((line) => fitWhy(line));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(180deg, #040913 0%, #0a1424 45%, #08111f 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            borderRadius: "28px",
            border: "1px solid rgba(56,189,248,0.18)",
            background: "linear-gradient(180deg, rgba(7,14,27,0.98) 0%, rgba(8,16,31,0.98) 100%)",
            padding: "16px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              paddingTop: "2px",
              paddingBottom: "2px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 900,
                letterSpacing: 2.6,
                lineHeight: 1,
                color: "#f8fafc",
                textAlign: "center",
              }}
            >
              MATCHSIGNAL
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 3.2,
                color: "#7dd3fc",
                textAlign: "center",
              }}
            >
              FREE AI PICKS
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <div style={{ fontSize: 30, display: "flex" }}>{leagueIcon}</div>
            <div
              style={{
                fontSize: leagueFit.fontSize,
                fontWeight: 900,
                color: "#dbeafe",
                display: "flex",
                textAlign: "center",
              }}
            >
              {leagueFit.text}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              borderRadius: "24px",
              border: "1px solid rgba(56,189,248,0.22)",
              background: "linear-gradient(180deg, rgba(9,18,34,0.98) 0%, rgba(7,14,26,0.98) 100%)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minHeight: "110px",
                  borderRadius: "20px",
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
                  padding: "14px",
                }}
              >
                {homeFit.text}
              </div>

              <div
                style={{
                  width: "100px",
                  minHeight: "110px",
                  borderRadius: "24px",
                  border: "1px solid rgba(56,189,248,0.28)",
                  background: "linear-gradient(180deg, #183662 0%, #10213d 60%, #0b1629 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7dd3fc",
                  fontSize: 34,
                  fontWeight: 900,
                }}
              >
                VS
              </div>

              <div
                style={{
                  flex: 1,
                  minHeight: "110px",
                  borderRadius: "20px",
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
                  padding: "14px",
                }}
              >
                {awayFit.text}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                fontSize: 20,
                color: "#dbeafe",
                fontWeight: 700,
              }}
            >
              {startTime || "Upcoming event"}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              borderRadius: "24px",
              border: "1px solid rgba(56,189,248,0.22)",
              background: "linear-gradient(180deg, rgba(10,19,35,1) 0%, rgba(7,13,24,1) 100%)",
              padding: "16px 18px",
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
                color: "#7dd3fc",
                letterSpacing: 1.1,
                display: "flex",
              }}
            >
              PICK
            </div>

            <div
              style={{
                marginTop: "8px",
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

            {!hideMarketLine ? (
              <div
                style={{
                  marginTop: "6px",
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
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <MetricCard label="PARTNER ODDS" value={formatOdds(partnerOdds)} accent="#7dd3fc" />
            <MetricCard label="MARKET AVG" value={formatOdds(marketAverageOdds)} accent="#c4b5fd" />
            <MetricCard label="EST. VALUE" value={formatPercent(estimatedValuePct, true)} accent="#facc15" />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <MetricCard label="FAIR ODDS" value={formatOdds(fairOdds)} accent="#93c5fd" />
            <MetricCard label="FAIR PROB." value={formatPercent(fairProbability)} accent="#a7f3d0" />
            <div
              style={{
                flex: 1,
                borderRadius: "20px",
                border: `1px solid ${riskColors.border}`,
                background: "linear-gradient(180deg, rgba(20,33,58,0.98) 0%, rgba(12,23,42,0.98) 100%)",
                padding: "14px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: "94px",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  color: riskColors.text,
                  display: "flex",
                }}
              >
                RISK
              </div>
              <div
                style={{
                  marginTop: "8px",
                  fontSize: 28,
                  fontWeight: 900,
                  lineHeight: 1.03,
                  color: riskColors.text,
                  display: "flex",
                  textAlign: "center",
                }}
              >
                {riskTier.toUpperCase()}
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              borderRadius: "22px",
              border: "1px solid rgba(56,189,248,0.20)",
              background: "linear-gradient(180deg, rgba(9,18,34,0.98) 0%, rgba(7,14,26,0.98) 100%)",
              padding: "16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minHeight: whyFits.length > 1 ? "122px" : "100px",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: "#67e8f9",
                letterSpacing: 1,
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
                    gap: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      color: "#67e8f9",
                      fontSize: 16,
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
                  fontSize: 16,
                  lineHeight: 1.22,
                  display: "flex",
                }}
              >
                Market context and AI ranking support this pick.
              </div>
            )}
          </div>

          <div
            style={{
              borderRadius: "999px",
              border: "1px solid rgba(253,224,71,0.34)",
              background: "linear-gradient(180deg, #fef08a 0%, #facc15 52%, #eab308 100%)",
              padding: "5px",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "100%",
                borderRadius: "999px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0) 100%)",
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: "#111827",
                fontSize: 21,
                fontWeight: 900,
                textAlign: "center",
              }}
            >
              <span style={{ display: "flex" }}>MORE FREE PICKS AT MATCHSIGNAL</span>
              <span style={{ display: "flex", fontSize: 19 }}>→</span>
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