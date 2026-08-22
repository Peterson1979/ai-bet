import { loadReadyVideoAssets } from "./content-loader";
import type { VideoAsset } from "./types";

export const VIDEO_MANIFEST = [
  {
    id: "0817",
    sourceUrl:
      "https://res.cloudinary.com/u4u07qyb/video/upload/br_av:video_(value_14m;mode_cbr);audio_(value_120k),vc_h264:high,ac_aac,af_48000,fps_30,c_fill,w_1080,h_1920,f_mp4/v1787392866/0817.mp4",
    enabled: true,
    platforms: {
      instagram: {
        targets: [
          {
            targetId: "instagram-main",
            enabled: false,
            caption: `Ever wondered what actually happens before a bookmaker sets a price?

Behind every number you see, there's a machine crunching stats, player data, and market movements — turning raw information into the odds you bet on.

The problem? Every bookmaker's "machine" spits out a different number for the same match.

That's exactly why comparison matters. MatchSignal pulls odds from multiple sportsbooks side by side, adds market-based probability analysis, and gives you a clear, AI-generated explanation for every pick — so you're not guessing which price is actually good.

Free to use. No subscription. No registration.

Link in bio

18+ | Gamble responsibly | For informational purposes only

.
.
.
#MatchSignal #SportsBetting #BettingTips #Odds #BettingAnalysis #SportsAnalytics #BettingCommunity #SmartBetting #ValueBetting #BettingStrategy #FootballBetting #NBABetting #NFLBetting #SportsData #AIBetting #BettingGuide #BankrollManagement #BetSmart #OddsComparison #ResponsibleGambling`,
          },
          {
            targetId: "instagram-2",
            enabled: false,
            caption: `The odds you see aren't magic — they're the output of a system.

Complex models process match stats and market data, and the result is a price. But that price changes constantly, and it's never the same across every bookmaker.

MatchSignal tracks odds across Football, NBA, NFL, Hockey, Tennis, MLB and MMA — comparing pricing across multiple sportsbooks and highlighting where the numbers may offer real value, backed by a short AI explanation for every selection.

Stop checking one bookmaker at a time. Compare smarter.

Link in bio

18+ | Gamble responsibly | No prediction guarantees an outcome

.
.
.
#MatchSignal #SportsBetting #Odds #OddsComparison #BettingTips #ValueBetting #SportsAnalytics #BettingAnalysis #AIBetting #BettingCommunity #SmartBetting #FootballOdds #NBAOdds #BettingStrategy #BetSmart #BettingGlossary #SportsData #FreeBettingTools #ResponsibleGambling #BettingGuide`,
          },
        ],
      },
      facebook: {
        targets: [
          {
            targetId: "facebook-main",
            enabled: false,
            message: `Ever wonder how bookmakers actually come up with their odds? It's not guesswork — it's a system built from match statistics, player data, and constant market movement, all processed into a price.

The catch: no two bookmakers process it the same way. That's why the odds for the same match can look completely different depending on where you check.

MatchSignal compares odds from multiple sportsbooks side by side, adds market-based probability analysis, and explains each pick with a short AI-generated breakdown — so you can see the full picture before deciding anything.

It's free, requires no registration, and covers Football, NBA, NFL, Hockey, Tennis, MLB and MMA.

Compare the odds for yourself  https://www.matchsignal.pro

18+ | Gamble responsibly | Informational analysis only, not a guarantee of profit`,
          },
          {
            targetId: "facebook-2",
            enabled: false,
            message: `Behind every set of odds is a model working through match data, statistics, and shifting market conditions. That model is different for every bookmaker — which means the price you're offered isn't the only price out there.

MatchSignal brings odds from multiple sportsbooks together in one place, so you can compare markets instead of manually checking site after site. Each pick also comes with a risk tier, market-average pricing, and a plain-language AI explanation.

No subscription. No registration. Just clearer information before you decide.

Check the current odds  https://www.matchsignal.pro

18+ | Gamble responsibly | Odds can change and no outcome is guaranteed`,
          },
          {
            targetId: "facebook-3",
            enabled: false,
            message: `Most bettors check odds at one bookmaker and stop there. But since every bookmaker calculates its own odds using its own models, the same match can have noticeably different pricing depending on where you look.

MatchSignal was built to close that gap — it compares odds across multiple sportsbooks, evaluates market consensus, and highlights selections where the available price may offer value based on its probability analysis.

Free, AI-assisted, and covering Football, NBA, NFL, Hockey, Tennis, MLB and MMA.

See how your bookmaker's odds compare  https://www.matchsignal.pro

18+ | Gamble responsibly | This is not a guarantee of profit`,
          },
          {
            targetId: "facebook-4",
            enabled: false,
            message: `The odds on your screen are the output of a calculation — stats in, price out. But that calculation isn't universal. Different bookmakers, different models, different odds for the exact same match.

That's the whole reason to compare before you commit. MatchSignal tracks odds from multiple sportsbooks, runs its own market-based probability analysis, and gives you a short AI explanation for every recommended selection, plus a risk tier so you know what you're looking at.

Free to use, no registration required.

Compare odds now  https://www.matchsignal.pro

18+ | Gamble responsibly | For informational purposes only, not betting advice`,
          },
        ],
      },
      youtube: {
        targets: [
          {
            targetId: "youtube-main",
            enabled: false,
            title:
              "How Bookmakers Actually Create Their Odds (And Why You Should Compare Them)",
            description: `Ever wondered what's happening behind the scenes before a bookmaker sets a price? Match stats, player data, and market movements all get processed by complex models — and what comes out is the odds you see.

The problem is, every bookmaker's model is different. That means the same match can have different odds depending on where you check, and most bettors never compare.

MatchSignal is a free, AI-assisted platform that pulls odds from multiple sportsbooks for Football, NBA, NFL, Hockey, Tennis, MLB and MMA, compares them against its own market-based probability analysis, and explains each pick in plain language — so you always know what you're looking at before you decide.

No subscription. No registration. Just clearer odds comparison.

 Link in bio

18+ | Gamble responsibly | MatchSignal provides informational analysis only. Odds can change and no prediction guarantees an outcome or profit.

.
.
#MatchSignal, SportsBetting, Odds, OddsComparison, BettingTips, ValueBetting, BettingAnalysis, AIBetting, SportsAnalytics, BettingStrategy, FootballBetting, NBABetting, BettingCommunity, SmartBetting, BettingGuide, ResponsibleGambling`,
            tags: [],
          },
        ],
      },
    },
  },
  ...loadReadyVideoAssets(),
] satisfies VideoAsset[];
