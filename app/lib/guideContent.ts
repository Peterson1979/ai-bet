import type { GuideCategoryId, GuideManifestEntry } from "@/app/lib/guides";

export type GuideCalloutTone = "info" | "warning" | "example";

export type GuideCallout = {
  title: string;
  body: string;
  tone?: GuideCalloutTone;
};

export type GuideSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: GuideCallout;
};

export type GuideContent = GuideManifestEntry & {
  description: string;
  intro: string;
  keyTakeaways?: string[];
  sections: GuideSection[];
  relatedGuides?: string[];
  relatedGlossary?: string[];
  relatedTools?: string[];
  responsibleGamblingNote?: string;
};

export type GuideContentRegistry = Readonly<Record<string, GuideContent>>;

export function estimateReadingTime(content: GuideContent): number {
  const text = [
    content.title,
    content.description,
    content.intro,
    ...(content.keyTakeaways ?? []),
    ...content.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
      section.callout?.title ?? "",
      section.callout?.body ?? "",
    ]),
    content.responsibleGamblingNote ?? "",
  ].join(" ");

  const cjkChars = (text.match(/[\u3040-\u30ff\u3400-\u9fff]/g) ?? []).length;
  const nonCjkWords = text.replace(/[\u3040-\u30ff\u3400-\u9fff]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = cjkChars / 500 + nonCjkWords / 220;
  return Math.max(1, Math.ceil(minutes));
}

export function isGuideCategoryId(value: string): value is GuideCategoryId {
  return [
    "betting-fundamentals",
    "odds-probability",
    "value-analysis",
    "bankroll-risk",
    "betting-psychology",
    "ai-data",
    "responsible-betting",
  ].includes(value as GuideCategoryId);
}

export function validateGuideContent(
  content: GuideContent,
  allSlugs: ReadonlySet<string>
): string[] {
  const errors: string[] = [];

  if (!content.slug.trim()) errors.push("Missing slug");
  if (!content.title.trim()) errors.push(`${content.slug}: missing title`);
  if (!content.description.trim()) errors.push(`${content.slug}: missing description`);
  if (!content.intro.trim()) errors.push(`${content.slug}: missing intro`);
  if (!isGuideCategoryId(content.category)) {
    errors.push(`${content.slug}: invalid category ${content.category}`);
  }

  if (content.status === "published") {
    if (!content.publishedAt) errors.push(`${content.slug}: published guide missing publishedAt`);
    if (!content.updatedAt) errors.push(`${content.slug}: published guide missing updatedAt`);
    if (content.sections.length < 3) {
      errors.push(`${content.slug}: published guide must contain at least 3 sections`);
    }
  }

  const sectionIds = new Set<string>();
  for (const section of content.sections) {
    if (!section.id.trim()) errors.push(`${content.slug}: section missing id`);
    if (sectionIds.has(section.id)) {
      errors.push(`${content.slug}: duplicate section id ${section.id}`);
    }
    sectionIds.add(section.id);

    if (!section.heading.trim()) {
      errors.push(`${content.slug}: section ${section.id} missing heading`);
    }
    if (!section.paragraphs.length || section.paragraphs.some((p) => !p.trim())) {
      errors.push(`${content.slug}: section ${section.id} has empty paragraph content`);
    }
  }

  for (const related of content.relatedGuides ?? []) {
    if (related === content.slug) {
      errors.push(`${content.slug}: cannot reference itself as a related guide`);
    } else if (!allSlugs.has(related)) {
      errors.push(`${content.slug}: unknown related guide ${related}`);
    }
  }

  return errors;
}
