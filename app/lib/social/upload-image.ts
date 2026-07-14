import { put } from "@vercel/blob";
import { env } from "../env";
import sharp from "sharp";

export async function uploadBufferToBlob(
  data: ArrayBuffer,
  fileName: string
) {
  // 1) Konvertáljuk a bejövő buffert valódi JPEG-re
  const jpegBuffer = await sharp(Buffer.from(data))
    .jpeg({
      quality: 90,
      chromaSubsampling: "4:4:4", // jobb minőség feedre
    })
    .toBuffer();

  // 2) Biztonság kedvéért .jpg kiterjesztés
  const safeFileName = fileName.replace(/\.(png|webp|gif|avif|heic)$/i, ".jpg");

  // 3) Feltöltjük Vercel Blobba JPEG-ként
  const blob = await put(`social/${safeFileName}`, jpegBuffer, {
    access: "public",
    addRandomSuffix: true,
    contentType: "image/jpeg",
    token: env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}