import { getGuideManifestEntry, getPublishedGuideManifest, type GuideLocale } from "@/app/lib/guides";
import type { GuideContent, GuideContentRegistry } from "@/app/lib/guideContent";

import guide_en_0 from "@/app/content/guides/en/ai-sports-betting-predictions";
import guide_en_1 from "@/app/content/guides/en/bankroll-management";
import guide_en_2 from "@/app/content/guides/en/bookmaker-margin-overround";
import guide_en_3 from "@/app/content/guides/en/cognitive-biases-sports-betting";
import guide_en_4 from "@/app/content/guides/en/confirmation-bias-betting";
import guide_en_5 from "@/app/content/guides/en/expected-value-sports-betting";
import guide_en_6 from "@/app/content/guides/en/flat-stakes-vs-percentage-staking";
import guide_en_7 from "@/app/content/guides/en/how-betting-odds-work";
import guide_en_8 from "@/app/content/guides/en/how-to-compare-betting-odds";
import guide_en_9 from "@/app/content/guides/en/implied-probability";
import guide_en_10 from "@/app/content/guides/en/matchsignal-value-edge";
import guide_en_11 from "@/app/content/guides/en/variance-sports-betting";
import guide_en_12 from "@/app/content/guides/en/why-betting-odds-move";
import guide_en_13 from "@/app/content/guides/en/why-chasing-losses-is-dangerous";
import guide_en_14 from "@/app/content/guides/en/winning-streaks-misleading";
import guide_hu_0 from "@/app/content/guides/hu/ai-sports-betting-predictions";
import guide_hu_1 from "@/app/content/guides/hu/bankroll-management";
import guide_hu_2 from "@/app/content/guides/hu/bookmaker-margin-overround";
import guide_hu_3 from "@/app/content/guides/hu/cognitive-biases-sports-betting";
import guide_hu_4 from "@/app/content/guides/hu/confirmation-bias-betting";
import guide_hu_5 from "@/app/content/guides/hu/expected-value-sports-betting";
import guide_hu_6 from "@/app/content/guides/hu/flat-stakes-vs-percentage-staking";
import guide_hu_7 from "@/app/content/guides/hu/how-betting-odds-work";
import guide_hu_8 from "@/app/content/guides/hu/how-to-compare-betting-odds";
import guide_hu_9 from "@/app/content/guides/hu/implied-probability";
import guide_hu_10 from "@/app/content/guides/hu/matchsignal-value-edge";
import guide_hu_11 from "@/app/content/guides/hu/variance-sports-betting";
import guide_hu_12 from "@/app/content/guides/hu/why-betting-odds-move";
import guide_hu_13 from "@/app/content/guides/hu/why-chasing-losses-is-dangerous";
import guide_hu_14 from "@/app/content/guides/hu/winning-streaks-misleading";
import guide_de_0 from "@/app/content/guides/de/ai-sports-betting-predictions";
import guide_de_1 from "@/app/content/guides/de/bankroll-management";
import guide_de_2 from "@/app/content/guides/de/bookmaker-margin-overround";
import guide_de_3 from "@/app/content/guides/de/cognitive-biases-sports-betting";
import guide_de_4 from "@/app/content/guides/de/confirmation-bias-betting";
import guide_de_5 from "@/app/content/guides/de/expected-value-sports-betting";
import guide_de_6 from "@/app/content/guides/de/flat-stakes-vs-percentage-staking";
import guide_de_7 from "@/app/content/guides/de/how-betting-odds-work";
import guide_de_8 from "@/app/content/guides/de/how-to-compare-betting-odds";
import guide_de_9 from "@/app/content/guides/de/implied-probability";
import guide_de_10 from "@/app/content/guides/de/matchsignal-value-edge";
import guide_de_11 from "@/app/content/guides/de/variance-sports-betting";
import guide_de_12 from "@/app/content/guides/de/why-betting-odds-move";
import guide_de_13 from "@/app/content/guides/de/why-chasing-losses-is-dangerous";
import guide_de_14 from "@/app/content/guides/de/winning-streaks-misleading";
import guide_fr_0 from "@/app/content/guides/fr/ai-sports-betting-predictions";
import guide_fr_1 from "@/app/content/guides/fr/bankroll-management";
import guide_fr_2 from "@/app/content/guides/fr/bookmaker-margin-overround";
import guide_fr_3 from "@/app/content/guides/fr/cognitive-biases-sports-betting";
import guide_fr_4 from "@/app/content/guides/fr/confirmation-bias-betting";
import guide_fr_5 from "@/app/content/guides/fr/expected-value-sports-betting";
import guide_fr_6 from "@/app/content/guides/fr/flat-stakes-vs-percentage-staking";
import guide_fr_7 from "@/app/content/guides/fr/how-betting-odds-work";
import guide_fr_8 from "@/app/content/guides/fr/how-to-compare-betting-odds";
import guide_fr_9 from "@/app/content/guides/fr/implied-probability";
import guide_fr_10 from "@/app/content/guides/fr/matchsignal-value-edge";
import guide_fr_11 from "@/app/content/guides/fr/variance-sports-betting";
import guide_fr_12 from "@/app/content/guides/fr/why-betting-odds-move";
import guide_fr_13 from "@/app/content/guides/fr/why-chasing-losses-is-dangerous";
import guide_fr_14 from "@/app/content/guides/fr/winning-streaks-misleading";
import guide_es_0 from "@/app/content/guides/es/ai-sports-betting-predictions";
import guide_es_1 from "@/app/content/guides/es/bankroll-management";
import guide_es_2 from "@/app/content/guides/es/bookmaker-margin-overround";
import guide_es_3 from "@/app/content/guides/es/cognitive-biases-sports-betting";
import guide_es_4 from "@/app/content/guides/es/confirmation-bias-betting";
import guide_es_5 from "@/app/content/guides/es/expected-value-sports-betting";
import guide_es_6 from "@/app/content/guides/es/flat-stakes-vs-percentage-staking";
import guide_es_7 from "@/app/content/guides/es/how-betting-odds-work";
import guide_es_8 from "@/app/content/guides/es/how-to-compare-betting-odds";
import guide_es_9 from "@/app/content/guides/es/implied-probability";
import guide_es_10 from "@/app/content/guides/es/matchsignal-value-edge";
import guide_es_11 from "@/app/content/guides/es/variance-sports-betting";
import guide_es_12 from "@/app/content/guides/es/why-betting-odds-move";
import guide_es_13 from "@/app/content/guides/es/why-chasing-losses-is-dangerous";
import guide_es_14 from "@/app/content/guides/es/winning-streaks-misleading";
import guide_it_0 from "@/app/content/guides/it/ai-sports-betting-predictions";
import guide_it_1 from "@/app/content/guides/it/bankroll-management";
import guide_it_2 from "@/app/content/guides/it/bookmaker-margin-overround";
import guide_it_3 from "@/app/content/guides/it/cognitive-biases-sports-betting";
import guide_it_4 from "@/app/content/guides/it/confirmation-bias-betting";
import guide_it_5 from "@/app/content/guides/it/expected-value-sports-betting";
import guide_it_6 from "@/app/content/guides/it/flat-stakes-vs-percentage-staking";
import guide_it_7 from "@/app/content/guides/it/how-betting-odds-work";
import guide_it_8 from "@/app/content/guides/it/how-to-compare-betting-odds";
import guide_it_9 from "@/app/content/guides/it/implied-probability";
import guide_it_10 from "@/app/content/guides/it/matchsignal-value-edge";
import guide_it_11 from "@/app/content/guides/it/variance-sports-betting";
import guide_it_12 from "@/app/content/guides/it/why-betting-odds-move";
import guide_it_13 from "@/app/content/guides/it/why-chasing-losses-is-dangerous";
import guide_it_14 from "@/app/content/guides/it/winning-streaks-misleading";
import guide_pt_0 from "@/app/content/guides/pt/ai-sports-betting-predictions";
import guide_pt_1 from "@/app/content/guides/pt/bankroll-management";
import guide_pt_2 from "@/app/content/guides/pt/bookmaker-margin-overround";
import guide_pt_3 from "@/app/content/guides/pt/cognitive-biases-sports-betting";
import guide_pt_4 from "@/app/content/guides/pt/confirmation-bias-betting";
import guide_pt_5 from "@/app/content/guides/pt/expected-value-sports-betting";
import guide_pt_6 from "@/app/content/guides/pt/flat-stakes-vs-percentage-staking";
import guide_pt_7 from "@/app/content/guides/pt/how-betting-odds-work";
import guide_pt_8 from "@/app/content/guides/pt/how-to-compare-betting-odds";
import guide_pt_9 from "@/app/content/guides/pt/implied-probability";
import guide_pt_10 from "@/app/content/guides/pt/matchsignal-value-edge";
import guide_pt_11 from "@/app/content/guides/pt/variance-sports-betting";
import guide_pt_12 from "@/app/content/guides/pt/why-betting-odds-move";
import guide_pt_13 from "@/app/content/guides/pt/why-chasing-losses-is-dangerous";
import guide_pt_14 from "@/app/content/guides/pt/winning-streaks-misleading";
import guide_ar_0 from "@/app/content/guides/ar/ai-sports-betting-predictions";
import guide_ar_1 from "@/app/content/guides/ar/bankroll-management";
import guide_ar_2 from "@/app/content/guides/ar/bookmaker-margin-overround";
import guide_ar_3 from "@/app/content/guides/ar/cognitive-biases-sports-betting";
import guide_ar_4 from "@/app/content/guides/ar/confirmation-bias-betting";
import guide_ar_5 from "@/app/content/guides/ar/expected-value-sports-betting";
import guide_ar_6 from "@/app/content/guides/ar/flat-stakes-vs-percentage-staking";
import guide_ar_7 from "@/app/content/guides/ar/how-betting-odds-work";
import guide_ar_8 from "@/app/content/guides/ar/how-to-compare-betting-odds";
import guide_ar_9 from "@/app/content/guides/ar/implied-probability";
import guide_ar_10 from "@/app/content/guides/ar/matchsignal-value-edge";
import guide_ar_11 from "@/app/content/guides/ar/variance-sports-betting";
import guide_ar_12 from "@/app/content/guides/ar/why-betting-odds-move";
import guide_ar_13 from "@/app/content/guides/ar/why-chasing-losses-is-dangerous";
import guide_ar_14 from "@/app/content/guides/ar/winning-streaks-misleading";
import guide_zh_0 from "@/app/content/guides/zh/ai-sports-betting-predictions";
import guide_zh_1 from "@/app/content/guides/zh/bankroll-management";
import guide_zh_2 from "@/app/content/guides/zh/bookmaker-margin-overround";
import guide_zh_3 from "@/app/content/guides/zh/cognitive-biases-sports-betting";
import guide_zh_4 from "@/app/content/guides/zh/confirmation-bias-betting";
import guide_zh_5 from "@/app/content/guides/zh/expected-value-sports-betting";
import guide_zh_6 from "@/app/content/guides/zh/flat-stakes-vs-percentage-staking";
import guide_zh_7 from "@/app/content/guides/zh/how-betting-odds-work";
import guide_zh_8 from "@/app/content/guides/zh/how-to-compare-betting-odds";
import guide_zh_9 from "@/app/content/guides/zh/implied-probability";
import guide_zh_10 from "@/app/content/guides/zh/matchsignal-value-edge";
import guide_zh_11 from "@/app/content/guides/zh/variance-sports-betting";
import guide_zh_12 from "@/app/content/guides/zh/why-betting-odds-move";
import guide_zh_13 from "@/app/content/guides/zh/why-chasing-losses-is-dangerous";
import guide_zh_14 from "@/app/content/guides/zh/winning-streaks-misleading";
import guide_ja_0 from "@/app/content/guides/ja/ai-sports-betting-predictions";
import guide_ja_1 from "@/app/content/guides/ja/bankroll-management";
import guide_ja_2 from "@/app/content/guides/ja/bookmaker-margin-overround";
import guide_ja_3 from "@/app/content/guides/ja/cognitive-biases-sports-betting";
import guide_ja_4 from "@/app/content/guides/ja/confirmation-bias-betting";
import guide_ja_5 from "@/app/content/guides/ja/expected-value-sports-betting";
import guide_ja_6 from "@/app/content/guides/ja/flat-stakes-vs-percentage-staking";
import guide_ja_7 from "@/app/content/guides/ja/how-betting-odds-work";
import guide_ja_8 from "@/app/content/guides/ja/how-to-compare-betting-odds";
import guide_ja_9 from "@/app/content/guides/ja/implied-probability";
import guide_ja_10 from "@/app/content/guides/ja/matchsignal-value-edge";
import guide_ja_11 from "@/app/content/guides/ja/variance-sports-betting";
import guide_ja_12 from "@/app/content/guides/ja/why-betting-odds-move";
import guide_ja_13 from "@/app/content/guides/ja/why-chasing-losses-is-dangerous";
import guide_ja_14 from "@/app/content/guides/ja/winning-streaks-misleading";
import guide_hi_0 from "@/app/content/guides/hi/ai-sports-betting-predictions";
import guide_hi_1 from "@/app/content/guides/hi/bankroll-management";
import guide_hi_2 from "@/app/content/guides/hi/bookmaker-margin-overround";
import guide_hi_3 from "@/app/content/guides/hi/cognitive-biases-sports-betting";
import guide_hi_4 from "@/app/content/guides/hi/confirmation-bias-betting";
import guide_hi_5 from "@/app/content/guides/hi/expected-value-sports-betting";
import guide_hi_6 from "@/app/content/guides/hi/flat-stakes-vs-percentage-staking";
import guide_hi_7 from "@/app/content/guides/hi/how-betting-odds-work";
import guide_hi_8 from "@/app/content/guides/hi/how-to-compare-betting-odds";
import guide_hi_9 from "@/app/content/guides/hi/implied-probability";
import guide_hi_10 from "@/app/content/guides/hi/matchsignal-value-edge";
import guide_hi_11 from "@/app/content/guides/hi/variance-sports-betting";
import guide_hi_12 from "@/app/content/guides/hi/why-betting-odds-move";
import guide_hi_13 from "@/app/content/guides/hi/why-chasing-losses-is-dangerous";
import guide_hi_14 from "@/app/content/guides/hi/winning-streaks-misleading";

