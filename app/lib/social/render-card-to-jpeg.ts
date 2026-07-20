export async function renderCardToJpeg(url: string) {
  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`social-card fetch failed: ${res.status} ${text.slice(0, 300)}`);
  }

  const contentType = res.headers.get("content-type") ?? "";

  if (!contentType.startsWith("image/")) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `social-card returned unexpected content-type: ${contentType} ${text.slice(0, 300)}`
    );
  }

  return await res.arrayBuffer();
}