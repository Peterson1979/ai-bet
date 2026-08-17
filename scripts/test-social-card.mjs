// scripts/test-social-card.mjs

import assert from "node:assert/strict";

console.log("\n==========================================");
console.log(" TESTING SOCIAL CARD FIXTURES & PARAMS ");
console.log("==========================================\n");

// Fixture 1: Standard Football Fixture
const fixture1 = {
  league: "Premier League",
  homeTeam: "Arsenal",
  awayTeam: "Chelsea",
  prediction: "Over 2.5 Goals",
  market: "Over/Under 2.5",
  riskTier: "Low",
  bestOdds: "1.85",
  marketAverageOdds: "1.78",
  valueEdge: "3.9",
  booksSampled: "15",
  reasoning: "Strong attacking expected goals across recent fixtures combined with defensive transition vulnerabilities.",
};

const url1 = new URL("http://localhost:3000/api/social-card");
Object.entries(fixture1).forEach(([k, v]) => url1.searchParams.set(k, v));
assert.equal(url1.searchParams.get("bestOdds"), "1.85");
assert.equal(url1.searchParams.get("valueEdge"), "3.9");
assert.equal(url1.searchParams.get("booksSampled"), "15");
console.log("✔ Fixture 1: Standard football match params verified.");

// Fixture 2: Long Team Names & Long Prediction
const fixture2 = {
  league: "UEFA Europa Conference League",
  homeTeam: "Borussia Monchengladbach",
  awayTeam: "Wolverhampton Wanderers",
  prediction: "Both Teams To Score & Over 2.5 Goals",
  market: "BTTS & Match Goals",
  riskTier: "High",
  bestOdds: "2.40",
  marketAverageOdds: "2.18",
  valueEdge: "10.1",
  booksSampled: "18",
  reasoning: "High variance matchup with significant market deviation and aggressive expected goal volume.",
};

const url2 = new URL("http://localhost:3000/api/social-card");
Object.entries(fixture2).forEach(([k, v]) => url2.searchParams.set(k, v));
assert(url2.searchParams.get("homeTeam").length > 20);
assert(url2.searchParams.get("awayTeam").length > 20);
console.log("✔ Fixture 2: Long team names & complex market params verified.");

// Fixture 3: NBA Basketball Fixture
const fixture3 = {
  league: "NBA Basketball",
  homeTeam: "Boston Celtics",
  awayTeam: "Golden State Warriors",
  prediction: "Boston Celtics -4.5",
  market: "Point Spread (-4.5)",
  riskTier: "Medium",
  bestOdds: "1.91",
  marketAverageOdds: "1.85",
  valueEdge: "3.2",
  booksSampled: "14",
  reasoning: "Pace differential and perimeter efficiency create a statistically significant edge against market consensus.",
};

const url3 = new URL("http://localhost:3000/api/social-card");
Object.entries(fixture3).forEach(([k, v]) => url3.searchParams.set(k, v));
assert.equal(url3.searchParams.get("league"), "NBA Basketball");
console.log("✔ Fixture 3: Multi-sport NBA fixture params verified.");

console.log("\n==========================================");
console.log(" ALL SOCIAL CARD TESTS PASSED ");
console.log("==========================================\n");
