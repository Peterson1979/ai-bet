// app/lib/odds.ts
import { Redis } from "@upstash/redis";
import { SPORT_CONFIG, DEFAULT_CONFIG } from "./sportsConfig";
import { AFFILIATE_SITES } from "./affiliates";

const API_KEY = process.env.ODDS_API_KEY;
const IS_BUILD = process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV;

const cache = new Map<string, { data: OddsEvent[]; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 10;

export const DAILY_CREDIT_LIMIT = 15;
const REDIS_CREDIT_KEY_PREFIX = "odds:credits:";
const REDIS_CREDIT_TTL_SECONDS = 36 * 3600; // 36 hours
const ODDS_MAX_RETRIES = 3;
const ODDS_RETRY_FALLBACK_MS = 5000;
const INTER_REQUEST_DELAY_MS = 300;
const EVENT_DISCOVERY_CACHE_TTL_MS = 1000 * 60 * 10;
const eventDiscoveryCache = new Map<string, { hasEvents: boolean; timestamp: number }>();

let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  if (!redisClient && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redisClient;
}

export function getUtcDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

const RESERVE_CREDIT_LUA = `
local key = KEYS[1]
local requested = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local ttl = tonumber(ARGV[3])

local current = tonumber(redis.call('get', key) or '0')
if current + requested <= limit then
    local newTotal = redis.call('incrby', key, requested)
    if newTotal == requested then
        redis.call('expire', key, ttl)
    end
    return { 1, newTotal }
else
    return { 0, current }
end
`;

const RECONCILE_CREDIT_LUA = `
local key = KEYS[1]
local refund = tonumber(ARGV[1])

local current = tonumber(redis.call('get', key) or '0')
if current >= refund then
    redis.call('decrby', key, refund)
else
    redis.call('set', key, 0)
end
return tonumber(redis.call('get', key) or '0')
`;

export async function reservePersistentDailyCredit(
  dateKey: string,
  requestedAmount: number = 1
): Promise<{ allowed: boolean; currentTotal: number }> {
  const redis = getRedisClient();
  if (!redis) return { allowed: true, currentTotal: requestedAmount };
  try {
    const key = `${REDIS_CREDIT_KEY_PREFIX}${dateKey}`;
    const result = (await redis.eval(
      RESERVE_CREDIT_LUA,
      [key],
      [requestedAmount, DAILY_CREDIT_LIMIT, REDIS_CREDIT_TTL_SECONDS]
    )) as [number, number];

    const allowed = result?.[0] === 1;
    const currentTotal = result?.[1] ?? 0;
    return { allowed, currentTotal };
  } catch (err) {
    console.warn("[odds] Could not reserve daily credit in Redis:", err);
    return { allowed: true, currentTotal: requestedAmount };
  }
}

export async function refundPersistentDailyCredit(
  dateKey: string,
  refundAmount: number = 1
): Promise<number> {
  const redis = getRedisClient();
  if (!redis || refundAmount <= 0) return 0;
  try {
    const key = `${REDIS_CREDIT_KEY_PREFIX}${dateKey}`;
    const result = (await redis.eval(
      RECONCILE_CREDIT_LUA,
      [key],
      [refundAmount]
    )) as number;
    return result ?? 0;
  } catch (err) {
    console.warn("[odds] Could not refund daily credit in Redis:", err);
    return 0;
  }
}

export async function getPersistentDailyCreditsUsed(dateKey: string): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 0;
  try {
    const val = await redis.get<number>(`${REDIS_CREDIT_KEY_PREFIX}${dateKey}`);
    return typeof val === "number" && Number.isFinite(val) ? val : 0;
  } catch (err) {
    console.warn("[odds] Could not read daily credit usage from Redis:", err);
    return 0;
  }
}

const WATCHED_SPORTS = [
  { key: "soccer_fifa_world_cup", label: "Football", league: "FIFA World Cup", priority: 1 },
  { key: "soccer_uefa_champs_league_qualification", label: "Football", league: "Champions League Qualification", priority: 1 },
  { key: "soccer_uefa_champs_league", label: "Football", league: "Champions League", priority: 1 },
  { key: "soccer_uefa_europa_league", label: "Football", league: "Europa League", priority: 2 },
  { key: "soccer_uefa_conference_league", label: "Football", league: "Conference League", priority: 2 },
  { key: "soccer_epl", label: "Football", league: "Premier League", priority: 1 },
  { key: "soccer_spain_la_liga", label: "Football", league: "La Liga", priority: 1 },
  { key: "soccer_germany_bundesliga", label: "Football", league: "Bundesliga", priority: 1 },
  { key: "soccer_italy_serie_a", label: "Football", league: "Serie A", priority: 1 },
  { key: "soccer_france_ligue_1", label: "Football", league: "Ligue 1", priority: 1 },
  { key: "soccer_netherlands_eredivisie", label: "Football", league: "Eredivisie", priority: 3 },
  { key: "soccer_usa_mls", label: "Football", league: "MLS", priority: 3 },
  { key: "soccer_brazil_campeonato", label: "Football", league: "Brazil Série A", priority: 3 },
  { key: "soccer_conmebol_copa_libertadores", label: "Football", league: "Copa Libertadores", priority: 2 },
  { key: "soccer_mexico_ligamx", label: "Football", league: "Liga MX", priority: 3 },
  { key: "soccer_club_friendlies", label: "Football", league: "Club Friendlies", priority: 4 },
  { key: "basketball_nba", label: "NBA", league: "NBA", priority: 1 },
  { key: "basketball_euroleague", label: "NBA", league: "EuroLeague", priority: 2 },
  { key: "americanfootball_nfl", label: "NFL", league: "NFL", priority: 1 },
  { key: "americanfootball_ncaaf", label: "NFL", league: "NCAAF", priority: 3 },
  { key: "icehockey_nhl", label: "Hockey", league: "NHL", priority: 1 },
  { key: "tennis_atp_wimbledon", label: "Tennis", league: "Wimbledon", priority: 1 },
  { key: "tennis_atp_us_open", label: "Tennis", league: "US Open", priority: 1 },
  { key: "tennis_atp_australian_open", label: "Tennis", league: "Australian Open", priority: 1 },
  { key: "tennis_atp_french_open", label: "Tennis", league: "Roland Garros", priority: 1 },
  { key: "tennis_wta_wimbledon", label: "Tennis", league: "WTA Wimbledon", priority: 1 },
  { key: "tennis_wta_us_open", label: "Tennis", league: "WTA US Open", priority: 1 },
  { key: "tennis_wta_french_open", label: "Tennis", league: "WTA Roland Garros", priority: 1 },
  { key: "tennis_atp_miami_open", label: "Tennis", league: "Miami Open", priority: 2 },
  { key: "tennis_atp_madrid_open", label: "Tennis", league: "Madrid Open", priority: 2 },
  { key: "tennis_atp_rome", label: "Tennis", league: "Rome Masters", priority: 2 },
  { key: "tennis_atp_canadian_open", label: "Tennis", league: "Canadian Open", priority: 2 },
  { key: "tennis_atp_cincinnati_open", label: "Tennis", league: "Cincinnati Open", priority: 2 },
  { key: "tennis_wta_miami_open", label: "Tennis", league: "WTA Miami Open", priority: 2 },
  { key: "tennis_wta_madrid_open", label: "Tennis", league: "WTA Madrid Open", priority: 2 },
  { key: "tennis_wta_queens_club_champ", label: "Tennis", league: "WTA Queen's Club", priority: 2 },
  { key: "baseball_mlb", label: "MLB", league: "MLB", priority: 1 },
  { key: "mma_mixed_martial_arts", label: "MMA", league: "MMA", priority: 1 },
  { key: "boxing_boxing", label: "MMA", league: "Boxing", priority: 2 },
] as const;

