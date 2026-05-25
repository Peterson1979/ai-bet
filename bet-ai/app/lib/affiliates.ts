export function getAffiliateLink(league: string) {
  const map: Record<string, string> = {
    "Premier League": "https://www.bet365.com",
    "Serie A": "https://www.bwin.com",
    "La Liga": "https://www.unibet.com",
    "Bundesliga": "https://www.1xbet.com",
    default: "https://www.bet365.com",
  };

  return map[league] || map.default;
}