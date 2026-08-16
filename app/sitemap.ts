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
    { 
      path: "", 
      changeFrequency: "daily" as const, 
      priority: 1 
    },
    { 
      path: "/betting", 
      changeFrequency: "monthly" as const, 
      priority: 0.8 
    },
    { 
      path: "/tools", 
      changeFrequency: "monthly" as const, 
      priority: 0.7 
    },
    {
      path: "/betting-glossary",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/contact",
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