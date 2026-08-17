// app/lib/compliance/registry.ts

import {
  AffiliateCompliance,
  AffiliateComplianceOverride,
} from "./types";

/**
 * STREAMLINED AFFILIATE ONBOARDING WORKFLOW:
 *
 * 1. COMMERCIAL ONBOARDING (Primary Single-Source):
 *    Add the new affiliate offer to `AFFILIATE_SITES` in `app/lib/affiliates.ts`.
 *    -> It AUTOMATICALLY receives a default `status: "unverified"` and `eligibility: UNKNOWN` compliance state.
 *    -> The site and builds continue working immediately without requiring a second file edit.
 *
 * 2. COMPLIANCE ENRICHMENT (Optional when authoritative data is obtained):
 *    When official regulator or operator territory evidence is verified (e.g., SZTFH, UKGC, MGA):
 *    Add an explicit override below in `AFFILIATE_COMPLIANCE_OVERRIDES` with `status: "verified"`,
 *    allowed/blocked country lists, and auditable sources.
 *
 * 3. VALIDATION:
 *    Run `npm run validate:affiliates` to verify that any configured overrides satisfy schema and date rules.
 */

export const AFFILIATE_COMPLIANCE_OVERRIDES: Record<string, AffiliateComplianceOverride> = {
  // Add explicit verified/blocked compliance overrides here as evidence is collected.
  // Affiliates without an entry below automatically default to "unverified" / "UNKNOWN".
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
    status: "unverified",
    sportsbookVerified: null,
    sources: [],
    notes: "Default baseline compliance (unverified).",
  };
}
