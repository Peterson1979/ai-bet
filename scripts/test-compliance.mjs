// scripts/test-compliance.mjs

import assert from "node:assert/strict";
import { AFFILIATE_SITES } from "../app/lib/affiliates.ts";
import {
  AFFILIATE_COMPLIANCE_OVERRIDES,
  getComplianceRecord,
} from "../app/lib/compliance/registry.ts";
import { validateComplianceRegistry } from "../app/lib/compliance/validate.ts";
import {
  evaluateAffiliateEligibility,
  getEffectiveComplianceStatus,
} from "../app/lib/compliance/engine.ts";
import { getRequestCountry } from "../app/lib/compliance/geo.ts";

console.log("\n==========================================");
console.log(" EXECUTING PHASE B1 COMPLIANCE TESTS ");
console.log("==========================================\n");

// Test 1: BetOnline FR -> KNOWN_INELIGIBLE
const betonlineRecord = getComplianceRecord("betonline");
assert.equal(
  evaluateAffiliateEligibility(betonlineRecord, "FR"),
  "KNOWN_INELIGIBLE",
  "Test 1 failed: BetOnline must be KNOWN_INELIGIBLE in France (FR)"
);
console.log("✔ Test 1: BetOnline in FR -> KNOWN_INELIGIBLE (operator service restriction).");

// Test 2: BetOnline HU -> UNKNOWN
assert.equal(
  evaluateAffiliateEligibility(betonlineRecord, "HU"),
  "UNKNOWN",
  "Test 2 failed: BetOnline in Hungary (HU) must be UNKNOWN (no positive licensing evidence)"
);
console.log("✔ Test 2: BetOnline in HU -> UNKNOWN (absence from blocklist does NOT grant eligibility).");

// Test 3: BetOnline US -> UNKNOWN
assert.equal(
  evaluateAffiliateEligibility(betonlineRecord, "US"),
  "UNKNOWN",
  "Test 3 failed: BetOnline in US must be UNKNOWN"
);
console.log("✔ Test 3: BetOnline in US -> UNKNOWN (unlisted country without positive whitelist is UNKNOWN).");

// Test 4: 22Bet GB -> KNOWN_INELIGIBLE
const bet22Record = getComplianceRecord("22bet");
assert.equal(
  evaluateAffiliateEligibility(bet22Record, "GB"),
  "KNOWN_INELIGIBLE",
  "Test 4 failed: 22Bet must be KNOWN_INELIGIBLE in Great Britain (GB)"
);
console.log("✔ Test 4: 22Bet in GB -> KNOWN_INELIGIBLE (explicitly prohibited in operator terms).");

// Test 5: 22Bet US -> KNOWN_INELIGIBLE
assert.equal(
  evaluateAffiliateEligibility(bet22Record, "US"),
  "KNOWN_INELIGIBLE",
  "Test 5 failed: 22Bet must be KNOWN_INELIGIBLE in United States (US)"
);
console.log("✔ Test 5: 22Bet in US -> KNOWN_INELIGIBLE (explicitly prohibited in operator terms).");

// Test 6: 22Bet HU -> UNKNOWN
assert.equal(
  evaluateAffiliateEligibility(bet22Record, "HU"),
  "UNKNOWN",
  "Test 6 failed: 22Bet in Hungary (HU) must be UNKNOWN"
);
console.log("✔ Test 6: 22Bet in HU -> UNKNOWN (non-listed territory remains UNKNOWN).");

// Test 7: blocked-list-only record + nonblocked country -> UNKNOWN
const blockedOnlyRecord = {
  affiliateId: "test_blocked_only",
  status: "verified",
  affiliateKind: "sportsbook_operator",
  sportsbookVerified: true,
  verificationScope: "blocked_list",
  blockedCountries: ["US", "GB"],
  sources: [
    {
      type: "operator_service_restriction",
      checkedAt: "2026-08-17",
    },
  ],
  verifiedAt: "2026-08-17",
};
assert.equal(
  evaluateAffiliateEligibility(blockedOnlyRecord, "DE"),
  "UNKNOWN",
  "Test 7 failed: Non-blocked country in blocked_list only record must be UNKNOWN"
);
console.log("✔ Test 7: Blocked-list only record + non-blocked country -> UNKNOWN.");

