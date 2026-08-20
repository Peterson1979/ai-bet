import type { Lang } from "@/app/lib/i18n";
import type { LegalLocaleContent, LegalSection } from "./types";

type PageInput = {
  title: string;
  description: string;
  intro: string;
  sections: Array<[string, string]>;
};

type LocaleInput = {
  updated: string;
  privacy: PageInput;
  cookie: PageInput & { tableHeaders: string[]; tableRows: string[][]; inventoryHeading: string };
  terms: PageInput;
  affiliate: PageInput;
  responsible: PageInput;
  ai: PageInput;
  earnings: PageInput;
  notice: PageInput;
};

function pairSections(pairs: Array<[string, string]>): LegalSection[] {
  return pairs.map(([heading, paragraph]) => ({ heading, paragraphs: [paragraph] }));
}

function build(input: LocaleInput): LegalLocaleContent {
  const page = (value: PageInput, showCookieSettings = false) => ({
    title: value.title,
    description: value.description,
    intro: [value.intro],
    sections: pairSections(value.sections),
    showOperator: true,
    showCookieSettings,
    updated: input.updated,
  });

  const cookie = page(input.cookie, true);
  cookie.sections = [
    { heading: input.cookie.inventoryHeading, table: { headers: input.cookie.tableHeaders, rows: input.cookie.tableRows } },
    ...cookie.sections,
  ];

  return {
    "privacy-policy": page(input.privacy),
    "cookie-policy": cookie,
    "terms-of-use": page(input.terms),
    "affiliate-disclosure": page(input.affiliate),
    "responsible-gambling": page(input.responsible),
    "ai-disclaimer": page(input.ai),
    "earnings-disclaimer": page(input.earnings),
    "legal-notice": page(input.notice),
  };
}

const hu = build({
  updated: "Utolsó frissítés: 2026. augusztus 20.",
  privacy: {
    title: "Adatvédelmi tájékoztató", description: "A MatchSignal személyesadat-kezelése, ideértve a kapcsolatfelvételt, analitikát, hirdetést és affiliate interakciókat.",
    intro: "Ez a tájékoztató bemutatja, hogyan kezeli a MatchSignal a személyes adatokat a GDPR szerint. Forray Gyöngyi határozza meg az itt leírt adatkezelések célját és eszközeit, ezért adatkezelő.",
    sections: [
      ["Kezelt adatok", "A hozzájárulási beállítást és időbélyegét a böngésző tárolja. A kapcsolatfelvételi űrlap nevet, e-mail-címet, üzenetet és visszaélés-megelőzési mezőket kezel; az IP-cím rövid idejű korlátozásra szolgál. Hozzájárulással a GA4 eszköz-, böngésző-, hivatkozó-, oldalmegtekintési és használati adatokat, valamint durva helyadatot kezelhet. A Google hirdetési és hozzájárulási jeleket is kezelhet. A tárhely technikai kérés-, biztonsági és szervernapló-adatokat dolgozhat fel."],
      ["Célok és jogalapok", "A szükséges működés és biztonság jogalapja a jogos érdek (GDPR 6. cikk (1) f)). A kapcsolatfelvétel megválaszolása a kért szerződéskötést megelőző lépés (6. cikk (1) b)) vagy jogos érdek. A GA4 mérés és a hozzájárulást igénylő Google-hirdetés jogalapja a hozzájárulás (6. cikk (1) a)). Az affiliate céloldali hozzárendelés jogos kereskedelmi érdekeken és a partner feltételein alapul; a MatchSignal GA4 kattintásmérése csak analitikai hozzájárulással történik."],
      ["Szükséges böngészőtárolás", "A matchsignal_consent localStorage-kulcs az analitikai választást, a MatchSignal tartalék felületén mindig hamis hirdetési értéket és időbélyeget tárol. A beállítás módosításig vagy a webhelyadatok törléséig marad meg. A nyelvet az URL határozza meg; a MatchSignal jelenleg nem tárol külön nyelvi beállítást."],
      ["Kapcsolatfelvételi űrlap", "Az űrlap használata önkéntes. A név, e-mail és üzenet a Vercelen futó végponton át a Resend szolgáltatásával jut el az üzemeltetőhöz. Az IP-cím egy szerverpéldány memóriájában körülbelül egyperces korlátozási ablakban használatos. Kérjük, ne adjon meg szükségtelen érzékeny adatot."],
      ["Google Analytics 4", "A GA4 csak akkor töltődik be, ha az elérhető hozzájárulási rendszer engedélyezi az analitikát. Oldal-URL-t, hivatkozó forrást, eszköz- és böngészőadatot, eseményt és durva helyet kezelhet; nem tekintjük anonimnak. A Google Analytics nem naplóz és nem tárol egyedi IP-címeket; az IP-t átmenetileg felhasználhatja földrajzi hely meghatározására, majd regionális feldolgozási dokumentációja szerint elveti. A MatchSignal nem állítja, hogy kézzel engedélyezett IP-anonimizálást."],
      ["Google-hirdetés és affiliate linkek", "Az AdSense szkript a jog és az elérhető választások szerint hozzájárulási jeleket, eszköz-/böngészőadatot, hirdetési azonosítót és sütit kezelhet. Az EGT-ben, az Egyesült Királyságban és Svájcban a személyre szabott Google-hirdetéshez IAB TCF-fel integrált, Google által tanúsított CMP szükséges. Az affiliate cél-URL-ek hivatkozási paramétereket tartalmaznak; kattintás után a partner saját adatvédelmi szabályai érvényesek."],
      ["Adatfeldolgozók és címzettek", "A tényleges rendszerben a Vercel tárhelyet, kézbesítést és biztonsági infrastruktúrát; a Resend e-mail-kézbesítést; a Google GA4-et, AdSense-t és elérhető hozzájárulási szolgáltatásokat nyújt. Affiliate partnerek csak akkor kapnak normál kérési és hivatkozási adatot, ha Ön külső linket követ. A kód nem igazolja, hogy a Groq vagy a The Odds API azonosítható látogatói adatot kapna, ezért ilyen minőségben nem szerepelnek."],
      ["Nemzetközi adattovábbítás", "Egyes szolgáltatók az EGT-n kívül is kezelhetnek adatot. Ilyenkor az adattovábbításnak megfelelőségi határozaton, általános szerződési feltételeken vagy más, az adott szolgáltató által kínált jogszerű garancián kell alapulnia."],
      ["Megőrzés", "A hozzájárulási beállítás törlésig vagy módosításig marad. A kapcsolatfelvételt a válaszhoz és utánkövetéshez szükséges ideig, rendszerint legfeljebb 24 hónapig őrizzük, kivéve jogi vagy kötelező ok esetén. A korlátozási rekord körülbelül egy percig él. A Vercel-naplók és a Google-adatok megőrzését a szükséges biztonsági cél, a konfiguráció és a szolgáltatói szabályok határozzák meg."],
      ["Biztonság", "Hozzáférés-szabályozást, titkosított adatátvitelt, bemenetellenőrzést, korlátozást és menedzselt tárhelyvédelmet alkalmazunk. Egyetlen internetes rendszer sem teljesen biztonságos."],
      ["Az Ön jogai", "Kérhet tájékoztatást, hozzáférést, helyesbítést, törlést és korlátozást; ahol alkalmazható, adathordozhatóságot; tiltakozhat a jogos érdeken alapuló kezelés ellen; hozzájárulását bármikor visszavonhatja; és panaszt tehet. Kérelmét a privacy@matchsignal.pro címre küldje; indokolt esetben személyazonosság-ellenőrzést kérhetünk."],
      ["NAIH-panasz", "Panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH): 1055 Budapest, Falk Miksa utca 9-11.; postacím: 1363 Budapest, Pf. 9.; e-mail: ugyfelszolgalat@naih.hu, illetve a lakó- vagy munkahelye szerinti hatóságnál."],
      ["Kötelező adatok és automatizált döntés", "Az űrlap használata nem kötelező, de válaszhoz a megjelölt mezők szükségesek. Az analitika vagy hirdetés elutasítása nem zárja el az alapvető tartalmat. A MatchSignal sportrendszere eseményekről készít tájékoztató tartalmat; nem hoz azonosítható látogatóról a GDPR 22. cikke szerinti jogi vagy hasonlóan jelentős döntést."],
      ["Kapcsolat", "Adatvédelmi kérdés és joggyakorlás: privacy@matchsignal.pro. Általános kapcsolat: contact@matchsignal.pro. Jogi értesítés: legal@matchsignal.pro."],
    ],
  },
  cookie: {
    title: "Süti- és tárhelyszabályzat", description: "A MatchSignal, a GA4, az AdSense és a hozzájárulási szolgáltatások böngészőtárolása.",
    intro: "A szabályzat a jelenlegi kódban látható tárolási technológiákat írja le. A localStorage rögzített lejárat nélkül maradhat meg. A Google azonosítói változhatnak, ezért a hirdetési példák nem teljes körűek.", inventoryHeading: "Tárolási és süti-leltár",
    tableHeaders: ["Szolgáltató", "Kategória", "Azonosító / példa", "Fél", "Cél", "Időtartam", "Hozzájárulás"],
    tableRows: [
      ["MatchSignal", "Szükséges", "matchsignal_consent (localStorage)", "Első fél", "Analitikai választás és időbélyeg; a tartalék hirdetési engedély hamis", "Módosításig vagy törlésig", "Nem; a választás megjegyzéséhez szükséges"],
      ["Google Analytics 4", "Analitika", "_ga; _ga_<container-id>", "Első féltől származó Google-süti", "Böngésző-, munkamenet- és mérési állapot", "Jellemzően legfeljebb 2 év, beállítástól függ", "Igen"],
      ["Google AdSense / Google", "Hirdetés", "Például __gads, __gpi, IDE, NID és más Google-azonosítók", "Első vagy harmadik fél", "Hirdetés, gyakoriság, csalásmegelőzés, mérés és érvényes engedéllyel személyre szabás", "Azonosítótól és Google-szabálytól függ", "Ahol szükséges; személyre szabáshoz igen"],
      ["Google hozzájárulási szolgáltatás / CMP", "Szükséges vagy hozzájárulási", "Hozzájárulási karakterláncok és szolgáltatói tárolás, adott esetben IAB TCF", "Első vagy harmadik fél", "A választás rögzítése és közlése", "CMP- és rekordfüggő", "Magának a választásnak a rögzítésére szolgál"],
    ],
    sections: [
      ["A jelenlegi kód működése", "A MatchSignal nem használ sessionStorage-ot és nem ír közvetlenül document.cookie-t. A GA4 csak analitikai engedéllyel töltődik be. A saját tartalék panel csak az analitikát kezeli, a hirdetési tárolást mindig tiltja. Az AdSense és Google-hozzájárulási horgok a gyökér-elrendezésben vannak; a futásidejű felület és sütik régió és konfiguráció szerint változhatnak."],
      ["CMP és hirdetési hozzájárulás", "Az EGT-ben, Egyesült Királyságban és Svájcban a személyre szabott Google-hirdetéshez IAB TCF-fel integrált, Google által tanúsított CMP kell. A rendszer figyeli a Google-jeleket, ahol elérhetők, másként analitika-only tartalékot kínál. Nem állítjuk, hogy a Google párbeszédablaka minden látogatáskor sikeresen megjelenik. A hirdetési szolgáltatásoknak tiszteletben kell tartaniuk az elérhető jeleket és CMP-választásokat."],
      ["Az Ön beállításai", "Az alábbi Sütibeállítások gomb újranyitja az aktív vezérlőt. A böngészőben is törölheti vagy tilthatja a tárhelyet. A nem szükséges tárolás tiltása mérési vagy hirdetési funkciót csökkenthet, de az alapvető tájékoztató tartalom elérhető marad."],
      ["Frissítések és kapcsolat", "A Google módosíthatja az azonosítókat és időtartamokat, ezért a lista nem teljes. Lényeges technikai változáskor frissítjük. Kérdés: privacy@matchsignal.pro."],
    ],
  },
  terms: { title: "Felhasználási feltételek", description: "A MatchSignal tájékoztató elemzéseinek, eszközeinek és külső linkjeinek használati feltételei.", intro: "A MatchSignal használatával elfogadja ezeket a feltételeket. Ha nem ért egyet, ne használja a szolgáltatást.", sections: [
    ["Csak tájékoztatás", "A MatchSignal oktatási és tájékoztató sportelemzést, valószínűségi becslést, kalkulátort és piac-összehasonlítást kínál. Nem fogadóiroda, szerencsejáték- vagy fizetési szolgáltató, nem fogad tétet és nem kezel ügyfélpénzt."],
    ["Jogosultság és helyi jog", "Csak nagykorú, helyben jogosult személy használhat fogadási tartalmat. Ön felel a joghatóságért, szolgáltatói jogosultságért, számlafeltételekért és adókötelezettségekért."],
    ["Nincs garancia", "A sport kimenetele bizonytalan. A szorzó, promóció, piac és elérhetőség változhat. Nem garantáljuk a frissességet, pontosságot, rendelkezésre állást, profitot vagy eredményt. Döntés előtt ellenőrizze ugyanazt a piacot, választást, árat és elszámolási szabályt."],
    ["Harmadik felek", "A külső oldalak saját engedélyezési, jogosultsági, fizetési, kifizetési, adatvédelmi és promóciós feltételei érvényesek. A link nem jelent mindenre kiterjedő jóváhagyást."],
    ["Szellemi tulajdon és elfogadható használat", "A dizájn, eredeti szöveg, márka és összeállítás védelem alatt áll. Személyesen és jogszerűen használható; jogosulatlan kaparás, újraközlés, beavatkozás vagy visszaélés tilos, kivéve ahol a jog megengedi."],
    ["Felelősség, változás, kapcsolat", "A jog által megengedett mértékben nincs felelősség fogadási veszteségért, elmaradt haszonért, közvetett kárért, elavult oddsért, harmadik félért vagy kiesésért. Kötelező fogyasztói jog nem zárható ki. A feltételek jogi, technikai vagy működési okból előretekintően változhatnak. Jogi: legal@matchsignal.pro; általános: contact@matchsignal.pro."],
  ]},
  affiliate: { title: "Affiliate tájékoztató", description: "A MatchSignal affiliate linkjei, jutalékai és kereskedelmi megjelenítése.", intro: "Egyes linkek szponzorált affiliate linkek. Minősített művelet után a MatchSignal jutalékot vagy más hivatkozási díjazást kaphat.", sections: [
    ["Díjazás", "A feltételek partnerenként változnak. A jutalék rendszerint nem jelent külön MatchSignal-díjat, de a partner árai, jogosultsági és promóciós feltételei érvényesek."],
    ["Kapcsolat az előrejelzésekkel", "Az affiliate kapcsolat nem irányítja a kód által létrehozott piacjelölteket, a matematikát, a konszenzusos horgonyt vagy a számításokat. MatchCard CTA csak akkor jelenik meg, ha ugyanaz a validált piac és választás elérhető a partnernél."],
    ["Kereskedelmi sorrend", "A partnerfelvétel és megjelenítési sorrend kereskedelmileg konfigurálható. A katalógus nem állít független minőségi rangsort; a Kiemelt partner sem empirikus értékelés."],
    ["Harmadik fél feltételei", "Életkor, jogosultság, földrajzi korlát, promóció és helyi jog a partner szerint érvényes. Regisztráció, befizetés vagy fogadás előtt ellenőrizze az üzemeltetőt és az aktuális ajánlatot."],
    ["Magyar locale-szabály", "A fogadóirodai affiliate linkek kizárólag a /hu locale-on vannak elnyomva; ez locale-alapú, nem IP-alapú. Az információs szolgáltatások, például a BetQL, a jelenlegi konfiguráció szerint megmaradhatnak. Kapcsolat: legal@matchsignal.pro."],
  ]},
  responsible: { title: "Felelős szerencsejáték", description: "Kockázattudatos fogadási útmutató és független segítségforrások.", intro: "A MatchSignal tájékoztató platform, nem fogadóiroda, segélyvonal vagy kezelőhely. A szerencsejáték pénzügyi és személyes kockázat, nem jövedelem vagy befektetés.", sections: [
    ["Biztonságosabb alapelvek", "Csak jogszerű korú és jogosult személyként fogadjon; előre állítson megfizethető befizetési, tét-, veszteség- és időkorlátot; ne üldözze a veszteséget, ne kérjen kölcsön és ne használjon létfontosságú pénzt; tartson szünetet; ne fogadjon stressz vagy befolyásoltság alatt. Egyetlen modell vagy +EV-jel sem garantált."],
    ["Üzemeltetői eszközök", "Ahol elérhető, használjon befizetési, tét-, veszteség- és időlimitet, valóságellenőrzést, szünetet és önkizárást. Az alkalmazható eszközökről a szerencsejáték-szolgáltatót kérdezze."],
    ["Független segítség", "Ha a játék ártalmat okoz, álljon le és kérjen helyi szaksegítséget. A Gambling Therapy, GamCare és Gamblers Anonymous nemzetközi kiindulópont lehet, de egyik szervezet sem garantáltan elérhető vagy megfelelő minden országban. Krízisben forduljon helyi sürgősségi szolgálathoz."],
    ["Kapcsolat", "A support@matchsignal.pro tartalmi problémákat fogad, de nem nyújt klinikai, adósság- vagy kríziskezelést."],
  ]},
  ai: { title: "MI-jogi nyilatkozat", description: "A MatchSignal korlátozott MI-segített kiválasztása és bizonytalanságai.", intro: "A MatchSignal korlátozott hibrid folyamatot használ. Az eredmények valószínűségi tájékoztatások, nem garantált jóslatok vagy személyes tanácsok.", sections: [
    ["Először validált jelöltek", "A kód valódi fogadóirodai piacadatból hoz létre érvényes jelölteket. Éles jelölthöz legalább 3 fogadóiroda szükséges. A piac, választás, megjelenített szorzó és mélység ugyanabból a validált jelöltből ered."],
    ["Korlátozott MI-szerep", "Az MI nem találhat ki szabadon piacot vagy tippet; a kód listájából candidateId-t választ. A valószínűség a piaci konszenzushoz horgonyzott, az analitikai eltérés szándékosan korlátozott, ezért az MI önállóan nem gyárthat nagy pozitív EV-t."],
    ["Éles jogosultság", "Az éles tippnek a horgony, a korlátozott módosítás és az elérhető partnerár után is estimatedValuePct > 0 feltételt kell teljesítenie. Ez csökkenti a nem alátámasztott kimenetet, de nem igazolja a becslés helyességét."],
    ["Korlátok", "Az MI magyarázata hibás vagy hiányos lehet; az adat késhet, a piac mozog és a sport varianciát tartalmaz. Ellenőrizze az élő piacot és döntsön önállóan."],
    ["Nincs látogatói döntés", "A rendszer sporteseményt elemez, nem hoz azonosítható látogatóról GDPR 22. cikk szerinti jelentős döntést. Kapcsolat: legal@matchsignal.pro."],
  ]},
  earnings: { title: "Eredmény- és jövedelmi nyilatkozat", description: "A valószínűségek, pozitív várható érték és fogadási eredmények pénzügyi kockázata.", intro: "A MatchSignal nem ígér nyereséget, jövedelmet, ROI-t vagy nyerő eredményt. A teljes tét elveszhet.", sections: [
    ["Nincs jövőbeli garancia", "Korábbi eredmény, példa, modellkimenet vagy tipp nem garantál jövőbeli teljesítményt. Egy megalapozott becslés is veszthet."],
    ["Az EV elméleti", "A pozitív becsült érték bizonytalan valószínűség és ár elméleti viszonya; nem készpénz, garantált előny vagy profitígéret. Modellhiba és marzs megfordíthatja."],
    ["Odds és variancia", "A szorzó és elérhetőség változik. Rövid és hosszú távon variancia, korreláció, végrehajtási korlát és modellhiba térítheti el az eredményt. Ellenőrizze az élő árat."],
    ["Saját felelősség", "A tartalom nem pénzügyi, befektetési, jogi vagy szakmai fogadási tanács. Csak megfizethető téttel, önállóan döntsön, a teljes veszteség lehetőségével."],
  ]},
  notice: { title: "Jogi nyilatkozat / Impresszum", description: "A MatchSignal üzemeltetői, nyilvántartási, kapcsolati és tárhelyadatai.", intro: "Weboldal: MatchSignal · https://www.matchsignal.pro. A MatchSignal tájékoztató sportelemző oldal, nem fogadóiroda, szerencsejáték- vagy fizetési szolgáltató.", sections: [
    ["Üzemeltető és felelősség", "Forray Gyöngyi a weboldal karbantartója és technikai üzemeltetője, a kereskedelmi és affiliate tevékenység üzemeltetője, valamint adatkezelő, ahol a MatchSignal határozza meg az adatkezelés célját."],
    ["Nyilvántartás", "Az Egyéni Vállalkozók Nyilvántartását a Nemzeti Adó- és Vámhivatal (NAV) működteti. Kamarai számot vagy telefonszámot nem közlünk, mert ilyet nem adtak meg és nem igazoltak."],
    ["Tárhely", "Az igazolt telepítési környezetben a Vercel, Inc. nyújtja a webtárhelyet és kézbesítési infrastruktúrát."],
    ["Kapcsolat", "Általános: contact@matchsignal.pro. Jogi: legal@matchsignal.pro. Adatvédelem: privacy@matchsignal.pro."],
  ]},
});

