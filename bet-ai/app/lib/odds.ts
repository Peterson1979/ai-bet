export type OddsData = {
  home: number;
  draw: number;
  away: number;
};

export async function getOdds(
  homeTeam: string,
  awayTeam: string
): Promise<OddsData | null> {
  try {
    // fallback demo API (később cseréljük TheOddsAPI / RapidAPI-ra)
    const res = await fetch(
      `https://api.the-odds-api.com/v4/sports/soccer/odds/?apiKey=${process.env.ODDS_API_KEY}&regions=eu&markets=h2h`
    );

    if (!res.ok) return null;

    const data = await res.json();

    const match = data.find((m: any) =>
      m.home_team === homeTeam && m.away_team === awayTeam
    );

    if (!match) return null;

    const book = match.bookmakers?.[0];
    const markets = book?.markets?.[0];

    if (!markets) return null;

    return {
      home: markets.outcomes[0].price,
      away: markets.outcomes[1].price,
      draw: markets.outcomes[2]?.price ?? 0,
    };
  } catch {
    return null;
  }
}