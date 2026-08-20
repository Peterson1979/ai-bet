import type { Metadata } from "next";
import type { Lang } from "@/app/lib/i18n";
import { localizedAlternates } from "@/app/lib/seo";
import { getLegalDocument } from "./content";
import type { LegalSlug } from "./types";

export function legalMetadata(lang: Lang, slug: LegalSlug): Metadata {
  const document = getLegalDocument(lang, slug);
  return {
    title: document.title,
    description: document.description,
    alternates: localizedAlternates(lang, `/legal/${slug}`),
  };
}
