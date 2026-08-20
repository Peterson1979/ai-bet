import type { Lang } from "@/app/lib/i18n";

export const GUIDES_LABEL: Record<Lang, string> = {
  en: "Betting Guides",
  hu: "Fogadási útmutatók",
  de: "Wettleitfäden",
  fr: "Guides de paris",
  es: "Guías de apuestas",
  it: "Guide alle scommesse",
  pt: "Guias de apostas",
  ar: "أدلة المراهنات",
  zh: "投注指南",
  ja: "ベッティングガイド",
  hi: "बेटिंग गाइड",
};

export const RECOMMENDATION_LABEL: Record<Lang, string> = {
  en: "Recommendation",
  hu: "Ajánlás",
  de: "Empfehlung",
  fr: "Recommandation",
  es: "Recomendación",
  it: "Raccomandazione",
  pt: "Recomendação",
  ar: "التوصية",
  zh: "推荐",
  ja: "推奨",
  hi: "सिफारिश",
};

export const PRIVACY_COPY: Record<
  Lang,
  {
    ariaLabel: string;
    title: string;
    intro: string;
    customize: string;
    necessaryOnly: string;
    allowAnalytics: string;
    customizeTitle: string;
    close: string;
    necessary: string;
    alwaysActive: string;
    necessaryDesc: string;
    analytics: string;
    analyticsDesc: string;
    advertising: string;
    googleCmp: string;
    advertisingDesc: string;
    savePreferences: string;
    cookieSettings: string;
  }
