import type { GuideContent } from "@/app/lib/guideContent";

const guide: GuideContent = {
  slug: "cognitive-biases-sports-betting",
  locale: "hu",
  title: "Sportfogadási kognitív torzítások",
  category: "betting-psychology",
  status: "published",
  description:
    "Tanulja meg, hogyan torzíthatják a kognitív torzítások a sportfogadási döntéseket, beleértve a megerősítési torzítást, a frissesség torzítást, az ankkorálást, a túlteljesítést, a szerencsejátékos hibáját és a kimeneti torzítást, valamint hogy a strukturált döntési szabályok hogyan csökkenthetik hatásukat.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  intro:
    "A sportfogadási döntéseket bizonytalanság alatt hozzák, ami különösen sebezhetővé teszi őket a kognitív torzításokkal szemben. A kognitív torzítás egy rendszerszerű gondolkodási mintázat, amely torzíthatja az információk értelmezését, memóriáját vagy súlyozását. A torzítás nem jelenti azt, hogy a fogadó minden döntésében irracionális. Jelenti, hogy a gondolkodás rövidítéseket használ, amelyek megbízhatatlanná válhatnak, amikor a valószínűségek, árak, érzelmek és hiányos információk kölcsönhatásba lépnek. Ezeknek a mintáknak a felismerése javíthatja a döntés minőségét, ha az elemzés strukturáltabbá és kevésbé függ a legutóbbi eredményektől, személyes preferenciáktól vagy meggyőző narratíváktól.",
  keyTakeaways: [
    "A kognitív torzítások befolyásolhatják, hogyan értelmezik a fogadók a valószínűségeket, árakat, híreket és a legutóbbi eredményeket.",
    "A megerősítési torzítás arra ösztönzi az embereket, hogy olyan bizonyítékokat keressenek, amelyek alátámasztják a meglévő véleményüket, miközben figyelmen kívül hagyják a ellentétes információkat.",
    "A frissesség torzítás miatt a legutóbbi meccsek vagy sorozatok többet kapnak súlyt, mint amennyit megérdemelnek.",
    "A szerencsejátékos hibája tévesen úgy kezeli a korábbi véletlenszerű kimeneteket, mint bizonyítékot arra, hogy a következő kimenet fordított irányban van.",
    "A túlteljesítés miatt a valószínűségbecslések pontosabbnak tűnhetnek, mint ahogyan az alapvető információk támogatják.",
    "A kimeneti torzítás egy döntést a nyerés vagy veszteség alapján ítél meg, ahelyett, hogy a döntés időpontjában ésszerű volt volna.",
    "Írásos szabályok, valószínűségi tartományok, nyilvántartás és előre meghatározott fogadási határok csökkenthetik a torzítás hatását.",
  ],
  sections: [
    {
      id: "what-are-biases",
      heading: "Mik azok a kognitív torzítások?",
      paragraphs: [
        "A kognitív torzítások ismétlődő mintázatai az emberi ítélkezésben. Gyakran azért alakulnak ki, mert az agy gyorsan próbál feldolgozni összetett információkat rövidítésekkel.",
        "Ezek a rövidítések hasznosak a mindennapi életben, de problémákat okozhatnak a valószínűségi környezetekben. A sportfogadás során az embereknek össze kell hasonlítaniuk bizonytalan kimeneteleket, hiányos információkat, változó piaci árakat és érzelmileg jelentős eredményeket.",
        "Egy fogadó úgy gondolhatja, hogy tisztán analitikus döntést hoz, miközben mégis túl nagy súlyt ad egy kedvelt csapatnak, egy legutóbbi győzelmi sorozatnak, egy drámai híreknek vagy az első látott árat.",
        "A cél nem az, hogy minden torzítást kiküszöböljünk, ami valóságtól tér. A gyakorlati cél egy olyan folyamat kialakítása, amely kevésbé valószínű, hogy torzított döntéseket hoz."
      ],
      callout: {
        title: "A torzítás gyakran láthatatlan a tapasztaló számára",
        body:
          "Egy döntés objektívnek tűnhet, miközben mégis befolyásolva van a szűkített figyelem, memória, érzelem vagy keret miatt.",
        tone: "info",
      },
    },
    {
      id: "confirmation-bias",
      heading: "Megerősítési torzítás",
      paragraphs: [
        "A megerősítési torzítás a hajlam, hogy olyan információkat keressünk, észrevegyünk, és emlékezzünk, amelyek alátámasztják a meglévő hiedelmet, miközben alacsonyabb súlyt adunk a ellentétes bizonyítékoknak.",
        "Egy fogadó, aki már hisz, hogy egy labdarúgó csapat nyer, a csapat erős, legutóbbi támadása, kedvező szembenállás, otthoni forma felé koncentrálhat, miközben figyelmen kívül hagyja a sérüléseket, a menetrend zsúfoltságát, a védekezési gyengeséget vagy a kedvezőtlen piaci árat.",
        "Ugyanaz a torzítás hatással lehet a modellhasználókra is. Ha egy modell megegyezik a fogadó véleményével, a kimenet érvényesítésként kezelhető. Ha ellentétes, a fogadó hirtelen megkérdőjelezheti a modell megbízhatóságát.",
        "Az egyik legjobb védekezés az, hogy aktívan keressük a diszkonfirmáló bizonyítékokat a fogadás előtt."
      ],
      bullets: [
        "Írjuk le az eredeti tézist, mielőtt keresnénk a támogató bizonyítékokat.",
        "Soroljunk fel legalább egy erős okot, hogy a ellentétes kimenet bekövetkezhet.",
        "Ellenőrizzük, hogy a jelenlegi ár már tükrözi-e a kedvelt információkat.",
        "Kerüljük, hogy egy modell vagy forrás egyetértését független megerősítésként kezeljük.",
      ],
      callout: {
        title: "Kérdezzük meg, mi változtatná meg a véleményünket",
        body:
          "Ha nincs reális bizonyíték, amely megváltoztathatná a következtetést, az elemzés valószínűleg egy hiedelmet véd, nem tesztel.",
        tone: "warning",
      },
    },
    {
      id: "recency-bias",
      heading: "Frissesség torzítás",
      paragraphs: [
        "A frissesség torzítás akkor fordul elő, amikor a legutóbbi események többet kapnak súlyt, mint a régebbi, de még releváns információk.",
        "Egy olyan csapat, amely öt meccset nyert egymás után, erősebbnek érezheti magát, mint amilyen objektív. Egy több vereség után álló csapatot állandóan gyengeként kezelhetnek.",
        "A legutóbbi információ valóban fontos lehet, különösen, ha sérüléseket, taktikai változásokat, csapatjavulásokat vagy csökkenő teljesítményt tükröz. A probléma akkor jelentkezik, amikor a legutóbbi kimeneteket túlzottan súlyozzák, csak mert emlékezetesek.",
        "Egy erős folyamat elkülöníti a legutóbbi eredményeket a mögöttes okoktól. Öt meccs győzelme gyenge ellenfelek ellen kevesebb információt hordozhat, mint ahogyan a sorozat önmagában sugall."
      ],
      callout: {
        title: "A legutóbbi nem jelenti automatikusan a relevanciát",
        body:
          "A legutóbbi forma értelmezése a kontextusban kell, hogy történjen: ellenfél minősége, alapvető teljesítmény, sérülések, menetrend és piaci igazítás mind fontos.",
        tone: "info",
      },
    },
    {
      id: "gambler-fallacy",
      heading: "A szerencsejátékos hibája",
      paragraphs: [
        "A szerencsejátékos hibája a hit, hogy egy véletlen vagy független kimenet valószínűbbé válik, mert az ellentétes kimenet ismételten előfordult.",
        "Egy fogadó azt gondolhatja, hogy egy csapat \"készen\" van a győzelemre több vereség után, vagy hogy egy alulértékelt piac valószínűbb, mert több túllépés történt a közelmúltban.",
        "A korábbi kimenetek valóban fontosak lehetnek, ha új információt tárnak fel a csapatokról vagy a piaci helyzetről. De a sorozat önmagában nem kényszeríti a fordulatot.",
        "A fogadó saját veszteség sorozata különösen irreleváns a következő független esemény valószínűségére. A pénzügyi hátrány nem teszi a következő választást valószínűbbé."
      ],
      callout: {
        title: "Egy sorozat nem adó, amelyet a piac visszafizetne",
        body:
          "A jövőbeli valószínűség a jelenlegi bizonyítékokon alapulnia kell, nem azon érzésen, hogy egy kimenet elmaradt.",
        tone: "warning",
      },
    },
    {
      id: "hot-hand",
      heading: "A Hot-Hand hatás",
      paragraphs: [
        "A hot-hand hiedelem szinte a szerencsejátékos hibájának tükörképe. Ahelyett, hogy a sorozat fordulását várná, a fogadó azt feltételezi, hogy folytatódik, mert a legutóbbi siker jelentős.",
        "Egy olyan csatár, aki négy egymást követő meccsen szerez pontot, úgy kerül árazásra, mintha a sorozat folytatódna. Egy fogadó, aki személyesen több fogadást nyert, magabiztosabbá válhat és növelheti a tét nagyságát.",
        "Néhány sorozat valóban tükrözhet valós változásokat a képességben, szerepben, taktika vagy lehetőség terén. A kulcs kérdés, hogy van-e bizonyíték egy tartós alapvető változásra, nem csupán egy kedvező kimenetek sorozatára.",
        "Ha a piac már reagált a sorozatra, az új ár kevés vagy sem értéket hagyhat, még akkor is, ha az alapvető javulás valós."
      ],
    },
    {
      id: "anchoring",
      heading: "Ankkorálási torzítás",
      paragraphs: [
        "Az ankkorálás akkor fordul elő, amikor az első szám vagy vélemény, amelyet találunk, túl erősen befolyásolja a későbbi ítéletet.",
        "A fogadásban egy nyitóár lehet ankkor. Ha egy csapat nyitott 2,50-as áron, és később 2,10-re csökken, a fogadó azt gondolhatja, hogy a 2,10 automatikusan rossz, mert alacsonyabb, mint a nyitó.",
        "Az ellenkező is előfordulhat. Egy fogadó, aki kezdetben egy csapatot 60%-os eséllyel becsült, még a későbbi új információk után is folyamatosan módosíthatja a becslését, még akkor is, ha az új adatok sokkal nagyobb felülvizsgálatot igényelnek.",
        "Hasznos védekezés az, ha a becslést a jelenlegi információkból építjük újra, ahelyett, hogy csak azt kérdeznénk, mennyit mozdult el a piac az első számhoz képest."
      ],
      callout: {
        title: "Az első szám nem előnyös.",
        body:
          "A nyitó odds és az első becslések hasznos referencia lehetnek, de nem szabad, hogy megakadályozzák a teljes frissítést, amikor új információ érkezik.",
        tone: "info",
      },
    },
    {
      id: "availability-bias",
      heading: "Elérhetőségi torzítás",
      paragraphs: [
        "Az elérhetőségi torzítás miatt a élénk vagy emlékezetes információ fontosabbnak tűnik, mert könnyebb visszaidézni.",
        "Egy drámai piros kártya, utolsó pillanatban született gólszerzés, vitatott bírói döntés vagy nemzeti televízióban közvetített meglepetés a memóriában maradhat, és aránytalanul befolyásolhatja a következő fogadási döntést.",
        "A média lefedése erősítheti ezt a hatást. Nagyon látható csapatok és csillagjátékosok több történetet generálnak, ami miatt a fogadók úgy érezhetik, jobban értik ezeket a csapatokat, mint a kevésbé lefedett ellenfeleket.",
        "Szerkezetes adatok és írott ellenőrző listák csökkenthetik a élénk anekdoták hatását, mivel a fogadó szélesebb bizonyítékhalmazt kényszerít a figyelembe venni."
      ],
    },
    {
      id: "overconfidence",
      heading: "Túlzott önbizalom",
      paragraphs: [
        "A túlzott önbizalom a hajlam, hogy egy ítéletben nagyobb bizonyosságot érezünk, mint amit a bizonyíték igazolna.",
        "A fogadásokban a túlzott önbizalom gyakran túlzottan extrém valószínűségi becslésekben, egy kis mintára való túlzott bizalomban vagy nagy tétben jelenik meg, amely egy kivételesen biztonságos választásra alapul.",
        "Egy modell a precíz számok előállításával is okozhat túlzott önbizalmat. Egy 63,7%-os előrejelzés tudományosnak tűnhet, de a tizedes pontosság nem jelenti azt, hogy a mögöttes bizonytalanság csak néhány tizedes százalékpont.",
        "A valószínűségszegmensek és a kalibrációs tesztek segíthetnek a bizonytalanságot explicit módon bemutatni."
      ],
      bullets: [
        "Kerülje, hogy a modell pontosságát bizonyosságnak tekintse.",
        "Hasonlítsa össze a becsült valószínűségeket a hosszú távú megfigyelt gyakoriságokkal.",
        "Használjon konzervatív tétkorlátokat, még magas bizalomú választások esetén is.",
        "Kérdezze meg, mennyire érzékeny a következtetés egy kis valószínűségváltozásra.",
      ],
      callout: {
        title: "A pontosság nem azonos a pontossággal",
        body:
          "Egy modell 63,7%-ot adhat ki, és mégis jelentősen tévedhet. A numerikus részlet nem szabad, hogy elrejti a bizonytalanságot.",
        tone: "warning",
      },
    },
    {
      id: "outcome-bias",
      heading: "Eredménytorzítás",
      paragraphs: [
        "Az eredménytorzítás a döntést főként azután, mi történt, alapján ítéli meg.",
        "Ha egy fogadás nyer, a fogadó azt következtetheti, hogy az elemzés jó volt. Ha veszít, azt következtetheti, hogy az elemzés rossz volt. Ez összekeveri a döntés minőségét az eredménnyel.",
        "Egy 40%-os valószínűségű esemény legtöbbször veszít, de mégis vonzó fogadás lehet, ha az árképzés kompenzálja ezt a valószínűséget. Hasonlóképpen, egy rendkívül valószínű kedvező csapat nyerhet, miközben rosszul árazott.",
        "A jobb kérdés az, hogy a valószínűségi becslés, a piac összehasonlítása és a tét ésszerű volt-e a kimenetel előtt rendelkezésre álló információk alapján."
      ],
      callout: {
        title: "Egy győzelem rossz döntésből is származhat",
        body:
          "Értékelje a folyamatot külön a végső eredménytől. A rövid távú kimenetek varianciát tartalmaznak.",
        tone: "warning",
      },
    },
    {
      id: "hindsight-bias",
      heading: "Hindsight Bias",
      paragraphs: [
        "A hindsight bias a hajlam, hogy egy eredményt a megtörtént után sokkal előre jelezhetőnek tekintünk.",
        "Egy meglepetés után az emberek gyakran azonosítanak figyelmeztető jeleket, amelyek most már nyilvánvalóak. Az esemény előtt ugyanazok a jelek lehetnek homályosak vagy más irányba mutató bizonyítékokkal ellentétesek.",
        "A hindsight bias torzíthatja a modellértékelést, mert minden veszteség elkerülhetőnek tűnik a későbbiekben.",
        "Egy írásos előfogadási napló, amely tartalmazza a valószínűséget, az árat, a megfontolást és a bizonytalanságot, könnyebbé teszi az eredeti döntés összehasonlítását azzal, amire a pillanatban ismertek volt."
      ],
    },
    {
      id: "favorite-team",
      heading: "Érzelmi kötődés és csapattorzítás",
      paragraphs: [
        "A rajongók gyakran több információval rendelkeznek kedvenc csapatukról, de az érzelmi kötődés torzíthatja a megértést is.",
        "A pozitív hírek fontosabbnak tűnhetnek, a gyengeségek megalapozhatók, és a fogadó elfogadhat rosszabb odds-ot, mert szeretné, hogy a csapat nyerjen.",
        "Az ellenkező torzítás is előfordulhat. Egy rajongó, aki többször csalódott, túlzottan negatív lehet, és alábecsülheti a csapatot.",
        "Ha a személyes kötődés erős, egy gyakorlati megoldás az, hogy elkerüli a csapat fogadását, vagy egy további objektív ellenőrző listát igényel a cselekvés előtt."
      ],
    },
    {
      id: "authority-social-proof",
      heading: "Hatósági torzítás és társadalmi bizonyíték",
      paragraphs: [
        "A fogadók túl sok súlyt fektethetnek a magabiztos véleményekre kommentátoroktól, befolyásolók, tipsterektől vagy nagy online közösségektől.",
        "A népszerűség nem feltétlenül javítja a valószínűségi becslést. Egy széles körben megosztott választás még rosszul árazott lehet, és egy magabiztos bemutatás elrejtheti a gyenge elemzést.",
        "Ugyanez a figyelmeztetés vonatkozik az AI által generált elemzésre is. Egy kifinomult magyarázat nem tekinthető bizonyítéknak csupán azért, mert hitelesen hangzik.",
        "Értékelje a bizonyítékot, az árat, a módszertant és a bizonytalanságot, nem pedig a forrás bizalmát vagy népszerűségét."
      ],
      callout: {
        title: "A bizalom nem bizonyíték",
        body:
          "Egy meggyőző magyarázat mégis téves lehet. Ellenőrizze az alapvető árat és a megfontolást függetlenül.",
        tone: "warning",
      },
    },
    {
      id: "sunk-cost",
      heading: "Elveszett költség torzítás",
      paragraphs: [
        "Az elveszett költség torzítás akkor fordul elő, amikor a múltbeli veszteségek vagy erőfeszítések befolyásolják az új döntést, annak ellenére, hogy ezeket a költségeket nem lehet visszanyerni a jövőbeli valószínűség megváltoztatásával.",
        "Egy fogadó, aki már elveszített pénzt egy csapaton, hajlamos lehet újra fogadni, hogy visszaszerezze. Egy másik fogadó egy rossz stratégiát is folytathat, mert sok órát fektetett be a fejlesztésébe.",
        "A helyes értékelés a következő döntés aktuális várható értékére kell, hogy összpontosítson. A múltbeli veszteségek és a múltbeli erőfeszítések érzelmileg fontosak, de nem teszik jobbá a következő fogadást.",
        "Ez a torzítás az egyik oka annak, hogy a veszteségvadászat tartós lehet."
      ],
    },
    {
      id: "biases-interact",
      heading: "A torzítások gyakran együtt működnek",
      paragraphs: [
        "A valódi döntések ritkán csak egy elfogultságot tartalmaznak. Több is erősítheti egymást.",
        "A fogadó rögzülhet egy korai véleményhez, igazoló bizonyítékot keres, túlsúlyozhat egy újonnan bekövetkezett nyerő sorozatot, túlszámítódhat, majd a döntést kizárólag az alapján ítéli meg, hogy nyert-e.",
        "Ez a kölcsönhatás nehezíti az elfogultság felismerését kizárólag az intuíció alapján. Egy strukturált folyamat megbízhatóbb, mert ellenőrző pontokat hoz létre, mielőtt pénzt kockáztatnánk.",
        "A cél nem minden gondolat diagnosztizálása. A folyamatot a gyakori hibafajták ellen is ellenállóvá tenni."
      ],
    },
    {
      id: "controls",
      heading: "Gyakorlati módok a kognitív elfogultság csökkentésére",
      paragraphs: [
        "Az elfogultságot nem lehet teljesen eltávolítani, de a döntési struktúra csökkentheti annak hatását.",
        "Egy írott ellenőrzőlista arra kényszeríti a figyelmet, hogy minden fogadásnál ugyanarra a változóra koncentráljunk. A valószínűség tartományok csökkentik a hamis pontosságot. Előre meghatározott tételkorlátok megakadályozzák, hogy a túlszámítás azonnal nagyobb pénzügyi kitettséggé váljon. A nyilvántartás segíti a visszatekintést és a szelekciós memóriát.",
        "Egy másik hasznos technika a pre-mortem: feltételezzük, hogy a fogadás veszteség, és jegyezzük le a legvalószínűbb okokat. Ez arra ösztönzi a fogadót, hogy a kimenetel előtt keressen gyengeségeket, ne azután, hogy megjelent a végeredmény.",
        "Amennyiben lehetséges, különítsük el a jóslatot az ártól. Először becsüljük meg a valószínűséget, majd hasonlítsuk össze a rendelkezésre álló odds-szal. Ez csökkenti az anchoringot a sportfogadó árat illetően."
      ],
      bullets: [
        "Írjuk le a tézist, mielőtt ellenőriznénk a támogató megjegyzéseket.",
        "Becsüljük meg a valószínűséget, mielőtt erősen a piaci ágra fókuszálnánk.",
        "Soroljuk fel a választás ellenére álló bizonyítékokat.",
        "Használjunk tartományokat, ha a bizonytalanság jelentős.",
        "Rögzítsük a döntést az esemény előtt.",
        "Tartsuk a tétel szabályait függetlenül a legutóbbi nyerésektől és veszteségektől.",
        "Vizsgáljuk meg az eredményeket nagyobb mintákon.",
        "Használjunk pre-mortemot a lehetséges hibafajták azonosításához.",
      ],
    },
    {
      id: "matchsignal",
      heading: "Hogyan alkalmazódik a kognitív elfogultság a MatchSignal-re",
      paragraphs: [
        "A MatchSignal olyan strukturált mezőket kínál, mint a Legjobb Odds, Piaci Átlag, Igaz Valószínűség, Érték Élő, Közvetítő Mintavétel, és Kockázati Szint, hogy megkönnyítse a kapcsolat vizsgálatát az ár és a valószínűség között.",
        "Ezek a mezők támogatják a rendszerezett folyamatot, de nem távolítják el a kognitív elfogultságot. A felhasználó még mindig csak a megerősítő kártyákra koncentrálhat, vagy a Low Risk címkéjét erősebb bizonyítékként kezelheti, mint amilyen.",
        "Az Érték Élő nem szabad, hogy biztosra vonatkozzon, a Kockázati Szint sem szabad, hogy érzelmi tét növelését igazolja. A modell önmagában is hibás vagy bizonytalan lehet.",
        "A leghasznosabb megközelítés, ha a MatchSignal-t egy strukturált analitikai bemenetként kezeljük, és továbbra is alkalmazzuk a bankroll korlátokat, a piaci összehasonlítást és az önálló ítélkezést."
      ],
      callout: {
        title: "A strukturált adatok segítenek, de nem távolítják el az elfogultságot",
        body:
          "A felhasználók még mindig szzelektíven értelmezhetik a modell kimeneteit. Az analitikai eszközöknek támogatniuk kell a folyamatot, nem helyettesíteni a kritikus értékelést.",
        tone: "info",
      },
    },
    {
      id: "checklist",
      heading: "Egy kognitív elfogultsági ellenőrzőlista a fogadás előtt",
      paragraphs: [
        "Fogadás előtt egy rövid elfogultsági ellenőrzés felfedheti, hogy a legutóbbi eredmények vagy személyes preferenciák befolyásolják-e a döntést."
      ],
      bullets: [
        "Megtenném ugyanazt a fogadást, ha a másik csapatot támogattam volna?",
        "Túlzottan a legutóbbi néhány meccset veszem figyelembe?",
        "Felteszem, hogy egy kimenetel a sorozat miatt jár?",
        "Aktívan kerestem-e a bizonyítékot a véleményem ellen?",
        "Az első odds vagy első előrejelzés rögzítette-e a becslésemet?",
        "Túlzottan magabiztos vagyok, mint amit az adatok igazolnak?",
        "Még így is szeretném a fogadást, ha az előző fogadások mind nyertek?",
        "Még így is szeretném, ha az előző fogadások mind vesztettek?",
        "A jelenlegi ár valóban vonzó a valószínűség becsléséhez képest?",
        "A tét a normál előre meghatározott határnál belül van?",
      ],
    },
  ],
  relatedGuides: [
    "confirmation-bias-betting",
    "winning-streaks-misleading",
    "why-chasing-losses-is-dangerous",
    "variance-sports-betting",
    "bankroll-management",
    "expected-value-sports-betting",
  ],
  responsibleGamblingNote:
    "A kognitív elfogultságok ösztönözhetik az impulzív döntéseket, a nagyobb tételeket és a veszteségek visszaszerzésének kísérleteit. Használjon előre meghatározott kiadás-, tét-, veszteség- és időkorlátokat, tartsa a fogadási pénzt a szükséges pénztől külön, és álljon le, ha a fogadás pénzügyi vagy érzelmi károkat okoz. Az analitikai eszközök és a valószínűségmodellek nem garantálják a kimeneteleket.",
};

export default guide;
