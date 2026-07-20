// app/lib/odds.ts
import { SPORT_CONFIG, DEFAULT_CONFIG } from "./sportsConfig";
import { AFFILIATE_SITES } from "./affiliates";

const API_KEY = process.env.ODDS_API_KEY;
const IS_BUILD = process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV;

const cache = new Map<string, { data: OddsEvent[]; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 10;

// A the-odds-api egy kredit-hívást számol el minden ténylegesen kimenő
// /odds/ kérésért (1 piac x 1 régió = 1 kredit). Ez a napi felső korlát
// az összes sport-ág összesített kreditfelhasználására.
const DAILY_CREDIT_LIMIT = 15;

const WATCHED_SPORTS = [
  { key: "soccer_fifa_world_cup", label: "Football", league: "FIFA World Cup", priority: 1 },
  { key: "soccer_uefa_champs_league_qualification", label: "Football", league: "Champions League Qualification", priority: 2 },
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

async function fetchSportEvents(
  sportKey: string,
  sportLabel: string,
  leagueLabel: string,
  creditState: { used: number }
): Promise<OddsEvent[]> {
  if (!API_KEY || IS_BUILD) return [];

  const cached = getCache(sportKey);
  if (cached) return cached;

  if (creditState.used >= DAILY_CREDIT_LIMIT) {
    console.warn(`[odds] Napi kredit-keret (${DAILY_CREDIT_LIMIT}) elérve, kihagyva: ${sportKey}`);
    return [];
  }

  const config = SPORT_CONFIG[sportLabel] ?? DEFAULT_CONFIG;
  const markets = "h2h";

  try {
    const url =
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/` +
      `?apiKey=${API_KEY}` +
      `&regions=eu` +
      `&markets=${markets}` +
      `&oddsFormat=decimal`;

    creditState.used += 1;
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error(`[odds] ${sportKey} fetch failed: ${response.status}`);
      return [];
    }

    const data = await response.json();

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

    setCache(sportKey, events);
    return events;
  } catch (error) {
    console.error(`[odds] fetchSportEvents error (${sportKey}):`, error);
    return [];
  }
}

export async function getDailyEvents(): Promise<{ sport: string; events: OddsEvent[] }[]> {
  if (!API_KEY || IS_BUILD) {
    const uniqueLabels = [...new Set(WATCHED_SPORTS.map((s) => s.label))];
    return uniqueLabels.map((label) => ({ sport: label, events: [] }));
  }

  try {
    const activeSportsRes = await fetch(
      `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}&all=false`,
      { cache: "no-store" }
    );

    let activeSports: { key: string; active: boolean; has_outrights: boolean }[] = [];
    if (activeSportsRes.ok) {
      activeSports = await activeSportsRes.json();
    }

    const activeKeys = new Set<string>(
      activeSports
        .filter((sport) => sport.active && !sport.has_outrights)
        .map((sport) => sport.key)
    );

    const sportsToFetch = WATCHED_SPORTS
      .filter((sport) => activeKeys.has(sport.key))
      .sort((a, b) => a.priority - b.priority);

    const creditState = { used: 0 };
    const eventsByLabel = new Map<string, OddsEvent[]>();

    for (const sport of sportsToFetch) {
      const events = await fetchSportEvents(sport.key, sport.label, sport.league, creditState);

      if (!eventsByLabel.has(sport.label)) {
        eventsByLabel.set(sport.label, []);
      }

      eventsByLabel.get(sport.label)!.push(...events);
    }

    console.log(`[odds] Napi kreditfelhasználás: ${creditState.used} / ${DAILY_CREDIT_LIMIT}`);

    const results: { sport: string; events: OddsEvent[] }[] = [];

    for (const [label, rawEvents] of eventsByLabel) {
      const config = SPORT_CONFIG[label] ?? DEFAULT_CONFIG;
      const deduped = dedupeEvents(rawEvents);
      const selected = selectWithLeagueGuarantee(deduped, config.maxEvents);
      results.push({ sport: label, events: selected });
    }

    const resultLabels = new Set(results.map((result) => result.sport));
    const uniqueLabels = [...new Set(WATCHED_SPORTS.map((sport) => sport.label))];

    for (const label of uniqueLabels) {
      if (!resultLabels.has(label)) {
        results.push({ sport: label, events: [] });
      }
    }

    return results;
  } catch (error) {
    console.error("[odds] getDailyEvents error:", error);
    const uniqueLabels = [...new Set(WATCHED_SPORTS.map((sport) => sport.label))];
    return uniqueLabels.map((label) => ({ sport: label, events: [] }));
  }
}