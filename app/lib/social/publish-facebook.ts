import { env } from "../env";

const GRAPH_BASE = "https://graph.facebook.com/v25.0";

export async function publishFacebook(imageUrl: string, message: string) {
  const uploadParams = new URLSearchParams();
  uploadParams.append("url", imageUrl);
  uploadParams.append("published", "false");
  uploadParams.append("access_token", env.FACEBOOK_ACCESS_TOKEN);

  const uploadRes = await fetch(
    `${GRAPH_BASE}/${env.FACEBOOK_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: uploadParams.toString(),
    }
  );

  const uploadText = await uploadRes.text();
  let uploadJson: any;

  try {
    uploadJson = JSON.parse(uploadText);
  } catch {
    uploadJson = { raw: uploadText };
  }

  if (!uploadRes.ok || !uploadJson.id) {
    throw new Error(`Facebook photo upload failed: ${JSON.stringify(uploadJson)}`);
  }

  const feedParams = new URLSearchParams();
  feedParams.append("message", message);
  feedParams.append("attached_media[0]", JSON.stringify({ media_fbid: uploadJson.id }));
  feedParams.append("access_token", env.FACEBOOK_ACCESS_TOKEN);

  const feedRes = await fetch(
    `${GRAPH_BASE}/${env.FACEBOOK_PAGE_ID}/feed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: feedParams.toString(),
    }
  );

  const feedText = await feedRes.text();
  let feedJson: unknown;

  try {
    feedJson = JSON.parse(feedText);
  } catch {
    feedJson = { raw: feedText };
  }

  if (!feedRes.ok) {
    throw new Error(`Facebook feed publish failed: ${JSON.stringify(feedJson)}`);
  }

  return {
    photo: uploadJson,
    post: feedJson,
  };
}