const MARKET_KEY_MAP: Record<string, string> = {
  "home win": "h2h",
  "away win": "h2h",
  "draw no bet": "h2h",
  "double chance": "double_chance",
  "match winner": "h2h",
  moneyline: "h2h",
  "moneyline (fight winner)": "h2h",
  "over 1.5 goals": "totals",
  "under 4.5 goals": "totals",
  "over 4.5 goals": "totals",
  "under 7.5 goals": "totals",
  "over 18.5 games": "totals",
  "under 30.5 games": "totals",
  "player to win a set": "spreads",
  "handicap games (+3.5)": "spreads",
  "over 149.5 points": "totals",
  "under 179.5 points": "totals",
  "over 33.5 points": "totals",
  "under 54.5 points": "totals",
  "over 7.5 runs": "totals",
  "under 9.5 runs": "totals",
  "team total over": "totals",
  "team total under": "totals",
  "team total over 1.5": "totals",
  "run line (-1.5)": "spreads",
  "method of victory (ko/tko or decision)": "h2h",
  "method of victory": "h2h",
  "over 2.5 rounds": "totals",
  "under 2.5 rounds": "totals",
};

export type BookmakerOffer = {
  bookmaker: string;
  bookmakerRank: number;
  homeOdds: number | null;
  awayOdds: number | null;
};

export type OddsEvent = {
  id: string;
  sport: string;
  league: string;
  sourceSportKey?: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: string;
  bookmaker?: string;
  bookmakerRank?: number;
  odds?: number | null;
  bestOdds?: number | null;
  impliedProbability?: number | null;
  consensusImpliedProb?: number | null;
  valueDiff?: number | null;
  partnerOdds?: number | null;
  partnerBookmaker?: string | null;
  partnerRating?: number | null;
  marketAverageOdds?: number | null;
  fairProbability?: number | null;
  fairOdds?: number | null;
  estimatedValuePct?: number | null;
  bookmakerSpreadPct?: number | null;
  whySignal?: string[];
  topOffers: BookmakerOffer[];
  bookmakerCount: number;
  rawBookmakers?: any[];
};

const BOOKMAKER_RANKINGS: Record<string, number> = {
  Pinnacle: 10,
  bet365: 9,
  Betfair: 9,
  Stake: 8,
  DraftKings: 8,
  Unibet: 7,
  Bwin: 6,
  "William Hill": 6,
  Ladbrokes: 6,
  Betway: 5,
  "888sport": 5,
  Betsson: 5,
  NordicBet: 4,
  Coolbet: 4,
};

function safeFiniteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelayMs(attempt: number): number {
  const base = ODDS_RETRY_FALLBACK_MS * attempt;
  const jitter = Math.floor(Math.random() * 500);
  return base + jitter;
}

function getRetryAfterMs(response: Response): number | null {
  const retryAfter = response.headers.get("retry-after");
  if (!retryAfter) return null;

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds * 1000);
  }

  const dateMs = Date.parse(retryAfter);
  if (!Number.isNaN(dateMs)) {
    const delay = dateMs - Date.now();
    return delay > 0 ? delay : 0;
  }

  return null;
}

function normalizeName(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
}

function round1(value?: number | null): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  return Number(value.toFixed(1));
}

function round2(value?: number | null): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  return Number(value.toFixed(2));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function getAffiliateCandidatesForSport(sportLabel: string) {
  const sportNorm = normalizeName(sportLabel);

  return AFFILIATE_SITES.filter((site) =>
    (site.sports ?? []).some((s) => {
      const norm = normalizeName(s);
      return (
        norm === sportNorm ||
        norm.includes(sportNorm) ||
        sportNorm.includes(norm) ||
        (sportNorm === "mlb" && norm.includes("baseball")) ||
        (sportNorm === "mma" && norm.includes("mma")) ||
        (sportNorm === "mma" && norm.includes("boxing"))
      );
    })
  );
}

function getBookmakerRank(bookmakerTitle?: string | null): number {
  if (!bookmakerTitle) return 3;
  return BOOKMAKER_RANKINGS[bookmakerTitle] ?? 3;
}

function decimalOddsToProbabilityRaw(odds?: number | null): number | null {
  if (!odds || odds <= 0) return null;
  return 1 / odds;
}

function probabilityRawToDecimalOdds(probability?: number | null): number | null {
  if (!probability || probability <= 0) return null;
  return 1 / probability;
}

export function decimalOddsToImpliedProbability(odds?: number | null): number | null {
  const probability = decimalOddsToProbabilityRaw(odds);
  if (probability === null) return null;
  return round1(probability * 100);
}

export function impliedProbabilityToDecimalOdds(probabilityPct?: number | null): number | null {
  if (!probabilityPct || probabilityPct <= 0) return null;
  return round2(100 / probabilityPct);
}

function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getNoVigProbabilityFromTwoWayOdds(
  selectedOdds?: number | null,
  opposingOdds?: number | null
): number | null {
  const p1 = decimalOddsToProbabilityRaw(selectedOdds);
  const p2 = decimalOddsToProbabilityRaw(opposingOdds);

  if (p1 === null || p2 === null) return null;
  const total = p1 + p2;
  if (total <= 0) return null;

  return p1 / total;
}

function getRepresentativeOpposingOdds(
  bookmaker: any,
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  const apiMarketKey = MARKET_KEY_MAP[marketType?.toLowerCase()] ?? "h2h";
  const market = bookmaker.markets?.find((m: any) => m.key === apiMarketKey);
  if (!market) return null;

  const lower = marketType?.toLowerCase() ?? "";
  const isOver = lower.includes("over");
  const isUnder = lower.includes("under");
  const isAway = lower.includes("away");

  if (apiMarketKey === "h2h") {
    if (isAway) {
      return market.outcomes?.find((o: any) => o.name === homeTeam)?.price ?? null;
    }
    return market.outcomes?.find((o: any) => o.name === awayTeam)?.price ?? null;
  }

  if (apiMarketKey === "totals") {
    if (isOver) {
      return market.outcomes?.find((o: any) => o.name?.toLowerCase() === "under")?.price ?? null;
    }
    if (isUnder) {
      return market.outcomes?.find((o: any) => o.name?.toLowerCase() === "over")?.price ?? null;
    }
  }

  if (apiMarketKey === "spreads") {
    const outcomes = market.outcomes ?? [];
    if (outcomes.length >= 2) {
      return outcomes[1]?.price ?? null;
    }
  }

  return null;
}

