import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "bookmaker-margin-overround",
  locale: "hu",
  title: "Mi a fogadóiroda marja / túlértékelés?",
  category: "odds-probability",
  status: "published",
  description:
    "Tudja meg, mit jelentenek a fogadóiroda marja és a túlértékelés, hogyan számíthatók ki a fogadási oddsokból, miért adódik gyakran több mint 100% a feltüntetett valószínűség, és hogyan befolyásolja a marja az árösszehasonlítást és az érték elemzést.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A fogadóiroda marja, amelyet gyakran túlértékelésnek vagy vignek neveznek, a sok fogadási piacon beépített árcéda. Ha minden kimenet egy tökéletesen igazságos piacon valószínűséggé konvertálható, a valószínűségek összege 100% lenne. A valós sportfogadási piacokon a feltüntetett oddsokból származó feltüntetett valószínűségek gyakran több mint 100%-ot adnak. Ez a túlzott rész a túlértékelés. A megértése fontos, mert a nyers fogadóiroda valószínűsége nem automatikusan igazságos valószínűség, és két sportfogadó ugyanazt a nézetet fejezheti ki egy eseményről, miközben jelentősen eltérő árakat kínál.",
  keyTakeaways: [
    "A túlértékelés az a mérték, amellyel a nyers feltüntetett valószínűségek minden kölcsönösen kizárólagos kimenet esetén meghaladják a 100%-ot.",
    "Egy kétirányú piac, amely mindkét oldalon 1,91-es decimal odds-ot kínál, összesen körülbelül 104,72%-ot jelent, ami körülbelül 4,72 százalékpontot jelent a túlértékelésnek.",
    "A nyers fogadóiroda feltüntetett valószínűsége egy árból származó szám, nem automatikus igazságos valószínűségbecslés.",
    "A alacsonyabb túlértékelés általában versenyképesebb árat jelent, minden egyéb tényező egyenlő feltételezése mellett.",
    "A marja nem feltétlenül oszlik meg egyenletesen minden kimenet között, ezért a egyszerű arányos normalizálás csak egy közelítés.",
    "A felhasználó számára elérhető tényleges odds határozza meg a megtörési valószínűséget, és ezért marad központi szerepben a várható érték elemzésében.",
  ],
  sections: [
    {
      id: "definition",
      heading: "Mi jelent a fogadóiroda marja?",
      paragraphs: [
        "A fogadóiroda általában nem egy egyszerűen tökéletesen igazságos valószínűségek közzétételével hoz létre piacot. Ehelyett az árakat általában úgy állítják be, hogy a kombinált feltüntetett valószínűségek meghaladják a 100%-ot. A 100%-nál nagyobb rész a túlértékelésnek, fogadóiroda marjának vagy vignek nevezik.",
        "Például képzelje el egy elméleti kétkimenetű eseményt, ahol mindkét oldal decimal odds 1,91. Minden ár körülbelül 52,36%-os valószínűséget jelent. A két érték összege körülbelül 104,72%. A 100%-nál nagyobb rész, körülbelül 4,72 százalékpont, a piac túlértékelése.",
        "Ez nem jelenti azt, hogy a fogadóiroda garantáltan 4,72%-ot keres minden piacra. A valós kimenetek, a fogadási eloszlás, az ármozgás, a promóciós tevékenység, a limitek, a kereskedelmi döntések és az ügyfélmagatartás mind befolyásolják a valós eredményeket. A túlértékelés leginkább a feltüntetett árstruktúra tulajdonsága, nem pedig garantált nyereség arány."
      ],
      callout: {
        title: "Árstruktúra, nem garantált nyereség",
        body:
          "A túlértékelés leírja, hogyan van árazva egy piac. Nem szabad azt értelmezni, mint a fogadóiroda garantált nyereségét egy adott eseményre.",
        tone: "warning",
      },
    },
    {
      id: "calculation",
      heading: "Hogyan számítsuk ki a túlértékelést decimal odds alapján",
      paragraphs: [
        "A számítás elkezdődik azzal, hogy minden kimenet decimal odds-ját feltüntetett valószínűségre konvertáljuk. Decimal odds esetén a feltüntetett valószínűség egyenlő a 1 osztva az odds-ával. Összeadjuk a piac minden kölcsönösen kizárólagos kimenetének feltüntetett valószínűségét.",
        "Ha a teljes összeg 100%, a piac matematikailag marja-mentes, mielőtt más gyakorlati tényezőket figyelembe vennénk. Ha a teljes összeg 105%, a túlértékelés 5 százalékpont. Ha a teljes összeg 108%, a túlértékelés 8 százalékpont.",
        "A képlet így írható: túlértékelés = összes nyers feltüntetett valószínűség - 100%."
      ],
      bullets: [
        "Konvertálja minden decimal árat 1 ÷ odds használatával.",
        "Összeadja a feltüntetett valószínűségeket minden kölcsönösen kizárólagos kimenet esetén.",
        "Vonja ki a 100 százalékpontot a teljes összegből.",
        "A maradék összeg a feltüntetett piac túlértékelése.",
      ],
      callout: {
        title: "Egyszerű példa",
        body:
          "1,91 és 1,91 esetén minden oldal körülbelül 52,36%-ot jelent. A teljes összeg körülbelül 104,72%, így a túlértékelés körülbelül 4,72 százalékpont.",
        tone: "example",
      },
    },
    {
      id: "three-way",
      heading: "Túlértékelés egy háromirányú labdarúgópiacon",
      paragraphs: [
        "A háromirányú labdarúgópiák hasznos példát adnak, mert a hazai győzelem, a döntetlen és a vendéggyőzelem kölcsönösen kizárólagos kimenetek. Tegyük fel, hogy az árak 2,10 a hazai csapatnak, 3,40 a döntetlennek és 3,60 a vendégcsapatnak.",
        "A feltüntetett valószínűségek körülbelül 47,62%, 29,41% és 27,78%. Összeadva körülbelül 104,81%. Az így kapott túlértékelés tehát körülbelül 4,81 százalékpont.",
        "A három ár nem jelenti azt, hogy az esemény valójában 104,81% teljes valószínűséggel rendelkezik. A túlzott rész azért jelenik meg, mert a feltüntetett árak tartalmazzák a marját és egyéb kereskedelmi szempontokat."
      ],
      bullets: [
        "Hazai 2,10 → körülbelül 47,62%",
        "Döntetlen 3,40 → körülbelül 29,41%",
        "Vendég 3,60 → körülbelül 27,78%",
        "Összesen → körülbelül 104,81%",
        "Túlértékelés → körülbelül 4,81 százalékpont",
      ],
    },
    {
      id: "raw-vs-fair",
      heading: "Nyers feltüntetett valószínűség vs igazságos valószínűség",
      paragraphs: [
        "Egy nyers feltüntetett valószínűség közvetlenül egy feltüntetett árból származik. Ha egy sportfogadó decimal odds 2,00-t kínál, a nyers feltüntetett valószínűség 50%. Ez a szám a megtörési küszöböt írja le, amely a rendelkezésre álló áron van beágyazva.",
        "Egy igazságos vagy marja-mentes valószínűségbecslés más. Megpróbálja eltávolítani a piac túlértékelésének hatását, hogy a kölcsönösen kizárólagos kimenetek valószínűségei összege 100%-ot adjon.",
        "Ez a különbség fontos, mert ha minden nyers sportfogadó valószínűséget igazságos valószínűségnek hívunk, túlszólíthatjuk a piac valószínűségét. Egy 105%-os összegű piacon a fogadóiroda nyers feltüntetett valószínűségei összességében több mint 100% valószínűséget írnak le, ami lehetetlen a kölcsönösen kizárólagos, kimerítő kimenetek esetén."
      ],
      callout: {
        title: "Ne keverje össze a két fogalmat",
        body:
          "A nyers feltüntetett valószínűség a ténylegesen elfogadható áratól származik. Az igazságos valószínűség egy elemző becslés, amely a marját korrigálja.",
        tone: "warning",
      },
    },
    {
      id: "normalization",
      heading: "Egyszerű mód a túlértékelés eltávolítására",
      paragraphs: [
        "Az egyik gyakori módja a marja-mentes valószínűségek becslésének a arányos normalizálás. Ossza el minden nyers feltüntetett valószínűséget az összes nyers feltüntetett valószínűség összegével. A korrigált valószínűségek így összeadódnak 100%-ra.",
        "Tegyük fel, hogy egy kétirányú piac nyers feltüntetett valószínűségei 55% és 50%, összesen 105%. Az arányos normalizálás körülbelül 52,38% -t ad az első oldalnak és 47,62% -t a másodiknak.",
        "Ez a módszer egyszerű és hasznos a piacok összehasonlításához, de feltételezi, hogy a marja arányosan oszlik meg a kimenetek között. A valós piacokon ez a feltételezés nem feltétlenül pontos. A fogadóirodák különböző árakat állíthatnak be a várható kereslet, információ, felelősség, piacmélység vagy az egyes kimenetek jellemzői alapján.",
        "Ezért a normalizált valószínűséget egy marja-mentes piac becslésének kell tekinteni, nem pedig az esemény objektív igazságos valószínűségének."
      ],
      bullets: [
        "Nyers valószínűségek: 55% és 50%.",
        "Piaci összeg: 105%.",
        "Normalizált első oldal: 55 ÷ 105 ≈ 52,38%.",
        "Normalizált második oldal: 50 ÷ 105 ≈ 47,62%.",
        "Normalizált összeg: 100%.",
      ],
      callout: {
        title: "A normalizálás egy becslés",
        body:
          "A túlárány matematikai eltávolítása nem tárja fel a tökéletes valószínűséget. Egy tisztább, piac-alapú referenciaértéket hoz létre.",
        tone: "info",
      },
    },
    {
      id: "uneven-margin",
      heading: "Miért nem mindig egyenletesen oszlik el a marha",
      paragraphs: [
        "Kívánatos lehet azt feltételezni, hogy a sportfogadóhely egyszerűen ugyanazt a százalékos marhát adja minden választásnak. A valós piaci létrehozás gyakran bonyolultabb. Egyes kimenetek több nyilvános keresletet vonzanak, egyesek nehezebben árazhatók, és egyes piacok alacsonyabb likviditással vagy magasabb bizonytalansággal rendelkeznek.",
        "Ezért a fogadóhely egy oldalt erőteljesebben árnyalhat, mint a másikat. A hosszú távú piacokon a kapcsolat különösen egyenlőtlen lehet: a magas oddsú kimenetek más hatékony marhával rendelkezhetnek, mint a rövid árú kedvezőkedők.",
        "Ez az egyik ok, amiért a arányos no-vig számításokat nem szabad pontos, igazságos valószínűségeknek tekinteni. Fejlettebb marhaeltávolító módszerek léteznek, de mindegyik a túlárány eloszlásáról szóló feltételezéseken alapul."
      ],
      callout: {
        title: "A túlárány nem feltétlenül szimmetrikus",
        body:
          "Két kimenet különböző módon járulhat hozzá a fogadóhely teljes marhához. Egy egyszerű arányos módosítás hasznos, de még mindig egy modell.",
        tone: "warning",
      },
    },
    {
      id: "price-comparison",
      heading: "Miért általában jobb a kisebb marha",
      paragraphs: [
        "Ha két sportfogadóhely hasonló értékelést ad egy eseményre, de az egyik alacsonyabb túlárán dolgozik, az alacsonyabb marhával rendelkező piac általában versenyképesebb árakat kínál a fogadónak.",
        "Vegyünk két egyszerű kétoldali piacot. Sportfogadóhely A mindkét oldalt 1,91-gyel árazza, így a túláránk körülbelül 4,72%. Sportfogadóhely B mindkét oldalt 1,96-gyel árazza, így a teljes becsült valószínűség körülbelül 102,04% és a túláránk körülbelül 2,04%.",
        "Egy nyerő egységfogadás esetén a 1,96 több, mint a 1,91. Még fontosabb, hogy a magasabb ár csökkenti a break-even valószínűséget a körülbelül 52,36%-ról körülbelül 51,02%-ra. Ez a különbség jelentősen befolyásolhatja a várható értéket ismételt fogadások során.",
        "Ezért hasznos lehet a jelenlegi oddsok összehasonlítása egyenértékű piacokon, még akkor is, ha nem teszünk jobb előrejelzést. Az alapvető esemény változatlan marad, de az elérhető ár javulhat."
      ],
      bullets: [
        "1,91 / 1,91 → körülbelül 4,72% túlár.",
        "1,96 / 1,96 → körülbelül 2,04% túlár.",
        "A magasabb egyenértékű odds csökkenti a szükséges break-even valószínűséget.",
        "Mindig ellenőrizze, hogy a piac szabályai és a kiegyenlítési feltételek összehasonlíthatók.",
      ],
    },
    {
      id: "margin-and-ev",
      heading: "Hogyan befolyásolja a fogadóhely marhája a várható értéket",
      paragraphs: [
        "A várható érték a kimenet valószínűségétől és a tényleges elérhető ártól függ. Mivel a fogadóhely marhája általában lerövidíti az árakat a teoretikus no-margin piachoz képest, a marha növeli a siker arányát, amely a break-evenhez szükséges.",
        "Tegyük fel, hogy egy kimenetet 52%-ra becsül. 2,00 tizedes oddsnál a teoretikus EV 0,52 × 2,00 − 1 = +4%. 1,90 esetén az EV 0,52 × 1,90 − 1 = −1,2%. A valószínűségbecslés változatlan marad, de a rövidebb ár megváltoztatja a következtetést.",
        "Ez szemlélteti, miért nem elegendő egy jó előrejelzés önmagában. Az ár határozza meg, hogy a valószínűségbecslés pozitív, semleges vagy negatív várható értékre fordul-e."
      ],
      callout: {
        title: "A marha a küszöböt változtatja",
        body:
          "Egy rövidebb ár magasabb nyerési arányt igényel a break-evenhez. Ezért az árminőség függetlenül a predikció minőségétől is fontos.",
        tone: "info",
      },
    },
    {
      id: "market-types",
      heading: "A marha sportok és piac típusok szerint változhat",
      paragraphs: [
        "A fogadóhely marhája nem rögzített minden sportban vagy piacon. A nagy, magas likviditású események viszonylag versenyképes árazással rendelkezhetnek, míg a niche ligák, derivatív piacok, propok vagy alacsony likviditású események szélesebb marhával rendelkezhetnek.",
        "Még ugyanazon mérkőzésen belül a fő pénzvonal vagy a mérkőzésgyőztes piac más túláránnyal rendelkezhet a tét, hándiká, játékos prop vagy pontos eredmény piacokhoz képest. Sok lehetséges kimenettel rendelkező piacok is jelentős teljes túlárat halmozhatnak.",
        "Ezért a különböző piac típusok közötti egyetlen marha szám összehasonlítása félrevezető lehet. A leghasznosabb összehasonlítás általában a sportfogadóhelyek közötti, ugyanazon eseményen ugyanazon piacot idéző, közel azonos időpontban kínáló árak között történik."
      ],
    },
    {
      id: "changing-margin",
      heading: "Miért változhat a túlárán a mérkőzés előtt",
      paragraphs: [
        "A piacok dinamikusak. Ahogy közeledik a mérkőzés, új információk érkezhetnek, a likviditás nőhet, a versenyképes sportfogadóhelyek árat mozgatnak, és a fogadóhelyek módosíthatják kockázati expozíciójukat. A teljes piaci túlárán tehát idővel változhat.",
        "Néhány magas profilú eseményben az árazás versenyképesebbé válhat a piac érettségével. Más helyzetekben a bizonytalanság vagy a működési döntések szélesebb árakat eredményezhetnek. Nincs univerzális szabály, miszerint a marha mindig csökken a kezdéshez közeledve.",
        "Ezért a marha számítás egy pillanatképet ad a pillanatban használt árak alapján. A történelmi túlár és a jelenlegi túlár nem tekinthető cserélhetőnek."
      ],
    },
    {
      id: "common-mistakes",
      heading: "Gyakori hibák a fogadóhely marha értelmezésekor",
      paragraphs: [
        "Egy gyakori hiba az, hogy a túláránnyal a fogadóhely garantált százalékos nyereségét tekintik. Nem ez. Egy másik hiba, hogy a nyers becsült valószínűségeket igazságos valószínűségeknek feltételezik. Ezek árból származó break-even küszöbök, és általában tartalmazzák a marhát.",
        "Egy harmadik hiba, hogy a túláránnyal rendelkező piacokat összehasonlítják különböző kimeneti struktúrájú piacok között kontextus nélkül. Egy háromoldali mérkőzéspiac, egy kétoldali tétpiac és egy pontos eredménypiac nem közvetlenül összehasonlítható, csak mert mindegyik egyetlen marha százalékot ad.",
        "Végül, a marha eltávolítása nem távolítja el a bizonytalanságot. Egy no-vig piac becslés még mindig hibás, elavult vagy hiányos lehet. Hasznos analitikai referencia, de nem garantálja az esemény valódi valószínűségeloszlását."
      ],
      bullets: [
        "Ne értelmezze a túláránnyal garantált fogadóhely nyereségnek.",
        "Ne hívja automatikusan igazságosnak a nyers becsült valószínűségeket.",
        "Ne feltételezze, hogy a marha egyenletesen oszlik el a kimenetek között.",
        "Ne hasonlítsa össze a kapcsolaton kívüli piac típusokat kontextus nélkül.",
        "Ne tekintse a no-margin valószínűségeket bizonytalan vagy objektíven igaznak.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Hogyan illeszkedik a marha a MatchSignal elemzésbe",
      paragraphs: [
        "A MatchSignal összehasonlítja a fogadóhely árakat és a piaci adatokat, hogy kontextust nyújtson a jelenlegi választások körül. A Market Avg a mintavételezett piaci árazást összefoglalja, míg a Fair Probability egy analitikai valószínűségbecslés, nem pedig egy nyers sportfogadóhely által sugallt százalék.",
        "A Value Edge célja, hogy leírja a rendelkezésre álló piaci ár és a MatchSignal valószínűség-alapú értékelése közötti kapcsolatot. Mivel a fogadóhely árak tartalmazhatnak marhát, egy hasznos elemzés meg kell különítsen a nyers ár és a no-margin vagy modellalapú valószínűségbecslés között.",
        "A Books Sampled jelzi, hány fogadóhely forrás járult hozzá a releváns piaci mintához. Egy szélesebb minta több kontextust nyújthat a piaci árazás körül, de nem távolítja el a bizonytalanságot vagy garantálja, hogy a kapott becslés helyes.",
        "A Best Odds a legerősebb elérhető partnerárat tükrözi a megjelenített választáshoz. Mivel a tényleges végrehajtási ár határozza meg a break-even valószínűséget, még egy kisebb különbség a sportfogadóhelyek között befolyásolhatja az érték számítást."
      ],
      callout: {
        title: "A piaci ár és az analitikai valószínűség különbözőek",
        body:
          "A MatchSignal elkülöníti a rendelkezésre álló árat a valószínűség-alapú elemzéstől, így a felhasználók megvizsgálhatják a kapcsolatot, anélkül, hogy a sportfogadóhely oddsokat biztosra vennék.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Gyakorlati túlár ellenőrzőlista",
      paragraphs: [
        "A fogadóhely marha felülvizsgálata során kövesse a következő sorozatot a leggyakoribb értelmezési hibák elkerülése érdekében."
      ],
      bullets: [
        "Azonosítsa az összes kölcsönösen kizáró kimenetet a pontos piacon.",
        "Átalakítsd minden idézett tizedes árfolyamot a feltételes valószínűségre.",
        "Add hozzá a nyers feltételes valószínűségeket.",
        "Vonjuk ki 100%-ot a piac túlszámításának kiszámításához.",
        "Ha szükséges, normalizáld a valószínűségeket, hogy létrehozz egy egyszerű, margytalan referenciaértéket.",
        "Emlékezz rá, hogy a arányos normalizálás egy feltételezés, nem tökéletes igazság.",
        "Hasonlítsd össze az egyenértékű piacokat a különböző sportfogadó oldalak között hasonló időpontokban.",
        "Használd a ténylegesen elérhető odds-okat a break-even valószínűség és az EV kiszámításakor.",
        "Az alacsonyabb túlszámítást árképzési előnyként kezeld, ne garanciának a jobb előrejelzésekhez.",
      ],
    },
  ],
  relatedGuides: [
    "how-betting-odds-work",
    "implied-probability",
    "expected-value-sports-betting",
    "how-to-compare-betting-odds",
    "why-betting-odds-move",
  ],
  responsibleGamblingNote:
    "A fogadó márka margójának megértése segíthet a szintek tisztább értékelésében, de az alacsonyabb margó vagy jobb odds nem távolítja el a fogadás pénzügyi kockázatát. A kimenetek továbbra is bizonytalanok, a valószínűségbecslések hibásak lehetnek, és veszteségek fordulhatnak elő, még akkor is, ha egy ár kedvezőnek tűnik. Csak olyan összegeket fogadj, amelyeket megengedhetsz magadnak elveszíteni, használj előre meghatározott határokat, és soha ne üldözd a veszteségeket.",
};

export default guide;
