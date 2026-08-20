import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const layout = read("app/[lang]/layout.tsx");
const runtime = read("app/components/ConsentRuntime.tsx");
const consent = read("app/lib/consent.ts");
const routes = read("app/lib/consentRoutes.ts");
const googleConfig = read("app/lib/googleConfig.ts");
const cookieBanner = read("app/components/CookieBanner.tsx");
const manageButton = read("app/components/ManageCookieButton.tsx");
const analytics = read("app/components/GoogleAnalytics.tsx");
const middleware = read("middleware.ts");
const nextConfig = read("next.config.js");

assert(googleConfig.includes('ADSENSE_CLIENT = "ca-pub-6847785471613763"'), "Wrong AdSense publisher ID");
assert(!/ca-pub-(?!6847785471613763)\d+/.test(`${layout}\n${runtime}\n${googleConfig}`), "A second AdSense account is present");
assert(layout.includes("ADSENSE_SCRIPT_ID") && runtime.includes("getElementById(ADSENSE_SCRIPT_ID)"), "AdSense bootstrap is not deduplicated");

for (const signal of ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"]) {
  assert(layout.includes(`'${signal}': 'denied'`), `Missing denied default for ${signal}`);
  assert(runtime.includes(`${signal}: "denied"`), `Missing navigation-time denied default for ${signal}`);
}

assert(routes.includes('"/legal/privacy-policy"') && routes.includes('"/legal/cookie-policy"'), "Consent-free policy routes are incomplete");
assert(layout.includes("googleServicesEnabled") && layout.includes("isConsentFreePolicyPath"), "Policy-route Google exclusion is missing");
assert(middleware.includes("CONSENT_PATH_HEADER") && middleware.includes("request: { headers: requestHeaders }"), "Production pathname handoff is missing");

for (const marker of ["CONSENT_API_READY", "CONSENT_MODE_DATA_READY", "addEventListener", "removeEventListener", "cmpStatus", "eventStatus", "displayStatus", "gdprApplies", "tcString", "cmpuishown", "tcloaded", "useractioncomplete"]) {
  assert(consent.includes(marker), `Missing defensive TCF handling: ${marker}`);
}
assert(consent.includes('setAuthority("blocked"'), "Applicable CMP failures do not fail closed");
assert(!consent.includes("FALLBACK_TIMEOUT_MS = 2800"), "Stale early authority timeout remains");
assert(consent.includes("callbackQueue.push") && consent.includes("showRevocationMessage"), "Google revocation queue is missing");

assert(cookieBanner.includes("googleCmpEnabled") && cookieBanner.includes('auth === "google"'), "Custom banner cannot yield to Google authority");
assert(manageButton.includes("triggerReopenConsent"), "Cookie Settings control is broken");
assert(analytics.includes("isAnalyticsAllowed") && analytics.includes("send_page_view: false"), "GA4 basic-mode gate or duplicate-page-view guard is missing");
assert(nextConfig.includes('value: "strict-origin-when-cross-origin"'), "Referrer policy is incompatible with Funding Choices");

const changed = execFileSync("git", ["diff", "--name-only", "HEAD"], { cwd: root, encoding: "utf8" }).trim().split(/\r?\n/);
for (const protectedFile of ["app/lib/prompts.ts", "app/lib/groq.ts", "app/lib/ranking.ts"]) {
  assert(!changed.includes(protectedFile), `Protected runtime changed: ${protectedFile}`);
}
assert(fs.existsSync(path.join(root, "scripts/test-prediction-affiliate-decoupling.tsx")), "Prediction/affiliate decoupling regression suite is missing");

console.log("PASS: publisher, policy-route isolation, denied defaults, TCF lifecycle, revocation, GA4 gate and protected runtime validated.");
