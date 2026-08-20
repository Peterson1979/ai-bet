import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "flat-stakes-vs-percentage-staking",
  locale: "hu",
  title: "Tétek egységessége vs. százalékos tétel",
  category: "bankroll-risk",
  status: "published",
  description:
    "Hasonlítsa össze a tétel egységességét és a százalékos tételét a sportfogadásban, értsen meg, hogyan befolyásolja mindkét módszer a bankroll volatilitását, a csökkenéseket, a nyilvántartást és a kockázatot, és tanulja meg, mikor lehet könnyebb kezelni az egyes megközelítéseket.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A tétel egységessége és a százalékos tétel két gyakori módja annak, hogy eldöntsük, mennyi a fogadási bankrollból kockáztatandó minden fogadásra. A tétel egységessége ugyanazt a tételösszeget használja többször, míg a százalékos tétel a jelenlegi bankroll egy fix százalékát használja, ami miatt a tételméret emelkedik vagy csökken a bankroll változásával. Semelyik megközelítés önmagában nem hoz előnyt. Céljuk a kockázatkezelés és a konzisztencia. A jobb választás attól függ, mennyi egyszerűséget, stabilitást és automatikus bankroll-beállítást szeretne a fogadó.",
  keyTakeaways: [
    "A tétel egységessége ugyanazt a tételösszeget használja a fogadások során, míg a százalékos tétel a jelenlegi bankroll egy fix százalékát használja.",
    "A tétel egységessége egyszerű, és a stratégia teljesítményét könnyen értékelhető.",
    "A százalékos tétel automatikusan csökkenti a kitettséget a csökkenések során, és növeli a kitettséget a bankroll növekedése után.",
    "Semelyik tételmódszer nem teszi nyereségessé a negatív várt értékű stratégiát.",
    "A nagy tétel százalékok súlyos volatilitást okozhatnak, még akkor is, ha a tétel szabály önmagában konzisztens.",
    "Az alapul szolgáló valószínűség és árképzés minősége fontosabb, mint a tétel formula.",
    "Egy tételtervet a fogadás megkezdése előtt kell kiválasztani, és nem szabad impulzívan megváltoztatni nyeremények vagy veszteségek után.",
  ],
  sections: [
    {
      id: "flat-staking",
      heading: "Mi az egységes tétel?",
      paragraphs: [
        "Az egységes tétel azt jelenti, hogy minden fogadásra ugyanazt a fix összeget kockáztatjuk, függetlenül a legutóbbi eredményektől vagy a bankroll méretének változásától.",
        "Például egy fogadó úgy dönthet, hogy egy egység 10 pénznem egység, és minden választásra egy egységet tesz. Legyen a bankroll 1 000-ról 1 100-re nő, vagy 900-re csökken, a következő tét 10 marad.",
        "A fő előny az egyszerűség. A teljesítményt könnyű nyomon követni, mert a nagy tételváltozások nem torzítják a rekordot. Ha egy stratégia nyer vagy veszít, az eredmény elsősorban a választások és az árak által meghatározott, nem a pozícióméret agresszív változásai."
      ],
      callout: {
        title: "Az egységesség nem jelent kockázatmentességet",
        body:
          "Egy fix tét még túl nagy lehet a bankrollhoz képest egy jelentős csökkenés után.",
        tone: "warning",
      },
    },
    {
      id: "percentage-staking",
      heading: "Mi a százalékos tétel?",
      paragraphs: [
        "A százalékos tétel a jelenlegi bankroll egy fix százalékát kockáztatja minden fogadásra. Ha a bankroll változik, a tét is változik vele.",
        "Tegyük fel, a bankroll 1 000, és a tétel szabály 1 %. Az első tét 10. Ha a bankroll később 800-re csökken, a következő 1 % tét 8. Ha a bankroll 1 200-re nő, a következő tét 12.",
        "Ez egy automatikus beállító mechanizmust hoz létre. A kitettség csökken a veszteség időszakokban, és fokozatosan nő a nyerés időszakokban."
      ],
      bullets: [
        "1 000 bankroll 1 % → 10 egység tét.",
        "800 bankroll 1 % → 8 egység tét.",
        "1 200 bankroll 1 % → 12 egység tét.",
      ],
    },
    {
      id: "main-difference",
      heading: "A két módszer központi különbsége",
      paragraphs: [
        "A központi különbség az, hogy a tét pénznemben állandó marad, vagy a bankroll méretéhez viszonyítva állandó.",
        "Az egységes tét a fogadási méretet állandóvá teszi. A százalékos tétel a bankroll kockáztatott arányát körülbelül állandóvá teszi.",
        "Ez a különbség befolyásolja, hogyan viselkedik mindkét módszer a csökkenések során. Az egységes tét esetén a tét ugyanakkora, de a maradék bankroll százalékos aránya nő a veszteségek felhalmozódásával. A százalékos tétel esetén a tét automatikusan kisebb lesz.",
        "A bankroll növekedésekor a fordított történik. Az egységes tét kisebb százalékos arányt jelent a bankrollhoz képest idővel, míg a százalékos tét növekszik."
      ],
      callout: {
        title: "Állandó összeg vs. állandó arány",
        body:
          "Az egységes tét stabilizálja a tétösszeget. A százalékos tétel stabilizálja a bankroll kockáztatott arányát.",
        tone: "info",
      },
    },
    {
      id: "drawdowns",
      heading: "Hogyan viselkedik minden módszer a csökkenések során",
      paragraphs: [
        "A csökkenések olyan időszakok, amikor a bankroll egy korábbi csúcsáról csökken. A sportfogadásban normálisak, mert a variancia veszteség-sorozatokat hozhat, még akkor is, ha az alapjárat ésszerű.",
        "A lapos tét nem reagál automatikusan a csökkenésre. Ha a fogadó 10 egységet kockáztat tovább, miközben a bankroll 1 000-ról 700-re csökken, a tét 1 % -ról körülbelül 1,43 % -ra nő a bankrollból.",
        "A százalékos tét automatikusan reagál. Egy 1 % tét 700 bankrollnál 7 egység, csökkentve a további veszteségek nagyságát pénzügyi szempontból.",
        "Ez a védekező funkció az egyik legerősebb érve a százalékos tétnek, különösen, ha a bankroll megőrzése a fő cél."
      ],
    },
    {
      id: "growth",
      heading: "Hogyan viselkedik minden módszer a bankroll növekedése során",
      paragraphs: [
        "Amikor a bankroll nő, a lapos tét fokozatosan konzervatívabbá válik, mert a fix tét a teljes tőke egy kisebb százalékát jelenti.",
        "Ha egy 10-egységű tét eredetileg 1 % volt egy 1 000 bankrollnál, akkor csak 0,67 % -t jelent egy 1 500 bankrollnál.",
        "A százalékos tét a bankrollmal növeli a tétet. 1 % -nál egy 1 500 bankroll 15 egységű tétet eredményez. Ez lehetővé teszi a pozícióméret kompozitálását a tőke növekedésével.",
        "A kompozíció felgyorsíthatja a nyereségeket kedvező időszakokban, de a nagyobb tételű veszteségek abszolút nagyságát is növeli, amikor a nagyobb tétel végül veszteséghez vezet."
      ],
      callout: {
        title: "A kompozíció mindkét irányban működik",
        body:
          "A százalékos tét a bankroll növekedésével növeli a tétméretet, de a jövőbeli veszteségek is nagyobbak abszolút értékben.",
        tone: "warning",
      },
    },
    {
      id: "record-keeping",
      heading: "Melyik módszer könnyebb értékelni?",
      paragraphs: [
        "A lapos tét általában könnyebb a fogadási stratégia minőségének értékelésére, mert minden választás ugyanakkora nominális súlyt hordoz.",
        "Ha 100 fogadás mindegyike egy egység, a nyereség- és veszteségjegyzék tükrözi a választási folyamat teljesítményét anélkül, hogy a nagy tétváltozás dominálna az eredményben.",
        "A százalékos tét változó tétméreteket hoz létre. Egy későbbi fogadás pénzügyi hatása nagyobb lehet, mint egy korábbi, csupán azért, mert a bankroll nőtt.",
        "Kutatás, modelltesztelés vagy stratégia összehasonlítás esetén a lapos egységek ezért tisztább teljesítményjegyzéket nyújtanak. A százalékos tét lehet alkalmasabb, ha a fő szempont a jelenlegi bankrollhoz viszonyított kitettség szabályozása."
      ],
    },
    {
      id: "variance",
      heading: "Variancia a lapos és százalékos tét mellett",
      paragraphs: [
        "Semelyik tétel nem távolítja el a varianciát a sporteredményekből. Mindkettő nyerési és veszteségi sorozatokat tapasztal.",
        "A különbség az, hogyan fordulnak át ezek az eredmények bankrollmozgásba. A százalékos tét esetén a pénzügyi nagyság automatikusan igazodik a bankroll méretéhez. A lapos tét esetén ugyanaz a pénzügyi ingadozás folytatódik, függetlenül a legutóbbi nyereségektől vagy veszteségektől.",
        "Konservatív tétméretek mellett mindkét megközelítés kezelhető volatilitást eredményezhet. Aggresszív tétméretek esetén mindkettő veszélyessé válhat.",
        "A százalék maga fontosabb, mint hogy a módszert lapos vagy százalékos tétnek hívják. Egy konzisztens 10 % tét sokkal veszélyesebb lehet, mint egy konzervatív 1 % lapos egység."
      ],
      callout: {
        title: "A konzisztencia nem elég",
        body:
          "Egy tétel szabály lehet tökéletesen konzisztens, de mégis túl agresszív. A tét nagysága a bankrollhoz viszonyítva kritikus marad.",
        tone: "warning",
      },
    },
    {
      id: "expected-value",
      heading: "A tétel nem teremt várható értéket",
      paragraphs: [
        "Egy tételrendszer nem alakíthat át egy rossz árat jóvá. A várható érték a valószínűség és az odds közötti kapcsolatból származik.",
        "Ha egy fogadás negatív várható értékkel rendelkezik, a 1 %, 2 % vagy egy lapos 10 egység kockázat nem változtatja meg az alapgazdasági feltételeket. Csak a várható veszteség nagyságát és a körüli volatilitást módosítja.",
        "Hasonlóképpen, egy pozitív várható értékű stratégia károsodhat a túlzott tétméret miatt. Egy valódi előny nem védi a bankrollt a pusztulástól, ha a kitettség túl agresszív.",
        "A helyes sorrend tehát: először értékelje a piacot és az árat, majd alkalmazzon kockázat-ellenőrzött tétel szabályt."
      ],
      bullets: [
        "A valószínűség és az ár meghatározza a várható értéket.",
        "A tétméret határozza meg a kitettséget.",
        "A tétváltoztatás a kimenetek méretét módosítja, nem pedig a bet alapvető minőségét.",
        "Nincs olyan tételrendszer, amely garantálja a profitot.",
      ],
    },
    {
      id: "percentage-example",
      heading: "Példa százalékos tételre",
      paragraphs: [
        "Vegyük egy 1 000 egységnyi bankrollt, amelyhez 2 % százalékos tétet alkalmazunk. Az első tét 20.",
        "Ha a fogadás elveszti, a bankroll 980, és a következő 2 % tét 19,60 lesz. Egy másik veszteség után 960,40 marad, és a következő tét 19,21.",
        "A tét a bankroll csökkenésével szűkül. Ez lassítja a veszteség abszolút sebességét, összehasonlítva a folyamatos 20 egység fix tételével.",
        "Ha a bankroll később növekszik, a folyamat fordul, és a tét fokozatosan nő."
      ],
      callout: {
        title: "Automatikus méretezés",
        body:
          "A százalékos tétel csökkenti az abszolút kitettséget a veszteségek során, anélkül, hogy a fogadó új, szubjektív döntést kellene hoznia.",
        tone: "example",
      },
    },
    {
      id: "flat-example",
      heading: "Példa egyenletes tételre",
      paragraphs: [
        "Most vegyük ugyanazt a 1 000 egységnyi bankrollt, amelyhez fix 20 egység tétet alkalmazunk.",
        "Egy veszteség után a bankroll 980, de a következő tét továbbra is 20. Két veszteség után a bankroll 960, és a harmadik tét még mindig 20.",
        "A fix összeg egyszerűsítést tesz lehetővé, de a tét most már körülbelül 2,08 % a kisebb bankrolltól, nem az eredeti 2 % -től.",
        "Ha a bankroll jelentősen csökken, a fix tétet felül kell vizsgálni, nem szabad, hogy egyre nagyobb százalékot képviseljen a fennmaradó tőkéből."
      ],
    },
    {
      id: "rebalancing",
      heading: "Hibrid megközelítés: időszakos kiegyensúlyozás",
      paragraphs: [
        "Néhány fogadó hibrid megközelítést alkalmaz: egy időszakra fix tét, majd időnként újraszámítja az egységméretet.",
        "Például egy egységet a hónap elején vagy a bankroll meghatározott mértékű változása után 1 % -ra állíthatunk.",
        "Ez megőrzi a fix tét egyszerűségét, miközben megakadályozza, hogy egy fix egység túl nagy vagy túl kicsi legyen a bankrollhoz képest.",
        "A kulcs az, hogy a kiegyensúlyozási szabályok előre meghatározottak legyenek. A tétméret állandó változtatása érzelmi nyeremények vagy veszteségek után elrontja a tétel keretrendszer célját."
      ],
    },
    {
      id: "confidence-staking",
      heading: "Megváltoztatják a tétet a bizalom alapján?",
      paragraphs: [
        "Néhány fogadó a tétméretet a feltételezett előny vagy bizalom alapján változtatja. Elméletben a erősebb pozitív várható érték nagyobb kitettséget igazolhat.",
        "A gyakorlati probléma a becslési hiba. Ha a fogadó túltúlóan magabiztos abban, hogy mely kiválasztásoknak a legnagyobb előnye van, a változó tétel fokozhatja a hibákat.",
        "Ezért a sima vagy egyszerű százalékos tétel gyakran könnyebben ellenőrizhető és ellenőrizhető. A fejlettebb változó tétel csak akkor szabad figyelembe venni, ha a valószínűségi becslések jól kalibráltak és szigorú maximális kitettségi korlátok vannak érvényben.",
        "Egy „magas bizalom” címke soha ne tekintse biztosnak."
      ],
      callout: {
        title: "A bizalom rosszul kalibrálható",
        body:
          "A változó tét fokozza mind a helyes, mind a helytelen bizalomértékeléseket.",
        tone: "warning",
      },
    },
    {
      id: "kelly",
      heading: "Hogyan tér el a Kelly kritérium",
      paragraphs: [
        "A Kelly kritérium sem egyenletes tét, sem egyszerű fix százalékos tétel nem. A becsült előny és az esélyek alapján számít egy ajánlott bankroll részarányt.",
        "Elméletben a Kelly a tétméretet az előrejelzett lehetőség erősségéhez igazítja. Gyakorlatban azonban rendkívül érzékeny a valószínűségi hiba.",
        "Ha a valószínűségbecslés túl optimista, a teljes Kelly túl nagy tétet javasolhat. Ezért gyakran használják a részleges Kelly megközelítéseket a volatilitás csökkentése érdekében.",
        "A legtöbb felhasználó számára a fontos tanulság nem az, hogy egyetlen képlet jobb. Az, hogy a bonyolultabb tételelmélet megbízhatóbb valószínűségbecslést és erősebb kockázatkezelést igényel."
      ],
    },
    {
      id: "psychology",
      heading: "Melyik módszer könnyebb érzelmileg követni?",
      paragraphs: [
        "A sima tétel könnyebbnek tűnhet, mert a mennyiség nem változik nyeremények vagy veszteségek után. Ez csökkenti a tétváltozások érzelmi reakcióként való értelmezésének kísértését.",
        "A százalékos tétel szintén támogatja a fegyelmet, mert a módosítás automatikus és szabályalapú. Egy kisebb tét veszteségek után nem büntetés; egyszerűen a kisebb bankroll eredménye.",
        "Problémák merülnek fel, amikor a fogadók elhagyják valamelyik módszert egy sorozat után. A tét növelése veszteségek után a pénz visszaszerzésére vagy a nyeremények után a túlteljesítmény miatt bevezetett szubjektív kockázatot jelent.",
        "A legjobb tételelmélet gyakran az, amelyet következetesen lehet követni anélkül, hogy ösztönözné az impulzív változtatásokat."
      ],
    },
    {
      id: "matchsignal",
      heading: "Hogyan kapcsolódik a tétel a MatchSignal-hez",
      paragraphs: [
        "A MatchSignal elemző kontextust nyújt, beleértve a Best Odds, Market Avg, Fair Probability, Value Edge, Books Sampled és Risk Tier mezőket.",
        "Ezek a mezők nem tételutasítások. Egy alacsony kockázatú osztályozás vagy nagyobb Value Edge nem kell automatikusan nagyobb tétet eredményezzen.",
        "A tétméretet egy külön személyes bankroll keretrendszernek kell meghatároznia, amely figyelembe veszi a megfizethetőséget, a bizonytalanságot, a varianciát és a felelősségteljes szerencsejáték határait.",
        "A MatchSignal elemzés információs jellegű, és nem garantálja az eredményeket, sem nem javasol konkrét pénzügyi kitettséget."
      ],
      callout: {
        title: "Az elemzés és a tétméret meghatározása külön döntések",
        body:
          "Egy erős analitikai jel nem távolítja el a bizonytalanságot, és nem szabad, hogy felülírja a konzervatív bankroll szabályokat.",
        tone: "warning",
      },
    },
    {
      id: "comparison",
      heading: "Sima tét vs. százalékos tétel: Oldalról oldalra",
      paragraphs: [
        "Mindkét módszer ésszerű lehet, ha a tétek konzervatívak és a szabályok következetesen betartottak. Erősségeik különbözőek."
      ],
      bullets: [
        "Sima tét: legegyszerűbb megérteni és nyomon követni.",
        "Sima tét: hasznos a stratégia teljesítményének értékelésére.",
        "Sima tét: túl nagy lehet a bankrollhoz képest egy mély csökkenés után.",
        "Százalékos tét: automatikusan csökkenti a kitettséget csökkenések során.",
        "Százalékos tét: automatikusan fektetődik a bankroll növekedése során.",
        "Százalékos tét: változó tétméretet hoz létre, ami kevésbé intuitív lehet az értékeléshez.",
        "Mindkét módszer: konzervatív tét szinteket igényel, és nem hozhat előnyt.",
      ],
    },
    {
      id: "checklist",
      heading: "Gyakorlati tételellenőrző lista",
      paragraphs: [
        "Bármelyik módszert is választja, a tétel szabályának egyszerűnek kell lennie, hogy mind nyerő, mind vesztes körülmények között követhesse."
      ],
      bullets: [
        "Különítsd el a fogadási bankrollt a szükséges pénztől.",
        "Válasszon sima vagy százalékos tételét a fogadás megkezdése előtt.",
        "Tartsa a tétet konzervatív módon a bankrollhoz képest.",
        "Ne növelje a tétet a veszteségek visszaszerzésére.",
        "Ellenőrizze, hogy a sima tét túl nagy lett-e egy csökkenés után.",
        "Ha százalékos tételét használja, számítsa ki a jelenlegi bankrollból következetesen.",
        "Kerüld a gyakori, szubjektív változtatásokat a legutóbbi eredmények alapján.",
        "Pontosan kövesd nyomon a tét- és bankrollváltozásokat.",
        "Gondosan bánj a fejlett változó tétel módszerekkel, ha a valószínűségi becslések bizonytalanok.",
        "Állj le vagy csökkentsd a fogadást, ha a pénzügyi vagy érzelmi nyomás nő.",
      ],
    },
  ],
  relatedGuides: [
    "bankroll-management",
    "variance-sports-betting",
    "expected-value-sports-betting",
    "why-chasing-losses-is-dangerous",
    "winning-streaks-misleading",
  ],
  responsibleGamblingNote:
    "A sima tétel és a százalékos tétel kockázatkezelési módszerek, nem nyereséggaranciák. Bármely fogadási stratégia veszteséget okozhat. Tartsd a tétet olyan összegben, amelyet megengedhetsz magadnak elveszíteni, különítsd el a fogadási pénzt a szükséges pénztől, kerüld a tét növelését a veszteségek üldözésére, és állj le, ha a fogadás pénzügyi vagy érzelmi károkat okoz.",
};

export default guide;
