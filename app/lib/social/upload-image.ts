import { put } from "@vercel/blob";
import { env } from "../env";
import { Buffer } from "node:buffer";

export async function uploadBufferToBlob(
  data: ArrayBuffer | Uint8Array,
  fileName: string,
  contentType = "image/jpeg"
) {
  const body =
    data instanceof Uint8Array
      ? Buffer.from(data)
      : Buffer.from(new Uint8Array(data));

  const blob = await put(`social/${fileName}`, body, {
    access: "public",
    addRandomSuffix: true,
    contentType,
    token: env.BLOB_READ_WRITE_TOKEN,
  });

  return blob.url;
}