// Test 8: explicit verified allowed-country evidence -> KNOWN_ELIGIBLE
const allowedRecord = {
  affiliateId: "test_allowed",
  status: "verified",
  affiliateKind: "sportsbook_operator",
  sportsbookVerified: true,
  verificationScope: "allowed_list",
  allowedCountries: ["GB", "IE"],
  sources: [
    {
      type: "regulator_license",
      reference: "UKGC License 12345",
      checkedAt: "2026-08-17",
    },
  ],
  verifiedAt: "2026-08-17",
};
assert.equal(
  evaluateAffiliateEligibility(allowedRecord, "GB"),
  "KNOWN_ELIGIBLE",
  "Test 8 failed: Listed country with positive regulator license must be KNOWN_ELIGIBLE"
);
assert.equal(
  evaluateAffiliateEligibility(allowedRecord, "FR"),
  "KNOWN_INELIGIBLE",
  "Test 8 failed: Unlisted country in exhaustive allowed_list must be KNOWN_INELIGIBLE"
);
console.log("✔ Test 8: Explicit verified allowed-country evidence -> KNOWN_ELIGIBLE.");

// Test 9: implicit unverified affiliate -> UNKNOWN
const unverifiedRecord = getComplianceRecord("vipsta");
assert.equal(
  evaluateAffiliateEligibility(unverifiedRecord, "HU"),
  "UNKNOWN",
  "Test 9 failed: Implicit unverified must yield UNKNOWN"
);
assert.equal(
  evaluateAffiliateEligibility(unverifiedRecord, "US"),
  "UNKNOWN",
  "Test 9 failed: Implicit unverified must yield UNKNOWN for all countries"
);
console.log("✔ Test 9: Implicit unverified affiliate -> UNKNOWN for all jurisdictions.");

// Test 10: BetQL is not treated as sportsbook_operator
const betqlRecord = getComplianceRecord("flexlinks2");
assert.equal(
  betqlRecord.affiliateKind,
  "betting_information_service",
  "Test 10 failed: BetQL must be categorized as betting_information_service"
);
assert.equal(
  evaluateAffiliateEligibility(betqlRecord, "US"),
  "KNOWN_ELIGIBLE",
  "Test 10 failed: BetQL information service should be KNOWN_ELIGIBLE globally"
);
console.log("✔ Test 10: BetQL classified as betting_information_service (non-gambling tool).");

// Test 11: Browser language has zero effect on geo signal
const headersWithHuLang = new Headers({ "accept-language": "hu-HU,hu;q=0.9" });
assert.equal(
  getRequestCountry(headersWithHuLang),
  undefined,
  "Test 11 failed: accept-language header must never be parsed as country"
);
const headersWithVercelCountry = new Headers({
  "x-vercel-ip-country": "gb",
  "accept-language": "hu-HU,hu;q=0.9",
});
assert.equal(
  getRequestCountry(headersWithVercelCountry),
  "GB",
  "Test 11 failed: x-vercel-ip-country must be extracted accurately"
);
console.log("✔ Test 11: Browser language has zero effect on geo signal.");

// Test 12: Absence from a regulator blocklist does not generate eligibility
// Demonstrated by BetOnline and 22Bet evaluating to UNKNOWN in HU
assert.equal(
  evaluateAffiliateEligibility(betonlineRecord, "HU"),
  "UNKNOWN",
  "Test 12 failed: Absence from regulator blocklist must not generate eligibility"
);
console.log("✔ Test 12: Absence from regulator blocklist does not generate positive eligibility.");

// Test 13: New affiliate added only to affiliates.ts still validates as UNVERIFIED / UNKNOWN
const simulatedSites = [
  ...AFFILIATE_SITES,
  {
    id: "brand_new_bookmaker",
    name: "Brand New Bookmaker",
    rating: 8.0,
    bonus: "Welcome Offer",
    baseUrl: "https://example.com",
    enabled: true,
  },
];
const res13 = validateComplianceRegistry(simulatedSites, AFFILIATE_COMPLIANCE_OVERRIDES);
assert.equal(
  res13.valid,
  true,
  "Test 13 failed: Adding offer only to AFFILIATE_SITES must pass validation"
);
const newRecord = getComplianceRecord("brand_new_bookmaker");
assert.equal(newRecord.status, "unverified");
assert.equal(evaluateAffiliateEligibility(newRecord, "HU"), "UNKNOWN");
console.log("✔ Test 13: New affiliate added only to affiliates.ts validates as UNVERIFIED / UNKNOWN.");

console.log("\n==========================================");
console.log(" ALL 13 PHASE B1 COMPLIANCE TESTS PASSED ");
console.log("==========================================\n");
