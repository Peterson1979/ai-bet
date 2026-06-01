// app/lib/getPredictions.ts
import "server-only";
import fs from "fs";
import path from "path";

// ======================
// MOCK KAPCSOLÓ
// .env.local-ban: USE_MOCK=true → nem hívja az API-kat
// Fejlesztés alatt tartsd true-n, production előtt false
// ======================
const USE_MOCK = process.env.USE_MOCK === "true";

const MOCK_DATA = {
  date: new Date().toISOString().split("T")[0],
  generatedAt: new Date().toISOString(),
  sports: [
    {
      sport: "Football",
      hasMatches: true,
      topPicks: [
        {
          id: "mock-football-1",
          league: "FIFA World Cup",
          eventId: "mock-1",
          homeTeam: "Ecuador",
          awayTeam: "Germany",
          startTime: "2026-06-25T20:00:00Z",
          recommendedBet: "Under 4.5 Goals",
          betCode: "UNDER_4_5",
          explanation: "Low scoring match expected between Ecuador and Germany",
          confidence: 70,
          risk: 30,
          odds: 1.45,
          bestOdds: 1.45,
          oddsLabel: "Under 4.5 Goals @ 1.45",
          bookmaker: "Bet365",
          bookmakerUrl: "#",
          ctaLabel: "View Odds",
          isTopPick: true,
          status: "scheduled",
          marketType: "totals",
          selectionKey: "UNDER_4_5",
        },
      ],
    },
    {
      sport: "NBA",
      hasMatches: false,
      message: "No NBA events available today.",
      topPicks: [],
    },
    {
      sport: "NFL",
      hasMatches: true,
      topPicks: [
        {
          id: "mock-nfl-1",
          league: "NFL",
          eventId: "mock-nfl-1",
          homeTeam: "Baltimore Ravens",
          awayTeam: "New Orleans Saints",
          startTime: "2026-09-20T17:00:00Z",
          recommendedBet: "Moneyline",
          betCode: "MONEYLINE_HOME",
          explanation: "Ravens are strong favorites at home",
          confidence: 80,
          risk: 20,
          odds: 1.25,
          bestOdds: 1.25,
          oddsLabel: "Moneyline @ 1.25",
          bookmaker: "Bet365",
          bookmakerUrl: "#",
          ctaLabel: "View Odds",
          isTopPick: true,
          status: "scheduled",
          marketType: "h2h",
          selectionKey: "MONEYLINE_HOME",
        },
      ],
    },
    {
      sport: "Hockey",
      hasMatches: true,
      topPicks: [
        {
          id: "mock-hockey-1",
          league: "NHL",
          eventId: "mock-hockey-1",
          homeTeam: "Carolina Hurricanes",
          awayTeam: "Vegas Golden Knights",
          startTime: "2026-06-03T00:15:00Z",
          recommendedBet: "Moneyline",
          betCode: "AWAY_WIN",
          explanation: "Vegas has an edge in this matchup",
          confidence: 56,
          risk: 44,
          odds: 2.12,
          bestOdds: 2.12,
          oddsLabel: "Moneyline @ 2.12",
          bookmaker: "Bet365",
          bookmakerUrl: "#",
          ctaLabel: "View Odds",
          isTopPick: true,
          status: "scheduled",
          marketType: "h2h",
          selectionKey: "AWAY_WIN",
        },
      ],
    },
    {
      sport: "Tennis",
      hasMatches: true,
      topPicks: [
        {
          id: "mock-tennis-1",
          league: "ATP French Open",
          eventId: "mock-tennis-1",
          homeTeam: "Frances Tiafoe",
          awayTeam: "Matteo Arnaldi",
          startTime: "2026-06-01T15:00:00Z",
          recommendedBet: "Match Winner",
          betCode: "MATCH_WINNER_HOME",
          explanation: "Tiafoe has edge in odds",
          confidence: 60,
          risk: 40,
          odds: 2.0,
          bestOdds: 2.0,
          oddsLabel: "Match Winner @ 2.0",
          bookmaker: "Pinnacle",
          bookmakerUrl: "#",
          ctaLabel: "View Odds",
          isTopPick: true,
          status: "scheduled",
          marketType: "h2h",
          selectionKey: "MATCH_WINNER_HOME",
        },
      ],
    },
    {
      sport: "MLB",
      hasMatches: true,
      topPicks: [
        {
          id: "mock-mlb-1",
          league: "MLB",
          eventId: "mock-mlb-1",
          homeTeam: "Minnesota Twins",
          awayTeam: "Chicago White Sox",
          startTime: "2026-06-01T23:41:00Z",
          recommendedBet: "Moneyline",
          betCode: "MONEYLINE_HOME",
          explanation: "Twins have a clear edge at home",
          confidence: 60,
          risk: 40,
          odds: 1.67,
          bestOdds: 1.67,
          oddsLabel: "Moneyline @ 1.67",
          bookmaker: "Bet365",
          bookmakerUrl: "#",
          ctaLabel: "View Odds",
          isTopPick: true,
          status: "scheduled",
          marketType: "h2h",
          selectionKey: "MONEYLINE_HOME",
        },
      ],
    },
    {
      sport: "MMA",
      hasMatches: true,
      topPicks: [
        {
          id: "mock-mma-1",
          league: "MMA",
          eventId: "mock-mma-1",
          homeTeam: "Bo Nickal",
          awayTeam: "Kyle Daukaus",
          startTime: "2026-06-14T22:30:00Z",
          recommendedBet: "Under 2.5 Rounds",
          betCode: "UNDER_2_5_ROUNDS",
          explanation: "Nickal is strong favorite, likely early finish",
          confidence: 80,
          risk: 20,
          odds: 1.33,
          bestOdds: 1.33,
          oddsLabel: "Under 2.5 Rounds @ 1.33",
          bookmaker: "Pinnacle",
          bookmakerUrl: "#",
          ctaLabel: "View Odds",
          isTopPick: true,
          status: "scheduled",
          marketType: "h2h",
          selectionKey: "UNDER_2_5_ROUNDS",
        },
      ],
    },
  ],
};

export async function getPredictions() {
  // Mock mód — nem olvas fájlt, nem hívja az API-t
  if (USE_MOCK) {
    console.log("[getPredictions] MOCK MODE — using static data");
    return MOCK_DATA;
  }

  // Production: predictions.json olvasása
  const filePath = path.join(process.cwd(), "data", "predictions.json");

  if (!fs.existsSync(filePath)) {
    console.warn("[getPredictions] predictions.json not found — returning null");
    return null;
  }

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