function extractOutcomeOddsForMarket(
  bookmaker: any,
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  const apiMarketKey = MARKET_KEY_MAP[marketType?.toLowerCase()] ?? "h2h";
  const market = bookmaker.markets?.find((m: any) => m.key === apiMarketKey);
  if (!market) return null;

  const lower = marketType?.toLowerCase() ?? "";
  const isOver = lower.includes("over");
  const isUnder = lower.includes("under");
  const isAway = lower.includes("away");
  const isDouble = lower.includes("double");

  if (apiMarketKey === "h2h") {
    if (isAway) {
      return market.outcomes?.find((o: any) => o.name === awayTeam)?.price ?? null;
    }
    if (isDouble) {
      return market.outcomes?.[0]?.price ?? null;
    }
    return market.outcomes?.find((o: any) => o.name === homeTeam)?.price ?? null;
  }

  if (apiMarketKey === "totals") {
    if (isOver) {
      return market.outcomes?.find((o: any) => o.name?.toLowerCase() === "over")?.price ?? null;
    }
    if (isUnder) {
      return market.outcomes?.find((o: any) => o.name?.toLowerCase() === "under")?.price ?? null;
    }
    return market.outcomes?.[0]?.price ?? null;
  }

  if (apiMarketKey === "spreads" || apiMarketKey === "double_chance") {
    return market.outcomes?.[0]?.price ?? null;
  }

  return null;
}

export type MarketCandidate = {
  id: string;
  eventId: string;
  apiMarketKey: string;
  market: string;
  prediction: string;
  outcomeName: string;
  point: number | null;
  bookmakerCount: number;
  consensusImpliedProb: number | null;
};

const SUPPORTED_CANDIDATE_MARKETS = new Set([
  "h2h",
  "totals",
  "spreads",
  "double_chance",
  "draw_no_bet",
  "h2h_s1",
]);

function marketCandidateLabel(apiMarketKey: string, sport: string): string {
  if (apiMarketKey === "h2h") {
    if (sport === "Football") return "Match Winner (1X2)";
    if (sport === "Tennis") return "Match Winner";
    if (sport === "MMA") return "Fight Winner (Moneyline)";
    return "Moneyline";
  }
  if (apiMarketKey === "totals") {
    if (sport === "Football" || sport === "Hockey") return "Over/Under Goals";
    if (sport === "Tennis") return "Over/Under Games";
    if (sport === "MLB") return "Over/Under Runs";
    if (sport === "MMA") return "Round Totals (Over/Under)";
    return "Over/Under Points";
  }
  if (apiMarketKey === "spreads") {
    if (sport === "Tennis") return "Game Handicap";
    if (sport === "MLB") return "Run Line";
    if (sport === "Hockey") return "Puck Line";
    return "Spread";
  }
  if (apiMarketKey === "double_chance") return "Double Chance";
  if (apiMarketKey === "draw_no_bet") return "Draw No Bet";
  if (apiMarketKey === "h2h_s1") return "First Set Winner";
  return apiMarketKey;
}

function marketCandidatePointKey(point: number | null): string {
  return point === null ? "none" : String(point);
}

function marketCandidatePrediction(
  apiMarketKey: string,
  outcomeName: string,
  point: number | null
): string {
  if (point === null) return outcomeName;
  const pointText =
    apiMarketKey === "spreads" && point > 0 ? `+${point}` : String(point);
  return `${outcomeName} ${pointText}`;
}

function findCandidateOutcome(
  bookmaker: any,
  candidate: MarketCandidate
): any | null {
  const market = bookmaker.markets?.find((m: any) => m.key === candidate.apiMarketKey);
  if (!market) return null;
  return (
    market.outcomes?.find((outcome: any) => {
      if (outcome.name !== candidate.outcomeName) return false;
      const point = typeof outcome.point === "number" && Number.isFinite(outcome.point)
        ? outcome.point
        : null;
      return point === candidate.point;
    }) ?? null
  );
}

export function buildMarketCandidates(event: OddsEvent): MarketCandidate[] {
  const grouped = new Map<
    string,
    {
      apiMarketKey: string;
      outcomeName: string;
      point: number | null;
      prices: number[];
      bookmakers: Set<string>;
    }
  >();

  for (const bookmaker of event.rawBookmakers ?? []) {
    for (const market of bookmaker.markets ?? []) {
      const apiMarketKey = String(market.key ?? "");
      if (!SUPPORTED_CANDIDATE_MARKETS.has(apiMarketKey)) continue;

      for (const outcome of market.outcomes ?? []) {
        const price = safeFiniteNumber(outcome.price);
        if (price === null || price <= 1) continue;

        const outcomeName = String(outcome.name ?? "").trim();
        if (!outcomeName) continue;

        const point = safeFiniteNumber(outcome.point);
        const key = `${apiMarketKey}|${outcomeName}|${marketCandidatePointKey(point)}`;
        let entry = grouped.get(key);
        if (!entry) {
          entry = {
            apiMarketKey,
            outcomeName,
            point,
            prices: [],
            bookmakers: new Set<string>(),
          };
          grouped.set(key, entry);
        }

        entry.prices.push(price);
        entry.bookmakers.add(String(bookmaker.title ?? bookmaker.key ?? "unknown"));
      }
    }
  }

  return [...grouped.entries()]
    .map(([key, entry]) => {
      const avg = average(entry.prices);
      return {
        id: `${event.id}::${key}`,
        eventId: event.id,
        apiMarketKey: entry.apiMarketKey,
        market: marketCandidateLabel(entry.apiMarketKey, event.sport),
        prediction: marketCandidatePrediction(
          entry.apiMarketKey,
          entry.outcomeName,
          entry.point
        ),
        outcomeName: entry.outcomeName,
        point: entry.point,
        bookmakerCount: entry.bookmakers.size,
        consensusImpliedProb:
          avg === null ? null : round1(decimalOddsToImpliedProbability(avg)),
      };
    })
    .filter((candidate) => candidate.bookmakerCount >= 3);
}

export function getBestOddsForCandidate(
  rawBookmakers: any[],
  candidate: MarketCandidate
): { bestOdds: number | null; bestBookmaker: string; bookmakerRank: number } {
  let bestOdds: number | null = null;
  let bestBookmaker = "Unknown";
  let bookmakerRank = 0;

  for (const bookmaker of rawBookmakers ?? []) {
    const outcome = findCandidateOutcome(bookmaker, candidate);
    const price = safeFiniteNumber(outcome?.price);
    if (price === null || price <= 1) continue;
    if (bestOdds === null || price > bestOdds) {
      bestOdds = price;
      bestBookmaker = bookmaker.title || "Unknown";
      bookmakerRank = getBookmakerRank(bookmaker.title);
    }
  }

  return { bestOdds: round2(bestOdds), bestBookmaker, bookmakerRank };
}

export function getAverageOddsForCandidate(
  rawBookmakers: any[],
  candidate: MarketCandidate
): number | null {
  const prices: number[] = [];
  for (const bookmaker of rawBookmakers ?? []) {
    const price = safeFiniteNumber(findCandidateOutcome(bookmaker, candidate)?.price);
    if (price !== null && price > 1) prices.push(price);
  }
  const avg = average(prices);
  return avg === null ? null : round2(avg);
}

export function getConsensusForCandidate(
  rawBookmakers: any[],
  candidate: MarketCandidate
): number | null {
  const averageOdds = getAverageOddsForCandidate(rawBookmakers, candidate);
  return decimalOddsToImpliedProbability(averageOdds);
}

