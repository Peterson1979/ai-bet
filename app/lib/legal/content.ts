import { LANGS, type Lang } from "@/app/lib/i18n";
import type {
  LegalDocument,
  LegalLocaleContent,
  LegalSection,
  LegalSlug,
  OperatorLabels,
} from "./types";
import { LOCALIZED_LEGAL_CONTENT } from "./localized";

const updated = "Last updated: 20 August 2026";

function doc(
  title: string,
  description: string,
  intro: string[],
  sections: LegalSection[],
  options: Pick<LegalDocument, "showOperator" | "showCookieSettings" | "updated"> = { updated }
): LegalDocument {
  return { title, description, intro, sections, ...options };
}

const en: LegalLocaleContent = {
  "privacy-policy": doc(
    "Privacy Policy",
    "How MatchSignal processes personal data, including contact messages, analytics, advertising and affiliate interactions.",
    ["This notice explains how MatchSignal processes personal data and how you can exercise your rights under the General Data Protection Regulation (GDPR). Forray Gyöngyi determines the purposes and means of the processing described here and is the data controller."],
    [
      { heading: "Data we process", bullets: ["Consent preference data stored in your browser, including the analytics choice and timestamp.", "Contact-form data: name, email address, message and anti-abuse fields; the server also uses the requesting IP address for short-lived rate limiting.", "With consent, GA4 device, browser, referral, page-view and usage data, plus coarse location derived by Google.", "Advertising and consent signals that Google may process when AdSense or a Google consent service is available.", "Affiliate-click event data sent to GA4 only with analytics consent: partner name, sport, market and placement; full tracking URLs and personal details are not sent in that event.", "Technical request, security and server-log data processed by the hosting infrastructure." ] },
      { heading: "Purposes and legal bases", table: { headers: ["Purpose", "Data", "Legal basis"], rows: [
        ["Remember privacy choices and provide the requested site", "Consent preference and necessary technical data", "Legitimate interests (GDPR Art. 6(1)(f)) in secure, usable operation; storage strictly necessary to honour a requested choice"],
        ["Answer contact requests", "Name, email, message", "Steps requested before a possible contract (Art. 6(1)(b)) where applicable; otherwise legitimate interests (Art. 6(1)(f)) in responding"],
        ["Prevent abuse and protect the service", "IP address, request and security data", "Legitimate interests (Art. 6(1)(f))"],
        ["Measure site use with GA4", "Analytics/device/browser/usage data", "Consent (Art. 6(1)(a))"],
        ["Deliver and measure Google advertising", "Advertising identifiers, device/browser data and consent signals", "Consent (Art. 6(1)(a)) where required; any contextual delivery must follow applicable law and available consent signals"],
        ["Measure affiliate referrals", "Referral parameters at the destination; consent-gated GA4 click event on MatchSignal", "Legitimate interests in commercial attribution at the destination, subject to third-party terms; consent for MatchSignal GA4 measurement"],
      ] } },
      { heading: "Strictly necessary browser storage", paragraphs: ["MatchSignal stores the key matchsignal_consent in localStorage so your analytics choice can be applied on later visits. This preference contains an analytics boolean, an advertising value fixed to false in the MatchSignal fallback, and a timestamp. It remains until you change it or clear site data. Language is taken from the URL and is not currently stored by MatchSignal."] },
      { heading: "Contact form", paragraphs: ["Submitting the contact form is optional. The form sends your name, email address and message through MatchSignal's Vercel-hosted endpoint to Resend for email delivery to the operator. An IP address is used in an in-memory one-minute rate-limit window. Do not include sensitive data that is unnecessary for your request."] },
      { heading: "Google Analytics 4", paragraphs: ["GA4 loads only after an available consent authority permits analytics. It may process page URLs, referral source, device/browser information, interaction events and coarse location. GA4 is not described as anonymous. Google Analytics does not log or store individual IP addresses; IP data may be used transiently to derive geolocation before being discarded under Google's regional processing documentation. This behavior is built into GA4 and is not presented as a MatchSignal-enabled privacy setting."] },
      { heading: "Google advertising and affiliate links", paragraphs: ["The AdSense script is included on the site and may process consent signals, device/browser data, advertising identifiers and cookies as permitted by applicable law and the available choices. Personalized Google advertising in the EEA, UK and Switzerland requires a Google-certified CMP integrated with the IAB Transparency and Consent Framework. Affiliate destination URLs contain referral parameters. A destination partner may set its own storage or receive normal request data when you follow a link; review that partner's notice before using its service."] },
      { heading: "Processors and recipients", bullets: ["Vercel, Inc.: hosting, delivery, security and server infrastructure.", "Resend, Inc.: delivery of contact-form email.", "Google: Google Analytics 4, AdSense and related consent services where available.", "Sportsbook or informational affiliate partners: only when you choose to follow their external link; their own privacy terms apply."], paragraphs: ["Groq and The Odds API support content-generation and bookmaker-market data workflows, but repository evidence does not show contact-form or identifiable visitor data being sent to them, so they are not listed here as processors of visitor personal data."] },
      { heading: "International transfers", paragraphs: ["Some providers may process data outside Hungary or the European Economic Area. Where GDPR transfer rules apply, transfers must rely on an applicable adequacy decision, Standard Contractual Clauses, or another lawful safeguard offered for the relevant processing. Provider documentation and terms contain the current transfer details."] },
      { heading: "Retention", bullets: ["Consent preference: until you change it or clear browser storage.", "Contact requests: for the time needed to answer and manage follow-up, normally no longer than 24 months, unless a longer period is necessary for a legal claim or statutory duty.", "Rate-limit record: approximately one minute in the active server instance.", "Hosting/security logs: according to Vercel's configured retention and what is necessary for security and incident handling.", "GA4 and advertising data: according to the retention controls and policies configured or applied by Google; MatchSignal reviews those criteria rather than promising a universal cookie lifetime." ] },
      { heading: "Security", paragraphs: ["MatchSignal uses access controls, transport security, input validation, rate limiting and managed hosting safeguards appropriate to the nature of the service. No internet transmission or storage system is completely secure."] },
      { heading: "Your rights", bullets: ["Information about processing and access to your personal data.", "Rectification of inaccurate data.", "Erasure and restriction where the legal conditions apply.", "Data portability for applicable consent- or contract-based automated processing.", "Objection to processing based on legitimate interests.", "Withdrawal of consent at any time, without affecting earlier lawful processing.", "A complaint to a competent supervisory authority."], paragraphs: ["To exercise a right, contact privacy@matchsignal.pro. Identity verification may be required where reasonably necessary."] },
      { heading: "Complaint to NAIH", paragraphs: ["You may complain to the Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9-11, Hungary; postal address: 1363 Budapest, Pf. 9.; email: ugyfelszolgalat@naih.hu. You may also contact the supervisory authority where you live or work."] },
      { heading: "Required data and automated decisions", paragraphs: ["Contact-form data is optional, but the required fields are needed if you want a reply through that channel. Refusing analytics or advertising consent does not prevent access to core content. MatchSignal's sports prediction system produces informational content about sporting events. It does not make decisions about an identifiable website visitor that produce legal or similarly significant effects within GDPR Article 22."] },
      { heading: "Contact", paragraphs: ["Privacy questions and rights requests: privacy@matchsignal.pro. General questions: contact@matchsignal.pro. Legal notices: legal@matchsignal.pro."] },
    ],
    { showOperator: true, updated }
  ),
  "cookie-policy": doc(
    "Cookie Policy",
    "The cookies and browser storage used by MatchSignal, GA4, AdSense and consent services.",
    ["This policy describes the storage technologies visible in the current MatchSignal codebase. Cookies are small files; localStorage is browser storage that can persist without a fixed expiry. Third-party identifiers can vary, so Google advertising examples below are deliberately non-exhaustive."],
    [
      { heading: "Storage and cookie inventory", table: { headers: ["Provider", "Category", "Identifier / example", "Party", "Purpose", "Duration / criterion", "Consent"], rows: [
        ["MatchSignal", "Necessary", "matchsignal_consent (localStorage)", "First party", "Stores analytics choice and timestamp; fallback advertising permission stays denied", "Until changed or browser data is cleared", "No; necessary to remember the requested choice"],
        ["Google Analytics 4", "Analytics", "_ga; _ga_<container-id>", "First-party cookies set for Google", "Distinguishes browser instances and maintains session/measurement state", "Commonly up to 2 years, subject to Google/configuration", "Yes"],
        ["Google AdSense / Google", "Advertising", "Examples may include __gads, __gpi, IDE, NID or other Google identifiers", "First or third party depending on identifier", "Ad delivery, frequency, fraud prevention, measurement and—only with valid consent where required—personalization", "Varies by identifier, account and Google policy", "Required where applicable; personalized ads require valid consent"],
        ["Google consent services / CMP", "Necessary or consent", "Consent strings and vendor-defined storage, including IAB TCF data where applicable", "First or third party", "Records and communicates privacy choices", "Varies by CMP and consent record", "Used to record or transmit the choice itself"],
      ] } },
      { heading: "What the code currently does", bullets: ["MatchSignal does not use sessionStorage or directly write document.cookie in the application source.", "GA4 is not loaded until analytics permission is available.", "The MatchSignal fallback consent panel controls analytics only and always keeps advertising storage denied.", "AdSense and Google consent hooks are present in the root layout; their runtime UI and vendor cookie set can vary by region, configuration and Google delivery." ] },
      { heading: "CMP and advertising consent", paragraphs: ["For users in the EEA, UK and Switzerland, personalized Google advertising requires a Google-certified CMP integrated with IAB TCF. MatchSignal's architecture listens for Google consent values where available and otherwise provides its own analytics-only fallback. This description does not claim that a Google dialog is currently displayed successfully on every visit. Advertising services must respect the consent signals and CMP choices that are available."] },
      { heading: "Your controls", paragraphs: ["Use Cookie Settings below to reopen the active consent control. You may also clear or block browser storage in your browser. Blocking non-essential storage may reduce measurement or advertising functionality but should not prevent access to core informational content."] },
      { heading: "Updates and contact", paragraphs: ["Google may change cookie names and lifetimes, so this inventory is not an exhaustive list of every Google advertising identifier. We update this policy when the implementation materially changes. Questions: privacy@matchsignal.pro."] },
    ],
    { showOperator: true, showCookieSettings: true, updated }
  ),
  "terms-of-use": doc("Terms of Use", "Conditions for using MatchSignal's informational sports analysis, tools and third-party links.", ["By accessing MatchSignal you agree to these terms. If you do not agree, do not use the service."], [
    { heading: "Informational service only", paragraphs: ["MatchSignal provides educational and informational sports analysis, probability estimates, calculators and market comparisons. It is not a sportsbook, gambling operator, payment provider, tip-selling service, financial adviser or intermediary, and it does not accept bets or hold customer funds."] },
    { heading: "Eligibility and local law", paragraphs: ["You may use betting-related content only if you are an adult of the legal gambling age and betting is lawful for you. You are responsible for your jurisdiction, operator eligibility, account terms and any tax or reporting duties."] },
    { heading: "No warranties", paragraphs: ["Sports outcomes are uncertain. Odds, promotions, markets and availability can change or be withdrawn. MatchSignal does not warrant freshness, completeness, availability, uninterrupted service, accuracy, profitability or any outcome. Verify the exact market, selection, price and settlement rules with the operator before acting."] },
    { heading: "Third-party services and links", paragraphs: ["External sites are controlled by their operators. Their licensing, eligibility, payments, withdrawals, settlement, privacy and promotional terms apply. A link is not a guarantee or endorsement of every aspect of that service."] },
    { heading: "Intellectual property and acceptable use", paragraphs: ["MatchSignal's site design, original copy, branding and compiled presentation are protected by applicable intellectual-property law. You may use the site personally and lawfully, but may not scrape, republish, interfere with, reverse engineer or misuse the service except where law expressly permits."] },
    { heading: "Liability, changes and contact", paragraphs: ["To the maximum extent permitted by law, the operator is not liable for betting losses, lost profits, indirect or consequential loss, reliance on stale odds, third-party conduct or service interruption. Nothing excludes liability that cannot lawfully be excluded, including liability for intentional misconduct or mandatory consumer rights. Features and these terms may change for legal, technical or operational reasons; material revisions are dated and apply prospectively. Legal: legal@matchsignal.pro. General: contact@matchsignal.pro."] },
  ], { showOperator: true, updated }),
  "affiliate-disclosure": doc("Affiliate Disclosure", "How MatchSignal affiliate links, commissions and commercial ordering work.", ["Some MatchSignal links are sponsored affiliate links. If you follow one and complete a qualifying action, MatchSignal may receive a commission or other referral compensation."], [
    { heading: "How compensation works", paragraphs: ["The commercial terms vary by partner and action. A commission normally does not add a separate MatchSignal fee to the transaction, but the partner's prices, eligibility rules and terms still apply."] },
    { heading: "Relationship to predictions", paragraphs: ["Affiliate relationships do not control code-generated market candidates, candidate market math, bookmaker-consensus anchoring or prediction calculations. An affiliate call to action on a match card is shown only when that same validated market and selection is available from the partner."] },
    { heading: "Commercial presentation", paragraphs: ["Partner inclusion and display order may be commercially configured. MatchSignal therefore does not claim that directory order is a complete independent quality ranking. Neutral labels such as Featured Partner identify commercial presentation, not an empirical rating."] },
    { heading: "Third-party responsibility", paragraphs: ["Partner terms, age rules, account eligibility, geographic restrictions, promotion conditions and local law apply. Verify the operator and current offer independently before registering, depositing or betting."] },
    { heading: "Hungarian locale and contact", paragraphs: ["Sportsbook affiliate links are suppressed on the /hu locale. This is a locale-based rule, not IP-based. Informational services such as BetQL may remain available where currently configured. Commercial and legal questions: legal@matchsignal.pro."] },
  ], { showOperator: true, updated }),
  "responsible-gambling": doc("Responsible Gambling", "Risk-aware betting guidance and routes to independent support.", ["MatchSignal is an informational platform, not a sportsbook, helpline or treatment provider. Gambling involves financial and personal risk and should never be treated as income or an investment."], [
    { heading: "Safer principles", bullets: ["Bet only if you meet the legal age and eligibility rules where you live.", "Set affordable deposit, stake, loss and time limits before gambling.", "Never chase losses, borrow to bet, or use money needed for essentials.", "Take breaks and avoid gambling while distressed, impaired or under pressure.", "No model, positive-EV estimate or low-risk label makes a bet safe or guaranteed."] },
    { heading: "Operator controls", paragraphs: ["Where available, use deposit, wager, loss and time limits, reality checks, cooling-off periods and self-exclusion. Ask the gambling operator directly which controls apply to your account and jurisdiction."] },
    { heading: "Independent support", paragraphs: ["If gambling is causing harm, stop and seek qualified local help. International directories such as Gambling Therapy, GamCare and Gamblers Anonymous may help you find support, but no named organization is guaranteed to operate or be appropriate in every jurisdiction. Emergency or crisis situations should be directed to local emergency services."] },
    { heading: "Contact", paragraphs: ["MatchSignal can address site-content concerns at support@matchsignal.pro but cannot provide clinical, debt or crisis treatment."] },
  ], { showOperator: true, updated }),
  "ai-disclaimer": doc("AI Disclaimer", "How MatchSignal's constrained AI-assisted prediction selection works and where uncertainty remains.", ["MatchSignal uses a constrained hybrid pipeline. Its outputs are probabilistic informational content, not guaranteed predictions or personal advice."], [
    { heading: "Validated candidates first", paragraphs: ["Code constructs valid market candidates from real bookmaker-market data. A production candidate requires adequate evidence: bookmakerCount must be at least 3. Market, selection, displayed odds and bookmaker depth originate from the same validated candidate."] },
    { heading: "Constrained AI role", paragraphs: ["AI cannot freely invent a market or prediction. It must select a candidateId from the code-generated list. Its probability assessment is anchored to bookmaker-market consensus; any analytical adjustment is deliberately bounded, so AI cannot independently manufacture a large positive estimated-value edge."] },
    { heading: "Production eligibility", paragraphs: ["A production pick must retain positive estimated value (estimatedValuePct greater than 0) after the validated market anchor, bounded adjustment and available partner price are combined. These eligibility rules reduce unsupported output but do not prove that the estimate is correct."] },
    { heading: "Limitations", paragraphs: ["AI contextual reasoning may still be incomplete, misleading or wrong. Bookmaker data can be delayed, markets can move, and unexpected sporting events create variance. Always verify the live market and use independent judgment."] },
    { heading: "No visitor decision-making and contact", paragraphs: ["The system analyzes sporting events. It does not make a legal or similarly significant decision about an identifiable visitor within GDPR Article 22. Technical or legal questions: legal@matchsignal.pro."] },
  ], { showOperator: true, updated }),
  "earnings-disclaimer": doc("Earnings Disclaimer", "Financial-risk disclaimer for probabilities, positive expected value and betting outcomes.", ["MatchSignal promises no profit, income, return on investment or winning result. Betting can result in loss of the entire stake."], [
    { heading: "No future guarantee", paragraphs: ["Historical outcomes, examples, model outputs and earlier selections do not predict future performance. Even a well-reasoned estimate can lose."] },
    { heading: "Estimated value is theoretical", paragraphs: ["Positive estimated value describes a theoretical relationship between an uncertain probability estimate and an available price. It is not cash, a guaranteed edge or a promise of long-run profit. Probability error, model limitations and bookmaker margin can reverse the apparent value."] },
    { heading: "Odds and variance", paragraphs: ["Odds and market availability change. Short-term and long-term results can diverge because of variance, correlated outcomes, execution limits and model error. Verify the live price before any decision."] },
    { heading: "Your responsibility", paragraphs: ["Nothing on MatchSignal is financial, investment, legal or professional gambling advice. Decide independently, use only affordable stakes and accept that the whole stake may be lost."] },
  ], { showOperator: true, updated }),
  "legal-notice": doc("Legal Notice", "Operator, registry, contact and hosting information for MatchSignal.", ["Website: MatchSignal · https://www.matchsignal.pro. MatchSignal is an informational sports-analysis website and is not a sportsbook, gambling operator or payment provider."], [
    { heading: "Operator and responsibility", paragraphs: ["Forray Gyöngyi is both the website maintainer / technical operator and the commercial / affiliate activity operator. She is the data controller where MatchSignal determines the purposes and means of personal-data processing."] },
    { heading: "Registry", paragraphs: ["The relevant registry system is the Hungarian Individual Entrepreneurs Registry, operated by the Hungarian National Tax and Customs Administration (NAV). No chamber number or telephone number is stated because none has been supplied or verified."] },
    { heading: "Hosting", paragraphs: ["The verified deployment stack uses Vercel, Inc. for website hosting and delivery infrastructure."] },
    { heading: "Contacts", bullets: ["General: contact@matchsignal.pro", "Legal and formal notices: legal@matchsignal.pro", "Privacy and data rights: privacy@matchsignal.pro"] },
  ], { showOperator: true, updated }),
};

