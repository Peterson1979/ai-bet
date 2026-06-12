import type { Translation } from "./types";
import { deepMerge } from "./deepMerge";
import en from "./en";
import hu from "./hu";

// ÚJ TÍPUS: Rekurzívan opcionálissá teszi az objektum összes tulajdonságát
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export const LANGS = [
  "en", "hu", "de", "fr", "es", "it", "pt", "ar", "zh", "ja", "hi",
] as const;

export type Lang = (typeof LANGS)[number];

const de: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL",
  heroSubtitle: "KI-gestützte Wettanalysen",
  heroDesc: "KI-generierte Vorhersagen für mehrere Sportarten.",
  heroImageAlt: "KI Wettvorhersagen Hero Hintergrund",
  topPicks: "Top Tipps",
  premiumOffers: "Premium Wettangebote",
  premiumOffersDesc: "Platziere hier deine Affiliate-Banner und Sportsbook-Angebote.",
  recommendedSites: "Empfohlene Wettanbieter",
  recommendedSitesDesc: "Empfohlene Wettanbieter und Affiliate-Angebote.",
  noMatches: "Keine Spiele verfügbar",
  tbd: "Noch nicht bekannt",
  noExplanation: "Keine Erklärung verfügbar",
  aiTips: "KI TIPPS",
  odds: "Quote", confidence: "Vertrauen", edge: "Vorteil", risk: "Risiko",
  ev: "Erwartungswert (EV)",
  valueBet: "🟢 VALUE BET", okBet: "🟡 OK WETTE", riskyBet: "🔴 RISKANT",
  positiveEV: "Positives Erwartungswert-Signal", negativeEV: "Negatives Erwartungswert-Signal",
  showExplanation: "Erklärung anzeigen ▼", hideExplanation: "Erklärung ausblenden ▲",
  viewOdds: "Quoten ansehen",
  seoTitle: "KI Wettvorhersagen",
  seoDescription: "KI-generierte Wettvorhersagen und Value Bets für mehrere Sportarten.",
  sports: { topPicks: "Top Tipps", football: "Fußball", nba: "NBA", nfl: "NFL", hockey: "Eishockey", tennis: "Tennis", mlb: "Baseball", mma: "MMA" },
  system: { navHome: "Startseite", navTopPicks: "Top Tipps", navBetting: "Wetten", navNews: "Neuigkeiten", navTools: "Tools", navGlossary: "Glossar" },
  footer: {
    betIntelligence: "Wettintelligenz-System", betIntelligenceDesc: "Die KI bewertet jeden Tipp anhand von Vertrauen, Erwartungswert und Marktrisikoignal.",
    valueBet: "VALUE BET", valueBetDesc: "Starker positiver Erwartungswert laut KI-Modell.",
    okBet: "OK WETTE", okBetDesc: "Akzeptable Wettmöglichkeit mit moderatem Wert.",
    riskyBet: "RISKANT", riskyBetDesc: "Höhere Unsicherheit oder geringerer erwarteter Wettwert.",
    aiEvScore: "KI EV SCORE", aiEvScoreDesc: "KI-berechneter Erwartungswert zur Rangfolge von Wettmöglichkeiten.",
    aiEdge: "KI Vorteil", aiEdgeDesc: "Differenz zwischen implizierter Buchmacherwahrscheinlichkeit und KI-Schätzung.",
    confidence: "Vertrauen", confidenceDesc: "KI-Vertrauenswert von 0–100 basierend auf statistischen Signalen.",
    impliedProb: "Implizierte Wahrscheinlichkeit", impliedProbDesc: "Aus den Buchmacherquoten abgeleitete Wahrscheinlichkeit.",
    risk: "Risiko", riskDesc: "Volatilitäts- und Unsicherheitsniveau der Vorhersagen.",
    aiBettingInsights: "KI Wettanalysen", aiBettingInsightsDesc: "Diese Plattform bietet KI-generierte Sportwettanalysen nur zu Informationszwecken. Keine Gewinngarantie. Bitte verantwortungsvoll spielen.",
    navAbout: "Über uns", navContact: "Kontakt", navPrivacy: "Datenschutz", navTerms: "Nutzungsbedingungen",
    navAffiliate: "Affiliate-Offenlegung", navResponsible: "Verantwortungsvolles Spielen", navCookie: "Cookie-Richtlinie",
    platformName: "MatchSignal", builtWithAi: "Mit KI erstellt",
  },
};

