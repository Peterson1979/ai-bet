export const SPORT_SLUGS: Record<string, string> = {
  Football: "football",
  NBA: "nba",
  NFL: "nfl",
  Hockey: "hockey",
  Tennis: "tennis",
  MLB: "mlb",
  MMA: "mma",
};


export function getSportSlug(sport: string): string {
  return SPORT_SLUGS[sport] ?? sport.toLowerCase();
}