const de = build({
  updated: "Zuletzt aktualisiert: 20. August 2026",
  privacy: { title: "Datenschutzerklärung", description: "Verarbeitung personenbezogener Daten durch MatchSignal, einschließlich Kontakt, Analyse, Werbung und Affiliate-Interaktionen.", intro: "Diese Erklärung beschreibt die Verarbeitung nach der DSGVO. Forray Gyöngyi bestimmt die Zwecke und Mittel der hier beschriebenen Verarbeitungen und ist Verantwortliche.", sections: [
    ["Verarbeitete Daten", "Verarbeitet werden die im Browser gespeicherte Einwilligungswahl samt Zeitstempel; bei Kontakt Name, E-Mail, Nachricht und Missbrauchsschutzfelder sowie die IP-Adresse für eine kurzzeitige Begrenzung; mit Einwilligung GA4-Geräte-, Browser-, Verweis-, Seitenaufruf-, Nutzungs- und grobe Standortdaten; gegebenenfalls Google-Werbe- und Einwilligungssignale; außerdem technische Anfrage-, Sicherheits- und Serverprotokolldaten der Hosting-Infrastruktur."],
    ["Zwecke und Rechtsgrundlagen", "Erforderlicher Betrieb und Sicherheit beruhen auf berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO). Kontaktantworten beruhen gegebenenfalls auf vorvertraglichen Schritten (lit. b), sonst auf berechtigtem Interesse. GA4 und einwilligungspflichtige Google-Werbung beruhen auf Einwilligung (lit. a). Zielseitige Affiliate-Zuordnung richtet sich nach Partnerbedingungen und berechtigtem Geschäftsinteresse; MatchSignal misst Klicks in GA4 nur mit Analyse-Einwilligung."],
    ["Notwendiger Browserspeicher", "matchsignal_consent im localStorage enthält die Analysewahl, einen im MatchSignal-Fallback stets falschen Werbewert und einen Zeitstempel. Er bleibt bis zur Änderung oder Löschung der Websitedaten. Die Sprache stammt aus der URL und wird derzeit nicht separat gespeichert."],
    ["Kontaktformular", "Die Nutzung ist freiwillig. Name, E-Mail und Nachricht gelangen über den auf Vercel gehosteten Endpunkt und Resend an die Betreiberin. Die IP-Adresse wird im Speicher einer Serverinstanz ungefähr eine Minute zur Ratenbegrenzung verwendet. Bitte senden Sie keine unnötigen sensiblen Daten."],
    ["Google Analytics 4", "GA4 lädt erst nach einer zulässigen Analyse-Einwilligung und kann Seiten-URL, Referrer, Geräte-/Browserdaten, Ereignisse und groben Standort verarbeiten; es wird nicht als anonym bezeichnet. Google Analytics protokolliert oder speichert keine individuellen IP-Adressen; IP-Daten können vorübergehend zur Standortableitung genutzt und nach Googles regionaler Dokumentation verworfen werden. MatchSignal behauptet keine manuell aktivierte IP-Anonymisierung."],
    ["Google-Werbung und Affiliate-Links", "AdSense kann nach Recht und verfügbaren Entscheidungen Einwilligungssignale, Geräte-/Browserdaten, Werbe-IDs und Cookies verarbeiten. Personalisierte Google-Werbung im EWR, Vereinigten Königreich und der Schweiz erfordert eine Google-zertifizierte, mit IAB TCF integrierte CMP. Affiliate-Ziel-URLs tragen Referral-Parameter; nach dem Klick gilt die Datenschutzerklärung des Partners."],
    ["Auftragsverarbeiter und Empfänger", "Vercel erbringt Hosting, Auslieferung und Sicherheit; Resend versendet Kontakt-E-Mails; Google stellt GA4, AdSense und verfügbare Einwilligungsdienste bereit. Affiliate-Partner erhalten normale Anfrage- und Referral-Daten nur bei einem freiwilligen externen Klick. Der Code zeigt keine Übermittlung identifizierbarer Besucherdaten an Groq oder The Odds API; sie werden daher nicht als Besucher-Auftragsverarbeiter genannt."],
    ["Internationale Übermittlungen", "Soweit Anbieter außerhalb des EWR verarbeiten, muss die Übermittlung auf einem Angemessenheitsbeschluss, Standardvertragsklauseln oder einer anderen rechtmäßigen, für die Verarbeitung angebotenen Garantie beruhen."],
    ["Speicherdauer", "Die Einwilligungswahl bleibt bis zur Änderung/Löschung. Kontaktanfragen werden zur Antwort und Nachbearbeitung grundsätzlich höchstens 24 Monate aufbewahrt, sofern kein Rechtsgrund länger erfordert. Die Rate-Limit-Angabe lebt etwa eine Minute. Vercel-Protokolle und Google-Daten richten sich nach Sicherheitsbedarf, Konfiguration und Anbieterregeln."],
    ["Sicherheit", "Wir nutzen Zugriffskontrollen, Transportverschlüsselung, Eingabeprüfung, Ratenbegrenzung und verwaltete Hosting-Schutzmaßnahmen. Kein Internetsystem ist vollständig sicher."],
    ["Ihre Rechte", "Sie haben Rechte auf Information, Auskunft, Berichtigung, Löschung, Einschränkung, gegebenenfalls Portabilität, Widerspruch gegen berechtigte Interessen, Widerruf der Einwilligung und Beschwerde. Schreiben Sie an privacy@matchsignal.pro; eine angemessene Identitätsprüfung kann nötig sein."],
    ["Beschwerde bei der NAIH", "Beschwerden sind möglich bei der Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Ungarn; Post: 1363 Budapest, Pf. 9.; E-Mail: ugyfelszolgalat@naih.hu, oder bei der zuständigen Behörde Ihres Wohn- oder Arbeitsorts."],
    ["Pflichtangaben und automatisierte Entscheidungen", "Das Kontaktformular ist optional, seine Pflichtfelder sind für eine Antwort nötig. Die Ablehnung von Analyse oder Werbung sperrt Kerninhalte nicht. Das Vorhersagesystem erzeugt Informationen über Sportereignisse und trifft keine Entscheidung über identifizierbare Besucher mit rechtlicher oder ähnlich erheblicher Wirkung nach Art. 22 DSGVO."],
    ["Kontakt", "Datenschutz und Rechte: privacy@matchsignal.pro. Allgemein: contact@matchsignal.pro. Rechtlich: legal@matchsignal.pro."],
  ]},
  cookie: { title: "Cookie-Richtlinie", description: "Browserspeicher von MatchSignal, GA4, AdSense und Einwilligungsdiensten.", intro: "Diese Richtlinie beschreibt die im aktuellen Code sichtbaren Speichertechniken. localStorage kann ohne feste Laufzeit bestehen. Google-Kennungen können wechseln; Werbebeispiele sind daher nicht vollständig.", inventoryHeading: "Speicher- und Cookie-Übersicht", tableHeaders: ["Anbieter", "Kategorie", "Kennung / Beispiel", "Partei", "Zweck", "Dauer", "Einwilligung"], tableRows: [
    ["MatchSignal", "Notwendig", "matchsignal_consent (localStorage)", "Erstanbieter", "Analysewahl und Zeitstempel; Fallback-Werbung bleibt abgelehnt", "Bis Änderung oder Löschung", "Nein; zur Speicherung der Wahl erforderlich"],
    ["Google Analytics 4", "Analyse", "_ga; _ga_<container-id>", "Erstanbieter-Cookie für Google", "Browser-, Sitzungs- und Messstatus", "Typisch bis 2 Jahre, abhängig von Konfiguration", "Ja"],
    ["Google AdSense / Google", "Werbung", "Zum Beispiel __gads, __gpi, IDE, NID und andere Google-Kennungen", "Erst- oder Drittanbieter", "Auslieferung, Häufigkeit, Betrugsabwehr, Messung und nur mit gültiger Einwilligung Personalisierung", "Je Kennung und Google-Regel", "Wo erforderlich; für Personalisierung ja"],
    ["Google-Einwilligungsdienste / CMP", "Notwendig oder Einwilligung", "Einwilligungsstrings und anbieterspezifischer Speicher, gegebenenfalls IAB TCF", "Erst- oder Drittanbieter", "Wahl speichern und übermitteln", "CMP-/Datensatzabhängig", "Zur Speicherung/Übermittlung der Wahl"],
  ], sections: [
    ["Aktueller Code", "MatchSignal verwendet kein sessionStorage und schreibt document.cookie nicht direkt. GA4 lädt nur mit Analyse-Erlaubnis. Das eigene Fallback verwaltet nur Analyse und hält Werbespeicher abgelehnt. AdSense- und Google-Einwilligungshooks stehen im Root-Layout; UI und Cookie-Satz können nach Region und Konfiguration variieren."],
    ["CMP und Werbeeinwilligung", "Personalisierte Google-Werbung im EWR, Vereinigten Königreich und der Schweiz benötigt eine Google-zertifizierte IAB-TCF-CMP. Die Architektur hört auf verfügbare Google-Signale und bietet sonst einen Analyse-Fallback. Sie behauptet nicht, dass ein Google-Dialog heute bei jedem Besuch erfolgreich erscheint. Werbedienste müssen verfügbare Signale und CMP-Wahlen beachten."],
    ["Ihre Kontrolle", "Mit Cookie-Einstellungen unten öffnen Sie die aktive Steuerung erneut. Browserspeicher kann auch im Browser gelöscht oder blockiert werden. Nicht notwendige Funktionen können entfallen; Kerninhalte bleiben zugänglich."],
    ["Änderungen und Kontakt", "Google kann Kennungen und Laufzeiten ändern; die Liste ist nicht vollständig. Bei wesentlichen Änderungen aktualisieren wir sie. privacy@matchsignal.pro."],
  ]},
  terms: { title: "Nutzungsbedingungen", description: "Bedingungen für MatchSignals Informationsanalysen, Tools und externe Links.", intro: "Mit der Nutzung akzeptieren Sie diese Bedingungen; andernfalls nutzen Sie den Dienst nicht.", sections: [
    ["Nur Information", "MatchSignal bietet Bildungs- und Informationsanalysen, Wahrscheinlichkeiten, Rechner und Marktvergleiche. Es ist kein Buchmacher, Glücksspiel-, Zahlungs- oder Finanzdienst, nimmt keine Wetten an und hält kein Kundengeld."],
    ["Alter und örtliches Recht", "Wettinhalte sind nur für Erwachsene im gesetzlichen Alter und bei örtlicher Zulässigkeit bestimmt. Sie verantworten Rechtsraum, Betreiberberechtigung, Kontobedingungen und Abgaben."],
    ["Keine Gewähr", "Ergebnisse sind ungewiss; Quoten, Aktionen, Märkte und Verfügbarkeit ändern sich. Frische, Richtigkeit, Verfügbarkeit, Profit und Ergebnis werden nicht garantiert. Prüfen Sie Markt, Auswahl, Preis und Abrechnung beim Betreiber."],
    ["Dritte", "Für externe Seiten gelten deren Lizenz-, Berechtigungs-, Zahlungs-, Auszahlungs-, Datenschutz- und Angebotsbedingungen. Ein Link ist keine umfassende Qualitätsbestätigung."],
    ["Geistiges Eigentum und Nutzung", "Design, Originaltexte, Marke und Zusammenstellung sind geschützt. Persönliche rechtmäßige Nutzung ist erlaubt; unbefugtes Scraping, Wiederveröffentlichen, Stören oder Missbrauchen ist untersagt, soweit Recht nichts anderes verlangt."],
    ["Haftung, Änderungen, Kontakt", "Soweit zulässig, besteht keine Haftung für Wettverluste, entgangenen Gewinn, indirekte Schäden, alte Quoten, Dritte oder Ausfälle; zwingende Rechte bleiben unberührt. Bedingungen können aus rechtlichen, technischen oder betrieblichen Gründen künftig geändert werden. legal@matchsignal.pro; contact@matchsignal.pro."],
  ]},
  affiliate: { title: "Affiliate-Offenlegung", description: "Affiliate-Links, Provisionen und kommerzielle Darstellung bei MatchSignal.", intro: "Einige Links sind gesponserte Affiliate-Links; nach einer qualifizierenden Handlung kann MatchSignal eine Provision erhalten.", sections: [
    ["Vergütung", "Bedingungen variieren. Üblicherweise entsteht keine separate MatchSignal-Gebühr; Preise, Berechtigung und Partnerbedingungen gelten dennoch."],
    ["Bezug zu Vorhersagen", "Affiliate-Beziehungen steuern weder codegenerierte Kandidaten noch Marktmathematik, Konsensusanker oder Berechnungen. Ein MatchCard-CTA erscheint nur, wenn derselbe validierte Markt und dieselbe Auswahl beim Partner verfügbar sind."],
    ["Kommerzielle Reihenfolge", "Aufnahme und Reihenfolge können kommerziell konfiguriert sein. Das Verzeichnis ist keine unabhängige Qualitätsrangliste; Featured Partner ist keine empirische Bewertung."],
    ["Partnerbedingungen", "Alter, Berechtigung, Region, Aktion und örtliches Recht sind selbst zu prüfen, bevor Sie sich registrieren, einzahlen oder wetten."],
    ["Ungarische Locale-Regel", "Sportsbook-Affiliate-Links werden nur in /hu unterdrückt, locale- und nicht IP-basiert. Informationsdienste wie BetQL können wie konfiguriert bleiben. legal@matchsignal.pro."],
  ]},
  responsible: { title: "Verantwortungsvolles Glücksspiel", description: "Risikobewusste Hinweise und unabhängige Hilfswege.", intro: "MatchSignal ist eine Informationsplattform, kein Buchmacher, keine Hotline und keine Behandlungseinrichtung. Glücksspiel ist Risiko, kein Einkommen oder Investment.", sections: [
    ["Sicherere Grundsätze", "Nur im gesetzlichen Alter und bei Berechtigung wetten; bezahlbare Einzahlungs-, Einsatz-, Verlust- und Zeitlimits vorher setzen; Verluste nie jagen, nichts leihen und kein notwendiges Geld einsetzen; Pausen machen und nicht unter Stress oder Einfluss spielen. Kein Modell oder +EV-Signal garantiert Sicherheit."],
    ["Betreiberwerkzeuge", "Nutzen Sie, sofern vorhanden, Einzahlungs-, Einsatz-, Verlust- und Zeitlimits, Reality Checks, Auszeiten und Selbstausschluss. Fragen Sie den Glücksspielanbieter nach den für Sie geltenden Möglichkeiten."],
    ["Unabhängige Hilfe", "Bei Schäden aufhören und örtliche Fachhilfe suchen. Gambling Therapy, GamCare und Gamblers Anonymous können Ausgangspunkte sein, sind aber nicht in jedem Land verfügbar oder passend. In Krisen örtliche Notdienste kontaktieren."],
    ["Kontakt", "support@matchsignal.pro bearbeitet Inhaltsfragen, bietet aber keine klinische, Schulden- oder Krisenbehandlung."],
  ]},
  ai: { title: "KI-Haftungsausschluss", description: "Begrenzte KI-gestützte Auswahl und Unsicherheiten bei MatchSignal.", intro: "MatchSignal nutzt eine eingeschränkte Hybrid-Pipeline. Ausgaben sind probabilistische Informationen, keine garantierten Vorhersagen oder persönliche Beratung.", sections: [
    ["Validierte Kandidaten zuerst", "Code bildet gültige Kandidaten aus echten Buchmacher-Marktdaten. Produktion erfordert bookmakerCount >= 3. Markt, Auswahl, angezeigte Quote und Buchmachertiefe stammen aus demselben validierten Kandidaten."],
    ["Begrenzte KI-Rolle", "KI darf Markt oder Tipp nicht frei erfinden, sondern wählt eine candidateId aus der Codeliste. Die Wahrscheinlichkeit ist am Marktkonsens verankert; die Anpassung ist bewusst begrenzt, sodass KI allein keinen großen positiven EV erzeugen kann."],
    ["Produktionszulassung", "Ein Pick muss nach Anker, begrenzter Anpassung und Partnerpreis estimatedValuePct > 0 behalten. Das reduziert unbelegte Ausgaben, beweist aber keine Richtigkeit."],
    ["Grenzen", "Kontext kann falsch oder unvollständig sein, Daten können verzögert sein und Märkte schwanken. Live-Markt prüfen und unabhängig entscheiden."],
    ["Keine Besucherentscheidung", "Analysiert werden Sportereignisse; es erfolgt keine erhebliche Entscheidung über identifizierbare Besucher nach Art. 22 DSGVO. legal@matchsignal.pro."],
  ]},
  earnings: { title: "Ergebnis- und Ertragsausschluss", description: "Finanzrisiken von Wahrscheinlichkeiten, positivem Erwartungswert und Wettergebnissen.", intro: "MatchSignal verspricht keinen Gewinn, kein Einkommen, keinen ROI und keinen Sieg. Der gesamte Einsatz kann verloren gehen.", sections: [
    ["Keine Zukunftsgarantie", "Vergangenheit, Beispiele, Modellausgaben und frühere Picks garantieren keine künftige Leistung; auch fundierte Schätzungen verlieren."],
    ["EV ist theoretisch", "Positiver geschätzter Wert ist eine theoretische Beziehung zwischen unsicherer Wahrscheinlichkeit und Preis, kein Geld, garantierter Vorteil oder Gewinnversprechen. Modellfehler und Marge können ihn umkehren."],
    ["Quoten und Varianz", "Quoten und Verfügbarkeit ändern sich; Varianz, Korrelation, Ausführungslimits und Modellfehler können Ergebnisse abweichen lassen. Live-Preis prüfen."],
    ["Eigene Verantwortung", "Keine Finanz-, Anlage-, Rechts- oder professionelle Wettberatung. Entscheiden Sie unabhängig, nur mit tragbaren Einsätzen und der Möglichkeit des Totalverlusts."],
  ]},
  notice: { title: "Impressum / Rechtliche Hinweise", description: "Betreiber-, Register-, Kontakt- und Hostingangaben für MatchSignal.", intro: "Website: MatchSignal · https://www.matchsignal.pro. MatchSignal ist eine Informationsseite für Sportanalysen und kein Buchmacher, Glücksspiel- oder Zahlungsanbieter.", sections: [
    ["Betreiberin", "Forray Gyöngyi ist Website-Betreiberin und technisch Verantwortliche, Betreiberin der kommerziellen/Affiliate-Tätigkeit sowie Verantwortliche, wo MatchSignal Zwecke der Datenverarbeitung bestimmt."],
    ["Register", "Das ungarische Einzelunternehmerregister wird von der ungarischen Nationalen Steuer- und Zollverwaltung (NAV) geführt. Kammernummer und Telefon werden mangels verifizierter Angaben nicht erfunden."],
    ["Hosting", "Der verifizierte Deployment-Stack nutzt Vercel, Inc. für Hosting und Auslieferungsinfrastruktur."],
    ["Kontakt", "Allgemein: contact@matchsignal.pro. Rechtlich: legal@matchsignal.pro. Datenschutz: privacy@matchsignal.pro."],
  ]},
});