const fr: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL",
  heroSubtitle: "Analyses de paris alimentées par IA",
  heroDesc: "Prédictions générées par IA pour plusieurs sports.",
  heroImageAlt: "Fond hero des prédictions de paris IA",
  topPicks: "Meilleurs choix", premiumOffers: "Offres de paris premium",
  premiumOffersDesc: "Placez vos bannières affiliées et promotions de bookmakers ici.",
  recommendedSites: "Bookmakers recommandés", recommendedSitesDesc: "Bookmakers recommandés et offres affiliées.",
  noMatches: "Aucun match disponible", tbd: "À déterminer", noExplanation: "Aucune explication disponible",
  aiTips: "CONSEILS IA", odds: "Cotes", confidence: "Confiance", edge: "Avantage", risk: "Risque",
  ev: "Valeur attendue (EV)", valueBet: "🟢 VALUE BET", okBet: "🟡 PARI OK", riskyBet: "🔴 RISQUÉ",
  positiveEV: "Signal de valeur attendue positive", negativeEV: "Signal de valeur attendue négative",
  showExplanation: "Afficher l'explication ▼", hideExplanation: "Masquer l'explication ▲", viewOdds: "Voir les cotes",
  seoTitle: "Prédictions de paris IA", seoDescription: "Prédictions de paris et value bets générés par IA pour plusieurs sports.",
  sports: { topPicks: "Meilleurs choix", football: "Football", nba: "NBA", nfl: "NFL", hockey: "Hockey sur glace", tennis: "Tennis", mlb: "Baseball", mma: "MMA" },
  system: { navHome: "Accueil", navTopPicks: "Meilleurs choix", navBetting: "Paris", navNews: "Actualités", navTools: "Outils", navGlossary: "Glossaire" },
  footer: {
    betIntelligence: "Système d'intelligence de paris", betIntelligenceDesc: "L'IA évalue chaque sélection en utilisant la confiance, la valeur attendue et les signaux de risque de marché.",
    valueBet: "VALUE BET", valueBetDesc: "Forte valeur attendue positive selon le modèle IA.",
    okBet: "PARI OK", okBetDesc: "Opportunité de pari acceptable avec une valeur modérée.",
    riskyBet: "RISQUÉ", riskyBetDesc: "Incertitude plus élevée ou valeur de pari attendue plus faible.",
    aiEvScore: "SCORE EV IA", aiEvScoreDesc: "Score de valeur attendue calculé par IA.",
    aiEdge: "Avantage IA", aiEdgeDesc: "Différence entre la probabilité implicite du bookmaker et la probabilité estimée par l'IA.",
    confidence: "Confiance", confidenceDesc: "Score de confiance IA de 0 à 100 basé sur des signaux statistiques.",
    impliedProb: "Probabilité implicite", impliedProbDesc: "Probabilité dérivée des cotes du bookmaker.",
    risk: "Risque", riskDesc: "Niveau de volatilité et d'incertitude des prédictions.",
    aiBettingInsights: "Analyses de paris IA", aiBettingInsightsDesc: "Cette plateforme fournit des analyses de paris sportifs générées par IA à des fins d'information uniquement. Jouez responsablement.",
    navAbout: "À propos", navContact: "Contact", navPrivacy: "Politique de confidentialité", navTerms: "Conditions d'utilisation",
    navAffiliate: "Divulgation d'affiliation", navResponsible: "Jeu responsable", navCookie: "Politique de cookies",
    platformName: "MatchSignal", builtWithAi: "Construit avec l'IA",
  },
};