export const GUIDE_CONTENT_BY_LOCALE: Readonly<Record<GuideLocale, GuideContentRegistry>> = {
  en: {
    [guide_en_0.slug]: guide_en_0,
    [guide_en_1.slug]: guide_en_1,
    [guide_en_2.slug]: guide_en_2,
    [guide_en_3.slug]: guide_en_3,
    [guide_en_4.slug]: guide_en_4,
    [guide_en_5.slug]: guide_en_5,
    [guide_en_6.slug]: guide_en_6,
    [guide_en_7.slug]: guide_en_7,
    [guide_en_8.slug]: guide_en_8,
    [guide_en_9.slug]: guide_en_9,
    [guide_en_10.slug]: guide_en_10,
    [guide_en_11.slug]: guide_en_11,
    [guide_en_12.slug]: guide_en_12,
    [guide_en_13.slug]: guide_en_13,
    [guide_en_14.slug]: guide_en_14,
  },
  hu: {
    [guide_hu_0.slug]: guide_hu_0,
    [guide_hu_1.slug]: guide_hu_1,
    [guide_hu_2.slug]: guide_hu_2,
    [guide_hu_3.slug]: guide_hu_3,
    [guide_hu_4.slug]: guide_hu_4,
    [guide_hu_5.slug]: guide_hu_5,
    [guide_hu_6.slug]: guide_hu_6,
    [guide_hu_7.slug]: guide_hu_7,
    [guide_hu_8.slug]: guide_hu_8,
    [guide_hu_9.slug]: guide_hu_9,
    [guide_hu_10.slug]: guide_hu_10,
    [guide_hu_11.slug]: guide_hu_11,
    [guide_hu_12.slug]: guide_hu_12,
    [guide_hu_13.slug]: guide_hu_13,
    [guide_hu_14.slug]: guide_hu_14,
  },
  de: {
    [guide_de_0.slug]: guide_de_0,
    [guide_de_1.slug]: guide_de_1,
    [guide_de_2.slug]: guide_de_2,
    [guide_de_3.slug]: guide_de_3,
    [guide_de_4.slug]: guide_de_4,
    [guide_de_5.slug]: guide_de_5,
    [guide_de_6.slug]: guide_de_6,
    [guide_de_7.slug]: guide_de_7,
    [guide_de_8.slug]: guide_de_8,
    [guide_de_9.slug]: guide_de_9,
    [guide_de_10.slug]: guide_de_10,
    [guide_de_11.slug]: guide_de_11,
    [guide_de_12.slug]: guide_de_12,
    [guide_de_13.slug]: guide_de_13,
    [guide_de_14.slug]: guide_de_14,
  },
  fr: {
    [guide_fr_0.slug]: guide_fr_0,
    [guide_fr_1.slug]: guide_fr_1,
    [guide_fr_2.slug]: guide_fr_2,
    [guide_fr_3.slug]: guide_fr_3,
    [guide_fr_4.slug]: guide_fr_4,
    [guide_fr_5.slug]: guide_fr_5,
    [guide_fr_6.slug]: guide_fr_6,
    [guide_fr_7.slug]: guide_fr_7,
    [guide_fr_8.slug]: guide_fr_8,
    [guide_fr_9.slug]: guide_fr_9,
    [guide_fr_10.slug]: guide_fr_10,
    [guide_fr_11.slug]: guide_fr_11,
    [guide_fr_12.slug]: guide_fr_12,
    [guide_fr_13.slug]: guide_fr_13,
    [guide_fr_14.slug]: guide_fr_14,
  },
  es: {
    [guide_es_0.slug]: guide_es_0,
    [guide_es_1.slug]: guide_es_1,
    [guide_es_2.slug]: guide_es_2,
    [guide_es_3.slug]: guide_es_3,
    [guide_es_4.slug]: guide_es_4,
    [guide_es_5.slug]: guide_es_5,
    [guide_es_6.slug]: guide_es_6,
    [guide_es_7.slug]: guide_es_7,
    [guide_es_8.slug]: guide_es_8,
    [guide_es_9.slug]: guide_es_9,
    [guide_es_10.slug]: guide_es_10,
    [guide_es_11.slug]: guide_es_11,
    [guide_es_12.slug]: guide_es_12,
    [guide_es_13.slug]: guide_es_13,
    [guide_es_14.slug]: guide_es_14,
  },
  it: {
    [guide_it_0.slug]: guide_it_0,
    [guide_it_1.slug]: guide_it_1,
    [guide_it_2.slug]: guide_it_2,
    [guide_it_3.slug]: guide_it_3,
    [guide_it_4.slug]: guide_it_4,
    [guide_it_5.slug]: guide_it_5,
    [guide_it_6.slug]: guide_it_6,
    [guide_it_7.slug]: guide_it_7,
    [guide_it_8.slug]: guide_it_8,
    [guide_it_9.slug]: guide_it_9,
    [guide_it_10.slug]: guide_it_10,
    [guide_it_11.slug]: guide_it_11,
    [guide_it_12.slug]: guide_it_12,
    [guide_it_13.slug]: guide_it_13,
    [guide_it_14.slug]: guide_it_14,
  },
  pt: {
    [guide_pt_0.slug]: guide_pt_0,
    [guide_pt_1.slug]: guide_pt_1,
    [guide_pt_2.slug]: guide_pt_2,
    [guide_pt_3.slug]: guide_pt_3,
    [guide_pt_4.slug]: guide_pt_4,
    [guide_pt_5.slug]: guide_pt_5,
    [guide_pt_6.slug]: guide_pt_6,
    [guide_pt_7.slug]: guide_pt_7,
    [guide_pt_8.slug]: guide_pt_8,
    [guide_pt_9.slug]: guide_pt_9,
    [guide_pt_10.slug]: guide_pt_10,
    [guide_pt_11.slug]: guide_pt_11,
    [guide_pt_12.slug]: guide_pt_12,
    [guide_pt_13.slug]: guide_pt_13,
    [guide_pt_14.slug]: guide_pt_14,
  },
  ar: {
    [guide_ar_0.slug]: guide_ar_0,
    [guide_ar_1.slug]: guide_ar_1,
    [guide_ar_2.slug]: guide_ar_2,
    [guide_ar_3.slug]: guide_ar_3,
    [guide_ar_4.slug]: guide_ar_4,
    [guide_ar_5.slug]: guide_ar_5,
    [guide_ar_6.slug]: guide_ar_6,
    [guide_ar_7.slug]: guide_ar_7,
    [guide_ar_8.slug]: guide_ar_8,
    [guide_ar_9.slug]: guide_ar_9,
    [guide_ar_10.slug]: guide_ar_10,
    [guide_ar_11.slug]: guide_ar_11,
    [guide_ar_12.slug]: guide_ar_12,
    [guide_ar_13.slug]: guide_ar_13,
    [guide_ar_14.slug]: guide_ar_14,
  },
  zh: {
    [guide_zh_0.slug]: guide_zh_0,
    [guide_zh_1.slug]: guide_zh_1,
    [guide_zh_2.slug]: guide_zh_2,
    [guide_zh_3.slug]: guide_zh_3,
    [guide_zh_4.slug]: guide_zh_4,
    [guide_zh_5.slug]: guide_zh_5,
    [guide_zh_6.slug]: guide_zh_6,
    [guide_zh_7.slug]: guide_zh_7,
    [guide_zh_8.slug]: guide_zh_8,
    [guide_zh_9.slug]: guide_zh_9,
    [guide_zh_10.slug]: guide_zh_10,
    [guide_zh_11.slug]: guide_zh_11,
    [guide_zh_12.slug]: guide_zh_12,
    [guide_zh_13.slug]: guide_zh_13,
    [guide_zh_14.slug]: guide_zh_14,
  },
  ja: {
    [guide_ja_0.slug]: guide_ja_0,
    [guide_ja_1.slug]: guide_ja_1,
    [guide_ja_2.slug]: guide_ja_2,
    [guide_ja_3.slug]: guide_ja_3,
    [guide_ja_4.slug]: guide_ja_4,
    [guide_ja_5.slug]: guide_ja_5,
    [guide_ja_6.slug]: guide_ja_6,
    [guide_ja_7.slug]: guide_ja_7,
    [guide_ja_8.slug]: guide_ja_8,
    [guide_ja_9.slug]: guide_ja_9,
    [guide_ja_10.slug]: guide_ja_10,
    [guide_ja_11.slug]: guide_ja_11,
    [guide_ja_12.slug]: guide_ja_12,
    [guide_ja_13.slug]: guide_ja_13,
    [guide_ja_14.slug]: guide_ja_14,
  },
  hi: {
    [guide_hi_0.slug]: guide_hi_0,
    [guide_hi_1.slug]: guide_hi_1,
    [guide_hi_2.slug]: guide_hi_2,
    [guide_hi_3.slug]: guide_hi_3,
    [guide_hi_4.slug]: guide_hi_4,
    [guide_hi_5.slug]: guide_hi_5,
    [guide_hi_6.slug]: guide_hi_6,
    [guide_hi_7.slug]: guide_hi_7,
    [guide_hi_8.slug]: guide_hi_8,
    [guide_hi_9.slug]: guide_hi_9,
    [guide_hi_10.slug]: guide_hi_10,
    [guide_hi_11.slug]: guide_hi_11,
    [guide_hi_12.slug]: guide_hi_12,
    [guide_hi_13.slug]: guide_hi_13,
    [guide_hi_14.slug]: guide_hi_14,
  },
};

export function getPublishedGuides(locale: GuideLocale = "en"): GuideContent[] {
  const registry = GUIDE_CONTENT_BY_LOCALE[locale];
  return getPublishedGuideManifest().map((entry) => registry[entry.slug]).filter((guide): guide is GuideContent => Boolean(guide) && guide.status === "published");
}

export function getPublishedGuide(slug: string, locale: GuideLocale = "en"): GuideContent | undefined {
  const manifestEntry = getGuideManifestEntry(slug);
  if (!manifestEntry || manifestEntry.status !== "published") return undefined;
  const content = GUIDE_CONTENT_BY_LOCALE[locale][slug];
  if (!content || content.status !== "published") return undefined;
  return content;
}

export function hasPublicGuideContent(locale: GuideLocale = "en"): boolean {
  return getPublishedGuides(locale).length > 0;
}
