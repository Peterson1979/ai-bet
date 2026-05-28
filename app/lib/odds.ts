const API_KEY = process.env.ODDS_API_KEY;

const SPORTS = [
  {
    key: "soccer",
    label: "Football",
  },
  {
    key: "basketball_nba",
    label: "NBA",
  },
  {
    key: "americanfootball_nfl",
    label: "NFL",
  },
  {
    key: "icehockey_nhl",
    label: "Hockey",
  },
  {
    key: "tennis_atp",
    label: "Tennis",
  },
];

export type OddsEvent = {
  id: string;

  sport: string;

  league: string;

  homeTeam: string;

  awayTeam: string;

  commenceTime: string;

  bookmaker?: string;

  odds?: number;
};

async function fetchSportEvents(
  sportKey: string,
  sportLabel: string
): Promise<OddsEvent[]> {
  try {
    const url =
      `https://api.the-odds-api.com/v4/sports/${sportKey}/odds/` +
      `?apiKey=${API_KEY}` +
      `&regions=eu` +
      `&markets=h2h` +
      `&oddsFormat=decimal`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Odds API error: ${sportKey}`);

      return [];
    }

    const data = await response.json();

    return data.slice(0, 10).map((event: any) => {
      const bookmaker = event.bookmakers?.[0];

      const market = bookmaker?.markets?.[0];

      const outcomes = market?.outcomes || [];

      const homeOutcome = outcomes.find(
        (o: any) => o.name === event.home_team
      );

      return {
        id: event.id,

        sport: sportLabel,

        league: event.sport_title,

        homeTeam: event.home_team,

        awayTeam: event.away_team,

        commenceTime: event.commence_time,

        bookmaker: bookmaker?.title || "Unknown",

        odds: homeOutcome?.price || null,
      };
    });
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getDailyEvents() {
  const results = await Promise.all(
    SPORTS.map((sport) =>
      fetchSportEvents(
        sport.key,
        sport.label
      )
    )
  );

  return SPORTS.map((sport, index) => ({
    sport: sport.label,

    events: results[index],
  }));
}