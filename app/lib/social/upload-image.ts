import { put } from "@vercel/blob";

export async function uploadBufferToBlob(
  data: ArrayBuffer,
  fileName: string,
  contentType = "image/png"
) {
  const blob = await put(`social/${fileName}`, data, {
    access: "public",
    addRandomSuffix: true,
    contentType,
  });

  return blob.url;
}