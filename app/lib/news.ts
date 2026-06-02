// app/lib/news.ts
import "server-only";

export type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  sport: string;
  source: string;
};

const RSS_FEEDS = [
  { url: "https://www.espn.com/espn/rss/soccer/news", sport: "Football" },
  { url: "https://www.espn.com/espn/rss/nba/news",    sport: "NBA"      },
  { url: "https://www.espn.com/espn/rss/nfl/news",    sport: "NFL"      },
  { url: "https://www.espn.com/espn/rss/nhl/news",    sport: "Hockey"   },
  { url: "https://www.espn.com/espn/rss/tennis/news", sport: "Tennis"   },
  { url: "https://www.espn.com/espn/rss/mlb/news",    sport: "MLB"      },
  { url: "https://www.espn.com/espn/rss/mma/news",    sport: "MMA"      },
];

const ITEMS_PER_SPORT = 3;

/** CDATA wrapper eltávolítása */
function stripCdata(str: string): string {
  return str
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .trim();
}

/** Első illeszkedő csoport visszaadása, CDATA tisztítással */
function extract(xml: string, ...patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = xml.match(pattern);
    if (match?.[1]) return stripCdata(match[1]);
  }
  return "";
}

function parseRSS(xml: string, sport: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);

  for (const match of itemMatches) {
    const item = match[1];

    const title = extract(
      item,
      /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/,
      /<title>([\s\S]*?)<\/title>/
    );

    const link = extract(
      item,
      /<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/,
      /<link>([\s\S]*?)<\/link>/,
      /<guid><!\[CDATA\[([\s\S]*?)\]\]><\/guid>/,
      /<guid>([\s\S]*?)<\/guid>/
    );

    const pubDate = extract(
      item,
      /<pubDate>([\s\S]*?)<\/pubDate>/
    );

    if (!title || !link || link === "#") continue;

    // Csak http(s) linkek
    if (!link.startsWith("http")) continue;

    items.push({ title, link, pubDate, sport, source: "ESPN" });

    if (items.length >= ITEMS_PER_SPORT) break;
  }

  return items;
}

const cache = new Map<string, { data: NewsItem[]; ts: number }>();
const CACHE_TTL = 1000 * 60 * 30;

async function fetchFeed(url: string, sport: string): Promise<NewsItem[]> {
  const cached = cache.get(sport);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;

  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 },
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
    if (result.status === "fulfilled") allItems.push(...result.value);
  }

  return allItems.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });
}

export async function getNewsBySport(sport: string): Promise<NewsItem[]> {
  const feed = RSS_FEEDS.find((f) => f.sport === sport);
  if (!feed) return [];
  return fetchFeed(feed.url, sport);
}
