import { env } from "../env";

export async function publishFacebook(imageBuffer: Buffer, message: string) {
  const form = new FormData();

  const arrayBuffer = imageBuffer.buffer.slice(
    imageBuffer.byteOffset,
    imageBuffer.byteOffset + imageBuffer.byteLength
  ) as ArrayBuffer;

  const file = new File([arrayBuffer], "social-card.jpg", {
    type: "image/jpeg",
  });

  form.append("source", file);
  form.append("caption", message);
  form.append("access_token", env.FACEBOOK_ACCESS_TOKEN);

  const res = await fetch(
    `https://graph.facebook.com/v25.0/${env.FACEBOOK_PAGE_ID}/photos`,
    {
      method: "POST",
      body: form,
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`Facebook publish failed: ${JSON.stringify(json)}`);
  }

  return json;
}