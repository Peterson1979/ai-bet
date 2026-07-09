// app/lib/affiliates.ts
// Strukturált affiliate rendszer tracking paraméterekkel

export type AffiliateSite = {
  id: string;
  name: string;
  rating: number;
  bonus: string;
  baseUrl: string;
  trackingParams?: string;
  sports?: string[];
  logoUrl?: string;
};

// ======================
// AFFILIATE SITES CONFIG
// ======================

export const AFFILIATE_SITES: AffiliateSite[] = [
  {
    id: "betonline",
    name: "BetOnline",
    rating: 9.7,
    bonus: "Up to 250 USD in Free Bets",
    baseUrl:
      "https://record.betonlineaffiliates.ag/_6DV8-IUj_sbYJMJFEJBL7mNd7ZgqdRLk/1/",
    logoUrl: "/logos/affiliates/betonline.svg",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
  },

  {
    id: "sportsbetting",
    name: "SportsBetting.ag",
    rating: 9.6,
    bonus: "50% Welcome Bonus",
    baseUrl:
      "https://record.sportsbettingaffiliates.ag/_6DV8-IUj_sah_7RUBh20pWNd7ZgqdRLk/1/",
    logoUrl: "/logos/affiliates/sportsbetting.svg",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
  },

  {
    id: "22bet",
    name: "22Bet",
    rating: 9.5,
    bonus: "Up to 100% Bonus",
    baseUrl:
      "https://che.fluxbrox.com/redirect.aspx?pid=177879&bid=1484&redirectURL=https://22link.world/",
    trackingParams: "?mid=YOUR_ID",
    logoUrl: "/logos/affiliates/22bet.svg",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
  },

  {
    id: "1win",
    name: "1win",
    rating: 9.2,
    bonus: "Multiple Bet Bonus",
    baseUrl: "https://r1wdhtx.life/betting?p=3q5b",
    trackingParams: "?affid=YOUR_ID",
    logoUrl: "/logos/affiliates/1win.svg",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
  },

  {
    id: "betlabel",
    name: "BetLabel",
    rating: 8.9,
    bonus: "Up to 100 EUR Bonus",
    baseUrl:
      "https://che.fluxbrox.com/redirect.aspx?pid=177879&bid=1650&redirectURL=https://blmedia.world/",
    trackingParams: "?affid=YOUR_ID",
    logoUrl: "/logos/affiliates/betlabel.svg",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
  },

  // NEW
  {
    id: "flexlinks1",
    name: "Oddsjam",
    rating: 8.7,
    bonus: "Exclusive Offer",
    baseUrl:
      "https://track.flexlinkspro.com/g.ashx?foid=1.53600.1000000017&trid=1549943.243014&foc=16&fot=9999&fos=6",
    logoUrl: "/logos/affiliates/oddsjam.svg",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
  },

  // NEW
  {
    id: "flexlinks2",
    name: "BetQL",
    rating: 8.6,
    bonus: "Exclusive Offer",
    baseUrl:
      "https://track.flexlinkspro.com/g.ashx?foid=24.244100.6669976&trid=1549943.244100&foc=16&fot=9999&fos=6",
    logoUrl: "/logos/affiliates/betql.svg",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
  },
];

// ======================
// HELPERS
// ======================

export function buildAffiliateUrl(
  site: AffiliateSite,
  source: "sidebar" | "matchcard" | "banner" | "slider" | "featured" = "sidebar"
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
 * Sidebar "Top Betting Sites" (legacy — a sportág-oldal jelenlegi
 * oldalsávjában használatos; a kompakt sávra váltáskor is felhasználható)
 */
export function getSidebarSites() {
  return AFFILIATE_SITES.map((site) => ({
    ...site,
    url: buildAffiliateUrl(site, "sidebar"),
  }));
}

/**
 * Affiliate Slider — ÖSSZES site, rating szerint csökkenő sorrendben.
 * Ez fut végig vízszintesen a Hero alatt.
 */
export function getSliderSites() {
  return [...AFFILIATE_SITES]
    .sort((a, b) => b.rating - a.rating)
    .map((site) => ({
      ...site,
      url: buildAffiliateUrl(site, "slider"),
    }));
}

/**
 * Featured Sportsbooks — Top 3 (Editor's Picks), rating szerint.
 */
export function getFeaturedSites(count: number = 3) {
  return [...AFFILIATE_SITES]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count)
    .map((site) => ({
      ...site,
      url: buildAffiliateUrl(site, "featured"),
    }));
}

/**
 * 🏆 Top Rated Sportsbooks — kompakt lista (footer felett és a
 * sportág-oldal kompakt sávjában is ezt használjuk).
 */
export function getTopRatedList(count: number = 3) {
  return getFeaturedSites(count);
}

/**
 * MatchCard CTA URL — sport alapján választ (A/C verzió esetén,
 * amikor nincs konkrét bookmakerName megadva)
 */
export function getMatchCardUrl(sport: string): string {
  const bySport = AFFILIATE_SITES.find((s) => s.sports?.includes(sport));

  if (bySport) {
    return buildAffiliateUrl(bySport, "matchcard");
  }

  return buildAffiliateUrl(AFFILIATE_SITES[0], "matchcard");
}

/**
 * Bookmaker neve alapján affiliate URL
 */
export function getBookmakerAffiliateUrl(
  bookmakerName: string,
  sport: string
): string {
  const normalized = bookmakerName.toLowerCase().replace(/\s/g, "");

  const match = AFFILIATE_SITES.find(
    (s) =>
      s.id === normalized ||
      s.name.toLowerCase().replace(/\s/g, "") === normalized
  );

  if (match) {
    return buildAffiliateUrl(match, "matchcard");
  }

  return getMatchCardUrl(sport);
}

/**
 * Rule-based indoklás a matchcard "B" CTA verzióhoz
 * ("Best Odds", "Top Rated", stb.) — nem AI generálja, konzisztens
 * marad minden megjelenésnél ugyanahhoz a site-hoz.
 *
 * A rangsor a getSliderSites()/getFeaturedSites() ugyanazon rating
 * mezőjéből származik, tehát a slider, a featured kártyák és a
 * matchcard badge sosem mond ellent egymásnak.
 */
export function getBadgeLabel(site: AffiliateSite): string {
  const sortedByRating = [...AFFILIATE_SITES].sort(
    (a, b) => b.rating - a.rating
  );
  const rank = sortedByRating.findIndex((s) => s.id === site.id);

  if (rank === 0) return "Top Rated";
  if (rank === 1) return "Best Odds";
  if (rank === 2) return "Editor's Pick";
  if (site.rating >= 9.0) return "Highly Recommended";
  return "Trusted Partner";
}

/**
 * Adott bookmaker neve alapján visszaadja a teljes AffiliateSite
 * objektumot (logóhoz, ratinghez, badge-hez szükséges a matchcard
 * "B" verziójában).
 */
export function getSiteByBookmakerName(
  bookmakerName: string
): AffiliateSite | undefined {
  const normalized = bookmakerName.toLowerCase().replace(/\s/g, "");
  return AFFILIATE_SITES.find(
    (s) =>
      s.id === normalized ||
      s.name.toLowerCase().replace(/\s/g, "") === normalized
  );
}