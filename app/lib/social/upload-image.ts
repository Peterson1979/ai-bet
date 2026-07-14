import fs from "fs/promises";
import { put } from "@vercel/blob";

export async function uploadImageToBlob(localPath: string, fileName: string) {
  const file = await fs.readFile(localPath);

  const blob = await put(`social/${fileName}`, file, {
    access: "public",
    contentType: "image/jpeg",
    addRandomSuffix: true,
  });

  return blob.url;
}