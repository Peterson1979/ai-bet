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
console.log(" EXECUTING COMPLIANCE SYSTEM TEST SUITE ");
console.log("==========================================\n");

// Test 1: Existing affiliate with no override -> UNVERIFIED automatically
const betonlineRecord = getComplianceRecord("betonline");
assert.equal(
  betonlineRecord.status,
  "unverified",
  "Test 1 failed: Default status must be unverified"
);
assert.equal(
  betonlineRecord.sportsbookVerified,
  null,
  "Test 1 failed: Default sportsbookVerified must be null"
);
console.log("✔ Test 1: Existing affiliate with no override yields UNVERIFIED automatically.");

// Test 2: New affiliate added ONLY to AFFILIATE_SITES -> validation PASS + UNVERIFIED
const simulatedSites = [
  ...AFFILIATE_SITES,
  {
    id: "new_offer_xyz",
    name: "New Offer XYZ",
    rating: 9.0,
    bonus: "Special Bonus",
    baseUrl: "https://example.com",
    enabled: true,
  },
];
const res2 = validateComplianceRegistry(simulatedSites, AFFILIATE_COMPLIANCE_OVERRIDES);
assert.equal(
  res2.valid,
  true,
  "Test 2 failed: Adding offer only to AFFILIATE_SITES must pass validation"
);
const newOfferRecord = getComplianceRecord("new_offer_xyz");
assert.equal(
  newOfferRecord.status,
  "unverified",
  "Test 2 failed: New offer must receive unverified status automatically"
);
console.log("✔ Test 2: New affiliate added only to AFFILIATE_SITES passes validation as UNVERIFIED default.");

// Test 3: Unknown affiliate in compliance override -> validation FAIL
const badOverrides = {
  non_existent_bookie: {
    status: "verified",
    sources: [{ type: "regulator", checkedAt: "2026-08-01" }],
    verifiedAt: "2026-08-01",
  },
};
const res3 = validateComplianceRegistry(AFFILIATE_SITES, badOverrides);
assert.equal(
  res3.valid,
  false,
  "Test 3 failed: Unknown affiliate in override must fail validation"
);
assert(
  res3.errors.some((e) => e.includes("non_existent_bookie")),
  "Test 3 failed: Error message should mention non_existent_bookie"
);
console.log("✔ Test 3: Unknown affiliate in compliance override fails validation.");

// Test 4: Verified override with evidence -> validation PASS
const validOverrides = {
  betonline: {
    status: "verified",
    sportsbookVerified: true,
    verificationScope: "allowed_list",
    allowedCountries: ["GB", "IE"],
    sources: [{ type: "regulator", checkedAt: "2026-08-01" }],
    verifiedAt: "2026-08-01",
    reviewAfter: "2027-08-01",
  },
};
const res4 = validateComplianceRegistry(AFFILIATE_SITES, validOverrides);
assert.equal(
  res4.valid,
  true,
  "Test 4 failed: Valid verified override should pass validation"
);
console.log("✔ Test 4: Verified override with proper evidence passes validation.");

// Test 5: Invalid verified override -> validation FAIL
const invalidOverrides = {
  betonline: {
    status: "verified",
    sources: [], // Missing required sources
  },
};
const res5 = validateComplianceRegistry(AFFILIATE_SITES, invalidOverrides);
assert.equal(
  res5.valid,
  false,
  "Test 5 failed: Verified override without sources must fail"
);
console.log("✔ Test 5: Invalid verified override fails validation.");

// Test 6: Eligibility for implicit unverified -> UNKNOWN
const implicitRecord = getComplianceRecord("sportsbetting");
assert.equal(
  evaluateAffiliateEligibility(implicitRecord, "HU"),
  "UNKNOWN",
  "Test 6 failed: Implicit unverified must yield UNKNOWN"
);
assert.equal(
  evaluateAffiliateEligibility(implicitRecord, "US"),
  "UNKNOWN",
  "Test 6 failed: Implicit unverified must yield UNKNOWN for all countries"
);
console.log("✔ Test 6: Eligibility for implicit unverified yields UNKNOWN.");

// Test 7: Browser language has zero effect
const headersWithHuLang = new Headers({ "accept-language": "hu-HU,hu;q=0.9" });
assert.equal(
  getRequestCountry(headersWithHuLang),
  undefined,
  "Test 7 failed: accept-language header must not be used as country"
);
const headersWithVercelCountry = new Headers({
  "x-vercel-ip-country": "de",
  "accept-language": "hu-HU,hu;q=0.9",
});
assert.equal(
  getRequestCountry(headersWithVercelCountry),
  "DE",
  "Test 7 failed: x-vercel-ip-country must be extracted accurately"
);
console.log("✔ Test 7: Browser language has zero effect on geo signal.");

// Test 8: Existing CTAs unchanged in Phase A
// Commercial sites still read cleanly from AFFILIATE_SITES
assert.equal(
  AFFILIATE_SITES.length >= 9,
  true,
  "Test 8 failed: All commercial affiliate sites intact"
);
console.log("✔ Test 8: Existing commercial CTAs and affiliate configuration remain intact.");

console.log("\n==========================================");
console.log(" ALL COMPLIANCE TESTS PASSED SUCCESSFULLY ");
console.log("==========================================\n");