export function getPartnerOddsForCandidate(
  rawBookmakers: any[],
  candidate: MarketCandidate,
  sportLabel: string
): { odds: number | null; bookmaker: string | null; rating: number | null } {
  const affiliateCandidates = getAffiliateCandidatesForSport(sportLabel);
  const partnerMap = new Map(
    affiliateCandidates.map((site) => [normalizeName(site.name), site] as const)
  );
  let bestOdds: number | null = null;
  let bestBookmaker: string | null = null;
  let bestRating: number | null = null;

  for (const bookmaker of rawBookmakers ?? []) {
    const matchedPartner = partnerMap.get(normalizeName(bookmaker.title || ""));
    if (!matchedPartner) continue;
    const price = safeFiniteNumber(findCandidateOutcome(bookmaker, candidate)?.price);
    if (price === null || price <= 1) continue;
    if (bestOdds === null || price > bestOdds) {
      bestOdds = price;
      bestBookmaker = matchedPartner.name;
      bestRating = matchedPartner.rating ?? null;
    }
  }

  return {
    odds: round2(bestOdds),
    bookmaker: bestBookmaker,
    rating: round1(bestRating),
  };
}

export function getPartnerOddsForMarket(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string,
  sportLabel: string
): { odds: number | null; bookmaker: string | null; rating: number | null } {
  const affiliateCandidates = getAffiliateCandidatesForSport(sportLabel);
  if (affiliateCandidates.length === 0) {
    return { odds: null, bookmaker: null, rating: null };
  }

  const partnerMap = new Map(
    affiliateCandidates.map((site) => [normalizeName(site.name), site] as const)
  );

  let bestOdds: number | null = null;
  let bestBookmaker: string | null = null;
  let bestRating: number | null = null;

  for (const bookmaker of rawBookmakers || []) {
    const matchedPartner = partnerMap.get(normalizeName(bookmaker.title || ""));
    if (!matchedPartner) continue;

    const odds = extractOutcomeOddsForMarket(bookmaker, marketType, homeTeam, awayTeam);
    if (!odds || odds <= 0) continue;

    if (bestOdds === null || odds > bestOdds) {
      bestOdds = odds;
      bestBookmaker = matchedPartner.name;
      bestRating = matchedPartner.rating ?? null;
    }
  }

  if (bestOdds !== null) {
    return {
      odds: round2(bestOdds),
      bookmaker: bestBookmaker,
      rating: round1(bestRating),
    };
  }

  const fallback = [...affiliateCandidates].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0];
  return {
    odds: null,
    bookmaker: fallback?.name ?? null,
    rating: round1(fallback?.rating ?? null),
  };
}

export function getAverageOddsForMarket(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  const prices: number[] = [];

  for (const bookmaker of rawBookmakers || []) {
    const odds = extractOutcomeOddsForMarket(bookmaker, marketType, homeTeam, awayTeam);
    if (odds && odds > 0) prices.push(odds);
  }

  const avg = average(prices);
  return avg === null ? null : round2(avg);
}

function calculateConsensusImpliedProb(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  const averageOdds = getAverageOddsForMarket(rawBookmakers, marketType, homeTeam, awayTeam);
  return decimalOddsToImpliedProbability(averageOdds);
}

function calculateNoVigConsensusImpliedProb(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  const probs: number[] = [];

  for (const bookmaker of rawBookmakers || []) {
    const selectedOdds = extractOutcomeOddsForMarket(bookmaker, marketType, homeTeam, awayTeam);
    const opposingOdds = getRepresentativeOpposingOdds(
      bookmaker,
      marketType,
      homeTeam,
      awayTeam
    );

    const noVig = getNoVigProbabilityFromTwoWayOdds(selectedOdds, opposingOdds);
    if (noVig !== null) {
      probs.push(noVig * 100);
    }
  }

  const avg = average(probs);
  return avg === null ? null : round1(avg);
}

function resolveFairProbabilityFromMarket(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  const noVigConsensus = calculateNoVigConsensusImpliedProb(
    rawBookmakers,
    marketType,
    homeTeam,
    awayTeam
  );

  if (noVigConsensus !== null) {
    return clamp(noVigConsensus, 1, 99);
  }

  const consensus = calculateConsensusImpliedProb(
    rawBookmakers,
    marketType,
    homeTeam,
    awayTeam
  );

  return consensus !== null ? clamp(consensus, 1, 99) : null;
}

export function getConsensusForMarket(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  return calculateConsensusImpliedProb(rawBookmakers, marketType, homeTeam, awayTeam);
}

export function getBestOddsForMarket(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): { bestOdds: number | null; bestBookmaker: string; bookmakerRank: number } {
  let bestOdds: number | null = null;
  let bestBookmaker = "Unknown";
  let bookmakerRank = 0;

  for (const bookmaker of rawBookmakers || []) {
    const targetOdds = extractOutcomeOddsForMarket(bookmaker, marketType, homeTeam, awayTeam);
    if (!targetOdds || targetOdds <= 0) continue;

    if (bestOdds === null || targetOdds > bestOdds) {
      bestOdds = targetOdds;
      bestBookmaker = bookmaker.title || "Unknown";
      bookmakerRank = getBookmakerRank(bookmaker.title);
    }
  }

  return {
    bestOdds: round2(bestOdds),
    bestBookmaker,
    bookmakerRank,
  };
}

export function calculateEstimatedValuePct(
  fairProbabilityPct?: number | null,
  offeredOdds?: number | null
): number | null {
  if (!fairProbabilityPct || fairProbabilityPct <= 0 || !offeredOdds || offeredOdds <= 1) {
    return null;
  }

  const fairProbability = fairProbabilityPct / 100;
  return round1(fairProbability * offeredOdds * 100 - 100);
}

export function calculateBookmakerSpreadPct(
  offeredOdds?: number | null,
  averageOdds?: number | null
): number | null {
  if (!offeredOdds || offeredOdds <= 0 || !averageOdds || averageOdds <= 0) {
    return null;
  }

  return round1(((offeredOdds / averageOdds) - 1) * 100);
}

export function buildWhySignalSummary(params: {
  estimatedValuePct?: number | null;
  consensusImpliedProb?: number | null;
  partnerImpliedProbability?: number | null;
  bookmakerCount?: number;
  riskTier?: "Low" | "Medium" | "High";
  partnerBookmaker?: string | null;
}): string[] {
  const bullets: string[] = [];

  if (typeof params.estimatedValuePct === "number") {
    if (params.estimatedValuePct >= 3) {
      bullets.push("Partner offer shows a strong positive value edge.");
    } else if (params.estimatedValuePct >= 1) {
      bullets.push("Partner offer still prices this pick above fair value.");
    } else if (params.estimatedValuePct > -1) {
      bullets.push("Partner offer sits close to fair market value.");
    } else {
      bullets.push("Partner price is slightly below fair value, so upside is thinner.");
    }
  }

  if (
    typeof params.consensusImpliedProb === "number" &&
    typeof params.partnerImpliedProbability === "number"
  ) {
    const gap = params.consensusImpliedProb - params.partnerImpliedProbability;

    if (gap >= 1.5) {
      bullets.push("Consensus still supports the selected outcome.");
    } else if (gap <= -1.5) {
      bullets.push("Consensus is softer than the partner price suggests.");
    } else {
      bullets.push("Consensus is broadly aligned with this selection.");
    }
  }

  if (typeof params.bookmakerCount === "number") {
    if (params.bookmakerCount >= 15) {
      bullets.push(`Signal is based on a broad ${params.bookmakerCount}-bookmaker sample.`);
    } else if (params.bookmakerCount >= 7) {
      bullets.push(`Signal is based on ${params.bookmakerCount} bookmaker prices.`);
    } else {
      bullets.push(`Smaller bookmaker sample (${params.bookmakerCount}) increases uncertainty.`);
    }
  }

  if (params.partnerBookmaker) {
    bullets.push(`Best eligible partner offer comes from ${params.partnerBookmaker}.`);
  }

  if (params.riskTier === "Low") {
    bullets.push("Low-risk tier reflects stronger pricing confidence.");
  } else if (params.riskTier === "Medium") {
    bullets.push("Medium-risk tier reflects balanced upside and uncertainty.");
  } else if (params.riskTier === "High") {
    bullets.push("High-risk tier reflects higher market uncertainty.");
  }

  return bullets.slice(0, 3);
}

