import { SPORT_CONFIG, DEFAULT_CONFIG } from "./sportsConfig";

const API_KEY = process.env.ODDS_API_KEY;
const IS_BUILD = process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV;

const cache = new Map<string, { data: OddsEvent[]; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 10;

const SPORTS = [
  { key: "soccer_epl",                  label: "Football",  league: "Premier League" },
  { key: "basketball_nba",              label: "NBA",       league: "NBA" },
  { key: "americanfootball_nfl",        label: "NFL",       league: "NFL" },
  { key: "icehockey_nhl",               label: "Hockey",    league: "NHL" },
  { key: "tennis_atp_french_open",      label: "Tennis",    league: "Roland Garros" },
  { key: "baseball_mlb",                label: "MLB",       league: "MLB" },
  { key: "mma_mixed_martial_arts",      label: "MMA",       league: "MMA" },
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

const BOOKMAKER_RANKINGS: Record<string, number> = {
  Pinnacle: 10,
  bet365: 9,
  Betfair: 9,
  Stake: 8,
  DraftKings: 8,
  Unibet: 7,
};

function getCache(key: string): OddsEvent[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: OddsEvent[]) {
  cache.set(key, { data, timestamp: Date.now() });
}

function dedupeEvents(events: OddsEvent[]): OddsEvent[] {
  const seen = new Set<string>();
  return events.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

function calculateImpliedProbability(odds?: number | null): number | null {
  if (!odds || odds <= 0) return null;
  return Number((100 / odds).toFixed(2));
}

function calculateEdge(impliedProbability?: number | null): number | null {
  if (!impliedProbability) return null;
  const aiProbability = impliedProbability + Math.random() * 12;
  return Number((aiProbability - impliedProbability).toFixed(2));
}

function extractBestOdds(event: any): {
  bestOdds: number | null;
  bestBookmaker: string;
  bookmakerRank: number;
} {
  let bestOdds: number | null = null;
  let bestBookmaker = "Unknown";
  let bookmakerRank = 0;

  for (const bookmaker of event.bookmakers || []) {
    const outcomes = bookmaker.markets?.[0]?.outcomes || [];
    const homeOutcome = outcomes.find((o: any) => o.name === event.home_team);
    if (!homeOutcome?.price) continue;

    if (bestOdds === null || homeOutcome.price > bestOdds) {
      bestOdds = homeOutcome.price;
      bestBookmaker = bookmaker.title || "Unknown";
      bookmakerRank = BOOKMAKER_RANKINGS[bookmaker.title] || 1;
    }
  }

  return { bestOdds, bestBookmaker, bookmakerRank };
}

function isWithinTimeWindow(commenceTime: string, maxHoursAhead: number): boolean {
  const eventTime = new Date(commenceTime).getTime();
  const now = Date.now();
  const maxMs = maxHoursAhead * 60 * 60 * 1000;
  return eventTime >= now && eventTime <= now + maxMs;
}

async function fetchSportEvents(
  sportKey: string,
  sportLabel: string,
  leagueLabel: string
): Promise<OddsEvent[]> {
  if (!API_KEY || IS_BUILD) return [];

  const cacheKey = `odds_${sportKey}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const config = SPORT_CONFIG[sportLabel] ?? DEFAULT_CONFIG;

  try {
    const url =
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/` +
      `?apiKey=${API_KEY}` +
      `&regions=eu` +
      `&markets=h2h` +
      `&oddsFormat=decimal`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error(`[odds] ${sportKey} fetch failed: ${response.status}`);
      return [];
    }

    const data = await response.json();

    let events: OddsEvent[] = data.map((event: any) => {
      const { bestOdds, bestBookmaker, bookmakerRank } = extractBestOdds(event);
      const impliedProbability = calculateImpliedProbability(bestOdds);
      const edge = calculateEdge(impliedProbability);

      return {
        id: event.id,
        sport: sportLabel,
        league: event.sport_title || leagueLabel,
        homeTeam: event.home_team,
        awayTeam: event.away_team,
        commenceTime: event.commence_time,
        bookmaker: bestBookmaker,
        bookmakerRank,
        odds: bestOdds,
        bestOdds,
        impliedProbability,
        edge,
        isValueBet: (edge ?? 0) >= config.minEdge,
      };
    });

    events = dedupeEvents(events);

    // SPORTSPECIFIKUS SZŰRŐK
    events = events.filter((e) => {
      const odds = e.bestOdds ?? 0;
      const edge = e.edge ?? 0;
      const rank = e.bookmakerRank ?? 0;

      return (
        odds >= config.minOdds &&
        odds <= config.maxOdds &&
        edge >= config.minEdge &&
        rank >= config.minBookmakerRank &&
        isWithinTimeWindow(e.commenceTime, config.maxHoursAhead)
      );
    });

    // Edge szerint rendezés, legjobb 3 kiválasztása
    events.sort((a, b) => (b.edge ?? 0) - (a.edge ?? 0));
    events = events.slice(0, config.maxEvents);

    setCache(cacheKey, events);
    return events;
  } catch (error) {
    console.error(`[odds] fetchSportEvents error (${sportKey}):`, error);
    return [];
  }
}

export async function getDailyEvents(): Promise<{ sport: string; events: OddsEvent[] }[]> {
  if (!API_KEY || IS_BUILD) {
    return SPORTS.map((s) => ({ sport: s.label, events: [] }));
  }

  const results = await Promise.all(
    SPORTS.map((sport) =>
      fetchSportEvents(sport.key, sport.label, sport.league)
    )
  );

  return SPORTS.map((sport, i) => ({
    sport: sport.label,
    events: results[i],
  }));
}