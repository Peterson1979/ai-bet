import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "implied-probability",
  locale: "hu",
  title: "Mi az implicit valószínűség?",
  category: "odds-probability",
  status: "published",
  description:
    "Tudja meg, hogyan konvertálhatja a fogadási oddsokat implicit valószínűségre, miért tesz a könyvelő margók a nyers piaci valószínűségek 100%-nál nagyobbra, és hogyan értelmezze az implicit valószínűséget anélkül, hogy a árat a biztosossággal összekeverné.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "Az implicit valószínűség a fogadási ár által kódolt valószínűség. Az oddsokat százalékos értékre fordítja, így a különböző árak könnyebben összehasonlíthatók, és segít megérteni a fogadáshoz kapcsolódó break-even (egyensúlyi) arányt. A számítás egyszerű, de a helyes értelmezéshez odafigyelés szükséges: a könyvelő árak tartalmazhatnak margót, piaci mozgást és kockázatkezelést, ezért az implicit valószínűséget nem szabad objektív előrejelzésként vagy garanciaként kezelni.",
  keyTakeaways: [
    "A decimális odds esetén az implicit valószínűség egyenlő a 1 osztva az oddsokkal, majd megszorozva 100-zal.",
    "A 2,00 decimális odds 50%-t jelent; a 1,50 66,7%-t; a 4,00 25%-t.",
    "A könyvelőpiac nyers implicit valószínűségei gyakran összeszámítva meghaladják a 100%-ot, mert az árak tartalmazhatják a könyvelő margót.",
    "Az implicit valószínűség a megadott ár tulajdonsága, nem a tényleges valószínűség bizonyítéka.",
    "Egy valószínűségbecslés csak akkor hasznos a értékbecsléshez, ha összehasonlítjuk a rendelkezésre álló oddsok által sugallt break-even valószínűséggel.",
    "Az oddsok kis különbségei jelentősen megváltoztathatják a break-even valószínűséget és a hosszú távú gazdasági eredményeket a többszörös fogadások esetén.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Mit jelent az implicit valószínűség?",
      paragraphs: [
        "A fogadási oddsok és a valószínűség két módja ugyanannak a árképzési kapcsolatnak a kifejezésének. Az oddsok a potenciális megtérülést mutatják egy eseményhez. Az implicit valószínűség átalakítja ezt az árat a százalékos sikerarányra, amely a megadott oddsokhoz kapcsolódik a könyvelő margó, a modell bizonytalansága vagy egyéb piaci hatások figyelembevétele nélkül.",
        "Például a 2,00 decimális odds 50%-os valószínűséget jelent. Ez nem jelenti azt, hogy az esemény a kis mintában fele időben történik, és nem jelenti azt, hogy a könyvelő felfedezte a valódi valószínűséget. Ez azt jelenti, hogy a 2,00-as ár matematikailag 50%-os break-even arányt jelent: más gyakorlati tényezők figyelmen kívül hagyása mellett egy fogadó, aki pontosan fele az azonos fogadásokban nyer 2,00-as oddsokkal, hosszú távon visszakapja a befektetett összeget.",
        "Ez a százalékos átalakítás hasznos, mert a valószínűségek gyakran könnyebben értelmezhetők, mint a nyers oddsok. Az 1,62 és 1,75 összehasonlítása absztrakt lehet. Ha ezeket körülbelül 61,7% és 57,1% értékre konvertáljuk, azonnal látható, hogy a két ár jelentősen különböző sikerarányokat igényel."
      ],
      callout: {
        title: "Ár, nem biztososság",
        body:
          "Az implicit valószínűség matematikailag leírja, mit jelent egy idézett ár. Nem ígér, hogy az esemény a megadott gyakorisággal fog bekövetkezni.",
        tone: "warning",
      },
    },
    {
      id: "formula",
      heading: "Hogyan számítsuk ki az implicit valószínűséget decimális oddsokból",
      paragraphs: [
        "A decimális odds esetén a konverziós képlet: implicit valószínűség = 1 ÷ decimális odds. Szorozza meg az eredményt 100-zal, hogy százalékban fejezze ki.",
        "2,00-as odds esetén a számítás 1 ÷ 2,00 = 0,50, vagy 50%. 1,50 esetén 1 ÷ 1,50 = 0,6667, vagy körülbelül 66,7%. 2,50 esetén 40%. 5,00 esetén 20%.",
        "A kapcsolat inverz. A rövidebb odds magasabb valószínűséget és alacsonyabb potenciális megtérülést sugall. A hosszabb odds alacsonyabb valószínűséget és magasabb potenciális megtérülést jelent. Mivel a kapcsolat nem lineáris, a 0,10-es változás a decimális oddsokban nem ugyanazt a valószínűségváltozást jelenti minden árszintnél."
      ],
      bullets: [
        "1,25 ‒ 80,0% implicit valószínűség",
        "1,50 → 66,7%",
        "1,80 → 55,6%",
        "2,00 → 50,0%",
        "2,50 → 40,0%",
        "3,00 → 33,3%",
        "4,00 → 25,0%",
        "5,00 → 20,0%",
      ],
      callout: {
        title: "Példa",
        body:
          "Ha egy sportfogadó 2,20-as oddsot kínál, az implicit valószínűség 1 ÷ 2,20 = 0,4545, vagy körülbelül 45,5%. Egy 45,5%-nál magasabb valószínűségbecslés szükséges ahhoz, hogy az ár pozitív várható értéket képviseljen a becslés alapján.",
        tone: "example",
      },
    },
    {
      id: "break-even",
      heading: "Miért az implicit valószínűség egyben break-even valószínűség is?",
      paragraphs: [
        "Az elérhető oddsokból származó implicit valószínűséget egy elméleti break-even küszöbként értelmezhetjük. Tegyük fel, hogy többszörösen fogadunk 2,00-as decimális oddsokkal. A 50%-os nyerési arány átlagos bruttó megtérülést eredményez egy egységre vetítve: a fogadások fele ad vissza két egységet, a másik fele nulla. Mielőtt más költségeket vagy korlátozásokat figyelembe vennénk, a 50% ezért a break-even arány.",
        "1,80-as oddsnál a feltételes valószínűség körülbelül 55,6 %. Ha egy kimenetel valóban csak 50 %-ban fordul elő, a 1,80-as odds ismételt fogadása negatív várható értéket eredményezne. 2,20-as oddsnál a break-even valószínűség körülbelül 45,5 %; ha egy jól kalibrált becslés 50 %-ra helyezné a kimenetelt, a megadott ár elméletileg a break-even követelmény felett helyezkedne el.",
        "Ez az alapja a várható érték elemzésének. A fontos összehasonlítás nem csupán az, hogy egy kimenetel valószínű-e. Az, hogy a becsült valószínűség elég magas-e a kínált árhoz képest."
      ],
      callout: {
        title: "A valószínűség nem jelenti automatikusan a hasznosságot",
        body:
          "Egy kimenetel 70 % eséllyel fordulhat elő, és mégis vonzatlan lehet, ha a rendelkezésre álló oddsok 70 % feletti break-even arányt igényelnek. Fordított esetben, alacsonyabb valószínűségű kimenetel vonzó lehet, ha az ár több, mint a kockázatot kompenzál egy megbízható becslés alapján.",
        tone: "info",
      },
    },
    {
      id: "margin",
      heading: "Miért lehet a Bookmaker Implied Probabilities összege több, mint 100 %?",
      paragraphs: [
        "Ha egy piac kizárólagos kimeneteleket képvisel, tökéletesen igaz árakkal és margó nélkül, a feltételes valószínűségek összege 100 % lenne. A valós bookmaker piacok gyakran meghaladják a 100 %-ot. A felesleget általában overroundnak vagy bookmaker marginnak hívják.",
        "Vegyünk egy egyszerűsített kétkimeneteles piacot, ahol mindkét oldal 1,91-es áron van. Minden ár körülbelül 52,36 % valószínűséget jelez. Összesen körülbelül 104,72 %-t érnek el. A 4,72 százalékpont a 100 % felett bemutatja az overroundt ebben a leegyszerűsített piacon.",
        "Mivel van margó, egy bookmaker egyetlen választásának nyers feltételes valószínűsége nem automatikusan jelenti a tiszta valószínűségét. Elemzők eltávolíthatják vagy normalizálhatják a margót, hogy létrehozzanak egy no‑vig piac becslést, de ehhez további számítás szükséges."
      ],
      bullets: [
        "Alakítsd át minden kimenetel oddsját nyers feltételes valószínűségre.",
        "Add össze az összes kizárólagos kimenetel valószínűségét.",
        "Ha a teljes összeg meghaladja a 100 %-ot, az overroundt jelzi a megadott piacon.",
        "Normalizáld a kimenetel valószínűségeket, ha egyszerű no‑margin piac becslésre van szükség.",
      ],
      callout: {
        title: "Fontos különbség",
        body:
          "A nyers feltételes valószínűség közvetlenül egy megadott árból származik. Egy no‑margin vagy fair‑probability becsléshez további korrekció szükséges, és ennek megfelelően kell címkézni.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Egy egyszerű példa az overround eltávolítására",
      paragraphs: [
        "Egy alapvető módja a no‑margin becslés létrehozásának a arányos normalizáció. Tegyük fel, hogy egy kétkimeneteles piac nyers feltételes valószínűségei 55 % és 50 %, összesen 105 %. Osszuk el minden valószínűséget 105 %-al. A normalizált becslések körülbelül 52,38 % és 47,62 % lesznek, amelyek összege 100 %.",
        "Ez a eljárás hasznos módja a piac szerkezetének megértésének, de feltételezést tesz: hogy a bookmaker margó arányosan oszlik el a kimenetelek között. A valós árképzés bonyolultabb lehet. A margó nem feltétlenül oszlik egyenletesen, különböző kimenetek különböző keresletet vonzanak, és a bookmakerek különböző kereskedelmi és kockázatkezelési stratégiákat alkalmazhatnak.",
        "Az overround eltávolítása tehát nem azonos a valódi valószínűség felfedezésével. Jobban leírható, mint egy tisztább, piac‑alapú becslés kinyerése a megadott árakból."
      ],
      callout: {
        title: "A no‑vig nem jelent tökéletességet",
        body:
          "Egy normalizált piac hasznos referencia lehet, de a bizonytalanság, információhiány, piaci torzítás és árkülönbségek továbbra is fennállhatnak.",
        tone: "info",
      },
    },
    {
      id: "formats",
      heading: "Feltételes valószínűség különböző odds formátumokban",
      paragraphs: [
        "Decimális, törtszámú és amerikai odds ugyanazt az ökonomikai kapcsolatot fejezik ki különböző formátumokban. A MatchSignal decimális oddsokat használ, mert ezek teszik közvetlené a visszatérítési számításokat és a valószínűség konverziót.",
        "A törtszámú odds, mint a 3/2, a téthez viszonyított profitot jelenti. Átalakításuk decimálisra: 3/2 + 1 = 2,50 decimális, ami 40 % valószínűséget jelez. Az amerikai odds pozitív és negatív számokat használnak egy 100‑egységű referencia pont körül, így a konverziós képlet a pozitív vagy negatív ár függvényében változik.",
        "Miután bármely formátum decimális oddsra konvertálódott, ugyanazt a 1 ÷ odds képletet lehet használni. Ez teszi a decimális oddsot kényelmes közös nyelvessé a több forrásból származó árak összehasonlításához."
      ],
      bullets: [
        "Törtszámú 1/1 = decimális 2,00 = 50 % feltételes valószínűség.",
        "Törtszámú 3/2 = decimális 2,50 = 40 %.",
        "Amerikai +100 = decimális 2,00 = 50 %.",
        "Amerikai -200 = decimális 1,50 = körülbelül 66,7 %.",
      ],
    },
    {
      id: "price-comparison",
      heading: "Hogyan változtatja meg a jobb odds a feltételes valószínűséget",
      paragraphs: [
        "Az ár összehasonlítása fontos, mert egy jobb ár csökkenti a break‑evenhez szükséges siker arányát. Képzeljük el, hogy ugyanaz a választás 1,80, 1,90 és 2,00 áron érhető el. Ezek az árak körülbelül 55,6 %, 52,6 % és 50,0 % valószínűséget jeleznek.",
        "Az alapvető sportesemény megegyezik, de a fogadás gazdasága nem. Ha a valószínűségi becslésed 54 %, a 1,80-as ár a becslésed fölött helyezkedne el kedvezőtlenül, mert 55,6 % szükséges a break-evenhez. A 1,90 és 2,00-as árak alacsonyabb break-even arányt igényelnének, és így pozitív várható értéket hozhatnának a 54 % becslés alatt.",
        "Ez szemlélteti, miért nem csupán a nyerés után a kifizetés maximalizálása a cél az odds összehasonlításakor. Az ár megváltoztatja azt a matematikai küszöböt, amelyet a valószínűségi becslésednek felül kell haladnia."
      ],
      callout: {
        title: "Ugyanaz a választás, más érték",
        body:
          "Egy választás nem rendelkezik független, fix értékkel az áraktól függetlenül. Amikor az oddsok változnak, a feltüntetett valószínűség és a várható érték közötti kapcsolat is változik.",
        tone: "example",
      },
    },
    {
      id: "market-movement",
      heading: "Mi történik a feltüntetett valószínűséggel, amikor az oddsok mozognak?",
      paragraphs: [
        "Amikor az oddsok rövidülnek, a feltüntetett valószínűség emelkedik. Amikor az oddsok hosszabbra tolódnak, a feltüntetett valószínűség csökken. Egy 2,20-ról 2,00-re történő mozgás a feltüntetett valószínűséget körülbelül 45,5 % -ről 50 % -ra változtatja. Egy 2,00-ról 1,80-ra történő mozgás további emelkedést eredményez, körülbelül 55,6 % -re.",
        "Az oddsok sok okból mozoghatnak: új információk, sérülések, megerősített csapatkészletek, időjárás, piaci aktivitás, versenytársak sportsbookjainak változásai vagy a bookmakerek saját kockázatkezelési döntései. Egy odds mozgás tehát nem bizonyítja, hogy az alapvető valószínűség pontosan ugyanakkora mértékben változott.",
        "Mégis, egy ármozgás feltüntetett valószínűségre történő átalakítása intuitívabbá teheti a mozgás mértékét. Azt mondani, hogy egy ár 2,20-ról 1,90-ra rövidült, kevésbé azonnal érthető, mint felismerni, hogy a megadott break-even valószínűség körülbelül 45,5 % -ről 52,6 % -re mozdult."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Gyakori hibák a feltüntetett valószínűség olvasásakor",
      paragraphs: [
        "Az aritmetika elég egyszerű, így a legtöbb hiba a magyarázattól származik, nem a számításoktól. A leggyakoribb hiba, hogy a feltüntetett valószínűséget bizonyosságnak vagy a bookmakerek pontos előrejelzésének tekintik. Egy másik hiba, hogy különböző piacok valószínűségét összehasonlítják anélkül, hogy ellenőriznék, hogy a választások és a kiegyenlítési szabályok valóban egyenértékűek.",
        "Egy harmadik hiba a bookmakerek maradékának figyelmen kívül hagyása. Ha egy piacon a valószínűségek összege 105 % -t tesz ki, a nyers százalékok fair valószínűségként való felhasználása túlszólítja a rendelkezésre álló teljes valószínűséget. Végül a fogadók túlszámolhatják a kis látszólagos előnyöket. Egy egy- vagy két százalékpontos különbség eltűnhet, ha az alapvető valószínűségmodell bizonytalan vagy rosszul kalibrált."
      ],
      bullets: [
        "Ne értelmezd a feltüntetett valószínűséget bizonyosságnak.",
        "Ne nevezd a nyers bookmakerek valószínűségét „fair valószínűségnek”, ha nem veszed figyelembe a maradékot.",
        "Ne hasonlítsd össze a különböző piaci meghatározások oddsjait úgy, mintha azonosak lennének.",
        "Ne feltételezd, hogy minden különbség a becslésed és a piac között valódi előny.",
        "Ne hagyd figyelmen kívül, hogy az oddsok változhatnak, mielőtt fogadást tennél.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Hogyan illeszkedik a feltüntetett valószínűség a MatchSignal-be",
      paragraphs: [
        "A MatchSignal a bookmakerek árazását a sportelemzési keretrendszerének egy részének tekinti. A piaci árak feltüntetett valószínűségre fordíthatók, így különböző bookmakerek és piaci megfigyelések összehasonlíthatók egy közös skálán.",
        "A MatchSignal kártyákon a Market Avg a mintavételezett piaci árazást összefoglalja, míg a Fair Probability egy analitikai becslés, nem pedig egy nyers bookmakerek százalék. A Value Edge célja, hogy leírja a rendelkezésre álló piaci ár és a MatchSignal valószínűség-alapú értékelése közötti különbséget. A Books Sampled jelzi, hány bookmakerek forrás járult hozzá a releváns piaci mintához.",
        "Ezek a mezők célja, hogy a piaci árazás és a modellkörnyezet könnyebben ellenőrizhető legyen. Nem garantálják a sportesemény vagy a profit eredményét. A modellfeltevések, a forrásadatok minősége, a piaci mozgás és a szokásos sportvariancia mind befolyásolhatják az eredményt."
      ],
      callout: {
        title: "Használd a valószínűséget keretrendszerként",
        body:
          "A valószínűség segít a bizonytalanság struktúrázása. Nem távolítja el a bizonytalanságot, és egyik modell sem garantálja egy sportesemény eredményét.",
        tone: "warning",
      },
    },
    {
      id: "checklist",
      heading: "Gyakorlati feltüntetett valószínűség ellenőrzőlista",
      paragraphs: [
        "Fogadási ár értékelésekor a feltüntetett valószínűséget kezdőpontként használd, ne végső válaszként. A következő sorozat segít a ár, a piaci struktúra és a valószínűségbecslés elkülönítésében."
      ],
      bullets: [
        "Azonosítsd a pontos piacot és választást.",
        "Alakítsd át a rendelkezésre álló tizedes oddsokat feltüntetett valószínűségre.",
        "Ellenőrizd, hogy a piacon van-e bookmakerek maradék vagy overround.",
        "Hasonlítsd össze az egyenértékű árakat a különböző fogadóirodák között, ahol elérhető.",
        "Ha valószínűségmodellt használsz, hasonlítsd össze a becslését a fogadás break-even valószínűségével.",
        "Tegye figyelembe a modell bizonytalanságát, ne tekintse a kis numerikus különbségeket bizonyos előnyökként.",
        "Ellenőrizd újra a jelenlegi oddsokat, mielőtt cselekszel, mert a piaci árak mozoghatnak.",
        "Használj fegyelmezett tétméretet, és soha ne tekintsd a valószínűség-elemzést garanciának."
      ],
    }
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "bookmaker-margin-overround",
    "how-to-compare-betting-odds",
    "expected-value-sports-betting"
  ],
  responsibleGamblingNote:
    "A fogadás pénzügyi kockázatot jelent. A feltüntetett valószínűség egy matematikai értelmezése a árnak, nem garancia a kimenetelre vagy a nyereségre. Csak olyan tétösszegeket fogadjon, amelyeket megengedhet elveszíteni, kerüljön a veszteségek üldözésétől, és tartsa a fogadási döntéseket előre meghatározott határokon belül.",
};

export default guide;
