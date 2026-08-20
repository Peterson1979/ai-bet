import type { Lang } from "@/app/lib/i18n";

export const LEGAL_NAV_COPY: Record<Lang, { ai: string; earnings: string; notice: string }> = {
  en: { ai: "AI Disclaimer", earnings: "Earnings Disclaimer", notice: "Legal Notice" },
  hu: { ai: "MI-jogi nyilatkozat", earnings: "Eredmény- és jövedelmi nyilatkozat", notice: "Impresszum" },
  de: { ai: "KI-Haftungsausschluss", earnings: "Ertragsausschluss", notice: "Impressum" },
  fr: { ai: "Avertissement IA", earnings: "Avertissement sur les gains", notice: "Mentions légales" },
  es: { ai: "Descargo de IA", earnings: "Descargo de ganancias", notice: "Aviso legal" },
  it: { ai: "Disclaimer IA", earnings: "Disclaimer sui guadagni", notice: "Note legali" },
  pt: { ai: "Aviso sobre IA", earnings: "Aviso sobre ganhos", notice: "Aviso legal" },
  ar: { ai: "إخلاء مسؤولية الذكاء الاصطناعي", earnings: "إخلاء مسؤولية الأرباح", notice: "إشعار قانوني" },
  zh: { ai: "AI 免责声明", earnings: "收益免责声明", notice: "法律声明" },
  ja: { ai: "AI 免責事項", earnings: "収益免責事項", notice: "法的表示" },
  hi: { ai: "AI अस्वीकरण", earnings: "कमाई अस्वीकरण", notice: "कानूनी सूचना" },
};
