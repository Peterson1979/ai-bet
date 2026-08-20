import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "expected-value-sports-betting",
  locale: "hu",
  title: "Sportfogadási várható érték magyarázata",
  category: "value-analysis",
  status: "published",
  description:
    "Értsd meg a sportfogadási várható értéket, hogyan kombinálódik a valószínűség és az ár, hogy pozitív vagy negatív EV-t hozzon létre, miért nem garantál egy pozitív élőszám nyerést, és hogyan értékelheted a értéket alaposabban.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A várható érték, általában EV-ként rövidítve, egy módja annak, hogy leírjuk egy döntés elméleti átlagos kimenetelét, amikor ugyanazt a döntést sokszor ismételjük. A sportfogadásban az EV két dolgot kapcsol össze: a becslésed arról, hogy milyen gyakran kellene előfordulnia egy kimenetelnek, és a piacon kínált ár. Egy fogadás valószínűleg nyerhet, és mégis negatív várható értékkel rendelkezhet, ha az odds túl rövid. Egy fogadás ma is elveszíthet, miközben mégis pozitív várható értékkel rendelkezik egy ésszerű valószínűség becslés alapján. A fogalom hasznos, mert eltereli a figyelmet a győztes kiválasztásáról, és a valószínűség, az ár és a bizonytalanság közötti kapcsolat felé irányítja.",
  keyTakeaways: [
    "A várható érték a valószínűséget és a kifizetést egy hosszú távú matematikai mérőszámba ötvözi.",
    "Pozitív EV azt jelenti, hogy a becsült valószínűség elég magas a kínált oddshoz képest, hogy pozitív elméleti átlagos megtérülést hozzon létre.",
    "Negatív EV azt jelenti, hogy a kínált ár magasabb siker arányt igényel, mint amit a valószínűség becslésed támogat.",
    "Egy pozitív-EV fogadás elveszhet, és egy negatív-EV fogadás nyerhet; az EV a többszörös döntésekről szól, nem egy esemény bizonyosságáról.",
    "Bármely EV számítás minősége erősen függ a valószínűség becslés minőségétől és kalibrációjától.",
    "A jobb oddsok javítják a várható értéket ugyanazon alapvető választás esetén, mert csökkentik a break-even valószínűséget.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Mit jelent a Várható Érték",
      paragraphs: [
        "A várható érték a valószínűség súlyozott átlaga minden lehetséges kimenetelnek. Egy egyszerű nyerés vagy veszteség fogadási példában két fő pénzügyi kimenetel van: a fogadás nyer és nyereséget hoz, vagy a fogadás veszíti a tétet. Az EV a kimenetek valószínűségét és pénzügyi eredményét kombinálja.",
        "Tegyük fel, egy választás 2,00 tizedes oddszónál van, és becsülöd, hogy 55% eséllyel nyer. Egy egység tét két egységet hoz vissza siker esetén, ami egy egység nyereség plusz az eredeti tét. A vesztes kimenetel egy egység költséget jelent. A várható érték tehát 0,55 × 1 egység nyereség + 0,45 × -1 egység, ami +0,10 egység. Egy egység téthez viszonyítva ez elméleti +10% megtérülést jelent.",
        "Ez nem jelenti azt, hogy a következő fogadás fizikailag 1,10 egységet hoz. Egy fogadás tényleges kimenetele diszkrét: vagy nyer, vagy veszíti a tétet a piac kiegyenlítési szabályai szerint. Az EV átlag a hasonló, ismételt döntésekre vonatkozik a feltételezett valószínűség alapján."
      ],
      callout: {
        title: "A fő ötlet",
        body:
          "A várható érték a minőség mértéke egy árhoz képest a valószínűség becslés alapján. Nem jósolja meg a következő mérkőzés eredményét.",
        tone: "info",
      },
    },
    {
      id: "formula",
      heading: "Az alapvető várható érték képlete",
      paragraphs: [
        "Egy egyszerű nyerés vagy veszteség fogadás esetén, amely tizedes oddszót használ, az EV egység tétre számítva: EV = (nyerési valószínűség × tizedes odds) − 1.",
        "Ha a valószínűség 50% és az odds 2,20, a számítás 0,50 × 2,20 − 1 = +0,10, vagy +10%. Ha ugyanaz a 50% valószínűség 1,80 oddszónál van, az eredmény 0,50 × 1,80 − 1 = −0,10, vagy −10%.",
        "Ezért ugyanaz a jóslat nagyon különböző várható értékkel járhat a rendelkezésre álló ár függvényében. Ez az egyik legfontosabb különbség a fogadási elemzésben: a sportopinion és a fogadás gazdasági minősége nem ugyanaz.",
        "A képlet egyszerű, de hamis bizalmat kelthet, ha a valószínűség bemenete pontosnak tekinthető. Az EV aritmetikai helyes lehet, miközben a valószínűség becslés hibás."
      ],
      bullets: [
        "EV egység tétre = (nyerési valószínűség × tizedes odds) − 1.",
        "50% valószínűség 2,20 oddszónál: +10% EV.",
        "50% valószínűség 2,00 oddszónál: 0% EV.",
        "50% valószínűség 1,80 oddszónál: −10% EV.",
      ],
      callout: {
        title: "Ugyanaz a választás, különböző EV",
        body:
          "Ha a valószínűség becslésed ugyanaz marad, a odds változtatása azonnal megváltoztatja a várható értéket.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Break-Even valószínűség és Várható Érték",
      paragraphs: [
        "Minden árat megadott break-even valószínűséghez rendelnek. A tizedes oddszónál a break-even valószínűség az 1 osztva az oddszón. 2,00 esetén a break-even arány 50%. 1,80 esetén körülbelül 55,6%. 2,50 esetén 40%.",
        "A kapcsolat az EV-hez közvetlen. Ha a valószínűség becslésed meghaladja a rendelkezésre álló ár által sugallt break-even valószínűséget, a fogadás pozitív várható értékkel rendelkezik az adott becslés alapján. Ha a becslésed alacsonyabb, a várható érték negatív. Ha a kettő egyenlő, a teoretikus EV nulla, mielőtt figyelembe vennénk a gyakorlati nehézségeket.",
        "Ez a keretrendszer hasznosabb, mint egyszerűen megkérdezni, hogy egy kimenetel valószínű-e. Egy 70% értékelésű csapat még rosszul is árazott lehet, ha a rendelkezésre álló odds 75% break-even arányt igényel. Egy 35% értékelésű kimenetel elméletileg értéket kínálhat, ha az ár alacsonyabb break-even arányt igényel."
      ],
      callout: {
        title: "A valószínűség nem azonos az értékességgel",
        body:
          "A valószínűség megmutatja, milyen gyakran gondolod, hogy valami megtörténik. A várható érték azt kérdezi, hogy a kínált ár megfelelően kompenzál-e a valószínűségért.",
        tone: "warning",
      },
    },
    {
      id: "positive-negative",
      heading: "Pozitív EV vs Negatív EV",
      paragraphs: [
        "Pozitív várható érték azt jelenti, hogy a becsült átlagos megtérülés meghaladja a tét összegét. Negatív várható érték azt jelenti, hogy a becsült átlagos megtérülés alacsonyabb a tét összegénél. Az EV jele a valószínűség és az ár közötti kapcsolat függvénye, nem attól, hogy a következő egyéni fogadás nyer.",
        "Két ember ugyanazt a választást értékeli. Az egyik csak 1,80 oddszót tud, míg a másik 2,05-öt talál. Ha mindkét 52% valószínűség becslést használ, az első ár 0,52 × 1,80 − 1 = −6,4% EV. A második 0,52 × 2,05 − 1 = +6,6% EV.",
        "A jóslat ugyanaz, de a két fogadás gazdasági minősége különbözik. Ezért fontos az ár összehasonlítása. A fogadó nem irányíthatja a végső eredményt, de gyakran irányíthatja, hogy elfogadja-e a rosszabb árat, ha egy jobb, egyenértékű ár elérhető máshol."
      ],
      bullets: [
        "Pozitív EV: a becsült valószínűség meghaladja az ár break-even követelményeit.",
        "Negatív EV: a becsült valószínűség alacsonyabb, mint az ár break-even követelménye.",
        "Nulla EV: a becsült valószínűség körülbelül megegyezik a break-even követelményekkel.",
        "A odds változtatása megváltoztatja az EV-t, még akkor is, ha a mögöttes valószínűség becslés nem változik.",
      ],
    },
    {
      id: "not-guarantee",
      heading: "Miért nem garantál a pozitív várható érték nyereséget",
      paragraphs: [
        "Egy pozitív-EV becslés egy hosszú távú matematikai várakozást ír le, nem garantált rövid távú eredményt. A sportok véletlenszerűséget, hiányos információt, bírói döntéseket, sérüléseket, taktikai változásokat, időjárási hatásokat, végrehajtási hibákat és sok más varianciaforrást tartalmaznak. Még egy erős valószínűség becslés sem távolíthatja el ezeket a tényezőket.",
        "Képzelj el egy sor fogadást, amely mindegyike 60% nyerési valószínűséggel van értékelve. Négy vagy öt veszteség egymás után teljesen lehetséges. Fordítottan, egy sor negatív-EV fogadás több alkalommal is nyerhet egymás után. A rövid távú eredmények ezért nem megbízhatóan tükrözik, hogy a mögöttes folyamat jó volt-e.",
        "A második bizonytalanság forrása a valószínűség becslése magától. Egy számítás erősen pozitívnak tűnhet, ha a becsült valószínűség túl optimista. Ha egy modell 60%-ot mond, miközben a valós esély 50%-hoz közel, az EV számítás félrevezető lesz, még ha az aritmetika hibátlan is.",
        "Ezért a várható értéket analitikai keretként kell kezelni, nem garanciaként. Minél bizonytalanabb a valószínűség becslés, annál kevésbé kell nagyra tenni egy kis látszólagos élőszámra."
      ],
      callout: {
        title: "Az aritmetika helyes lehet, miközben a becslés hibás",
        body:
          "Az EV számítások csak annyira megbízhatóak, amennyire a valószínűségek megbízhatóak. A modell kalibrációja és a bizonytalanság ugyanolyan fontos, mint a képlet.",
        tone: "warning",
      },
    },
    {
      id: "probability-quality",
      heading: "Miért fontosabb a valószínűség minősége, mint a képlet",
      paragraphs: [
        "Az EV képlet egyszerű. A valószínűség jó becslése a nehéz rész. Egy hasznos valószínűség modellnek kalibráltnak kell lennie: a 60% körüli kimeneteknek, egy megfelelően nagy és releváns mintában, körülbelül 60%-ban kell előfordulniuk.",
        "A sport valószínűségeket piaci adatokból, statisztikai modellekből, csapat- és játékosinformációkból, kontextuális változókból vagy ezek kombinációiból lehet becsülni. Minden megközelítés feltételezéseket tartalmaz. A történelmi adatok nem feltétlenül tükrözik teljes mértékben a jelenlegi csapatokat. A sérülések bizonytalanok lehetnek. Egy modell alábecsülheti a taktikai változásokat. A piaci árak olyan információkat is tartalmazhatnak, amelyeket a modell nem.",
        "Ez azt jelenti, hogy egy 2 % látszó előny nem kell, hogy automatikusan ugyanúgy kezelje, mint egy 10 % előny. A valószínűségbecslés körüli bizonytalanság nagyobb lehet, mint a mért különbség.",
        "Egy fegyelmezett folyamat nem csak azt kérdezi: „Mi a becslésem?” hanem azt is: „Mennyire bizonytalan ez a becslés, és mennyire érzékeny az EV kis változásokra?"
      ],
      bullets: [
        "Ellenőrizze a kalibrációt nagy mintákon, ne ítéljen meg egy modellt néhány eredmény alapján.",
        "Kis előnyöket óvatosan kezeljen, ha az alapvető valószínűségbecslés bizonytalan.",
        "Frissítse a becsléseket, amikor releváns információk változnak.",
        "Kerülje a bizalom növelését csupán azért, mert a modell sok tizedesjegyet ad.",
      ],
    },
    {
      id: "bookmaker-margin",
      heading: "Hogyan befolyásolja a Bookmaker Margin az EV elemzést",
      paragraphs: [
        "A sportsbook árak gyakran tartalmaznak bookmaker margin-t vagy overround-ot. Egyszerű kétirányú piacon mindkét oldal 1,91-gyel kínálható. Minden ár körülbelül 52,36 %-t sugall, így a két nyers valószínűség összege körülbelül 104,72 % a 100 % helyett.",
        "Ez azért fontos, mert a nyers bookmaker által sugallt valószínűség nem automatikusan egy igazságos valószínűségbecslés. A megjelölt árak tartalmazzák a piac szerkezetét és az üzemeltető marginját. Az elemzők normalizálhatják a sugallt valószínűségeket, hogy egyszerű, marginmentes piacbázist hozzanak létre.",
        "Az EV elemzéshez azonban a fogadó számára elérhető tényleges ár marad az, amely meghatározza a break-even küszöböt. Még ha egy marginmentes modell 52 %-t becsül egy kimenetre, egy 1,85-ös sportsbook ár 54,1 %-t igényel a break-evenhez. Az végrehajtási ár ezért központi szerepet játszik a végső EV számításában."
      ],
      callout: {
        title: "Az igaz valószínűség és a rendelkezésre álló ár különböző bemenetek",
        body:
          "Egy marginmentes becslés segíthet a piaci elvárások leírásában, míg a ténylegesen kínált odds meghatározza a fogadás break-even valószínűségét.",
        tone: "info",
      },
    },
    {
      id: "odds-comparison",
      heading: "Miért javítja az odds összehasonlítása az elvárt értéket",
      paragraphs: [
        "Ugyanezen választás és valószínűségbecslés esetén a magasabb oddsok mindig javítják az elvárt értéket. Tegyük fel, hogy a becslésed 48 %. 1,95-ön az EV 0,48 × 1,95 − 1 = −6,4 %. 2,10-ön az EV +0,8 %. 2,20-ön az EV +5,6 %.",
        "A sportesemény kimenete nem változott ezekben a példákban. Csak az ár változott. Ezért az egyenértékű piacok összehasonlítása a sportsbookok között fontos része a érték elemzésnek.",
        "Az összehasonlításnak valóban like-for-like kell lennie. A különböző kiegyenlítési szabályok, hányadosok, összeszámok, túltöltés kezelése, érvénytelenülő feltételek vagy piacdefiníciók felszínesen hasonló árakat nem egyenértékűvé tesznek. Az ár összehasonlítása csak akkor hasznos, ha az alapfogadás ugyanaz."
      ],
      bullets: [
        "Győződjön meg arról, hogy az esemény, a választás, a vonal és a kiegyenlítési szabályok egyeznek.",
        "Hasonlítsa össze a jelenlegi árakat, ne a régi képernyőképeket vagy történelmi idézeteket.",
        "Ne feledje, hogy a piaci árak mozoghatnak, mielőtt a fogadást leadná.",
        "A magasabb egyenértékű odds csökkenti a break-even valószínűséget.",
      ],
    },
    {
      id: "variance",
      heading: "Elvárt érték, szórás és mintaméret",
      paragraphs: [
        "A szórás leírja, hogy a rövid távú eredmények mennyire mozoghatnak a hosszú távú várható érték körül. A sportfogadás jelentős szórással rendelkezik, mert minden esemény diszkrét kimenetet hoz, és sok piac valószínűsége messze van a bizonyosságtól.",
        "Egy folyamat, amely valódi pozitív elvárt értékkel rendelkezik, hosszú veszteségi időszakokat tapasztalhat. Ezeknek a hullámoknak a mérete és hossza függ a fogadások típusától, az oddsoktól, a valódi valószínűségektől, a pozíciók közötti korrelációtól és a tétmérettől. Egy kis minta ezért a véletlenszerűség által uralkodhat.",
        "Ez egy nagy értékelési problémát teremt. A fogadó tévesen értelmezheti a nyerő sorozatot a képesség bizonyítékként, vagy elhagyhatja a jó folyamatot egy szokásos csökkenés során. Az EV elemzés a legértelmezhetőbb, ha kombinálva van fegyelmezett nyilvántartással, reális mintamérettel és a kalibrációra való figyelemmel, nem csupán a rövid távú nyereségre."
      ],
      callout: {
        title: "Az eredmények és a folyamat nem azonosak",
        body:
          "Egy győzelem nem bizonyítja, hogy a fogadás pozitív EV-vel rendelkezett, és egy veszteség sem bizonyítja, hogy negatív EV-vel volt. Értékelje a valószínűség és az ár döntés minőségét külön a végső pontszámtól.",
        tone: "warning",
      },
    },
    {
      id: "worked-example",
      heading: "Egy működő elvárt érték példa",
      paragraphs: [
        "Tegyük fel, hogy egy sportsbook 2,30-as tizedes oddsot kínál egy választásra. A break-even valószínűség 1 ÷ 2,30, vagy körülbelül 43,48 %. A független elemzésed 47 % -ként becsüli a választást.",
        "Az EV egységenként 0,47 × 2,30 − 1 = +0,081, vagy +8,1 %. A 47 % becslés alapján a ugyanazon valószínűség‑ár kapcsolatú ismételt fogadások elméletileg 1,081 egységet hoznának átlagosan minden egység tétre.",
        "Most tesztelje a szérülékenységet. Ha a valódi valószínűség csak 44 %, az EV 0,44 × 2,30 − 1 = +1,2 %. 43 % -nél az EV −1,1 % lesz. A következtetés egy viszonylag kis valószínűség‑szabályozással változik.",
        "Ez a érzékenység szemlélteti, miért fontos a felelős értelmezés. A +8,1 % számú fejléc önmagában nem elég. Meg kell értened, mennyire vagy magabiztos a 47 % becslésben, és hogy a idézett ár még elérhető-e."
      ],
      bullets: [
        "Esélyek: 2,30",
        "Költségtérülési valószínűség: körülbelül 43,48 %",
        "Becsült valószínűség: 47 %",
        "Becsült EV: +8,1 %",
        "44 % valószínűség esetén: +1,2 % EV",
        "43 % valószínűség esetén: −1,1 % EV",
      ],
    },
    {
      id: "matchsignal",
      heading: "Hogyan kapcsolódik az Elvárt Érték a MatchSignal Értékelőnyhöz",
      paragraphs: [
        "A MatchSignal a piaci árakat, a fogadóirodák mintáit és a valószínűség-alapú elemzést használja, hogy kontextust nyújtson egy választás körül. A platform Value Edge mezője arra szolgál, hogy kiemelje a rendelkezésre álló piaci ár és a MatchSignal által használt valószínűség-alapú értékelés közötti pozitív különbséget.",
        "Ezt egy analitikai jelzésként kell értelmezni, nem pedig garantált várható hozamként. A piaci árak mozoghatnak, a valószínűség-becslések bizonytalanságot tartalmaznak, és a megjelenített jelzés a rendelkezésre álló adatok és modellfeltevések tükröződik az elemzés időpontjában.",
        "A Best Odds a legjobb elérhető partnerárat mutatja a megjelenített választáshoz, a Market Avg a mintavételezett piaci árképzést összefoglalja, a Fair Probability egy analitikai becslés, és a Books Sampled jelzi, hány fogadóiroda forrása járult hozzá a releváns piaci mintához.",
        "A Value Edge helyes értelmezése tehát nem „ez a fogadás nyerni fog”. Inkább „a jelenlegi valószínűség- és árfeltevések alapján ez a választás kedvezőbb áron lehet megadva, mint ahogyan a modell azt javasolja”."
      ],
      callout: {
        title: "Egy jelzés nem garancia",
        body:
          "A MatchSignal Value Edge egy modellalapú kapcsolatot ír le a valószínűség és az ár között. Nem garantál pozitív eredményt, és nem távolítja el a sportesemények varianciáját.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Gyakorlati EV ellenőrzőlista",
      paragraphs: [
        "Mielőtt egy fogadást pozitív várható értékként neveznél, ellenőrizd a számítás minden összetevőjét. Ez segít megelőzni, hogy egy matematikailag helyes képletet megbízhatatlan bemenetekhez használjanak."
      ],
      bullets: [
        "Azonosítsd a pontos piacot és választást.",
        "Használd a jelenleg elérhető esélyeket, ne egy elavult árat.",
        "Alakítsd át az árat a költségtérülési implícit valószínűségére.",
        "Becsüld meg a kimenet valószínűségét függetlenül vagy egy jól meghatározott modell segítségével.",
        "Ellenőrizd, hogy a fogadóiroda marja befolyásolja-e a piaci összehasonlítást.",
        "Számítsd ki az EV-t a valószínűség és az ár alapján.",
        "Teszteld, hogyan változik az eredmény, ha a valószínűség-becslés kicsit alacsonyabb.",
        "Hasonlítsd össze az egyenértékű árakat a különböző fogadóirodák között, ahol elérhető.",
        "Vegyél figyelembe bizonytalanságot és varianciát.",
        "Használj fegyelmezett tétméretezést, és soha ne tekintsd az EV-t garanciának.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "matchsignal-value-edge",
    "variance-sports-betting",
  ],
  responsibleGamblingNote:
    "Az elvárt érték egy matematikai keretrendszer, nem pedig nyereség garanciája. A valószínűség-becslések hibásak lehetnek, a piaci árak változnak, és a rövid távú eredmények jelentősen eltérhetnek a elméleti várakozásoktól. Fogadj csak olyan összegeket, amelyeket megengedhetsz magadnak elveszíteni, tartsd be a meghatározott határokat, kerüld a veszteségek üldözését, és tekintsd a fogadási elemzést információnak, nem pedig biztoságnak.",
};

export default guide;