const fr = build({
  updated: "Dernière mise à jour : 20 août 2026",
  privacy: { title: "Politique de confidentialité", description: "Traitement des données personnelles par MatchSignal : contact, analyse, publicité et affiliation.", intro: "Cette notice explique le traitement au titre du RGPD. Forray Gyöngyi détermine les finalités et moyens décrits ici et agit comme responsable du traitement.", sections: [
    ["Données traitées", "Sont traités le choix de consentement et son horodatage dans le navigateur ; pour le contact, le nom, l'e-mail, le message, les champs anti-abus et l'adresse IP pour une limitation brève ; avec consentement, les données GA4 d'appareil, navigateur, provenance, pages, usage et localisation approximative ; les signaux publicitaires/de consentement Google lorsqu'ils sont disponibles ; et les requêtes techniques, données de sécurité et journaux du service d'hébergement."],
    ["Finalités et bases juridiques", "Le fonctionnement nécessaire et la sécurité reposent sur l'intérêt légitime (art. 6(1)(f) RGPD). La réponse à un contact repose, selon le cas, sur des mesures précontractuelles (art. 6(1)(b)) ou l'intérêt légitime. GA4 et la publicité Google soumise à consentement reposent sur celui-ci (art. 6(1)(a)). L'attribution d'affiliation à destination dépend des conditions du partenaire et d'intérêts commerciaux légitimes ; MatchSignal ne mesure le clic dans GA4 qu'avec consentement analytique."],
    ["Stockage nécessaire", "matchsignal_consent dans localStorage contient le choix analytique, une valeur publicitaire toujours fausse dans le mécanisme de secours MatchSignal, et un horodatage. Il reste jusqu'à modification ou suppression des données du site. La langue vient de l'URL et n'est pas stockée séparément."],
    ["Formulaire de contact", "Son utilisation est facultative. Nom, e-mail et message passent par le point de terminaison hébergé chez Vercel et par Resend pour parvenir à l'exploitante. L'adresse IP sert environ une minute dans la mémoire de l'instance pour limiter les abus. N'envoyez pas de données sensibles inutiles."],
    ["Google Analytics 4", "GA4 ne se charge qu'après autorisation analytique et peut traiter URL, provenance, appareil/navigateur, événements et localisation approximative ; il n'est pas qualifié d'anonyme. Google Analytics ne journalise ni ne conserve les adresses IP individuelles ; l'IP peut être utilisée transitoirement pour la géolocalisation puis supprimée selon la documentation régionale de Google. MatchSignal ne prétend pas avoir activé manuellement une anonymisation IP."],
    ["Publicité Google et liens affiliés", "AdSense peut traiter, selon la loi et les choix disponibles, signaux de consentement, données d'appareil/navigateur, identifiants publicitaires et cookies. Dans l'EEE, au Royaume-Uni et en Suisse, la publicité Google personnalisée exige une CMP certifiée Google intégrée à l'IAB TCF. Les URL affiliées comportent des paramètres de parrainage ; après le clic, l'avis du partenaire s'applique."],
    ["Sous-traitants et destinataires", "Vercel fournit hébergement, diffusion et sécurité ; Resend livre les e-mails du formulaire ; Google fournit GA4, AdSense et les services de consentement disponibles. Les partenaires ne reçoivent les données normales de requête/référence que si vous suivez leur lien. Le dépôt ne montre pas d'envoi de données visiteurs identifiables à Groq ou The Odds API : ils ne sont donc pas cités comme sous-traitants visiteurs."],
    ["Transferts internationaux", "Un traitement hors EEE doit, lorsque le RGPD l'exige, reposer sur une décision d'adéquation, des clauses contractuelles types ou une autre garantie légale proposée pour le traitement concerné."],
    ["Conservation", "Le choix reste jusqu'à modification/suppression. Les demandes sont conservées le temps de répondre et du suivi, normalement au plus 24 mois sauf obligation ou litige. La limite anti-abus dure environ une minute. Les journaux Vercel et données Google suivent les besoins de sécurité, la configuration et les règles des fournisseurs."],
    ["Sécurité", "Des contrôles d'accès, le chiffrement en transit, la validation des entrées, la limitation et des protections d'hébergement géré sont utilisés. Aucun système Internet n'est totalement sûr."],
    ["Vos droits", "Vous disposez des droits à l'information, l'accès, la rectification, l'effacement, la limitation, la portabilité lorsqu'elle s'applique, l'opposition aux intérêts légitimes, le retrait du consentement et la réclamation. Écrivez à privacy@matchsignal.pro ; une vérification d'identité raisonnable peut être demandée."],
    ["Réclamation auprès de la NAIH", "Vous pouvez saisir la Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Hongrie ; courrier : 1363 Budapest, Pf. 9. ; e-mail : ugyfelszolgalat@naih.hu, ou l'autorité de votre lieu de résidence/travail."],
    ["Données obligatoires et décision automatisée", "Le formulaire est facultatif, mais ses champs requis sont nécessaires pour répondre. Refuser l'analyse ou la publicité ne bloque pas le contenu essentiel. Le système produit des informations sur des événements sportifs ; il ne prend aucune décision sur un visiteur identifiable produisant des effets juridiques ou similaires au sens de l'article 22 RGPD."],
    ["Contact", "Vie privée et droits : privacy@matchsignal.pro. Général : contact@matchsignal.pro. Juridique : legal@matchsignal.pro."],
  ]},
  cookie: { title: "Politique relative aux cookies", description: "Stockage navigateur de MatchSignal, GA4, AdSense et services de consentement.", intro: "Cette politique reflète le code actuel. localStorage peut persister sans expiration fixe. Les identifiants Google variant, les exemples publicitaires ne sont pas exhaustifs.", inventoryHeading: "Tableau des stockages et cookies", tableHeaders: ["Fournisseur", "Catégorie", "Identifiant / exemple", "Partie", "Finalité", "Durée", "Consentement"], tableRows: [
    ["MatchSignal", "Nécessaire", "matchsignal_consent (localStorage)", "Première partie", "Choix analytique et horodatage ; publicité de secours refusée", "Jusqu'à modification ou effacement", "Non, nécessaire pour mémoriser le choix"],
    ["Google Analytics 4", "Analyse", "_ga ; _ga_<container-id>", "Cookie première partie pour Google", "État du navigateur, de session et de mesure", "Souvent jusqu'à 2 ans selon configuration", "Oui"],
    ["Google AdSense / Google", "Publicité", "Exemples : __gads, __gpi, IDE, NID et autres identifiants Google", "Première ou tierce partie", "Diffusion, fréquence, fraude, mesure et personnalisation avec consentement valide", "Selon l'identifiant et les règles Google", "Lorsque requis ; oui pour personnaliser"],
    ["Services de consentement Google / CMP", "Nécessaire ou consentement", "Chaînes de consentement et stockage fournisseur, dont IAB TCF si applicable", "Première ou tierce partie", "Enregistrer et transmettre le choix", "Selon CMP et enregistrement", "Pour enregistrer/transmettre le choix"],
  ], sections: [
    ["Fonctionnement du code", "MatchSignal n'utilise pas sessionStorage et n'écrit pas directement document.cookie. GA4 ne charge qu'avec autorisation analytique. Le panneau de secours ne gère que l'analyse et maintient la publicité refusée. Les crochets AdSense/Google sont dans la mise en page racine ; interface et cookies peuvent varier selon région et configuration."],
    ["CMP et consentement publicitaire", "Dans l'EEE, au Royaume-Uni et en Suisse, la personnalisation Google exige une CMP certifiée Google/IAB TCF. L'architecture écoute les signaux Google disponibles et propose sinon un secours analytique. Elle ne prétend pas qu'un dialogue Google apparaît correctement à chaque visite. Les services publicitaires doivent respecter les signaux et choix CMP disponibles."],
    ["Vos contrôles", "Le bouton ci-dessous rouvre le contrôle actif. Vous pouvez aussi bloquer ou effacer le stockage dans le navigateur. Cela peut réduire l'analyse ou la publicité sans bloquer le contenu essentiel."],
    ["Mises à jour et contact", "Google peut changer noms et durées ; la liste n'est pas exhaustive. Elle sera mise à jour lors d'une évolution importante. privacy@matchsignal.pro."],
  ]},
  terms: { title: "Conditions d'utilisation", description: "Conditions des analyses informatives, outils et liens externes MatchSignal.", intro: "En utilisant MatchSignal, vous acceptez ces conditions ; sinon, n'utilisez pas le service.", sections: [
    ["Information uniquement", "MatchSignal fournit analyses sportives éducatives, probabilités, calculateurs et comparaisons. Ce n'est ni un bookmaker, ni un opérateur de jeu, paiement ou finance ; aucun pari ni fonds client n'est accepté."],
    ["Âge et droit local", "Le contenu de pari est réservé aux adultes légalement éligibles là où ils vivent. Vous êtes responsable de la juridiction, de l'éligibilité opérateur, des conditions de compte et obligations fiscales."],
    ["Aucune garantie", "Résultats incertains ; cotes, promotions, marchés et disponibilité changent. Fraîcheur, exactitude, disponibilité, bénéfice et résultat ne sont pas garantis. Vérifiez marché, sélection, prix et règlement chez l'opérateur."],
    ["Tiers", "Les conditions de licence, éligibilité, paiement, retrait, vie privée et promotion du site externe s'appliquent. Un lien n'est pas une validation globale de qualité."],
    ["Propriété intellectuelle et usage", "Design, textes originaux, marque et compilation sont protégés. Usage personnel licite autorisé ; extraction, republication, perturbation ou détournement non autorisés interdits sauf droit impératif."],
    ["Responsabilité, changements, contact", "Dans les limites légales, aucune responsabilité pour pertes de pari, profits manqués, dommages indirects, cotes périmées, tiers ou interruption ; les droits impératifs restent. Les conditions peuvent évoluer pour raisons juridiques, techniques ou opérationnelles. legal@matchsignal.pro ; contact@matchsignal.pro."],
  ]},
  affiliate: { title: "Divulgation d'affiliation", description: "Liens affiliés, commissions et présentation commerciale de MatchSignal.", intro: "Certains liens sont sponsorisés ; une action admissible peut générer une commission pour MatchSignal.", sections: [
    ["Rémunération", "Les conditions varient. La commission n'ajoute normalement pas de frais MatchSignal distincts, mais prix, éligibilité et conditions du partenaire s'appliquent."],
    ["Lien avec les prédictions", "L'affiliation ne contrôle ni candidats générés par code, ni calcul du marché, ni ancrage consensuel, ni calculs. Un CTA MatchCard n'apparaît que si le même marché et la même sélection validés sont disponibles chez le partenaire."],
    ["Ordre commercial", "Inclusion et ordre peuvent être configurés commercialement. L'annuaire ne prétend pas être un classement qualitatif indépendant ; Partenaire en vedette n'est pas une note empirique."],
    ["Conditions tierces", "Âge, éligibilité, géographie, promotion et droit local doivent être vérifiés avant inscription, dépôt ou pari."],
    ["Règle hongroise", "Les liens sportsbook sont supprimés uniquement sur /hu, selon la locale et non l'IP. Les services informatifs comme BetQL peuvent rester selon la configuration. legal@matchsignal.pro."],
  ]},
  responsible: { title: "Jeu responsable", description: "Conseils prudents et aide indépendante.", intro: "MatchSignal est une plateforme d'information, pas un bookmaker, une ligne d'aide ou un prestataire de soins. Le jeu est un risque, pas un revenu ni un investissement.", sections: [
    ["Principes plus sûrs", "Jouez seulement à l'âge légal et si vous êtes éligible ; fixez des limites abordables de dépôt, mise, perte et temps ; ne poursuivez jamais les pertes, n'empruntez pas et n'utilisez pas l'argent essentiel ; faites des pauses et évitez de jouer en détresse ou sous influence. Aucun modèle ni +EV ne garantit la sécurité."],
    ["Outils opérateur", "Utilisez limites, rappels, pause et auto-exclusion lorsqu'ils existent ; demandez à l'opérateur ce qui s'applique à votre compte et pays."],
    ["Aide indépendante", "En cas de préjudice, arrêtez et cherchez une aide locale qualifiée. Gambling Therapy, GamCare et Gamblers Anonymous peuvent orienter, sans être garantis ni adaptés partout. En crise, contactez les secours locaux."],
    ["Contact", "support@matchsignal.pro traite les problèmes de contenu mais ne fournit pas de soins cliniques, dette ou crise."],
  ]},
  ai: { title: "Avertissement relatif à l'IA", description: "Sélection assistée par IA contrainte et incertitudes de MatchSignal.", intro: "MatchSignal utilise un pipeline hybride contraint. Les résultats sont probabilistes et informatifs, jamais garantis ni personnalisés.", sections: [
    ["Candidats validés d'abord", "Le code crée les candidats à partir de vrais marchés bookmakers. La production exige bookmakerCount >= 3. Marché, sélection, cote affichée et profondeur proviennent du même candidat validé."],
    ["Rôle IA contraint", "L'IA ne peut inventer librement marché ou pronostic ; elle choisit un candidateId de la liste de code. La probabilité est ancrée au consensus, et l'ajustement borné empêche l'IA de fabriquer seule un grand EV positif."],
    ["Éligibilité production", "Un choix doit conserver estimatedValuePct > 0 après ancre, ajustement borné et prix partenaire. Cela réduit les résultats non étayés sans prouver l'estimation."],
    ["Limites", "Le raisonnement contextuel peut être faux ou incomplet ; données retardées et marchés mouvants ajoutent de la variance. Vérifiez le marché en direct et jugez indépendamment."],
    ["Aucune décision visiteur", "Le système analyse des événements, sans décision significative sur un visiteur identifiable au sens de l'article 22 RGPD. legal@matchsignal.pro."],
  ]},
  earnings: { title: "Avertissement sur les gains", description: "Risques financiers des probabilités, de la valeur attendue positive et des paris.", intro: "MatchSignal ne promet aucun bénéfice, revenu, ROI ni gain. La totalité de la mise peut être perdue.", sections: [
    ["Aucune garantie future", "Historique, exemples, sorties et anciens choix ne garantissent rien ; une estimation solide peut perdre."],
    ["EV théorique", "La valeur estimée positive est une relation théorique entre probabilité incertaine et prix, non de l'argent, un avantage garanti ou une promesse. Erreur de modèle et marge peuvent l'inverser."],
    ["Cotes et variance", "Cotes et disponibilité changent ; variance, corrélation, limites d'exécution et erreur de modèle éloignent les résultats. Vérifiez le prix en direct."],
    ["Votre responsabilité", "Aucun conseil financier, d'investissement, juridique ou professionnel. Décidez seul, avec mises abordables et risque de perte totale."],
  ]},
  notice: { title: "Mentions légales", description: "Exploitante, registre, contacts et hébergement de MatchSignal.", intro: "Site : MatchSignal · https://www.matchsignal.pro. MatchSignal est un site informatif d'analyse sportive, pas un bookmaker, opérateur de jeu ou prestataire de paiement.", sections: [
    ["Exploitante", "Forray Gyöngyi assure maintenance et exploitation technique, activité commerciale/affiliation, et agit comme responsable lorsque MatchSignal détermine les finalités."],
    ["Registre", "Le Registre hongrois des entrepreneurs individuels est exploité par l'Administration nationale des impôts et douanes (NAV). Aucun numéro de chambre ou téléphone n'est inventé faute de vérification."],
    ["Hébergement", "La pile vérifiée utilise Vercel, Inc. pour l'hébergement et la diffusion."],
    ["Contacts", "Général : contact@matchsignal.pro. Juridique : legal@matchsignal.pro. Vie privée : privacy@matchsignal.pro."],
  ]},
});

