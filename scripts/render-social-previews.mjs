// scripts/render-social-previews.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { GET } from "../app/api/social-card/route.tsx";

const SCRATCH_DIR = "C:\\Users\\opeti\\.gemini\\antigravity-ide\\brain\\64ba10c3-7156-405a-9867-2a85d2430f39\\scratch";

console.log("\n==========================================");
console.log(" RENDERING 3 LOCAL PREVIEW CARDS ");
console.log("==========================================\n");

await fs.mkdir(SCRATCH_DIR, { recursive: true });

const fixtures = [
  {
    filename: "preview-1-arsenal-chelsea.png",
    params: {
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
      startTime: "Tomorrow, 19:45 UTC",
      reasoning: "High attacking volume and transition risk create exceptional mathematical EV.",
    },
  },
  {
    filename: "preview-2-monchengladbach-wolves.png",
    params: {
      league: "UEFA Conference League",
      homeTeam: "Borussia Monchengladbach",
      awayTeam: "Wolverhampton Wanderers",
      prediction: "BTTS & Over 2.5 Goals",
      market: "BTTS & Goals",
      riskTier: "High",
      bestOdds: "2.40",
      marketAverageOdds: "2.18",
      valueEdge: "10.1",
      booksSampled: "18",
      startTime: "Thursday, 20:00 UTC",
      reasoning: "Aggressive xG disparity and high variance profile indicate a strong pricing divergence.",
    },
  },
  {
    filename: "preview-3-celtics-warriors.png",
    params: {
      league: "NBA Basketball",
      homeTeam: "Boston Celtics",
      awayTeam: "Golden State Warriors",
      prediction: "Boston Celtics -4.5",
      market: "Point Spread",
      riskTier: "Medium",
      bestOdds: "1.91",
      marketAverageOdds: "1.85",
      valueEdge: "3.2",
      booksSampled: "14",
      startTime: "Tonight, 00:30 UTC",
      reasoning: "Pace differential and perimeter efficiency consensus favor the home team cover.",
    },
  },
];

const renderedPaths = [];

for (const fixture of fixtures) {
  const url = new URL("http://localhost:3000/api/social-card");
  Object.entries(fixture.params).forEach(([k, v]) => url.searchParams.set(k, v));

  const req = new Request(url.toString(), { method: "GET" });
  const response = await GET(req);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const targetPath = path.join(SCRATCH_DIR, fixture.filename);
  await fs.writeFile(targetPath, buffer);
  renderedPaths.push(targetPath);

  console.log(`✔ Rendered: ${fixture.filename} (${buffer.byteLength} bytes)`);
}

console.log("\nAll 3 preview images successfully rendered:");
renderedPaths.forEach((p) => console.log(`  -> ${p}`));
