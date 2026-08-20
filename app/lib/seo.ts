import type { Metadata } from "next";
import { LANGS, type Lang } from "@/app/lib/i18n";

export const SITE_URL = "https://www.matchsignal.pro";

export function localizedAlternates(lang: Lang, path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    LANGS.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  );
  languages["x-default"] = `${SITE_URL}/en${path}`;

  return {
    canonical: `${SITE_URL}/${lang}${path}`,
    languages,
  } satisfies NonNullable<Metadata["alternates"]>;
}
