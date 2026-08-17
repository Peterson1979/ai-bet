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
  if (clean.length <= 13) return { text: clean, fontSize: 56, lineHeight: 1.05 };
  if (clean.length <= 20) return { text: clean, fontSize: 46, lineHeight: 1.08 };
  if (clean.length <= 28) return { text: clean, fontSize: 38, lineHeight: 1.1 };
  return { text: clean.slice(0, 30), fontSize: 34, lineHeight: 1.12 };
}

function fitLeagueName(name: string): { text: string; fontSize: number } {
  const clean = name.trim();
  if (clean.length <= 18) return { text: clean, fontSize: 30 };
  if (clean.length <= 28) return { text: clean, fontSize: 26 };
  return { text: clean.slice(0, 30), fontSize: 22 };
}

function fitPrediction(prediction: string): { text: string; fontSize: number; lineHeight: number } {
  const clean = prediction.trim();
  if (clean.length <= 15) return { text: clean, fontSize: 50, lineHeight: 1.06 };
  if (clean.length <= 24) return { text: clean, fontSize: 42, lineHeight: 1.08 };
  if (clean.length <= 34) return { text: clean, fontSize: 36, lineHeight: 1.1 };
  return { text: clean.slice(0, 40), fontSize: 32, lineHeight: 1.12 };
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

function getRiskBadge(riskTier: string) {
  switch (riskTier.toLowerCase()) {
    case "low":
      return {
        label: "LOW RISK",
        emoji: "🟢",
        text: "#86efac",
        bg: "rgba(34,197,94,0.18)",
        border: "rgba(134,239,172,0.45)",
      };
    case "medium":
      return {
        label: "MEDIUM RISK",
        emoji: "🟡",
        text: "#fde68a",
        bg: "rgba(234,179,8,0.18)",
        border: "rgba(253,230,138,0.45)",
      };
    default:
      return {
        label: "HIGH RISK",
        emoji: "🔴",
        text: "#fca5a5",
        bg: "rgba(239,68,68,0.18)",
        border: "rgba(252,165,165,0.45)",
      };
  }
}

function cleanReasoningSnippet(text: string): string {
  if (!text || text.trim().length === 0) {
    return "Algorithmic market depth and mathematical EV consensus strongly support this position.";
  }
  const clean = text
    .replace(/[#*`_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length <= 115) return clean;
  return clean.slice(0, 112).trim() + "...";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const league = qp(searchParams.get("league"), "MATCHSIGNAL PRO");
  const homeTeam = qp(searchParams.get("homeTeam"), "Home Team");
  const awayTeam = qp(searchParams.get("awayTeam"), "Away Team");
  const prediction = qp(searchParams.get("prediction"), "Pick Recommendation");
  const market = qp(searchParams.get("market"), "Match Winner");
  const riskTier = qp(searchParams.get("riskTier"), "Medium");
  const startTime = qp(searchParams.get("startTime"), "Upcoming Fixture");

  // Primary and secondary metrics
  const bestOddsRaw = qp(searchParams.get("bestOdds") || searchParams.get("partnerOdds"), "");
  const marketAvgRaw = qp(searchParams.get("marketAverageOdds"), "");
  const valueEdgeRaw = qp(searchParams.get("valueEdge") || searchParams.get("estimatedValuePct"), "");
  const booksSampledRaw = qp(searchParams.get("booksSampled"), "12");

  const reasoningRaw = qp(
    searchParams.get("reasoning") || searchParams.get("why1") || "",
    ""
  );

  const leagueIcon = getLeagueIcon(league);
  const riskBadge = getRiskBadge(riskTier);

  const leagueFit = fitLeagueName(league);
  const homeFit = fitTeamName(homeTeam);
  const awayFit = fitTeamName(awayTeam);
  const predictionFit = fitPrediction(prediction);
  const reasoningSnippet = cleanReasoningSnippet(reasoningRaw);

  const formattedBestOdds = formatOdds(bestOddsRaw);
  const formattedMarketAvg = formatOdds(marketAvgRaw);
  const formattedValueEdge = formatPercent(valueEdgeRaw, true);
  const booksSampledLabel = isMissingNumericInput(booksSampledRaw)
    ? "12 Books"
    : `${booksSampledRaw} Books`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(180deg, #030712 0%, #06101f 45%, #040914 100%)",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          padding: "36px",
        }}
      >
        {/* Main Inner Card */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "36px",
            border: "2px solid rgba(56,189,248,0.3)",
            background: "linear-gradient(180deg, rgba(8,16,32,0.98) 0%, rgba(5,10,22,0.98) 100%)",
            padding: "38px 36px",
            boxShadow: "0 0 90px rgba(56,189,248,0.1)",
          }}
        >
          {/* 1. TOP BRAND & LEAGUE STRIP */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "18px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 46,
                fontWeight: 900,
                letterSpacing: 2.5,
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              MATCHSIGNAL
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 24px",
                borderRadius: "999px",
                background: "rgba(56,189,248,0.12)",
                border: "1.5px solid rgba(56,189,248,0.35)",
              }}
            >
              <span style={{ display: "flex", fontSize: 30 }}>{leagueIcon}</span>
              <span
                style={{
                  display: "flex",
                  fontSize: leagueFit.fontSize,
                  fontWeight: 800,
                  color: "#f1f5f9",
                }}
              >
                {leagueFit.text}
              </span>
            </div>
          </div>

          {/* 2. MATCH FIXTURE HERO */}
          <div
            style={{
              width: "100%",
              borderRadius: "30px",
              border: "1.5px solid rgba(56,189,248,0.25)",
              background: "linear-gradient(180deg, rgba(14,28,52,0.92) 0%, rgba(8,16,30,0.92) 100%)",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              {/* Home Team */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: homeFit.fontSize,
                  fontWeight: 900,
                  lineHeight: homeFit.lineHeight,
                  color: "#ffffff",
                  padding: "8px",
                }}
              >
                {homeFit.text}
              </div>

              {/* VS Badge */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "22px",
                  border: "1.5px solid rgba(56,189,248,0.45)",
                  background: "linear-gradient(180deg, #0f2b54 0%, #07162c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#38bdf8",
                  boxShadow: "0 0 30px rgba(56,189,248,0.25)",
                  flexShrink: 0,
                }}
              >
                VS
              </div>

              {/* Away Team */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: awayFit.fontSize,
                  fontWeight: 900,
                  lineHeight: awayFit.lineHeight,
                  color: "#ffffff",
                  padding: "8px",
                }}
              >
                {awayFit.text}
              </div>
            </div>

            {/* Event Timing */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                color: "#94a3b8",
                letterSpacing: 0.5,
              }}
            >
              📅 {startTime}
            </div>
          </div>

          {/* 3. PRIMARY DECISION HERO (PICK & BEST ODDS) */}
          <div
            style={{
              width: "100%",
              borderRadius: "30px",
              border: "2px solid rgba(56,189,248,0.5)",
              background: "linear-gradient(180deg, #102544 0%, #091526 100%)",
              padding: "24px 30px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 14px 40px rgba(0,0,0,0.45), 0 0 35px rgba(56,189,248,0.18)",
            }}
          >
            {/* Top Sub-row: Market & Risk Tier */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#38bdf8",
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                MARKET: {market}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 20px",
                  borderRadius: "999px",
                  background: riskBadge.bg,
                  border: `1.5px solid ${riskBadge.border}`,
                  fontSize: 28,
                  fontWeight: 900,
                  color: riskBadge.text,
                  letterSpacing: 0.6,
                }}
              >
                <span style={{ display: "flex" }}>{riskBadge.emoji}</span>
                <span style={{ display: "flex" }}>{riskBadge.label}</span>
              </div>
            </div>

            {/* Main Row: AI Pick and Best Odds */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Left: AI Recommendation */}
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <span
                  style={{
                    display: "flex",
                    fontSize: 24,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  AI Signal Pick
                </span>
                <span
                  style={{
                    display: "flex",
                    marginTop: "6px",
                    fontSize: predictionFit.fontSize,
                    fontWeight: 900,
                    lineHeight: predictionFit.lineHeight,
                    color: "#fcd34d",
                  }}
                >
                  {predictionFit.text}
                </span>
              </div>

              {/* Right: Best Odds */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    fontSize: 24,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                  }}
                >
                  Best Odds
                </span>
                <span
                  style={{
                    display: "flex",
                    fontSize: 80,
                    fontWeight: 900,
                    lineHeight: 1,
                    color: "#34d399",
                    textShadow: "0 0 35px rgba(52,211,153,0.45)",
                    marginTop: "4px",
                  }}
                >
                  {formattedBestOdds || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* 4. SECONDARY INTELLIGENCE GRID (3 CLEAN BOLD METRICS) */}
          <div
            style={{
              display: "flex",
              gap: "18px",
              width: "100%",
            }}
          >
            {/* Value Edge */}
            <div
              style={{
                flex: 1,
                borderRadius: "24px",
                border: "1.5px solid rgba(52,211,153,0.35)",
                background: "linear-gradient(180deg, rgba(16,36,52,0.95) 0%, rgba(8,20,32,0.95) 100%)",
                padding: "20px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: "#34d399",
                  textTransform: "uppercase",
                }}
              >
                Value Edge
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "8px",
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#34d399",
                  lineHeight: 1,
                }}
              >
                {formattedValueEdge}
              </div>
            </div>

            {/* Market Average */}
            <div
              style={{
                flex: 1,
                borderRadius: "24px",
                border: "1.5px solid rgba(196,181,253,0.35)",
                background: "linear-gradient(180deg, rgba(26,30,56,0.95) 0%, rgba(12,16,34,0.95) 100%)",
                padding: "20px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: "#c4b5fd",
                  textTransform: "uppercase",
                }}
              >
                Market Avg
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "8px",
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#f8fafc",
                  lineHeight: 1,
                }}
              >
                {formattedMarketAvg || "—"}
              </div>
            </div>

            {/* Books Sampled */}
            <div
              style={{
                flex: 1,
                borderRadius: "24px",
                border: "1.5px solid rgba(56,189,248,0.35)",
                background: "linear-gradient(180deg, rgba(14,32,56,0.95) 0%, rgba(8,16,32,0.95) 100%)",
                padding: "20px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: "#38bdf8",
                  textTransform: "uppercase",
                }}
              >
                Books
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "8px",
                  fontSize: 44,
                  fontWeight: 900,
                  color: "#e2e8f0",
                  lineHeight: 1,
                }}
              >
                {booksSampledLabel}
              </div>
            </div>
          </div>

          {/* 5. AI ANALYSIS SNIPPET */}
          <div
            style={{
              width: "100%",
              borderRadius: "24px",
              border: "1.5px solid rgba(56,189,248,0.22)",
              background: "rgba(6,12,24,0.92)",
              padding: "20px 26px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 1.2,
                color: "#38bdf8",
                textTransform: "uppercase",
              }}
            >
              ⚡ AI Analysis & Context
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 34,
                color: "#cbd5e1",
                lineHeight: 1.35,
                fontWeight: 600,
              }}
            >
              {reasoningSnippet}
            </div>
          </div>

          {/* 6. FOOTER CTA & RESPONSIBLE GAMBLING */}
          <div
            style={{
              width: "100%",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)",
              padding: "18px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 10px 35px rgba(14,165,233,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: 0.5,
              }}
            >
              📊 MatchSignal.pro
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 800,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: 0.5,
              }}
            >
              18+ • Bet Responsibly
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      emoji: "twemoji",
    }
  );
}