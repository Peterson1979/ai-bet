export function trackClick(league: string, slug: string) {
  const event = {
    type: "affiliate_click",
    league,
    slug,
    time: new Date().toISOString(),
  };

  // lokális debug (később adatbázis / analytics)
  console.log("TRACK:", event);

  if (typeof window !== "undefined") {
    const key = "click_events";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(event);
    localStorage.setItem(key, JSON.stringify(existing));
  }
}