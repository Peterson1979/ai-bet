import { env } from "../env";

const GRAPH_BASE = "https://graph.facebook.com/v25.0";

export async function publishFacebook(imageUrl: string, message: string) {
  console.log("Facebook publish start", {
    pageId: env.FACEBOOK_PAGE_ID,
    imageUrl,
    messageLength: message.length,
  });

  const uploadBody =
    `url=${encodeURIComponent(imageUrl)}` +
    `&published=false` +
    `&access_token=${encodeURIComponent(env.FACEBOOK_ACCESS_TOKEN)}`;

  const uploadRes = await fetch(
    `${GRAPH_BASE}/${env.FACEBOOK_PAGE_ID}/photos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: uploadBody,
    }
  );

  const uploadText = await uploadRes.text();
  let uploadJson: any;

  try {
    uploadJson = JSON.parse(uploadText);
  } catch {
    uploadJson = { raw: uploadText };
  }

  console.log("Facebook photo upload response", {
    status: uploadRes.status,
    ok: uploadRes.ok,
    json: uploadJson,
  });

  if (!uploadRes.ok || !uploadJson?.id) {
    console.error("Facebook photo upload error JSON:", uploadJson);
    throw new Error(`Facebook photo upload failed: ${JSON.stringify(uploadJson)}`);
  }

  const photoId = uploadJson.id;
  const attachedMediaJson = JSON.stringify({ media_fbid: photoId });

  const feedBody =
    `message=${encodeURIComponent(message)}` +
    `&attached_media[0]=${encodeURIComponent(attachedMediaJson)}` +
    `&access_token=${encodeURIComponent(env.FACEBOOK_ACCESS_TOKEN)}`;

  const feedRes = await fetch(
    `${GRAPH_BASE}/${env.FACEBOOK_PAGE_ID}/feed`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: feedBody,
    }
  );

  const feedText = await feedRes.text();
  let feedJson: any;

  try {
    feedJson = JSON.parse(feedText);
  } catch {
    feedJson = { raw: feedText };
  }

  console.log("Facebook feed publish response", {
    status: feedRes.status,
    ok: feedRes.ok,
    json: feedJson,
  });

  if (!feedRes.ok) {
    console.error("Facebook feed publish error JSON:", feedJson);
    throw new Error(`Facebook feed publish failed: ${JSON.stringify(feedJson)}`);
  }

  return {
    photo: uploadJson,
    post: feedJson,
  };
}