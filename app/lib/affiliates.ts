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
      "https://record.betonlineaffiliates.ag/_6DV8-IUj_sa6tyDIijdDK2Nd7ZgqdRLk/1/",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA",
    ],
  },


  {
    id: "sportsbetting",
    name: "SportsBetting.ag",
    rating: 9.6,
    bonus: "50% Welcome Bonus",
    baseUrl:
      "https://record.sportsbettingaffiliates.ag/_6DV8-IUj_sah_7RUBh20pWNd7ZgqdRLk/1/",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA",
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
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA",
    ],
  },


  {
    id: "1win",
    name: "1win",
    rating: 9.2,
    bonus: "Multiple Bet Bonus",
    baseUrl:
      "https://r1wfmvd.life/betting?p=3q5b",
    trackingParams: "?affid=YOUR_ID",
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA",
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
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA",
    ],
  },

];


// ======================
// HELPERS
// ======================


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
 * Sidebar "Top Betting Sites"
 */
export function getSidebarSites() {

  return AFFILIATE_SITES.map((site) => ({
    ...site,
    url: buildAffiliateUrl(site, "sidebar"),
  }));

}


/**
 * MatchCard CTA URL — sport alapján választ
 */
export function getMatchCardUrl(
  sport: string
): string {

  const bySport = AFFILIATE_SITES.find((s) =>
    s.sports?.includes(sport)
  );


  if (bySport) {
    return buildAffiliateUrl(
      bySport,
      "matchcard"
    );
  }


  return buildAffiliateUrl(
    AFFILIATE_SITES[0],
    "matchcard"
  );
}


/**
 * Bookmaker neve alapján affiliate URL
 */
export function getBookmakerAffiliateUrl(
  bookmakerName: string,
  sport: string
): string {

  const normalized =
    bookmakerName
      .toLowerCase()
      .replace(/\s/g, "");


  const match = AFFILIATE_SITES.find(
    (s) =>
      s.id === normalized ||
      s.name
        .toLowerCase()
        .replace(/\s/g, "") === normalized
  );


  if (match) {
    return buildAffiliateUrl(
      match,
      "matchcard"
    );
  }


  return getMatchCardUrl(sport);
}