const es = build({
  updated: "Última actualización: 20 de agosto de 2026",
  privacy: { title: "Política de privacidad", description: "Tratamiento de datos personales por MatchSignal: contacto, analítica, publicidad y afiliación.", intro: "Este aviso explica el tratamiento conforme al RGPD. Forray Gyöngyi determina los fines y medios aquí descritos y es la responsable del tratamiento.", sections: [
    ["Datos tratados", "Se tratan la preferencia de consentimiento y su marca temporal en el navegador; en contacto, nombre, email, mensaje, campos antiabuso e IP para un límite breve; con consentimiento, datos GA4 de dispositivo, navegador, referencia, páginas, uso y ubicación aproximada; señales publicitarias/de consentimiento de Google cuando estén disponibles; y solicitudes técnicas, seguridad y registros del alojamiento."],
    ["Fines y bases jurídicas", "El funcionamiento necesario y la seguridad se basan en interés legítimo (art. 6.1.f RGPD). Responder contactos se basa, según el caso, en medidas precontractuales (art. 6.1.b) o interés legítimo. GA4 y la publicidad Google que requiere permiso se basan en consentimiento (art. 6.1.a). La atribución afiliada en destino depende de condiciones del socio e interés comercial legítimo; MatchSignal mide clics en GA4 solo con consentimiento analítico."],
    ["Almacenamiento necesario", "matchsignal_consent en localStorage contiene la opción analítica, un valor publicitario siempre falso en el respaldo de MatchSignal y una marca temporal. Persiste hasta cambiarse o borrar datos del sitio. El idioma viene de la URL y no se guarda aparte."],
    ["Formulario de contacto", "Es opcional. Nombre, email y mensaje pasan por el endpoint alojado en Vercel y Resend hasta la operadora. La IP se usa aproximadamente un minuto en memoria de la instancia para limitar abusos. No envíe datos sensibles innecesarios."],
    ["Google Analytics 4", "GA4 solo carga con permiso analítico y puede tratar URL, referencia, dispositivo/navegador, eventos y ubicación aproximada; no se describe como anónimo. Google Analytics no registra ni almacena IP individuales; puede usar la IP transitoriamente para geolocalizar y descartarla según su documentación regional. MatchSignal no afirma haber habilitado manualmente anonimización de IP."],
    ["Publicidad Google y enlaces afiliados", "AdSense puede tratar señales de consentimiento, datos de dispositivo/navegador, IDs publicitarios y cookies conforme a ley y opciones. En EEE, Reino Unido y Suiza la publicidad personalizada exige una CMP certificada por Google integrada con IAB TCF. Las URL afiliadas llevan parámetros de referencia; después del clic rige el aviso del socio."],
    ["Encargados y destinatarios", "Vercel aporta alojamiento, entrega y seguridad; Resend envía emails del formulario; Google aporta GA4, AdSense y servicios de consentimiento disponibles. Los socios reciben datos normales de solicitud/referencia solo al seguir su enlace. El repositorio no muestra envío de datos identificables de visitantes a Groq ni The Odds API, por lo que no se citan como encargados de esos datos."],
    ["Transferencias internacionales", "El tratamiento fuera del EEE debe apoyarse, cuando corresponda, en decisión de adecuación, cláusulas contractuales tipo u otra garantía lícita ofrecida para ese tratamiento."],
    ["Conservación", "La preferencia dura hasta cambio/borrado. Las consultas se conservan para responder y seguir, normalmente como máximo 24 meses salvo obligación o reclamación. El límite antiabuso dura cerca de un minuto. Los registros Vercel y datos Google siguen necesidad de seguridad, configuración y políticas del proveedor."],
    ["Seguridad", "Se usan controles de acceso, cifrado en tránsito, validación, límites y protección de alojamiento gestionado. Ningún sistema de Internet es completamente seguro."],
    ["Sus derechos", "Tiene derechos de información, acceso, rectificación, supresión, limitación, portabilidad cuando proceda, oposición a intereses legítimos, retirada del consentimiento y reclamación. Escriba a privacy@matchsignal.pro; puede pedirse verificación razonable de identidad."],
    ["Reclamación ante NAIH", "Puede reclamar ante Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Hungría; postal: 1363 Budapest, Pf. 9.; email: ugyfelszolgalat@naih.hu, o ante la autoridad de su residencia/trabajo."],
    ["Datos obligatorios y decisiones automatizadas", "El formulario es opcional, pero los campos requeridos son necesarios para responder. Rechazar analítica o publicidad no bloquea el contenido esencial. El sistema produce información sobre eventos deportivos y no toma decisiones sobre visitantes identificables con efectos jurídicos o similares conforme al artículo 22 RGPD."],
    ["Contacto", "Privacidad y derechos: privacy@matchsignal.pro. General: contact@matchsignal.pro. Legal: legal@matchsignal.pro."],
  ]},
  cookie: { title: "Política de cookies", description: "Almacenamiento del navegador de MatchSignal, GA4, AdSense y servicios de consentimiento.", intro: "Refleja el código actual. localStorage puede persistir sin caducidad fija. Como Google puede variar identificadores, los ejemplos publicitarios no son exhaustivos.", inventoryHeading: "Tabla de almacenamiento y cookies", tableHeaders: ["Proveedor", "Categoría", "Identificador / ejemplo", "Parte", "Finalidad", "Duración", "Consentimiento"], tableRows: [
    ["MatchSignal", "Necesario", "matchsignal_consent (localStorage)", "Primera parte", "Opción analítica y fecha; publicidad de respaldo denegada", "Hasta cambio o borrado", "No, necesario para recordar la opción"],
    ["Google Analytics 4", "Analítica", "_ga; _ga_<container-id>", "Cookie de primera parte para Google", "Estado de navegador, sesión y medición", "Habitualmente hasta 2 años según configuración", "Sí"],
    ["Google AdSense / Google", "Publicidad", "Ejemplos: __gads, __gpi, IDE, NID y otros IDs Google", "Primera o tercera parte", "Entrega, frecuencia, fraude, medición y personalización con permiso válido", "Según identificador y política Google", "Cuando sea necesario; sí para personalizar"],
    ["Servicios de consentimiento Google / CMP", "Necesario o consentimiento", "Cadenas de consentimiento y almacenamiento del proveedor, incluido IAB TCF cuando aplique", "Primera o tercera parte", "Registrar y comunicar la opción", "Según CMP y registro", "Para registrar/comunicar la opción"],
  ], sections: [
    ["Código actual", "MatchSignal no usa sessionStorage ni escribe directamente document.cookie. GA4 carga solo con permiso analítico. El panel de respaldo controla solo analítica y mantiene publicidad denegada. AdSense y ganchos Google están en el layout raíz; interfaz y cookies varían por región/configuración."],
    ["CMP y consentimiento publicitario", "En EEE, Reino Unido y Suiza la personalización Google requiere CMP certificada/IAB TCF. La arquitectura escucha señales Google disponibles y, si no, ofrece respaldo analítico. No afirma que un diálogo Google se muestre correctamente en cada visita. La publicidad debe respetar señales y elecciones CMP disponibles."],
    ["Sus controles", "El botón inferior reabre el control activo. También puede bloquear/borrar almacenamiento en su navegador. Puede reducir analítica o publicidad sin impedir el contenido esencial."],
    ["Cambios y contacto", "Google puede cambiar nombres y duraciones; la lista no es exhaustiva. Se actualizará con cambios importantes. privacy@matchsignal.pro."],
  ]},
  terms: { title: "Términos de uso", description: "Condiciones para análisis informativos, herramientas y enlaces externos de MatchSignal.", intro: "Al usar MatchSignal acepta estos términos; si no, no use el servicio.", sections: [
    ["Solo información", "MatchSignal ofrece análisis educativos, probabilidades, calculadoras y comparaciones. No es casa de apuestas, operador de juego, pagos o finanzas; no acepta apuestas ni custodia fondos."],
    ["Edad y ley local", "Contenido solo para adultos legalmente habilitados donde residan. Usted responde de jurisdicción, elegibilidad, cuenta e impuestos."],
    ["Sin garantías", "Resultados inciertos; cuotas, promociones, mercados y disponibilidad cambian. No se garantizan actualidad, exactitud, disponibilidad, beneficio ni resultado. Verifique mercado, selección, precio y liquidación con el operador."],
    ["Terceros", "Rigen licencias, elegibilidad, pagos, retiradas, privacidad y promociones del sitio externo. Un enlace no garantiza toda su calidad."],
    ["Propiedad y uso", "Diseño, textos originales, marca y recopilación están protegidos. Uso personal lícito permitido; extracción, republicación, interferencia o abuso no autorizados prohibidos salvo derecho imperativo."],
    ["Responsabilidad, cambios, contacto", "Hasta donde la ley permita, no hay responsabilidad por pérdidas de apuesta, lucro cesante, daños indirectos, cuotas antiguas, terceros o interrupción; derechos obligatorios permanecen. Pueden cambiar por motivos legales, técnicos u operativos. legal@matchsignal.pro; contact@matchsignal.pro."],
  ]},
  affiliate: { title: "Divulgación de afiliados", description: "Enlaces afiliados, comisiones y presentación comercial de MatchSignal.", intro: "Algunos enlaces son patrocinados; una acción válida puede generar comisión para MatchSignal.", sections: [
    ["Remuneración", "Las condiciones varían. Normalmente no añade una tarifa separada de MatchSignal, pero aplican precios, elegibilidad y términos del socio."],
    ["Relación con predicciones", "La afiliación no controla candidatos creados por código, matemáticas, anclaje de consenso ni cálculos. El CTA MatchCard solo aparece si el mismo mercado y selección validados están disponibles en el socio."],
    ["Orden comercial", "Inclusión y orden pueden configurarse comercialmente. El directorio no afirma una clasificación independiente de calidad; Socio destacado no es una nota empírica."],
    ["Condiciones del tercero", "Compruebe edad, elegibilidad, geografía, promoción y ley local antes de registrarse, depositar o apostar."],
    ["Regla húngara", "Los enlaces de sportsbooks se suprimen solo en /hu por locale, no por IP. Servicios informativos como BetQL pueden permanecer según configuración. legal@matchsignal.pro."],
  ]},
  responsible: { title: "Juego responsable", description: "Orientación prudente y ayuda independiente.", intro: "MatchSignal es información, no casa de apuestas, línea de ayuda ni tratamiento. Apostar implica riesgo y no es ingreso ni inversión.", sections: [
    ["Principios seguros", "Apueste solo con edad y elegibilidad legal; fije límites asequibles de depósito, apuesta, pérdida y tiempo; nunca persiga pérdidas, pida prestado ni use dinero esencial; descanse y no apueste bajo angustia o sustancias. Ningún modelo o +EV garantiza seguridad."],
    ["Herramientas del operador", "Use límites, recordatorios, pausas y autoexclusión donde existan; pregunte al operador qué aplica a su cuenta y país."],
    ["Ayuda independiente", "Si hay daño, pare y busque ayuda local cualificada. Gambling Therapy, GamCare y Gamblers Anonymous pueden orientar, pero no están garantizados ni son adecuados en todos los lugares. En crisis, contacte emergencias locales."],
    ["Contacto", "support@matchsignal.pro atiende contenido, no ofrece tratamiento clínico, de deuda o crisis."],
  ]},
  ai: { title: "Descargo sobre IA", description: "Selección asistida por IA limitada e incertidumbre de MatchSignal.", intro: "MatchSignal usa un flujo híbrido limitado. Los resultados son información probabilística, no predicciones garantizadas ni consejo personal.", sections: [
    ["Primero candidatos validados", "El código construye candidatos con mercados reales. Producción exige bookmakerCount >= 3. Mercado, selección, cuota mostrada y profundidad vienen del mismo candidato validado."],
    ["Papel limitado de la IA", "La IA no inventa libremente mercado o pronóstico; elige un candidateId de la lista del código. La probabilidad se ancla al consenso y el ajuste acotado evita que fabrique por sí sola gran EV positivo."],
    ["Elegibilidad de producción", "La selección debe mantener estimatedValuePct > 0 tras ancla, ajuste y precio del socio. Reduce salidas sin base, pero no prueba el cálculo."],
    ["Limitaciones", "El contexto puede ser erróneo/incompleto, los datos demorarse y el mercado moverse. Verifique en directo y decida independientemente."],
    ["Sin decisión del visitante", "Analiza eventos, no adopta decisiones significativas sobre visitantes identificables conforme al art. 22 RGPD. legal@matchsignal.pro."],
  ]},
  earnings: { title: "Descargo de ganancias", description: "Riesgo financiero de probabilidades, valor esperado positivo y apuestas.", intro: "MatchSignal no promete beneficios, ingresos, ROI ni victorias. Puede perderse toda la apuesta.", sections: [
    ["Sin garantía futura", "Historial, ejemplos, modelos y selecciones pasadas no garantizan el futuro; una estimación sólida puede perder."],
    ["EV teórico", "El valor estimado positivo es relación teórica entre probabilidad incierta y precio, no dinero, ventaja garantizada ni promesa. Error de modelo y margen pueden invertirlo."],
    ["Cuotas y varianza", "Cuotas y disponibilidad cambian; varianza, correlación, límites y error separan resultados. Compruebe el precio actual."],
    ["Responsabilidad", "No es asesoramiento financiero, de inversión, jurídico ni profesional. Decida solo, con importes asequibles y riesgo de pérdida total."],
  ]},
  notice: { title: "Aviso legal", description: "Operadora, registro, contactos y alojamiento de MatchSignal.", intro: "Sitio: MatchSignal · https://www.matchsignal.pro. Es un sitio informativo de análisis deportivo, no casa de apuestas, operador de juego ni pagos.", sections: [
    ["Operadora", "Forray Gyöngyi mantiene y opera técnicamente el sitio, opera la actividad comercial/afiliada y es responsable cuando MatchSignal determina fines del tratamiento."],
    ["Registro", "El Registro húngaro de Empresarios Individuales lo opera la Administración Nacional de Impuestos y Aduanas (NAV). No se inventan número de cámara ni teléfono no verificados."],
    ["Alojamiento", "La pila verificada usa Vercel, Inc. para alojamiento y entrega."],
    ["Contactos", "General: contact@matchsignal.pro. Legal: legal@matchsignal.pro. Privacidad: privacy@matchsignal.pro."],
  ]},
});

const it = build({
  updated: "Ultimo aggiornamento: 20 agosto 2026",
  privacy: { title: "Informativa sulla privacy", description: "Trattamento dei dati personali da parte di MatchSignal: contatti, analisi, pubblicità e affiliazione.", intro: "Questa informativa descrive il trattamento ai sensi del GDPR. Forray Gyöngyi determina finalità e mezzi qui descritti ed è titolare del trattamento.", sections: [
    ["Dati trattati", "Sono trattati la scelta di consenso e la sua data nel browser; nel contatto nome, e-mail, messaggio, campi antiabuso e IP per una breve limitazione; con consenso dati GA4 su dispositivo, browser, provenienza, pagine, utilizzo e posizione approssimativa; segnali pubblicitari/di consenso Google quando disponibili; richieste tecniche, sicurezza e log dell'hosting."],
    ["Finalità e basi giuridiche", "Funzionamento necessario e sicurezza si basano sul legittimo interesse (art. 6(1)(f) GDPR). La risposta ai contatti si basa, secondo il caso, su misure precontrattuali (art. 6(1)(b)) o interesse legittimo. GA4 e pubblicità Google soggetta a consenso si basano sul consenso (art. 6(1)(a)). L'attribuzione affiliata a destinazione segue termini del partner e interessi commerciali legittimi; MatchSignal misura il clic in GA4 solo con consenso analitico."],
    ["Archiviazione necessaria", "matchsignal_consent in localStorage contiene la scelta analitica, un valore pubblicitario sempre falso nel fallback MatchSignal e la data. Resta fino a modifica o cancellazione dei dati del sito. La lingua deriva dall'URL e non viene memorizzata separatamente."],
    ["Modulo di contatto", "È facoltativo. Nome, e-mail e messaggio passano dall'endpoint ospitato su Vercel e da Resend alla titolare. L'IP è usato per circa un minuto nella memoria dell'istanza per limitare abusi. Non inviare dati sensibili non necessari."],
    ["Google Analytics 4", "GA4 si carica solo con autorizzazione analitica e può trattare URL, provenienza, dispositivo/browser, eventi e posizione approssimativa; non è definito anonimo. Google Analytics non registra né conserva singoli indirizzi IP; può usare transitoriamente l'IP per la geolocalizzazione e poi eliminarlo secondo la documentazione regionale Google. MatchSignal non afferma di aver attivato manualmente l'anonimizzazione IP."],
    ["Pubblicità Google e link affiliati", "AdSense può trattare segnali di consenso, dati dispositivo/browser, ID pubblicitari e cookie secondo legge e scelte. In SEE, Regno Unito e Svizzera la pubblicità personalizzata richiede una CMP certificata Google integrata IAB TCF. Gli URL affiliati contengono parametri di referral; dopo il clic si applica l'informativa del partner."],
    ["Responsabili e destinatari", "Vercel fornisce hosting, distribuzione e sicurezza; Resend invia le e-mail del modulo; Google fornisce GA4, AdSense e servizi di consenso disponibili. I partner ricevono dati normali di richiesta/referral solo se si segue il link. Il repository non mostra invio di dati visitatore identificabili a Groq o The Odds API, quindi non sono indicati come responsabili di tali dati."],
    ["Trasferimenti internazionali", "Il trattamento fuori dal SEE deve fondarsi, ove richiesto, su decisione di adeguatezza, clausole contrattuali standard o altra garanzia lecita offerta per quello specifico trattamento."],
    ["Conservazione", "La scelta resta fino a modifica/cancellazione. Le richieste sono conservate per risposta e seguito, normalmente non oltre 24 mesi salvo obblighi o pretese legali. Il record antiabuso dura circa un minuto. Log Vercel e dati Google seguono necessità di sicurezza, configurazione e regole dei fornitori."],
    ["Sicurezza", "Si usano controlli di accesso, cifratura in transito, validazione input, limitazione e protezioni dell'hosting gestito. Nessun sistema Internet è totalmente sicuro."],
    ["Diritti", "Sono disponibili informazione, accesso, rettifica, cancellazione, limitazione, portabilità ove applicabile, opposizione al legittimo interesse, revoca del consenso e reclamo. Scrivere a privacy@matchsignal.pro; può essere richiesta una verifica ragionevole dell'identità."],
    ["Reclamo NAIH", "È possibile rivolgersi alla Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Ungheria; posta: 1363 Budapest, Pf. 9.; e-mail: ugyfelszolgalat@naih.hu, o all'autorità del luogo di residenza/lavoro."],
    ["Dati obbligatori e decisioni automatizzate", "Il modulo è facoltativo, ma i campi richiesti servono per rispondere. Rifiutare analisi o pubblicità non blocca i contenuti essenziali. Il sistema crea informazioni sugli eventi sportivi e non prende decisioni su visitatori identificabili con effetti giuridici o analoghi ai sensi dell'art. 22 GDPR."],
    ["Contatti", "Privacy e diritti: privacy@matchsignal.pro. Generale: contact@matchsignal.pro. Legale: legal@matchsignal.pro."],
  ]},
  cookie: { title: "Cookie Policy", description: "Archiviazione browser di MatchSignal, GA4, AdSense e servizi di consenso.", intro: "Riflette il codice attuale. localStorage può persistere senza scadenza fissa. Gli identificatori Google cambiano, quindi gli esempi pubblicitari non sono esaustivi.", inventoryHeading: "Tabella di storage e cookie", tableHeaders: ["Fornitore", "Categoria", "Identificatore / esempio", "Parte", "Finalità", "Durata", "Consenso"], tableRows: [
    ["MatchSignal", "Necessario", "matchsignal_consent (localStorage)", "Prima parte", "Scelta analitica e data; pubblicità fallback negata", "Fino a modifica/cancellazione", "No, necessario per ricordare la scelta"],
    ["Google Analytics 4", "Analisi", "_ga; _ga_<container-id>", "Cookie prima parte per Google", "Stato browser, sessione e misurazione", "Spesso fino a 2 anni secondo configurazione", "Sì"],
    ["Google AdSense / Google", "Pubblicità", "Esempi: __gads, __gpi, IDE, NID e altri ID Google", "Prima o terza parte", "Erogazione, frequenza, frode, misura e personalizzazione con consenso valido", "Secondo ID e policy Google", "Quando richiesto; sì per personalizzare"],
    ["Servizi consenso Google / CMP", "Necessario o consenso", "Stringhe di consenso e storage del fornitore, incluso IAB TCF ove applicabile", "Prima o terza parte", "Registrare/comunicare la scelta", "Secondo CMP e record", "Per registrare/comunicare la scelta"],
  ], sections: [
    ["Codice attuale", "MatchSignal non usa sessionStorage e non scrive direttamente document.cookie. GA4 carica solo con permesso analitico. Il pannello fallback gestisce solo analisi e mantiene la pubblicità negata. AdSense e hook Google sono nel layout radice; UI e cookie variano per regione/configurazione."],
    ["CMP e consenso pubblicitario", "In SEE, Regno Unito e Svizzera la personalizzazione Google richiede CMP certificata/IAB TCF. L'architettura ascolta i segnali Google disponibili e altrimenti offre fallback analitico. Non afferma che un dialogo Google appaia correttamente a ogni visita. I servizi pubblicitari devono rispettare segnali e scelte CMP disponibili."],
    ["Controlli", "Il pulsante sotto riapre il controllo attivo. È possibile bloccare/cancellare storage nel browser. Ciò può ridurre analisi o pubblicità senza impedire i contenuti essenziali."],
    ["Aggiornamenti e contatto", "Google può cambiare nomi e durate; la lista non è completa. Sarà aggiornata con modifiche sostanziali. privacy@matchsignal.pro."],
  ]},
  terms: { title: "Termini di utilizzo", description: "Condizioni per analisi informative, strumenti e link esterni MatchSignal.", intro: "Usando MatchSignal si accettano questi termini; in caso contrario non usare il servizio.", sections: [
    ["Solo informazione", "MatchSignal offre analisi educative, probabilità, calcolatori e confronti. Non è bookmaker, operatore di gioco, pagamenti o finanza; non accetta scommesse né custodisce fondi."],
    ["Età e legge locale", "Contenuti solo per adulti legalmente idonei. L'utente risponde di giurisdizione, idoneità, condizioni conto e imposte."],
    ["Nessuna garanzia", "Esiti incerti; quote, promozioni, mercati e disponibilità cambiano. Non si garantiscono attualità, accuratezza, disponibilità, profitto o risultato. Verificare mercato, selezione, prezzo e regole con l'operatore."],
    ["Terze parti", "Valgono licenze, idoneità, pagamenti, prelievi, privacy e promozioni del sito esterno. Un link non ne garantisce ogni qualità."],
    ["Proprietà e uso", "Design, testi originali, marchio e raccolta sono protetti. È consentito l'uso personale lecito; scraping, ripubblicazione, interferenza o abuso non autorizzati sono vietati salvo legge imperativa."],
    ["Responsabilità, modifiche, contatti", "Nei limiti di legge, nessuna responsabilità per perdite, mancati profitti, danni indiretti, quote vecchie, terzi o interruzioni; i diritti inderogabili restano. I termini possono cambiare per ragioni legali, tecniche o operative. legal@matchsignal.pro; contact@matchsignal.pro."],
  ]},
  affiliate: { title: "Informativa di affiliazione", description: "Link affiliati, commissioni e presentazione commerciale MatchSignal.", intro: "Alcuni link sono sponsorizzati; un'azione valida può generare una commissione per MatchSignal.", sections: [
    ["Compenso", "Le condizioni variano. Di norma non aggiunge una tariffa MatchSignal separata, ma valgono prezzi, idoneità e termini del partner."],
    ["Rapporto con le previsioni", "L'affiliazione non controlla candidati creati dal codice, matematica, ancoraggio al consenso o calcoli. Il CTA MatchCard appare solo se lo stesso mercato e selezione validati sono disponibili dal partner."],
    ["Ordine commerciale", "Inclusione e ordine possono essere configurati commercialmente. La directory non dichiara una classifica indipendente di qualità; Partner in evidenza non è un voto empirico."],
    ["Termini terzi", "Verificare età, idoneità, area, promozione e legge locale prima di registrarsi, depositare o scommettere."],
    ["Regola ungherese", "I link sportsbook sono soppressi solo su /hu in base alla locale, non all'IP. Servizi informativi come BetQL possono restare come configurati. legal@matchsignal.pro."],
  ]},
  responsible: { title: "Gioco responsabile", description: "Indicazioni prudenti e supporto indipendente.", intro: "MatchSignal è informazione, non bookmaker, linea di aiuto o trattamento. Il gioco comporta rischio e non è reddito o investimento.", sections: [
    ["Principi più sicuri", "Scommettere solo con età e idoneità legale; fissare limiti sostenibili di deposito, puntata, perdita e tempo; non inseguire perdite, chiedere prestiti o usare denaro essenziale; fare pause e non giocare in stress o sotto sostanze. Nessun modello o +EV garantisce sicurezza."],
    ["Strumenti dell'operatore", "Usare limiti, promemoria, pause e autoesclusione dove disponibili; chiedere all'operatore cosa vale per conto e paese."],
    ["Aiuto indipendente", "Se il gioco causa danno, fermarsi e cercare aiuto locale qualificato. Gambling Therapy, GamCare e Gamblers Anonymous possono orientare ma non sono garantiti o adatti ovunque. In crisi contattare i servizi locali."],
    ["Contatto", "support@matchsignal.pro gestisce problemi di contenuto ma non offre cure cliniche, debito o crisi."],
  ]},
  ai: { title: "Disclaimer sull'IA", description: "Selezione assistita da IA vincolata e incertezze MatchSignal.", intro: "MatchSignal usa un flusso ibrido vincolato. Gli output sono informazioni probabilistiche, non pronostici garantiti o consigli personali.", sections: [
    ["Prima candidati validati", "Il codice costruisce candidati da mercati reali. La produzione richiede bookmakerCount >= 3. Mercato, selezione, quota mostrata e profondità provengono dallo stesso candidato validato."],
    ["Ruolo IA vincolato", "L'IA non inventa liberamente mercato o pronostico; sceglie un candidateId dalla lista del codice. La probabilità è ancorata al consenso e l'aggiustamento limitato impedisce di creare autonomamente un grande EV positivo."],
    ["Idoneità produzione", "La scelta deve mantenere estimatedValuePct > 0 dopo ancora, aggiustamento e prezzo partner. Riduce output senza base ma non prova la stima."],
    ["Limiti", "Il contesto può essere errato/incompleto, i dati tardare e i mercati muoversi. Verificare il mercato live e decidere autonomamente."],
    ["Nessuna decisione sul visitatore", "Analizza eventi sportivi, senza decisioni significative su visitatori identificabili ai sensi dell'art. 22 GDPR. legal@matchsignal.pro."],
  ]},
  earnings: { title: "Disclaimer sui guadagni", description: "Rischio finanziario di probabilità, valore atteso positivo e scommesse.", intro: "MatchSignal non promette profitto, reddito, ROI o vittoria. Si può perdere l'intera puntata.", sections: [
    ["Nessuna garanzia futura", "Storico, esempi, modelli e pronostici passati non garantiscono il futuro; una buona stima può perdere."],
    ["EV teorico", "Il valore stimato positivo è un rapporto teorico fra probabilità incerta e prezzo, non denaro, vantaggio garantito o promessa. Errore del modello e margine possono invertirlo."],
    ["Quote e varianza", "Quote e disponibilità cambiano; varianza, correlazione, limiti e errore allontanano i risultati. Controllare il prezzo live."],
    ["Responsabilità", "Non è consulenza finanziaria, d'investimento, legale o professionale. Decidere autonomamente, con somme sostenibili e rischio di perdita totale."],
  ]},
  notice: { title: "Note legali", description: "Titolare, registro, contatti e hosting MatchSignal.", intro: "Sito: MatchSignal · https://www.matchsignal.pro. È un sito informativo di analisi sportiva, non bookmaker, operatore di gioco o pagamenti.", sections: [
    ["Titolare", "Forray Gyöngyi mantiene e gestisce tecnicamente il sito, gestisce attività commerciale/affiliata ed è titolare quando MatchSignal determina le finalità."],
    ["Registro", "Il Registro ungherese degli imprenditori individuali è gestito dall'Amministrazione nazionale fiscale e doganale (NAV). Non si inventano numero camerale o telefono non verificati."],
    ["Hosting", "Lo stack verificato usa Vercel, Inc. per hosting e distribuzione."],
    ["Contatti", "Generale: contact@matchsignal.pro. Legale: legal@matchsignal.pro. Privacy: privacy@matchsignal.pro."],
  ]},
});

