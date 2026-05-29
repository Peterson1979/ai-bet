const API_KEY = process.env.ODDS_API_KEY;

/**
 * BUILD SAFE MODE
 * Next.js build alatt nem dob hibát
 */
const IS_BUILD =
  process.env.NODE_ENV === "production" &&
  !process.env.VERCEL_ENV;

/**
 * In-memory cache
 */
const cache = new Map<
  string,
  {
    data: OddsEvent[];
    timestamp: number;
  }
>();

const CACHE_TTL = 1000 * 60 * 10;

/**
 * SPORTS
 */
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
 * BOOKMAKER RANKING
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
 * CACHE HELPERS
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
 * DEDUPE
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
 * IMPLIED PROBABILITY
 */
function calculateImpliedProbability(odds?: number | null) {
  if (!odds || odds <= 0) return null;

  return Number((100 / odds).toFixed(2));
}

/**
 * EDGE
 */
function calculateEdge(impliedProbability?: number | null) {
  if (!impliedProbability) return null;

  const aiProbability =
    impliedProbability + Math.random() * 12;

  return Number(
    (aiProbability - impliedProbability).toFixed(2)
  );
}

/**
 * VALUE BET
 */
function isValueBet(edge?: number | null) {
  if (!edge) return false;

  return edge >= 5;
}

/**
 * BEST ODDS
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
 * FETCH SPORT EVENTS
 */
async function fetchSportEvents(
  sportKey: string,
  sportLabel: string
): Promise<OddsEvent[]> {

  /**
   * BUILD SAFE
   */
  if (!API_KEY || IS_BUILD) {
    return [];
  }

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
     * PIPELINE
     */
    events = dedupeEvents(events);

    events = events.filter(
      (event) => event.isValueBet
    );

    events.sort(
      (a, b) =>
        (b.edge || 0) - (a.edge || 0)
    );

    events = events.slice(0, 10);

    setCache(cacheKey, events);

    return events;

  } catch (error) {
    console.error(error);

    return [];
  }
}

/**
 * PUBLIC API
 */
export async function getDailyEvents(): Promise<
  {
    sport: string;
    events: OddsEvent[];
  }[]
> {

  /**
   * BUILD SAFE
   */
  if (!API_KEY || IS_BUILD) {
    return [
      {
        sport: "All",
        events: [],
      },
    ];
  }

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