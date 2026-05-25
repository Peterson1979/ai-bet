export type Match = {
  slug: string;
  league: string;
};

const competitions = ["PL", "SA", "PD", "BL1", "CL"];

// fallback seed (soha nem maradhat üres az app)
const SEED_MATCHES: Match[] = [
  { slug: "arsenal-vs-chelsea", league: "Premier League" },
  { slug: "inter-vs-milan", league: "Serie A" },
  { slug: "barcelona-vs-sevilla", league: "La Liga" },
];

let cache: Match[] | null = null;
let lastFetch = 0;

export async function getMatches(): Promise<Match[]> {
  const now = Date.now();

  // 10 perc cache
  if (cache && now - lastFetch < 10 * 60 * 1000) {
    return cache;
  }

  const allMatches: Match[] = [];

  try {
    for (const code of competitions) {
      const res = await fetch(
        `https://api.football-data.org/v4/competitions/${code}/matches`,
        {
          headers: {
            "X-Auth-Token":
              process.env.FOOTBALL_DATA_API_KEY || "",
          },
        }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const matches = data.matches || [];

      for (const m of matches) {
        if (!m.homeTeam || !m.awayTeam) continue;

        const home = m.homeTeam.name;
        const away = m.awayTeam.name;

        const slug =
          home.toLowerCase().replace(/\s+/g, "-") +
          "-vs-" +
          away.toLowerCase().replace(/\s+/g, "-");

        allMatches.push({
          slug,
          league: data.competition?.name || code,
        });
      }
    }
  } catch {}

  // fallback ha API üres
  const result =
    allMatches.length > 0 ? allMatches : SEED_MATCHES;

  cache = result;
  lastFetch = now;

  return result;
}