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
