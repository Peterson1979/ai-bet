export type Match = {
  slug: string;
  league: string;
};

const competitions = [
  "PL",
  "SA",
  "PD",
  "BL1",
  "CL",
];

export async function getMatches(): Promise<Match[]> {
  const allMatches: Match[] = [];

  for (const code of competitions) {
    try {
      const res = await fetch(
        `https://api.football-data.org/v4/competitions/${code}/matches`,
        {
          headers: {
            "X-Auth-Token":
              process.env.FOOTBALL_DATA_API_KEY || "",
          },
          cache: "no-store",
        }
      );

      if (!res.ok) continue;

      const data = await res.json();

      const matches = data.matches || [];

      for (const m of matches) {
        if (m.status !== "SCHEDULED") continue;

        const home = m.homeTeam?.name || "home";
        const away = m.awayTeam?.name || "away";

        const slug =
          home.toLowerCase().replace(/\s+/g, "-") +
          "-vs-" +
          away.toLowerCase().replace(/\s+/g, "-");

        allMatches.push({
          slug,
          league: data.competition?.name || code,
        });
      }
    } catch {}
  }

  return allMatches.slice(0, 20);
}