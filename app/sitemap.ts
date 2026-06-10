import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

type Prediction = {
  slug: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://matchsignal.pro";
  let urls: MetadataRoute.Sitemap = [];

  try {
    const filePath = path.join(process.cwd(), "data", "predictions.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const predictions: Prediction[] = JSON.parse(data);
    urls = predictions.map((p) => ({
      url: `${baseUrl}/predictions/${p.slug}`,
      lastModified: new Date(),
    }));
  } catch {
    urls = [];
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/betting`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...urls,
  ];
}