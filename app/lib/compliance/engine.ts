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
 * Returns KNOWN_ELIGIBLE, KNOWN_INELIGIBLE, or UNKNOWN under conservative compliance semantics.
 *
 * CONSERVATIVE COMPLIANCE RULES:
 * 1. Blocked/Disabled status -> KNOWN_INELIGIBLE.
 * 2. Unverified/Needs Review status -> UNKNOWN.
 * 3. Missing/Invalid country signal -> UNKNOWN.
 * 4. Country listed in blockedCountries -> KNOWN_INELIGIBLE.
 * 5. Country listed in verified allowedCountries -> KNOWN_ELIGIBLE.
 * 6. Country not listed in allowedCountries:
 *    - If verificationScope is exhaustive "allowed_list" -> KNOWN_INELIGIBLE.
 *    - Otherwise -> UNKNOWN.
 * 7. Blocked-list only record:
 *    - Country in blocked list -> KNOWN_INELIGIBLE.
 *    - Non-blocked country -> UNKNOWN (Absence from a restriction list is NOT positive permission).
 * 8. Information services (e.g. BetQL):
 *    - Evaluated as non-operator analytics tools. Global verification yields KNOWN_ELIGIBLE unless blocked.
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

  // 4. Explicitly blocked country -> KNOWN_INELIGIBLE
  if (blocked.includes(normalizedCountry)) {
    return "KNOWN_INELIGIBLE";
  }

  // 5. Betting information / analytics tools (non-gambling operators)
  if (record.affiliateKind === "betting_information_service") {
    if (record.verificationScope === "global") {
      return "KNOWN_ELIGIBLE";
    }
    if (allowed.length > 0) {
      return allowed.includes(normalizedCountry) ? "KNOWN_ELIGIBLE" : "UNKNOWN";
    }
    return "UNKNOWN";
  }

  // 6. Sportsbook operators with explicit allowedCountries list
  if (allowed.length > 0) {
    if (allowed.includes(normalizedCountry)) {
      return "KNOWN_ELIGIBLE";
    }
    if (record.verificationScope === "allowed_list") {
      return "KNOWN_INELIGIBLE";
    }
    return "UNKNOWN";
  }

  // 7. Sportsbook operators with blockedCountries only (or global scope without positive whitelist)
  // Non-blocked countries remain UNKNOWN until positive licensing/affiliate evidence is attached.
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
  return evaluateAffiliateEligibility(record, countryCode, now);
}