const es: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL", heroSubtitle: "Análisis de apuestas con IA",
  heroDesc: "Predicciones generadas por IA para múltiples deportes.",
  heroImageAlt: "Fondo hero de predicciones de apuestas IA",
  topPicks: "Mejores picks", premiumOffers: "Ofertas premium de apuestas",
  premiumOffersDesc: "Coloca aquí tus banners de afiliados y promociones de casas de apuestas.",
  recommendedSites: "Casas de apuestas recomendadas", recommendedSitesDesc: "Casas de apuestas recomendadas y ofertas de afiliados.",
  noMatches: "No hay partidos disponibles", tbd: "Por determinar", noExplanation: "No hay explicación disponible",
  aiTips: "CONSEJOS IA", odds: "Cuotas", confidence: "Confianza", edge: "Ventaja", risk: "Riesgo",
  ev: "Valor esperado (EV)", valueBet: "🟢 VALUE BET", okBet: "🟡 APUESTA OK", riskyBet: "🔴 ARRIESGADO",
  positiveEV: "Señal de valor esperado positivo", negativeEV: "Señal de valor esperado negativo",
  showExplanation: "Mostrar explicación ▼", hideExplanation: "Ocultar explicación ▲", viewOdds: "Ver cuotas",
  seoTitle: "Predicciones de apuestas IA", seoDescription: "Predicciones de apuestas y value bets generados por IA para múltiples deportes.",
  sports: { topPicks: "Mejores picks", football: "Fútbol", nba: "NBA", nfl: "NFL", hockey: "Hockey sobre hielo", tennis: "Tenis", mlb: "Béisbol", mma: "MMA" },
  system: { navHome: "Inicio", navTopPicks: "Mejores picks", navBetting: "Apuestas", navNews: "Noticias", navTools: "Herramientas", navGlossary: "Glosario" },
  footer: {
    betIntelligence: "Sistema de inteligencia de apuestas", betIntelligenceDesc: "La IA evalúa cada selección usando confianza, valor esperado y señales de riesgo de mercado.",
    valueBet: "VALUE BET", valueBetDesc: "Fuerte valor esperado positivo según el modelo de IA.",
    okBet: "APUESTA OK", okBetDesc: "Oportunidad de apuesta aceptable con valor moderado.",
    riskyBet: "ARRIESGADO", riskyBetDesc: "Mayor incertidumbre o menor valor esperado de apuesta.",
    aiEvScore: "PUNTUACIÓN EV IA", aiEvScoreDesc: "Puntuación de valor esperado calculada por IA.",
    aiEdge: "Ventaja IA", aiEdgeDesc: "Diferencia entre la probabilidad implícita del bookmaker y la estimada por la IA.",
    confidence: "Confianza", confidenceDesc: "Puntuación de confianza IA de 0 a 100 basada en señales estadísticas.",
    impliedProb: "Probabilidad implícita", impliedProbDesc: "Probabilidad derivada de las cuotas del bookmaker.",
    risk: "Riesgo", riskDesc: "Nivel de volatilidad e incertidumbre de las predicciones.",
    aiBettingInsights: "Análisis de apuestas IA", aiBettingInsightsDesc: "Esta plataforma proporciona análisis de apuestas deportivas generados por IA solo con fines informativos. Juega responsablemente.",
    navAbout: "Acerca de", navContact: "Contacto", navPrivacy: "Política de privacidad", navTerms: "Términos de uso",
    navAffiliate: "Divulgación de afiliados", navResponsible: "Juego responsable", navCookie: "Política de cookies",
    platformName: "MatchSignal", builtWithAi: "Construido con IA",
  },
};