> = {
  en: {
    ariaLabel: "Privacy and Consent Choices",
    title: "Privacy choices",
    intro:
      "We use necessary storage to operate MatchSignal. With your permission, we also use analytics to understand how the site is used and improve it. Advertising consent is managed separately where Google consent services are available.",
    customize: "Customize",
    necessaryOnly: "Necessary only",
    allowAnalytics: "Allow analytics",
    customizeTitle: "Customize Privacy Choices",
    close: "Close",
    necessary: "Necessary",
    alwaysActive: "Always Active",
    necessaryDesc:
      "Required for site navigation, security, and storing your consent preferences.",
    analytics: "Analytics (GA4)",
    analyticsDesc:
      "Helps us measure site traffic, page views, and feature usage to improve performance.",
    advertising: "Advertising (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "Advertising consent is managed separately via Google consent services where available.",
    savePreferences: "Save Preferences",
    cookieSettings: "Cookie Settings",
  },
  hu: {
    ariaLabel: "Adatvédelmi és hozzájárulási beállítások",
    title: "Adatvédelmi beállítások",
    intro:
      "A MatchSignal működéséhez szükséges tárolást használunk. Az Ön engedélyével analitikát is használunk az oldal használatának megértésére és fejlesztésére. A hirdetési hozzájárulást külön kezeljük, ahol a Google hozzájárulási szolgáltatásai elérhetők.",
    customize: "Testreszabás",
    necessaryOnly: "Csak szükséges",
    allowAnalytics: "Analitika engedélyezése",
    customizeTitle: "Adatvédelmi beállítások testreszabása",
    close: "Bezárás",
    necessary: "Szükséges",
    alwaysActive: "Mindig aktív",
    necessaryDesc:
      "Az oldal navigációjához, biztonságához és a hozzájárulási beállítások tárolásához szükséges.",
    analytics: "Analitika (GA4)",
    analyticsDesc:
      "Segít mérni az oldal forgalmát, az oldalmegtekintéseket és a funkciók használatát a teljesítmény javítása érdekében.",
    advertising: "Hirdetések (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "A hirdetési hozzájárulást külön, a Google hozzájárulási szolgáltatásain keresztül kezeljük, ahol ezek elérhetők.",
    savePreferences: "Beállítások mentése",
    cookieSettings: "Süti beállítások",
  },
  de: {
    ariaLabel: "Datenschutz- und Einwilligungseinstellungen",
    title: "Datenschutzeinstellungen",
    intro:
      "Wir verwenden notwendige Speicherung, um MatchSignal zu betreiben. Mit Ihrer Zustimmung nutzen wir außerdem Analysen, um die Nutzung der Website zu verstehen und sie zu verbessern. Die Einwilligung für Werbung wird separat verwaltet, sofern Google-Einwilligungsdienste verfügbar sind.",
    customize: "Anpassen",
    necessaryOnly: "Nur notwendige",
    allowAnalytics: "Analysen erlauben",
    customizeTitle: "Datenschutzeinstellungen anpassen",
    close: "Schließen",
    necessary: "Notwendig",
    alwaysActive: "Immer aktiv",
    necessaryDesc:
      "Erforderlich für Seitennavigation, Sicherheit und das Speichern Ihrer Einwilligungseinstellungen.",
    analytics: "Analysen (GA4)",
    analyticsDesc:
      "Hilft uns, Website-Traffic, Seitenaufrufe und Funktionsnutzung zu messen und die Leistung zu verbessern.",
    advertising: "Werbung (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "Die Werbeeinwilligung wird separat über Google-Einwilligungsdienste verwaltet, sofern verfügbar.",
    savePreferences: "Einstellungen speichern",
    cookieSettings: "Cookie-Einstellungen",
  },
  fr: {
    ariaLabel: "Choix de confidentialité et de consentement",
    title: "Choix de confidentialité",
    intro:
      "Nous utilisons le stockage nécessaire au fonctionnement de MatchSignal. Avec votre autorisation, nous utilisons également des analyses pour comprendre l’utilisation du site et l’améliorer. Le consentement publicitaire est géré séparément lorsque les services de consentement Google sont disponibles.",
    customize: "Personnaliser",
    necessaryOnly: "Nécessaire uniquement",
    allowAnalytics: "Autoriser les analyses",
    customizeTitle: "Personnaliser les choix de confidentialité",
    close: "Fermer",
    necessary: "Nécessaire",
    alwaysActive: "Toujours actif",
    necessaryDesc:
      "Nécessaire pour la navigation, la sécurité et l’enregistrement de vos préférences de consentement.",
    analytics: "Analyses (GA4)",
    analyticsDesc:
      "Nous aide à mesurer le trafic, les pages vues et l’utilisation des fonctionnalités afin d’améliorer les performances.",
    advertising: "Publicité (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "Le consentement publicitaire est géré séparément via les services de consentement Google lorsqu’ils sont disponibles.",
    savePreferences: "Enregistrer les préférences",
    cookieSettings: "Paramètres des cookies",
  },
  es: {
    ariaLabel: "Opciones de privacidad y consentimiento",
    title: "Opciones de privacidad",
    intro:
      "Utilizamos almacenamiento necesario para el funcionamiento de MatchSignal. Con su permiso, también utilizamos analítica para comprender cómo se usa el sitio y mejorarlo. El consentimiento publicitario se gestiona por separado cuando están disponibles los servicios de consentimiento de Google.",
    customize: "Personalizar",
    necessaryOnly: "Solo necesario",
    allowAnalytics: "Permitir analítica",
    customizeTitle: "Personalizar opciones de privacidad",
    close: "Cerrar",
    necessary: "Necesario",
    alwaysActive: "Siempre activo",
    necessaryDesc:
      "Necesario para la navegación, la seguridad y el almacenamiento de sus preferencias de consentimiento.",
    analytics: "Analítica (GA4)",
    analyticsDesc:
      "Nos ayuda a medir el tráfico, las páginas vistas y el uso de funciones para mejorar el rendimiento.",
    advertising: "Publicidad (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "El consentimiento publicitario se gestiona por separado mediante los servicios de consentimiento de Google cuando están disponibles.",
    savePreferences: "Guardar preferencias",
    cookieSettings: "Configuración de cookies",
  },
  it: {
    ariaLabel: "Scelte sulla privacy e sul consenso",
    title: "Scelte sulla privacy",
    intro:
      "Utilizziamo lo spazio di archiviazione necessario per il funzionamento di MatchSignal. Con il tuo consenso utilizziamo anche strumenti di analisi per comprendere l’utilizzo del sito e migliorarlo. Il consenso pubblicitario viene gestito separatamente dove sono disponibili i servizi di consenso Google.",
    customize: "Personalizza",
    necessaryOnly: "Solo necessari",
    allowAnalytics: "Consenti analisi",
    customizeTitle: "Personalizza le scelte sulla privacy",
    close: "Chiudi",
    necessary: "Necessari",
    alwaysActive: "Sempre attivi",
    necessaryDesc:
      "Necessari per la navigazione, la sicurezza e la memorizzazione delle preferenze di consenso.",
    analytics: "Analisi (GA4)",
    analyticsDesc:
      "Ci aiuta a misurare traffico, visualizzazioni di pagina e utilizzo delle funzionalità per migliorare le prestazioni.",
    advertising: "Pubblicità (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "Il consenso pubblicitario viene gestito separatamente tramite i servizi di consenso Google dove disponibili.",
    savePreferences: "Salva preferenze",
    cookieSettings: "Impostazioni cookie",
  },
  pt: {
    ariaLabel: "Opções de privacidade e consentimento",
    title: "Opções de privacidade",
    intro:
      "Utilizamos armazenamento necessário para operar o MatchSignal. Com a sua permissão, também utilizamos análises para compreender como o site é utilizado e melhorá-lo. O consentimento de publicidade é gerido separadamente quando os serviços de consentimento da Google estão disponíveis.",
    customize: "Personalizar",
    necessaryOnly: "Apenas necessários",
    allowAnalytics: "Permitir análises",
    customizeTitle: "Personalizar opções de privacidade",
    close: "Fechar",
    necessary: "Necessário",
    alwaysActive: "Sempre ativo",
    necessaryDesc:
      "Necessário para navegação, segurança e armazenamento das suas preferências de consentimento.",
    analytics: "Análises (GA4)",
    analyticsDesc:
      "Ajuda-nos a medir tráfego, visualizações de páginas e utilização de funcionalidades para melhorar o desempenho.",
    advertising: "Publicidade (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "O consentimento de publicidade é gerido separadamente através dos serviços de consentimento da Google, quando disponíveis.",
    savePreferences: "Guardar preferências",
    cookieSettings: "Definições de cookies",
  },
  ar: {
    ariaLabel: "خيارات الخصوصية والموافقة",
    title: "خيارات الخصوصية",
    intro:
      "نستخدم التخزين الضروري لتشغيل MatchSignal. وبموافقتك نستخدم أيضًا التحليلات لفهم كيفية استخدام الموقع وتحسينه. تتم إدارة الموافقة على الإعلانات بشكل منفصل حيث تتوفر خدمات موافقة Google.",
    customize: "تخصيص",
    necessaryOnly: "الضروري فقط",
    allowAnalytics: "السماح بالتحليلات",
    customizeTitle: "تخصيص خيارات الخصوصية",
    close: "إغلاق",
    necessary: "ضروري",
    alwaysActive: "نشط دائمًا",
    necessaryDesc:
      "مطلوب للتنقل في الموقع والأمان وتخزين تفضيلات الموافقة.",
    analytics: "التحليلات (GA4)",
    analyticsDesc:
      "يساعدنا على قياس حركة الموقع ومشاهدات الصفحات واستخدام الميزات لتحسين الأداء.",
    advertising: "الإعلانات (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "تتم إدارة الموافقة على الإعلانات بشكل منفصل عبر خدمات موافقة Google حيث تتوفر.",
    savePreferences: "حفظ التفضيلات",
    cookieSettings: "إعدادات ملفات الارتباط",
  },
  zh: {
    ariaLabel: "隐私与同意选项",
    title: "隐私选项",
    intro:
      "我们使用必要的存储功能来运行 MatchSignal。经您许可，我们还会使用分析工具来了解网站的使用情况并加以改进。在 Google 同意服务可用的地区，广告同意将单独管理。",
    customize: "自定义",
    necessaryOnly: "仅必要项",
    allowAnalytics: "允许分析",
    customizeTitle: "自定义隐私选项",
    close: "关闭",
    necessary: "必要",
    alwaysActive: "始终启用",
    necessaryDesc:
      "网站导航、安全以及保存您的同意偏好所必需。",
    analytics: "分析 (GA4)",
    analyticsDesc:
      "帮助我们衡量网站流量、页面浏览和功能使用情况，以改善性能。",
    advertising: "广告 (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "在可用地区，广告同意通过 Google 同意服务单独管理。",
    savePreferences: "保存偏好",
    cookieSettings: "Cookie 设置",
  },
  ja: {
    ariaLabel: "プライバシーと同意の選択",
    title: "プライバシー設定",
    intro:
      "MatchSignal の運営に必要なストレージを使用します。許可いただいた場合、サイトの利用状況を把握して改善するために分析も使用します。広告に関する同意は、Google の同意サービスが利用できる場合に別途管理されます。",
    customize: "カスタマイズ",
    necessaryOnly: "必要なもののみ",
    allowAnalytics: "分析を許可",
    customizeTitle: "プライバシー設定をカスタマイズ",
    close: "閉じる",
    necessary: "必須",
    alwaysActive: "常に有効",
    necessaryDesc:
      "サイトのナビゲーション、セキュリティ、同意設定の保存に必要です。",
    analytics: "分析 (GA4)",
    analyticsDesc:
      "サイトのトラフィック、ページビュー、機能の利用状況を測定し、パフォーマンスの改善に役立てます。",
    advertising: "広告 (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "利用可能な場合、広告の同意は Google の同意サービスを通じて別途管理されます。",
    savePreferences: "設定を保存",
    cookieSettings: "Cookie 設定",
  },
  hi: {
    ariaLabel: "गोपनीयता और सहमति विकल्प",
    title: "गोपनीयता विकल्प",
    intro:
      "MatchSignal को संचालित करने के लिए हम आवश्यक स्टोरेज का उपयोग करते हैं। आपकी अनुमति से हम साइट के उपयोग को समझने और उसे बेहतर बनाने के लिए एनालिटिक्स का भी उपयोग करते हैं। जहाँ Google की सहमति सेवाएँ उपलब्ध हैं, वहाँ विज्ञापन सहमति अलग से प्रबंधित की जाती है।",
    customize: "अनुकूलित करें",
    necessaryOnly: "केवल आवश्यक",
    allowAnalytics: "एनालिटिक्स की अनुमति दें",
    customizeTitle: "गोपनीयता विकल्प अनुकूलित करें",
    close: "बंद करें",
    necessary: "आवश्यक",
    alwaysActive: "हमेशा सक्रिय",
    necessaryDesc:
      "साइट नेविगेशन, सुरक्षा और आपकी सहमति प्राथमिकताएँ सहेजने के लिए आवश्यक।",
    analytics: "एनालिटिक्स (GA4)",
    analyticsDesc:
      "साइट ट्रैफिक, पेज व्यू और फीचर उपयोग को मापने में मदद करता है ताकि प्रदर्शन बेहतर किया जा सके।",
    advertising: "विज्ञापन (AdSense)",
    googleCmp: "Google CMP",
    advertisingDesc:
      "जहाँ उपलब्ध हो, विज्ञापन सहमति Google की सहमति सेवाओं के माध्यम से अलग से प्रबंधित की जाती है।",
    savePreferences: "प्राथमिकताएँ सहेजें",
    cookieSettings: "Cookie सेटिंग्स",
  },
};

