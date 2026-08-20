import type { Lang } from "@/app/lib/i18n";

type AboutStep = { title: string; body: string };

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  processTitle: string;
  steps: AboutStep[];
  limitsTitle: string;
  limits: string[];
  responsibleTitle: string;
  responsibleBody: string;
  legalLinksTitle: string;
  aiLink: string;
  affiliateLink: string;
  responsibleLink: string;
  contactLink: string;
};

export const ABOUT_CONTENT: Record<Lang, AboutContent> = {
  en: {
    metaTitle: "About MatchSignal | AI-powered sports analysis",
    metaDescription: "Learn how MatchSignal compares current sportsbook markets and turns them into clear, AI-assisted betting insights.",
    eyebrow: "About MatchSignal",
    title: "Clearer insights from current sportsbook markets",
    intro: "MatchSignal is a free AI-powered sports analysis platform. It compares current sportsbook market data and turns it into structured, easier-to-understand betting insights. MatchSignal is not a sportsbook, does not accept bets and never guarantees accuracy or profit.",
    processTitle: "How MatchSignal works",
    steps: [
      { title: "1. Current market data", body: "MatchSignal collects available odds for supported upcoming sporting events from multiple sportsbooks. Coverage and availability can vary by sport, event, market and time." },
      { title: "2. Compare the market", body: "Equivalent markets and selections are compared across sportsbooks to build a clearer picture of the current market consensus." },
      { title: "3. AI-assisted analysis", body: "AI helps evaluate the available market information and put potential opportunities into context. It works within checked market data rather than inventing arbitrary bets." },
      { title: "4. Value Signal", body: "A Value Signal appears when MatchSignal's estimated probability suggests that an available price may be more favorable than the probability implied by the market. It is an estimate, not guaranteed value or profit." },
      { title: "5. Risk Tier", body: "Low, Medium and High are comparative risk indicators that help distinguish between opportunities. Low does not mean safe: every selection can lose." },
      { title: "6. Odds comparison", body: "Where suitable partner odds are available for the same selection, MatchSignal may show them so users can compare prices. Affiliate links may generate a commission, but those relationships do not determine the underlying prediction analysis." },
    ],
    limitsTitle: "Important limitations",
    limits: [
      "Odds and event or market availability can change after data is collected.",
      "Data feeds and AI-assisted analysis can contain errors or omissions.",
      "Sports outcomes are uncertain, and every prediction can lose.",
      "Betting involves financial risk. Always verify current odds, sportsbook terms and your eligibility directly with the operator.",
    ],
    responsibleTitle: "Use MatchSignal responsibly",
    responsibleBody: "Use betting-related information only if you are of legal age and betting is lawful where you live. Never bet more than you can afford to lose, and do not treat predictions as financial advice.",
    legalLinksTitle: "More information",
    aiLink: "AI Disclaimer",
    affiliateLink: "Affiliate Disclosure",
    responsibleLink: "Responsible Gambling",
    contactLink: "Contact MatchSignal",
  },
  hu: {
    metaTitle: "A MatchSignalról | MI-alapú sportelemzés",
    metaDescription: "Ismerje meg, hogyan hasonlítja össze a MatchSignal az aktuális fogadási piacokat, és hogyan készít belőlük közérthető, MI-vel támogatott elemzéseket.",
    eyebrow: "A MatchSignalról",
    title: "Közérthetőbb betekintés az aktuális fogadási piacokba",
    intro: "A MatchSignal egy ingyenes, mesterséges intelligenciával támogatott sportelemző platform. Aktuális fogadási piaci adatokat hasonlít össze, és azokat áttekinthető, könnyebben értelmezhető információkká alakítja. A MatchSignal nem fogadóiroda, nem fogad téteket, és nem ígér biztos pontosságot vagy nyereséget.",
    processTitle: "Hogyan működik a MatchSignal?",
    steps: [
      { title: "1. Aktuális piaci adatok", body: "A MatchSignal több fogadóirodától gyűjti össze a támogatott, közelgő sporteseményekhez elérhető oddsokat. A lefedettség sportáganként, eseményenként, piaconként és időponttól függően változhat." },
      { title: "2. A piac összehasonlítása", body: "Az azonos fogadási piacokat és választásokat több fogadóirodánál is összevetjük, hogy érthetőbb képet adjunk a piac aktuális véleményéről." },
      { title: "3. MI-vel támogatott elemzés", body: "A mesterséges intelligencia segít értékelni az elérhető piaci információkat és összefüggésbe helyezni a lehetséges lehetőségeket. Ellenőrzött piaci adatokkal dolgozik, nem talál ki tetszőleges fogadásokat." },
      { title: "4. Értékjelzés", body: "Értékjelzés akkor jelenik meg, ha a MatchSignal becsült valószínűsége alapján az elérhető odds kedvezőbb lehet annál, amit a piac által jelzett valószínűség indokol. Ez becslés, nem garantált érték vagy nyereség." },
      { title: "5. Kockázati szint", body: "Az Alacsony, Közepes és Magas jelölések összehasonlító kockázati mutatók, amelyek segítenek megkülönböztetni a lehetőségeket. Az Alacsony szint sem jelent biztonságot: minden választás vesztes lehet." },
      { title: "6. Oddsok összehasonlítása", body: "Ha ugyanahhoz a választáshoz megfelelő partnerodds érhető el, a MatchSignal megjelenítheti azt az árak összehasonlításához. Az affiliate linkek jutalékot eredményezhetnek, de ezek a kapcsolatok nem határozzák meg az elemzés eredményét." },
    ],
    limitsTitle: "Fontos korlátok",
    limits: [
      "Az oddsok, valamint az események és piacok elérhetősége az adatgyűjtés után megváltozhat.",
      "Az adatforrások és az MI-vel támogatott elemzés hibákat vagy hiányosságokat tartalmazhatnak.",
      "A sporteredmények bizonytalanok, és minden előrejelzés vesztes lehet.",
      "A fogadás pénzügyi kockázattal jár. Mindig ellenőrizze az aktuális oddsokat, a fogadóiroda feltételeit és saját jogosultságát közvetlenül a szolgáltatónál.",
    ],
    responsibleTitle: "Használja felelősen a MatchSignalt",
    responsibleBody: "Fogadással kapcsolatos információt csak akkor használjon, ha elérte a törvényes korhatárt, és a fogadás az Ön lakóhelyén jogszerű. Soha ne kockáztasson többet annál, mint amennyit elveszíthet, és az előrejelzéseket ne tekintse pénzügyi tanácsnak.",
    legalLinksTitle: "További információ",
    aiLink: "MI-jogi nyilatkozat",
    affiliateLink: "Affiliate tájékoztató",
    responsibleLink: "Felelős szerencsejáték",
    contactLink: "Kapcsolat",
  },
  de: {
    metaTitle: "Über MatchSignal | KI-gestützte Sportanalyse",
    metaDescription: "Erfahren Sie, wie MatchSignal aktuelle Wettmärkte vergleicht und daraus verständliche, KI-gestützte Einblicke erstellt.",
    eyebrow: "Über MatchSignal",
    title: "Aktuelle Wettmärkte einfacher verstehen",
    intro: "MatchSignal ist eine kostenlose, KI-gestützte Plattform für Sportanalysen. Sie vergleicht aktuelle Marktdaten von Wettanbietern und bereitet sie als strukturierte, leichter verständliche Einblicke auf. MatchSignal ist kein Wettanbieter, nimmt keine Wetten an und garantiert weder Genauigkeit noch Gewinn.",
    processTitle: "So funktioniert MatchSignal",
    steps: [
      { title: "1. Aktuelle Marktdaten", body: "MatchSignal sammelt verfügbare Quoten für unterstützte, bevorstehende Sportereignisse von mehreren Wettanbietern. Abdeckung und Verfügbarkeit können je nach Sportart, Ereignis, Markt und Zeitpunkt variieren." },
      { title: "2. Marktvergleich", body: "Gleichwertige Wettmärkte und Auswahlen werden anbieterübergreifend verglichen, um den aktuellen Marktkonsens verständlicher darzustellen." },
      { title: "3. KI-gestützte Analyse", body: "KI hilft, die verfügbaren Marktinformationen auszuwerten und mögliche Chancen einzuordnen. Sie arbeitet innerhalb geprüfter Marktdaten und erfindet keine beliebigen Wetten." },
      { title: "4. Value Signal", body: "Ein Value Signal erscheint, wenn die von MatchSignal geschätzte Wahrscheinlichkeit darauf hindeutet, dass eine verfügbare Quote günstiger sein könnte als die vom Markt eingepreiste Wahrscheinlichkeit. Es ist eine Schätzung, kein garantierter Wert oder Gewinn." },
      { title: "5. Risikostufe", body: "Niedrig, Mittel und Hoch sind vergleichende Risikoindikatoren, die Chancen voneinander unterscheiden. Niedrig bedeutet nicht sicher: Jede Auswahl kann verlieren." },
      { title: "6. Quotenvergleich", body: "Wenn passende Partnerquoten für dieselbe Auswahl verfügbar sind, kann MatchSignal sie zum Preisvergleich anzeigen. Affiliate-Links können eine Provision erzeugen, bestimmen aber nicht die zugrunde liegende Prognoseanalyse." },
    ],
    limitsTitle: "Wichtige Einschränkungen",
    limits: ["Quoten sowie Ereignis- und Marktverfügbarkeit können sich nach der Datenerfassung ändern.", "Datenfeeds und KI-gestützte Analysen können Fehler oder Lücken enthalten.", "Sportausgänge sind ungewiss, und jede Prognose kann verlieren.", "Wetten bergen finanzielle Risiken. Prüfen Sie aktuelle Quoten, Anbieterbedingungen und Ihre Berechtigung immer direkt beim Anbieter."],
    responsibleTitle: "MatchSignal verantwortungsvoll nutzen",
    responsibleBody: "Nutzen Sie Wettinformationen nur im gesetzlichen Mindestalter und wenn Wetten an Ihrem Wohnort erlaubt sind. Setzen Sie nie mehr, als Sie verlieren können, und betrachten Sie Prognosen nicht als Finanzberatung.",
    legalLinksTitle: "Weitere Informationen", aiLink: "KI-Haftungsausschluss", affiliateLink: "Affiliate-Offenlegung", responsibleLink: "Verantwortungsvolles Glücksspiel", contactLink: "Kontakt",
  },
  fr: {
    metaTitle: "À propos de MatchSignal | Analyse sportive assistée par IA",
    metaDescription: "Découvrez comment MatchSignal compare les marchés de paris actuels et les transforme en informations claires assistées par IA.",
    eyebrow: "À propos de MatchSignal", title: "Mieux comprendre les marchés de paris actuels",
    intro: "MatchSignal est une plateforme gratuite d'analyse sportive assistée par IA. Elle compare les données actuelles des marchés de paris et les transforme en informations structurées et plus faciles à comprendre. MatchSignal n'est pas un bookmaker, n'accepte aucun pari et ne garantit ni exactitude ni bénéfice.",
    processTitle: "Comment fonctionne MatchSignal",
    steps: [
      { title: "1. Données de marché actuelles", body: "MatchSignal recueille auprès de plusieurs bookmakers les cotes disponibles pour les prochains événements pris en charge. La couverture et la disponibilité varient selon le sport, l'événement, le marché et le moment." },
      { title: "2. Comparaison du marché", body: "Les marchés et sélections équivalents sont comparés entre plusieurs bookmakers afin de mieux comprendre le consensus actuel du marché." },
      { title: "3. Analyse assistée par IA", body: "L'IA aide à évaluer les informations disponibles et à mettre les occasions potentielles en contexte. Elle travaille à partir de données de marché vérifiées au lieu d'inventer des paris arbitraires." },
      { title: "4. Signal de valeur", body: "Un signal de valeur apparaît lorsque la probabilité estimée par MatchSignal suggère qu'une cote disponible peut être plus avantageuse que la probabilité implicite du marché. Il s'agit d'une estimation, jamais d'une valeur ou d'un bénéfice garanti." },
      { title: "5. Niveau de risque", body: "Faible, Moyen et Élevé sont des indicateurs comparatifs qui aident à distinguer les occasions. Faible ne signifie pas sans danger : toute sélection peut perdre." },
      { title: "6. Comparaison des cotes", body: "Lorsque des cotes partenaires adaptées existent pour la même sélection, MatchSignal peut les afficher pour faciliter la comparaison. Les liens affiliés peuvent générer une commission, mais ces relations ne déterminent pas l'analyse de la prédiction." },
    ],
    limitsTitle: "Limites importantes",
    limits: ["Les cotes et la disponibilité des événements ou marchés peuvent changer après la collecte.", "Les flux de données et l'analyse assistée par IA peuvent comporter des erreurs ou des omissions.", "Les résultats sportifs sont incertains et toute prédiction peut perdre.", "Les paris comportent un risque financier. Vérifiez toujours les cotes, les conditions du bookmaker et votre éligibilité directement auprès de l'opérateur."],
    responsibleTitle: "Utiliser MatchSignal de façon responsable", responsibleBody: "N'utilisez les informations de paris que si vous avez l'âge légal et si les paris sont autorisés là où vous vivez. Ne misez jamais plus que ce que vous pouvez perdre et ne considérez pas les prédictions comme des conseils financiers.",
    legalLinksTitle: "En savoir plus", aiLink: "Avertissement IA", affiliateLink: "Divulgation d'affiliation", responsibleLink: "Jeu responsable", contactLink: "Contact",
  },
  es: {
    metaTitle: "Sobre MatchSignal | Análisis deportivo con IA", metaDescription: "Descubre cómo MatchSignal compara mercados de apuestas actuales y los convierte en información clara con ayuda de IA.",
    eyebrow: "Sobre MatchSignal", title: "Entender mejor los mercados de apuestas actuales",
    intro: "MatchSignal es una plataforma gratuita de análisis deportivo asistido por IA. Compara datos actuales de los mercados de apuestas y los convierte en información estructurada y fácil de entender. MatchSignal no es una casa de apuestas, no acepta apuestas y no garantiza precisión ni beneficios.",
    processTitle: "Cómo funciona MatchSignal",
    steps: [
      { title: "1. Datos actuales del mercado", body: "MatchSignal recopila de varias casas las cuotas disponibles para próximos eventos compatibles. La cobertura y disponibilidad pueden variar según el deporte, evento, mercado y momento." },
      { title: "2. Comparación del mercado", body: "Se comparan mercados y selecciones equivalentes entre varias casas para comprender mejor el consenso actual del mercado." },
      { title: "3. Análisis asistido por IA", body: "La IA ayuda a evaluar la información disponible y a contextualizar posibles oportunidades. Trabaja dentro de datos de mercado comprobados en lugar de inventar apuestas arbitrarias." },
      { title: "4. Señal de valor", body: "Aparece una señal de valor cuando la probabilidad estimada por MatchSignal sugiere que una cuota disponible puede ser más favorable que la probabilidad implícita del mercado. Es una estimación, no valor ni beneficio garantizado." },
      { title: "5. Nivel de riesgo", body: "Bajo, Medio y Alto son indicadores comparativos para distinguir oportunidades. Bajo no significa seguro: cualquier selección puede perder." },
      { title: "6. Comparación de cuotas", body: "Cuando hay cuotas adecuadas de socios para la misma selección, MatchSignal puede mostrarlas para comparar precios. Los enlaces afiliados pueden generar una comisión, pero esas relaciones no determinan el análisis de la predicción." },
    ],
    limitsTitle: "Limitaciones importantes", limits: ["Las cuotas y la disponibilidad de eventos o mercados pueden cambiar tras la recopilación.", "Las fuentes de datos y el análisis asistido por IA pueden contener errores u omisiones.", "Los resultados deportivos son inciertos y cualquier predicción puede perder.", "Apostar implica riesgo financiero. Comprueba siempre las cuotas actuales, los términos de la casa y tu elegibilidad directamente con el operador."],
    responsibleTitle: "Usa MatchSignal con responsabilidad", responsibleBody: "Utiliza información de apuestas solo si tienes la edad legal y las apuestas son legales donde vives. Nunca apuestes más de lo que puedas perder ni consideres las predicciones asesoramiento financiero.",
    legalLinksTitle: "Más información", aiLink: "Aviso sobre IA", affiliateLink: "Divulgación de afiliados", responsibleLink: "Juego responsable", contactLink: "Contacto",
  },
  it: {
    metaTitle: "Informazioni su MatchSignal | Analisi sportiva con IA", metaDescription: "Scopri come MatchSignal confronta i mercati di scommessa attuali e li trasforma in informazioni chiare con l'aiuto dell'IA.",
    eyebrow: "Informazioni su MatchSignal", title: "Capire meglio i mercati di scommessa attuali",
    intro: "MatchSignal è una piattaforma gratuita di analisi sportiva assistita dall'IA. Confronta i dati attuali dei mercati di scommessa e li trasforma in informazioni strutturate e più facili da capire. MatchSignal non è un bookmaker, non accetta scommesse e non garantisce precisione o profitto.",
    processTitle: "Come funziona MatchSignal",
    steps: [
      { title: "1. Dati di mercato attuali", body: "MatchSignal raccoglie da più bookmaker le quote disponibili per gli eventi sportivi futuri supportati. Copertura e disponibilità possono variare per sport, evento, mercato e momento." },
      { title: "2. Confronto del mercato", body: "Mercati e selezioni equivalenti vengono confrontati tra più bookmaker per comprendere meglio l'attuale consenso del mercato." },
      { title: "3. Analisi assistita dall'IA", body: "L'IA aiuta a valutare le informazioni disponibili e a contestualizzare le possibili opportunità. Lavora su dati di mercato controllati invece di inventare scommesse arbitrarie." },
      { title: "4. Segnale di valore", body: "Un segnale di valore appare quando la probabilità stimata da MatchSignal indica che una quota disponibile potrebbe essere più favorevole della probabilità implicita del mercato. È una stima, non valore o profitto garantito." },
      { title: "5. Livello di rischio", body: "Basso, Medio e Alto sono indicatori comparativi che aiutano a distinguere le opportunità. Basso non significa sicuro: ogni selezione può perdere." },
      { title: "6. Confronto delle quote", body: "Quando sono disponibili quote partner adatte per la stessa selezione, MatchSignal può mostrarle per confrontare i prezzi. I link affiliati possono generare una commissione, ma questi rapporti non determinano l'analisi della previsione." },
    ],
    limitsTitle: "Limiti importanti", limits: ["Le quote e la disponibilità di eventi o mercati possono cambiare dopo la raccolta.", "I feed di dati e l'analisi assistita dall'IA possono contenere errori o omissioni.", "I risultati sportivi sono incerti e ogni previsione può perdere.", "Le scommesse comportano rischi finanziari. Verifica sempre quote, condizioni del bookmaker e idoneità direttamente con l'operatore."],
    responsibleTitle: "Usa MatchSignal responsabilmente", responsibleBody: "Usa informazioni sulle scommesse solo se hai l'età legale e le scommesse sono consentite dove vivi. Non puntare mai più di quanto puoi perdere e non considerare le previsioni una consulenza finanziaria.",
    legalLinksTitle: "Maggiori informazioni", aiLink: "Avvertenza IA", affiliateLink: "Informativa affiliati", responsibleLink: "Gioco responsabile", contactLink: "Contatti",
  },
  pt: {
    metaTitle: "Sobre o MatchSignal | Análise desportiva com IA", metaDescription: "Saiba como o MatchSignal compara mercados de apostas atuais e os transforma em informação clara com apoio de IA.",
    eyebrow: "Sobre o MatchSignal", title: "Compreender melhor os mercados de apostas atuais",
    intro: "O MatchSignal é uma plataforma gratuita de análise desportiva assistida por IA. Compara dados atuais dos mercados de apostas e transforma-os em informação estruturada e mais fácil de compreender. O MatchSignal não é uma casa de apostas, não aceita apostas e não garante precisão nem lucro.",
    processTitle: "Como funciona o MatchSignal",
    steps: [
      { title: "1. Dados de mercado atuais", body: "O MatchSignal recolhe, junto de várias casas de apostas, odds disponíveis para próximos eventos suportados. A cobertura e disponibilidade variam por desporto, evento, mercado e momento." },
      { title: "2. Comparação do mercado", body: "Mercados e seleções equivalentes são comparados entre várias casas para compreender melhor o consenso atual do mercado." },
      { title: "3. Análise assistida por IA", body: "A IA ajuda a avaliar a informação disponível e a contextualizar possíveis oportunidades. Trabalha com dados de mercado verificados, em vez de inventar apostas arbitrárias." },
      { title: "4. Sinal de valor", body: "Um sinal de valor aparece quando a probabilidade estimada pelo MatchSignal sugere que uma odd disponível pode ser mais favorável do que a probabilidade implícita do mercado. É uma estimativa, não valor nem lucro garantido." },
      { title: "5. Nível de risco", body: "Baixo, Médio e Alto são indicadores comparativos que ajudam a distinguir oportunidades. Baixo não significa seguro: qualquer seleção pode perder." },
      { title: "6. Comparação de odds", body: "Quando existem odds adequadas de parceiros para a mesma seleção, o MatchSignal pode mostrá-las para comparar preços. Links afiliados podem gerar comissão, mas essas relações não determinam a análise da previsão." },
    ],
    limitsTitle: "Limitações importantes", limits: ["As odds e a disponibilidade de eventos ou mercados podem mudar após a recolha.", "Os feeds de dados e a análise assistida por IA podem conter erros ou omissões.", "Os resultados desportivos são incertos e qualquer previsão pode perder.", "As apostas envolvem risco financeiro. Confirme sempre as odds, os termos da casa e a sua elegibilidade diretamente com o operador."],
    responsibleTitle: "Utilize o MatchSignal com responsabilidade", responsibleBody: "Use informação sobre apostas apenas se tiver idade legal e as apostas forem permitidas onde vive. Nunca aposte mais do que pode perder nem trate previsões como aconselhamento financeiro.",
    legalLinksTitle: "Mais informações", aiLink: "Aviso sobre IA", affiliateLink: "Divulgação de afiliados", responsibleLink: "Jogo responsável", contactLink: "Contacto",
  },
  ar: {
    metaTitle: "حول MatchSignal | تحليل رياضي بمساعدة الذكاء الاصطناعي", metaDescription: "تعرّف على كيفية مقارنة MatchSignal لأسواق المراهنات الحالية وتحويلها إلى معلومات واضحة بمساعدة الذكاء الاصطناعي.",
    eyebrow: "حول MatchSignal", title: "فهم أوضح لأسواق المراهنات الحالية",
    intro: "MatchSignal منصة مجانية للتحليل الرياضي بمساعدة الذكاء الاصطناعي. تقارن بيانات أسواق المراهنات الحالية وتحولها إلى معلومات منظمة وأسهل للفهم. MatchSignal ليست شركة مراهنات، ولا تقبل الرهانات، ولا تضمن الدقة أو الربح.",
    processTitle: "كيف تعمل MatchSignal",
    steps: [
      { title: "1. بيانات السوق الحالية", body: "تجمع MatchSignal الأسعار المتاحة للأحداث الرياضية القادمة المدعومة من عدة شركات مراهنات. قد تختلف التغطية والتوافر حسب الرياضة والحدث والسوق والوقت." },
      { title: "2. مقارنة السوق", body: "تتم مقارنة الأسواق والاختيارات المتكافئة لدى عدة شركات لفهم إجماع السوق الحالي بصورة أوضح." },
      { title: "3. تحليل بمساعدة الذكاء الاصطناعي", body: "يساعد الذكاء الاصطناعي في تقييم معلومات السوق المتاحة ووضع الفرص المحتملة في سياقها. وهو يعمل ضمن بيانات سوق تم التحقق منها بدل اختراع رهانات عشوائية." },
      { title: "4. إشارة القيمة", body: "تظهر إشارة القيمة عندما يشير تقدير MatchSignal للاحتمال إلى أن سعراً متاحاً قد يكون أفضل من الاحتمال الذي يعكسه السوق. هذا تقدير وليس قيمة أو ربحاً مضموناً." },
      { title: "5. مستوى المخاطر", body: "منخفض ومتوسط ومرتفع مؤشرات مقارنة تساعد على التمييز بين الفرص. منخفض لا يعني آمناً، فأي اختيار قد يخسر." },
      { title: "6. مقارنة الأسعار", body: "عند توافر أسعار مناسبة لدى الشركاء للاختيار نفسه، قد تعرضها MatchSignal لمساعدة المستخدم على المقارنة. قد تحقق روابط الإحالة عمولة، لكن هذه العلاقات لا تحدد تحليل التوقع الأساسي." },
    ],
    limitsTitle: "قيود مهمة", limits: ["قد تتغير الأسعار وتوافر الأحداث أو الأسواق بعد جمع البيانات.", "قد تحتوي مصادر البيانات والتحليلات المدعومة بالذكاء الاصطناعي على أخطاء أو معلومات ناقصة.", "نتائج الرياضة غير مؤكدة، ويمكن أن يخسر أي توقع.", "تنطوي المراهنة على مخاطر مالية. تحقق دائماً من الأسعار الحالية وشروط شركة المراهنات وأهليتك مباشرة لدى المشغل."],
    responsibleTitle: "استخدم MatchSignal بمسؤولية", responsibleBody: "استخدم معلومات المراهنات فقط إذا بلغت السن القانونية وكانت المراهنة قانونية في مكان إقامتك. لا تراهن أبداً بأكثر مما يمكنك تحمل خسارته، ولا تعتبر التوقعات نصيحة مالية.",
    legalLinksTitle: "معلومات إضافية", aiLink: "إخلاء مسؤولية الذكاء الاصطناعي", affiliateLink: "إفصاح الإحالة", responsibleLink: "المراهنة المسؤولة", contactLink: "اتصل بنا",
  },
  zh: {
    metaTitle: "关于 MatchSignal | AI 辅助体育分析", metaDescription: "了解 MatchSignal 如何比较当前体育博彩市场，并将其转化为清晰易懂的 AI 辅助分析。",
    eyebrow: "关于 MatchSignal", title: "更清晰地理解当前体育博彩市场",
    intro: "MatchSignal 是一个免费的 AI 辅助体育分析平台。它比较当前体育博彩市场数据，并将其整理为结构清晰、易于理解的信息。MatchSignal 不是博彩公司，不接受投注，也不保证准确性或盈利。",
    processTitle: "MatchSignal 如何运作",
    steps: [
      { title: "1. 当前市场数据", body: "MatchSignal 从多家博彩公司收集受支持的近期体育赛事可用赔率。覆盖范围和可用性会因运动、赛事、市场和时间而异。" },
      { title: "2. 比较市场", body: "系统会比较多家博彩公司中相同的投注市场和选项，以便更清楚地了解当前市场共识。" },
      { title: "3. AI 辅助分析", body: "AI 帮助评估可用市场信息，并为潜在机会提供背景。它只在经过核对的市场数据范围内工作，不会随意编造投注。" },
      { title: "4. 价值信号", body: "当 MatchSignal 的估算概率显示某个可用赔率可能优于市场隐含概率时，会出现价值信号。这只是估算，并不保证价值或盈利。" },
      { title: "5. 风险等级", body: "低、中、高是用于区分不同机会的相对风险指标。低风险并不等于安全，任何选项都可能输。" },
      { title: "6. 赔率比较", body: "如果合作伙伴针对同一选项提供合适赔率，MatchSignal 可能会展示这些赔率供用户比较。推广链接可能带来佣金，但合作关系不会决定基础预测分析。" },
    ],
    limitsTitle: "重要限制", limits: ["赔率以及赛事或市场的可用性可能在数据收集后发生变化。", "数据源和 AI 辅助分析可能包含错误或遗漏。", "体育结果具有不确定性，任何预测都可能失败。", "投注涉及财务风险。请务必直接向运营商核实当前赔率、条款以及您是否符合资格。"],
    responsibleTitle: "负责任地使用 MatchSignal", responsibleBody: "只有在达到法定年龄且您所在地允许投注时，才应使用投注相关信息。切勿投入超出承受能力的资金，也不要把预测视为财务建议。",
    legalLinksTitle: "更多信息", aiLink: "AI 免责声明", affiliateLink: "推广关系披露", responsibleLink: "负责任博彩", contactLink: "联系 MatchSignal",
  },
  ja: {
    metaTitle: "MatchSignalについて | AI支援スポーツ分析", metaDescription: "MatchSignalが現在のスポーツベッティング市場を比較し、分かりやすいAI支援情報に整理する仕組みをご紹介します。",
    eyebrow: "MatchSignalについて", title: "現在のベッティング市場をより分かりやすく",
    intro: "MatchSignalは、AIを活用した無料のスポーツ分析プラットフォームです。現在のベッティング市場データを比較し、構造化された分かりやすい情報に整理します。MatchSignalはブックメーカーではなく、賭けを受け付けず、精度や利益を保証しません。",
    processTitle: "MatchSignalの仕組み",
    steps: [
      { title: "1. 現在の市場データ", body: "MatchSignalは、対応する今後のスポーツイベントについて、複数のブックメーカーから利用可能なオッズを収集します。対象範囲や利用可能性は、競技、イベント、市場、時点によって異なります。" },
      { title: "2. 市場を比較", body: "複数のブックメーカーにある同等の市場と選択肢を比較し、現在の市場コンセンサスを分かりやすく捉えます。" },
      { title: "3. AI支援分析", body: "AIは利用可能な市場情報の評価と、潜在的な機会の背景整理を支援します。確認された市場データの範囲内で働き、任意の賭けを作り出すことはありません。" },
      { title: "4. バリューシグナル", body: "MatchSignalの推定確率から、利用可能な価格が市場の示す確率より有利な可能性がある場合に表示されます。これは推定であり、価値や利益を保証するものではありません。" },
      { title: "5. リスク区分", body: "低・中・高は、機会を比較するための相対的なリスク指標です。低でも安全という意味ではなく、どの選択も外れる可能性があります。" },
      { title: "6. オッズ比較", body: "同じ選択肢について適切な提携先オッズがある場合、価格比較のために表示することがあります。アフィリエイトリンクから報酬を得る場合がありますが、提携関係が予測分析を決めることはありません。" },
    ],
    limitsTitle: "重要な制約", limits: ["オッズやイベント・市場の提供状況はデータ収集後に変わることがあります。", "データ配信やAI支援分析には誤りや欠落が含まれることがあります。", "スポーツの結果は不確実で、どの予測も外れる可能性があります。", "賭けには金銭的リスクがあります。現在のオッズ、事業者の規約、利用資格を必ず事業者に直接確認してください。"],
    responsibleTitle: "責任を持って利用する", responsibleBody: "法定年齢に達し、居住地で賭けが合法な場合にのみ関連情報を利用してください。失ってもよい額を超えて賭けず、予測を金融助言として扱わないでください。",
    legalLinksTitle: "詳細情報", aiLink: "AI免責事項", affiliateLink: "アフィリエイト開示", responsibleLink: "責任あるギャンブル", contactLink: "お問い合わせ",
  },
  hi: {
    metaTitle: "MatchSignal के बारे में | एआई-सहायित खेल विश्लेषण", metaDescription: "जानें कि MatchSignal मौजूदा स्पोर्ट्सबुक बाज़ारों की तुलना करके उन्हें स्पष्ट, एआई-सहायित जानकारी में कैसे बदलता है।",
    eyebrow: "MatchSignal के बारे में", title: "मौजूदा बेटिंग बाज़ार को अधिक आसानी से समझें",
    intro: "MatchSignal एक निःशुल्क, एआई-सहायित खेल विश्लेषण प्लेटफ़ॉर्म है। यह मौजूदा स्पोर्ट्सबुक बाज़ार डेटा की तुलना करके उसे व्यवस्थित और आसानी से समझ आने वाली जानकारी में बदलता है। MatchSignal कोई स्पोर्ट्सबुक नहीं है, बेट स्वीकार नहीं करता और सटीकता या लाभ की गारंटी नहीं देता।",
    processTitle: "MatchSignal कैसे काम करता है",
    steps: [
      { title: "1. मौजूदा बाज़ार डेटा", body: "MatchSignal समर्थित आगामी खेल आयोजनों के लिए कई स्पोर्ट्सबुक से उपलब्ध ऑड्स एकत्र करता है। कवरेज और उपलब्धता खेल, आयोजन, बाज़ार और समय के अनुसार बदल सकती है।" },
      { title: "2. बाज़ार की तुलना", body: "मौजूदा बाज़ार की सामूहिक राय समझने के लिए कई स्पोर्ट्सबुक में समान बेटिंग बाज़ारों और विकल्पों की तुलना की जाती है।" },
      { title: "3. एआई-सहायित विश्लेषण", body: "एआई उपलब्ध बाज़ार जानकारी का मूल्यांकन करने और संभावित अवसरों का संदर्भ समझाने में मदद करता है। यह जाँचे गए बाज़ार डेटा के भीतर काम करता है और मनमानी बेट नहीं बनाता।" },
      { title: "4. वैल्यू सिग्नल", body: "वैल्यू सिग्नल तब दिखाई देता है जब MatchSignal का अनुमानित प्रायिकता आकलन बताता है कि उपलब्ध ऑड्स बाज़ार की निहित प्रायिकता से अधिक अनुकूल हो सकते हैं। यह केवल अनुमान है, मूल्य या लाभ की गारंटी नहीं।" },
      { title: "5. जोखिम स्तर", body: "कम, मध्यम और अधिक तुलनात्मक जोखिम संकेतक हैं, जो अवसरों में अंतर समझने में मदद करते हैं। कम का अर्थ सुरक्षित नहीं है; हर विकल्प हार सकता है।" },
      { title: "6. ऑड्स की तुलना", body: "उसी विकल्प के लिए उपयुक्त साझेदार ऑड्स उपलब्ध होने पर MatchSignal उन्हें कीमतों की तुलना के लिए दिखा सकता है। एफिलिएट लिंक से कमीशन मिल सकता है, लेकिन ये संबंध मूल पूर्वानुमान विश्लेषण तय नहीं करते।" },
    ],
    limitsTitle: "महत्वपूर्ण सीमाएँ", limits: ["डेटा एकत्र होने के बाद ऑड्स और आयोजन या बाज़ार की उपलब्धता बदल सकती है।", "डेटा फ़ीड और एआई-सहायित विश्लेषण में त्रुटियाँ या जानकारी की कमी हो सकती है।", "खेल परिणाम अनिश्चित होते हैं और हर पूर्वानुमान हार सकता है।", "बेटिंग में वित्तीय जोखिम है। मौजूदा ऑड्स, स्पोर्ट्सबुक की शर्तें और अपनी पात्रता सीधे ऑपरेटर से जाँचें।"],
    responsibleTitle: "MatchSignal का जिम्मेदारी से उपयोग करें", responsibleBody: "बेटिंग से जुड़ी जानकारी का उपयोग तभी करें जब आपकी आयु कानूनी सीमा से अधिक हो और आपके निवास स्थान पर बेटिंग वैध हो। जितना खो सकते हैं उससे अधिक कभी दाँव पर न लगाएँ और पूर्वानुमानों को वित्तीय सलाह न मानें।",
    legalLinksTitle: "अधिक जानकारी", aiLink: "एआई अस्वीकरण", affiliateLink: "एफिलिएट प्रकटीकरण", responsibleLink: "जिम्मेदार बेटिंग", contactLink: "संपर्क",
  },
};
