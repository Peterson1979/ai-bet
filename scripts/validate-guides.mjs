import {
  GUIDE_MANIFEST,
  getGuideManifestEntry,
} from "../app/lib/guides";
import { GUIDE_CONTENT } from "../app/lib/guideRegistry";
import { validateGuideContent } from "../app/lib/guideContent";

const errors = [];
const manifestSlugs = new Set();

for (const entry of GUIDE_MANIFEST) {
  if (manifestSlugs.has(entry.slug)) {
    errors.push(`Duplicate manifest slug: ${entry.slug}`);
  }
  manifestSlugs.add(entry.slug);

  if (entry.locale !== "en") {
    errors.push(`${entry.slug}: unsupported locale ${entry.locale}`);
  }

  if (entry.status === "published") {
    const content = GUIDE_CONTENT[entry.slug];
    if (!content) {
      errors.push(`${entry.slug}: published in manifest but missing guide content`);
      continue;
    }

    if (content.status !== "published") {
      errors.push(`${entry.slug}: manifest is published but content status is ${content.status}`);
    }
  }
}

for (const [slug, content] of Object.entries(GUIDE_CONTENT)) {
  const manifestEntry = getGuideManifestEntry(slug);

  if (!manifestEntry) {
    errors.push(`${slug}: guide content has no manifest entry`);
    continue;
  }

  if (content.slug !== slug) {
    errors.push(`${slug}: registry key and content slug do not match`);
  }

  if (content.title !== manifestEntry.title) {
    errors.push(`${slug}: content title does not match manifest title`);
  }

  if (content.category !== manifestEntry.category) {
    errors.push(`${slug}: content category does not match manifest category`);
  }

  if (content.locale !== manifestEntry.locale) {
    errors.push(`${slug}: content locale does not match manifest locale`);
  }

  if (content.status !== manifestEntry.status) {
    errors.push(`${slug}: content status does not match manifest status`);
  }

  errors.push(...validateGuideContent(content, manifestSlugs));
}

const publishedCount = GUIDE_MANIFEST.filter(
  (entry) => entry.status === "published"
).length;

const contentCount = Object.keys(GUIDE_CONTENT).length;

if (errors.length > 0) {
  console.error(`Guide validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Guide validation PASS");
console.log(`Manifest entries: ${GUIDE_MANIFEST.length}`);
console.log(`Content entries: ${contentCount}`);
console.log(`Published guides: ${publishedCount}`);