const pt = build({
  updated: "Última atualização: 20 de agosto de 2026",
  privacy: { title: "Política de privacidade", description: "Tratamento de dados pessoais pelo MatchSignal: contacto, análises, publicidade e afiliação.", intro: "Este aviso explica o tratamento ao abrigo do RGPD. Forray Gyöngyi determina as finalidades e os meios aqui descritos e é responsável pelo tratamento.", sections: [
    ["Dados tratados", "São tratados a preferência de consentimento e data no navegador; no contacto, nome, e-mail, mensagem, campos antiabuso e IP para limitação breve; com consentimento, dados GA4 de dispositivo, navegador, referência, páginas, utilização e localização aproximada; sinais publicitários/de consentimento Google quando disponíveis; e pedidos técnicos, segurança e registos do alojamento."],
    ["Finalidades e bases legais", "Operação necessária e segurança baseiam-se em interesse legítimo (art. 6(1)(f) RGPD). Responder ao contacto baseia-se, conforme o caso, em medidas pré-contratuais (art. 6(1)(b)) ou interesse legítimo. GA4 e publicidade Google sujeita a permissão baseiam-se no consentimento (art. 6(1)(a)). A atribuição afiliada no destino depende dos termos do parceiro e de interesse comercial legítimo; o MatchSignal mede cliques no GA4 apenas com consentimento analítico."],
    ["Armazenamento necessário", "matchsignal_consent no localStorage contém a opção analítica, um valor publicitário sempre falso no fallback MatchSignal e uma data. Persiste até alteração ou limpeza dos dados do site. O idioma vem do URL e não é guardado separadamente."],
    ["Formulário de contacto", "É opcional. Nome, e-mail e mensagem passam pelo endpoint alojado na Vercel e pela Resend até à operadora. O IP é usado cerca de um minuto na memória da instância para limitar abuso. Não envie dados sensíveis desnecessários."],
    ["Google Analytics 4", "O GA4 carrega apenas com autorização analítica e pode tratar URL, referência, dispositivo/navegador, eventos e localização aproximada; não é descrito como anónimo. O Google Analytics não regista nem armazena IP individuais; pode usar transitoriamente o IP para geolocalização e descartá-lo segundo a documentação regional Google. O MatchSignal não afirma ter ativado manualmente anonimização de IP."],
    ["Publicidade Google e links afiliados", "O AdSense pode tratar sinais de consentimento, dados de dispositivo/navegador, IDs publicitários e cookies conforme a lei e escolhas. No EEE, Reino Unido e Suíça, publicidade personalizada exige CMP certificada Google integrada IAB TCF. Os URLs afiliados têm parâmetros de referência; depois do clique aplica-se o aviso do parceiro."],
    ["Subcontratantes e destinatários", "A Vercel fornece alojamento, entrega e segurança; a Resend entrega os e-mails; a Google fornece GA4, AdSense e serviços de consentimento disponíveis. Parceiros recebem dados normais de pedido/referência apenas ao seguir o link. O repositório não mostra envio de dados identificáveis de visitantes à Groq ou The Odds API, pelo que não são listados como subcontratantes desses dados."],
    ["Transferências internacionais", "O tratamento fora do EEE deve apoiar-se, quando aplicável, numa decisão de adequação, cláusulas contratuais-tipo ou outra garantia legal oferecida para esse tratamento."],
    ["Conservação", "A opção dura até alteração/limpeza. Pedidos são guardados para resposta e seguimento, normalmente até 24 meses salvo dever ou litígio. O registo antiabuso dura cerca de um minuto. Logs Vercel e dados Google seguem necessidade de segurança, configuração e regras dos fornecedores."],
    ["Segurança", "Usam-se controlos de acesso, cifragem em trânsito, validação, limites e proteção de alojamento gerido. Nenhum sistema Internet é totalmente seguro."],
    ["Direitos", "Tem direito a informação, acesso, retificação, apagamento, limitação, portabilidade quando aplicável, oposição a interesses legítimos, retirada de consentimento e reclamação. Escreva para privacy@matchsignal.pro; pode ser pedida verificação razoável de identidade."],
    ["Reclamação NAIH", "Pode reclamar à Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Hungria; correio: 1363 Budapest, Pf. 9.; e-mail: ugyfelszolgalat@naih.hu, ou à autoridade do local de residência/trabalho."],
    ["Dados obrigatórios e decisões automatizadas", "O formulário é opcional, mas os campos obrigatórios são necessários para responder. Recusar análises ou publicidade não bloqueia conteúdo essencial. O sistema produz informação sobre eventos desportivos e não decide sobre visitantes identificáveis com efeitos jurídicos ou semelhantes no sentido do artigo 22 RGPD."],
    ["Contacto", "Privacidade e direitos: privacy@matchsignal.pro. Geral: contact@matchsignal.pro. Legal: legal@matchsignal.pro."],
  ]},
  cookie: { title: "Política de cookies", description: "Armazenamento no navegador do MatchSignal, GA4, AdSense e serviços de consentimento.", intro: "Reflete o código atual. localStorage pode persistir sem prazo fixo. Como a Google varia identificadores, os exemplos publicitários não são exaustivos.", inventoryHeading: "Tabela de armazenamento e cookies", tableHeaders: ["Fornecedor", "Categoria", "Identificador / exemplo", "Parte", "Finalidade", "Duração", "Consentimento"], tableRows: [
    ["MatchSignal", "Necessário", "matchsignal_consent (localStorage)", "Primeira parte", "Opção analítica e data; publicidade fallback negada", "Até alteração/limpeza", "Não, necessário para recordar a escolha"],
    ["Google Analytics 4", "Análises", "_ga; _ga_<container-id>", "Cookie de primeira parte para Google", "Estado de navegador, sessão e medição", "Frequentemente até 2 anos conforme configuração", "Sim"],
    ["Google AdSense / Google", "Publicidade", "Exemplos: __gads, __gpi, IDE, NID e outros IDs Google", "Primeira ou terceira parte", "Entrega, frequência, fraude, medição e personalização com permissão válida", "Conforme ID e política Google", "Quando exigido; sim para personalizar"],
    ["Serviços de consentimento Google / CMP", "Necessário ou consentimento", "Strings de consentimento e armazenamento do fornecedor, incluindo IAB TCF quando aplicável", "Primeira ou terceira parte", "Registar/comunicar escolha", "Conforme CMP e registo", "Para registar/comunicar a escolha"],
  ], sections: [
    ["Código atual", "O MatchSignal não usa sessionStorage nem escreve diretamente document.cookie. GA4 carrega só com permissão analítica. O painel fallback controla apenas análises e mantém publicidade negada. AdSense e hooks Google estão no layout raiz; UI e cookies variam por região/configuração."],
    ["CMP e consentimento publicitário", "No EEE, Reino Unido e Suíça, personalização Google exige CMP certificada/IAB TCF. A arquitetura escuta sinais Google disponíveis e caso contrário oferece fallback analítico. Não afirma que um diálogo Google aparece corretamente em cada visita. A publicidade deve respeitar sinais e escolhas CMP disponíveis."],
    ["Controlos", "O botão abaixo reabre o controlo ativo. Também pode bloquear/limpar armazenamento no navegador. Pode reduzir análises ou publicidade sem impedir conteúdo essencial."],
    ["Alterações e contacto", "A Google pode mudar nomes e durações; a lista não é completa. Será atualizada com mudanças importantes. privacy@matchsignal.pro."],
  ]},
  terms: { title: "Termos de utilização", description: "Condições para análises informativas, ferramentas e links externos MatchSignal.", intro: "Ao usar MatchSignal aceita estes termos; se não, não use o serviço.", sections: [
    ["Só informação", "O MatchSignal fornece análises educativas, probabilidades, calculadoras e comparações. Não é casa de apostas, operador de jogo, pagamentos ou finanças; não aceita apostas nem guarda fundos."],
    ["Idade e lei local", "Conteúdo só para adultos legalmente elegíveis. O utilizador responde por jurisdição, elegibilidade, conta e impostos."],
    ["Sem garantias", "Resultados incertos; odds, promoções, mercados e disponibilidade mudam. Não se garantem atualidade, exatidão, disponibilidade, lucro ou resultado. Verifique mercado, seleção, preço e liquidação com o operador."],
    ["Terceiros", "Aplicam-se licenças, elegibilidade, pagamentos, levantamentos, privacidade e promoções do site externo. Um link não garante toda a qualidade."],
    ["Propriedade e uso", "Design, textos originais, marca e compilação estão protegidos. Uso pessoal lícito permitido; extração, republicação, interferência ou abuso não autorizados proibidos salvo lei imperativa."],
    ["Responsabilidade, alterações, contacto", "Até ao limite legal, não há responsabilidade por perdas, lucros cessantes, danos indiretos, odds antigas, terceiros ou interrupção; direitos obrigatórios permanecem. Podem mudar por motivos legais, técnicos ou operacionais. legal@matchsignal.pro; contact@matchsignal.pro."],
  ]},
  affiliate: { title: "Divulgação de afiliados", description: "Links afiliados, comissões e apresentação comercial MatchSignal.", intro: "Alguns links são patrocinados; uma ação válida pode gerar comissão para o MatchSignal.", sections: [
    ["Remuneração", "As condições variam. Normalmente não acrescenta taxa MatchSignal separada, mas aplicam-se preços, elegibilidade e termos do parceiro."],
    ["Relação com previsões", "A afiliação não controla candidatos criados pelo código, matemática, âncora de consenso ou cálculos. O CTA MatchCard só aparece se o mesmo mercado e seleção validados estiverem disponíveis no parceiro."],
    ["Ordem comercial", "Inclusão e ordem podem ser configuradas comercialmente. O diretório não alega ranking independente de qualidade; Parceiro em destaque não é nota empírica."],
    ["Termos de terceiros", "Verifique idade, elegibilidade, região, promoção e lei local antes de registar, depositar ou apostar."],
    ["Regra húngara", "Links de sportsbooks são suprimidos apenas em /hu por locale, não IP. Serviços informativos como BetQL podem ficar conforme configuração. legal@matchsignal.pro."],
  ]},
  responsible: { title: "Jogo responsável", description: "Orientação prudente e apoio independente.", intro: "O MatchSignal é informação, não casa de apostas, linha de apoio ou tratamento. O jogo envolve risco e não é rendimento ou investimento.", sections: [
    ["Princípios mais seguros", "Aposte só com idade e elegibilidade legal; defina limites acessíveis de depósito, aposta, perda e tempo; nunca persiga perdas, peça emprestado ou use dinheiro essencial; faça pausas e não jogue em sofrimento ou sob substâncias. Nenhum modelo ou +EV garante segurança."],
    ["Ferramentas do operador", "Use limites, lembretes, pausas e autoexclusão onde existam; pergunte ao operador o que se aplica à conta e país."],
    ["Apoio independente", "Se houver dano, pare e procure ajuda local qualificada. Gambling Therapy, GamCare e Gamblers Anonymous podem orientar, mas não são garantidos ou adequados em todos os locais. Em crise contacte emergências locais."],
    ["Contacto", "support@matchsignal.pro trata conteúdo, não presta tratamento clínico, de dívida ou crise."],
  ]},
  ai: { title: "Aviso sobre IA", description: "Seleção assistida por IA limitada e incertezas MatchSignal.", intro: "O MatchSignal usa um fluxo híbrido limitado. As saídas são informação probabilística, não previsões garantidas ou aconselhamento pessoal.", sections: [
    ["Candidatos validados primeiro", "O código constrói candidatos de mercados reais. Produção exige bookmakerCount >= 3. Mercado, seleção, odd exibida e profundidade vêm do mesmo candidato validado."],
    ["Papel limitado da IA", "A IA não inventa livremente mercado ou previsão; escolhe um candidateId da lista do código. A probabilidade é ancorada no consenso e o ajuste limitado impede criar sozinha grande EV positivo."],
    ["Elegibilidade de produção", "A seleção deve manter estimatedValuePct > 0 após âncora, ajuste e preço parceiro. Reduz saídas sem base, mas não prova a estimativa."],
    ["Limitações", "O contexto pode estar errado/incompleto, dados atrasados e mercados móveis. Verifique ao vivo e decida independentemente."],
    ["Sem decisão sobre visitante", "Analisa eventos, sem decisão significativa sobre visitante identificável no art. 22 RGPD. legal@matchsignal.pro."],
  ]},
  earnings: { title: "Aviso sobre ganhos", description: "Risco financeiro de probabilidades, valor esperado positivo e apostas.", intro: "O MatchSignal não promete lucro, rendimento, ROI ou vitória. Pode perder-se toda a aposta.", sections: [
    ["Sem garantia futura", "Histórico, exemplos, modelos e escolhas passadas não garantem o futuro; uma boa estimativa pode perder."],
    ["EV teórico", "Valor estimado positivo é relação teórica entre probabilidade incerta e preço, não dinheiro, vantagem garantida ou promessa. Erro e margem podem invertê-lo."],
    ["Odds e variância", "Odds e disponibilidade mudam; variância, correlação, limites e erro afastam resultados. Confirme o preço atual."],
    ["Responsabilidade", "Não é aconselhamento financeiro, investimento, jurídico ou profissional. Decida autonomamente, com valores acessíveis e risco de perda total."],
  ]},
  notice: { title: "Aviso legal", description: "Operadora, registo, contactos e alojamento MatchSignal.", intro: "Site: MatchSignal · https://www.matchsignal.pro. É um site informativo de análise desportiva, não casa de apostas, operador de jogo ou pagamentos.", sections: [
    ["Operadora", "Forray Gyöngyi mantém e opera tecnicamente o site, gere atividade comercial/afiliada e é responsável quando MatchSignal determina finalidades."],
    ["Registo", "O Registo húngaro de Empresários Individuais é operado pela Administração Nacional Tributária e Aduaneira (NAV). Não se inventam número de câmara ou telefone não verificados."],
    ["Alojamento", "A pilha verificada usa Vercel, Inc. para alojamento e entrega."],
    ["Contactos", "Geral: contact@matchsignal.pro. Legal: legal@matchsignal.pro. Privacidade: privacy@matchsignal.pro."],
  ]},
});

