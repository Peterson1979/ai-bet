import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const langs = ["en", "hu", "de", "fr", "es", "it", "pt", "ar", "zh", "ja", "hi"];
const slugs = ["privacy-policy", "cookie-policy", "terms-of-use", "affiliate-disclosure", "responsible-gambling", "ai-disclaimer", "earnings-disclaimer", "legal-notice"];

const legalContent = read("app/lib/legal/content.ts");
const localizedLegal = read("app/lib/legal/localized.ts");
const legalTypes = read("app/lib/legal/types.ts");
const about = read("app/lib/aboutContent.ts");
const sitemap = read("app/sitemap.ts");

for (const slug of slugs) {
  assert(legalTypes.includes(`"${slug}"`), `Missing legal slug: ${slug}`);
  const route = path.join(root, "app", "[lang]", "legal", slug, "page.tsx");
  assert(fs.existsSync(route), `Missing legal route wrapper: ${slug}`);
}

assert(legalContent.includes("const en: LegalLocaleContent"), "Missing canonical English legal content");
for (const lang of langs.filter((lang) => lang !== "en")) {
  assert(new RegExp(`\\b${lang}\\b`).test(localizedLegal), `Missing localized legal source: ${lang}`);
  assert(legalContent.includes(`${lang}: LOCALIZED_LEGAL_CONTENT.${lang}!`), `Locale not wired to legal content: ${lang}`);
}

for (const lang of langs) {
  assert(new RegExp(`\\n  ${lang}: \\{`).test(about), `Missing About content: ${lang}`);
}

function walk(relative) {
  return fs.readdirSync(path.join(root, relative), { withFileTypes: true }).flatMap((entry) => {
    const child = path.posix.join(relative.replaceAll("\\", "/"), entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });
}
const activeUiFiles = walk("app").filter((file) => /\.(?:ts|tsx)$/.test(file) && !file.startsWith("app/content/guides/") && file !== "app/lib/compliance/registry.ts");
const activeUi = activeUiFiles.map((file) => read(file)).join("\n");
assert(!/["'`]\/news(?:[\/"'`?]|$)/i.test(activeUi), "Active internal /news link remains");
assert(!/latest\s+(?:sport\s+)?news/i.test(activeUi), "Stale latest-news copy remains");
assert(!/Top\s*Rated|Editor[’']?s\s+Pick|Recommended\s*#\d|#1\s+Rated|star\s+rating/i.test(activeUi), "Unsupported sportsbook ranking claim remains in active UI");
assert(!new RegExp(["IP", "anonymization", "enabled"].join("\\s+"), "i").test(activeUi), "Stale GA4 IP claim remains");
assert(!/your-domain\.com/i.test(activeUi), "Placeholder domain remains");
assert(!/redirect\(["']\/en\/(?:legal|about)/.test(activeUi), "English-only legal/About redirect remains");

assert(!/news/i.test(sitemap), "Sitemap source contains news");
assert(sitemap.includes("LEGAL_SLUGS") && legalTypes.includes('"legal-notice"'), "Legal Notice is not included through the sitemap legal loop");
const legalRenderer = read("app/components/legal/LegalPage.tsx");
assert(`${legalContent}\n${legalRenderer}`.includes("Forray Gyöngyi") && legalRenderer.includes("74264166-1-22") && legalRenderer.includes("57756666"), "Required operator data missing");

for (const file of ["app/[lang]/page.tsx", "app/[lang]/[sport]/page.tsx", "app/[lang]/betting/page.tsx", "app/[lang]/tools/ToolsClient.tsx", "app/[lang]/betting-glossary/page.tsx"]) {
  assert(read(file).includes('lang === "hu" ? "HU" : undefined'), `Hungarian locale affiliate suppression missing in ${file}`);
}

const changed = execFileSync("git", ["diff", "--name-only"], { cwd: root, encoding: "utf8" }).trim().split(/\r?\n/);
for (const protectedFile of ["app/api/daily-run/route.ts", "app/lib/odds.ts", "app/lib/prompts.ts", "app/lib/groq.ts", "app/lib/ranking.ts"]) {
  assert(!changed.includes(protectedFile), `Prediction runtime was modified: ${protectedFile}`);
}

assert(langs.length === 11 && slugs.length === 8, "Locale/legal route cardinality changed");
assert(sitemap.includes("for (const lang of LANGS)") && sitemap.includes("for (const slug of LEGAL_SLUGS)"), "Sitemap locale/legal parity loop missing");

console.log("PASS: 11 locales, 8 legal pages, localized About content, news retirement, sitemap parity, neutral partner UI and Hungarian locale affiliate rule validated.");
