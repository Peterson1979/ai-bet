// app/lib/compliance/registry.ts

import {
  AffiliateCompliance,
  AffiliateComplianceOverride,
} from "./types";

/**
 * STREAMLINED AFFILIATE ONBOARDING & COMPLIANCE REGISTRY:
 *
 * 1. COMMERCIAL ONBOARDING (Primary Single-Source):
 *    Add the new affiliate offer to `AFFILIATE_SITES` in `app/lib/affiliates.ts`.
 *    -> It AUTOMATICALLY receives default `status: "unverified"` and `eligibility: UNKNOWN`.
 *    -> The site and builds continue working immediately with zero manual registry edits required.
 *
 * 2. COMPLIANCE ENRICHMENT (Explicit overrides based on authoritative evidence):
 *    When official regulator or operator territory evidence is verified:
 *    Add an explicit override below in `AFFILIATE_COMPLIANCE_OVERRIDES` with `status: "verified"`,
 *    allowed/blocked country lists, auditable sources, and review dates.
 *
 * 3. VALIDATION:
 *    Run `npm run validate:affiliates` to verify that all configured overrides satisfy schema,
 *    evidence requirements, and country code rules.
 */

export const AFFILIATE_COMPLIANCE_OVERRIDES: Record<string, AffiliateComplianceOverride> = {
  betonline: {
    status: "verified",
    affiliateKind: "sportsbook_operator",
    sportsbookVerified: true,
    verificationScope: "blocked_list",
    blockedCountries: [
      "AF", "AU", "CF", "CI", "CU", "CD", "ER", "FR", "GF", "PF",
      "TF", "GN", "GW", "IR", "IQ", "LB", "LR", "LY", "ML", "MT",
      "MM", "KP", "PA", "SL", "SI", "SO", "SD", "SY", "GB", "YE",
      "ZW",
    ],
    sources: [
      {
        type: "operator_service_restriction",
        url: "https://www.betonline.ag/terms-conditions",
        reference: "BetOnline Official Terms & Conditions, Account Eligibility & Prohibited Jurisdictions",
        checkedAt: "2026-08-17",
      },
    ],
    verifiedAt: "2026-08-17",
    reviewAfter: "2027-08-17",
    notes: "Authoritative operator terms restriction list. Non-listed countries remain UNKNOWN until positive affiliate/regulatory evidence is attached.",
  },

  "22bet": {
    status: "verified",
    affiliateKind: "sportsbook_operator",
    sportsbookVerified: true,
    verificationScope: "blocked_list",
    blockedCountries: [
      "GB", "RU", "US", "BY", "LV", "CY", "FR", "IL", "EE", "UA",
      "LT", "MT", "AE", "BE",
    ],
    sources: [
      {
        type: "operator_service_restriction",
        url: "https://news.22bet.com/wiki/22bet-guide/22bet-vpn-account-freeze-kyc-solutions/",
        reference: "22Bet Official Wiki & Terms Guide, Prohibited Registration Jurisdictions",
        checkedAt: "2026-08-17",
      },
    ],
    verifiedAt: "2026-08-17",
    reviewAfter: "2027-08-17",
    notes: "Authoritative operator-owned restricted countries list. Non-listed countries remain UNKNOWN.",
  },

  flexlinks2: {
    status: "verified",
    affiliateKind: "betting_information_service",
    sportsbookVerified: false,
    verificationScope: "global",
    sources: [
      {
        type: "operator_terms",
        url: "https://betql.co/become-betql-affiliate",
        reference: "BetQL Official Affiliate Program - Sports Analytics & Information Service",
        checkedAt: "2026-08-17",
      },
    ],
    verifiedAt: "2026-08-17",
    reviewAfter: "2027-08-17",
    notes: "Betting information and analytics service (Audacy / QL Gaming Group), not a gambling operator. Operator gambling restrictions do not apply.",
  },
};

/**
 * Returns the compliance record for an affiliate.
 * If an explicit override exists in AFFILIATE_COMPLIANCE_OVERRIDES, it returns the merged record.
 * Otherwise, it automatically returns the safe unverified baseline default.
 */
export function getComplianceRecord(affiliateId: string): AffiliateCompliance {
  const override = AFFILIATE_COMPLIANCE_OVERRIDES[affiliateId];

  if (override) {
    return {
      affiliateId,
      affiliateKind: override.affiliateKind ?? "sportsbook_operator",
      status: override.status,
      sportsbookVerified: override.sportsbookVerified ?? null,
      verificationScope: override.verificationScope,
      allowedCountries: override.allowedCountries,
      blockedCountries: override.blockedCountries,
      sources: override.sources ?? [],
      verifiedAt: override.verifiedAt,
      reviewAfter: override.reviewAfter,
      notes: override.notes,
    };
  }

  // Automatic safe default for any active affiliate without explicit override
  return {
    affiliateId,
    affiliateKind: "sportsbook_operator",
    status: "unverified",
    sportsbookVerified: null,
    sources: [],
    notes: "Default baseline compliance (unverified).",
  };
}