const ar = build({
  updated: "آخر تحديث: 20 أغسطس 2026",
  privacy: { title: "سياسة الخصوصية", description: "معالجة MatchSignal للبيانات الشخصية في الاتصال والتحليلات والإعلانات والإحالة.", intro: "يشرح هذا الإشعار المعالجة بموجب اللائحة العامة لحماية البيانات. تحدد Forray Gyöngyi الأغراض والوسائل الموضحة هنا، ولذلك فهي المتحكمة بالبيانات.", sections: [
    ["البيانات المعالجة", "نعالج اختيار الموافقة وطابعه الزمني في المتصفح؛ وفي نموذج الاتصال الاسم والبريد والرسالة وحقول مكافحة الإساءة وعنوان IP للحد القصير؛ وبالموافقة قد يعالج GA4 بيانات الجهاز والمتصفح والإحالة والصفحات والاستخدام والموقع التقريبي؛ وقد تعالج Google إشارات الإعلانات والموافقة عند توافرها؛ كما تعالج بنية الاستضافة بيانات الطلبات التقنية والأمان وسجلات الخادم."],
    ["الأغراض والأسس القانونية", "يعتمد التشغيل الضروري والأمان على المصلحة المشروعة (المادة 6(1)(f)). ويعتمد الرد على الاتصال، بحسب الحالة، على خطوات ما قبل التعاقد (6(1)(b)) أو المصلحة المشروعة. ويعتمد GA4 وإعلانات Google التي تتطلب إذنًا على الموافقة (6(1)(a)). يخضع إسناد الإحالة لدى الوجهة لشروط الشريك والمصلحة التجارية المشروعة؛ ولا يقيس MatchSignal النقر في GA4 إلا بموافقة التحليلات."],
    ["التخزين الضروري", "يحتوي matchsignal_consent في localStorage على اختيار التحليلات وقيمة إعلانات تبقى false في واجهة MatchSignal الاحتياطية وطابع زمني. يبقى حتى تغييره أو مسح بيانات الموقع. تأتي اللغة من URL ولا يخزنها MatchSignal منفصلة."],
    ["نموذج الاتصال", "استخدامه اختياري. يمر الاسم والبريد والرسالة عبر نقطة MatchSignal المستضافة لدى Vercel وخدمة Resend إلى المشغّلة. يستخدم IP في ذاكرة مثيل الخادم لنحو دقيقة للحد من الإساءة. لا ترسل بيانات حساسة غير لازمة."],
    ["Google Analytics 4", "لا يُحمّل GA4 إلا بعد السماح بالتحليلات، وقد يعالج URL والمصدر والجهاز/المتصفح والأحداث والموقع التقريبي؛ ولا نصفه بالمجهول. لا يسجل Google Analytics عناوين IP الفردية ولا يخزنها؛ وقد يستخدم IP مؤقتًا لاشتقاق الموقع ثم يتخلص منه وفق وثائق المعالجة الإقليمية. لا يدعي MatchSignal تفعيل إخفاء IP يدويًا."],
    ["إعلانات Google وروابط الإحالة", "قد يعالج AdSense إشارات الموافقة وبيانات الجهاز/المتصفح ومعرّفات الإعلانات وملفات الارتباط وفق القانون والخيارات المتاحة. في المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا تتطلب الإعلانات المخصصة CMP معتمدة من Google ومتكاملة مع IAB TCF. تحمل روابط الإحالة معاملات تتبع؛ وبعد النقر تنطبق سياسة الشريك."],
    ["المعالجون والمتلقون", "توفر Vercel الاستضافة والتسليم والأمان؛ وتوصل Resend رسائل نموذج الاتصال؛ وتوفر Google خدمات GA4 وAdSense والموافقة المتاحة. لا يتلقى الشريك بيانات الطلب والإحالة العادية إلا عند اتباع رابطه. لا يظهر المستودع إرسال بيانات زائر محدد إلى Groq أو The Odds API، لذلك لا ندرجهما كمعالجين لبيانات الزوار."],
    ["النقل الدولي", "يجب أن يعتمد أي نقل خاضع لـGDPR خارج المنطقة الاقتصادية الأوروبية على قرار كفاية أو البنود التعاقدية القياسية أو ضمان قانوني آخر يقدمه المزود للمعالجة المعنية."],
    ["الاحتفاظ", "يبقى اختيار الموافقة حتى تغييره أو مسحه. تحفظ طلبات الاتصال للرد والمتابعة، عادة بما لا يتجاوز 24 شهرًا إلا لالتزام أو مطالبة قانونية. يبقى سجل الحد قرابة دقيقة. تحدد الحاجة الأمنية والإعداد وسياسات Vercel وGoogle فترات سجلاتهما."],
    ["الأمان", "نستخدم ضوابط وصول وتشفير النقل والتحقق من الإدخال والحد من المعدل وحماية الاستضافة المدارة. لا يوجد نظام إنترنت آمن تمامًا."],
    ["حقوقك", "لك حقوق المعلومات والوصول والتصحيح والمحو والتقييد وقابلية النقل حيث تنطبق والاعتراض على المصلحة المشروعة وسحب الموافقة والشكوى. راسل privacy@matchsignal.pro؛ وقد نطلب تحققًا معقولًا من الهوية."],
    ["الشكوى لدى NAIH", "يمكنك الشكوى إلى Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)، 1055 Budapest, Falk Miksa utca 9-11, Hungary؛ البريد: 1363 Budapest, Pf. 9.؛ البريد الإلكتروني: ugyfelszolgalat@naih.hu، أو إلى سلطة محل إقامتك أو عملك."],
    ["تقديم البيانات والقرارات الآلية", "النموذج اختياري لكن حقوله المطلوبة لازمة للرد. رفض التحليلات أو الإعلان لا يمنع المحتوى الأساسي. ينتج النظام معلومات عن الأحداث الرياضية ولا يتخذ قرارًا عن زائر محدد له أثر قانوني أو مماثل بموجب المادة 22 GDPR."],
    ["الاتصال", "الخصوصية والحقوق: privacy@matchsignal.pro. عام: contact@matchsignal.pro. قانوني: legal@matchsignal.pro."],
  ]},
  cookie: { title: "سياسة ملفات الارتباط", description: "تخزين المتصفح لدى MatchSignal وGA4 وAdSense وخدمات الموافقة.", intro: "تعكس هذه السياسة الكود الحالي. قد يبقى localStorage دون انتهاء محدد. تتغير معرّفات Google، لذا أمثلة الإعلان غير حصرية.", inventoryHeading: "جدول التخزين وملفات الارتباط", tableHeaders: ["المزود", "الفئة", "المعرّف / المثال", "الطرف", "الغرض", "المدة", "الموافقة"], tableRows: [
    ["MatchSignal", "ضروري", "matchsignal_consent (localStorage)", "طرف أول", "اختيار التحليلات والوقت؛ إذن الإعلان الاحتياطي مرفوض", "حتى التغيير أو المسح", "لا؛ ضروري لتذكر الاختيار"],
    ["Google Analytics 4", "تحليلات", "_ga; _ga_<container-id>", "ملف طرف أول لصالح Google", "حالة المتصفح والجلسة والقياس", "غالبًا حتى سنتين وفق الإعداد", "نعم"],
    ["Google AdSense / Google", "إعلان", "أمثلة: __gads و__gpi وIDE وNID ومعرّفات أخرى", "طرف أول أو ثالث", "التقديم والتكرار ومنع الاحتيال والقياس والتخصيص بموافقة صحيحة", "حسب المعرّف وسياسة Google", "حيث يلزم؛ نعم للتخصيص"],
    ["خدمات موافقة Google / CMP", "ضروري أو موافقة", "سلاسل الموافقة وتخزين المزود، ومنها IAB TCF عند الانطباق", "طرف أول أو ثالث", "تسجيل الاختيار وإرساله", "حسب CMP والسجل", "لتسجيل/إرسال الاختيار"],
  ], sections: [
    ["ما يفعله الكود", "لا يستخدم MatchSignal sessionStorage ولا يكتب document.cookie مباشرة. لا يُحمّل GA4 إلا بإذن التحليلات. تتحكم الواجهة الاحتياطية بالتحليلات فقط وتبقي الإعلان مرفوضًا. توجد خطافات AdSense وGoogle في التخطيط الجذري؛ وقد تختلف الواجهة والملفات حسب المنطقة والإعداد."],
    ["CMP وموافقة الإعلان", "في المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا يتطلب تخصيص Google منصة CMP معتمدة ومتكاملة IAB TCF. تستمع البنية إلى إشارات Google المتاحة وإلا تعرض بديلًا للتحليلات. لا نزعم أن حوار Google يظهر بنجاح في كل زيارة. يجب أن تحترم الإعلانات الإشارات واختيارات CMP المتاحة."],
    ["عناصر التحكم", "يفتح الزر أدناه عنصر الموافقة النشط من جديد. يمكنك أيضًا حظر التخزين أو مسحه من المتصفح. قد تقل وظائف التحليلات أو الإعلان من دون منع المحتوى الأساسي."],
    ["التحديث والاتصال", "قد تغير Google الأسماء والمدد، لذا القائمة غير شاملة. نحدثها عند تغير جوهري. privacy@matchsignal.pro."],
  ]},
  terms: { title: "شروط الاستخدام", description: "شروط استخدام تحليلات MatchSignal وأدواته وروابطه الخارجية.", intro: "باستخدام MatchSignal توافق على هذه الشروط؛ وإن لم توافق فلا تستخدم الخدمة.", sections: [
    ["معلومات فقط", "يقدم MatchSignal تحليلًا رياضيًا تعليميًا واحتمالات وحاسبات ومقارنات. ليس موقع مراهنات أو مشغل قمار أو دفع أو خدمة مالية، ولا يقبل الرهانات أو يحتفظ بأموال العملاء."],
    ["العمر والقانون المحلي", "المحتوى للبالغين المؤهلين قانونيًا فقط. تتحمل مسؤولية الاختصاص والأهلية وشروط الحساب والضرائب."],
    ["لا ضمان", "النتائج غير مؤكدة وتتغير الأسعار والعروض والأسواق والتوافر. لا نضمن الحداثة أو الدقة أو التوافر أو الربح أو النتيجة. تحقق من السوق والاختيار والسعر والتسوية لدى المشغل."],
    ["الأطراف الثالثة", "تنطبق تراخيص وأهلية ومدفوعات وسحوبات وخصوصية وعروض الموقع الخارجي. الرابط ليس ضمان جودة شاملًا."],
    ["الملكية والاستخدام", "التصميم والنص الأصلي والعلامة والتجميع محمية. يسمح بالاستخدام الشخصي القانوني؛ ويمنع الاستخراج أو إعادة النشر أو التعطيل أو الإساءة دون إذن إلا حيث يفرض القانون."],
    ["المسؤولية والتغيير والاتصال", "بالحد القانوني لا مسؤولية عن خسائر الرهان أو الربح الفائت أو الضرر غير المباشر أو الأسعار القديمة أو الغير أو الانقطاع؛ وتبقى الحقوق الإلزامية. قد تتغير الشروط لأسباب قانونية أو تقنية أو تشغيلية. legal@matchsignal.pro؛ contact@matchsignal.pro."],
  ]},
  affiliate: { title: "إفصاح الإحالة", description: "روابط الإحالة والعمولات والعرض التجاري في MatchSignal.", intro: "بعض الروابط إعلانية؛ وقد يحصل MatchSignal على عمولة بعد إجراء مؤهل.", sections: [
    ["التعويض", "تختلف الشروط. عادة لا تضاف رسوم MatchSignal منفصلة، لكن أسعار الشريك وأهليته وشروطه تنطبق."],
    ["العلاقة بالتوقعات", "لا تتحكم الإحالة في مرشحي الكود أو رياضيات السوق أو مرساة الإجماع أو الحسابات. يظهر CTA في MatchCard فقط إذا توفر نفس السوق والاختيار الموثقين لدى الشريك."],
    ["الترتيب التجاري", "قد يضبط الإدراج والترتيب تجاريًا. لا يزعم الدليل ترتيب جودة مستقلًا؛ وعبارة شريك مميز ليست تقييمًا تجريبيًا."],
    ["شروط الطرف الثالث", "تحقق من العمر والأهلية والمنطقة والعرض والقانون المحلي قبل التسجيل أو الإيداع أو الرهان."],
    ["قاعدة المجرية", "تحجب روابط مواقع المراهنات فقط في /hu بحسب اللغة لا عنوان IP. قد تبقى خدمات معلوماتية مثل BetQL وفق الإعداد. legal@matchsignal.pro."],
  ]},
  responsible: { title: "المقامرة المسؤولة", description: "إرشاد حذر ومصادر دعم مستقلة.", intro: "MatchSignal منصة معلومات وليست موقع مراهنات أو خط مساعدة أو مقدم علاج. المقامرة مخاطرة وليست دخلًا أو استثمارًا.", sections: [
    ["مبادئ أكثر أمانًا", "لا تراهن إلا بالسن والأهلية القانونية؛ ضع حدودًا ميسورة للإيداع والرهان والخسارة والوقت؛ لا تطارد الخسائر أو تقترض أو تستخدم المال الأساسي؛ خذ فواصل ولا تراهن تحت ضغط أو تأثير مواد. لا نموذج أو +EV يضمن الأمان."],
    ["أدوات المشغل", "استخدم الحدود والتنبيهات وفترات التوقف والاستبعاد الذاتي حيث تتوفر، واسأل المشغل عما ينطبق على حسابك وبلدك."],
    ["دعم مستقل", "إذا وقع ضرر فتوقف واطلب مساعدة محلية مؤهلة. قد تكون Gambling Therapy وGamCare وGamblers Anonymous نقاط بداية لكنها غير مضمونة أو مناسبة في كل بلد. في الأزمات اتصل بالطوارئ المحلية."],
    ["الاتصال", "يعالج support@matchsignal.pro مشكلات المحتوى لكنه لا يقدم علاجًا سريريًا أو للديون أو الأزمات."],
  ]},
  ai: { title: "إخلاء مسؤولية الذكاء الاصطناعي", description: "اختيار MatchSignal المقيّد بمساعدة الذكاء الاصطناعي وحدوده.", intro: "يستخدم MatchSignal مسارًا هجينًا مقيّدًا. المخرجات معلومات احتمالية وليست توقعات مضمونة أو نصيحة شخصية.", sections: [
    ["مرشحون موثقون أولًا", "ينشئ الكود مرشحين من بيانات أسواق حقيقية. يتطلب الإنتاج bookmakerCount >= 3. يأتي السوق والاختيار والسعر المعروض وعمق الشركات من المرشح الموثق نفسه."],
    ["دور مقيّد للذكاء الاصطناعي", "لا يخترع سوقًا أو توقعًا بحرية؛ بل يختار candidateId من قائمة الكود. يرتكز الاحتمال إلى إجماع السوق، ويمنع التعديل المحدود تصنيع EV إيجابي كبير بشكل مستقل."],
    ["أهلية الإنتاج", "يجب أن يبقى estimatedValuePct > 0 بعد المرساة والتعديل وسعر الشريك. يقلل ذلك المخرجات غير المدعومة لكنه لا يثبت صحة التقدير."],
    ["الحدود", "قد يكون السياق خاطئًا أو ناقصًا، وقد تتأخر البيانات وتتحرك الأسواق. تحقق من السوق الحي وقرر باستقلال."],
    ["لا قرار عن الزائر", "يحلل النظام أحداثًا رياضية ولا يتخذ قرارًا مهمًا عن زائر محدد بموجب المادة 22 GDPR. legal@matchsignal.pro."],
  ]},
  earnings: { title: "إخلاء مسؤولية الأرباح", description: "المخاطر المالية للاحتمالات والقيمة المتوقعة والرهان.", intro: "لا يعد MatchSignal بربح أو دخل أو ROI أو فوز. قد تخسر كامل الرهان.", sections: [
    ["لا ضمان للمستقبل", "لا يضمن التاريخ أو الأمثلة أو مخرجات النماذج أو الاختيارات السابقة المستقبل؛ وقد يخسر التقدير الجيد."],
    ["EV نظري", "القيمة الإيجابية المقدرة علاقة نظرية بين احتمال غير يقيني وسعر، وليست مالًا أو ميزة مضمونة أو وعدًا. قد يقلبها خطأ النموذج والهامش."],
    ["الأسعار والتباين", "تتغير الأسعار والتوافر؛ وقد تبعد النتائج بسبب التباين والارتباط والحدود والخطأ. تحقق من السعر الحالي."],
    ["مسؤوليتك", "ليست نصيحة مالية أو استثمارية أو قانونية أو مهنية. قرر باستقلال وبمبالغ ميسورة مع احتمال الخسارة الكاملة."],
  ]},
  notice: { title: "إشعار قانوني", description: "المشغّلة والسجل والاتصالات والاستضافة لدى MatchSignal.", intro: "الموقع: MatchSignal · https://www.matchsignal.pro. هو موقع معلومات وتحليل رياضي، وليس موقع مراهنات أو مشغل قمار أو دفع.", sections: [
    ["المشغّلة", "Forray Gyöngyi تصون الموقع وتشغله تقنيًا، وتدير النشاط التجاري والإحالة، وتكون المتحكمة عندما تحدد MatchSignal أغراض المعالجة."],
    ["السجل", "تدير الإدارة الوطنية المجرية للضرائب والجمارك (NAV) سجل رواد الأعمال الأفراد. لا نخترع رقم غرفة أو هاتف غير موثق."],
    ["الاستضافة", "تستخدم البنية الموثقة Vercel, Inc. للاستضافة والتسليم."],
    ["الاتصالات", "عام: contact@matchsignal.pro. قانوني: legal@matchsignal.pro. خصوصية: privacy@matchsignal.pro."],
  ]},
});

