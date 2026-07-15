import { env } from "../env";

export async function publishFacebook(imageUrl: string, message: string) {
  const params = new URLSearchParams();
  params.append("url", imageUrl);
  params.append("caption", message);
  params.append("access_token", env.FACEBOOK_ACCESS_TOKEN);

  const res = await fetch(
    `https://graph.facebook.com/v25.0/${env.FACEBOOK_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  const text = await res.text();
  let json: unknown;

  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }

  if (!res.ok) {
    throw new Error(`Facebook publish failed: ${JSON.stringify(json)}`);
  }

  return json;
}