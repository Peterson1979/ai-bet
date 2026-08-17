// app/lib/compliance/validate.ts

import { AffiliateSite } from "../affiliates";
import { AffiliateComplianceOverride } from "./types";

const ISO_COUNTRY_REGEX = /^[A-Z]{2}$/;

const POSITIVE_EVIDENCE_SOURCE_TYPES = new Set([
  "regulator_license",
  "affiliate_program_geo",
  "partner_manager",
  "legal_review",
  "operator_terms",
]);

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  summary: {
    totalActiveAffiliates: number;
    overridesCount: number;
    defaultUnverifiedCount: number;
  };
};

export function validateComplianceRegistry(
  activeAffiliates: AffiliateSite[],
  overrides: Record<string, AffiliateComplianceOverride>
): ValidationResult {
  const errors: string[] = [];

  const activeIds = new Set(
    activeAffiliates
      .filter((s) => s.enabled !== false)
      .map((s) => s.id)
  );

  const overrideIds = Object.keys(overrides);
  let defaultUnverifiedCount = 0;

  // 1. Validate all explicit overrides
  for (const affiliateId of overrideIds) {
    const override = overrides[affiliateId];

    if (!activeIds.has(affiliateId)) {
      errors.push(
        `Compliance override references unknown or inactive affiliateId: "${affiliateId}".`
      );
    }

    if (!override || typeof override !== "object") {
      errors.push(
        `Compliance override for "${affiliateId}" is invalid or malformed.`
      );
      continue;
    }

    // Country codes validation
    const allowed = override.allowedCountries ?? [];
    const blocked = override.blockedCountries ?? [];

    for (const code of allowed) {
      if (typeof code !== "string" || !ISO_COUNTRY_REGEX.test(code.toUpperCase())) {
        errors.push(
          `Affiliate override "${affiliateId}" has invalid allowedCountry code: "${code}". Must be ISO 3166-1 alpha-2.`
        );
      }
    }

    for (const code of blocked) {
      if (typeof code !== "string" || !ISO_COUNTRY_REGEX.test(code.toUpperCase())) {
        errors.push(
          `Affiliate override "${affiliateId}" has invalid blockedCountry code: "${code}". Must be ISO 3166-1 alpha-2.`
        );
      }
    }

    // Check intersection between allowed and blocked
    const allowedUpper = new Set(allowed.map((c) => c.toUpperCase()));
    for (const code of blocked) {
      if (allowedUpper.has(code.toUpperCase())) {
        errors.push(
          `Affiliate override "${affiliateId}" contains country "${code}" in both allowedCountries and blockedCountries.`
        );
      }
    }

    // Verified requirements
    if (override.status === "verified") {
      const sources = override.sources ?? [];
      if (sources.length === 0) {
        errors.push(
          `Affiliate override "${affiliateId}" is marked "verified" but has 0 evidence sources.`
        );
      }

      if (!override.verifiedAt || typeof override.verifiedAt !== "string") {
        errors.push(
          `Affiliate override "${affiliateId}" is marked "verified" but is missing verifiedAt date.`
        );
      } else {
        const vDate = new Date(override.verifiedAt);
        if (Number.isNaN(vDate.getTime())) {
          errors.push(
            `Affiliate override "${affiliateId}" has invalid verifiedAt date format: "${override.verifiedAt}".`
          );
        }
      }

      if (override.reviewAfter && override.verifiedAt) {
        const vDate = new Date(override.verifiedAt);
        const rDate = new Date(override.reviewAfter);
        if (Number.isNaN(rDate.getTime())) {
          errors.push(
            `Affiliate override "${affiliateId}" has invalid reviewAfter date format: "${override.reviewAfter}".`
          );
        } else if (rDate.getTime() < vDate.getTime()) {
          errors.push(
            `Affiliate override "${affiliateId}" has reviewAfter (${override.reviewAfter}) earlier than verifiedAt (${override.verifiedAt}).`
          );
        }
      }

      // Conservative semantics checks:
      // A sportsbook operator cannot be declared globally verified based solely on service restriction lists
      const isSportsbook =
        !override.affiliateKind || override.affiliateKind === "sportsbook_operator";
      const hasOnlyRestrictionSources = sources.every(
        (s) => s.type === "operator_service_restriction"
      );

      if (isSportsbook && override.verificationScope === "global" && hasOnlyRestrictionSources) {
        errors.push(
          `Affiliate override "${affiliateId}" is a sportsbook operator marked globally verified with only operator_service_restriction sources. Positive eligibility evidence is required for global scope.`
        );
      }

      if (allowed.length > 0) {
        const hasPositiveEvidence = sources.some((s) =>
          POSITIVE_EVIDENCE_SOURCE_TYPES.has(s.type)
        );
        if (!hasPositiveEvidence) {
          errors.push(
            `Affiliate override "${affiliateId}" specifies allowedCountries but lacks positive evidence sources (e.g. regulator_license, affiliate_program_geo, partner_manager, legal_review).`
          );
        }
      }
    }

    // Source records validation
    for (const src of override.sources ?? []) {
      if (!src.type || typeof src.type !== "string") {
        errors.push(
          `Affiliate override "${affiliateId}" has a source missing required type.`
        );
      }
      if (!src.checkedAt || typeof src.checkedAt !== "string") {
        errors.push(
          `Affiliate override "${affiliateId}" has a source missing required checkedAt date.`
        );
      }
    }
  }

  // 2. Count default unverified affiliates
  for (const id of activeIds) {
    if (!overrides[id]) {
      defaultUnverifiedCount += 1;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    summary: {
      totalActiveAffiliates: activeIds.size,
      overridesCount: overrideIds.length,
      defaultUnverifiedCount,
    },
  };
}
