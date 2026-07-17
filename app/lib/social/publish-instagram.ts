import { env } from "../env";

const GRAPH_BASE = "https://graph.facebook.com/v25.0";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createMediaContainer(imageUrl: string, caption: string) {
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

  if (!createRes.ok) {
    throw new Error(`Instagram media creation failed: ${JSON.stringify(createJson)}`);
  }

  const creationId = createJson.id;

  if (!creationId) {
    throw new Error("Instagram media creation returned no creation id");
  }

  return creationId as string;
}

async function waitForContainerReady(creationId: string) {
  let statusJson: any = null;

  for (let attempt = 1; attempt <= 10; attempt++) {
    await sleep(3000);

    const statusRes = await fetch(
      `${GRAPH_BASE}/${creationId}?fields=status_code,status&access_token=${encodeURIComponent(
        env.INSTAGRAM_ACCESS_TOKEN
      )}`
    );

    statusJson = await statusRes.json();

    if (!statusRes.ok) {
      throw new Error(`Instagram media status check failed: ${JSON.stringify(statusJson)}`);
    }

    if (
      statusJson.status_code === "FINISHED" ||
      statusJson.status_code === "PUBLISHED"
    ) {
      return statusJson;
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

  return statusJson;
}

async function publishContainer(creationId: string) {
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

  if (!publishRes.ok) {
    throw new Error(`Instagram publish failed: ${JSON.stringify(publishJson)}`);
  }

  return publishJson;
}

export async function publishInstagram(imageUrl: string, caption: string) {
  const creationId = await createMediaContainer(imageUrl, caption);
  await waitForContainerReady(creationId);
  return publishContainer(creationId);
}

async function createCarouselChildContainer(imageUrl: string) {
  const body = new URLSearchParams({
    image_url: imageUrl,
    is_carousel_item: "true",
    access_token: env.INSTAGRAM_ACCESS_TOKEN,
  });

  const res = await fetch(`${GRAPH_BASE}/${env.INSTAGRAM_BUSINESS_ID}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`Instagram carousel child creation failed: ${JSON.stringify(json)}`);
  }

  if (!json.id) {
    throw new Error("Instagram carousel child creation returned no id");
  }

  return json.id as string;
}

async function createCarouselParentContainer(childIds: string[], caption: string) {
  const body = new URLSearchParams({
    media_type: "CAROUSEL",
    children: childIds.join(","),
    caption,
    access_token: env.INSTAGRAM_ACCESS_TOKEN,
  });

  const res = await fetch(`${GRAPH_BASE}/${env.INSTAGRAM_BUSINESS_ID}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(`Instagram carousel parent creation failed: ${JSON.stringify(json)}`);
  }

  if (!json.id) {
    throw new Error("Instagram carousel parent creation returned no id");
  }

  return json.id as string;
}

export async function publishInstagramCarousel(imageUrls: string[], caption: string) {
  if (imageUrls.length < 2) {
    throw new Error("Instagram carousel requires at least 2 images");
  }

  if (imageUrls.length > 10) {
    throw new Error("Instagram carousel supports at most 10 images");
  }

  const childIds: string[] = [];

  for (const imageUrl of imageUrls) {
    const childId = await createCarouselChildContainer(imageUrl);
    await waitForContainerReady(childId);
    childIds.push(childId);
  }

  const parentId = await createCarouselParentContainer(childIds, caption);
  await waitForContainerReady(parentId);

  return publishContainer(parentId);
}