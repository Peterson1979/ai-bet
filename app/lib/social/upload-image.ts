import { put } from "@vercel/blob";
import { env } from "../env";

export async function uploadBufferToBlob(
  data: ArrayBuffer,
  fileName: string,
  contentType = "image/png"
) {
  const blob = await put(`social/${fileName}`, data, {
    access: "public",
    addRandomSuffix: true,
    contentType,
    token: env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}