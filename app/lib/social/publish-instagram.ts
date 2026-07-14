import { env } from "../env";

export async function publishInstagram(imageUrl: string, caption: string) {
  const createRes = await fetch(
    `https://graph.facebook.com/v25.0/${env.META_IG_USER_ID}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        image_url: imageUrl,
        caption,
        access_token: env.META_PAGE_ACCESS_TOKEN,
      }),
    }
  ).then((r) => r.json());

  if (!createRes.id) throw new Error(`IG media create failed: ${JSON.stringify(createRes)}`);

  const containerId = createRes.id;

  for (let i = 0; i < 10; i++) {
    const status = await fetch(
      `https://graph.facebook.com/v25.0/${containerId}?fields=status_code&access_token=${env.META_PAGE_ACCESS_TOKEN}`
    ).then((r) => r.json());

    if (status.status_code === "FINISHED") break;
    await new Promise((r) => setTimeout(r, 3000));
  }

  const publishRes = await fetch(
    `https://graph.facebook.com/v25.0/${env.META_IG_USER_ID}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        creation_id: containerId,
        access_token: env.META_PAGE_ACCESS_TOKEN,
      }),
    }
  ).then((r) => r.json());

  if (!publishRes.id) throw new Error(`IG media publish failed: ${JSON.stringify(publishRes)}`);

  const mediaId = publishRes.id;

  const details = await fetch(
    `https://graph.facebook.com/v25.0/${mediaId}?fields=permalink,caption,media_type&access_token=${env.META_PAGE_ACCESS_TOKEN}`
  ).then((r) => r.json());

  return {
    containerId,
    mediaId,
    permalink: details.permalink ?? null,
  };
}