const operatorLabels: Record<Lang, OperatorLabels> = {
  en: { heading: "Operator information", name: "Name", status: "Legal status", statusValue: "Sole proprietor / individual entrepreneur", address: "Address", tax: "Hungarian Tax Number", registration: "Sole Proprietor Registration Number", registry: "Registry", registryValue: "Hungarian National Tax and Customs Administration (NAV) / Hungarian Individual Entrepreneurs Registry", roles: "Roles", rolesValue: "Website maintainer and technical operator; commercial and affiliate activity operator; data controller where MatchSignal determines processing purposes", contact: "Contact" },
  hu: { heading: "Üzemeltetői adatok", name: "Név", status: "Jogi forma", statusValue: "Egyéni vállalkozó", address: "Cím", tax: "Magyar adószám", registration: "Egyéni vállalkozói nyilvántartási szám", registry: "Nyilvántartás", registryValue: "Nemzeti Adó- és Vámhivatal (NAV) / Egyéni Vállalkozók Nyilvántartása", roles: "Szerepkörök", rolesValue: "Weboldal-karbantartó és technikai üzemeltető; kereskedelmi és affiliate tevékenység üzemeltetője; adatkezelő, amikor a MatchSignal határozza meg az adatkezelés céljait", contact: "Kapcsolat" },
  de: { heading: "Angaben zum Betreiber", name: "Name", status: "Rechtsform", statusValue: "Einzelunternehmerin", address: "Anschrift", tax: "Ungarische Steuernummer", registration: "Registrierungsnummer der Einzelunternehmerin", registry: "Register", registryValue: "Ungarische Nationale Steuer- und Zollverwaltung (NAV) / Register der Einzelunternehmer", roles: "Funktionen", rolesValue: "Website-Betreiberin und technische Verantwortliche; Betreiberin der kommerziellen und Affiliate-Tätigkeit; Verantwortliche, soweit MatchSignal Verarbeitungszwecke bestimmt", contact: "Kontakt" },
  fr: { heading: "Informations sur l'exploitante", name: "Nom", status: "Statut juridique", statusValue: "Entrepreneuse individuelle", address: "Adresse", tax: "Numéro fiscal hongrois", registration: "Numéro d'immatriculation d'entrepreneuse individuelle", registry: "Registre", registryValue: "Administration nationale hongroise des impôts et des douanes (NAV) / Registre des entrepreneurs individuels", roles: "Rôles", rolesValue: "Maintenance et exploitation technique du site; exploitation commerciale et d'affiliation; responsable du traitement lorsque MatchSignal en détermine les finalités", contact: "Contact" },
  es: { heading: "Información de la operadora", name: "Nombre", status: "Forma jurídica", statusValue: "Empresaria individual", address: "Dirección", tax: "Número fiscal húngaro", registration: "Número de registro de empresaria individual", registry: "Registro", registryValue: "Administración Nacional de Impuestos y Aduanas de Hungría (NAV) / Registro de Empresarios Individuales", roles: "Funciones", rolesValue: "Mantenimiento y operación técnica del sitio; operación comercial y de afiliación; responsable cuando MatchSignal determina los fines del tratamiento", contact: "Contacto" },
  it: { heading: "Informazioni sulla titolare", name: "Nome", status: "Forma giuridica", statusValue: "Imprenditrice individuale", address: "Indirizzo", tax: "Numero fiscale ungherese", registration: "Numero di registrazione dell'impresa individuale", registry: "Registro", registryValue: "Amministrazione nazionale fiscale e doganale ungherese (NAV) / Registro degli imprenditori individuali", roles: "Ruoli", rolesValue: "Manutenzione e gestione tecnica del sito; gestione commerciale e di affiliazione; titolare del trattamento quando MatchSignal ne determina le finalità", contact: "Contatti" },
  pt: { heading: "Informações da operadora", name: "Nome", status: "Forma jurídica", statusValue: "Empresária em nome individual", address: "Morada", tax: "Número fiscal húngaro", registration: "Número de registo de empresária individual", registry: "Registo", registryValue: "Administração Nacional Tributária e Aduaneira da Hungria (NAV) / Registo de Empresários Individuais", roles: "Funções", rolesValue: "Manutenção e operação técnica do site; operação comercial e de afiliação; responsável pelo tratamento quando o MatchSignal determina as finalidades", contact: "Contacto" },
  ar: { heading: "معلومات المشغّلة", name: "الاسم", status: "الصفة القانونية", statusValue: "رائدة أعمال فردية", address: "العنوان", tax: "الرقم الضريبي المجري", registration: "رقم تسجيل رائد الأعمال الفردي", registry: "السجل", registryValue: "الإدارة الوطنية المجرية للضرائب والجمارك (NAV) / سجل رواد الأعمال الأفراد", roles: "الأدوار", rolesValue: "صيانة الموقع وتشغيله التقني؛ تشغيل النشاط التجاري ونشاط الإحالة؛ المتحكمة بالبيانات عندما تحدد MatchSignal أغراض المعالجة", contact: "الاتصال" },
  zh: { heading: "运营者信息", name: "姓名", status: "法律身份", statusValue: "个体经营者", address: "地址", tax: "匈牙利税号", registration: "个体经营者注册号", registry: "登记系统", registryValue: "匈牙利国家税务和海关管理局（NAV）/ 个体经营者登记册", roles: "职责", rolesValue: "网站维护和技术运营；商业及联盟活动运营；在 MatchSignal 决定处理目的时担任数据控制者", contact: "联系方式" },
  ja: { heading: "運営者情報", name: "氏名", status: "法的地位", statusValue: "個人事業主", address: "住所", tax: "ハンガリー納税者番号", registration: "個人事業主登録番号", registry: "登録制度", registryValue: "ハンガリー国税関税庁（NAV）/ 個人事業主登録簿", roles: "役割", rolesValue: "ウェブサイトの保守・技術運営、商業・アフィリエイト活動の運営、MatchSignal が処理目的を決定する場合のデータ管理者", contact: "連絡先" },
  hi: { heading: "संचालक की जानकारी", name: "नाम", status: "कानूनी स्थिति", statusValue: "एकल स्वामी / व्यक्तिगत उद्यमी", address: "पता", tax: "हंगरी कर संख्या", registration: "एकल स्वामी पंजीकरण संख्या", registry: "रजिस्ट्री", registryValue: "हंगरी राष्ट्रीय कर एवं सीमा शुल्क प्रशासन (NAV) / व्यक्तिगत उद्यमी रजिस्ट्री", roles: "भूमिकाएँ", rolesValue: "वेबसाइट रखरखाव और तकनीकी संचालन; वाणिज्यिक व एफिलिएट गतिविधि संचालन; जहाँ MatchSignal प्रसंस्करण उद्देश्य तय करता है वहाँ डेटा नियंत्रक", contact: "संपर्क" },
};

