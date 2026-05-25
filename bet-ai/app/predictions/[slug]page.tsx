import fs from "fs";
import path from "path";

type Prediction = {
  slug: string;
  league: string;
  prediction: string;
  confidence: number;
  analysis: string;
};

async function getPrediction(slug: string) {
  const filePath = path.join(process.cwd(), "data", "predictions.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const all: Prediction[] = JSON.parse(data);

  return all.find((p) => p.slug === slug);
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const p = await getPrediction(params.slug);

  if (!p) return <div>Not found</div>;

  return (
    <main style={{ padding: 24, color: "#fff", background: "#0b0f14" }}>
      <h1>{p.slug}</h1>
      <p>{p.league}</p>
      <p>{p.prediction}</p>
      <p>{p.confidence}% confidence</p>
      <p>{p.analysis}</p>
    </main>
  );
}