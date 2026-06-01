// app/lib/news.ts
import "server-only";

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  sport: string;
  source: string;
};

// ESPN sport-specifikus RSS feedek — lefedi mind a 7 sportágat
const RSS_FEEDS = [
  { url: "https://www.espn.com/espn/rss/soccer/news",   sport: "Football" },
  { url: "https://www.espn.com/espn/rss/nba/news",      sport: "NBA"      },
  { url: "https://www.espn.com/espn/rss/nfl/news",      sport: "NFL"      },
  { url: "https://www.espn.com/espn/rss/nhl/news",      sport: "Hockey"   },
  { url: "https://www.espn.com/espn/rss/tennis/news",   sport: "Tennis"   },
  { url: "https://www.espn.com/espn/rss/mlb/news",      sport: "MLB"      },
  { url: "https://www.espn.com/espn/rss/mma/news",      sport: "MMA"      },
];

const ITEMS_PER_SPORT = 3;

// Simple XML parser — nincs szükség külső lib-re
function parseRSS(xml: string, sport: string): NewsItem[] {
  const items: NewsItem[] = [];

  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    const item = match[1];

    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
      ?.[1] ?? item.match(/<title>(.*?)<\/title>/)?.[1] ?? "";

    const link = item.match(/<link>(.*?)<\/link>/)?.[1]
      ?? item.match(/<guid>(.*?)<\/guid>/)?.[1] ?? "#";

    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";

    if (!title) continue;

    items.push({
      title: title.trim(),
      link: link.trim(),
      pubDate: pubDate.trim(),
      sport,
      source: "ESPN",
    });

    if (items.length >= ITEMS_PER_SPORT) break;
  }

  return items;
}

// In-memory cache — 30 perc
const cache = new Map<string, { data: NewsItem[]; ts: number }>();
const CACHE_TTL = 1000 * 60 * 30;

async function fetchFeed(url: string, sport: string): Promise<NewsItem[]> {
  const cached = cache.get(sport);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 }, // Next.js cache 30 perc
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BetAI/1.0)" },
    });

    if (!res.ok) return [];

    const xml = await res.text();
    const items = parseRSS(xml, sport);

    cache.set(sport, { data: items, ts: Date.now() });
    return items;
  } catch {
    return [];
  }
}

export async function getLatestNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map((feed) => fetchFeed(feed.url, feed.sport))
  );

  const allItems: NewsItem[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Rendezés dátum szerint (legújabb elöl)
  return allItems.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });
}

// Sport-specifikus hírek
export async function getNewsBySport(sport: string): Promise<NewsItem[]> {
  const feed = RSS_FEEDS.find((f) => f.sport === sport);
  if (!feed) return [];
  return fetchFeed(feed.url, sport);
}
