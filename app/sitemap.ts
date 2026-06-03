import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

type Prediction = {
  slug: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

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
    },
    ...urls,
  ];
}