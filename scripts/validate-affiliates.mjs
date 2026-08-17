// scripts/validate-affiliates.mjs

import { AFFILIATE_SITES } from "../app/lib/affiliates.ts";
import { AFFILIATE_COMPLIANCE_OVERRIDES, getComplianceRecord } from "../app/lib/compliance/registry.ts";
import { validateComplianceRegistry } from "../app/lib/compliance/validate.ts";

console.log("\n==========================================");
console.log(" MATCHSIGNAL AFFILIATE COMPLIANCE AUDIT ");
console.log("==========================================\n");

const result = validateComplianceRegistry(
  AFFILIATE_SITES,
  AFFILIATE_COMPLIANCE_OVERRIDES
);

const activeAffiliates = AFFILIATE_SITES.filter((s) => s.enabled !== false);

console.log(`Active Commercial Affiliates: ${activeAffiliates.length}`);
console.log(`Explicit Compliance Overrides: ${Object.keys(AFFILIATE_COMPLIANCE_OVERRIDES).length}\n`);

activeAffiliates.forEach((site) => {
  const hasOverride = Boolean(AFFILIATE_COMPLIANCE_OVERRIDES[site.id]);
  const record = getComplianceRecord(site.id);
  const statusLabel = hasOverride
    ? `[${record.status.toUpperCase()}]`
    : `[UNVERIFIED - DEFAULT]`;
  const sourcesCount = record.sources?.length ?? 0;

  console.log(` • ${statusLabel} ${site.id} (name: "${site.name}", sources: ${sourcesCount})`);
});

console.log("");

if (!result.valid) {
  console.error("❌ AFFILIATE COMPLIANCE VALIDATION FAILED with the following errors:\n");
  result.errors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err}`);
  });
  console.log("\nProcess exiting with code 1.\n");
  process.exit(1);
} else {
  console.log("✅ AFFILIATE COMPLIANCE VALIDATION PASSED.");
  console.log(`   Summary: ${result.summary.totalActiveAffiliates} active offers (${result.summary.defaultUnverifiedCount} default-unverified, ${result.summary.overridesCount} explicit overrides).\n`);
  process.exit(0);
}
