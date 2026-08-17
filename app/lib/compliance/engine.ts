// app/lib/compliance/engine.ts

import {
  AffiliateCompliance,
  AffiliateComplianceStatus,
  AffiliateEligibility,
} from "./types";
import { getComplianceRecord } from "./registry";

/**
 * Returns the effective compliance status taking review expiration into account.
 * If a verified record's reviewAfter date has passed, its effective status becomes "needs_review".
 */
export function getEffectiveComplianceStatus(
  record: AffiliateCompliance,
  now: Date = new Date()
): AffiliateComplianceStatus {
  if (record.status !== "verified") {
    return record.status;
  }

  if (record.reviewAfter) {
    const reviewDate = new Date(record.reviewAfter);
    if (!Number.isNaN(reviewDate.getTime()) && reviewDate.getTime() < now.getTime()) {
      return "needs_review";
    }
  }

  return "verified";
}

/**
 * Pure function evaluating 3-state country eligibility for an affiliate compliance record.
 * Returns KNOWN_ELIGIBLE, KNOWN_INELIGIBLE, or UNKNOWN.
 */
export function evaluateAffiliateEligibility(
  record: AffiliateCompliance,
  countryCode?: string,
  now: Date = new Date()
): AffiliateEligibility {
  // 1. Permanently blocked or disabled affiliates are always ineligible
  if (record.status === "blocked" || record.status === "disabled") {
    return "KNOWN_INELIGIBLE";
  }

  // 2. Unverified or expired review status yields UNKNOWN
  const effectiveStatus = getEffectiveComplianceStatus(record, now);
  if (effectiveStatus !== "verified") {
    return "UNKNOWN";
  }

  // 3. If no country signal is provided, eligibility cannot be verified
  if (!countryCode || typeof countryCode !== "string") {
    return "UNKNOWN";
  }

  const normalizedCountry = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalizedCountry)) {
    return "UNKNOWN";
  }

  const blocked = (record.blockedCountries ?? []).map((c) => c.toUpperCase());
  const allowed = (record.allowedCountries ?? []).map((c) => c.toUpperCase());

  // 4. If country is explicitly in the verified blocked list -> KNOWN_INELIGIBLE
  if (blocked.includes(normalizedCountry)) {
    return "KNOWN_INELIGIBLE";
  }

  // 5. If an explicit allowed list is defined:
  if (record.allowedCountries && record.allowedCountries.length > 0) {
    if (allowed.includes(normalizedCountry)) {
      return "KNOWN_ELIGIBLE";
    }
    // Explicit allow-list where country is absent -> KNOWN_INELIGIBLE
    return "KNOWN_INELIGIBLE";
  }

  // 6. If only blockedCountries is defined:
  if (record.blockedCountries && record.blockedCountries.length > 0) {
    if (record.verificationScope === "blocked_list" || record.verificationScope === "global") {
      return "KNOWN_ELIGIBLE";
    }
    return "UNKNOWN";
  }

  // 7. Global verification scope without specific country lists:
  if (record.verificationScope === "global") {
    return "KNOWN_ELIGIBLE";
  }

  return "UNKNOWN";
}

/**
 * Server helper for evaluating affiliate eligibility by ID and request country.
 */
export function getAffiliateEligibility(
  affiliateId: string,
  countryCode?: string,
  now: Date = new Date()
): AffiliateEligibility {
  const record = getComplianceRecord(affiliateId);
  if (!record) {
    return "UNKNOWN";
  }
  return evaluateAffiliateEligibility(record, countryCode, now);
}