function buildWhySignal(params: {
  estimatedValuePct: number | null;
  consensusImpliedProb: number | null;
  impliedProbability: number | null;
  bookmakerCount: number;
  riskTier?: "Low" | "Medium" | "High";
  partnerBookmaker: string | null;
}): string[] {
  return buildWhySignalSummary({
    estimatedValuePct: params.estimatedValuePct,
    consensusImpliedProb: params.consensusImpliedProb,
    partnerImpliedProbability: params.impliedProbability,
    bookmakerCount: params.bookmakerCount,
    riskTier: params.riskTier,
    partnerBookmaker: params.partnerBookmaker,
  });
}

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

  return events.filter((event) => {
    if (seen.has(event.id)) return false;
    seen.add(event.id);
    return true;
  });
}

function extractAllOffers(event: any): BookmakerOffer[] {
  const offers: BookmakerOffer[] = [];

  for (const bookmaker of event.bookmakers || []) {
    const h2hMarket = bookmaker.markets?.find((m: any) => m.key === "h2h");
    if (!h2hMarket) continue;

    const homeOutcome = h2hMarket.outcomes?.find((o: any) => o.name === event.home_team);
    const awayOutcome = h2hMarket.outcomes?.find((o: any) => o.name === event.away_team);

    if (!homeOutcome?.price && !awayOutcome?.price) continue;

    offers.push({
      bookmaker: bookmaker.title || "Unknown",
      bookmakerRank: getBookmakerRank(bookmaker.title),
      homeOdds: homeOutcome?.price ?? null,
      awayOdds: awayOutcome?.price ?? null,
    });
  }

  return offers;
}

function isWithinTimeWindow(commenceTime: string, maxHoursAhead: number): boolean {
  const eventTime = new Date(commenceTime).getTime();
  const now = Date.now();
  const maxMs = maxHoursAhead * 60 * 60 * 1000;
  return eventTime >= now && eventTime <= now + maxMs;
}

function rankEvents(a: OddsEvent, b: OddsEvent): number {
  if (b.bookmakerCount !== a.bookmakerCount) {
    return b.bookmakerCount - a.bookmakerCount;
  }

  return (b.bestOdds ?? 0) - (a.bestOdds ?? 0);
}

function selectWithLeagueGuarantee(events: OddsEvent[], maxEvents: number): OddsEvent[] {
  if (events.length === 0) return events;

  const byLeague = new Map<string, OddsEvent[]>();
  for (const event of events) {
    const key = event.league || "Unknown";
    if (!byLeague.has(key)) byLeague.set(key, []);
    byLeague.get(key)!.push(event);
  }

  const guaranteed: OddsEvent[] = [];
  const leftover: OddsEvent[] = [];

  for (const group of byLeague.values()) {
    group.sort(rankEvents);
    guaranteed.push(group[0]);
    leftover.push(...group.slice(1));
  }

  guaranteed.sort(rankEvents);
  leftover.sort(rankEvents);

  if (guaranteed.length >= maxEvents) {
    return guaranteed.slice(0, maxEvents);
  }

  const remainingSlots = maxEvents - guaranteed.length;
  return [...guaranteed, ...leftover.slice(0, remainingSlots)];
}

async function fetchOddsWithRetry(
  url: string,
  sportKey: string
): Promise<{ response: Response | null; counted: boolean }> {
  for (let attempt = 1; attempt <= ODDS_MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, { cache: "no-store" });

      if (response.status === 429) {
        const retryAfterMs = getRetryAfterMs(response);
        const delayMs = retryAfterMs ?? getRetryDelayMs(attempt);

        console.warn(`[odds] ${sportKey} fetch rate-limited (429), retrying`, {
          attempt,
          delayMs,
        });

        if (attempt < ODDS_MAX_RETRIES) {
          await sleep(delayMs);
          continue;
        }

        return { response, counted: false };
      }

      return { response, counted: true };
    } catch (error) {
      console.error(`[odds] ${sportKey} fetch attempt failed`, {
        attempt,
        error: error instanceof Error ? error.message : String(error),
      });

      if (attempt < ODDS_MAX_RETRIES) {
        await sleep(getRetryDelayMs(attempt));
        continue;
      }

      return { response: null, counted: false };
    }
  }

  return { response: null, counted: false };
}

type FeaturedMarketPlanItem = {
  sport: (typeof WATCHED_SPORTS)[number];
  marketKeys: string[];
};

function getFeaturedMarketPreference(sportLabel: string): string[] {
  switch (sportLabel) {
    case "Football":
      return ["h2h", "totals"];
    case "Tennis":
      return ["h2h", "totals", "spreads"];
    case "NBA":
    case "NFL":
    case "Hockey":
    case "MLB":
      return ["h2h", "totals", "spreads"];
    case "MMA":
      return ["h2h"];
    default:
      return ["h2h"];
  }
}

function buildFeaturedMarketPlan(
  availableSports: Array<(typeof WATCHED_SPORTS)[number]>,
  creditBudget: number
): FeaturedMarketPlanItem[] {
  if (creditBudget <= 0 || availableSports.length === 0) return [];

  const plan: FeaturedMarketPlanItem[] = [];
  const plannedKeys = new Set<string>();
  let cost = 0;

  const addSport = (sport: (typeof WATCHED_SPORTS)[number]): boolean => {
    if (plannedKeys.has(sport.key) || cost >= creditBudget) return false;
    plan.push({ sport, marketKeys: ["h2h"] });
    plannedKeys.add(sport.key);
    cost += 1;
    return true;
  };

  // Phase 1: guarantee broad sport coverage before spending on extra markets.
  const seenLabels = new Set<string>();
  for (const sport of availableSports) {
    if (seenLabels.has(sport.label)) continue;
    if (cost >= creditBudget) break;
    if (addSport(sport)) seenLabels.add(sport.label);
  }

  // Phase 2: Football and Tennis are fragmented across many competition keys.
  // Give each a second active competition when budget allows.
  for (const label of ["Football", "Tennis"]) {
    if (cost >= creditBudget) break;
    const extra = availableSports.find(
      (sport) => sport.label === label && !plannedKeys.has(sport.key)
    );
    if (extra) addSport(extra);
  }

  // Phase 3: add totals to primary sport entries before adding handicaps.
  for (const item of plan) {
    if (cost >= creditBudget) break;
    const preference = getFeaturedMarketPreference(item.sport.label);
    if (preference.includes("totals") && !item.marketKeys.includes("totals")) {
      item.marketKeys.push("totals");
      cost += 1;
    }
  }

  // Phase 4: use any remaining budget for spreads / handicaps.
  const spreadPriority = ["Tennis", "NBA", "NFL", "MLB", "Hockey"];
  for (const label of spreadPriority) {
    if (cost >= creditBudget) break;
    const item = plan.find((entry) => entry.sport.label === label);
    if (!item) continue;
    const preference = getFeaturedMarketPreference(label);
    if (preference.includes("spreads") && !item.marketKeys.includes("spreads")) {
      item.marketKeys.push("spreads");
      cost += 1;
    }
  }

  // Phase 5: if credits still remain, add more active competition keys with h2h.
  for (const sport of availableSports) {
    if (cost >= creditBudget) break;
    addSport(sport);
  }

  return plan;
}

