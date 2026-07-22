import { deepMerge } from "./deepMerge";
import type { Translation, DeepPartial } from "./types";
import en from "./en";
import hu from "./hu";
import de from "./de";
import fr from "./fr";
import es from "./es";
import it from "./it";
import pt from "./pt";
import ar from "./ar";
import zh from "./zh";
import ja from "./ja";
import hi from "./hi";

export const LANGS = [
  "en", "hu", "de", "fr", "es", "it", "pt", "ar", "zh", "ja", "hi",
] as const;

export type Lang = (typeof LANGS)[number];

const overrides: Partial<Record<Lang, DeepPartial<Translation>>> = {
  hu,
  de,
  fr,
  es,
  it,
  pt,
  ar,
  zh,
  ja,
  hi,
};

function buildTranslation(lang: Lang): Translation {
  const override = overrides[lang];
  if (!override) return en;
  return deepMerge(en, override as DeepPartial<Translation>);
}

export const translations: Record<Lang, Translation> = Object.fromEntries(
  LANGS.map((lang) => [lang, buildTranslation(lang)])
) as Record<Lang, Translation>;

export function getTranslation(lang: string): Translation {
  return translations[(lang as Lang)] ?? translations.en;
}