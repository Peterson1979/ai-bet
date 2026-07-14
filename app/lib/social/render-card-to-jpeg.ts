export async function renderCardToJpeg(url: string) {
  const apiUrl = new URL("https://api.microlink.io/");

  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("screenshot", "true");
  apiUrl.searchParams.set("meta", "false");
  apiUrl.searchParams.set("embed", "screenshot.url");

  const res = await fetch(apiUrl.toString(), {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`screenshot api failed: ${res.status}`);
  }

  const json = await res.json();
  const screenshotUrl = json?.data?.screenshot?.url;

  if (!screenshotUrl) {
    throw new Error("screenshot api returned no screenshot url");
  }

  const imageRes = await fetch(screenshotUrl, {
    method: "GET",
  });

  if (!imageRes.ok) {
    throw new Error(`screenshot image fetch failed: ${imageRes.status}`);
  }

  const imageBuffer = await imageRes.arrayBuffer();
  return imageBuffer;
}