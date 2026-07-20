// app/lib/affiliates.ts
// Strukturált affiliate rendszer tracking paraméterekkel

export type AffiliateSource =
  | "sidebar"
  | "matchcard"
  | "banner"
  | "slider"
  | "featured";

export type AffiliateSite = {
  id: string;
  name: string;
  rating: number;
  bonus: string;
  baseUrl: string;
  trackingParams?: string;
  sports?: string[];
  logoUrl?: string;
  aliases?: string[];
  enabled?: boolean;
};

export const AFFILIATE_SITES: AffiliateSite[] = [
  {
    id: "betonline",
    name: "BetOnline",
    rating: 9.7,
    bonus: "Up to 250 USD in Free Bets",
    baseUrl:
      "https://record.betonlineaffiliates.ag/_6DV8-IUj_sbYJMJFEJBL7mNd7ZgqdRLk/1/",
    logoUrl: "/logos/affiliates/betonline.png",
    aliases: ["betonline", "bet online", "betonline.ag"],
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
    enabled: true,
  },
  {
    id: "sportsbetting",
    name: "SportsBetting.ag",
    rating: 9.6,
    bonus: "50% Welcome Bonus",
    baseUrl:
      "https://record.sportsbettingaffiliates.ag/_6DV8-IUj_sah_7RUBh20pWNd7ZgqdRLk/1/",
    logoUrl: "/logos/affiliates/sportsbetting.png",
    aliases: [
      "sportsbetting",
      "sportsbetting.ag",
      "sports betting",
      "sportsbettingag",
    ],
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
    enabled: true,
  },
  {
 
    id: "22bet",
    name: "22Bet",
    rating: 9.5,
    bonus: "Up to 100% Bonus",
    baseUrl:
      "https://che.fluxbrox.com/redirect.aspx?pid=177879&bid=1484&redirectURL=https%3A%2F%2F22link.world%2F",
    logoUrl: "/logos/affiliates/22bet.png",
    aliases: ["22bet", "22 bet"],
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
    enabled: true,
  },
  {
    id: "1win",
    name: "1win",
    rating: 9.2,
    bonus: "Multiple Bet Bonus",
    baseUrl: "https://one-vv5693.com/betting?p=840g",
    logoUrl: "/logos/affiliates/1win.png",
    aliases: ["1win", "1 win"],
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
    enabled: true,
  },
  {
    id: "betlabel",
    name: "BetLabel",
    rating: 8.9,
    bonus: "Up to 100 EUR Bonus",
    baseUrl:
      "https://che.fluxbrox.com/redirect.aspx?pid=177879&bid=1650&redirectURL=https%3A%2F%2Fblmedia.world%2F",
    logoUrl: "/logos/affiliates/betlabel.png",
    aliases: ["betlabel", "bet label"],
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
    enabled: true,
  },
  {
    id: "flexlinks1",
    name: "Oddsjam",
    rating: 8.7,
    bonus: "Exclusive Offer",
    baseUrl:
      "https://track.flexlinkspro.com/g.ashx?foid=1.53600.1000000017&trid=1549943.243014&foc=16&fot=9999&fos=6",
    logoUrl: "/logos/affiliates/oddsjam.png",
    aliases: ["oddsjam", "odds jam"],
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
    enabled: true,
  },
  {
    id: "flexlinks2",
    name: "BetQL",
    rating: 8.6,
    bonus: "Exclusive Offer",
    baseUrl:
      "https://track.flexlinkspro.com/g.ashx?foid=24.244100.6669976&trid=1549943.244100&foc=16&fot=9999&fos=6",
    logoUrl: "/logos/affiliates/betql.png",
    aliases: ["betql", "bet ql"],
    sports: [
      "Football",
      "NBA",
      "NFL",
      "Hockey",
      "Tennis",
      "Baseball",
      "MMA/BOXING",
    ],
    enabled: true,
  },
];

// ======================
// HELPERS
// ======================