const it: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL", heroSubtitle: "Analisi scommesse con IA",
  heroDesc: "Previsioni generate dall'IA per più sport.",
  heroImageAlt: "Sfondo hero previsioni scommesse IA",
  topPicks: "Le migliori scelte", premiumOffers: "Offerte premium scommesse",
  premiumOffersDesc: "Inserisci qui i tuoi banner affiliati e promozioni dei bookmaker.",
  recommendedSites: "Bookmaker consigliati", recommendedSitesDesc: "Bookmaker consigliati e offerte affiliati.",
  noMatches: "Nessuna partita disponibile", tbd: "Da definire", noExplanation: "Nessuna spiegazione disponibile",
  aiTips: "CONSIGLI IA", odds: "Quote", confidence: "Fiducia", edge: "Vantaggio", risk: "Rischio",
  ev: "Valore atteso (EV)", valueBet: "🟢 VALUE BET", okBet: "🟡 SCOMMESSA OK", riskyBet: "🔴 RISCHIOSO",
  positiveEV: "Segnale di valore atteso positivo", negativeEV: "Segnale di valore atteso negativo",
  showExplanation: "Mostra spiegazione ▼", hideExplanation: "Nascondi spiegazione ▲", viewOdds: "Vedi quote",
  seoTitle: "Previsioni scommesse IA", seoDescription: "Previsioni scommesse e value bet generate dall'IA per più sport.",
  sports: { topPicks: "Le migliori scelte", football: "Calcio", nba: "NBA", nfl: "NFL", hockey: "Hockey su ghiaccio", tennis: "Tennis", mlb: "Baseball", mma: "MMA" },
  system: { navHome: "Home", navTopPicks: "Le migliori scelte", navBetting: "Scommesse", navNews: "Notizie", navTools: "Strumenti", navGlossary: "Glossario" },
  footer: {
    betIntelligence: "Sistema di intelligenza scommesse", betIntelligenceDesc: "L'IA valuta ogni selezione usando fiducia, valore atteso e segnali di rischio di mercato.",
    valueBet: "VALUE BET", valueBetDesc: "Forte valore atteso positivo secondo il modello IA.",
    okBet: "SCOMMESSA OK", okBetDesc: "Opportunità di scommessa accettabile con valore moderato.",
    riskyBet: "RISCHIOSO", riskyBetDesc: "Maggiore incertezza o valore di scommessa atteso inferiore.",
    aiEvScore: "PUNTEGGIO EV IA", aiEvScoreDesc: "Punteggio di valore atteso calcolato dall'IA.",
    aiEdge: "Vantaggio IA", aiEdgeDesc: "Differenza tra la probabilità implicita del bookmaker e quella stimata dall'IA.",
    confidence: "Fiducia", confidenceDesc: "Punteggio di fiducia IA da 0 a 100 basato su segnali statistici.",
    impliedProb: "Probabilità implicita", impliedProbDesc: "Probabilità derivata dalle quote del bookmaker.",
    risk: "Rischio", riskDesc: "Livello di volatilità e incertezza delle previsioni.",
    aiBettingInsights: "Analisi scommesse IA", aiBettingInsightsDesc: "Questa piattaforma fornisce analisi di scommesse sportive generate dall'IA solo a scopo informativo. Gioca responsabilmente.",
    navAbout: "Chi siamo", navContact: "Contatto", navPrivacy: "Informativa sulla privacy", navTerms: "Termini di utilizzo",
    navAffiliate: "Divulgazione affiliati", navResponsible: "Gioco responsabile", navCookie: "Politica sui cookie",
    platformName: "MatchSignal", builtWithAi: "Costruito con IA",
  },
};

const pt: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL", heroSubtitle: "Análises de apostas com IA",
  heroDesc: "Previsões geradas por IA para vários desportos.",
  heroImageAlt: "Fundo hero de previsões de apostas IA",
  topPicks: "Melhores escolhas", premiumOffers: "Ofertas premium de apostas",
  premiumOffersDesc: "Coloque aqui os seus banners de afiliados e promoções de casas de apostas.",
  recommendedSites: "Casas de apostas recomendadas", recommendedSitesDesc: "Casas de apostas recomendadas e ofertas de afiliados.",
  noMatches: "Sem jogos disponíveis", tbd: "A definir", noExplanation: "Sem explicação disponível",
  aiTips: "DICAS IA", odds: "Odds", confidence: "Confiança", edge: "Vantagem", risk: "Risco",
  ev: "Valor esperado (EV)", valueBet: "🟢 VALUE BET", okBet: "🟡 APOSTA OK", riskyBet: "🔴 ARRISCADO",
  positiveEV: "Sinal de valor esperado positivo", negativeEV: "Sinal de valor esperado negativo",
  showExplanation: "Mostrar explicação ▼", hideExplanation: "Ocultar explicação ▲", viewOdds: "Ver odds",
  seoTitle: "Previsões de apostas IA", seoDescription: "Previsões de apostas e value bets gerados por IA para vários desportos.",
  sports: { topPicks: "Melhores escolhas", football: "Futebol", nba: "NBA", nfl: "NFL", hockey: "Hóquei no gelo", tennis: "Ténis", mlb: "Baseball", mma: "MMA" },
  system: { navHome: "Início", navTopPicks: "Melhores escolhas", navBetting: "Apostas", navNews: "Notícias", navTools: "Ferramentas", navGlossary: "Glossário"  },
  footer: {
    betIntelligence: "Sistema de inteligência de apostas", betIntelligenceDesc: "A IA avalia cada seleção usando confiança, valor esperado e sinais de risco de mercado.",
    valueBet: "VALUE BET", valueBetDesc: "Forte valor esperado positivo segundo o modelo de IA.",
    okBet: "APOSTA OK", okBetDesc: "Oportunidade de aposta aceitável com valor moderado.",
    riskyBet: "ARRISCADO", riskyBetDesc: "Maior incerteza ou menor valor esperado de aposta.",
    aiEvScore: "PONTUAÇÃO EV IA", aiEvScoreDesc: "Pontuação de valor esperado calculada pela IA.",
    aiEdge: "Vantagem IA", aiEdgeDesc: "Diferença entre a probabilidade implícita do bookmaker e a estimada pela IA.",
    confidence: "Confiança", confidenceDesc: "Pontuação de confiança IA de 0 a 100 baseada em sinais estatísticos.",
    impliedProb: "Probabilidade implícita", impliedProbDesc: "Probabilidade derivada das odds do bookmaker.",
    risk: "Risco", riskDesc: "Nível de volatilidade e incerteza das previsões.",
    aiBettingInsights: "Análises de apostas IA", aiBettingInsightsDesc: "Esta plataforma fornece análises de apostas desportivas geradas por IA apenas para fins informativos. Jogue responsavelmente.",
    navAbout: "Sobre nós", navContact: "Contacto", navPrivacy: "Política de privacidade", navTerms: "Termos de utilização",
    navAffiliate: "Divulgação de afiliados", navResponsible: "Jogo responsável", navCookie: "Política de cookies",
    platformName: "MatchSignal", builtWithAi: "Construído com IA",
  },
};

