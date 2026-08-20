import type { MetadataRoute } from "next";
import { GUIDE_LOCALES, getPublishedGuideManifest } from "@/app/lib/guides";
import { LANGS } from "@/app/lib/i18n";
import { LEGAL_SLUGS } from "@/app/lib/legal/types";

const baseUrl = "https://www.matchsignal.pro";

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
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LANGS) {
    for (const page of multilingualPages) {
      entries.push({
        url: `${baseUrl}/${lang}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }

    for (const slug of LEGAL_SLUGS) {
      entries.push({
        url: `${baseUrl}/${lang}/legal/${slug}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
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