function normalizeBookmakerName(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function isSiteEnabled(site: AffiliateSite): boolean {
  return site.enabled !== false;
}

function supportsSport(site: AffiliateSite, sport: string): boolean {
  const normalizedSport = normalizeBookmakerName(sport);

  return (site.sports ?? []).some((item) => {
    const normalizedItem = normalizeBookmakerName(item);

    return (
      normalizedItem === normalizedSport ||
      normalizedItem.includes(normalizedSport) ||
      normalizedSport.includes(normalizedItem) ||
      (normalizedSport === "mlb" && normalizedItem.includes("baseball")) ||
      (normalizedSport === "mma" && normalizedItem.includes("mma")) ||
      (normalizedSport === "mma" && normalizedItem.includes("boxing"))
    );
  });
}

export function buildAffiliateUrl(
  site: AffiliateSite,
  source: AffiliateSource = "sidebar"
): string {
  // Ha a baseUrl redirect-alapú tracking URL, ne módosítsd a redirectURL-t
  if (site.baseUrl.includes("redirectURL=")) {
    const url = new URL(site.baseUrl);
    url.searchParams.set("sub1", source);
    url.searchParams.set("sub2", site.id);
    return url.toString();
  }

  const url = new URL(site.baseUrl);
  const params = new URLSearchParams(site.trackingParams ?? "");

  params.set("utm_source", "betai");
  params.set("utm_medium", source);
  params.set("utm_campaign", site.id);

  params.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

export function getSidebarSites() {
  return AFFILIATE_SITES.filter(isSiteEnabled).map((site) => ({
    ...site,
    url: buildAffiliateUrl(site, "sidebar"),
  }));
}

export function getSliderSites() {
  return [...AFFILIATE_SITES]
    .filter(isSiteEnabled)
    .sort((a, b) => b.rating - a.rating)
    .map((site) => ({
      ...site,
      url: buildAffiliateUrl(site, "slider"),
    }));
}

export function getFeaturedSites(count: number = 3) {
  return [...AFFILIATE_SITES]
    .filter(isSiteEnabled)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count)
    .map((site) => ({
      ...site,
      url: buildAffiliateUrl(site, "featured"),
    }));
}

export function getTopRatedList(count: number = 3) {
  return getFeaturedSites(count);
}

export function findAffiliateSiteByName(
  bookmakerName: string
): AffiliateSite | undefined {
  const normalized = normalizeBookmakerName(bookmakerName);

  return AFFILIATE_SITES.filter(isSiteEnabled).find((site) => {
    const candidates = [site.id, site.name, ...(site.aliases ?? [])].map(
      normalizeBookmakerName
    );

    return candidates.includes(normalized);
  });
}

export function getMatchCardUrl(sport: string): string {
  const bySport = AFFILIATE_SITES.filter(isSiteEnabled).find((site) =>
    supportsSport(site, sport)
  );

  if (bySport) {
    return buildAffiliateUrl(bySport, "matchcard");
  }

  const fallback = AFFILIATE_SITES.filter(isSiteEnabled).sort(
    (a, b) => b.rating - a.rating
  )[0];

  return fallback ? buildAffiliateUrl(fallback, "matchcard") : "#";
}

export function getBookmakerAffiliateUrl(
  bookmakerName: string,
  sport: string
): string {
  const match = findAffiliateSiteByName(bookmakerName);

  if (match) {
    return buildAffiliateUrl(match, "matchcard");
  }

  return getMatchCardUrl(sport);
}

export function getBadgeLabel(site: AffiliateSite): string {
  const sortedByRating = [...AFFILIATE_SITES]
    .filter(isSiteEnabled)
    .sort((a, b) => b.rating - a.rating);

  const rank = sortedByRating.findIndex((s) => s.id === site.id);

  if (rank === 0) return "Top Rated";
  if (rank === 1) return "Best Odds";
  if (rank === 2) return "Editor's Pick";
  if (site.rating >= 9.0) return "Highly Recommended";
  return "Trusted Partner";
}

export function getSiteByBookmakerName(
  bookmakerName: string
): AffiliateSite | undefined {
  return findAffiliateSiteByName(bookmakerName);
}