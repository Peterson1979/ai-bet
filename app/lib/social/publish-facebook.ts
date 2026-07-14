import { env } from "../env";

export async function publishFacebook(imageUrl: string, message: string) {
  const res = await fetch(
    `https://graph.facebook.com/v25.0/${env.META_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        url: imageUrl,
        message,
        access_token: env.META_PAGE_ACCESS_TOKEN,
      }),
    }
  ).then((r) => r.json());

  if (!res.id) throw new Error(`FB photo publish failed: ${JSON.stringify(res)}`);

  return {
    photoId: res.id,
    postId: res.post_id ?? null,
  };
}