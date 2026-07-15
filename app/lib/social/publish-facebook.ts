import { env } from "../env";

export async function publishFacebook(imageUrl: string, message: string) {
  const body = new URLSearchParams({
    url: imageUrl,
    message,
    access_token: env.FACEBOOK_ACCESS_TOKEN,
  });

  const res = await fetch(
    `https://graph.facebook.com/v25.0/${env.FACEBOOK_PAGE_ID}/photos`,
    {
      method: "POST",
      body,
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`Facebook publish failed: ${JSON.stringify(json)}`);
  }

  return json;
}