const cookieSettingsLabel: Record<Lang, string> = {
  en: "Manage Cookie Preferences", hu: "Sütibeállítások kezelése", de: "Cookie-Einstellungen verwalten", fr: "Gérer les préférences de cookies", es: "Gestionar preferencias de cookies", it: "Gestisci preferenze cookie", pt: "Gerir preferências de cookies", ar: "إدارة تفضيلات ملفات الارتباط", zh: "管理 Cookie 偏好", ja: "Cookie 設定を管理", hi: "कुकी प्राथमिकताएँ प्रबंधित करें",
};

const localizedDocuments: Record<Lang, LegalLocaleContent> = {
  en,
  hu: LOCALIZED_LEGAL_CONTENT.hu!,
  de: LOCALIZED_LEGAL_CONTENT.de!,
  fr: LOCALIZED_LEGAL_CONTENT.fr!,
  es: LOCALIZED_LEGAL_CONTENT.es!,
  it: LOCALIZED_LEGAL_CONTENT.it!,
  pt: LOCALIZED_LEGAL_CONTENT.pt!,
  ar: LOCALIZED_LEGAL_CONTENT.ar!,
  zh: LOCALIZED_LEGAL_CONTENT.zh!,
  ja: LOCALIZED_LEGAL_CONTENT.ja!,
  hi: LOCALIZED_LEGAL_CONTENT.hi!,
};

export function getLegalDocument(lang: Lang, slug: LegalSlug): LegalDocument {
  return localizedDocuments[lang][slug];
}

export function getOperatorLabels(lang: Lang): OperatorLabels {
  return operatorLabels[lang];
}

export function getCookieSettingsLabel(lang: Lang): string {
  return cookieSettingsLabel[lang];
}

export function hasCompleteLegalContent(lang: Lang): boolean {
  return Object.keys(localizedDocuments[lang]).length === 8;
}

export function getLegalContentLocales(): readonly Lang[] {
  return LANGS.filter(hasCompleteLegalContent);
}
