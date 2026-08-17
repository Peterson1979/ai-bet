import ContactForm from "./ContactForm";
import { translations, Lang, LANGS } from "@/app/lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = translations[lang] ?? translations.en;
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.matchsignal.pro";

  const languages: Record<string, string> = {};
  LANGS.forEach((l) => {
    languages[l] = `${baseUrl}/${l}/contact`;
  });
  languages["x-default"] = `${baseUrl}/en/contact`;

  return {
    title: `${t.contactTitle ?? "Contact"} | MatchSignal`,
    description: "Get in touch with the MatchSignal team for inquiries, feedback, and support.",
    alternates: {
      canonical: `${baseUrl}/${lang}/contact`,
      languages,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  return <ContactForm lang={lang} />;
}