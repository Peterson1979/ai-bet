import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "how-betting-odds-work",
  locale: "hu",
  title: "Hogyan működnek a fogadási oddsok",
  category: "odds-probability",
  status: "published",
  description:
    "Tudja meg, mit jelentenek a fogadási oddsok, hogyan kapcsolódnak a valószínűséghez, miért tartalmaznak a könyvelők árai egy maradékot, és hogyan hasonlíthatja össze az oddsokat anélkül, hogy a árat a jóslattal összekeverné.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A fogadási oddsok árak. Megmondják, mennyit téríthet vissza egy sikeres fogadás, de a piac nézeteit is kódolják arra, hogy egy kimenetel mennyire valószínű. Mindkét oldal megértése alapvető: az oddsok nem garancia, és a legkisebb ár nem automatikusan a legjobb fogadás. Ez a útmutató elmagyarázza a tizedes oddsokat, a feltüntetett valószínűséget, a könyvelő maradékát, a piac mozgását, és miért fontos az árak összehasonlítása.",
  keyTakeaways: [
    "A tizedes oddsok a tét egységre jutó teljes visszatérítést mutatják, beleértve az eredeti tétet.",
    "A feltüntetett valószínűség a tizedes oddsokból úgy számítható ki, hogy az oddsokra 1-et osztunk.",
    "A könyvelő árak általában tartalmaznak maradékot, így a feltüntetett valószínűségek összesen több mint 100%-ot jelenthetnek.",
    "A rövidebb ár magasabb feltüntetett valószínűséget jelent, nem pedig biztos kimenetelt.",
    "Azonos választás különböző oddsokkal szerepelhet különböző fogadóirodákban, így az ár összehasonlítása közvetlenül befolyásolja a potenciális visszatérítést.",
    "Az oddsok mozoghatnak, amikor új információk, a piac tevékenysége és a könyvelő kockázatkezelése megváltoztatja az árat.",
  ],
  sections: [
    {
      id: "odds-are-prices",
      heading: "A fogadási oddsok árak, nem jóslatok",
      paragraphs: [
        "A fogadási oddsok legegyszerűbb megértése az, ha azokat egy lehetséges kimenetel áraként kezeljük. Egy labdarúgó mérkőzésen a könyvelő egy árat adhat a hazai csapatra, egy másik a döntetlenre, és egy másik a vendég csapatra. Ezek az árak határozzák meg a visszatérítést, ha a kiválasztott kimenetel nyer.",
        "Az oddsok tartalmazzák a valószínűség információját is. Az alacsony tizedes ár magasabb feltüntetett valószínűséggel jár, míg a magasabb ár alacsonyabb feltüntetett valószínűséggel. Ez nem jelenti azt, hogy a könyvelő tudja, mi fog történni. Ez azt jelenti, hogy a piac különböző árakat rendel a bizonytalan kimenetelekre.",
        "Ez a különbség azért fontos, mert a jóslat és az ár különböző kérdéseket tesz fel. A jóslat azt kérdezi, melyik kimenetel valószínűbb. Az ár azt kérdezi, milyen visszatérítést kínál a kockázat vállalásáért. Egy csapat lehet a legvalószínűbb győztes, és mégis kevésbé vonzó egy elég rövid ár mellett."
      ],
      callout: {
        title: "Alapötlet",
        body:
          "Egy erős kedvező is mégis elveszíthet. Az oddsok a bizonytalanság piacárát fejezik ki; nem távolítják el a bizonytalanságot.",
        tone: "info",
      },
    },
    {
      id: "decimal-odds",
      heading: "Hogyan működnek a tizedes oddsok",
      paragraphs: [
        "A MatchSignal tizedes oddsokat használ, mert ezek teszik egyszerűvé a visszatérítések és a valószínűség konverzióját. A tizedes oddsok megmutatják a tét egységre jutó teljes visszatérítést, ha a fogadás nyer. A teljes visszatérítés tartalmazza az eredeti tétet.",
        "Például 2,00 tizedes oddsnál egy 10 egység tét 20 egységet térít vissza siker esetén: 10 egység nyereség plusz az eredeti 10 egység tét. 1,50 oddsnál ugyanaz a 10 egység tét 15 egységet ad összesen. 3,00 oddsnál 30 egységet ad vissza.",
        "Az alapvető kapcsolat egyszerű: a teljes visszatérítés egyenlő a tét szorozva a tizedes oddsokkal. A nyereség a teljes visszatérítés mínusz az eredeti tét."
      ],
      bullets: [
        "10 egység 1,50 → 15 egység teljes visszatérítés, 5 egység nyereség.",
        "10 egység 2,00 → 20 egység teljes visszatérítés, 10 egység nyereség.",
        "10 egység 3,00 → 30 egység teljes visszatérítés, 20 egység nyereség.",
      ],
      callout: {
        title: "Példa",
        body:
          "Magas oddsok növelik a potenciális visszatérítést, de általában olyan kimeneteleket jelentenek, amelyeket a piac kevésbé valószínűnek tart.",
        tone: "example",
      },
    },
    {
      id: "implied-probability",
      heading: "Oddsok átalakítása feltüntetett valószínűségre",
      paragraphs: [
        "A tizedes oddsokat egyszerű képlettel lehet átalakítani feltüntetett valószínűségre: feltüntetett valószínűség = 1 ÷ tizedes odds. Az eredményt szorozza 100-zal, hogy százalékban fejezze ki.",
        "2,00 odds 50%-t jelent. 1,50 odds körülbelül 66,7%-t jelent. 4,00 odds 25%-t jelent. Ez egy közös valószínűségskálát ad az árak összehasonlításához, amelyek elsőre nagyon különbözőnek tűnhetnek.",
        "Azonban a könyvelő feltüntetett valószínűsége nem ugyanaz, mint egy pontos objektív valószínűség. Az ár tartalmazhat könyvelő maradékot, reagálhat a piaci keresletre, vagy változhat, ahogy információk állnak rendelkezésre. Jobban értelmezhető a megadott árba ágyazott valószínűségként."
      ],
      bullets: [
        "1,50 → 1 ÷ 1,50 = 66,7%",
        "2,00 → 1 ÷ 2,00 = 50,0%",
        "2.50 → 1 ÷ 2.50 = 40,0%",
        "4.00 → 1 ÷ 4,00 = 25,0%",
      ],
      callout: {
        title: "Ne értelmezd a 66,7%-t biztosságnak",
        body:
          "Az implicit valószínűség egy ár fordítása. A valóságban a sportesemények kimenetele bizonytalan, még akkor is, ha a piac magas valószínűséget rendel hozzá.",
        tone: "warning",
      },
    },
    {
      id: "bookmaker-margin",
      heading: "Miért lehetnek a valószínűségek összeadva több mint 100%",
      paragraphs: [
        "Ha minden kimenetet átalakítasz egy fogadóirodai piacon implicit valószínűségre, és összeadod őket, a teljes összeg gyakran meghaladja a 100%-ot. A 100%-nál felesleges összeg a fogadóirodai maradék vagy a túlcsordulás (overround) néven ismert.",
        "Vegyünk egy egyszerű, két kimenetű piacot, ahol mindkét oldal ára 1,91. Minden ár körülbelül 52,36%-t jelent. Összeadva a piac körülbelül 104,72%-ot tesz ki. A 104,72% és a 100% közötti különbség a túlcsordulást jelenti ebben a leegyszerűsített piacon.",
        "A maradék azt jelenti, hogy a nyers implicit valószínűségek nem automatikusan igazságos valószínűségek. Elemzők becslést készíthetnek egy maradékmentes valószínűségre a piac valószínűségeinek normalizálásával, de ez továbbra is egy becslés a rendelkezésre álló árak alapján, nem pedig a tényleges esélyek garantálása."
      ],
      callout: {
        title: "Miért fontos ez",
        body:
          "Két piac hasonló elvárásokat fejezhet ki, miközben különböző maradékot kínál. Az alacsonyabb maradékú piac általában versenyképesebb árat kínál a fogadók számára, minden egyéb tényező egyenlő feltételezése mellett.",
        tone: "info",
      },
    },
    {
      id: "favorite-underdog",
      heading: "Kedvencek, gyengédek és mit mond a valódi ár",
      paragraphs: [
        "A kedvenc egyszerűen az a kimenet, amelynek a legkisebb ára van a releváns piacon. A gyengédnek hosszabb ára van. Ezek a címkék a piaci elvárások relatív leírását jelentik, nem garantált minőséget vagy végső eredményt.",
        "Tegyük fel, hogy a A csapatot 1,40, a B csapatot 7,00 áron kínálják egy olyan piacon, amelyben a döntetlen is szerepel. A A csapat a kedvenc, mert ára sokkal magasabb valószínűséget jelez, mint a B csapat ára. De hogy egy ár vonzó-e, attól függ, hogy a megadott esélyek hogyan viszonyulnak egy ésszerű valószínűségbecsléshez.",
        "Itt a értékbecslés és a győztes kiválasztása különbözik. A legvalószínűbb győztes csapat kiválasztása nem feltétlenül azonos a legelőnyösebb ár megtalálásával. Egy 75%-os esély 80%-os break-even arányt igénylő odds mellett nem jelentené pozitív várható értéket a becslés alapján."
      ],
    },
    {
      id: "compare-odds",
      heading: "Miért fontos az oddsok összehasonlítása",
      paragraphs: [
        "A fogadóirodák nem mindig kínálnak azonos árakat. Egy üzemeltető 1,85-öt, míg egy másik 1,95-öt adhat ugyanarra a választásra és piacra. Az alapvető esemény nem változott, de a potenciális visszatérítésed igen.",
        "100 egységre szóló tét esetén a 1,85 185 egységet hoz, ha sikeres, míg a 1,95 195 egységet. Nagy számú fogadás során a rosszabb árak ismételt elfogadása jelentősen csökkentheti a hozamot, még akkor is, ha a választások önmagukban azonosak.",
        "Az ár összehasonlítása ezért az egyetlen olyan fogadási aspektus, amely nem igényel a mérkőzés pontosabb előrejelzését. Ha a piac, a választás, a kiegyenlítési szabályok és az időzítés valóban összehasonlítható, a magasabb elérhető ár jobb potenciális hozamot jelent ugyanazon tétre."
      ],
      callout: {
        title: "Hasonló dolgok összehasonlítása",
        body:
          "Győződj meg arról, hogy a piacdefiníció, a vonal, a kiegyenlítési szabályok és az esemény ugyanaz, mielőtt két idézett odds-t közvetlenül összehasonlítanál.",
        tone: "warning",
      },
    },
    {
      id: "why-odds-move",
      heading: "Miért mozognak az oddsok egy mérkőzés előtt",
      paragraphs: [
        "Az oddsok nem rögzített értékelések. A piac megnyitása és a fogadás lezárása közötti időszakban változhatnak. Új csapattárgyi információk, sérülések, megerősített felállások, időjárás, ütemezési változások, piaci aktivitás és a szélesebb árképzés mind hozzájárulhatnak a mozgáshoz.",
        "A fogadóirodák a kockázatkezelés részeként vagy a piac más részein bekövetkező mozgásra adott válaszként is módosíthatják az árakat. Ennek eredményeként egy odds mozgás nem feltétlenül egyetlen egyszerű okot tár fel. Egy rövidülő ár jelenthet jelentős új információt, piaci nyomást vagy ezek kombinációját.",
        "Ezért a történelmi képernyőképek nem szabad összekeverni a jelenlegi elérhetőséggel. Egy hasznos elemzésnek az aktuálisan értékelendő tényleges árat kell azonosítania, és ahol lehetséges, össze kell hasonlítania a jelenlegi piaci alternatívákkal."
      ],
    },
    {
      id: "value-and-break-even",
      heading: "Odds, break-even valószínűség és érték",
      paragraphs: [
        "Minden ár break-even valószínűséget jelent a tranzakciós részletek vagy a modell bizonytalansága előtt. 2,00-as decimális oddsnál a break-even arány 50%. 1,80-asnál körülbelül 55,6%. 2,50-önél 40%.",
        "Ha a valószínűségbecslésed jelentősen magasabb, mint a kínált ár által sugallt valószínűség, a fogadás pozitív várható értékkel bírhat a becslés alapján. Ha a becslésed alacsonyabb, az ár kedvezőtlen lehet. A következtetés minősége teljesen a valószínűségbecslés minőségétől és kalibrációjától függ.",
        "Például, ha a 2,20-as odds körülbelül 45,5%-t jelent, és egy elemzés 50%-ra becsüli a kimenetet, akkor elméleti pozitív különbség van a becsült valószínűség és a piac által sugallt valószínűség között. Ez a különbség nem garancia a nyereségre. Még egy helyesen azonosított pozitív várható értékű lehetőség is veszteséghez vezethet, és a modellbecslések hibásak lehetnek."
      ],
      callout: {
        title: "Az érték valószínűségi",
        body:
          "A pozitív várható érték egy becsült hosszú távú kapcsolatot ír le a valószínűség és az ár között. Ez nem jelenti azt, hogy egy egyedi fogadás biztosan nyer.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal-context",
      heading: "Hogyan használja a MatchSignal az esélyeket",
      paragraphs: [
        "A MatchSignal összehasonlítja a rendelkezésre álló fogadóirodai árakat és a piaci adatokat, majd ezeket az információkat mesterséges intelligencia által generált mérkőzési kontextussal kombinálja. Egy MatchSignal kártyán a Legjobb Esélyek a legerősebb elérhető partnerárat jelöli a megjelenített választásra, míg a Piaci Átlag a mintavételezett piaci árak összegzését tükrözi, amelyeket a összehasonlítás során használtak.",
        "A Fair Probability egy analitikai becslés, nem pedig fogadóirodai idézet. A Value Edge a kínált piaci ár és a MatchSignal valószínűségen alapuló értékelése közötti különbséget írja le. A Books Sampled jelzi, hány fogadóirodai forrás járult hozzá a releváns piaci mintához.",
        "Ezek a mezők arra szolgálnak, hogy a árazási kontextus könnyebben ellenőrizhető legyen. Nem szabad garanciának, pénzügyi tanácsnak vagy sporteredményre vonatkozó bizonyosságnak tekinteni őket. A modellfeltevések, piaci változások, adatminőség és a szokásos sporti variancia mind befolyásolhatják az eredményt."
      ],
    },
    {
      id: "practical-checklist",
      heading: "Gyakorlati ellenőrzőlista bármely fogadási piac olvasásához",
      paragraphs: [
        "Amikor megnyit egy fogadási piacot, szétválasztja az elemzést az ár, a valószínűség és a bizonytalanság szempontjából. Ez megakadályozza több gyakori hibát, például azt, hogy feltételezze, a kedvezőnek meg kell nyernie, vagy hogy egy magas potenciális kifizetést bizonyítékként használjon arra, hogy egy fogadás vonzó."
      ],
      bullets: [
        "Azonosítsd a pontos piacot és választást.",
        "Olvassa a tizedes esélyeket árként, és számítsa ki a sugallt valószínűséget.",
        "Ellenőrizze, hogy a piac tartalmaz-e fogadóirodai maradékot.",
        "Hasonlítsa össze ugyanazt a választást több fogadóirodában, ahol elérhető.",
        "Válassza el a valószínűségbecslését a fogadóiroda idézett valószínűségétől.",
        "Ne tekintse az esélymozgást bizonyítéknak, hogy az egyik oldal nyerni fog.",
        "Vegye figyelembe a bizonytalanságot, a varianciát és a tétméretet, mielőtt döntést hozna."
      ],
    },
  ],
  relatedGuides: [
    "implied-probability",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "expected-value-sports-betting"
  ],
  responsibleGamblingNote:
    "A fogadás pénzügyi kockázatot jelent, és az eredmények bizonytalanok. Az esélyek és a valószínűségbecslések nem garantálják az eredményt. Használjon olyan tétet, amelyet megengedhet elveszíteni, kerülje a veszteségek üldözését, és tekintse a fogadási elemzést információnak, nem pedig nyereség ígéretének.",
};

export default guide;