const ar: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL", heroSubtitle: "تحليلات الرهان بالذكاء الاصطناعي",
  heroDesc: "تنبؤات مدعومة بالذكاء الاصطناعي لرياضات متعددة.",
  heroImageAlt: "خلفية نصائح الرهان بالذكاء الاصطناعي",
  topPicks: "أفضل الاختيارات", premiumOffers: "عروض الرهان المميزة",
  premiumOffersDesc: "ضع هنا لافتات الشركاء وعروض مواقع الرهان.",
  recommendedSites: "مواقع الرهان الموصى بها", recommendedSitesDesc: "مواقع الرهان الموصى بها وعروض الشركاء.",
  noMatches: "لا توجد مباريات متاحة", tbd: "لم يحدد بعد", noExplanation: "لا يوجد شرح متاح",
  aiTips: "نصائح الذكاء الاصطناعي", odds: "الأوفاق", confidence: "الثقة", edge: "الميزة", risk: "المخاطرة",
  ev: "القيمة المتوقعة", valueBet: "🟢 رهان ذو قيمة", okBet: "🟡 رهان مقبول", riskyBet: "🔴 خطر",
  positiveEV: "إشارة قيمة متوقعة إيجابية", negativeEV: "إشارة قيمة متوقعة سلبية",
  showExplanation: "إظهار الشرح ▼", hideExplanation: "إخفاء الشرح ▲", viewOdds: "عرض الأوفاق",
  seoTitle: "تنبؤات الرهان بالذكاء الاصطناعي", seoDescription: "تنبؤات رهان مولدة بالذكاء الاصطناعي لرياضات متعددة.",
  sports: { topPicks: "أفضل الاختيارات", football: "كرة القدم", nba: "NBA", nfl: "NFL", hockey: "هوكي الجليد", tennis: "التنس", mlb: "البيسبول", mma: "MMA" },
  system: { navHome: "الرئيسية", navTopPicks: "أفضل الاختيارات", navBetting: "الرهان", navNews: "الأخبار", navTools: "الأدوات", navGlossary: "المسرد" },
  footer: {
    betIntelligence: "نظام ذكاء الرهان", betIntelligenceDesc: "يقيّم الذكاء الاصطناعي كل اختيار باستخدام الثقة والقيمة المتوقعة وإشارات مخاطر السوق.",
    valueBet: "رهان ذو قيمة", valueBetDesc: "قيمة متوقعة إيجابية قوية.",
    okBet: "رهان مقبول", okBetDesc: "فرصة رهان مقبولة بقيمة معتدلة.",
    riskyBet: "خطر", riskyBetDesc: "عدم يقين أعلى أو قيمة رهان متوقعة أقل.",
    aiEvScore: "نقاط EV للذكاء الاصطناعي", aiEvScoreDesc: "نقاط القيمة المتوقعة لترتيب فرص الرهان.",
    aiEdge: "ميزة الذكاء الاصطناعي", aiEdgeDesc: "الفرق بين الاحتمالية الضمنية للمراهن والاحتمالية المقدرة.",
    confidence: "الثقة", confidenceDesc: "نقاط ثقة من 0 إلى 100.",
    impliedProb: "الاحتمالية الضمنية", impliedProbDesc: "الاحتمالية المستمدة من أوفاق المراهن.",
    risk: "المخاطرة", riskDesc: "مستوى التقلب وعدم اليقين.",
    aiBettingInsights: "تحليلات الرهان", aiBettingInsightsDesc: "لأغراض إعلامية فقط. لا ضمان للمكاسب. العب بمسؤولية.",
    navAbout: "حول", navContact: "اتصل بنا", navPrivacy: "سياسة الخصوصية", navTerms: "شروط الاستخدام",
    navAffiliate: "الإفصاح عن الشركاء", navResponsible: "المقامرة المسؤولة", navCookie: "سياسة الكوكيز",
    platformName: "MatchSignal", builtWithAi: "مبني بالذكاء الاصطناعي",
  },
};

