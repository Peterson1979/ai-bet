import { env } from "../env";

const GRAPH_BASE = "https://graph.facebook.com/v25.0";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function publishInstagram(imageUrl: string, caption: string) {
  console.log("Instagram publish start", {
    imageUrl,
    captionLength: caption.length,
    instagramBusinessId: env.INSTAGRAM_BUSINESS_ID,
  });

  const createBody = new URLSearchParams({
    image_url: imageUrl,
    caption,
    access_token: env.INSTAGRAM_ACCESS_TOKEN,
  });

  const createRes = await fetch(
    `${GRAPH_BASE}/${env.INSTAGRAM_BUSINESS_ID}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: createBody.toString(),
    }
  );

  const createJson = await createRes.json();

  console.log("Instagram media create response", {
    status: createRes.status,
    ok: createRes.ok,
    json: createJson,
  });

  if (!createRes.ok) {
    console.error("Instagram media create error JSON:", createJson);
    throw new Error(`Instagram media creation failed: ${JSON.stringify(createJson)}`);
  }

  const creationId = createJson.id;

  if (!creationId) {
    console.error("Instagram media create missing id:", createJson);
    throw new Error("Instagram media creation returned no creation id");
  }

  let statusJson: any = null;

  for (let attempt = 1; attempt <= 10; attempt++) {
    await sleep(3000);

    const statusRes = await fetch(
      `${GRAPH_BASE}/${creationId}?fields=status_code,status&access_token=${encodeURIComponent(
        env.INSTAGRAM_ACCESS_TOKEN
      )}`
    );

    statusJson = await statusRes.json();

    console.log("Instagram media status response", {
      attempt,
      status: statusRes.status,
      ok: statusRes.ok,
      json: statusJson,
    });

    if (!statusRes.ok) {
      throw new Error(`Instagram media status check failed: ${JSON.stringify(statusJson)}`);
    }

    if (
      statusJson.status_code === "FINISHED" ||
      statusJson.status_code === "PUBLISHED"
    ) {
      break;
    }

    if (
      statusJson.status_code === "ERROR" ||
      statusJson.status_code === "EXPIRED"
    ) {
      throw new Error(`Instagram media container failed: ${JSON.stringify(statusJson)}`);
    }

    if (attempt === 10) {
      throw new Error(`Instagram media not ready in time: ${JSON.stringify(statusJson)}`);
    }
  }

  const publishBody = new URLSearchParams({
    creation_id: creationId,
    access_token: env.INSTAGRAM_ACCESS_TOKEN,
  });

  const publishRes = await fetch(
    `${GRAPH_BASE}/${env.INSTAGRAM_BUSINESS_ID}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: publishBody.toString(),
    }
  );

  const publishJson = await publishRes.json();

  console.log("Instagram media publish response", {
    status: publishRes.status,
    ok: publishRes.ok,
    json: publishJson,
  });

  if (!publishRes.ok) {
    console.error("Instagram media publish error JSON:", publishJson);
    throw new Error(`Instagram publish failed: ${JSON.stringify(publishJson)}`);
  }

  return publishJson;
}