export const GUIDE_PAGE_COPY: Record<Lang, {
  educationLabel: string;
  pageTitle: string;
  pageDescription: string;
  pageIntro: string;
  readGuide: string;
  minRead: string;
  home: string;
  keyTakeaways: string;
  updated: string;
  editorialTeam: string;
  responsibleBetting: string;
  responsibleLink: string;
  relatedGuides: string;
  exploreTitle: string;
  exploreText: string;
  viewAnalysis: string;
  categories: Record<string, string>;
}> = {
  "en": {
    "educationLabel": "MatchSignal Education",
    "pageTitle": "Betting Guides",
    "pageDescription": "Educational guides to betting odds, probability, expected value, bankroll management, betting psychology, responsible betting, and AI-assisted sports analysis.",
    "pageIntro": "Clear, practical resources explaining betting odds, probability, expected value, risk, decision-making, and the role of AI in sports analysis.",
    "readGuide": "Read guide →",
    "minRead": "min read",
    "home": "Home",
    "keyTakeaways": "Key Takeaways",
    "updated": "Updated",
    "editorialTeam": "MatchSignal Editorial Team",
    "responsibleBetting": "Responsible Betting",
    "responsibleLink": "Read our responsible gambling guidance →",
    "relatedGuides": "Related Guides",
    "exploreTitle": "Explore MatchSignal Analysis",
    "exploreText": "Apply these concepts when reviewing current match signals, market averages, value edges, and risk tiers.",
    "viewAnalysis": "View current match analysis",
    "categories": {
      "betting-fundamentals": "Betting Fundamentals",
      "odds-probability": "Odds & Probability",
      "value-analysis": "Value & Analysis",
      "bankroll-risk": "Bankroll & Risk",
      "betting-psychology": "Betting Psychology",
      "ai-data": "AI & Data",
      "responsible-betting": "Responsible Betting"
    }
  },
  "hu": {
    "educationLabel": "MatchSignal Oktatás",
    "pageTitle": "Fogadási útmutatók",
    "pageDescription": "Oktató útmutatók a fogadási oddsokról, valószínűségről, várható értékről, bankroll-kezelésről, fogadási pszichológiáról, felelős fogadásról és AI-alapú sportelemzésről.",
    "pageIntro": "Világos, gyakorlatias útmutatók az oddsokról, valószínűségről, várható értékről, kockázatról, döntéshozatalról és az AI sportelemzésben betöltött szerepéről.",
    "readGuide": "Útmutató olvasása →",
    "minRead": "perc olvasás",
    "home": "Kezdőlap",
    "keyTakeaways": "Főbb tanulságok",
    "updated": "Frissítve",
    "editorialTeam": "MatchSignal szerkesztőség",
    "responsibleBetting": "Felelős fogadás",
    "responsibleLink": "Olvasd el a felelős szerencsejátékról szóló útmutatónkat →",
    "relatedGuides": "Kapcsolódó útmutatók",
    "exploreTitle": "Fedezd fel a MatchSignal elemzéseit",
    "exploreText": "Alkalmazd ezeket az elveket az aktuális meccsjelzések, piaci átlagok, value edge-ek és kockázati szintek áttekintésekor.",
    "viewAnalysis": "Aktuális meccselemzések megtekintése",
    "categories": {
      "betting-fundamentals": "Fogadási alapok",
      "odds-probability": "Oddsok és valószínűség",
      "value-analysis": "Érték és elemzés",
      "bankroll-risk": "Bankroll és kockázat",
      "betting-psychology": "Fogadási pszichológia",
      "ai-data": "AI és adatok",
      "responsible-betting": "Felelős fogadás"
    }
  },
  "de": {
    "educationLabel": "MatchSignal Wissen",
    "pageTitle": "Wettleitfäden",
    "pageDescription": "Lernleitfäden zu Wettquoten, Wahrscheinlichkeit, Erwartungswert, Bankroll-Management, Wettpsychologie, verantwortungsvollem Wetten und KI-gestützter Sportanalyse.",
    "pageIntro": "Klare, praktische Ressourcen zu Wettquoten, Wahrscheinlichkeit, Erwartungswert, Risiko, Entscheidungsfindung und der Rolle von KI in der Sportanalyse.",
    "readGuide": "Leitfaden lesen →",
    "minRead": "Min. Lesezeit",
    "home": "Startseite",
    "keyTakeaways": "Wichtigste Erkenntnisse",
    "updated": "Aktualisiert",
    "editorialTeam": "MatchSignal Redaktion",
    "responsibleBetting": "Verantwortungsvolles Wetten",
    "responsibleLink": "Hinweise zum verantwortungsvollen Glücksspiel lesen →",
    "relatedGuides": "Verwandte Leitfäden",
    "exploreTitle": "MatchSignal Analysen entdecken",
    "exploreText": "Wende diese Konzepte bei der Prüfung aktueller Match-Signale, Marktdurchschnitte, Value Edges und Risikostufen an.",
    "viewAnalysis": "Aktuelle Match-Analysen ansehen",
    "categories": {
      "betting-fundamentals": "Wettgrundlagen",
      "odds-probability": "Quoten & Wahrscheinlichkeit",
      "value-analysis": "Value & Analyse",
      "bankroll-risk": "Bankroll & Risiko",
      "betting-psychology": "Wettpsychologie",
      "ai-data": "KI & Daten",
      "responsible-betting": "Verantwortungsvolles Wetten"
    }
  },
  "fr": {
    "educationLabel": "Formation MatchSignal",
    "pageTitle": "Guides de paris",
    "pageDescription": "Guides pédagogiques sur les cotes, les probabilités, la valeur attendue, la gestion de bankroll, la psychologie des paris, le jeu responsable et l’analyse sportive assistée par IA.",
    "pageIntro": "Des ressources claires et pratiques sur les cotes, les probabilités, la valeur attendue, le risque, la prise de décision et le rôle de l’IA dans l’analyse sportive.",
    "readGuide": "Lire le guide →",
    "minRead": "min de lecture",
    "home": "Accueil",
    "keyTakeaways": "Points clés",
    "updated": "Mis à jour",
    "editorialTeam": "Rédaction MatchSignal",
    "responsibleBetting": "Pari responsable",
    "responsibleLink": "Lire nos conseils sur le jeu responsable →",
    "relatedGuides": "Guides associés",
    "exploreTitle": "Explorer les analyses MatchSignal",
    "exploreText": "Appliquez ces concepts lorsque vous examinez les signaux de match, les moyennes du marché, les value edges et les niveaux de risque.",
    "viewAnalysis": "Voir les analyses de matchs actuelles",
    "categories": {
      "betting-fundamentals": "Fondamentaux des paris",
      "odds-probability": "Cotes & probabilités",
      "value-analysis": "Valeur & analyse",
      "bankroll-risk": "Bankroll & risque",
      "betting-psychology": "Psychologie des paris",
      "ai-data": "IA & données",
      "responsible-betting": "Pari responsable"
    }
  },
  "es": {
    "educationLabel": "Formación MatchSignal",
    "pageTitle": "Guías de apuestas",
    "pageDescription": "Guías educativas sobre cuotas, probabilidad, valor esperado, gestión de bankroll, psicología de las apuestas, juego responsable y análisis deportivo asistido por IA.",
    "pageIntro": "Recursos claros y prácticos sobre cuotas, probabilidad, valor esperado, riesgo, toma de decisiones y el papel de la IA en el análisis deportivo.",
    "readGuide": "Leer guía →",
    "minRead": "min de lectura",
    "home": "Inicio",
    "keyTakeaways": "Puntos clave",
    "updated": "Actualizado",
    "editorialTeam": "Equipo editorial de MatchSignal",
    "responsibleBetting": "Apuestas responsables",
    "responsibleLink": "Lee nuestra guía sobre juego responsable →",
    "relatedGuides": "Guías relacionadas",
    "exploreTitle": "Explora los análisis de MatchSignal",
    "exploreText": "Aplica estos conceptos al revisar señales de partidos, promedios de mercado, value edges y niveles de riesgo.",
    "viewAnalysis": "Ver análisis actuales de partidos",
    "categories": {
      "betting-fundamentals": "Fundamentos de apuestas",
      "odds-probability": "Cuotas y probabilidad",
      "value-analysis": "Valor y análisis",
      "bankroll-risk": "Bankroll y riesgo",
      "betting-psychology": "Psicología de las apuestas",
      "ai-data": "IA y datos",
      "responsible-betting": "Apuestas responsables"
    }
  },
  "it": {
    "educationLabel": "Formazione MatchSignal",
    "pageTitle": "Guide alle scommesse",
    "pageDescription": "Guide educative su quote, probabilità, valore atteso, gestione del bankroll, psicologia delle scommesse, gioco responsabile e analisi sportiva assistita dall’IA.",
    "pageIntro": "Risorse chiare e pratiche su quote, probabilità, valore atteso, rischio, processo decisionale e ruolo dell’IA nell’analisi sportiva.",
    "readGuide": "Leggi la guida →",
    "minRead": "min di lettura",
    "home": "Home",
    "keyTakeaways": "Punti chiave",
    "updated": "Aggiornato",
    "editorialTeam": "Redazione MatchSignal",
    "responsibleBetting": "Scommesse responsabili",
    "responsibleLink": "Leggi la nostra guida sul gioco responsabile →",
    "relatedGuides": "Guide correlate",
    "exploreTitle": "Esplora le analisi MatchSignal",
    "exploreText": "Applica questi concetti quando esamini segnali delle partite, medie di mercato, value edge e livelli di rischio.",
    "viewAnalysis": "Vedi le analisi attuali delle partite",
    "categories": {
      "betting-fundamentals": "Fondamenti delle scommesse",
      "odds-probability": "Quote e probabilità",
      "value-analysis": "Valore e analisi",
      "bankroll-risk": "Bankroll e rischio",
      "betting-psychology": "Psicologia delle scommesse",
      "ai-data": "IA e dati",
      "responsible-betting": "Scommesse responsabili"
    }
  },
  "pt": {
    "educationLabel": "Educação MatchSignal",
    "pageTitle": "Guias de apostas",
    "pageDescription": "Guias educativos sobre odds, probabilidade, valor esperado, gestão de banca, psicologia das apostas, apostas responsáveis e análise desportiva assistida por IA.",
    "pageIntro": "Recursos claros e práticos sobre odds, probabilidade, valor esperado, risco, tomada de decisão e o papel da IA na análise desportiva.",
    "readGuide": "Ler guia →",
    "minRead": "min de leitura",
    "home": "Início",
    "keyTakeaways": "Principais conclusões",
    "updated": "Atualizado",
    "editorialTeam": "Equipa editorial MatchSignal",
    "responsibleBetting": "Apostas responsáveis",
    "responsibleLink": "Leia as nossas orientações sobre jogo responsável →",
    "relatedGuides": "Guias relacionados",
    "exploreTitle": "Explore as análises MatchSignal",
    "exploreText": "Aplique estes conceitos ao analisar sinais de jogos, médias de mercado, value edges e níveis de risco.",
    "viewAnalysis": "Ver análises atuais dos jogos",
    "categories": {
      "betting-fundamentals": "Fundamentos das apostas",
      "odds-probability": "Odds e probabilidade",
      "value-analysis": "Valor e análise",
      "bankroll-risk": "Banca e risco",
      "betting-psychology": "Psicologia das apostas",
      "ai-data": "IA e dados",
      "responsible-betting": "Apostas responsáveis"
    }
  },
  "ar": {
    "educationLabel": "تعليم MatchSignal",
    "pageTitle": "أدلة المراهنات",
    "pageDescription": "أدلة تعليمية حول الاحتمالات والأسعار والقيمة المتوقعة وإدارة رأس المال وعلم نفس المراهنات والمراهنة المسؤولة والتحليل الرياضي المدعوم بالذكاء الاصطناعي.",
    "pageIntro": "موارد واضحة وعملية تشرح أسعار المراهنات والاحتمالات والقيمة المتوقعة والمخاطر واتخاذ القرار ودور الذكاء الاصطناعي في التحليل الرياضي.",
    "readGuide": "قراءة الدليل ←",
    "minRead": "دقيقة قراءة",
    "home": "الرئيسية",
    "keyTakeaways": "أهم النقاط",
    "updated": "تم التحديث",
    "editorialTeam": "فريق تحرير MatchSignal",
    "responsibleBetting": "المراهنة المسؤولة",
    "responsibleLink": "اقرأ إرشاداتنا حول المقامرة المسؤولة ←",
    "relatedGuides": "أدلة ذات صلة",
    "exploreTitle": "استكشف تحليلات MatchSignal",
    "exploreText": "طبّق هذه المفاهيم عند مراجعة إشارات المباريات ومتوسطات السوق وفروق القيمة ومستويات المخاطر.",
    "viewAnalysis": "عرض تحليلات المباريات الحالية",
    "categories": {
      "betting-fundamentals": "أساسيات المراهنات",
      "odds-probability": "الأسعار والاحتمالات",
      "value-analysis": "القيمة والتحليل",
      "bankroll-risk": "رأس المال والمخاطر",
      "betting-psychology": "علم نفس المراهنات",
      "ai-data": "الذكاء الاصطناعي والبيانات",
      "responsible-betting": "المراهنة المسؤولة"
    }
  },
  "zh": {
    "educationLabel": "MatchSignal 教育",
    "pageTitle": "投注指南",
    "pageDescription": "关于投注赔率、概率、期望值、资金管理、投注心理、负责任投注以及 AI 辅助体育分析的教育指南。",
    "pageIntro": "清晰实用的资源，讲解投注赔率、概率、期望值、风险、决策以及 AI 在体育分析中的作用。",
    "readGuide": "阅读指南 →",
    "minRead": "分钟阅读",
    "home": "首页",
    "keyTakeaways": "要点",
    "updated": "更新于",
    "editorialTeam": "MatchSignal 编辑团队",
    "responsibleBetting": "负责任投注",
    "responsibleLink": "阅读我们的负责任博彩指南 →",
    "relatedGuides": "相关指南",
    "exploreTitle": "探索 MatchSignal 分析",
    "exploreText": "在查看当前比赛信号、市场均值、价值优势和风险等级时应用这些概念。",
    "viewAnalysis": "查看当前比赛分析",
    "categories": {
      "betting-fundamentals": "投注基础",
      "odds-probability": "赔率与概率",
      "value-analysis": "价值与分析",
      "bankroll-risk": "资金与风险",
      "betting-psychology": "投注心理",
      "ai-data": "AI 与数据",
      "responsible-betting": "负责任投注"
    }
  },
  "ja": {
    "educationLabel": "MatchSignal 学習",
    "pageTitle": "ベッティングガイド",
    "pageDescription": "ベッティングオッズ、確率、期待値、資金管理、ベッティング心理、責任あるベッティング、AI支援スポーツ分析に関する教育ガイド。",
    "pageIntro": "オッズ、確率、期待値、リスク、意思決定、スポーツ分析におけるAIの役割をわかりやすく実践的に解説します。",
    "readGuide": "ガイドを読む →",
    "minRead": "分で読めます",
    "home": "ホーム",
    "keyTakeaways": "重要ポイント",
    "updated": "更新",
    "editorialTeam": "MatchSignal 編集チーム",
    "responsibleBetting": "責任あるベッティング",
    "responsibleLink": "責任あるギャンブルに関するガイドを読む →",
    "relatedGuides": "関連ガイド",
    "exploreTitle": "MatchSignal 分析を見る",
    "exploreText": "現在の試合シグナル、市場平均、Value Edge、リスクレベルを確認する際に、これらの概念を活用してください。",
    "viewAnalysis": "現在の試合分析を見る",
    "categories": {
      "betting-fundamentals": "ベッティングの基礎",
      "odds-probability": "オッズと確率",
      "value-analysis": "価値と分析",
      "bankroll-risk": "資金管理とリスク",
      "betting-psychology": "ベッティング心理",
      "ai-data": "AIとデータ",
      "responsible-betting": "責任あるベッティング"
    }
  },
  "hi": {
    "educationLabel": "MatchSignal शिक्षा",
    "pageTitle": "बेटिंग गाइड",
    "pageDescription": "बेटिंग ऑड्स, प्रायिकता, अपेक्षित मूल्य, बैंकरोल प्रबंधन, बेटिंग मनोविज्ञान, जिम्मेदार बेटिंग और AI-सहायित खेल विश्लेषण पर शैक्षिक गाइड।",
    "pageIntro": "बेटिंग ऑड्स, प्रायिकता, अपेक्षित मूल्य, जोखिम, निर्णय लेने और खेल विश्लेषण में AI की भूमिका को समझाने वाले स्पष्ट और व्यावहारिक संसाधन।",
    "readGuide": "गाइड पढ़ें →",
    "minRead": "मिनट पढ़ने का समय",
    "home": "होम",
    "keyTakeaways": "मुख्य बातें",
    "updated": "अपडेट किया गया",
    "editorialTeam": "MatchSignal संपादकीय टीम",
    "responsibleBetting": "जिम्मेदार बेटिंग",
    "responsibleLink": "जिम्मेदार जुए पर हमारी गाइड पढ़ें →",
    "relatedGuides": "संबंधित गाइड",
    "exploreTitle": "MatchSignal विश्लेषण देखें",
    "exploreText": "वर्तमान मैच सिग्नल, बाजार औसत, वैल्यू एज और जोखिम स्तर की समीक्षा करते समय इन अवधारणाओं का उपयोग करें।",
    "viewAnalysis": "वर्तमान मैच विश्लेषण देखें",
    "categories": {
      "betting-fundamentals": "बेटिंग की मूल बातें",
      "odds-probability": "ऑड्स और प्रायिकता",
      "value-analysis": "मूल्य और विश्लेषण",
      "bankroll-risk": "बैंकरोल और जोखिम",
      "betting-psychology": "बेटिंग मनोविज्ञान",
      "ai-data": "AI और डेटा",
      "responsible-betting": "जिम्मेदार बेटिंग"
    }
  }
};