const zh: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL", heroSubtitle: "AI驱动的投注分析",
  heroDesc: "AI生成的多项运动预测。", heroImageAlt: "AI投注预测主图背景",
  topPicks: "精选推荐", premiumOffers: "优质投注优惠",
  premiumOffersDesc: "在此放置您的联盟横幅和体育博彩促销活动。",
  recommendedSites: "推荐博彩网站", recommendedSitesDesc: "推荐的博彩网站和联盟优惠。",
  noMatches: "暂无比赛", tbd: "待定", noExplanation: "暂无说明",
  aiTips: "AI建议", odds: "赔率", confidence: "置信度", edge: "优势", risk: "风险",
  ev: "期望值 (EV)", valueBet: "🟢 价值投注", okBet: "🟡 普通投注", riskyBet: "🔴 高风险",
  positiveEV: "正期望值信号", negativeEV: "负期望值信号",
  showExplanation: "显示说明 ▼", hideExplanation: "隐藏说明 ▲", viewOdds: "查看赔率",
  seoTitle: "AI投注预测", seoDescription: "AI生成的多项运动投注预测和价值投注。",
  sports: { topPicks: "精选推荐", football: "足球", nba: "NBA", nfl: "NFL", hockey: "冰球", tennis: "网球", mlb: "棒球", mma: "综合格斗" },
system: {
  navHome: "首页",
  navTopPicks: "精选推荐",
  navBetting: "投注",
  navNews: "新闻",
  navTools: "工具",
  navGlossary: "术语表"
},
  footer: {
    betIntelligence: "投注智能系统", betIntelligenceDesc: "AI使用置信度、期望值和市场风险信号评估每个选择。",
    valueBet: "价值投注", valueBetDesc: "根据AI模型，具有强烈正期望值。",
    okBet: "普通投注", okBetDesc: "具有适度价值的可接受投注机会。",
    riskyBet: "高风险", riskyBetDesc: "较高的不确定性或较低的预期投注价值。",
    aiEvScore: "AI EV评分", aiEvScoreDesc: "AI计算的期望值评分。",
    aiEdge: "AI优势", aiEdgeDesc: "庄家隐含概率与AI估计概率之间的差异。",
    confidence: "置信度", confidenceDesc: "基于统计信号的AI置信度评分，范围0–100。",
    impliedProb: "隐含概率", impliedProbDesc: "从庄家赔率推导出的概率。",
    risk: "风险", riskDesc: "预测的波动性和不确定性水平。",
    aiBettingInsights: "AI投注分析", aiBettingInsightsDesc: "本平台仅出于信息目的提供AI生成的体育投注分析。请负责任地赌博。",
    navAbout: "关于我们", navContact: "联系我们", navPrivacy: "隐私政策", navTerms: "使用条款",
    navAffiliate: "联盟披露", navResponsible: "负责任赌博", navCookie: "Cookie政策",
    platformName: "MatchSignal", builtWithAi: "由AI构建",
  },
};

