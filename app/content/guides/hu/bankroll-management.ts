import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bankroll-management",
  locale: "hu",
  title: "Bankroll-kezelés magyarázata",
  category: "bankroll-risk",
  status: "published",
  description:
    "Tudja meg, hogyan működik a bankroll-kezelés sportfogadásban, miért fontos a tétméret és a kockázati határ, hogyan befolyásolják a drawdown-ok és a variancia a bankrollt, és hogyan csökkentheti a fegyelmezett tétel a pusztulás kockázatát.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A bankroll-kezelés a folyamat, amely során eldöntik, mennyi pénzt szánnak a fogadásokra, és mennyit kockáztatnak az egyes fogadásokon. Nem növeli a választás nyerési valószínűségét, de csökkentheti a veszteségi sorozatok, a variancia és a helytelen becslések által okozott károkat. A jó bankroll-kezelés elsősorban a túlélésről, a konzisztenciáról és a pénzügyi károk korlátozásáról szól. Segít megelőzni, hogy egy rossz sorozat teljesen kiürítse a bankrollt, és csökkenti a kényszeres döntések meghozatalának kísértését nyerés vagy veszteség után.",
  keyTakeaways: [
    "A fogadási bankrollnak külön kell lennie a mindennapi kiadásokra, számlákra, megtakarításokra vagy vészhelyzetekre szánt pénztől.",
    "A tétméret szabályozza, hogy az egyes eredmények milyen mértékben befolyásolják a bankrollt.",
    "A kisebb százalékos tétel általában csökkenti a volatilitást és a pusztulás kockázatát.",
    "Nincs olyan tételrendszer, amely egy negatív várható értékű stratégiát pozitívvá tehet.",
    "A bankroll szabályait előre kell meghatározni, mielőtt érzelmi nyomás, nyerés vagy veszteség jelentkezne.",
    "A drawdown-ok normálisak bizonytalan folyamatokban, és tervezésre van szükség.",
    "A veszteségek üldözése a tét növelésével gyorsan növelheti a pénzügyi kockázatot.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Mi az a fogadási bankroll?",
      paragraphs: [
        "A fogadási bankroll egy dedikált pénzösszeg, amelyet kifejezetten a fogadási tevékenységre szánnak. Pénzügyileg külön kell lennie a bérleti díjaktól, jelzálogkifizetésektől, élelmiszertől, adósságfizetésektől, vészhelyzeti megtakarításoktól és egyéb alapvető forrásoktól.",
        "Ez a szétválasztás egyértelmű határt teremt. Ha a bankroll csökken, a veszteség a már megadott, elveszthető összegben marad.",
        "Ezért a bankrollt kockázati tőkének kell tekinteni, nem pedig jövedelemnek. A fogadási hozamok bizonytalanok, és még egy pozitív várható értékű folyamat is hosszú veszteségi időszakokat tapasztalhat."
      ],
      callout: {
        title: "A bankroll egy határ, nem cél",
        body:
          "A dedikált bankroll segít meghatározni, mennyi pénzügyi kockázat elfogadható. Soha ne finanszírozzák alapvető kiadásokra szánt pénzzel.",
        tone: "warning",
      },
    },
    {
      id: "why-management-matters",
      heading: "Miért fontos a bankroll-kezelés?",
      paragraphs: [
        "A sportfogadási eredmények bizonytalanok. Még a jó valószínűségbecslések is hibásak lehetnek egyes eseményeken, és a szokásos variancia veszteségi sorozatokat hozhat létre.",
        "Ha nincs szervezett tételkövetés, a fogadó túl sokat kockáztathat egyetlen választásra, a veszteségek után növelheti a tétet, vagy egy rövid nyerő sorozat túlzott önbizalmat kelthet.",
        "A bankroll-kezelés csökkenti ezeket a viselkedési és matematikai kockázatokat, meghatározva a tétméreteket és a veszteségkorlátokat, mielőtt az eredmény ismert lenne.",
        "Nem távolíthatja el a veszteség lehetőségét, de a normális variancia pénzügyi hatását kezelhetőbbé teheti."
      ],
    },
    {
      id: "unit-size",
      heading: "Mi az a fogadási egység?",
      paragraphs: [
        "Az egység egy szabványosított módja a tétméret kifejezésének. Ahelyett, hogy minden fogadást pénznemben vitatnánk, a fogadó egy egységet egy fix százalékos vagy fix összegként határozhat meg a bankrollból.",
        "Például, ha a bankroll 1 000 pénznem egység, és egy fogadási egység a bankroll 1%-a, akkor egy egység 10 pénznem egység.",
        "Az egységek használata megkönnyíti a teljesítmény összehasonlítását időben, mert elválasztja az elemzést a fogadó személyes bankrollméretétől."
      ],
      bullets: [
        "Bankroll: 1 000.",
        "1% egység: 10.",
        "0,5% egység: 5.",
        "2% egység: 20.",
      ],
      callout: {
        title: "Az egységek szabványosítják a kockázatot",
        body:
          "Az egység önmagában nem ajánlott tét. Csak egy következetes mértékegység a kitettséghez.",
        tone: "info",
      },
    },
    {
      id: "fixed-vs-percentage",
      heading: "Fix tét vs százalékos tét",
      paragraphs: [
        "A fix tétel megkockáztatja ugyanazt a pénznemösszeget minden fogadásnál. A százalékos tétel a jelenlegi bankroll egy fix százalékát kockáztatja.",
        "A fix tétel esetén egy 10-egységű fogadás 10 egység marad, függetlenül a bankroll emelkedésétől vagy csökkenésétől. A százalékos tétel esetén a tét automatikusan csökken a veszteségek után és nő a nyeremények után.",
        "A százalékos tétel ezért csökkentheti a kockázatot drawdown-ok során, mert a kitettség a bankrollmal együtt csökken. A fix tétel egyszerűbb, és könnyebbé teheti a teljesítmény nyomon követését.",
        "Semelyik módszer sem hoz előnyt. Az alapvető valószínűség és az ár még mindig meghatározza, hogy a fogadási döntés pozitív vagy negatív várható értékkel rendelkezik-e."
      ],
      bullets: [
        "Fix tét: ugyanaz a pénznemösszeg minden alkalommal.",
        "Százalékos tét: ugyanaz a százalék a jelenlegi bankrollból.",
        "A fix tét egyszerű és stabil.",
        "A százalékos tét automatikusan igazodik a bankroll változásához.",
      ],
    },
    {
      id: "stake-size",
      heading: "Miért a tétméret a fő kockázati döntés?",
      paragraphs: [
        "A tétméret határozza meg, mennyi károsodást okozhat egy veszteség, és milyen gyorsan halmozódhat egy veszteség sorozata.",
        "Ha egy fogadó a bankroll 1%-át kockáztatja minden fogadásnál, tíz egymást követő teljes veszteség nem csökkenti a bankrollt 100%-kal. Ha ugyanaz a fogadó a bankroll 10%-át kockáztatja, egy normális veszteség sorozat súlyos drawdown-t eredményezhet.",
        "A nagy tétel mind a nyereséget, mind a veszteséget növeli. Nem növeli a helyes választás valószínűségét.",
        "Mivel a valószínűségbecslések bizonytalanok, a konzervatív tétméretek biztonsági margót nyújtanak a variancia és a modellhiba ellen."
      ],
      callout: {
        title: "A bizalom nem biztosítottság",
        body:
          "Egy magas bizalomú becslés mégis hibás lehet. A tétméretnek tükröznie kell a bizonytalanságot, ne feltételezze, hogy bármely fogadás biztonságos.",
        tone: "warning",
      },
    },
    {
      id: "risk-of-ruin",
      heading: "Mi az a pusztulás kockázata?",
      paragraphs: [
        "A pusztulás kockázata az a lehetőség, hogy a bankroll olyan messzire csökken, hogy a fogadás nem folytatható a szándékolt stratégia szerint.",
        "A kockázat nő, ha a tétel nagy a bankrollhoz képest, ha az alapvető stratégia kevés vagy semmilyen előnyt nem tartalmaz, ha az eredmények rendkívül volatilisak, vagy ha több fogadás erősen korrelált.",
        "Még egy pozitív várható értékű stratégia is jelentős veszteségveszélyt hordozhat, ha a fogadási méretek túl agresszívak. Ez az oka annak, hogy a bankroll-kezelés nem választható el a várható érték és a variancia elől.",
        "A fogadási méret csökkentése általában csökkenti a veszteségveszélyt, bár a nyereségek felhalmozódásának sebességét is csökkenti kedvező időszakokban."
      ],
    },
    {
      id: "drawdowns",
      heading: "A visszabocsátások tervezése",
      paragraphs: [
        "A visszabocsátás a korábbi bankrollcsúcs csökkenése egy későbbi alacsonyabb pontra. A visszabocsátások elkerülhetetlenek bizonytalan folyamatokban.",
        "Tegyük fel, hogy egy bankroll 100 egységből 130 egységre emelkedik, majd később 110 egységre csökken. A csúcsból származó visszabocsátás 20 egység, vagyis körülbelül 15,4 % a 130 egység csúcsra.",
        "A visszabocsátások tervezése azt jelenti, hogy előre elfogadjuk, hogy veszteségi időszakok fogynak, és biztosítjuk, hogy a fogadási módszer túlélje ezeket anélkül, hogy érzelmi vagy pénzügyi döntéseket kényszerítene.",
        "A fogadó, aki feltételezi, hogy a bankroll simán emelkedni fog, nagyobb valószínűséggel pánikba esik, növeli a kockázatot vagy elhagyja a szabályokat, amikor a normál variancia megjelenik."
      ],
      callout: {
        title: "Tervezés a csökkenés előtt",
        body:
          "A kockázati szabályok a leginkább hasznosak, ha a veszteségek előtt létrehozottak, mielőtt érzelmi nyomás alakulna ki.",
        tone: "info",
      },
    },
    {
      id: "chasing",
      heading: "Miért veszélyes a veszteségek üldözése",
      paragraphs: [
        "A veszteségek üldözése azt jelenti, hogy a fogadási méretet elsősorban a korábbi fogadásokon elvesztett pénz visszaszerzése érdekében növelik. Ez megváltoztatja a következő döntés célját, amely a saját árának és valószínűségének értékeléséből a korábbi eredmény javítására vált.",
        "Az eljárás veszélyes, mert a veszteségek folytatódhatnak. Ha a fogadási méret minden veszteség után nő, a kitettség gyorsan emelkedhet, miközben a következő fogadás alapszintű valószínűsége változatlan marad.",
        "A Martingale-szerű rendszerek ezt a problémát illusztrálják. A veszteségek után duplázás esetén úgy tűnhet, hogy a nyereség garantált, ha végül nyernek, de a valós bankrollok, a sportfogadási limitek, a veszteségi sorozatok és a véges tőke a rendszert katasztrofális veszteségre hajlamosítják.",
        "Egy fegyelmezett bankroll-prozess a következő fogadást előre meghatározott szabályok alapján határozza meg, nem pedig a korábban elvesztett összeg alapján."
      ],
      callout: {
        title: "A következő fogadás nem tartozik a korábbi veszteséghez",
        body:
          "A múltbeli eredmények nem teszik a következő fogadást valószínűbbé. A fogadási méret növelése a veszteségek visszaszerzésére növeli a kitettséget, nem a valószínűséget.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "Mi a Kelly kritérium?",
      paragraphs: [
        "A Kelly kritérium egy matematikai keretrendszer a fogadások méretének meghatározására a becsült előny és az odds alapján. Elméletben a cél a hosszú távú logaritmikus bankroll növekedésének maximalizálása, amikor a valószínűségek pontosan ismertek.",
        "A gyakorlati probléma az, hogy a fogadási valószínűségek nem ismertek biztosan. Egy kis hiba a becsült előnyben olyan fogadást eredményezhet, amely túl nagy.",
        "Ezért egyes fogadók a részleges Kelly-t használják, például fél-Kelly vagy negyed-Kelly, hogy csökkentsék a volatilitást és a becslési hibák következményeit.",
        "A Kelly nem garancia, és nem szabad nagy fogadások indoklásaként kezelni. A kimenete csak annyira megbízható, amennyire a használt valószínűségi becslés."
      ],
      bullets: [
        "A teljes Kelly rendkívül volatilis lehet.",
        "A részleges Kelly csökkenti a kitettséget.",
        "Helytelen valószínűségi becslések túlzott Kelly fogadásokhoz vezethetnek.",
        "A Kelly nem hozhat pozitív várható értéket, ahol nincs.",
      ],
    },
    {
      id: "flat-staking",
      heading: "Miért gyakran hasznos a sima fogadás a kiértékeléshez",
      paragraphs: [
        "A sima fogadás azt jelenti, hogy minden fogadásnál ugyanazt az egységméretet használjuk. Egyszerű, és könnyebben értékelhető, hogy a választások önmagukban mennyire teljesítettek.",
        "Ha a fogadási méret drasztikusan változik egy fogadásról a másikra, néhány nagy fogadás uralkodhat a nyereség- és veszteségjegyzékben, és elrejtheti az alapvető választási folyamat minőségét.",
        "A sima fogadás nem optimalizálja a teoretikus bankroll növekedést, de egyszerűsége javíthatja a fegyelmet és átláthatóbbá teheti a modell kiértékelését.",
        "A felhasználók számára, akik megtanulják, hogyan viselkedik egy stratégia, a konzisztencia értékesebb lehet, mint a bonyolult fogadási optimalizáció."
      ],
    },
    {
      id: "percentage-staking",
      heading: "Hogyan reagál a százalékos fogadás a bankroll változásaira",
      paragraphs: [
        "A százalékos fogadás a jelenlegi bankroll egy fix részét veszi. Ha a bankroll csökken, a fogadás automatikusan csökken. Ha a bankroll nő, a fogadás fokozatosan nő.",
        "Például 1 % fogadási arány esetén egy 1 000 egységű bankroll 10 egységű fogadást eredményez. Ha a bankroll 800 egységre csökken, a következő 1 % fogadás 8 egység lesz.",
        "Ez természetes védelmi mechanizmust hoz létre veszteségi időszakokban. Ugyanakkor azt is jelenti, hogy a fogadási méretek folyamatosan változnak, ami kevésbé intuitív lehet a teljesítmény elemzésekor.",
        "A sima és a százalékos fogadás közötti választás a bankrollrendszer céljától függ, de mindkettő konzervatív feltételezéseket és fegyelmezett határokat igényel."
      ],
    },
    {
      id: "correlation",
      heading: "A korrelált fogadások növelhetik a bankroll kockázatát",
      paragraphs: [
        "Egy bankroll több kockázatnak lehet kitéve, mint a különálló fogadási méretek azt sugallják, ha több fogadás ugyanazon alapvető eseményre épül.",
        "Például egy labdarúgó csapat győzelmére, a csapat csatárosának góljára és a mérkőzés 2,5 feletti gólra való fogadására együttesen átfedő kitettséget hozhat létre ugyanarra a játékszkriptre.",
        "Ha mindhárom fogadást független 1 % pozícióként kezelik, a valós kockázati koncentráció sokkal magasabb lehet, mint 1 %.",
        "Ezért a bankroll-kezelésnek figyelembe kell vennie a kapcsolódó kimenetek teljes kitettségét, nem csupán az egyes jegyeken szereplő fogadási összeget."
      ],
      callout: {
        title: "Számítsuk a kitettséget, ne csak a jegyeket",
        body:
          "Több korrelált fogadás egy nagyobb pozícióként viselkedhet.",
        tone: "warning",
      },
    },
    {
      id: "limits",
      heading: "Állítsa be a kiadás, veszteség és időkorlátokat",
      paragraphs: [
        "A bankroll-kezelés nem csupán matematikai gyakorlat. A felelősségteljes fogadás a kiadás, a veszteség és az idő korlátait is igényli.",
        "A veszteségkorlát meghatározza, hogy mennyi a bankrollból elveszthető összeg egy adott időszak alatt, mielőtt a fogadás leállna. A befizetési vagy kiadási korlát korlátozza, mennyi pénz jöhet be a fogadási számlára. Az időkorlát megakadályozza, hogy a fogadás egy szabálytalan tevékenységgé váljon.",
        "Ezek a korlátok a leginkább hatékonyak, ha a fogadás megkezdése előtt vannak beállítva, és nehezen változtathatók meg impulzív módon veszteségi vagy nyerő sorozat közben.",
        "Ha a fogadás pénzügyi stresszt okoz, elrejti a veszteségeket, pénzt kölcsönöz, vagy befolyásolja a mindennapi életet, a helyes válasz a leállás, nem a fogadási képlet optimalizálása."
      ],
      callout: {
        title: "A kockázatkezelés magában foglalja a tudatosságot, mikor ne fogadjunk",
        body:
          "Nincs olyan bankroll-stratégia, amely helyettesítené a leállást, ha a fogadás pénzügyi vagy érzelmi károkat okoz.",
        tone: "warning",
      },
    },
    {
      id: "records",
      heading: "Miért fontos a nyilvántartás",
      paragraphs: [
        "A bankroll folyamatot nehéz értékelni nyilvántartás nélkül. Hasznos nyilvántartások tartalmazzák a dátumot, sportot, piacot, választást, odds-ot, tétet, eredményt, nyereséget vagy veszteséget, valamint a bankrollt a kiegyenlítés után.",
        "A valószínűségi becslés és a piaci ár rögzítése is segíthet meghatározni, hogy az elemzés jól kalibrált-e, és hogy a fogadó állandóan versenyképes odds-ot kapott-e.",
        "A nyilvántartások csökkentik a memóriára való támaszkodást, amely gyakran torzítja a nagy nyeremények, fájdalmas veszteségek és a legutóbbi események iránt.",
        "Egy tiszta nyilvántartás megkönnyíti a stratégiai valódi problémák és az egyszerű variancia megkülönböztetését."
      ],
      bullets: [
        "Dátum és esemény.",
        "Piac és választás.",
        "Elfogadott odds.",
        "Tét mérete.",
        "Eredmény és nyereség/veszteség.",
        "Bankroll a kiegyenlítés után.",
        "Opcionális valószínűségi becslés és piaci referencia.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Hogyan kapcsolódik a Bankroll Management a MatchSignalhez",
      paragraphs: [
        "A MatchSignal elemzési kontextust nyújt, mint a Best Odds, Market Avg, Fair Probability, Value Edge, Books Sampled és Risk Tier. Ezek a mezők arra szolgálnak, hogy a felhasználók megértsék a piaci árak és a valószínűség-alapú elemzés közötti kapcsolatot.",
        "Nem határozzák meg, mennyi pénzt kell tételre fordítani. Egy alacsony kockázatú jelzés nem garantál siker, és egy nagyobb Value Edge sem jelenti automatikusan a tét növelésének engedélyét.",
        "A tét mérete egy külön személyes kockázati keretrendszer része marad, amely a megengedhetőséget, a bizonytalanságot, a bankroll méretét és a felelősségteljes szerencsejáték határait veszi figyelembe.",
        "A MatchSignal elemzés információs jellegű, és nem helyettesítheti a személyes pénzügyi ítélőképességet vagy a fegyelmezett bankroll ellenőrzést."
      ],
      callout: {
        title: "A jelzés erőssége nem tétel tanács",
        body:
          "A MatchSignal nem garantál eredményeket, és elemzési mezőit nem szabad automatikus tételméret-szabályozásként használni.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Gyakorlati Bankroll Management ellenőrzőlista",
      paragraphs: [
        "Egy egyszerű bankroll keretrendszer hatékonyabb lehet, mint egy bonyolult rendszer, amely nehezen követhető."
      ],
      bullets: [
        "Különítsd el a fogadási bankrollt a szükséges pénztől.",
        "Válassz konzervatív alap tétet a fogadás megkezdése előtt.",
        "Használj egyenletes vagy százalékos tételzést következetesen.",
        "Kerüld a tét növelését a legutóbbi veszteségek miatt.",
        "Fontold meg a több fogadás közötti korrelált kitettséget.",
        "Tervezd meg a normál visszafordulásokat és veszteség sorozatokat.",
        "Kövesd nyomon minden fogadást, és pontosan frissítsd a bankrollt.",
        "Állíts be kiadási, veszteség- és időkorlátokat.",
        "Csökkentsd vagy állítsd le a fogadást, ha a pénzügyi vagy érzelmi nyomás nő.",
        "Soha ne feltételezd, hogy bármilyen tételrendszer garantál profitot.",
      ],
    },
  ],
  relatedGuides: [
    "variance-sports-betting",
    "flat-stakes-vs-percentage-staking",
    "why-chasing-losses-is-dangerous",
    "expected-value-sports-betting",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "A bankroll menedzsment csökkentheti a pénzügyi kitettséget, de nem teszi biztonságossá a fogadást vagy garantálja a profitot. Tartsd a fogadási pénzt a szükséges forrásoktól külön, állíts be szigorú kiadási és veszteségkorlátokat, kerüld a kölcsönfelvételt vagy a veszteségek üldözését, és állítsd le, ha a fogadás pénzügyi vagy érzelmi károkat okoz.",
};

export default guide;