const zh = build({
  updated: "最后更新：2026年8月20日",
  privacy: { title: "隐私政策", description: "MatchSignal 对联系、分析、广告及联盟互动中的个人数据处理说明。", intro: "本说明依据 GDPR 解释数据处理。Forray Gyöngyi 决定本文所述处理的目的与方式，因此担任数据控制者。", sections: [
    ["处理的数据", "我们处理浏览器中的同意选择及时间戳；联系表单中的姓名、邮箱、消息、反滥用字段及用于短期限流的 IP；经同意后，GA4 可处理设备、浏览器、来源、页面、使用情况及粗略位置数据；Google 可在可用时处理广告与同意信号；托管基础设施还处理技术请求、安全及服务器日志数据。"],
    ["目的与法律依据", "必要运行与安全基于合法利益（GDPR 第6(1)(f)条）。回复联系请求视情况基于合同前措施（第6(1)(b)条）或合法利益。GA4 及需许可的 Google 广告基于同意（第6(1)(a)条）。目标网站的联盟归因依其条款及合法商业利益；MatchSignal 仅在分析同意后通过 GA4 记录点击。"],
    ["必要浏览器存储", "localStorage 中的 matchsignal_consent 保存分析选择、在 MatchSignal 备用界面中始终为 false 的广告值及时间戳，直至更改或清除网站数据。语言来自 URL，目前不另行存储。"],
    ["联系表单", "提交是自愿的。姓名、邮箱与消息经 Vercel 托管端点和 Resend 发送给运营者。IP 约在服务器实例内存中使用一分钟以限流。请勿提交不必要的敏感数据。"],
    ["Google Analytics 4", "GA4 仅在分析获准后加载，可处理页面 URL、来源、设备/浏览器、事件及粗略位置；我们不称其为匿名。Google Analytics 不记录或存储单个 IP 地址；IP 可能短暂用于地理定位后按 Google 区域处理文件丢弃。MatchSignal 不声称手动启用了 IP 匿名化。"],
    ["Google 广告和联盟链接", "AdSense 可依法律及可用选择处理同意信号、设备/浏览器数据、广告标识符和 Cookie。在欧洲经济区、英国及瑞士，个性化 Google 广告要求与 IAB TCF 集成的 Google 认证 CMP。联盟目标 URL 含推荐参数；点击后适用合作方隐私条款。"],
    ["处理者和接收方", "Vercel 提供托管、交付与安全；Resend 发送联系邮件；Google 提供 GA4、AdSense 及可用同意服务。仅当您主动点击外链时，合作方才接收正常请求和推荐数据。仓库没有向 Groq 或 The Odds API 发送可识别访客数据的证据，因此不将其列为此类数据处理者。"],
    ["国际传输", "适用 GDPR 时，欧洲经济区外处理须依充分性决定、标准合同条款或服务商针对有关处理提供的其他合法保障。"],
    ["保留期限", "同意选择保留至更改或清除。联系请求通常仅为回复及跟进保留，最长24个月，除非法律义务或索赔需要更久。限流记录约一分钟。Vercel 日志及 Google 数据依安全需要、配置及服务商规则保留。"],
    ["安全", "我们采用访问控制、传输加密、输入验证、限流及托管保护。任何互联网系统都无法绝对安全。"],
    ["您的权利", "您享有知情、访问、更正、删除、限制、适用时的数据可携、反对合法利益处理、撤回同意及投诉权。请联系 privacy@matchsignal.pro；必要时可合理核验身份。"],
    ["向 NAIH 投诉", "可向 Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) 投诉：1055 Budapest, Falk Miksa utca 9-11, Hungary；邮寄：1363 Budapest, Pf. 9.；邮箱：ugyfelszolgalat@naih.hu，或向居住/工作地主管机关投诉。"],
    ["是否必须提供及自动决策", "表单可不使用，但如需回复必须填写必填项。拒绝分析或广告不影响核心内容。系统制作体育赛事信息，不会依据 GDPR 第22条对可识别访客作出具有法律或类似重大影响的决定。"],
    ["联系", "隐私及权利：privacy@matchsignal.pro。一般：contact@matchsignal.pro。法律：legal@matchsignal.pro。"],
  ]},
  cookie: { title: "Cookie 政策", description: "MatchSignal、GA4、AdSense 及同意服务使用的浏览器存储。", intro: "本政策反映当前代码。localStorage 可无固定到期日持续存在。Google 标识符会变化，广告示例并非穷尽。", inventoryHeading: "存储与 Cookie 表", tableHeaders: ["提供方", "类别", "标识符 / 示例", "方", "用途", "期限", "同意"], tableRows: [
    ["MatchSignal", "必要", "matchsignal_consent (localStorage)", "第一方", "分析选择和时间；备用广告始终拒绝", "至更改或清除", "否；记住所选项所必需"],
    ["Google Analytics 4", "分析", "_ga; _ga_<container-id>", "为 Google 设置的第一方 Cookie", "浏览器、会话和测量状态", "通常最长2年，依配置", "是"],
    ["Google AdSense / Google", "广告", "例如 __gads、__gpi、IDE、NID 及其他 Google 标识符", "第一方或第三方", "投放、频次、反欺诈、测量及经有效同意后的个性化", "依标识符与 Google 政策", "适用时需要；个性化需要"],
    ["Google 同意服务 / CMP", "必要或同意", "同意字符串和服务商存储，适用时含 IAB TCF", "第一方或第三方", "记录并传递选择", "依 CMP 和记录", "用于记录/传递选择"],
  ], sections: [
    ["当前代码行为", "MatchSignal 不使用 sessionStorage，也不直接写入 document.cookie。GA4 仅在获准后加载。自有备用面板只控制分析并始终拒绝广告存储。AdSense 和 Google 同意钩子位于根布局；运行时界面及 Cookie 可能随地区和配置变化。"],
    ["CMP 与广告同意", "在欧洲经济区、英国和瑞士，Google 个性化广告要求 Google 认证且集成 IAB TCF 的 CMP。架构监听可用 Google 信号，否则提供仅分析备用方案。本文不声称 Google 对话框每次访问均成功显示。广告服务必须遵守可用信号和 CMP 选择。"],
    ["您的控制", "下方按钮可重新打开当前控制。也可在浏览器中阻止或清除存储。这可能减少分析或广告功能，但不应阻止核心内容。"],
    ["更新与联系", "Google 可更改名称及期限，因此清单不完整。重大实施变更时会更新。privacy@matchsignal.pro。"],
  ]},
  terms: { title: "使用条款", description: "使用 MatchSignal 信息分析、工具及外部链接的条件。", intro: "访问 MatchSignal 即表示接受本条款；若不同意，请勿使用。", sections: [
    ["仅供信息", "MatchSignal 提供教育性体育分析、概率、计算器及市场比较。它不是博彩公司、赌博、支付或金融服务商，不接受投注或保管客户资金。"],
    ["年龄与当地法律", "博彩内容仅供达到法定年龄且当地合法的成年人。您负责司法辖区、运营商资格、账户条款及税务。"],
    ["不作保证", "体育结果不确定；赔率、促销、市场及可用性会变化。我们不保证时效、准确、可用、利润或结果。请向运营商核对同一市场、选择、价格和结算规则。"],
    ["第三方", "外部网站的许可、资格、支付、提款、隐私及促销条款适用。链接不是对其所有方面的质量保证。"],
    ["知识产权与使用", "设计、原创文字、品牌及编排受保护。可合法个人使用；除法律强制允许外，不得未经授权抓取、再发布、干扰或滥用。"],
    ["责任、变更与联系", "在法律允许范围内，不对投注损失、利润损失、间接损害、过期赔率、第三方或中断负责；强制性权利不受影响。条款可因法律、技术或运营原因前瞻性变更。legal@matchsignal.pro；contact@matchsignal.pro。"],
  ]},
  affiliate: { title: "联盟披露", description: "MatchSignal 的联盟链接、佣金及商业展示。", intro: "部分链接为赞助联盟链接；合格行为可能使 MatchSignal 获得佣金。", sections: [
    ["报酬", "条件因合作方而异。通常不会增加单独的 MatchSignal 费用，但合作方价格、资格及条款仍适用。"],
    ["与预测的关系", "联盟关系不控制代码生成的候选、市场数学、共识锚点或计算。只有合作方提供同一经验证市场与选择时，MatchCard CTA 才显示。"],
    ["商业顺序", "合作方纳入和显示顺序可由商业配置决定。目录不声称是独立质量排名；“精选合作方”不是实证评分。"],
    ["第三方条款", "注册、存款或投注前，请独立核实年龄、资格、地区、促销及当地法律。"],
    ["匈牙利语言规则", "博彩公司联盟链接仅在 /hu 语言路径下抑制，基于语言而非 IP。BetQL 等信息服务可按现有配置保留。legal@matchsignal.pro。"],
  ]},
  responsible: { title: "负责任博彩", description: "风险意识指引及独立支持途径。", intro: "MatchSignal 是信息平台，不是博彩公司、热线或治疗机构。博彩有财务与个人风险，不是收入或投资。", sections: [
    ["更安全原则", "仅在达到法定年龄且有资格时投注；预先设置可承受的存款、投注、亏损和时间限制；绝不追损、借钱或使用生活必需资金；定期休息，压力或受影响时不要博彩。任何模型或 +EV 均不保证安全。"],
    ["运营商工具", "如可用，请使用限额、现实提醒、冷静期及自我排除，并向运营商确认适用于账户和地区的工具。"],
    ["独立支持", "若博彩造成伤害，请停止并寻求当地专业帮助。Gambling Therapy、GamCare 和 Gamblers Anonymous 可作起点，但并非在每个地区均可用或适合。危机时联系当地紧急服务。"],
    ["联系", "support@matchsignal.pro 可处理内容问题，但不提供临床、债务或危机治疗。"],
  ]},
  ai: { title: "AI 免责声明", description: "MatchSignal 受约束的 AI 辅助选择及不确定性。", intro: "MatchSignal 使用受约束混合流程。输出是概率性信息，不是保证预测或个人建议。", sections: [
    ["先有验证候选", "代码从真实博彩公司市场数据构造候选。生产要求 bookmakerCount >= 3。市场、选择、显示赔率及公司深度均来自同一验证候选。"],
    ["受约束的 AI 角色", "AI 不能自由发明市场或预测；只能从代码列表选择 candidateId。概率锚定市场共识，有限调整使 AI 无法独立制造很大的正 EV。"],
    ["生产资格", "经过锚定、有限调整和合作方价格后，选择仍须满足 estimatedValuePct > 0。它减少无依据输出，但不证明估计正确。"],
    ["局限", "上下文推理仍可能错误或不完整，数据可延迟，市场会移动。请核实实时市场并独立判断。"],
    ["不对访客作决定", "系统分析体育赛事，不依据 GDPR 第22条对可识别访客作出重大决定。legal@matchsignal.pro。"],
  ]},
  earnings: { title: "收益免责声明", description: "概率、正期望值及投注结果的财务风险。", intro: "MatchSignal 不承诺利润、收入、ROI 或获胜。全部投注额均可能损失。", sections: [
    ["不保证未来", "历史、示例、模型输出及过去选择不保证未来；合理估计也可能失败。"],
    ["EV 仅属理论", "正估计价值是未知概率与价格的理论关系，不是现金、保证优势或利润承诺。模型误差及利润率可逆转结果。"],
    ["赔率与方差", "赔率和可用性会变化；方差、相关性、执行限制及模型误差会造成偏离。请核实实时价格。"],
    ["您的责任", "内容不是财务、投资、法律或专业博彩建议。请独立决定，仅使用可承受金额并接受全损风险。"],
  ]},
  notice: { title: "法律声明", description: "MatchSignal 运营者、登记、联系方式及托管信息。", intro: "网站：MatchSignal · https://www.matchsignal.pro。MatchSignal 是体育分析信息网站，不是博彩公司、赌博或支付运营商。", sections: [
    ["运营者", "Forray Gyöngyi 负责网站维护和技术运营、商业/联盟活动，并在 MatchSignal 决定处理目的时担任数据控制者。"],
    ["登记", "匈牙利个体经营者登记册由匈牙利国家税务和海关管理局（NAV）运营。未提供或核实的商会编号、电话不会被虚构。"],
    ["托管", "经核实的部署栈使用 Vercel, Inc. 提供托管与交付。"],
    ["联系方式", "一般：contact@matchsignal.pro。法律：legal@matchsignal.pro。隐私：privacy@matchsignal.pro。"],
  ]},
});

const ja = build({
  updated: "最終更新日：2026年8月20日",
  privacy: { title: "プライバシーポリシー", description: "連絡、分析、広告、アフィリエイトにおける MatchSignal の個人データ処理。", intro: "本通知は GDPR に基づく処理を説明します。Forray Gyöngyi はここに記載する処理の目的と手段を決定するデータ管理者です。", sections: [
    ["処理するデータ", "ブラウザに保存される同意選択と時刻、問い合わせ時の氏名・メール・本文・不正対策項目および短時間のレート制限に用いる IP、同意後の GA4 の端末・ブラウザ・参照元・ページ・利用状況・概略位置、利用可能な Google 広告/同意シグナル、ホスティングの技術リクエスト・セキュリティ・サーバーログを処理します。"],
    ["目的と法的根拠", "必要な運営と安全は正当な利益（GDPR 6(1)(f)）に基づきます。問い合わせ対応は状況により契約前措置（6(1)(b)）または正当な利益、GA4 と同意を要する Google 広告は同意（6(1)(a)）に基づきます。遷移先のアフィリエイト帰属は提携先条件と正当な商業利益に従い、MatchSignal の GA4 クリック計測は分析同意時のみです。"],
    ["必要なブラウザ保存", "localStorage の matchsignal_consent は分析選択、MatchSignal 予備画面で常に false の広告値、時刻を保持し、変更またはサイトデータ消去まで残ります。言語は URL から取得し、別途保存しません。"],
    ["問い合わせフォーム", "利用は任意です。氏名、メール、本文は Vercel 上のエンドポイントと Resend を通じ運営者へ届きます。IP はインスタンスのメモリで約1分、不正防止に使用されます。不要な機微情報を送信しないでください。"],
    ["Google Analytics 4", "GA4 は分析が許可された後にのみ読み込まれ、URL、参照元、端末/ブラウザ、イベント、概略位置を処理し得ます。匿名とは表現しません。Google Analytics は個別 IP を記録・保存せず、地域判定に一時利用後、Google の地域処理資料に従い破棄する場合があります。MatchSignal は IP 匿名化を手動で有効化したとは述べません。"],
    ["Google 広告とアフィリエイト", "AdSense は法律と選択に従い、同意シグナル、端末/ブラウザ、広告 ID、Cookie を処理し得ます。EEA、英国、スイスのパーソナライズ広告には IAB TCF と統合した Google 認定 CMP が必要です。遷移 URL には紹介パラメータがあり、クリック後は提携先の通知が適用されます。"],
    ["処理者と受領者", "Vercel はホスティング・配信・安全、Resend は問い合わせメール配信、Google は GA4・AdSense・利用可能な同意サービスを提供します。提携先は任意に外部リンクを開いた場合のみ通常のリクエスト/紹介データを受けます。リポジトリには Groq または The Odds API へ識別可能な訪問者データを送る証拠がないため、その処理者として挙げません。"],
    ["国際移転", "GDPR が適用される EEA 外処理は、十分性認定、標準契約条項、または当該処理について提供される他の適法な保障に基づく必要があります。"],
    ["保存期間", "同意選択は変更/消去まで、問い合わせは回答と追跡に必要な期間（通常最大24か月、法的義務・請求時を除く）、レート制限記録は約1分です。Vercel ログと Google データは安全上の必要、設定、提供者ポリシーに従います。"],
    ["安全管理", "アクセス制御、通信暗号化、入力検証、レート制限、管理型ホスティング保護を利用します。インターネット上の仕組みは完全に安全ではありません。"],
    ["権利", "情報、アクセス、訂正、消去、制限、適用時のポータビリティ、正当な利益への異議、同意撤回、苦情申立ての権利があります。privacy@matchsignal.pro へ連絡してください。合理的な本人確認を求める場合があります。"],
    ["NAIH への苦情", "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Hungary、郵送 1363 Budapest, Pf. 9.、メール ugyfelszolgalat@naih.hu、または居住/勤務地の監督機関に苦情を申し立てられます。"],
    ["提供の任意性と自動決定", "フォームは任意ですが返信には必須項目が必要です。分析・広告拒否で主要コンテンツは遮断されません。システムはスポーツイベントの情報を作成し、GDPR 22条上の法的または同等の重大な効果を訪問者に与える決定は行いません。"],
    ["連絡先", "プライバシー/権利：privacy@matchsignal.pro。一般：contact@matchsignal.pro。法務：legal@matchsignal.pro。"],
  ]},
  cookie: { title: "Cookie ポリシー", description: "MatchSignal、GA4、AdSense、同意サービスのブラウザ保存。", intro: "現行コードを反映します。localStorage は固定期限なく残り得ます。Google の識別子は変動するため広告例は網羅的ではありません。", inventoryHeading: "保存/Cookie 一覧", tableHeaders: ["提供者", "分類", "識別子 / 例", "当事者", "目的", "期間", "同意"], tableRows: [
    ["MatchSignal", "必要", "matchsignal_consent (localStorage)", "ファーストパーティ", "分析選択と時刻、予備広告許可は拒否", "変更/消去まで", "不要。選択保持に必要"],
    ["Google Analytics 4", "分析", "_ga; _ga_<container-id>", "Google 用ファーストパーティ Cookie", "ブラウザ、セッション、計測状態", "設定により通常最大2年", "必要"],
    ["Google AdSense / Google", "広告", "例：__gads、__gpi、IDE、NID、その他 Google 識別子", "第一または第三者", "配信、頻度、不正防止、計測、有効な同意時の個人化", "識別子と Google ポリシーによる", "該当時必要。個人化は必要"],
    ["Google 同意サービス / CMP", "必要または同意", "同意文字列と提供者保存、該当時 IAB TCF", "第一または第三者", "選択の記録・伝達", "CMP と記録による", "選択記録/伝達のため"],
  ], sections: [
    ["現在のコード", "MatchSignal は sessionStorage を使わず document.cookie を直接書きません。GA4 は分析許可時のみ読み込みます。予備パネルは分析のみ制御し広告保存を常に拒否します。AdSense と Google 同意フックはルートレイアウトにあり、画面と Cookie は地域/設定で変わります。"],
    ["CMP と広告同意", "EEA、英国、スイスの Google 個人化には Google 認定/IAB TCF CMP が必要です。構成は利用可能な Google シグナルを待ち、なければ分析のみの予備を出します。Google ダイアログが毎回正常表示されるとは主張しません。広告は利用可能なシグナルと CMP 選択を尊重する必要があります。"],
    ["管理方法", "下のボタンで現在の同意管理を再度開けます。ブラウザでも保存を拒否/消去できます。分析・広告機能は低下しても主要コンテンツは利用できます。"],
    ["更新と連絡", "Google は名称と期間を変更でき、一覧は完全ではありません。重大変更時に更新します。privacy@matchsignal.pro。"],
  ]},
  terms: { title: "利用規約", description: "MatchSignal の情報分析、ツール、外部リンクの利用条件。", intro: "MatchSignal を利用すると本規約に同意したことになります。同意しない場合は利用しないでください。", sections: [
    ["情報提供のみ", "教育的なスポーツ分析、確率、計算機、市場比較を提供します。ブックメーカー、賭博、決済、金融事業者ではなく、賭けや顧客資金を扱いません。"],
    ["年齢と現地法", "法定年齢に達し現地で適法な成人のみ対象です。法域、事業者資格、口座条件、税務は利用者の責任です。"],
    ["保証なし", "結果は不確実で、オッズ、特典、市場、提供状況は変わります。鮮度、正確性、可用性、利益、結果を保証しません。同一市場、選択、価格、精算規則を事業者で確認してください。"],
    ["第三者", "外部サイトのライセンス、資格、支払、出金、プライバシー、特典条件が適用されます。リンクは全面的品質保証ではありません。"],
    ["知的財産と利用", "デザイン、原文、ブランド、編集物は保護されます。適法な個人利用は可能ですが、法令上許される場合を除き無断収集、再公開、妨害、悪用は禁止です。"],
    ["責任、変更、連絡", "法の範囲で、賭け損失、逸失利益、間接損害、古いオッズ、第三者、中断に責任を負いません。強行的権利は除外しません。規約は法務・技術・運営上の理由で将来変更できます。legal@matchsignal.pro；contact@matchsignal.pro。"],
  ]},
  affiliate: { title: "アフィリエイト開示", description: "MatchSignal のアフィリエイトリンク、報酬、商業表示。", intro: "一部リンクはスポンサー付きで、対象行為により MatchSignal が報酬を得る場合があります。", sections: [
    ["報酬", "条件は提携先ごとに異なります。通常 MatchSignal の別料金は加算されませんが、提携先の価格、資格、条件は適用されます。"],
    ["予測との関係", "提携関係はコード生成候補、市場計算、コンセンサス基準、予測計算を支配しません。同一の検証済み市場と選択が提携先にある時だけ MatchCard CTA を表示します。"],
    ["商業順序", "掲載と順序は商業設定され得ます。ディレクトリを独立品質ランキングとは主張せず、「注目パートナー」は実証評価ではありません。"],
    ["第三者条件", "登録・入金・賭けの前に年齢、資格、地域、特典、現地法を確認してください。"],
    ["ハンガリー語ルール", "スポーツブックリンクは /hu のみ、IP ではなく locale 基準で抑制します。BetQL 等の情報サービスは現行設定どおり残る場合があります。legal@matchsignal.pro。"],
  ]},
  responsible: { title: "責任あるギャンブル", description: "リスクを意識した指針と独立支援。", intro: "MatchSignal は情報サイトで、ブックメーカー、相談窓口、治療機関ではありません。賭博はリスクであり収入・投資ではありません。", sections: [
    ["より安全な原則", "法定年齢と資格を満たす場合のみ、無理のない入金・賭金・損失・時間上限を先に設定し、損失を追わず借金や生活費を使わず、休憩し、苦痛時や影響下で賭けないでください。モデルや +EV は安全を保証しません。"],
    ["事業者ツール", "利用可能なら上限、現実確認、休止、自己排除を使い、自分の口座/地域に適用されるものを事業者に確認してください。"],
    ["独立支援", "害がある場合は停止し地域の専門支援を求めてください。Gambling Therapy、GamCare、Gamblers Anonymous は出発点になり得ますが、全地域で利用可能・適切とは限りません。危機時は地域の緊急サービスへ。"],
    ["連絡", "support@matchsignal.pro は内容問題を扱いますが、臨床、債務、危機治療は提供しません。"],
  ]},
  ai: { title: "AI 免責事項", description: "MatchSignal の制約付き AI 支援選択と不確実性。", intro: "MatchSignal は制約付きハイブリッド処理を使います。出力は確率的情報で、保証予測や個人助言ではありません。", sections: [
    ["検証候補が先", "コードが実際のブックメーカー市場から候補を作り、本番は bookmakerCount >= 3 を要求します。市場、選択、表示オッズ、深度は同じ検証候補に由来します。"],
    ["制約された AI", "AI は市場や予測を自由に作れず、コード一覧から candidateId を選びます。確率は市場コンセンサスに固定され、限定調整により AI 単独で大きな正 EV を作れません。"],
    ["本番適格性", "基準、限定調整、提携価格の後も estimatedValuePct > 0 が必要です。根拠のない出力を減らしますが正しさは証明しません。"],
    ["限界", "文脈推論は誤り/不完全な場合があり、データ遅延や市場変動があります。ライブ市場を確認し独立判断してください。"],
    ["訪問者判断なし", "スポーツイベントを分析し、GDPR 22条上の訪問者への重大決定は行いません。legal@matchsignal.pro。"],
  ]},
  earnings: { title: "収益免責事項", description: "確率、正の期待値、賭け結果の財務リスク。", intro: "MatchSignal は利益、収入、ROI、勝利を約束しません。賭金全額を失う可能性があります。", sections: [
    ["将来保証なし", "過去、例、モデル出力、以前の選択は将来を保証せず、妥当な推定も負けます。"],
    ["EV は理論値", "正の推定価値は不確実な確率と価格の理論関係で、現金、保証優位、利益約束ではありません。モデル誤差やマージンで反転します。"],
    ["オッズと分散", "オッズと提供状況は変わり、分散、相関、執行制限、誤差で結果は乖離します。現在価格を確認してください。"],
    ["自己責任", "金融、投資、法務、専門的賭博助言ではありません。無理のない金額で独立判断し、全損を受け入れてください。"],
  ]},
  notice: { title: "法的表示", description: "MatchSignal の運営者、登録、連絡先、ホスティング。", intro: "サイト：MatchSignal · https://www.matchsignal.pro。スポーツ分析情報サイトで、ブックメーカー、賭博、決済事業者ではありません。", sections: [
    ["運営者", "Forray Gyöngyi はサイト保守・技術運営、商業/アフィリエイト活動を行い、MatchSignal が処理目的を決める場合のデータ管理者です。"],
    ["登録", "ハンガリー個人事業主登録簿はハンガリー国税関税庁（NAV）が運営します。未提供・未確認の商工会番号や電話は記載しません。"],
    ["ホスティング", "確認済み構成は Vercel, Inc. をホスティングと配信に使用します。"],
    ["連絡先", "一般：contact@matchsignal.pro。法務：legal@matchsignal.pro。プライバシー：privacy@matchsignal.pro。"],
  ]},
});

