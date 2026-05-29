import "server-only";
import fs from "fs";
import path from "path";

export async function getPredictions() {
  const filePath = path.join(process.cwd(), "data", "predictions.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}