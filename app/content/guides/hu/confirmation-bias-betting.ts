import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "confirmation-bias-betting",
  locale: "hu",
  title: "Megerősítési torzítás és fogadási döntések",
  category: "betting-psychology",
  status: "published",
  description:
    "Tanulja meg, hogyan befolyásolja a megerősítési torzítás a sportfogadási döntéseket, miért kereshetnek a fogadók bizonyítékokat, amelyek alátámasztják a meglévő véleményüket, hogyan erősíthetik meg a modellek és narratívák a torzítást, és hogyan csökkentheti a strukturált elemzés a hatását.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A megerősítési torzítás a hajlam, hogy olyan információkat keressünk, észrevegyünk, értelmezzünk és emlékezzünk, amelyek támogatják a meglévő hiteinket. A sportfogadásban ez a torzítás akkor is megjelenhet, mielőtt egy ár is megfontolásra kerül: a fogadó véleményt alkot egy csapatról vagy játékosról, majd elkezdi gyűjteni az okokat, amelyek miatt ez a vélemény helyesnek kell lennie. Ellentmondó bizonyítékok kevesebb figyelmet kapnak, míg a támogató statisztikák, hírek és modellkimenetek meggyőzőbbnek tűnnek. Mivel a fogadási döntések a bizonytalanságot, az érzelmeket, a hiányos információkat és a pénzügyi kockázatot kombinálják, a megerősítési torzítás csendben átalakíthatja az elemzést igazolássá. Egy jobb folyamat igyekszik ugyanolyan aktívan cáfolni az eredeti tézist, mint amennyire támogatni próbálja.",
  keyTakeaways: [
    "A megerősítési torzítás miatt a támogató információk fontosabbnak tűnnek, mint az ellentétes bizonyítékok.",
    "A torzítás hatással lehet a kutatásra, a modellértelmezésre, a piacolvasásra és a kimenetel utáni értékelésre.",
    "Csak a fogadás győzelmi okainak keresése hamis bizalmat kelthet.",
    "Egy olyan modell, amely megegyezik a meglévő véleménnyel, túl súlyozott lehet, míg a nem egyetértő modellt túl gyorsan elutasíthatják.",
    "A piaci árak már tükrözhetik azt a pozitív információt, amely vonzott a fogadót.",
    "Az aktív keresés a cáfoló bizonyítékok után javíthatja a döntés minőségét.",
    "Írásos előfogadási szabályok és valószínűségi tartományok segíthetnek a megerősítési torzítás könnyebb észlelésében.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Mit jelent a megerősítési torzítás",
      paragraphs: [
        "A megerősítési torzítás akkor fordul elő, amikor az emberek előnyben részesítik az információkat, amelyek megerősítik, amit már hisznek.",
        "A hatás több szakaszban is előfordulhat. A fogadó kiválaszthatja, mely statisztikákat keressen, mely elemzőket kövesse, mely modellkimenetet bízzon meg, és mely híreket emlékezzen meg, attól függően, hogy támogatják-e az eredeti tézist.",
        "Ez nem igényel szándékos hazugságot. Az illető valószínűleg úgy érzi, hogy kiegyensúlyozott kutatást végez, miközben tudattalanul szűri a bizonyítékokat.",
        "Egy valószínűségi környezetben ez különösen veszélyes, mert szinte minden sportesemény tartalmaz pozitív és negatív jeleket. Ha csak egy oldal kerül összegyűjtésre, a bizalom nőhet anélkül, hogy a tényleges valószínűség javulna."
      ],
      callout: {
        title: "Az elemzés igazolássá válhat",
        body:
          "Ha a kutatás célja a tesztelésről a bizonyításra változik, a megerősítési torzítás már befolyásolja a folyamatot.",
        tone: "warning",
      },
    },
    {
      id: "how-it-starts",
      heading: "Hogyan kezdődik a megerősítési torzítás a fogadás előtt",
      paragraphs: [
        "A torzítás gyakran egy korai véleménnyel kezdődik: egy csapat erősnek tűnik, egy kedvelt játékos formában van, vagy egy nyitóár vonzó.",
        "Miután az első benyomás kialakul, a későbbi információk a vele szemben értelmeződnek. Erős támadó statisztikák támogatják a tézist. Hiányzó védőket kezelhetőnek írják le. Gyenge párosítást kivételnek tekintenek.",
        "A fogadó ezután kifejezetten a megelőzéseket, statisztikákat vagy közösségi média bejegyzéseket keresi, amelyek megerősítik az eredeti nézetet. A kutatás aszimmetrikus lesz.",
        "Egy erősebb megközelítés késlelteti a kötelezettségvállalást. Ahelyett, hogy azt kérdezné: \"Miért fog ez a csapat nyerni?\", a fogadó azt kérdezi: \"Milyen bizonyítékok támasztják alá az egyes lehetséges kimeneteleket?\""
      ],
    },
    {
      id: "selective-research",
      heading: "Kiválasztott kutatás",
      paragraphs: [
        "A keresési viselkedés önmagában is torzítást hozhat létre. Ha a fogadó olyan lekérdezést ad be, mint \"Miért győz a csapat A a csapat B ellen?\", a találatok már a megerősítés köré épülnek.",
        "Egy semlegesebb keresés mindkét oldalt vizsgálná: a legutóbbi teljesítményt, sérüléseket, párosítási struktúrát, ütemezést, piaci mozgást és árat.",
        "A kiválasztott kutatás különösen veszélyes, ha a fogadó már tudja, mely statisztikák valószínűleg támogatják a preferált kimenetet. Egy kis kedvező mutatókészlet meggyőző történetet hozhat létre, még akkor is, ha egy szélesebb adathalmaz kevert.",
        "A megoldás nem az, hogy végtelenül több információt gyűjtünk. A cél az, hogy előre meghatározzuk, mely bizonyítékok számítanak, és mindkét oldalra egyenletesen értékeljük őket."
      ],
      bullets: [
        "Használjon semleges kutatási kérdéseket.",
        "Ellenőrizze a ugyanazon bizonyíték-csoportokat mindkét csapatra vagy kimenetre.",
        "Kerülje, hogy azonnal abbahagyja a kutatást egy kedvező statisztika után.",
        "Jegyezze fel a fontos ellentétes bizonyítékokat, ne csak mentálisan elutasítsa őket.",
      ],
    },
    {
      id: "model-confirmation",
      heading: "Hogyan erősíthetik a modellek a megerősítési torzítást",
      paragraphs: [
        "Az elemző modellek csökkenthetnek néhány emberi torzítást, de eszközökké válhatnak a megerősítési torzításra.",
        "A fogadó erősen megbízhat egy modellben, ha az támogatja a meglévő véleményét, és kritizálja a modellt, ha nem. Ha több modell áll rendelkezésre, a fogadó a preferált választ adó modellt választja.",
        "Ez modellvásárlást eredményez: a kimenetet nem független bizonyítékként használják, hanem a már meglévő hiedelem érvényesítésére.",
        "A helyes megközelítés az, hogy meghatározzuk, hogyan fogjuk használni a modellt, mielőtt látjuk a kimenetet. Erősségei, gyengeségei, kalibrációja és a releváns piacok fontosabbak, mint hogy a jóslat megegyezik-e a fogadóval."
      ],
      callout: {
        title: "Az egyetértés nem érvényesítés",
        body:
          "Egy modell nem válik megbízhatóbbá csupán azért, mert ugyanazt a következtetést hozza, amit már akart.",
        tone: "warning",
      },
    },
    {
      id: "ai",
      heading: "Az AI-elemzés szintén szelvényesen használható",
      paragraphs: [
        "Az AI által generált elemzés meggyőzően hangozhat, mert folyékony magyarázatokat és szervezett érvelést ad.",
        "Ez a bemutatóminőség erősítheti a megerősítési torzítást, ha a felhasználó vezető kérdéseket tesz, mint például \"Magyarázd el, miért erős fogadás ez\", ahelyett, hogy kiegyensúlyozott bizonyítékot kérne.",
        "Egy AI rendszer tükrözheti a korlátait is az adataiban, a promptokban, a feltételezéseiben vagy az alapmodellben. Egy magabiztos magyarázatot ezért nem szabad bizonyítékként kezelni.",
        "Egy jobb AI használat ellenfele: kérdezze meg a legerősebb ellenérvet a választás ellen, a leginkább bizonytalan feltételezéseket, és a tényezőket, amelyek érvénytelenítenék a tézist."
      ],
      bullets: [
        "Kérdezze meg a bizonyítékot a preferált kimenet ellen.",
        "Kérdezze meg, mely feltételezések a leginkább bizonytalanok.",
        "Kérdezze meg, milyen információ jelentősen megváltoztatná a valószínűségi becslést.",
        "Ne tekintse a kifinomult nyelvezetet bizonyítékként.",
      ],
    },
    {
      id: "narratives",
      heading: "Miért erősek a fogadási narratívák",
      paragraphs: [
        "A sport természetesen generál narratívákat: bosszújátékok, lendület, kötelező nyerési helyzetek, edzői változtatások, rivalizálási intenzitás és visszatérési történetek.",
        "Néhány narratív tényező releváns lehet, de könnyen túlságosan használhatók, mert emlékezetesek és érzelmileg kielégítőek.",
        "A megerősítési torzítás miatt a fogadó olyan narratívát választhat, amely illeszkedik a preferált eredményhez, miközben figyelmen kívül hagyja a másik irányba mutató, ugyanolyan valószínű történeteket.",
        "Például egy fogadó leírhatja egy csapatot motiváltnak három vereség után, míg egy másik leírhatja ugyanazt a csapatot alacsony önbizalommal. Mindkét történet ésszerűnek hangozhat. A fontos kérdés, hogy a narratívának mérhető előrejelző értéke van-e, és hogy a piac már tükrözi-e azt."
      ],
      callout: {
        title: "Egy jó történet nem automatikusan jó ár.",
        body:
          "A narratívák magyarázhatják az álláspontot anélkül, hogy bizonyítanák, hogy az esélyek kedvezőek.",
        tone: "info",
      },
    },
    {
      id: "price",
      heading: "A megerősítési torzítás elrejtheti az ár fontosságát.",
      paragraphs: [
        "Egy fogadó, aki erősen hisz, hogy egy kimenetel bekövetkezik, leállhat az árra való figyelésben.",
        "Ez súlyos hiba, mert a fogadási érték a valószínűség és az esélyek kombinációjától függ. Egy csapat nagy valószínűséggel nyerhet, de mégis vonzó lehetetlen, ha az ár túl rövid.",
        "A megerősítési torzítás ezt a helyzetet súlyosbítja, mert minden támogató tény növeli a bizalmat, míg a piaci ár kevesebb vizsgálatot kap.",
        "A helyes sorrend: a valószínűség becslése, a bizonytalanság ellenőrzése, majd az összehasonlítás a becslés és a rendelkezésre álló esélyek által sugallt megtérülési valószínűség között."
      ],
      callout: {
        title: "A győzelem helyes előrejelzése önmagában nem elég.",
        body:
          "Egy erős sporti vélemény még rossz fogadási döntés lehet, ha a rendelkezésre álló ár rosszabb, mint amit a valószínűség igazolna.",
        tone: "warning",
      },
    },
    {
      id: "market-movement",
      heading: "Az esélymozgás értelmezése torzított szempontból",
      paragraphs: [
        "A megerősítési torzítás befolyásolhatja, hogyan magyarázzuk a piaci mozgást.",
        "Ha az esélyek rövidülnek egy kedvelt választásnál, a fogadó úgy értelmezheti a mozgást, mint bizonyítékot arra, hogy a bölcs pénz egyetért. Ha az esélyek eltolódnak, ugyanaz a fogadó elutasíthatja a változást, mint értelmetlen könyvvezető manipulációnak.",
        "Az értelmezés megváltozik, mert a kívánt következtetés rögzítve marad.",
        "Egy semleges folyamat mindkét mozgást információnak tekintené, amelyet vizsgálni kell. Az árváltozás tükrözheti híreket, likviditást, piaci tevékenységet vagy kockázatkezelést, de az irány önmagában nem bizonyítja a fogadó eredeti nézetét."
      ],
    },
    {
      id: "social-media",
      heading: "A közösségi média erősítheti a megerősítési torzítást",
      paragraphs: [
        "A közösségi platformok megkönnyítik olyan közösségek megtalálását, amelyek megosztják a fogadási véleményeket.",
        "Miután egy fogadó bizonyos csapatokkal, tipsterekkel vagy fogadási narratívákkal kapcsolódik, a javaslatrendszerek hasonló tartalmat jeleníthetnek meg. Ez azt a benyomást keltheti, hogy \"mindenki\" ugyanazt az esélyt látja.",
        "A népszerűség nem javítja a várható értéket. Valójában a széles körben vitatott információ már tükröződhet az árban.",
        "Egy fegyelmezett fogadó szándékosan be kell, hogy vonzza azokat a forrásokat, amelyek ellentmondanak a preferált nézetnek, és el kell kerülni, hogy a közösségi konszenzust független bizonyítékként kezelje."
      ],
    },
    {
      id: "favorite-team",
      heading: "A kedvenc csapat torzítás és megerősítés",
      paragraphs: [
        "Az érzelmi kötődés erősíti a megerősítési torzítást. A rajongók több történetet és statisztikát ismernek kedvenc csapataikról, de az információt pozitívabban értelmezhetik.",
        "A jó teljesítmények élénkülnek. A rossz teljesítményeket bírák, sérülések, szerencsétlenség vagy szokatlan körülmények hibáztatják.",
        "Ugyanaz a mintázat fordított irányban is előfordulhat a kedvetlen csapatokkal. A negatív bizonyítékok emlékezetesebbek, míg a jó teljesítményeket elutasítják.",
        "Ha a személyes kötődés erős, egy hasznos szabály az, hogy ne fogadj a csapatra, vagy kérj egy explicit ellenérvet, mielőtt cselekszel."
      ],
    },
    {
      id: "post-result",
      heading: "Megerősítési torzítás a találat után",
      paragraphs: [
        "A torzítás nem ér véget, amikor a mérkőzés elkezdődik. A találat után a fogadók gyakran újraértelmezik, mi történt, hogy megvédjék az eredeti hitet.",
        "Ha a fogadás nyer, a találatot bizonyítékként emlékezzük, hogy az elemzés helyes volt. Ha veszít, a veszteséget teljesen a szerencsétlenség, bírák vagy egyetlen szokatlan esemény hibáztatásával magyarázzuk.",
        "Néha ezek a magyarázatok érvényesek. De ha minden győzelem a képességet bizonyítja, és minden veszteséget elutasítanak varianciaként, a folyamat soha nem értékelhető őszintén.",
        "Egy jobb áttekintés azt kérdezi, hogy az eredeti valószínűség, ár és feltételezések ésszerűek voltak-e a találat előtt, és hogy hasonló érvelés jól teljesít-e egy nagyobb mintában."
      ],
      callout: {
        title: "A tezisednek lehetővé kell, hogy kudarcot valljon",
        body:
          "Ha egyetlen eredmény vagy bizonyíték sem számíthat ellen a stratégiát, az értékelési folyamat nem falszifikálható.",
        tone: "warning",
      },
    },
    {
      id: "disconfirming-evidence",
      heading: "Aktívan keress ellenérveket",
      paragraphs: [
        "Az egyik legerősebb védelem a megerősítési torzítás ellen, ha szándékosan keresed a fogadás hibájának okait.",
        "A fogadás előtt jegyezd fel a legerősebb ellenérvet, a kulcsfeltételezéseket, amelyek kudarcot okozhatnak, és az információt, amely a jelenlegi árat vonzótalanítaná.",
        "Ez nem jelenti azt, hogy automatikusan ellen a kezdeti nézetnek fogadj. A cél az, hogy teszteld, túléli-e a tezis a komoly ellenállás.",
        "Ha a fogadás még mindig vonzó, a legerősebb ellenérvek figyelembevételét követően, a következtetés erősebb."
      ],
      bullets: [
        "Mi a legerősebb ellenérv a fogadás ellen?",
        "Melyik feltételezés a leginkább bizonytalan?",
        "Milyen információ tenné a fogadást törléseképesé?",
        "Melyik statisztikát vagy narratívát hagyom mostanában figyelmen kívül?",
        "Másképp értelmezném ugyanazt az bizonyítékot, ha a másik csapatot kedvelném?",
      ],
    },
    {
      id: "pre-mortem",
      heading: "Használj előzetes halálvizsgálatot",
      paragraphs: [
        "Az előzetes halálvizsgálat egy egyszerű technika: képzeld el, hogy a fogadás már elveszett, és kérdezd meg, mi lenne a legvalószínűbb magyarázat.",
        "Talán a kedvenc csapat küzdött egy alacsony blokkal, a kezdő dobó korlátozott terheléssel rendelkezett, a sérülésjelentés hiányos volt, vagy a piaci ár már felvitte a feltételezett előnyt.",
        "A gyakorlat a figyelmet a kudarc módjaira irányítja, mielőtt pénzt kockáztatnánk, nem pedig az eredmény után, amikor azok nyilvánvalóvá válnak.",
        "Az előzetes halálvizsgálat különösen hasznos, ha a fogadó különösen magabiztos."
      ],
      callout: {
        title: "Képzeld el, hogy hibázol, mielőtt fogadnál",
        body:
          "Ha előre azonosíthatod a reális kudarc-szcenáriókat, a valószínűségbecslés kiegyensúlyozottabbá válhat.",
        tone: "example",
      },
    },
    {
      id: "probability-ranges",
      heading: "Használjon valószínűségi tartományokat a pontatlan pontosság helyett",
      paragraphs: [
        "A megerősítési torzítás gyakran a valószínűségi becsléseket a legelőnyösebb szegmens felé tolja",
        "Egy fogadó 60%-os értéket adhat egy választásnak, miközben a bizonyítékok valószínűleg 52% és 60% között állnak",
        "A tartomány használata megmutatja, mennyire érzékeny a döntés. Ha a fogadás csak a legoptimista becslésnél rendelkezik pozitív várható értékkel, a szél lehet sebezhető",
        "Ez a megközelítés a bizonytalanságot láthatóvá teszi, ahelyett, hogy egyetlen pontos szám mögé rejtőzne"
      ],
    },
    {
      id: "checklist-process",
      heading: "Készítsen Rögzített Döntési Ellenőrzőlistát",
      paragraphs: [
        "Egy szabványosított ellenőrzőlista csökkenti a szabadon változtatható elemzési folyamatok szabadságát, függetlenül attól, melyik kimenetet szeretné a fogadó",
        "Azonos kategóriákat kell átnézni minden fogadásnál: piacdefiníció, aktuális ár, implícit valószínűség, sérülések, ütemterv, releváns teljesítményadatok, modellbecslés, bizonytalanság, piaci mozgás és tétméret",
        "A rögzített ellenőrzőlista nem távolítja el a torzítást, de nehezíti a szűkített elemzést, mert a fogadónak minden alkalommal ugyanazokat a kérdéseket kell megválaszolnia",
        "Írásos feljegyzések segítik a későbbi ismétlődő vakhelyek felfedezését"
      ],
      bullets: [
        "Határozza meg a piacot pontosan",
        "Jegyezze fel az aktuális oddsokat és a break-even valószínűséget",
        "Írja le a valószínűségi becslést, mielőtt érzelmileg elköteleződik",
        "Sorolja fel a választást támogató bizonyítékokat",
        "Soroljuk fel a választás ellenére álló bizonyítékokat.",
        "Ellenőrizze, hogy az új információ már be van-e árazva",
        "Tesztelje az EV-t egy konzervatívabb valószínűségi becslés mellett",
        "Tartsa a tétet a szokásos bankroll szabályon belül",
      ],
    },
    {
      id: "matchsignal",
      heading: "Hogyan alkalmazódik a megerősítési torzítás a MatchSignal-re",
      paragraphs: [
        "A MatchSignal struktúrált mezőket kínál, beleértve a Legjobb Odds, Piaci Átlag, Igazságos Valószínűség, Érték Szél, Mintavételezett Könyvek és Kockázati Szintet",
        "E mezők rendszerezett elemzést tesznek lehetővé, de még mindig szűkíthető értelmezésre. Egy felhasználó a pozitív Érték Szélre összpontosíthat, ha az kedvező csapatot támogatja, és figyelmen kívül hagyhatja a hasonló jeleket a kedvetlen csapatokra",
        "Az alacsony kockázat címke is megerősítő eszközzé válhat, ha a felhasználó bizonyítékként kezeli, nem pedig összehasonlító elemző jeleként",
        "A jobb megközelítés az, hogy a MatchSignal kártyákat ugyanazokkal a szabályokkal értékeljük, függetlenül attól, hogy a jóslat megegyezik-e a felhasználó előzetes véleményével. A modell kimenetét tesztelni kell, nem automatikus hitelesítésként használni"
      ],
      callout: {
        title: "Használja ugyanazt a szabványt, ha a modell nem ért egyet",
        body:
          "Egy struktúrált eszköz a leghasznosabb, ha a kimenetét következetesen értékelik, nem csak akkor fogadják el, ha megerősíti a meglévő hiedelmet",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Megerősítési torzítás ellenőrzőlista",
      paragraphs: [
        "Használja ezt az ellenőrzőlistát a fogadási döntés véglegesítése előtt"
      ],
      bullets: [
        "Megalkottam egy erős véleményt, mielőtt átnéztem volna a teljes bizonyítékot?",
        "Kifejezetten kerestem olyan okokat, amelyek miatt hibás lehet a véleményem?",
        "Egy kedvező statisztikát fontosabbnak tartok, mint a szélesebb bizonyítékot?",
        "Megbíznék-e ugyanabban a mértékben ebben a modellben, ha ellentmondana nekem?",
        "Elhanyagolom-e a piaci mozgást, mert ellentétes a véleményemmel?",
        "A piac már árazta be a kedvelt információimat?",
        "Ugyanazt a magyarázatot adnám-e, ha a csapatneveket elrejtenék?",
        "A fogadás még vonzó marad egy konzervatívabb valószínűségi becslés mellett?",
        "Leírta a legerősebb ellenérvet?",
        "A tét a normál előre meghatározott határnál belül van?",
      ],
    },
  ],
  relatedGuides: [
    "cognitive-biases-sports-betting",
    "winning-streaks-misleading",
    "why-chasing-losses-is-dangerous",
    "variance-sports-betting",
    "expected-value-sports-betting",
    "ai-sports-betting-predictions",
  ],
  responsibleGamblingNote:
    "A megerősítési torzítás növelheti a bizalmat és ösztönözheti a nagyobb vagy gyakrabban fogadott téteket, még akkor is, ha a bizonyíték gyenge. Használjon előre meghatározott kiadás-, tét-, veszteség- és időkorlátokat, tartsa a fogadási pénzt a szükséges pénztől külön, és álljon le, ha a fogadás pénzügyi vagy érzelmi károsodást okoz. Egyetlen modell, narratíva vagy elemző jel nem garantál eredményt.",
};

export default guide;
