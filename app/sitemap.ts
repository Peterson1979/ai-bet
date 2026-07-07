import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://matchsignal.pro";

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

  const staticPages = [
    { path: "", changeFrequency: "daily" as const, priority: 1 },
    { path: "/betting", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/news", changeFrequency: "hourly" as const, priority: 0.9 },
    { path: "/tools", changeFrequency: "monthly" as const, priority: 0.7 },
    {
      path: "/betting-glossary",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];


  const entries: MetadataRoute.Sitemap = [];


  for (const lang of langs) {

    for (const page of staticPages) {

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


  return entries;
}