import fs from "fs/promises";
import path from "path";
import { env } from "../env";

export async function savePublicImage(localPath: string, fileName: string) {
  const publicDir = path.join(process.cwd(), "public", "generated");
  await fs.mkdir(publicDir, { recursive: true });

  const dest = path.join(publicDir, fileName);
  await fs.copyFile(localPath, dest);

  return `${env.PUBLIC_BASE_URL}/generated/${fileName}`;
}