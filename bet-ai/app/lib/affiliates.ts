const affiliates: Record<string, string[]> = {
  "Premier League": [
    "https://www.bet365.com",
    "https://www.unibet.com",
  ],
  "Serie A": [
    "https://www.bwin.com",
    "https://www.betano.com",
  ],
  "La Liga": [
    "https://www.unibet.com",
    "https://www.1xbet.com",
  ],
  "Bundesliga": [
    "https://www.bwin.com",
    "https://www.bet365.com",
  ],
};

export function getAffiliateLink(league: string) {
  const options = affiliates[league];

  if (!options || options.length === 0) {
    return "https://www.bet365.com";
  }

  const index = Math.floor(Math.random() * options.length);
  return options[index];
}