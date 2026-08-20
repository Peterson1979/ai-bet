// app/lib/affiliateInject.ts

import {
  buildAffiliateUrl,
  getSiteByBookmakerName,
} from "@/app/lib/affiliates";
import type { MatchCardData, AffiliateOffer } from "@/app/types/match";

function toAffiliateOffer(
  match: MatchCardData,
  siteName: string | null | undefined
): AffiliateOffer | undefined {
  if (
    !siteName ||
    typeof match.partnerOdds !== "number" ||
    !Number.isFinite(match.partnerOdds) ||
    match.partnerOdds <= 1
  ) {
    return undefined;
  }

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
  const preferredSiteName = match.partnerBookmaker || null;
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
    partnerOdds: null,
    partnerBookmaker: null,
    partnerRating: null,
    bookmakerUrl: null,
    ctaLabel: null,
  };
}