const ja: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL", heroSubtitle: "AIによるベッティング分析",
  heroDesc: "複数のスポーツに対応したAI予想。", heroImageAlt: "AIベッティング予想ヒーロー背景",
  topPicks: "注目のピック", premiumOffers: "プレミアムベッティングオファー",
  premiumOffersDesc: "アフィリエイトバナーやスポーツブックのプロモーションをここに配置してください。",
  recommendedSites: "おすすめのスポーツブック", recommendedSitesDesc: "おすすめのスポーツブックとアフィリエイトオファー。",
  noMatches: "試合がありません", tbd: "未定", noExplanation: "説明がありません",
  aiTips: "AI予想", odds: "オッズ", confidence: "信頼度", edge: "優位性", risk: "リスク",
  ev: "期待値 (EV)", valueBet: "🟢 バリューベット", okBet: "🟡 普通のベット", riskyBet: "🔴 リスク高",
  positiveEV: "正の期待値シグナル", negativeEV: "負の期待値シグナル",
  showExplanation: "説明を表示 ▼", hideExplanation: "説明を非表示 ▲", viewOdds: "オッズを見る",
  seoTitle: "AIベッティング予想", seoDescription: "AIが生成した複数スポーツのベッティング予想とバリューベット。",
  sports: { topPicks: "注目のピック", football: "サッカー", nba: "NBA", nfl: "NFL", hockey: "アイスホッケー", tennis: "テニス", mlb: "野球", mma: "MMA" },
  system: {
  navHome: "ホーム",
  navTopPicks: "注目のピック",
  navBetting: "ベッティング",
  navNews: "ニュース",
  navTools: "ツール",
  navGlossary: "用語集"
},
  footer: {
    betIntelligence: "ベッティングインテリジェンスシステム", betIntelligenceDesc: "AIは信頼度、期待値、市場リスクシグナルを使用して各ピックを評価します。",
    valueBet: "バリューベット", valueBetDesc: "AIモデルによる強い正の期待値。",
    okBet: "普通のベット", okBetDesc: "適度な価値のある許容可能なベット機会。",
    riskyBet: "リスク高", riskyBetDesc: "より高い不確実性または低い期待ベット価値。",
    aiEvScore: "AI EVスコア", aiEvScoreDesc: "ベット機会をランク付けするためのAI計算期待値スコア。",
    aiEdge: "AI優位性", aiEdgeDesc: "ブックメーカーの暗示確率とAI推定確率の差。",
    confidence: "信頼度", confidenceDesc: "統計シグナルに基づく0〜100のAI信頼度スコア。",
    impliedProb: "暗示確率", impliedProbDesc: "ブックメーカーのオッズから導出された確率。",
    risk: "リスク", riskDesc: "予測の変動性と不確実性のレベル。",
    aiBettingInsights: "AIベッティング分析", aiBettingInsightsDesc: "情報提供のみを目的としたAI生成のスポーツベッティング分析。責任を持ってギャンブルしてください。",
    navAbout: "会社概要", navContact: "お問い合わせ", navPrivacy: "プライバシーポリシー", navTerms: "利用規約",
    navAffiliate: "アフィリエイト開示", navResponsible: "責任あるギャンブル", navCookie: "Cookieポリシー",
    platformName: "MatchSignal", builtWithAi: "AIで構築",
  },
};