function mergeBookmakerMarkets(baseBookmakers: any[], extraBookmakers: any[]): any[] {
  const merged = new Map<string, any>();

  const bookmakerKey = (bookmaker: any) =>
    String(bookmaker.key ?? bookmaker.title ?? "").trim().toLowerCase();

  for (const bookmaker of baseBookmakers ?? []) {
    const key = bookmakerKey(bookmaker);
    if (!key) continue;
    merged.set(key, {
      ...bookmaker,
      markets: [...(bookmaker.markets ?? [])],
    });
  }

  for (const bookmaker of extraBookmakers ?? []) {
    const key = bookmakerKey(bookmaker);
    if (!key) continue;

    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, {
        ...bookmaker,
        markets: [...(bookmaker.markets ?? [])],
      });
      continue;
    }

    const markets = [...(existing.markets ?? [])];
    for (const market of bookmaker.markets ?? []) {
      const index = markets.findIndex((item: any) => item.key === market.key);
      if (index >= 0) markets[index] = market;
      else markets.push(market);
    }

    merged.set(key, { ...existing, ...bookmaker, markets });
  }

  return [...merged.values()];
}

async function enrichEventWithAdditionalMarkets(
  event: OddsEvent,
  requestedMarketKeys: string[],
  creditState: { used: number },
  dateKey: string
): Promise<void> {
  if (!API_KEY || IS_BUILD || !event.sourceSportKey || requestedMarketKeys.length === 0) return;

  const availableCredits = DAILY_CREDIT_LIMIT - creditState.used;
  if (availableCredits <= 0) return;

  const marketKeys = requestedMarketKeys.slice(0, availableCredits);
  const requestedCredits = marketKeys.length;
  if (requestedCredits <= 0) return;

  const reservation = await reservePersistentDailyCredit(dateKey, requestedCredits);
  if (!reservation.allowed) {
    creditState.used = DAILY_CREDIT_LIMIT;
    return;
  }
  creditState.used = reservation.currentTotal;

  const url =
    `https://api.the-odds-api.com/v4/sports/${event.sourceSportKey}/events/${event.id}/odds` +
    `?apiKey=${API_KEY}` +
    `&regions=eu` +
    `&markets=${marketKeys.join(",")}` +
    `&oddsFormat=decimal`;

  try {
    const { response } = await fetchOddsWithRetry(
      url,
      `${event.sourceSportKey}:${event.id}:additional`
    );

    if (!response) {
      creditState.used = await refundPersistentDailyCredit(dateKey, requestedCredits);
      return;
    }

    const lastChargedHeader = response.headers.get("x-requests-last");
    const lastCharged =
      lastChargedHeader === null ? null : Number(lastChargedHeader);

    if (!response.ok) {
      const actualCharged =
        lastCharged !== null && Number.isFinite(lastCharged) && lastCharged >= 0
          ? Math.min(requestedCredits, lastCharged)
          : requestedCredits;
      if (actualCharged < requestedCredits) {
        creditState.used = await refundPersistentDailyCredit(
          dateKey,
          requestedCredits - actualCharged
        );
      }
      const errorBody = await response.text().catch(() => "");
      console.warn(
        `[odds] Additional markets failed for ${event.id}: ${response.status}`,
        errorBody.slice(0, 500)
      );
      return;
    }

    const data = await response.json();
    const actualCharged =
      lastCharged !== null && Number.isFinite(lastCharged) && lastCharged >= 0
        ? Math.min(requestedCredits, lastCharged)
        : requestedCredits;

    if (actualCharged < requestedCredits) {
      creditState.used = await refundPersistentDailyCredit(
        dateKey,
        requestedCredits - actualCharged
      );
    }

    if (Array.isArray(data?.bookmakers)) {
      event.rawBookmakers = mergeBookmakerMarkets(
        event.rawBookmakers ?? [],
        data.bookmakers
      );
    }

    console.log(
      `[odds] Additional markets for ${event.id}: requested=${marketKeys.join(",")} charged=${actualCharged}`
    );
  } catch (error) {
    // Keep the reservation on uncertain failures: the upstream request may already have been charged.
    console.warn(`[odds] Additional market enrichment error for ${event.id}:`, error);
  }
}

