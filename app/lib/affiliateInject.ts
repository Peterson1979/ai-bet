// app/lib/affiliateInject.ts

import {
  buildAffiliateUrl,
  getMatchCardUrl,
  getSiteByBookmakerName,
} from "@/app/lib/affiliates";
import type { MatchCardData, AffiliateOffer } from "@/app/types/match";

function toAffiliateOffer(
  match: MatchCardData,
  siteName: string | null | undefined
): AffiliateOffer | undefined {
  if (!siteName) return undefined;

  const site = getSiteByBookmakerName(siteName);
  if (!site) return undefined;

  return {
    bookmakerKey: site.id,
    bookmakerName: site.name,
    trackingUrl: buildAffiliateUrl(site, "matchcard"),
    logoUrl: site.logoUrl,
    rating:
      typeof match.partnerRating === "number" ? match.partnerRating : site.rating,
    odds: typeof match.partnerOdds === "number" ? match.partnerOdds : null,
    badgeLabel: null,
  };
}

export function injectAffiliateOffer(match: MatchCardData): MatchCardData {
  const preferredSiteName = match.partnerBookmaker || match.bookmaker || null;
  const partnerOffer = toAffiliateOffer(match, preferredSiteName);

  if (partnerOffer) {
    return {
      ...match,
      partnerOffer,
      partnerBookmaker: partnerOffer.bookmakerName,
      partnerRating: partnerOffer.rating ?? null,
      partnerOdds:
        typeof partnerOffer.odds === "number"
          ? partnerOffer.odds
          : match.partnerOdds ?? null,
      bookmakerUrl: partnerOffer.trackingUrl,
      ctaLabel: `View odds at ${partnerOffer.bookmakerName}`,
    };
  }

  return {
    ...match,
    partnerOffer: undefined,
    bookmakerUrl:
      match.bookmakerUrl && match.bookmakerUrl !== "#"
        ? match.bookmakerUrl
        : getMatchCardUrl(match.sport),
  };
}