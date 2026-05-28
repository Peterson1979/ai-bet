const API_KEY = process.env.ODDS_API_KEY;

if (!API_KEY) {
  throw new Error("Missing ODDS_API_KEY");
}

/**
 * Cache (in-memory)
 * Vercel cold startnál resetelődik, de MVP-re elég
 */
const cache = new Map<string, { data: OddsEvent[]; timestamp: number }>();

const CACHE_TTL = 1000 * 60 * 10; // 10 perc

const SPORTS = [
  { key: "soccer", label: "Football" },
  { key: "basketball_nba", label: "NBA" },
  { key: "americanfootball_nfl", label: "NFL" },
  { key: "icehockey_nhl", label: "Hockey" },
  { key: "tennis_atp", label: "Tennis" },
];

export type OddsEvent = {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  bookmaker?: string;
  odds?: number | null;
};

/**
 * Cache helpers
 */
function getCache(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache(key: string, data: OddsEvent[]) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Dedupe by event ID
 */
function dedupeEvents(events: OddsEvent[]) {
  const seen = new Set<string>();

  return events.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

/**
 * Value bet filter (simple heuristic)
 */
function isValueBet(event: OddsEvent) {
  if (!event.odds) return false;
  return event.odds >= 1.5 && event.odds <= 3.5;
}

/**
 * Core fetch per sport
 */
async function fetchSportEvents(
  sportKey: string,
  sportLabel: string
): Promise<OddsEvent[]> {
  const cacheKey = `odds_${sportKey}`;

  const cached = getCache(cacheKey);
  if (cached) return cached;

  try {
    const url =
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/` +
      `?apiKey=${API_KEY}` +
      `&regions=eu` +
      `&markets=h2h` +
      `&oddsFormat=decimal`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) return [];

    const data = await response.json();

    let events: OddsEvent[] = data.map((event: any) => {
      const bookmaker = event.bookmakers?.[0];
      const market = bookmaker?.markets?.[0];
      const outcomes = market?.outcomes || [];

      const homeOutcome = outcomes.find(
        (o: any) => o.name === event.home_team
      );

      return {
        id: event.id,
        sport: sportLabel,
        league: event.sport_title,
        homeTeam: event.home_team,
        awayTeam: event.away_team,
        commenceTime: event.commence_time,
        bookmaker: bookmaker?.title || "Unknown",
        odds: homeOutcome?.price ?? null,
      };
    });

    // pipeline
    events = dedupeEvents(events);
    events = events.filter(isValueBet);
    events = events.slice(0, 8);

    setCache(cacheKey, events);

    return events;
  } catch {
    return [];
  }
}

/**
 * Public API
 */
export async function getDailyEvents(): Promise<
  { sport: string; events: OddsEvent[] }[]
> {
  const results = await Promise.all(
    SPORTS.map((sport) =>
      fetchSportEvents(sport.key, sport.label)
    )
  );

  const flat = dedupeEvents(results.flat());

  return [
    {
      sport: "All",
      events: flat,
    },
  ];
}