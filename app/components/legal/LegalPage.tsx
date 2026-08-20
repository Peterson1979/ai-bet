import ManageCookieButton from "@/app/components/ManageCookieButton";
import type { Lang } from "@/app/lib/i18n";
import { getCookieSettingsLabel, getLegalDocument, getOperatorLabels } from "@/app/lib/legal/content";
import type { LegalSlug } from "@/app/lib/legal/types";

const OPERATOR = {
  name: "Forray Gyöngyi",
  address: "7633 Pécs, Esztergár Lajos utca 9/B, Hungary",
  tax: "74264166-1-22",
  registration: "57756666",
  contacts: "contact@matchsignal.pro · legal@matchsignal.pro · privacy@matchsignal.pro",
} as const;

function OperatorBlock({ lang }: { lang: Lang }) {
  const labels = getOperatorLabels(lang);
  return (
    <section className="mt-10 rounded-2xl border border-cyan-400/20 bg-[#0B1220] p-5 md:p-6">
      <h2 className="text-2xl font-bold text-white">{labels.heading}</h2>
      <dl className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-[minmax(170px,auto)_1fr]">
        <dt className="font-semibold text-white">{labels.name}</dt><dd>{OPERATOR.name}</dd>
        <dt className="font-semibold text-white">{labels.status}</dt><dd>{labels.statusValue}</dd>
        <dt className="font-semibold text-white">{labels.address}</dt><dd>{OPERATOR.address}</dd>
        <dt className="font-semibold text-white">{labels.tax}</dt><dd>{OPERATOR.tax}</dd>
        <dt className="font-semibold text-white">{labels.registration}</dt><dd>{OPERATOR.registration}</dd>
        <dt className="font-semibold text-white">{labels.registry}</dt><dd>{labels.registryValue}</dd>
        <dt className="font-semibold text-white">{labels.roles}</dt><dd>{labels.rolesValue}</dd>
        <dt className="font-semibold text-white">{labels.contact}</dt><dd>{OPERATOR.contacts}</dd>
      </dl>
    </section>
  );
}

export default function LegalPage({ lang, slug }: { lang: Lang; slug: LegalSlug }) {
  const document = getLegalDocument(lang, slug);

  return (
    <article>
      <h1 className="text-3xl font-black text-white md:text-4xl">{document.title}</h1>
      <div className="mt-6 space-y-4 text-slate-300">
        {document.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      {document.sections.map((section) => (
        <section key={section.heading} className="mt-9">
          <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
          {section.paragraphs && (
            <div className="mt-4 space-y-4 text-slate-300">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
          {section.bullets && (
            <ul className="mt-4 list-disc space-y-2 ps-6 text-slate-300">
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          )}
          {section.table && (
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-700">
              <table className="min-w-full border-collapse text-left text-sm text-slate-300">
                <thead className="bg-slate-900 text-white">
                  <tr>{section.table.headers.map((header) => <th key={header} className="px-3 py-3 font-semibold">{header}</th>)}</tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rowIndex) => (
                    <tr key={`${section.heading}-${rowIndex}`} className="border-t border-slate-700 align-top">
                      {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-3 py-3">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {document.showCookieSettings && <div className="mt-8"><ManageCookieButton label={getCookieSettingsLabel(lang)} /></div>}
      {document.showOperator && <OperatorBlock lang={lang} />}

      <p className="mt-10 text-sm text-slate-400">{document.updated}</p>
    </article>
  );
}
