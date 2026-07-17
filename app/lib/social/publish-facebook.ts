import { env } from "../env";

const GRAPH_BASE = "https://graph.facebook.com/v25.0";

type FacebookPhotoUploadResponse = {
  id?: string;
  post_id?: string;
};

export async function publishFacebook(imageUrls: string[], message: string) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    throw new Error("Facebook publish failed: no image URLs provided");
  }

  console.log("Facebook carousel publish start", {
    pageId: env.FACEBOOK_PAGE_ID,
    imageCount: imageUrls.length,
    messageLength: message.length,
  });

  const uploadedPhotoIds: string[] = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];

    const uploadBody =
      `url=${encodeURIComponent(imageUrl)}` +
      `&published=false` +
      `&access_token=${encodeURIComponent(env.FACEBOOK_ACCESS_TOKEN)}`;

    const uploadRes = await fetch(`${GRAPH_BASE}/${env.FACEBOOK_PAGE_ID}/photos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: uploadBody,
    });

    const uploadText = await uploadRes.text();
    let uploadJson: FacebookPhotoUploadResponse | { raw: string };

    try {
      uploadJson = JSON.parse(uploadText);
    } catch {
      uploadJson = { raw: uploadText };
    }

    console.log("Facebook photo upload response", {
      index: i,
      status: uploadRes.status,
      ok: uploadRes.ok,
      json: uploadJson,
    });

    if (!uploadRes.ok || !("id" in uploadJson) || !uploadJson.id) {
      console.error("Facebook photo upload error JSON:", uploadJson);
      throw new Error(`Facebook photo upload failed: ${JSON.stringify(uploadJson)}`);
    }

    uploadedPhotoIds.push(uploadJson.id);
  }

  const bodyParts: string[] = [
    `message=${encodeURIComponent(message)}`,
    `access_token=${encodeURIComponent(env.FACEBOOK_ACCESS_TOKEN)}`,
  ];

  for (let i = 0; i < uploadedPhotoIds.length; i++) {
    const attachedMediaJson = JSON.stringify({ media_fbid: uploadedPhotoIds[i] });
    bodyParts.push(`attached_media[${i}]=${encodeURIComponent(attachedMediaJson)}`);
  }

  const feedBody = bodyParts.join("&");

  const feedRes = await fetch(`${GRAPH_BASE}/${env.FACEBOOK_PAGE_ID}/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: feedBody,
  });

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
    photos: uploadedPhotoIds,
    post: feedJson,
  };
}