async function hasUpcomingEventsForSport(
  sportKey: string,
  sportLabel: string
): Promise<boolean | null> {
  if (!API_KEY || IS_BUILD) return null;

  const cached = eventDiscoveryCache.get(sportKey);
  if (cached && Date.now() - cached.timestamp < EVENT_DISCOVERY_CACHE_TTL_MS) {
    return cached.hasEvents;
  }

  const config = SPORT_CONFIG[sportLabel] ?? DEFAULT_CONFIG;
  const commenceTimeFrom = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const commenceTimeTo = new Date(
    Date.now() + config.maxHoursAhead * 60 * 60 * 1000
  ).toISOString().replace(/\.\d{3}Z$/, "Z");

  try {
    const url =
      `https://api.the-odds-api.com/v4/sports/${sportKey}/events/` +
      `?apiKey=${API_KEY}` +
      `&commenceTimeFrom=${encodeURIComponent(commenceTimeFrom)}` +
      `&commenceTimeTo=${encodeURIComponent(commenceTimeTo)}`;

    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      console.warn(`[odds] Free event discovery failed for ${sportKey}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const hasEvents = Array.isArray(data) && data.length > 0;
    eventDiscoveryCache.set(sportKey, { hasEvents, timestamp: Date.now() });
    return hasEvents;
  } catch (error) {
    console.warn(`[odds] Free event discovery error for ${sportKey}:`, error);
    return null;
  }
}

function balanceSportsByPriority(
  activeWatchedSports: Array<(typeof WATCHED_SPORTS)[number]>
): Array<(typeof WATCHED_SPORTS)[number]> {
  const groups = new Map<string, Array<(typeof WATCHED_SPORTS)[number]>>();
  for (const item of activeWatchedSports) {
    if (!groups.has(item.label)) groups.set(item.label, []);
    groups.get(item.label)!.push(item);
  }

  for (const list of groups.values()) {
    list.sort((a, b) => a.priority - b.priority);
  }

  const balanced: Array<(typeof WATCHED_SPORTS)[number]> = [];
  let added = true;
  let round = 0;
  while (added) {
    added = false;
    for (const list of groups.values()) {
      if (round < list.length) {
        balanced.push(list[round]);
        added = true;
      }
    }
    round++;
  }
  return balanced;
}

async function fetchSportEvents(
  sportKey: string,
  sportLabel: string,
  leagueLabel: string,
  marketKeys: string[],
  creditState: { used: number },
  dateKey: string
): Promise<{ events: OddsEvent[]; failed: boolean; error?: string }> {
  if (!API_KEY || IS_BUILD) return { events: [], failed: false };

  const requestedMarkets = marketKeys.length > 0 ? marketKeys : ["h2h"];
  const requestedCredits = requestedMarkets.length;
  const cacheKey = `${sportKey}:${requestedMarkets.join(",")}`;
  const cached = getCache(cacheKey);
  if (cached) return { events: cached, failed: false };

  if (creditState.used + requestedCredits > DAILY_CREDIT_LIMIT) {
    console.warn(`[odds] Daily credit budget (${DAILY_CREDIT_LIMIT}) reached, skipping: ${sportKey}`);
    return { events: [], failed: false };
  }

  const reservation = await reservePersistentDailyCredit(dateKey, requestedCredits);
  if (!reservation.allowed) {
    console.warn(
      `[odds] Daily credit budget (${DAILY_CREDIT_LIMIT}) reached in Redis, skipping: ${sportKey}`
    );
    creditState.used = DAILY_CREDIT_LIMIT;
    return { events: [], failed: false };
  }
  creditState.used = reservation.currentTotal;

  const config = SPORT_CONFIG[sportLabel] ?? DEFAULT_CONFIG;
  const markets = requestedMarkets.join(",");
  const commenceTimeFrom = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const commenceTimeTo = new Date(
    Date.now() + config.maxHoursAhead * 60 * 60 * 1000
  ).toISOString().replace(/\.\d{3}Z$/, "Z");

  try {
    const url =
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/` +
      `?apiKey=${API_KEY}` +
      `&regions=eu` +
      `&markets=${markets}` +
      `&oddsFormat=decimal` +
      `&commenceTimeFrom=${encodeURIComponent(commenceTimeFrom)}` +
      `&commenceTimeTo=${encodeURIComponent(commenceTimeTo)}`;

    const { response } = await fetchOddsWithRetry(url, sportKey);

    if (!response) {
      const reconciled = await refundPersistentDailyCredit(dateKey, requestedCredits);
      creditState.used = reconciled;
      console.error(`[odds] ${sportKey} fetch failed: no response`);
      return { events: [], failed: true, error: `No response from The Odds API for ${sportKey}` };
    }

    const lastChargedHeader = response.headers.get("x-requests-last");
    const lastCharged =
      lastChargedHeader === null ? null : Number(lastChargedHeader);

    if (!response.ok) {
      if (lastCharged === 0 || response.status === 422 || response.status === 429) {
        const reconciled = await refundPersistentDailyCredit(dateKey, requestedCredits);
        creditState.used = reconciled;
      }

      const errorBody = await response.text().catch(() => "");
      console.error(`[odds] ${sportKey} fetch failed: ${response.status}`, errorBody);
      return { events: [], failed: true, error: `The Odds API HTTP ${response.status} for ${sportKey}` };
    }

    const data = await response.json();

    const actualCharged =
      lastCharged !== null && Number.isFinite(lastCharged) && lastCharged >= 0
        ? Math.min(requestedCredits, lastCharged)
        : Array.isArray(data) && data.length === 0
          ? 0
          : requestedCredits;

    if (actualCharged < requestedCredits) {
      const reconciled = await refundPersistentDailyCredit(
        dateKey,
        requestedCredits - actualCharged
      );
      creditState.used = reconciled;
    }

    let events: OddsEvent[] = data.map((event: any) => {
      const allOffers = extractAllOffers(event);

      const topOffers = [...allOffers]
        .sort((a, b) => (b.homeOdds ?? 0) - (a.homeOdds ?? 0))
        .slice(0, 3);

      const bestOffer = topOffers[0];
      const bestOdds = round2(bestOffer?.homeOdds ?? null);

      const consensusImpliedProb = calculateConsensusImpliedProb(
        event.bookmakers || [],
        "home win",
        event.home_team,
        event.away_team
      );

      const fairProbabilityPct = resolveFairProbabilityFromMarket(
        event.bookmakers || [],
        "home win",
        event.home_team,
        event.away_team
      );

      const partnerOffer = getPartnerOddsForMarket(
        event.bookmakers || [],
        "home win",
        event.home_team,
        event.away_team,
        sportLabel
      );

      const partnerOdds = partnerOffer.odds;
      const partnerImpliedProbability = decimalOddsToImpliedProbability(partnerOdds);

      const marketAverageOdds = getAverageOddsForMarket(
        event.bookmakers || [],
        "home win",
        event.home_team,
        event.away_team
      );

      const fairOdds = impliedProbabilityToDecimalOdds(fairProbabilityPct);
      const estimatedValuePct = calculateEstimatedValuePct(fairProbabilityPct, partnerOdds);
      const bookmakerSpreadPct = calculateBookmakerSpreadPct(partnerOdds, marketAverageOdds);

      const valueDiff =
        fairProbabilityPct !== null && partnerImpliedProbability !== null
          ? round1(fairProbabilityPct - partnerImpliedProbability)
          : null;

      const whySignal = buildWhySignal({
        estimatedValuePct,
        consensusImpliedProb,
        impliedProbability: partnerImpliedProbability,
        bookmakerCount: allOffers.length,
        partnerBookmaker: partnerOffer.bookmaker,
      });

      return {
        id: event.id,
        sport: sportLabel,
        league: event.sport_title || leagueLabel,
        sourceSportKey: sportKey,
        homeTeam: event.home_team,
        awayTeam: event.away_team,
        commenceTime: event.commence_time,
        bookmaker: bestOffer?.bookmaker ?? "Unknown",
        bookmakerRank: bestOffer?.bookmakerRank ?? 0,
        odds: bestOdds,
        bestOdds,
        impliedProbability: round1(partnerImpliedProbability),
        consensusImpliedProb: round1(consensusImpliedProb),
        valueDiff,
        partnerOdds: round2(partnerOdds),
        partnerBookmaker: partnerOffer.bookmaker,
        partnerRating: round1(partnerOffer.rating),
        marketAverageOdds: round2(marketAverageOdds),
        fairProbability: round1(fairProbabilityPct),
        fairOdds: round2(fairOdds),
        estimatedValuePct,
        bookmakerSpreadPct,
        whySignal,
        topOffers,
        bookmakerCount: allOffers.length,
        rawBookmakers: event.bookmakers,
      };
    });

    events = dedupeEvents(events);

    const baseFiltered = events.filter((event) => {
      const odds = event.bestOdds ?? 0;
      const hasAnyOdds = odds > 0 || (event.rawBookmakers && event.rawBookmakers.length > 0);
      return hasAnyOdds && isWithinTimeWindow(event.commenceTime, config.maxHoursAhead);
    });

    let rangeFiltered = baseFiltered.filter((event) => {
      const odds = event.bestOdds ?? 0;
      return odds === 0 || (odds >= config.minOdds && odds <= config.maxOdds);
    });

    if (rangeFiltered.length === 0 && baseFiltered.length > 0) {
      rangeFiltered = [...baseFiltered].sort(rankEvents).slice(0, 2);
      console.warn(
        `[odds] ${sportKey}: az odds-tartomány szűrő 0 találatot adott, fallback aktiválva (${rangeFiltered.length} esemény).`
      );
    }

    events = rangeFiltered;
    events.sort(rankEvents);

    setCache(cacheKey, events);
    return { events, failed: false };
  } catch (error) {
    console.error(`[odds] fetchSportEvents error (${sportKey}):`, error);
    return {
      events: [],
      failed: true,
      error: error instanceof Error ? error.message : `Unknown fetch error for ${sportKey}`,
    };
  }
}

export type DailySportEvents = {
  sport: string;
  events: OddsEvent[];
  fetchFailed?: boolean;
  error?: string;
};

export async function getDailyEvents(): Promise<DailySportEvents[]> {
  const uniqueLabels = [...new Set(WATCHED_SPORTS.map((s) => s.label))];

  if (!API_KEY || IS_BUILD) {
    return uniqueLabels.map((label) => ({ sport: label, events: [], fetchFailed: false }));
  }

  const dateKey = getUtcDateKey();
  const persistentUsed = await getPersistentDailyCreditsUsed(dateKey);

  if (persistentUsed >= DAILY_CREDIT_LIMIT) {
    console.warn(
      `[odds] Daily credit budget (${DAILY_CREDIT_LIMIT}) already reached for ${dateKey} (used: ${persistentUsed}). Skipping upstream charged calls.`
    );
    return uniqueLabels.map((label) => ({ sport: label, events: [], fetchFailed: false }));
  }

  try {
    const activeSportsRes = await fetch(
      `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}&all=false`,
      { cache: "no-store" }
    );

    if (!activeSportsRes.ok) {
      console.error(`[odds] active sports fetch failed: ${activeSportsRes.status}`);
      return uniqueLabels.map((label) => ({
        sport: label,
        events: [],
        fetchFailed: true,
        error: `Failed to fetch active sports from The Odds API (HTTP ${activeSportsRes.status})`,
      }));
    }

    const activeSports: { key: string; active: boolean; has_outrights: boolean }[] =
      await activeSportsRes.json();

    const activeKeys = new Set<string>(
      activeSports
        .filter((sport) => sport.active && !sport.has_outrights)
        .map((sport) => sport.key)
    );

    const activeWatched = WATCHED_SPORTS.filter((sport) => activeKeys.has(sport.key));
    const balancedActiveWatched = balanceSportsByPriority(activeWatched);
    const remainingCredits = Math.max(0, DAILY_CREDIT_LIMIT - persistentUsed);
    const sportsToFetch: Array<(typeof WATCHED_SPORTS)[number]> = [];

    for (const sport of balancedActiveWatched) {
      if (sportsToFetch.length >= remainingCredits) break;

      const hasUpcomingEvents = await hasUpcomingEventsForSport(sport.key, sport.label);
      if (hasUpcomingEvents === false) {
        console.log(`[odds] ${sport.key}: no events in MatchSignal window, skipping paid odds request.`);
        continue;
      }

      // Discovery errors fail open: do not suppress a sport solely because the free check failed.
      sportsToFetch.push(sport);
      await sleep(100);
    }

    console.log(
      `[odds] Event discovery selected ${sportsToFetch.length} paid candidates from ${activeWatched.length} active watched sports.`
    );

    const activeLabelCount = new Set(sportsToFetch.map((sport) => sport.label)).size;
    const maximumSpecialReserve =
      (sportsToFetch.some((sport) => sport.label === "Football") ? 2 : 0) +
      (sportsToFetch.some((sport) => sport.label === "Tennis") ? 1 : 0);
    const coverageSurplus = Math.max(0, remainingCredits - activeLabelCount);
    const specialMarketReserve = Math.min(maximumSpecialReserve, coverageSurplus);
    const featuredCreditBudget = Math.max(0, remainingCredits - specialMarketReserve);

    const marketPlan = buildFeaturedMarketPlan(sportsToFetch, featuredCreditBudget);
    console.log(
      "[odds] Featured market plan:",
      marketPlan.map((item) => `${item.sport.key}=[${item.marketKeys.join(",")}]`).join(" | ")
    );

    const creditState = { used: persistentUsed };
    const eventsByLabel = new Map<string, OddsEvent[]>();
    const failedByLabel = new Map<string, string>();

    for (const planItem of marketPlan) {
      const sport = planItem.sport;
      if (creditState.used + planItem.marketKeys.length > DAILY_CREDIT_LIMIT) {
        console.warn(
          `[odds] Daily credit budget (${DAILY_CREDIT_LIMIT}) reached, skipping remaining sports.`
        );
        break;
      }

      const { events, failed, error } = await fetchSportEvents(
        sport.key,
        sport.label,
        sport.league,
        planItem.marketKeys,
        creditState,
        dateKey
      );

      if (failed) {
        failedByLabel.set(sport.label, error ?? `Fetch failed for ${sport.key}`);
      } else {
        if (!eventsByLabel.has(sport.label)) {
          eventsByLabel.set(sport.label, []);
        }
        eventsByLabel.get(sport.label)!.push(...events);
      }

      await sleep(INTER_REQUEST_DELAY_MS);
    }

    const footballEvents = eventsByLabel.get("Football") ?? [];
    if (footballEvents.length > 0 && creditState.used < DAILY_CREDIT_LIMIT) {
      const target = [...footballEvents].sort(rankEvents)[0];
      await enrichEventWithAdditionalMarkets(
        target,
        ["double_chance", "draw_no_bet"],
        creditState,
        dateKey
      );
    }

    const tennisEvents = eventsByLabel.get("Tennis") ?? [];
    if (tennisEvents.length > 0 && creditState.used < DAILY_CREDIT_LIMIT) {
      const target = [...tennisEvents].sort(rankEvents)[0];
      await enrichEventWithAdditionalMarkets(
        target,
        ["h2h_s1"],
        creditState,
        dateKey
      );
    }

    console.log(`[odds] Daily credit usage on ${dateKey}: ${creditState.used} / ${DAILY_CREDIT_LIMIT}`);

    const results: DailySportEvents[] = [];

    for (const label of uniqueLabels) {
      if (failedByLabel.has(label)) {
        results.push({
          sport: label,
          events: [],
          fetchFailed: true,
          error: failedByLabel.get(label),
        });
      } else if (eventsByLabel.has(label)) {
        const config = SPORT_CONFIG[label] ?? DEFAULT_CONFIG;
        const rawEvents = eventsByLabel.get(label)!;
        const deduped = dedupeEvents(rawEvents);
        const selected = selectWithLeagueGuarantee(deduped, config.maxEvents);
        results.push({
          sport: label,
          events: selected,
          fetchFailed: false,
        });
      } else {
        // Genuinely off-season or no active games scheduled today
        results.push({
          sport: label,
          events: [],
          fetchFailed: false,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("[odds] getDailyEvents error:", error);
    return uniqueLabels.map((label) => ({
      sport: label,
      events: [],
      fetchFailed: true,
      error: error instanceof Error ? error.message : "getDailyEvents execution failed",
    }));
  }
}