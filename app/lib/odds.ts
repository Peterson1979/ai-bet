const API_KEY = process.env.ODDS_API_KEY;

if (!API_KEY) {
  throw new Error("Missing ODDS_API_KEY");
}

/**
 * In-memory cache
 * Vercel cold start reseteli, de MVP/prod-lite szinten megfelelő
 */
const cache = new Map<
  string,
  {
    data: OddsEvent[];
    timestamp: number;
  }
>();

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

  bookmakerRank?: number;

  odds?: number | null;

  bestOdds?: number | null;

  impliedProbability?: number | null;

  edge?: number | null;

  isValueBet?: boolean;
};

/**
 * Bookmaker ranking
 * később bővíthető
 */
const BOOKMAKER_RANKINGS: Record<string, number> = {
  Pinnacle: 10,
  bet365: 9,
  Stake: 8,
  Unibet: 7,
  Betfair: 9,
  DraftKings: 8,
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
    if (seen.has(e.id)) {
      return false;
    }

    seen.add(e.id);

    return true;
  });
}

/**
 * Implied probability
 *
 * odds 2.00 => 50%
 */
function calculateImpliedProbability(odds?: number | null) {
  if (!odds || odds <= 0) return null;

  return Number((100 / odds).toFixed(2));
}

/**
 * Placeholder edge calc
 * később AI probability-ből számoljuk
 */
function calculateEdge(impliedProbability?: number | null) {
  if (!impliedProbability) return null;

  /**
   * TEMP:
   * fake AI model probability
   */
  const aiProbability = impliedProbability + Math.random() * 12;

  return Number((aiProbability - impliedProbability).toFixed(2));
}

/**
 * Value bet detector
 */
function isValueBet(edge?: number | null) {
  if (!edge) return false;

  return edge >= 5;
}

/**
 * Extract best odds from all bookmakers
 */
function extractBestOdds(event: any) {
  let bestOdds: number | null = null;

  let bestBookmaker = "Unknown";

  let bookmakerRank = 0;

  for (const bookmaker of event.bookmakers || []) {
    const market = bookmaker.markets?.[0];

    const outcomes = market?.outcomes || [];

    const homeOutcome = outcomes.find(
      (o: any) => o.name === event.home_team
    );

    if (!homeOutcome?.price) continue;

    if (
      bestOdds === null ||
      homeOutcome.price > bestOdds
    ) {
      bestOdds = homeOutcome.price;

      bestBookmaker = bookmaker.title || "Unknown";

      bookmakerRank =
        BOOKMAKER_RANKINGS[bookmaker.title] || 1;
    }
  }

  return {
    bestOdds,
    bestBookmaker,
    bookmakerRank,
  };
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

  if (cached) {
    return cached;
  }

  try {
    const url =
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/` +
      `?apiKey=${API_KEY}` +
      `&regions=eu` +
      `&markets=h2h` +
      `&oddsFormat=decimal`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    let events: OddsEvent[] = data.map((event: any) => {
      const {
        bestOdds,
        bestBookmaker,
        bookmakerRank,
      } = extractBestOdds(event);

      const impliedProbability =
        calculateImpliedProbability(bestOdds);

      const edge =
        calculateEdge(impliedProbability);

      return {
        id: event.id,

        sport: sportLabel,

        league: event.sport_title,

        homeTeam: event.home_team,

        awayTeam: event.away_team,

        commenceTime: event.commence_time,

        bookmaker: bestBookmaker,

        bookmakerRank,

        odds: bestOdds,

        bestOdds,

        impliedProbability,

        edge,

        isValueBet: isValueBet(edge),
      };
    });

    /**
     * Pipeline
     */
    events = dedupeEvents(events);

    /**
     * csak value edge meccsek
     */
    events = events.filter(
      (event) => event.isValueBet
    );

    /**
     * top edge first
     */
    events.sort(
      (a, b) =>
        (b.edge || 0) - (a.edge || 0)
    );

    /**
     * limit
     */
    events = events.slice(0, 10);

    setCache(cacheKey, events);

    return events;
  } catch (error) {
    console.error(error);

    return [];
  }
}

/**
 * Public API
 */
export async function getDailyEvents(): Promise<
  {
    sport: string;
    events: OddsEvent[];
  }[]
> {
  const results = await Promise.all(
    SPORTS.map((sport) =>
      fetchSportEvents(
        sport.key,
        sport.label
      )
    )
  );

  const flat = dedupeEvents(
    results.flat()
  );

  return [
    {
      sport: "All",
      events: flat,
    },
  ];
}