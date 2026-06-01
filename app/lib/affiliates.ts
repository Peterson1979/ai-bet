// app/lib/affiliates.ts
// Strukturált affiliate rendszer tracking paraméterekkel
// URL-eket cseréld le valódi affiliate linkekre!

export type AffiliateSite = {
  id: string;
  name: string;
  rating: number;
  bonus: string;
  baseUrl: string;
  // UTM / affiliate tracking params — a sportsbook által adott
  trackingParams?: string;
  // Melyik sportokhoz jelenik meg a MatchCard CTA-ban
  sports?: string[];
  // Melyik ligákhoz releváns
  leagues?: string[];
};

// ======================
// AFFILIATE SITES CONFIG
// Cseréld le a baseUrl-eket a valódi affiliate linkekre!
// ======================
export const AFFILIATE_SITES: AffiliateSite[] = [
  {
    id: "bet365",
    name: "Bet365",
    rating: 9.8,
    bonus: "Up to $150 Bonus",
    baseUrl: "https://www.bet365.com",       // ← cseréld affiliate linkre
    trackingParams: "?affid=YOUR_ID",
    sports: ["Football", "NBA", "NFL", "Hockey", "Tennis"],
    leagues: ["Premier League", "Bundesliga", "Serie A", "La Liga"],
  },
  {
    id: "1xbet",
    name: "1xBet",
    rating: 9.5,
    bonus: "Up to $200 Bonus",
    baseUrl: "https://refpa1xbet.top/L",     // ← cseréld affiliate linkre
    trackingParams: "?mid=YOUR_ID",
    sports: ["Football", "NBA", "NHL", "Tennis"],
    leagues: ["Premier League", "La Liga", "Serie A"],
  },
  {
    id: "bwin",
    name: "Bwin",
    rating: 9.2,
    bonus: "Up to $100 Bonus",
    baseUrl: "https://affiliates.bwin.com",  // ← cseréld affiliate linkre
    trackingParams: "?affid=YOUR_ID",
    sports: ["Football", "NBA", "Tennis"],
    leagues: ["Bundesliga", "Serie A", "La Liga"],
  },
];

// ======================
// HELPERS
// ======================

/**
 * Teljes affiliate URL összerakása tracking paraméterekkel
 */
export function buildAffiliateUrl(
  site: AffiliateSite,
  source: "sidebar" | "matchcard" | "banner" = "sidebar"
): string {
  const utmParams = new URLSearchParams({
    utm_source: "betai",
    utm_medium: source,
    utm_campaign: site.id,
  }).toString();

  const base = site.baseUrl + (site.trackingParams ?? "");
  const separator = base.includes("?") ? "&" : "?";

  return `${base}${separator}${utmParams}`;
}

/**
 * Sidebar "Top Betting Sites" lista — mind a 3 site
 */
export function getSidebarSites() {
  return AFFILIATE_SITES.map((site) => ({
    ...site,
    url: buildAffiliateUrl(site, "sidebar"),
  }));
}

/**
 * MatchCard CTA URL — sport és liga alapján legjobb affiliate
 */
export function getMatchCardUrl(
  sport: string,
  league: string
): string {
  // Keressünk ligára illő site-ot
  const byLeague = AFFILIATE_SITES.find(
    (s) => s.leagues?.includes(league)
  );
  if (byLeague) return buildAffiliateUrl(byLeague, "matchcard");

  // Sportra illő site
  const bySport = AFFILIATE_SITES.find(
    (s) => s.sports?.includes(sport)
  );
  if (bySport) return buildAffiliateUrl(bySport, "matchcard");

  // Fallback: legjobb értékelésű
  return buildAffiliateUrl(AFFILIATE_SITES[0], "matchcard");
}

/**
 * Bookmaker neve alapján megkeresi a megfelelő affiliate URL-t
 */
export function getBookmakerAffiliateUrl(
  bookmakerName: string,
  sport: string,
  league: string
): string {
  const normalized = bookmakerName.toLowerCase().replace(/\s/g, "");

  const match = AFFILIATE_SITES.find((s) =>
    s.id === normalized || s.name.toLowerCase().replace(/\s/g, "") === normalized
  );

  if (match) return buildAffiliateUrl(match, "matchcard");

  return getMatchCardUrl(sport, league);
}