const hi = build({
  updated: "अंतिम अपडेट: 20 अगस्त 2026",
  privacy: { title: "गोपनीयता नीति", description: "संपर्क, एनालिटिक्स, विज्ञापन और एफिलिएट संवाद में MatchSignal द्वारा व्यक्तिगत डेटा प्रसंस्करण।", intro: "यह सूचना GDPR के अंतर्गत प्रसंस्करण समझाती है। Forray Gyöngyi यहाँ वर्णित उद्देश्य और साधन तय करती हैं और डेटा नियंत्रक हैं।", sections: [
    ["प्रसंस्कृत डेटा", "ब्राउज़र में सहमति विकल्प व समय; संपर्क में नाम, ईमेल, संदेश, दुरुपयोग-रोधी फ़ील्ड और थोड़े समय की दर-सीमा हेतु IP; सहमति पर GA4 के डिवाइस, ब्राउज़र, रेफ़रल, पेज, उपयोग और मोटे स्थान डेटा; उपलब्ध Google विज्ञापन/सहमति संकेत; तथा होस्टिंग के तकनीकी अनुरोध, सुरक्षा और सर्वर लॉग डेटा संसाधित होते हैं।"],
    ["उद्देश्य और कानूनी आधार", "आवश्यक संचालन व सुरक्षा वैध हित (GDPR Art. 6(1)(f)) पर हैं। संपर्क उत्तर परिस्थिति अनुसार पूर्व-संविदात्मक कदम (6(1)(b)) या वैध हित पर है। GA4 और सहमति-आवश्यक Google विज्ञापन सहमति (6(1)(a)) पर हैं। गंतव्य एफिलिएट एट्रिब्यूशन भागीदार शर्तों/वैध व्यावसायिक हित पर है; MatchSignal GA4 क्लिक केवल एनालिटिक्स सहमति पर मापता है।"],
    ["आवश्यक ब्राउज़र स्टोरेज", "localStorage में matchsignal_consent एनालिटिक्स विकल्प, MatchSignal fallback में हमेशा false विज्ञापन मान और समय रखता है। यह बदलने या साइट डेटा साफ़ करने तक रहता है। भाषा URL से आती है और अलग संग्रहीत नहीं होती।"],
    ["संपर्क फ़ॉर्म", "उपयोग वैकल्पिक है। नाम, ईमेल और संदेश Vercel-होस्टेड endpoint और Resend से संचालक तक पहुँचते हैं। IP लगभग एक मिनट server instance memory में rate limit के लिए रहता है। अनावश्यक संवेदनशील डेटा न भेजें।"],
    ["Google Analytics 4", "GA4 केवल analytics अनुमति के बाद लोड होता है और URL, referral, device/browser, event और मोटा स्थान संसाधित कर सकता है; इसे anonymous नहीं कहा जाता। Google Analytics व्यक्तिगत IP को log/store नहीं करता; IP भू-स्थान हेतु अस्थायी रूप से उपयोग होकर regional processing दस्तावेज़ के अनुसार हट सकता है। यह GA4 का built-in व्यवहार है, MatchSignal द्वारा सक्षम अलग privacy setting नहीं।"],
    ["Google विज्ञापन और एफिलिएट लिंक", "AdSense कानून और विकल्पों के अनुसार सहमति संकेत, डिवाइस/ब्राउज़र, advertising IDs और cookies संसाधित कर सकता है। EEA, UK व Switzerland में personalized Google ads हेतु IAB TCF-integrated Google-certified CMP चाहिए। एफिलिएट URL में referral parameters होते हैं; क्लिक के बाद partner notice लागू होता है।"],
    ["प्रोसेसर और प्राप्तकर्ता", "Vercel hosting, delivery और security; Resend contact email delivery; Google GA4, AdSense और उपलब्ध consent services देता है। भागीदार को सामान्य request/referral डेटा तभी मिलता है जब आप उसका बाहरी link खोलते हैं। repository identifiable visitor data को Groq या The Odds API भेजना नहीं दिखाती, इसलिए उन्हें visitor processors नहीं बताया गया।"],
    ["अंतरराष्ट्रीय ट्रांसफ़र", "जहाँ GDPR लागू हो, EEA से बाहर प्रसंस्करण adequacy decision, Standard Contractual Clauses या संबंधित सेवा के लिए उपलब्ध किसी अन्य वैध safeguard पर होना चाहिए।"],
    ["अवधि", "सहमति विकल्प बदलने/मिटाने तक रहता है। संपर्क अनुरोध उत्तर व follow-up हेतु, सामान्यतः अधिकतम 24 माह, जब तक कानूनी दायित्व/दावा अधिक न माँगे। rate-limit record करीब एक मिनट। Vercel logs और Google data सुरक्षा जरूरत, configuration और provider rules अनुसार रहते हैं।"],
    ["सुरक्षा", "Access controls, transit encryption, input validation, rate limiting और managed hosting safeguards उपयोग होते हैं। कोई Internet system पूर्ण सुरक्षित नहीं है।"],
    ["आपके अधिकार", "जानकारी, access, rectification, erasure, restriction, लागू होने पर portability, legitimate-interest processing पर objection, consent withdrawal और complaint के अधिकार हैं। privacy@matchsignal.pro पर लिखें; उचित identity verification माँगा जा सकता है।"],
    ["NAIH शिकायत", "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Hungary; postal: 1363 Budapest, Pf. 9.; email: ugyfelszolgalat@naih.hu या अपने निवास/कार्य स्थान की authority से शिकायत कर सकते हैं।"],
    ["वैकल्पिक डेटा और automated decision", "फ़ॉर्म वैकल्पिक है, पर उत्तर हेतु required fields जरूरी हैं। analytics/advertising मना करने से core content बंद नहीं होता। सिस्टम sports events पर जानकारी बनाता है और GDPR Article 22 के अंतर्गत identifiable visitor पर कानूनी या समान महत्वपूर्ण निर्णय नहीं लेता।"],
    ["संपर्क", "Privacy/rights: privacy@matchsignal.pro। General: contact@matchsignal.pro। Legal: legal@matchsignal.pro।"],
  ]},
  cookie: { title: "कुकी नीति", description: "MatchSignal, GA4, AdSense और consent services का browser storage।", intro: "यह वर्तमान code को दर्शाती है। localStorage fixed expiry के बिना रह सकता है। Google identifiers बदलते हैं, इसलिए विज्ञापन उदाहरण exhaustive नहीं हैं।", inventoryHeading: "Storage और cookie तालिका", tableHeaders: ["Provider", "Category", "Identifier / example", "Party", "Purpose", "Duration", "Consent"], tableRows: [
    ["MatchSignal", "Necessary", "matchsignal_consent (localStorage)", "First party", "Analytics विकल्प और समय; fallback ads denied", "बदलने/साफ़ करने तक", "नहीं; विकल्प याद रखने हेतु"],
    ["Google Analytics 4", "Analytics", "_ga; _ga_<container-id>", "Google के लिए first-party cookie", "Browser, session और measurement state", "आमतौर पर 2 वर्ष तक, configuration अनुसार", "हाँ"],
    ["Google AdSense / Google", "Advertising", "उदाहरण __gads, __gpi, IDE, NID और अन्य Google IDs", "First या third party", "Delivery, frequency, fraud prevention, measurement, valid consent पर personalization", "ID और Google policy अनुसार", "जहाँ जरूरी; personalization हेतु हाँ"],
    ["Google consent services / CMP", "Necessary या consent", "Consent strings और provider storage, लागू होने पर IAB TCF", "First या third party", "विकल्प record/communicate करना", "CMP और record अनुसार", "विकल्प record/communicate करने हेतु"],
  ], sections: [
    ["वर्तमान code", "MatchSignal sessionStorage उपयोग नहीं करता और document.cookie सीधे नहीं लिखता। GA4 analytics permission पर ही load होता है। fallback panel केवल analytics नियंत्रित करता और ads storage denied रखता है। AdSense/Google consent hooks root layout में हैं; UI/cookies region और configuration से बदल सकते हैं।"],
    ["CMP और advertising consent", "EEA, UK व Switzerland में Google personalization हेतु certified IAB TCF CMP चाहिए। architecture उपलब्ध Google signals सुनती है, अन्यथा analytics-only fallback देती है। यह दावा नहीं कि Google dialog हर visit पर सफल दिखता है। ads services को उपलब्ध signals और CMP choices माननी चाहिए।"],
    ["आपका नियंत्रण", "नीचे button सक्रिय consent control फिर खोलता है। browser में storage block/clear भी कर सकते हैं। analytics/ads कम हो सकते हैं पर core content उपलब्ध रहता है।"],
    ["Updates और contact", "Google नाम/अवधि बदल सकता है; सूची पूरी नहीं। material change पर update होगी। privacy@matchsignal.pro।"],
  ]},
  terms: { title: "उपयोग की शर्तें", description: "MatchSignal की informational analysis, tools और external links की शर्तें।", intro: "MatchSignal उपयोग करके आप शर्तें स्वीकारते हैं; असहमति पर उपयोग न करें।", sections: [
    ["केवल जानकारी", "MatchSignal educational sports analysis, probabilities, calculators और comparisons देता है। यह sportsbook, gambling, payment या financial service नहीं, bets स्वीकार या funds hold नहीं करता।"],
    ["आयु और स्थानीय कानून", "Betting content केवल legal-age और स्थानीय रूप से eligible adults हेतु है। jurisdiction, operator eligibility, account terms और taxes आपकी जिम्मेदारी हैं।"],
    ["कोई warranty नहीं", "Outcomes uncertain हैं; odds, promotions, markets, availability बदलते हैं। freshness, accuracy, availability, profit या result की guarantee नहीं। operator पर वही market, selection, price, settlement rules जाँचें।"],
    ["Third parties", "External site की licensing, eligibility, payment, withdrawal, privacy और promotion terms लागू हैं। link हर पहलू की quality guarantee नहीं।"],
    ["IP और स्वीकार्य उपयोग", "Design, original text, brand और compilation protected हैं। lawful personal use अनुमति है; unauthorized scraping, republishing, interference या misuse निषिद्ध, सिवाय जहाँ कानून अनुमति दे।"],
    ["Liability, बदलाव, contact", "कानून की सीमा तक betting losses, lost profits, indirect loss, stale odds, third parties या interruption की liability नहीं; mandatory rights रहते हैं। terms legal, technical या operational कारण से आगे बदल सकते हैं। legal@matchsignal.pro; contact@matchsignal.pro।"],
  ]},
  affiliate: { title: "एफिलिएट प्रकटीकरण", description: "MatchSignal affiliate links, commissions और commercial presentation।", intro: "कुछ links sponsored affiliate links हैं; qualifying action पर MatchSignal commission पा सकता है।", sections: [
    ["Compensation", "Terms partner अनुसार बदलते हैं। सामान्यतः अलग MatchSignal fee नहीं जुड़ती, पर partner prices, eligibility और terms लागू हैं।"],
    ["Predictions से संबंध", "Affiliate relation code-generated candidates, market math, consensus anchor या calculations नियंत्रित नहीं करती। MatchCard CTA केवल उसी validated market और selection के partner पर उपलब्ध होने पर दिखता है।"],
    ["Commercial order", "Inclusion और order commercially configured हो सकते हैं। directory independent quality ranking का दावा नहीं; Featured Partner empirical rating नहीं।"],
    ["Third-party terms", "Registration, deposit या bet से पहले age, eligibility, geography, promotion और local law जाँचें।"],
    ["Hungarian locale rule", "Sportsbook affiliate links केवल /hu पर locale के आधार पर दबाए जाते हैं, IP पर नहीं। BetQL जैसी informational services configuration अनुसार रह सकती हैं। legal@matchsignal.pro।"],
  ]},
  responsible: { title: "जिम्मेदार जुआ", description: "जोखिम-सचेत मार्गदर्शन और स्वतंत्र सहायता।", intro: "MatchSignal informational platform है, sportsbook, helpline या treatment provider नहीं। gambling जोखिम है, income या investment नहीं।", sections: [
    ["सुरक्षित सिद्धांत", "केवल legal age/eligibility पर bet करें; affordable deposit, stake, loss और time limits पहले तय करें; losses chase, borrow या essential money use न करें; breaks लें और distress/substance influence में न खेलें। कोई model या +EV safety guarantee नहीं।"],
    ["Operator tools", "उपलब्ध limits, reality checks, cooling-off और self-exclusion उपयोग करें; account/jurisdiction पर लागू tools operator से पूछें।"],
    ["Independent support", "हानि होने पर रुकें और local qualified help लें। Gambling Therapy, GamCare, Gamblers Anonymous शुरुआत हो सकते हैं, पर हर jurisdiction में उपलब्ध/उपयुक्त नहीं। crisis में local emergency services से संपर्क करें।"],
    ["Contact", "support@matchsignal.pro content concerns लेता है, clinical, debt या crisis treatment नहीं देता।"],
  ]},
  ai: { title: "AI अस्वीकरण", description: "MatchSignal की constrained AI-assisted selection और uncertainties।", intro: "MatchSignal constrained hybrid pipeline उपयोग करता है। outputs probabilistic information हैं, guaranteed predictions या personal advice नहीं।", sections: [
    ["पहले validated candidates", "Code real bookmaker-market data से candidates बनाता है। production में bookmakerCount >= 3 जरूरी है। market, selection, displayed odds और depth उसी validated candidate से आते हैं।"],
    ["Constrained AI role", "AI market या prediction स्वतंत्र रूप से invent नहीं कर सकता; code list से candidateId चुनता है। probability market consensus से anchored और adjustment bounded है, इसलिए AI अकेले बड़ा positive EV नहीं बना सकता।"],
    ["Production eligibility", "Anchor, bounded adjustment और partner price के बाद estimatedValuePct > 0 रहना चाहिए। इससे unsupported output घटता है पर estimate सिद्ध नहीं होता।"],
    ["सीमाएँ", "Context reasoning गलत/अपूर्ण, data delayed और market बदल सकता है। live market verify कर independent judgment रखें।"],
    ["Visitor decision नहीं", "System sports events analyze करता है, GDPR Article 22 के तहत identifiable visitor पर significant decision नहीं। legal@matchsignal.pro।"],
  ]},
  earnings: { title: "कमाई अस्वीकरण", description: "Probability, positive expected value और betting outcomes का financial risk।", intro: "MatchSignal profit, income, ROI या win का वादा नहीं करता। पूरी stake खो सकती है।", sections: [
    ["Future guarantee नहीं", "History, examples, model outputs और past picks future guarantee नहीं; sound estimate भी हार सकता है।"],
    ["EV theoretical है", "Positive estimated value uncertain probability और price का theoretical relation है, cash, guaranteed edge या profit promise नहीं। model error और margin इसे उलट सकते हैं।"],
    ["Odds और variance", "Odds/availability बदलते हैं; variance, correlation, execution limits और error results अलग कर सकते हैं। live price जाँचें।"],
    ["आपकी जिम्मेदारी", "यह financial, investment, legal या professional betting advice नहीं। independent decision, affordable amounts और total-loss risk स्वीकारें।"],
  ]},
  notice: { title: "कानूनी सूचना", description: "MatchSignal operator, registry, contacts और hosting।", intro: "Website: MatchSignal · https://www.matchsignal.pro। यह sports-analysis information site है, sportsbook, gambling operator या payment provider नहीं।", sections: [
    ["Operator", "Forray Gyöngyi website maintenance/technical operation, commercial/affiliate activity चलाती हैं और जहाँ MatchSignal processing purposes तय करता है वहाँ data controller हैं।"],
    ["Registry", "Hungarian Individual Entrepreneurs Registry को Hungarian National Tax and Customs Administration (NAV) चलाता है। असत्यापित chamber number या phone नहीं बनाया जाता।"],
    ["Hosting", "Verified stack hosting/delivery हेतु Vercel, Inc. उपयोग करता है।"],
    ["Contacts", "General: contact@matchsignal.pro। Legal: legal@matchsignal.pro। Privacy: privacy@matchsignal.pro।"],
  ]},
});

export const LOCALIZED_LEGAL_CONTENT: Partial<Record<Lang, LegalLocaleContent>> = { hu, de, fr, es, it, pt, ar, zh, ja, hi };
