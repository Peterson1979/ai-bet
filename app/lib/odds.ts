import { SPORT_CONFIG, DEFAULT_CONFIG } from "./sportsConfig";

const API_KEY = process.env.ODDS_API_KEY;
const IS_BUILD = process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV;

const cache = new Map<string, { data: OddsEvent[]; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 10;

// A the-odds-api egy kredit-hívást számol el minden ténylegesen kimenő
// /odds/ kérésért (1 piac x 1 régió = 1 kredit). Ez a napi felső korlát
// az összes sport-ág összesített kreditfelhasználására.
const DAILY_CREDIT_LIMIT = 15;

const WATCHED_SPORTS = [
  { key: "soccer_fifa_world_cup",                    label: "Football", league: "FIFA World Cup",              priority: 1 },
  { key: "soccer_uefa_champs_league_qualification",  label: "Football", league: "Champions League Qualification", priority: 2 },
  { key: "soccer_uefa_europa_league",               label: "Football", league: "Europa League",              priority: 2 },
  { key: "soccer_uefa_conference_league",           label: "Football", league: "Conference League",          priority: 2 },
  { key: "soccer_epl",                              label: "Football", league: "Premier League",             priority: 1 },
  { key: "soccer_spain_la_liga",                     label: "Football", league: "La Liga",                    priority: 1 },
  { key: "soccer_germany_bundesliga",                 label: "Football", league: "Bundesliga",                 priority: 1 },
  { key: "soccer_italy_serie_a",                      label: "Football", league: "Serie A",                    priority: 1 },
  { key: "soccer_france_ligue_1",                     label: "Football", league: "Ligue 1",                    priority: 1 },
  { key: "soccer_netherlands_eredivisie",             label: "Football", league: "Eredivisie",                 priority: 3 },
  { key: "soccer_usa_mls",                            label: "Football", league: "MLS",                        priority: 3 },
  { key: "soccer_brazil_campeonato",                  label: "Football", league: "Brazil Série A",             priority: 3 },
  { key: "soccer_conmebol_copa_libertadores",         label: "Football", league: "Copa Libertadores",          priority: 2 },
  { key: "soccer_mexico_ligamx",                      label: "Football", league: "Liga MX",                    priority: 3 },
  { key: "soccer_club_friendlies",                  label: "Football", league: "Club Friendlies",             priority: 4 },
  { key: "basketball_nba",                          label: "NBA",      league: "NBA",                         priority: 1 },
  { key: "basketball_euroleague",             label: "NBA",      league: "EuroLeague",            priority: 2 },
  { key: "americanfootball_nfl",              label: "NFL",      league: "NFL",                   priority: 1 },
  { key: "americanfootball_ncaaf",            label: "NFL",      league: "NCAAF",                 priority: 3 },
  { key: "icehockey_nhl",                     label: "Hockey",   league: "NHL",                   priority: 1 },
  { key: "tennis_atp_wimbledon",              label: "Tennis",   league: "Wimbledon",             priority: 1 },
  { key: "tennis_atp_us_open",                label: "Tennis",   league: "US Open",               priority: 1 },
  { key: "tennis_atp_australian_open",        label: "Tennis",   league: "Australian Open",       priority: 1 },
  { key: "tennis_atp_french_open",            label: "Tennis",   league: "Roland Garros",         priority: 1 },
  { key: "tennis_wta_wimbledon",              label: "Tennis",   league: "WTA Wimbledon",         priority: 1 },
  { key: "tennis_wta_us_open",                label: "Tennis",   league: "WTA US Open",           priority: 1 },
  { key: "tennis_wta_french_open",            label: "Tennis",   league: "WTA Roland Garros",     priority: 1 },
  { key: "tennis_atp_miami_open",             label: "Tennis",   league: "Miami Open",            priority: 2 },
  { key: "tennis_atp_madrid_open",            label: "Tennis",   league: "Madrid Open",           priority: 2 },
  { key: "tennis_atp_rome",                   label: "Tennis",   league: "Rome Masters",          priority: 2 },
  { key: "tennis_atp_canadian_open",          label: "Tennis",   league: "Canadian Open",         priority: 2 },
  { key: "tennis_atp_cincinnati_open",        label: "Tennis",   league: "Cincinnati Open",       priority: 2 },
  { key: "tennis_wta_miami_open",             label: "Tennis",   league: "WTA Miami Open",        priority: 2 },
  { key: "tennis_wta_madrid_open",            label: "Tennis",   league: "WTA Madrid Open",       priority: 2 },
  { key: "tennis_wta_queens_club_champ",      label: "Tennis",   league: "WTA Queen's Club",      priority: 2 },
  { key: "baseball_mlb",                      label: "MLB",      league: "MLB",                   priority: 1 },
  { key: "mma_mixed_martial_arts",            label: "MMA",      league: "MMA",                   priority: 1 },
  { key: "boxing_boxing",                     label: "MMA",      league: "Boxing",                priority: 2 },
];



const MARKET_KEY_MAP: Record<string, string> = {
  "home win":                           "h2h",
  "away win":                           "h2h",
  "draw no bet":                        "h2h",
  "double chance":                      "double_chance",
  "match winner":                       "h2h",
  "moneyline":                          "h2h",
  "moneyline (fight winner)":           "h2h",
  "over 1.5 goals":                     "totals",
  "under 4.5 goals":                    "totals",
  "over 4.5 goals":                     "totals",
  "under 7.5 goals":                    "totals",
  "over 18.5 games":                    "totals",
  "under 30.5 games":                   "totals",
  "player to win a set":                "spreads",
  "handicap games (+3.5)":              "spreads",
  "over 149.5 points":                  "totals",
  "under 179.5 points":                 "totals",
  "over 33.5 points":                   "totals",
  "under 54.5 points":                  "totals",
  "over 7.5 runs":                      "totals",
  "under 9.5 runs":                     "totals",
  "team total over":                    "totals",
  "team total under":                   "totals",
  "team total over 1.5":                "totals",
  "run line (-1.5)":                    "spreads",
  "method of victory (ko/tko or decision)": "h2h",
  "method of victory":                  "h2h",
  "over 2.5 rounds":                    "totals",
  "under 2.5 rounds":                   "totals",
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

function calculateConsensusImpliedProb(
  bookmakers: any[],
  targetTeam: string
): number | null {
  const probs: number[] = [];

  for (const bookmaker of bookmakers) {
    const h2hMarket = bookmaker.markets?.find((m: any) => m.key === "h2h");
    if (!h2hMarket) continue;
    const outcome = h2hMarket.outcomes?.find((o: any) => o.name === targetTeam);
    if (!outcome?.price || outcome.price <= 0) continue;
    probs.push(100 / outcome.price);
  }

  if (probs.length === 0) return null;
  const avg = probs.reduce((sum, p) => sum + p, 0) / probs.length;
  return Number(avg.toFixed(2));
}

export function getConsensusForMarket(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): number | null {
  const isAway = marketType?.toLowerCase().includes("away");
  const targetTeam = isAway ? awayTeam : homeTeam;
  return calculateConsensusImpliedProb(rawBookmakers, targetTeam);
}

export function getBestOddsForMarket(
  rawBookmakers: any[],
  marketType: string,
  homeTeam: string,
  awayTeam: string
): { bestOdds: number | null; bestBookmaker: string; bookmakerRank: number } {
  const apiMarketKey = MARKET_KEY_MAP[marketType?.toLowerCase()] ?? "h2h";
  const isOver = marketType?.toLowerCase().includes("over");
  const isUnder = marketType?.toLowerCase().includes("under");
  const isAway = marketType?.toLowerCase().includes("away");
  const isDouble = marketType?.toLowerCase().includes("double");

  let bestOdds: number | null = null;
  let bestBookmaker = "Unknown";
  let bookmakerRank = 0;

  for (const bookmaker of rawBookmakers) {
    const market = bookmaker.markets?.find((m: any) => m.key === apiMarketKey);
    if (!market) continue;

    let targetOdds: number | null = null;

    if (apiMarketKey === "h2h") {
      if (isAway) {
        const outcome = market.outcomes?.find((o: any) => o.name === awayTeam);
        targetOdds = outcome?.price ?? null;
      } else if (isDouble) {
        const outcome = market.outcomes?.find((o: any) => o.name !== awayTeam);
        targetOdds = outcome?.price ?? null;
      } else {
        const outcome = market.outcomes?.find((o: any) => o.name === homeTeam);
        targetOdds = outcome?.price ?? null;
      }
    } else if (apiMarketKey === "totals") {
      if (isOver) {
        const outcome = market.outcomes?.find((o: any) => o.name?.toLowerCase() === "over");
        targetOdds = outcome?.price ?? null;
      } else if (isUnder) {
        const outcome = market.outcomes?.find((o: any) => o.name?.toLowerCase() === "under");
        targetOdds = outcome?.price ?? null;
      }
    } else if (apiMarketKey === "spreads" || apiMarketKey === "double_chance") {
      targetOdds = market.outcomes?.[0]?.price ?? null;
    }

    if (!targetOdds || targetOdds <= 0) continue;

    if (bestOdds === null || targetOdds > bestOdds) {
      bestOdds = targetOdds;
      bestBookmaker = bookmaker.title || "Unknown";
      bookmakerRank = BOOKMAKER_RANKINGS[bookmaker.title] ?? 3;
    }
  }

  return { bestOdds, bestBookmaker, bookmakerRank };
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
      bookmakerRank: BOOKMAKER_RANKINGS[bookmaker.title] ?? 3,
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

// Egyszerű rangsoroló: több fogadóiroda ad rá árat = megbízhatóbb; egyenlőség
// esetén a jobb (magasabb) odds nyer. Ugyanez a logika, mint eddig a végső
// szűrésnél volt, csak most liga-csoportokon belül és kívül is ezt használjuk.
function rankEvents(a: OddsEvent, b: OddsEvent): number {
  if (b.bookmakerCount !== a.bookmakerCount) {
    return b.bookmakerCount - a.bookmakerCount;
  }
  return (b.bestOdds ?? 0) - (a.bestOdds ?? 0);
}

/**
 * Liganénkénti garantált hely: minden ligából (pl. "Europa League",
 * "Brazil Série A", "MMA") bekerül legalább 1 esemény, mielőtt a maradék
 * helyeket a legjobb (legtöbb bookmaker / legjobb odds) meccsek töltenék fel
 * ligától függetlenül. Így egy forgalmasabb liga sosem tudja teljesen
 * kiszorítani egy kevésbé forgalmas liga egyetlen mérkőzését sem, feltéve
 * hogy van hozzá tényleges, a szűrőkön átment mérkőzés.
 *
 * Ha több liga aktív egyszerre, mint ahány hely elfér (maxEvents), akkor a
 * garantált helyek közül is a legjobbak maradnak versenyben -- ilyenkor nem
 * garantálható MINDEN liga megjelenése, de ez a jelenlegi maxEvents=12
 * mellett a gyakorlatban ritkán fordul elő.
 */
function selectWithLeagueGuarantee(events: OddsEvent[], maxEvents: number): OddsEvent[] {
  if (events.length === 0) return events;

  const byLeague = new Map<string, OddsEvent[]>();
  for (const e of events) {
    const key = e.league || "Unknown";
    if (!byLeague.has(key)) byLeague.set(key, []);
    byLeague.get(key)!.push(e);
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
      const bestOdds = bestOffer?.homeOdds ?? null;
      const impliedProbability = calculateImpliedProbability(bestOdds);

      const consensusImpliedProb = calculateConsensusImpliedProb(
        event.bookmakers || [],
        event.home_team
      );

      const valueDiff =
        consensusImpliedProb !== null && impliedProbability !== null
          ? Number((consensusImpliedProb - impliedProbability).toFixed(2))
          : null;

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
        impliedProbability,
        consensusImpliedProb,
        valueDiff,
        topOffers,
        bookmakerCount: allOffers.length,
        rawBookmakers: event.bookmakers,
      };
    });

    events = dedupeEvents(events);

    // Alap-szűrő: van-e egyáltalán valós odds-adat, és időben belefér-e.
    const baseFiltered = events.filter((e) => {
      const odds = e.bestOdds ?? 0;
      const hasAnyOdds = odds > 0 || (e.rawBookmakers && e.rawBookmakers.length > 0);
      return hasAnyOdds && isWithinTimeWindow(e.commenceTime, config.maxHoursAhead);
    });

    // Odds-tartomány szűrő (minOdds/maxOdds) -- ez szűri ki a túl egyoldalú
    // meccseket (pl. nagyon domináns esélyes vs. esélytelen kihívó).
    let rangeFiltered = baseFiltered.filter((e) => {
      const odds = e.bestOdds ?? 0;
      return odds === 0 || (odds >= config.minOdds && odds <= config.maxOdds);
    });

    // Fallback: ha az odds-tartomány szűrő MINDENT kizárt, de ténylegesen
    // léteztek (időben releváns, valós odds-szal rendelkező) mérkőzések,
    // ne maradjon üresen a nap -- engedjük be a legjobb 1-2 elérhető meccset
    // a tartománytól függetlenül. Ez tipikusan olyan sportoknál fordul elő,
    // ahol nincs liga-szintű megkülönböztetés (pl. MMA), és egy adott napon
    // csak nagyon egyoldalú meccsek vannak.
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
    const uniqueLabels = [...new Set(WATCHED_SPORTS.map(s => s.label))];
    return uniqueLabels.map(label => ({ sport: label, events: [] }));
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
        .filter(s => s.active && !s.has_outrights)
        .map(s => s.key)
    );

    // Globálisan (nem sport-áganként) rangsoroljuk a priority mező szerint,
    // hogy a napi 15 kredites keret mindig a legfontosabb ligákra menjen el
    // elsőként, sport-ágtól függetlenül.
    const sportsToFetch = WATCHED_SPORTS
      .filter(s => activeKeys.has(s.key))
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

    const resultLabels = new Set(results.map(r => r.sport));
    const uniqueLabels = [...new Set(WATCHED_SPORTS.map(s => s.label))];
    for (const label of uniqueLabels) {
      if (!resultLabels.has(label)) {
        results.push({ sport: label, events: [] });
      }
    }

    return results;
  } catch (error) {
    console.error("[odds] getDailyEvents error:", error);
    const uniqueLabels = [...new Set(WATCHED_SPORTS.map(s => s.label))];
    return uniqueLabels.map(label => ({ sport: label, events: [] }));
  }
}
