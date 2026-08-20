import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "matchsignal-value-edge",
  locale: "hu",
  title: "Hogyan számítja ki a MatchSignal a Value Edge-et",
  category: "value-analysis",
  status: "published",
  description:
    "Tudja meg, hogyan számítja ki és értelmezi a MatchSignal a Value Edge-et, hogyan kombinálódik a Fair Probability és a kínált tizedes odds becsült értékké, miért tér el a Value Edge a valószínűségpontú valueDiff-től, és miért nem garantál a pozitív jelzés a nyereség.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A MatchSignal Value Edge célja, hogy megmutassa, mennyire kedvező egy elérhető ár a platform valószínűség-alapú értékeléséhez képest. A MatchCard-on a Value Edge a becsült érték százalékos arányát (estimatedValuePct) jelenti. Amikor a MatchSignal rendelkezik Fair Probability-val és elérhető partnerárval, a matematikai kapcsolat ugyanaz, mint a várható érték képlete, amelyet a fogadási elemzés során használnak: a becsült érték százalékos aránya egyenlő a Fair Probability decimális értékével szorozva a kínált tizedes odds-szal, mínusz egy, majd szorozva 100-zal. A gyártási csővezeték elfogadhat egy explicit AI által generált estimatedValuePct-et, ha az a mező a elemző réteg által visszaadott; egyébként visszatér a Fair Probability és a partner odds alapján történő érték számításához. Ezáltal a Value Edge egy modell- és árjelzés, nem pedig a következő mérkőzés eredményére vonatkozó ígéret.",
  keyTakeaways: [
    "A MatchCard Value Edge megjelenítése az estimatedValuePct mezőt használja.",
    "A valószínűség és ár útvonala: ((Fair Probability / 100) × kínált tizedes odds − 1) × 100.",
    "Egy pozitív Value Edge azt jelenti, hogy az ár kedvező a MatchSignal által használt Fair Probability becsléshez képest.",
    "A null Value Edge azt jelenti, hogy a kínált odds körülbelül megegyezik a Fair Probability által sugallt break-even árral.",
    "Egy negatív Value Edge azt jelenti, hogy a kínált ár rövidebb, mint a valószínűség becslése a break-evenhez szükséges.",
    "A MatchSignal valueDiff egy másik mutató: ez egy valószínűségpontú szakadék, nem ugyanaz, mint a becsült visszatérési százalék.",
    "A napi elemző csővezeték megőrizheti az explicit AI által becsült estimatedValuePct-et; ha hiányzik, a MatchSignal kiszámíthatja az értéket a Fair Probability és a partner odds alapján.",
    "Egy pozitív Value Edge egy analitikai becslés, és nem garantál nyerő fogadást vagy valós profitot.",
  ],
  sections: [
    {
      id: "what-value-edge-is",
      heading: "Mi a MatchSignal értelmezése a Value Edge-re",
      paragraphs: [
        "Egy MatchSignal MatchCard-on a Value Edge címke a felhasználó számára bemutatott estimatedValuePct. A szám célja, hogy leírja a MatchSignal Fair Probability-jának és a kiválasztáshoz elérhető árnak a kapcsolatát.",
        "Az alapvető kérdés nem csupán, hogy a MatchSignal szerint egy kimenetel valószínű-e. A kérdés az, hogy a kínált odds elég magas-e a valószínűség becsléséhez képest.",
        "Ez a különbség azért fontos, mert ugyanaz a jóslat vonzó lehet egy áron, de nem vonzó másik áron. Egy 55%-os becslés nem automatikusan értékes. 2,00 odds esetén pozitív elméleti értékkel rendelkezik; 1,70 odds esetén nem.",
        "Ezért a Value Edge a pricing réteghez tartozik az elemzésben. Összevon egy valószínűségszűrést a piacon megfigyelhető árral."
      ],
      callout: {
        title: "A Value Edge egy ár- és valószínűség mutató",
        body:
          "Nem szabad úgy értelmezni, mint a MatchSignal azt mondja, hogy egy csapat biztosan nyer. Ugyanaz a kiválasztás különböző Value Edge-t mutathat különböző odds-szal.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "A Core Value Edge Formula",
      paragraphs: [
        "Amikor a MatchSignal a Fair Probability és a kínált odds alapján becsült értéket számít, a képlet: Value Edge % = ((Fair Probability / 100) × Kínált Tizedes Odds − 1) × 100.",
        "Ez a standard várható visszatérési kapcsolat egy egyszerű nyerés vagy veszteség kimenetelre, százalékos formában egy egységre vetítve.",
        "A kód a Fair Probability-t százalékból decimálissá alakítja, megszorozza a kínált tizedes odds-szal, kivon 1-et, majd visszaalakítja százalékos értékké.",
        "Az eredmény egy elméleti kérdésre ad választ: ha a Fair Probability becslés helyes lenne, és ugyanazt a valószínűség-ár kapcsolatot sokszor megismételhetnénk, milyen átlagos visszatérítést jelentene ez a kapcsolat a téthez viszonyítva?"
      ],
      bullets: [
        "Átalakítja a Fair Probability-t százalékból decimálissá.",
        "Megszorozza a kínált tizedes odds-szal.",
        "Kivon 1-et.",
        "Megszorozza 100-zal, hogy százalékos értékké alakítsa.",
      ],
      callout: {
        title: "Képlet",
        body:
          "Value Edge % = ((Fair Probability / 100) × Kínált Odds − 1) × 100.",
        tone: "example",
      },
    },
    {
      id: "worked-example",
      heading: "Egy működő MatchSignal Value Edge példa",
      paragraphs: [
        "Tegyük fel, hogy a MatchSignal 55%-os Fair Probability-t rendel egy választáshoz, és a partner által kínált odds 2,00.",
        "Átalakítjuk a 55%-ot 0,55-re. Szorozzuk meg 0,55-t 2,00-ával, hogy 1,10-et kapjunk. Vonjuk ki 1-et, hogy 0,10 legyen. Szorozzuk meg 100-zal, és az becsült Value Edge +10%.",
        "Most ugyanazt a Fair Probability-t tartjuk, de a kínált árat 1,80-ra változtatjuk. A számítás 0,55 × 1,80 − 1 = −0,01, vagy körülbelül −1%.",
        "Semmi sem változott a Fair Probability-nál. Csak a rendelkezésre álló ár változott. Ezért az ár összehasonlítása jelentősen megváltoztathatja a megjelenített értékviszonyt."
      ],
      bullets: [
        "Fair Probability: 55%.",
        "Kínált odds: 2,00.",
        "Számítás: 0,55 × 2,00 − 1 = 0,10.",
        "Value Edge: +10%.",
        "1,80 odds esetén ugyanazzal a 55% valószínűséggel: körülbelül −1%.",
      ],
    },
    {
      id: "break-even",
      heading: "Value Edge és Break-Even Probability",
      paragraphs: [
        "Ugyanazt a kapcsolatot a break-even probability ismerete is megmutatja. A 2,00-as decimális odds 50% nyerési arányt igényel a break-evenhez, mielőtt a gyakorlati frikciók befolyásolnák. A 1,80-as odds körülbelül 55,56%.",
        "Ha a MatchSignal Fair Probability-ja meghaladja a rendelkezésre álló ár által sugallt break-even probability-t, a számított Value Edge pozitív. Ha a Fair Probability alatta van, a Value Edge negatív.",
        "Ezért egy pozitív Value Edge nem azt jelenti, hogy „a MatchSignal szereti a csapatot”. Jelenti, hogy a valószínűségbecslés elég magas a kínált árhoz képest, hogy pozitív elméleti értéket sugalljon.",
        "Egy választás magas Fair Probability-val is lehet negatív Value Edge-vel, ha a piaci ár túl alacsony."
      ],
      callout: {
        title: "A valószínűség önmagában nem érték",
        body:
          "Az érték csak akkor jelenik meg, ha a valószínűségbecslést összehasonlítjuk a ténylegesen kínált árral.",
        tone: "warning",
      },
    },
    {
      id: "fair-probability",
      heading: "Hol illeszkedik a Fair Probability a számításba",
      paragraphs: [
        "A Fair Probability a valószínűség bemenet, amelyet a value kapcsolatban használnak. A napi előrejelző pipeline-ban egy AI által biztosított Fair Probability közvetlenül használható a numerikus ellenőrzés és korlátozás után.",
        "Ha egy explicit AI Fair Probability nem áll rendelkezésre, a pipeline tartalmaz egy fallback logikát, amely a piaci információkból, például a piaci konszenzustól és a price-hez kapcsolódó implícit valószínűségből származtat egy valószínűségbecslést.",
        "Ez azt jelenti, hogy a Fair Probability nem csupán egy másik címke a egy bookmaker odds-hoz tartozó nyers implícit valószínűségre. Ez egy analitikai bemenet, amelyet a price értékelésére használnak.",
        "Mivel a valószínűségbecslés hibás vagy bizonytalan lehet, a belőle származó Value Edge is hordozza ezt a bizonytalanságot."
      ],
      callout: {
        title: "A valószínűség bemenet fontosabb, mint a decimális pontosság",
        body:
          "Egy tökéletesen kiszámított Value Edge még félrevezető lehet, ha a Fair Probability becslés pontatlan.",
        tone: "warning",
      },
    },
    {
      id: "explicit-ai-value",
      heading: "Miért használhatja a Pipeline egy explicit AI Value becslést",
      paragraphs: [
        "A MatchSignal napi elemző rétege explicit estimatedValuePct-et adhat vissza a Fair Probability és más analitikai mezőkkel együtt.",
        "Ha egy érvényes explicit estimatedValuePct jelen van, a napi pipeline megtartja azt a értéket, helyettük nem helyettesíti automatikusan egy újonnan kiszámított értékkel. Ha az explicit mező hiányzik, a pipeline kiszámítja az értéket a Fair Probability és a partner odds alapján.",
        "Ez fontos a platform technikai értelmezésekor: a Value Edge nem mindig egyetlen kódról származik. Egy normalizált analitikai mező, amely AI-szolgáltatott és matematikai fallback útvonalból származik.",
        "A prompt réteg azt is utasítja, hogy a Fair Probability és a becsült érték esetén konzervatív legyen, és nullát adjon vissza, ha az él nem egyértelmű. Ez a tervezés célja, hogy elkerülje a numerikus bizalom előállítását, ha a rendelkezésre álló bizonyíték nem támasztja alá."
      ],
      callout: {
        title: "Két útvonal, egy megjelenített mező",
        body:
          "A MatchCard a estimatedValuePct-et Value Edge-ként jeleníti meg, függetlenül attól, hogy a valid érték a elemző rétegből vagy a valószínűség-és-odds fallback számításból származik.",
        tone: "info",
      },
    },
    {
      id: "value-diff",
      heading: "A Value Edge nem ugyanaz, mint a valueDiff",
      paragraphs: [
        "A MatchSignal tartalmaz egy valueDiff mezőt is. Ez könnyen összetéveszthető a Value Edge-el, mert mindkettő egy szakadékot ír le a valószínűségértékelés és a piaci ár között.",
        "A két mutató különböző egységeket használ. Az estimatedValuePct egy várható megtérülés típusú százalék, amely a valószínűség és a tizedes odds szorzatán alapul. A valueDiff a Fair Probability és a releváns árhoz kapcsolódó implícit valószínűség közötti százalékpontbeli különbség.",
        "Például, ha a Fair Probability 55 % és a partnerár 50 %-t sugall, a valueDiff +5 százalékpont. 2,00 odds esetén az estimatedValuePct +10 %. Ezek a számok kapcsolódó fogalmakat írnak le, de nem cserélhetők fel.",
        "A MatchCard Value Edge megjelenítése az estimatedValuePct-et használja. Ha a valueDiff-et úgy kezeljük, mintha várható megtérülés lenne, a szám jelentése félreérthető lenne."
      ],
      bullets: [
        "estimatedValuePct: megtérülés típusú érték százalék.",
        "valueDiff: valószínűségpontbeli különbség.",
        "Mindkettő egyszerre lehet pozitív.",
        "Numerikus értékeik nem kell, hogy megegyezzenek.",
      ],
      callout: {
        title: "Ne keverjük össze a százalékokat és a százalékpontokat",
        body:
          "Egy +5 százalékpontos valószínűségszakadék nem ugyanaz a mutató, mint a +5 % becsült megtérülés.",
        tone: "warning",
      },
    },
    {
      id: "best-odds",
      heading: "Miért fontos a Best Odds a Value Edge szempontjából",
      paragraphs: [
        "A value számításban használt ár közvetlenül megváltoztatja az eredményt. Ugyanezen Fair Probability mellett a magasabb egyenértékű tizedes odds nagyobb Value Edge-et eredményez.",
        "Ha a Fair Probability 52 %, a 1,90 odds körülbelül −1,2 % értéket sugall, a 2,00 odds +4 %, a 2,10 odds +9,2 %.",
        "Ezért a MatchSignal a Best Odds-ot a Value Edge mellett mutatja. A leginkább egyenértékű elérhető ár jelentősen javíthatja az értékviszonyt.",
        "Az összehasonlításnak mégis hasonló kell lennie. Egy magasabb ár egy másik hándikál, összeg, kiegyenlítési szabály vagy piac esetén nem érvényes helyettesítés a megjelenített kiválasztáshoz."
      ],
      bullets: [
        "52 % a 1,90-on → körülbelül −1,2 %.",
        "52 % a 2,00-on → körülbelül +4,0 %.",
        "52 % a 2,10-on → körülbelül +9,2 %.",
      ],
    },
    {
      id: "market-average",
      heading: "Hogyan adja a Market Avg és a Books Sampled kontextust",
      paragraphs: [
        "A Value Edge a leginkább hasznos, ha a MatchCard többi mezőjével együtt nézzük, nem izoláltan.",
        "A Market Avg a mintavételezett fogadóirodai árakat összefoglalja, segít megmutatni, hogy a megjelenített ajánlat eltér-e a szélesebb piaci áltól. A Books Sampled a releváns piaci mintába járuló fogadóiroda források számát adja meg.",
        "Egy erősebb partnerár a mintavételezett piachoz képest javíthatja a felhasználó elérhető gazdasági helyzetét, de a mintavételezett könyvek száma önmagában nem bizonyítja, hogy a Fair Probability helyes.",
        "Ezek a mezők piaci kontextust írnak le. Nem távolítják el a modellhibát, a fogadóiroda maradékát, a régi árakat vagy a szokásos sportvarianciát."
      ],
    },
    {
      id: "fair-odds",
      heading: "A Fair Odds a Fair Probability árverziója",
      paragraphs: [
        "A MatchSignal képes a Fair Probability-t Fair Odds-sá konvertálni. Elméletileg a tiszta tizedes odds egyet osztva a Fair Probability-t tizedes formában kifejezve.",
        "Egy 50 % Fair Probability 2,00 tiszta odds-ot jelent. Egy 40 % Fair Probability 2,50-öt, egy 60 % Fair Probability körülbelül 1,67-et.",
        "Ez egy másik módot ad a Value Edge kapcsolat olvasására. Ha a kínált odds jelentősen magasabb, mint a fair odds, amelyet az analitikus valószínűség sugall, az ár pozitív becsült értéket jelenthet.",
        "Ha a kínált odds alacsonyabb, mint a fair odds, az ár több valószínűséget követel meg, mint amit a becslés támogat."
      ],
      bullets: [
        "50 % Fair Probability → 2,00 Fair Odds.",
        "40% → 2,50.",
        "60% → körülbelül 1,67.",
      ],
    },
    {
      id: "positive-zero-negative",
      heading: "Hogyan olvassuk a pozitív, null és negatív értékhatár értékeit",
      paragraphs: [
        "Egy pozitív értékhatár azt jelenti, hogy a valószínűség és ár közötti kapcsolat egy elméleti megtérülést jelez nullánál magasabb értéken a használt valószínűség becslés alapján.",
        "Egy nullához közel álló értékhatár azt jelenti, hogy a kínált ár közel van a Fair Probability által sugallt megtérülési ágra.",
        "Egy negatív értékhatár azt jelenti, hogy a jelenlegi kínált ár rövidebb, mint amit a valószínűség becslés támogat.",
        "A jelző hasznos, de a nagyságrend nem tekinthető biztosnak. Egy +6% jelzés eltűnhet, ha a Fair Probability túlméretezték vagy ha a rendelkezésre álló odds rövidül."
      ],
      callout: {
        title: "Az értékhatár eltűnhet",
        body:
          "Az értékhatár időérzékeny, mert az odds-ok mozognak, és modellérzékeny, mert a Fair Probability egy becslés.",
        tone: "warning",
      },
    },
    {
      id: "rounding",
      heading: "Kerekítés és megjelenítési pontosság",
      paragraphs: [
        "Az érték számítása normalizált a megjelenítési pontosságra, nem végtelen tizedesjegyre. Ez megőrzi a MatchCards olvashatóságát és elkerüli, hogy a felületnél több pontosságot jelezzen, mint amennyit használhat.",
        "A felhasználóknak nem szabad egy tizedes vagy század százalékpontot értelmezniük magasabb előrejelzési pontosság jelentős garanciájaként.",
        "Amikor a Fair Probability körüli alapvető bizonytalanság több százalékpont, egy apró különbség az értékhatár megjelenítésében gazdaságilag kevésbé fontos lehet, mint maga a modell bizonytalansága."
      ],
    },
    {
      id: "ranking",
      heading: "Az értékhatár másként is szolgál minőségi jelzőként",
      paragraphs: [
        "A MatchSignal belsejében az estimatedValuePct nemcsak a felhasználónak jelenik meg. A rangsorolási logika a value számot más információkkal, mint a Fair Probability, a fogadóiroda lefedettsége, a spread, a konszenzus és a Risk Tier, együtt értékeli.",
        "Ez megakadályozza, hogy a platform egy nyers értéket csak a minőségi kritériumnak tekintsen. Egy nagy látszólagos előny egy vékony vagy ellentmondásos piacon több óvatosságot igényel, mint egy hasonló méretű előny, amelyet szélesebb piaci kontextus támogat.",
        "A pontos minőségi döntés ezért több tényezőből áll, annak ellenére, hogy az értékhatár számítása önmagában egy világos valószínűség-ár értelmezést kínál."
      ],
      callout: {
        title: "Az értékhatár egy jelzés, nem a teljes rangsorolás",
        body:
          "A MatchSignal a piaci mélységet, a valószínűség kontextust, a spreadet és a kockázatot is figyelembe veszi, nem csupán a legnagyobb megjelenített határ alapján rangsorol.",
        tone: "info",
      },
    },
    {
      id: "not-guarantee",
      heading: "Miért nem garantál profitot egy pozitív értékhatár",
      paragraphs: [
        "A képlet a becsült valószínűség alapján leírja a várható értéket. Nem határozza meg, mi történik egyetlen sporteseményben.",
        "Egy +8% értékhatár azonnal elveszhet. Egy negatív értékű választás nyerhet. A különbség csak akkor válik jelentőssé, ha többszörös döntéshozatal során, elég pontos valószínűség becsléssel, része a folyamatnak.",
        "A modellhiba más kockázati forrás. Ha a MatchSignal 55%-os valószínűséggel becsül egy kimenetet, de a valós esély alacsonyabb, a megjelenített határ túlszólíthat.",
        "A piaci mozgás is számít. Ha a pozitív határhoz vezető odds már nem elérhető, az értéket a jelenlegi ár alapján kell újraszámolni."
      ],
      callout: {
        title: "Az értékhatár nem profit előrejelzés",
        body:
          "Ez egy modellalapú becslés a árminőségre bizonytalanság mellett, nem ígéret a következő fogadásra vagy a jövőbeni bankroll növekedésére.",
        tone: "warning",
      },
    },
    {
      id: "example-sensitivity",
      heading: "Érzékenység: kis valószínűségváltozások is számítanak",
      paragraphs: [
        "Tegyük fel, hogy az ajánlott odds 2,10. 50% Fair Probability esetén az értékhatár +5%. 48% esetén körülbelül +0,8%. 47% esetén körülbelül -1,3%.",
        "Csak három százalékpontos változás a valószínűség becslésében mozgatja ugyanazt az árat egy pozitív jelzésről negatívra.",
        "Ez bemutatja, miért kell a modell bizonytalanságát is figyelembe venni a fő értékhatáron kívül. Minél kisebb az előny, annál könnyebb, hogy a normál becslési hiba megfordítsa a következtetést.",
        "A gyakorlati értelmezéshez a felhasználónak nemcsak azt kell megkérdeznie, hogy „Mi a Value Edge?”, hanem azt is, hogy „Mennyire erős ez az előny, ha a Fair Probability kissé hibás?"
      ],
      bullets: [
        "Odds 2.10, Fair Probability 50% → +5.0%.",
        "Odds 2.10, Fair Probability 48% → körülbelül +0.8%.",
        "Odds 2.10, Fair Probability 47% → körülbelül −1.3%.",
      ],
    },
    {
      id: "checklist",
      heading: "Hogyan olvassuk a MatchSignal Value Edge-et",
      paragraphs: [
        "A Value Edge-et a MatchCard többi részével együtt kell értelmezni, figyelembe véve a valószínűségszámítás korlátait."
      ],
      bullets: [
        "Erősítse meg a pontos piacot és választást.",
        "A Fair Probability-t becslésként, nem biztosítékként értelmezze.",
        "Ellenőrizze a jelenleg megjelenített Best Odds értékeket.",
        "Használja a valószínűség és árfolyam kapcsolatát a Value Edge megértéséhez.",
        "Ne keverje össze a Value Edge-et a valueDiff valószínűségpont-eltéréssel.",
        "Vizsgálja meg a Market Avg és a Books Sampled értékeket a piac kontextusának megértéséhez.",
        "Ne feledje, hogy az odds-ok változhatnak a kártya generálása után.",
        "Kis előnyöket óvatosan kezeljen, ha a valószínűség bizonytalansága magas.",
        "Ne használja a nagyobb Value Edge-et automatikus tétméret-rejtelmi tanácsként.",
        "Ne értelmezze a pozitív Value Edge-et garantált nyerési eredményként.",
      ],
    },
  ],
  relatedGuides: [
    "expected-value-sports-betting",
    "implied-probability",
    "how-to-compare-betting-odds",
    "bookmaker-margin-overround",
    "why-betting-odds-move",
    "ai-sports-betting-predictions",
  ],
  responsibleGamblingNote:
    "A MatchSignal Value Edge egy analitikai becslés, amely a valószínűség és az árfolyam alapján készül, nem garancia a profitra vagy a tét növelésére. A valószínűségbecslések hibásak lehetnek, az odds-ok mozoghatnak, és minden fogadás elveszhet. Tartsa a tétet előre meghatározott határokon belül, csak olyan összegeket fogadjon, amelyeket megengedhet elveszíteni, és soha ne üldözze a veszteségeket.",
};

export default guide;
