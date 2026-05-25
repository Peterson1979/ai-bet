import fs from "fs";
import path from "path";

type Prediction = {
  slug: string;
};

export default function sitemap() {
  let urls: { url: string; lastModified: Date }[] = [];

  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "predictions.json"
    );

    const data = fs.readFileSync(filePath, "utf-8");
    const predictions: Prediction[] = JSON.parse(data);

    urls = predictions.map((p) => ({
      url: `https://aitips.vercel.app/predictions/${p.slug}`,
      lastModified: new Date(),
    }));
  } catch {
    urls = [];
  }

  return [
    {
      url: "https://aitips.vercel.app",
      lastModified: new Date(),
    },
    ...urls,
  ];
}