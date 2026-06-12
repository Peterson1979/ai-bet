import type { Translation } from "./types";

const hu: Partial<Translation> = {
  heroTitle: "MATCH SIGNAL",
  heroSubtitle: "AI-alapú fogadási elemzések",
  heroDesc: "AI által generált sport előrejelzések több sportágra.",
  heroImageAlt: "AI fogadási előrejelzések hero háttér",
  topPicks: "Top tippek",
  premiumOffers: "Prémium ajánlatok",
  premiumOffersDesc: "Ide kerülnek az affiliate bannerek és sportsbook ajánlatok.",
  recommendedSites: "Ajánlott fogadóirodák",
  recommendedSitesDesc: "Ajánlott fogadóirodák és affiliate ajánlatok.",
  noMatches: "Nincs elérhető mérkőzés",
  tbd: "Időpont nincs megadva",
  noExplanation: "Nincs elérhető magyarázat",
  aiTips: "MATCH SIGNAL",
  matchSignal: "MATCH SIGNAL",
  odds: "Szorzó",
  confidence: "Megbízhatóság",
  edge: "Előny",
  risk: "Kockázat",
  ev: "Várható érték (EV)",
  valueBet: "🟢 VALUE BET",
  okBet: "🟡 OK BET",
  riskyBet: "🔴 KOCKÁZATOS",
  positiveEV: "Pozitív várható érték jelzés",
  negativeEV: "Negatív várható érték jelzés",
  showExplanation: "Magyarázat ▼",
  hideExplanation: "Magyarázat ▲",
  viewOdds: "Szorzók megtekintése",
  seoTitle: "MatchSignal – AI Fogadási Tippek",
  seoDescription: "AI által generált fogadási tippek és value bet-ek több sportágra.",
  contactTitle: "Kapcsolat",
  contactSuccess: "Üzenet sikeresen elküldve.",
  contactName: "Neved",
  contactEmail: "Email címed",
  contactMessage: "Üzeneted",
  sending: "Küldés...",
  send: "Üzenet küldése",
  contactError: "Nem sikerült elküldeni az üzenetet",

  sports: {
    topPicks: "Top tippek",
    football: "Foci",
    nba: "NBA",
    nfl: "NFL",
    hockey: "Jégkorong",
    tennis: "Tenisz",
    mlb: "Baseball",
    mma: "MMA",
  },

  system: {
    navHome: "Főoldal",
    navTopPicks: "Top tippek",
    navBetting: "Fogadás",
    navNews: "Hírek",
    navTools: "Eszközök",
    navGlossary: "Fogadási szótár",
  },

  common: {
    rating: "Értékelés",
    visitSite: "Látogass el",
  },

  bettingPage: {
    title: "Legjobb fogadóirodák",
    description: "Ajánlott fogadóirodák a legjobb bónuszokkal és szorzókkal.",
    titleMainPrefix: "Legjobb",
    titleMainHighlight: "Fogadóirodák",
    subtitle: "Válogatott fogadóirodák a legjobb bónuszokkal és megbízhatósággal.",
    recommended: "Ajánlott",
    siteDescription: "Megbízható fogadóiroda versenyképes szorzókkal és gyors kifizetésekkel.",
    claimBonus: "Igényeld az üdvözlő bónuszt",
    visitSite: "Látogass el",
    affiliateTitle: "Affiliate közzététel:",
    affiliateText:
      "Ez az oldal affiliate linkeket tartalmaz. Jutalékot kaphatunk, ha a linkjeinken keresztül regisztrálsz. Ez nem befolyásolja szerkesztői függetlenségünket.",
  },

  sportNews: {
    title: "Sport hírek",
    description: "Legfrissebb sporthírek focitól az NBA-n át a teniszig.",
    titleMain: "Legfrissebb sport hírek",
    subtitle: "Maradj naprakész a legújabb hírekkel minden nagy sportágban.",
    sidebarTitle: "Legjobb fogadóirodák",
  },

  tools: {
    title: "Fogadási eszközök",
    oddsConverter: "Szorzó konverter",
    oddsConverterDesc:
      "Decimális szorzók átváltása törtszámra, amerikaira és valószínűségre.",
    fractional: "Tört",
    american: "Amerikai",
    implied: "Valószínűség %",
    betCalculator: "Fogadás kalkulátor",
    betCalculatorDesc: "Számítsd ki a lehetséges nyereményed és visszatérítésed.",
    stake: "Tét",
    odds: "Szorzó",
    profit: "Nyeremény",
    return: "Teljes visszatérítés",
    bankroll: "Bankroll menedzser",
    kelly: "Kelly kritérium – optimális tétméret az előnyöd alapján.",
    winPercent: "Győzelem % becslés",
    recommendedStake: "Ajánlott tét",
    valueFinder: "Value bet kereső",
    fairOdds: "Saját fair szorzó",
    bookOdds: "Fogadóiroda szorzója",
  },

  footer: {
    betIntelligence: "Fogadási intelligencia rendszer",
    betIntelligenceDesc:
      "Az AI minden tippet megbízhatóság, várható érték és piaci kockázat alapján értékel.",
    valueBet: "VALUE BET",
    valueBetDesc: "Erős pozitív várható érték az AI modell szerint.",
    okBet: "OK BET",
    okBetDesc: "Elfogadható fogadási lehetőség mérsékelt értékkel.",
    riskyBet: "KOCKÁZATOS",
    riskyBetDesc: "Magasabb bizonytalanság vagy alacsonyabb várható fogadási érték.",
    aiEvScore: "AI EV PONTSZÁM",
    aiEvScoreDesc: "AI által számított várható érték pontszám.",
    aiEdge: "AI Előny",
    aiEdgeDesc:
      "A bookmaker által sugallt valószínűség és az AI becslés különbsége.",
    confidence: "Megbízhatóság",
    confidenceDesc:
      "AI megbízhatósági pontszám 0–100-ig statisztikai jelek alapján.",
    impliedProb: "Implied valószínűség",
    impliedProbDesc: "A bookmaker szorzóiból levezetett valószínűség.",
    risk: "Kockázat",
    riskDesc: "Az előrejelzések volatilitási és bizonytalansági szintje.",
    aiBettingInsights: "MatchSignal Fogadási Elemzések",
    aiBettingInsightsDesc:
      "Ez a platform kizárólag tájékoztató jelleggel nyújt AI-alapú sportfogadási elemzéseket. Nyeremény nem garantált. Felelősségteljesen játssz.",
    navAbout: "Rólunk",
    navContact: "Kapcsolat",
    navPrivacy: "Adatvédelem",
    navTerms: "Felhasználási feltételek",
    navAffiliate: "Affiliate közzététel",
    navResponsible: "Felelős játék",
    navCookie: "Cookie szabályzat",
    platformName: "MatchSignal",
    builtWithAi: "AI segítségével készült",

    // 👇 A glossary MOST a footer BELSEJÉBE került 👇
    glossary: {
      pageTitle: "Fogadási piacok magyarázata",
      pageSubtitle: "Minden, amit tudnod kell a MatchSignal fogadási piacairól.",
      learnMore: "Fogadási piacok ismertetője →",
      tooltipLearnMore: "Bővebben",
      markets: {
        doubleChance: {
          term: "Dupla esély",
          definition:
            "Olyan fogadás, amely két lehetséges kimenetelt fed le egyszerre. Például Hazai győzelem vagy Döntetlen. Ez növeli a nyerési esélyt, de általában alacsonyabb szorzóval jár.",
        },
        drawNoBet: {
          term: "Draw No Bet",
          definition: "Nyersz, ha a választott csapat győz. Ha döntetlen lesz, a téted visszajár.",
        },
        homeWin: {
          term: "Hazai győzelem",
          definition: "Fogadás arra, hogy a hazai csapat nyeri a mérkőzést rendes játékidőben.",
        },
        awayWin: {
          term: "Vendég győzelem",
          definition: "Fogadás arra, hogy a vendégcsapat nyeri a mérkőzést rendes játékidőben.",
        },
        matchWinner: {
          term: "Meccs győztese",
          definition: "Fogadás arra, hogy melyik játékos vagy csapat nyeri a mérkőzést.",
        },
        moneyline: {
          term: "Moneyline",
          definition:
            "Egyszerű fogadás arra, hogy melyik csapat, játékos vagy harcos nyeri az eseményt. Nincsenek szórásfogadások vagy handicapek.",
        },
        over15: {
          term: "Több mint 1,5 gól",
          definition: "A mérkőzésen legalább 2 gólnak kell esnie.",
        },
        under45: {
          term: "Kevesebb mint 4,5 gól",
          definition: "A mérkőzésen legfeljebb 4 gól eshet.",
        },
        over45: {
          term: "Több mint 4,5 gól",
          definition: "A mérkőzésen legalább 5 gólnak kell esnie.",
        },
        under75: {
          term: "Kevesebb mint 7,5 gól",
          definition: "A mérkőzésen legfeljebb 7 gól eshet.",
        },
        over185Games: {
          term: "Több mint 18,5 game",
          definition: "Teniszben legalább 19 game-et kell lejátszani a mérkőzésen.",
        },
        under305Games: {
          term: "Kevesebb mint 30,5 game",
          definition: "Teniszben legfeljebb 30 game játszható le.",
        },
        playerToWinSet: {
          term: "Játékos nyeri a szettet",
          definition:
            "A választott játékosnak legalább egy szettet kell nyernie a mérkőzésen, függetlenül a végeredménytől.",
        },
        handicapGames: {
          term: "Handicap games (+3,5)",
          definition:
            "A választott játékos virtuálisan +3,5 game előnnyel kezd. A handicap alkalmazása után több game-jük kell legyen, mint az ellenfélnek.",
        },
        over1495Points: {
          term: "Több mint 149,5 pont",
          definition:
            "A két csapat együttes pontszámának legalább 150-nek kell lennie.",
        },
        under1795Points: {
          term: "Kevesebb mint 179,5 pont",
          definition:
            "A két csapat együttes pontszáma legfeljebb 179 lehet.",
        },
        over335Points: {
          term: "Több mint 33,5 pont",
          definition:
            "A két csapat együttes pontszámának legalább 34-nek kell lennie.",
        },
        under545Points: {
          term: "Kevesebb mint 54,5 pont",
          definition:
            "A két csapat együttes pontszáma legfeljebb 54 lehet.",
        },
        over75Runs: {
          term: "Több mint 7,5 futás",
          definition:
            "Baseballban legalább 8 futást kell elérni összesen.",
        },
        under95Runs: {
          term: "Kevesebb mint 9,5 futás",
          definition:
            "Baseballban legfeljebb 9 futás érhető el összesen.",
        },
        teamTotalOver: {
          term: "Csapat total – több",
          definition:
            "A választott csapatnak a megadott határnál többet kell szereznie.",
        },
        teamTotalUnder: {
          term: "Csapat total – kevesebb",
          definition:
            "A választott csapatnak a megadott határnál kevesebbet kell szereznie.",
        },
        teamTotalOver15: {
          term: "Csapat total több mint 1,5",
          definition: "A választott csapatnak legalább 2 gólt kell szereznie.",
        },
        runLine: {
          term: "Run Line (-1,5)",
          definition:
            "A választott csapatnak legalább 2 futással kell nyernie.",
        },
        methodOfVictory: {
          term: "Győzelem módja",
          definition:
            "Fogadás arra, hogyan nyer a harcos: KO/TKO vagy pontozás alapján.",
        },
        over25Rounds: {
          term: "Több mint 2,5 menet",
          definition:
            "A küzdelemnek a 3. menetbe kell nyúlnia.",
        },
        under25Rounds: {
          term: "Kevesebb mint 2,5 menet",
          definition:
            "A küzdelemnek a 3. menet feléig kell véget érnie.",
        },
      },
      quickNote: {
        title: "Gyors összefoglaló",
        text:
          "Az Over/Under piacok a mérkőzésen esett események számát jelzik előre, míg a Moneyline a győztest. A Handicap piacok virtuális előnyt adnak.",
      },
    }, // 👇 A glossary lezárása
  }, // 👇 A footer MOST záródik le
};

export default hu;