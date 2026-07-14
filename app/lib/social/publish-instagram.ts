import { env } from "../env";

export async function publishInstagram(imageUrl: string, caption: string) {
  const createBody = new URLSearchParams({
    image_url: imageUrl,
    caption,
    access_token: env.INSTAGRAM_ACCESS_TOKEN,
  });

  const createRes = await fetch(
    `https://graph.facebook.com/v25.0/${env.INSTAGRAM_BUSINESS_ID}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: createBody,
    }
  );

  const createJson = await createRes.json();

  if (!createRes.ok) {
    throw new Error(`Instagram media creation failed: ${JSON.stringify(createJson)}`);
  }

  const creationId = createJson.id;

  const publishBody = new URLSearchParams({
    creation_id: creationId,
    access_token: env.INSTAGRAM_ACCESS_TOKEN,
  });

  const publishRes = await fetch(
    `https://graph.facebook.com/v25.0/${env.INSTAGRAM_BUSINESS_ID}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: publishBody,
    }
  );

  const publishJson = await publishRes.json();

  if (!publishRes.ok) {
    throw new Error(`Instagram publish failed: ${JSON.stringify(publishJson)}`);
  }

  return publishJson;
}