const hi: DeepPartial<Translation> = {
  heroTitle: "MATCH SIGNAL", heroSubtitle: "AI-संचालित सट्टेबाजी विश्लेषण",
  heroDesc: "कई खेलों के लिए AI-जनित भविष्यवाणियां।",
  heroImageAlt: "AI सट्टेबाजी भविष्यवाणी हीरो पृष्ठभूमि",
  topPicks: "शीर्ष चुनाव", premiumOffers: "प्रीमियम सट्टेबाजी ऑफर",
  premiumOffersDesc: "यहां अपने एफिलिएट बैनर और स्पोर्ट्सबुक प्रमोशन रखें।",
  recommendedSites: "अनुशंसित स्पोर्ट्सबुक", recommendedSitesDesc: "अनुशंसित स्पोर्ट्सबुक और एफिलिएट ऑफर।",
  noMatches: "कोई मैच उपलब्ध नहीं", tbd: "निर्धारित नहीं", noExplanation: "कोई स्पष्टीकरण उपलब्ध नहीं",
  aiTips: "AI टिप्स", odds: "ऑड्स", confidence: "विश्वास", edge: "बढ़त", risk: "जोखिम",
  ev: "अपेक्षित मूल्य (EV)", valueBet: "🟢 वैल्यू बेट", okBet: "🟡 ठीक बेट", riskyBet: "🔴 जोखिम भरा",
  positiveEV: "सकारात्मक अपेक्षित मूल्य संकेत", negativeEV: "नकारात्मक अपेक्षित मूल्य संकेत",
  showExplanation: "स्पष्टीकरण दिखाएं ▼", hideExplanation: "स्पष्टीकरण छुपाएं ▲", viewOdds: "ऑड्स देखें",
  seoTitle: "AI सट्टेबाजी भविष्यवाणियां", seoDescription: "कई खेलों के लिए AI-जनित सट्टेबाजी भविष्यवाणियां।",
  sports: { topPicks: "शीर्ष चुनाव", football: "फुटबॉल", nba: "NBA", nfl: "NFL", hockey: "आइस हॉकी", tennis: "टेनिस", mlb: "बेसबॉल", mma: "MMA" },
  system: { navHome: "होम", navTopPicks: "शीर्ष चुनाव", navBetting: "सट्टेबाजी", navNews: "समाचार", navTools: "उपकरण", navGlossary: "शब्दकोश" },
  footer: {
    betIntelligence: "बेटिंग इंटेलिजेंस सिस्टम", betIntelligenceDesc: "AI विश्वास, अपेक्षित मूल्य और बाजार जोखिम संकेतों का उपयोग करके प्रत्येक चुनाव का मूल्यांकन करता है।",
    valueBet: "वैल्यू बेट", valueBetDesc: "AI मॉडल के अनुसार मजबूत सकारात्मक अपेक्षित मूल्य।",
    okBet: "ठीक बेट", okBetDesc: "मध्यम मूल्य के साथ स्वीकार्य सट्टेबाजी का अवसर।",
    riskyBet: "जोखिम भरा", riskyBetDesc: "उच्च अनिश्चितता या कम अपेक्षित सट्टेबाजी मूल्य।",
    aiEvScore: "AI EV स्कोर", aiEvScoreDesc: "सट्टेबाजी के अवसरों को रैंक करने के लिए AI-गणना अपेक्षित मूल्य स्कोर।",
    aiEdge: "AI बढ़त", aiEdgeDesc: "बुकमेकर की निहित संभावना और AI अनुमानित संभावना के बीच का अंतर।",
    confidence: "विश्वास", confidenceDesc: "सांख्यिकीय संकेतों पर आधारित 0–100 का AI विश्वास स्कोर।",
    impliedProb: "निहित संभावना", impliedProbDesc: "बुकमेकर ऑड्स से प्राप्त संभावना।",
    risk: "जोखिम", riskDesc: "भविष्यवाणियों की अस्थिरता और अनिश्चितता का स्तर।",
    aiBettingInsights: "AI सट्टेबाजी विश्लेषण", aiBettingInsightsDesc: "केवल सूचनात्मक उद्देश्यों के लिए। जीत की कोई गारंटी नहीं। जिम्मेदारी से जुआ खेलें।",
    navAbout: "हमारे बारे में", navContact: "संपर्क", navPrivacy: "गोपनीयता नीति", navTerms: "उपयोग की शर्तें",
    navAffiliate: "एफिलिएट प्रकटीकरण", navResponsible: "जिम्मेदार जुआ", navCookie: "कुकी नीति",
    platformName: "MatchSignal", builtWithAi: "AI के साथ बनाया गया",
  },
};

const overrides: Partial<Record<Lang, DeepPartial<Translation>>> = {
  hu, de, fr, es, it, pt, ar, zh, ja, hi,
};

function buildTranslation(lang: Lang): Translation {
  const override = overrides[lang];
  if (!override) return en;
  return deepMerge(en, override as any); // 'as any' biztosítja, hogy a deepMerge típuskezelése ne okozzon gondot
}

export const translations = Object.fromEntries(
  LANGS.map((lang) => [lang, buildTranslation(lang)])
) as Record<Lang, Translation>;

export function getTranslation(lang: string): Translation {
  return translations[(lang as Lang)] ?? translations.en;
}