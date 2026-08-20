import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "why-chasing-losses-is-dangerous",
  locale: "hu",
  title: "Miért veszélyes a veszteségek üldözése",
  category: "responsible-betting",
  status: "published",
  description:
    "Tudja meg, miért veszélyes a veszteségek hajszolása a sportfogadásban, hogyan növeli a pénzügyi kockázatot az érzelmi alapú tétnövelés, miért nem javítják a korábbi veszteségek a következő fogadás valószínűségét, és hogyan csökkenthetik az előre meghatározott limitek a káros döntéshozatalt.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A veszteségek hajszolása azt jelenti, hogy a fogadó elsősorban a már elvesztett pénz visszaszerzése érdekében változtat a fogadási szokásain. Ez gyakran a tétek növelésével, a tervezettnél több fogadás megkötésével, ismeretlen piacokra való átnyergeléssel vagy gyorsabb döntéshozatallal jár, mivel a fogadó nyomást érez az egyensúly helyreállítására. A központi probléma matematikai és pszichológiai jellegű: egy korábbi veszteség nem javítja a következő fogadás valószínűségét, a hajszolás viszont általában éppen akkor növeli a pénzügyi kitettséget, amikor az ítélőképesség a legnagyobb érzelmi nyomás alatt áll.",
  keyTakeaways: [
    "A korábbi veszteségek nem teszik valószínűbbé a következő független fogadás megnyerését.",
    "A tétek veszteséget követő növelése úgy növeli a kitettséget, hogy közben nem javítja a mögöttes valószínűséget.",
    "A hajszolás egy átlagos visszaesést is súlyos bankroll-veszteséggé változtathat.",
    "A Martingale-típusú visszanyerési rendszerek kudarcot vallanak, ha figyelembe vesszük a vesztes szériákat, a véges bankrollt és a fogadóirodák által meghatározott limiteket.",
    "Az érzelmi nyomás elhamarkodott döntésekhez, gyengébb piacválasztáshoz és a bankroll-szabályok feladásához vezethet.",
    "Az előre meghatározott költési, veszteség-, idő- és tétlimitek hatékonyabbak, ha azokat még a fogadás megkezdése előtt állítják be.",
    "A veszteséglimit elérése utáni megállás egy kockázatkezelési döntés, nem pedig a visszanyerés kudarca.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Mit jelent a veszteségek hajszolása?",
      paragraphs: [
        "A veszteségek hajszolása minden olyan kísérlet, amely a korábbi fogadási veszteségek visszaszerzésére irányul a normál viselkedés megváltoztatásával, elsősorban azért, mert a fogadó hátrányban van.",
        "A legnyilvánvalóbb példa a tétméret növelése egy veszteség után. De a hajszolás jelentheti olyan további fogadások megkötését is, amelyek nem képezték az eredeti terv részét, ismeretlen sportágakba vagy piacokra való átnyergelést, késő éjszakai fogadást a korábbi veszteségek visszaszerzése érdekében, vagy rosszabb szorzók elfogadását a sürgető érzés miatt.",
        "A meghatározó jellemző nem egyszerűen az, hogy a fogadó egy vesztes fogadás után újabbat tesz meg. Hanem az, hogy az előző veszteség válik a következő döntés megváltoztatásának fő okává."
      ],
      callout: {
        title: "A következő fogadásnak önmagában kell megállnia a helyét",
        body:
          "Minden új fogadást a saját valószínűsége, árazása és kockázata alapján kell értékelni. A korábbi veszteségek nem határozhatják meg, hogy egy fogadás vonzó-e.",
        tone: "warning",
      },
    },
    {
      id: "independence",
      heading: "Miért nem javítják a korábbi veszteségek a következő fogadás esélyeit",
      paragraphs: [
        "A veszteségek hajszolása mögött meghúzódó egyik legveszélyesebb feltételezés az az elképzelés, hogy a győzelem valahogy valószínűbbé válik, mivel már több veszteség is történt.",
        "Ha a következő esemény független az előzőektől, a korábbi eredmények nem változtatják meg annak valószínűségét. Egy érménél nem lesz valószínűbb a fej, csak azért, mert egymás után többször írás jött ki. A sportesemények összetettebbek az érmedobásnál, de ugyanaz az elv érvényesül, amikor a korábbi fogadási eredményeknek nincs ok-okozati összefüggésük a következő mérkőzéssel.",
        "Egy fogadó, aki öt fogadást elveszített, matematikailag nem „esedékes” a hatodik megnyerésére. A hatodik fogadást továbbra is az aktuális piac, valószínűség és árfolyam alapján kell értékelni."
      ],
      callout: {
        title: "A veszteségek nem teremtenek valószínűséget",
        body:
          "Az anyagi veszteség nem teszi erősebbé a következő választást. A visszanyerési kényszer érzelmi alapú, nem prediktív.",
        tone: "info",
      },
    },
    {
      id: "stake-escalation",
      heading: "Hogyan növeli a kockázatot a tét emelése",
      paragraphs: [
        "A hajszolás gyakran a lehető legrosszabb időben növeli a tét nagyságát. A veszteségek után a bankroll kisebb, de a fogadó többet kockáztathat a gyors visszanyerés reményében.",
        "Tegyük fel, hogy egy fogadó általában 10 egységet kockáztat. A veszteség után a következő tétet 20-ra, majd 40-re, végül 80-ra emeli. Négy egymást követő veszteség 150 egységnyi halmozott veszteséget eredményezne, annak ellenére, hogy az eredeti fogadási terv csak 10 egységet kockáztatott fogadásonként.",
        "A következő fogadás valószínűsége nem javult a tétek növelésével. Csak a tévedés pénzügyi következménye lett nagyobb.",
        "Ezért fordulhat elő, hogy a veszteségek kergetése egy normál vesztes szériát a bankrollt veszélyeztető eseménnyé változtathat."
      ],
      bullets: [
        "Normál tét: 10.",
        "Az első veszteség után: 20.",
        "A második veszteség után: 40.",
        "A harmadik veszteség után: 80.",
        "Négy veszteség: összesen 150 egység elveszítve.",
      ],
    },
    {
      id: "martingale",
      heading: "Miért veszélyesek a Martingale-típusú rendszerek",
      paragraphs: [
        "A Martingale-típusú rendszer minden veszteség után növeli a tétet, így a jövőbeli nyeremény célja a korábbi veszteségek fedezése és egy kis profit elérése.",
        "Az elgondolás papíron meggyőzőnek tűnhet, mivel a nyeremény végül elkerülhetetlennek látszik. A probléma az, hogy a vesztes szériák a vártnál tovább tarthatnak, a bankrollok végesek, a fogadóirodák pedig maximális téteket és számlakorlátokat alkalmaznak.",
        "Ha a tétek ismételten duplázódnak, exponenciálisan nőnek. 10 egységről indulva a sorozat 10, 20, 40, 80, 160, 320 és 640 lesz. Egy hét veszteségből álló sorozat 1270 egységnyi kumulatív kitettséget igényelne, mielőtt a következő fogadást egyáltalán megtennénk.",
        "Egyetlen tétrakási progresszió sem változtathatja meg az alapul szolgáló választás valószínűségét. Csak a pénzügyi következmények mértékét változtatja meg."
      ],
      callout: {
        title: "Az exponenciális tétek és a véges bankroll találkozása",
        body:
          "A visszanyerési rendszerek előbb-utóbb ütköznek a tőkehatárokkal, a fogadóirodák korlátaival vagy a vártnál hosszabb veszteségszériákkal.",
        tone: "warning",
      },
    },
    {
      id: "tilt",
      heading: "Mi az a tilt?",
      paragraphs: [
        "A tilt egy olyan kifejezés, amely a frusztráló vagy váratlan eredményeket követő, érzelmileg befolyásolt döntéshozatalt írja le. Gyakori a versenyszerű játékokban, a kereskedésben és a fogadásban.",
        "A tilt állapotában lévő fogadó növelheti a téteket, felhagyhat a kutatással, gyorsabban köthet fogadásokat, ismeretlen piacokat választhat, vagy figyelmen kívül hagyhatja a korábban ésszerűnek tartott korlátokat.",
        "A probléma az, hogy az érzelmi sürgetettség beszűkíti a figyelmet. Ahelyett, hogy azt kérdezné, vonzó-e a következő árfolyam, a fogadó arra összpontosít, mennyi pénzt kell visszanyernie.",
        "Ez egy visszacsatolási hurkot hoz létre: a veszteségek növelik a frusztrációt, a frusztráció rontja a döntések minőségét, a gyengébb döntések pedig további veszteségeket eredményezhetnek."
      ],
    },
    {
      id: "sunk-cost",
      heading: "Az elsüllyedt költség problémája",
      paragraphs: [
        "A már elvesztett pénz elsüllyedt költségnek számít. A következő döntéssel ezen már nem lehet változtatni.",
        "A következő fogadás racionális értékelésének ezért figyelmen kívül kell hagynia az előző bankrollszint helyreállítására irányuló érzelmi vágyat, és kizárólag az aktuális valószínűségre, árfolyamra és kockázatra kell összpontosítania.",
        "A veszteségek hajszolása az ellenkezőjét teszi. A korábbi veszteségeket a kitettség növelésének okaként kezeli, annak ellenére, hogy ezek a veszteségek nem bizonyítják, hogy a következő lehetőség jobb lenne.",
        "Ez hasonló ahhoz, mint amikor valaki azért folytat egy rossz befektetést, mert már pénzt fektetett bele. A múltbeli veszteségek befolyásolhatják az érzelmeket, de nem javíthatják egy új döntés látszólagos minőségét."
      ],
      callout: {
        title: "A korábbi veszteségek nem részei a következő fogadás értékének.",
        body:
          "A helyes kérdés az, hogy az aktuális fogadás ésszerű-e most, nem pedig az, hogy képes-e helyrehozni egy korábbi eredményt.",
        tone: "info",
      },
    },
    {
      id: "gambler-fallacy",
      heading: "Veszteségek hajszolása és a szerencsejátékos tévhit",
      paragraphs: [
        "A szerencsejátékos tévhit az a hiedelem, hogy egy véletlenszerű kimenetel valószínűbbé válik, mert az ellentétes kimenetel ismételten bekövetkezett.",
        "A fogadásban ez olyan kijelentésekben jelenhet meg, mint: 'Ötször veszítettem zsinórban, tehát hamarosan nyernem kell' vagy 'ez a csapat nem veszíthet tovább'.",
        "Hacsak nincs új információ, amely valóban megváltoztatja a valószínűséget, az előző sorozat nem kényszeríti a következő kimenetel megfordulását.",
        "A sportesemények eredményei változó körülményeket tartalmazhatnak, és nem mindig függetlenek, ezért a valószínűséget frissíteni kell, amikor valódi információk változnak. De a fogadó személyes veszteségszériája önmagában nem ilyen információ."
      ],
    },
    {
      id: "worse-markets",
      heading: "A hajszolás gyakran rosszabb piacválasztáshoz vezet",
      paragraphs: [
        "Az a fogadó, aki nyomást érez a veszteségek visszaszerzésére, elkezdhet olyan fogadásokat kötni, amelyeket normális esetben elutasítana.",
        "Átmehet alacsonyabb likviditású piacokra, elfogadhat alacsonyabb oddsokat, kihagyhatja az összehasonlítást a fogadóirodák között, vagy olyan sportágakra fogadhat, amelyeket nem ismer jól, csak azért, mert hamarosan kezdődik egy esemény.",
        "Ez csökkentheti a döntéshozatal minőségét ugyanabban az időben, amikor a tét mérete növekszik. Ez a kombináció különösen veszélyes, mivel a valószínűségbecslés és a kockázatkezelés egyszerre romlik.",
        "Egy erős bankroll-kezelési folyamatnak meg kell akadályoznia, hogy egy korábbi veszteség megléte csökkentse a következő fogadáshoz szükséges mércét."
      ],
    },
    {
      id: "time-pressure",
      heading: "Miért teszi rosszabbá a veszteségek hajszolását a sürgetettség érzése",
      paragraphs: [
        "A veszteségek hajszolása gyakran mesterséges határidőket teremt. A fogadó úgy érezheti, hogy a pénzt még a nap, a hétvége, a torna vagy a fogadási alkalom vége előtt vissza kell nyernie.",
        "A piacot nem érdekli ez a határidő. Nincs ok arra, hogy egy jó lehetőségnek éjfél előtt kell megjelennie csak azért, mert korábban veszteségek történtek.",
        "A mesterséges sürgetettség elhamarkodott döntésekre ösztönöz, és arra késztetheti a felhasználókat, hogy rossz árakat vagy nem megfelelő piacokat fogadjanak el.",
        "Az egyik leghasznosabb kontroll ezért az a hajlandóság, hogy vesztes pozícióban is megálljunk, és csak az érzelmi nyomás elmúltával térjünk vissza."
      ],
      callout: {
        title: "Nem kötelező nullszaldóval befejezni a fogadási alkalmat",
        body:
          "Egy veszteség maradhat veszteség. Ha egy önkényesen meghatározott időkereten belül próbáljuk meg kikényszeríteni a visszanyerést, az sokkal nagyobb kárt okozhat.",
        tone: "warning",
      },
    },
    {
      id: "bankroll-damage",
      heading: "Hogyan károsítja a veszteségek hajszolása a bankroll-kezelést",
      paragraphs: [
        "A bankroll-kezelés a kiszámítható kitettségen alapul. Ha a szokásos szabály az, hogy fogadásonként a bankroll 1%-át kockáztatjuk, a tétek veszteségek utáni megduplázása vagy megháromszorozása tönkreteszi ezt a struktúrát.",
        "A bankroll egy vesztes sorozat után már eleve kisebb, így egy nagyobb tét a fennmaradó tőke még nagyobb százalékát képviseli.",
        "Ez növeli a visszaesés súlyosságát és a tönkremenetel kockázatát. Emellett megnehezíti a teljesítményadatok értelmezését is, mivel néhány érzelemvezérelt fogadás uralhatja az egész eredményt.",
        "A következetes tétméretezés ezért egyszerre matematikai és viselkedési védelem a veszteségek hajszolásával szemben."
      ],
    },
    {
      id: "winning-chase",
      heading: "A veszteségek kergetése nyeremények után is előfordulhat",
      paragraphs: [
        "Bár a veszteségek kergetése a legnyilvánvalóbb minta, hasonló kockázatnövekedés nyeremények után is bekövetkezhet.",
        "A győzelmi sorozatban lévő fogadó úgy érezheti, hogy a „ház pénzével” játszik, ezért növelheti a tétet, vagy több fogadást köthet, mivel a közelmúltbeli sikerek túlzott önbizalmat szülnek.",
        "Ez a viselkedés gyorsan felemésztheti a nyereséget. A mögöttes probléma ugyanaz: a közelmúltbeli eredmények megváltoztatják a tét nagyságát és a döntési kritériumokat anélkül, hogy bizonyíték lenne arra, hogy a következő lehetőség jobb.",
        "A fegyelmezett folyamatnak ezért mind a veszteségek, mind a nyeremények után ellenállnia kell az érzelmi alapú tétváltoztatásoknak."
      ],
    },
    {
      id: "prevention",
      heading: "Hogyan csökkentik az előre meghatározott limitek a kergetést",
      paragraphs: [
        "A leghatékonyabb kergetés elleni kontrollokat általában a fogadás megkezdése előtt hozzák létre.",
        "A költési limit szabályozza, mennyi pénz fizethető be vagy használható fel. A veszteséglimit meghatározza az egy időszakon belüli maximálisan elfogadható veszteséget. A tétlimit megakadályozza, hogy egy érzelmi alapú fogadás aránytalanul naggyá váljon. Az időlimit megakadályozza, hogy egy vesztes széria a végtelenségig folytatódjon.",
        "Ezek a szabályok azért értékesek, mert a nyugodt állapotban hozott döntések általában megbízhatóbbak, mint a frusztrált vagy a visszanyerésre kétségbeesetten törekvő állapotban hozottak.",
        "Ahol elérhető, a fogadóirodák felelősségteljes szerencsejátékot támogató eszközei segíthetnek a befizetési, veszteség- és időlimitek betartatásában."
      ],
      bullets: [
        "Határozzon meg egy maximális bankrollt a fogadás megkezdése előtt.",
        "Határozzon meg egy maximális tétet fogadásonként.",
        "Állítson be napi, heti vagy havi veszteséghatárokat.",
        "Használjon idő- vagy munkamenet-korlátokat.",
        "A limit elérésekor hagyja abba a játékot, ahelyett, hogy növelné a kockázatot.",
        "Kerülje a limitek módosítását egy vesztes széria közben.",
      ],
    },
    {
      id: "cooling-off",
      heading: "Miért segíthet a lehűlési időszak?",
      paragraphs: [
        "A lehűlési időszak távolságot teremt az érzelmi alapú veszteség és a következő fogadási döntés között.",
        "Még egy rövid szünet is csökkentheti az azonnali visszanyerés iránti késztetést, és megkönnyítheti az előre meghatározott szabályokhoz való visszatérést.",
        "Súlyosabb esetekben számos szabályozott fogadási platform kínál hosszabb szüneteltetési vagy önkitiltási lehetőségeket. Ezeket az eszközöket arra tervezték, hogy megakadályozzák az azonnali hozzáférést, amikor a folyamatos fogadás már károssá válik.",
        "A szünet tartása nem annak beismerése, hogy a fogadónak hiányosak az ismeretei. Ez egy gyakorlati kockázatkezelési eszköz, amikor az érzelmi nyomás befolyásolja a döntéshozatal minőségét."
      ],
    },
    {
      id: "warning-signs",
      heading: "Figyelmeztető jelek arra, hogy a veszteségek hajszolása károssá válik",
      paragraphs: [
        "A hajszolás egyes formái nyilvánvalóak, míg mások fokozatosan alakulnak ki. A figyelmeztető jelek korai felismerése megelőzheti a súlyosabb pénzügyi és érzelmi következményeket."
      ],
      bullets: [
        "A tétek növelése elsősorban a korábbi veszteségek visszanyerése érdekében.",
        "A tervezettnél több pénz befizetése.",
        "Pénzkölcsönzés vagy a létfontosságú kiadásokra szánt alapok felhasználása.",
        "Fogadás ismeretlen sportágakra vagy piacokra csak azért, mert azok azonnal elérhetőek.",
        "A fogadás folytatása jóval a tervezett munkamenet vége után.",
        "A veszteségek vagy a fogadási tevékenység eltitkolása mások elől.",
        "Képtelenség abbahagyni a játékot, amíg a bankroll vissza nem tér egy korábbi szintre.",
        "A korábban meghatározott költési vagy veszteséghatárok figyelmen kívül hagyása.",
      ],
      callout: {
        title: "Az anyagi nyomás egy stopjelzés",
        body:
          "Ha a fogadás kölcsönkért pénzzel, létfontosságú alapokkal, titkolózással vagy a leállás képtelenségével jár, a prioritásnak a tevékenység abbahagyásának kell lennie, nem pedig egy jobb tétrakási módszer keresésének.",
        tone: "warning",
      },
    },
    {
      id: "matchsignal",
      heading: "Hogyan vonatkozik ez a MatchSignalra",
      paragraphs: [
        "A MatchSignal olyan elemzési kontextust biztosít, mint a Legjobb Szorzók (Best Odds), Piaci Átlag (Market Avg), Valós Valószínűség (Fair Probability), Érték Előny (Value Edge), Mintavételezett Irodák (Books Sampled) és Kockázati Szint (Risk Tier).",
        "Ezek közül a mezők közül egyik sem használható a veszteségek hajszolásának igazolására. Az Alacsony Kockázat (Low Risk) címke nem teszi biztossá a választást, és a nagyobb Érték Előny (Value Edge) sem jelenti azt, hogy a fogadónak növelnie kellene a tétet a korábbi veszteségek visszanyerése érdekében.",
        "Minden MatchSignal kártyát a felhasználó korábbi fogadási eredményeitől függetlenül kell értékelni. Az, hogy a korábbi tippek vesztesek voltak, nincs hatással arra, hogy a következő megjelenített lehetőség nagyobb valószínűséggel nyer-e.",
        "A MatchSignal elemzés tájékoztató jellegű, és az előre meghatározott személyes bankroll- és felelősségteljes szerencsejáték-korlátokon belül kell felhasználni."
      ],
      callout: {
        title: "Egyetlen jelzés sem írhatja felül a bankroll-korlátokat.",
        body:
          "A korábbi veszteségek soha nem változtathatnak egy elemzési jelzést helyreállító fogadássá.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Gyakorlati ellenőrzőlista a veszteségek hajszolása ellen",
      paragraphs: [
        "Használja ezt az ellenőrzőlistát, amikor a veszteségek visszanyerésének vágya befolyásolni kezdi a következő döntést."
      ],
      bullets: [
        "Kérdezze meg magától, hogy megtenné-e ugyanazt a fogadást, ha a korábbi fogadások nyertek volna.",
        "Tartsa a következő tétet a normál, előre meghatározott korláton belül.",
        "Ne növelje a téteket a bankroll gyorsabb helyreállítása érdekében.",
        "Ne adjon hozzá nem tervezett fogadásokat a sürgősség érzése miatt.",
        "Ellenőrizze, hogy a piac és az ár továbbra is megfelel-e a szokásos elemzési szabványnak.",
        "Álljon meg, amikor eléri az előre meghatározott veszteséghatárt.",
        "Tartson szünetet, ha a frusztráció vagy a sürgetettség érzése befolyásolja az ítélőképességét.",
        "Ne kérjen kölcsön, ne fizessen be impulzívan, és ne használjon fel létfontosságú pénzeszközöket.",
        "Használja a felelősségteljes szerencsejátékot támogató szüneteltetési vagy önkitiltási eszközöket, ha a leállás nehézségekbe ütközik.",
      ],
    },
  ],
  relatedGuides: [
    "bankroll-management",
    "flat-stakes-vs-percentage-staking",
    "variance-sports-betting",
    "cognitive-biases-sports-betting",
    "confirmation-bias-betting",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "A veszteségek hajszolása gyors anyagi károkat okozhat, mivel az érzelmi nyomást fokozott kitettséggel ötvözi. A korábbi veszteségek nem teszik valószínűbbé a következő fogadás nyerését. A fogadás megkezdése előtt állítson be költési, tét-, veszteség- és időkorlátokat, soha ne kérjen kölcsön és ne használjon fel létfontosságú pénzt fogadásra, és használja a szüneteltetési vagy önkitiltási eszközöket, ha úgy érzi, nehéz abbahagyni.",
};

export default guide;
