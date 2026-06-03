export const metadata = {
  title: "About | AI Betting Analytics",
  description:
    "AI-driven sports betting analytics platform using statistical models, value detection, and real-time prediction systems.",
  keywords:
    "AI betting, sports predictions, betting analytics, value bets, machine learning odds",
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Betting Analytics",
    description:
      "AI-powered sports betting prediction platform focused on value detection and probabilistic modeling.",
    url: "https://your-domain.com/about",
    sameAs: [],
  };

  return (
    <main className="min-h-screen text-white bg-[#050A12] px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-6">
          About the Platform
        </h1>

        <p className="text-slate-300 leading-7 mb-6">
          This platform is built around AI-assisted sports analytics and probabilistic modeling.
          The system evaluates matches using confidence scoring, expected value estimation,
          and multi-factor risk assessment.
        </p>

        <p className="text-slate-300 leading-7 mb-6">
          Unlike traditional tipster systems, predictions are generated through structured data pipelines
          combining historical performance metrics, market odds analysis, and model-based inference.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-3">Core Principles</h2>

        <ul className="list-disc pl-6 text-slate-300 space-y-2">
          <li>Data-driven prediction generation</li>
          <li>Value detection based on expected value (EV)</li>
          <li>Risk-adjusted confidence scoring</li>
          <li>Transparent model outputs (no black-box tips)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-3">Disclaimer</h2>

        <p className="text-slate-400 text-sm leading-6">
          All predictions are informational only. Betting involves risk and no outcome is guaranteed.
        </p>
      </div>
    </main>
  );
}