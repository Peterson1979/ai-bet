import type { MetadataRoute } from "next";
import { GUIDE_LOCALES, getPublishedGuideManifest } from "@/app/lib/guides";

const baseUrl = "https://www.matchsignal.pro";

const langs = [
  "en",
  "hu",
  "de",
  "fr",
  "es",
  "it",
  "pt",
  "ar",
  "zh",
  "ja",
  "hi",
];

const sports = [
  "football",
  "nba",
  "nfl",
  "hockey",
  "tennis",
  "mlb",
  "mma",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const multilingualPages = [
    {
      path: "",
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      path: "/betting",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/tools",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/betting-glossary",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const englishOnlyPages = [
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/legal/privacy-policy",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/legal/terms-of-use",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/legal/affiliate-disclosure",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/legal/responsible-gambling",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/legal/cookie-policy",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/legal/earnings-disclaimer",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/legal/ai-disclaimer",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of langs) {
    for (const page of multilingualPages) {
      entries.push({
        url: `${baseUrl}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }

    for (const sport of sports) {
      entries.push({
        url: `${baseUrl}/${lang}/${sport}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  }

  for (const page of englishOnlyPages) {
    entries.push({
      url: `${baseUrl}/en${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  const publishedGuides = getPublishedGuideManifest();

  if (publishedGuides.length > 0) {
    for (const lang of GUIDE_LOCALES) {
      entries.push({
        url: `${baseUrl}/${lang}/guides`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });

      for (const guide of publishedGuides) {
        entries.push({
          url: `${baseUrl}/${lang}/guides/${guide.slug}`,
          lastModified: guide.updatedAt ? new Date(guide.updatedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }
  return entries;
}