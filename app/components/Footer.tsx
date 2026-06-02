// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">

      {/* GLOSSARY */}
      <div className="border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1500px] px-4 py-14 md:px-6">

          <div className="mb-10">
            <h3 className="text-3xl font-black text-white">
              Betting Metrics Explained
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Understanding the AI betting metrics helps evaluate prediction quality,
              value opportunities and overall betting risk.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-cyan-400/10 bg-[#0F172A] p-5">
              <h4 className="text-sm font-black text-cyan-300">
                AI Edge
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Difference between implied bookmaker probability and estimated AI probability.
                Higher edge may indicate stronger betting value.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/10 bg-[#0F172A] p-5">
              <h4 className="text-sm font-black text-cyan-300">
                Confidence
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                AI confidence score from 0–100 based on statistical signals,
                historical data and market analysis.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/10 bg-[#0F172A] p-5">
              <h4 className="text-sm font-black text-cyan-300">
                Implied Probability
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Probability calculated from bookmaker odds. Lower implied probability
                usually means higher odds.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/10 bg-[#0F172A] p-5">
              <h4 className="text-sm font-black text-cyan-300">
                Risk
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Estimated volatility and uncertainty level of the prediction.
                Lower risk indicates more stable betting conditions.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-6">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h4 className="text-lg font-black text-white">
              AI Betting Insights
            </h4>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              This platform provides AI-generated sports betting analysis for informational
              purposes only. No guarantee of winnings. Gamble responsibly.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-400">
  <a href="/legal/privacy-policy" className="transition hover:text-cyan-300">
    Privacy Policy
  </a>

  <a href="/legal/terms" className="transition hover:text-cyan-300">
    Terms
  </a>

  <a href="/legal/affiliate-disclosure" className="transition hover:text-cyan-300">
    Affiliate Disclosure
  </a>

  <a href="/legal/responsible-gambling" className="transition hover:text-cyan-300">
    Responsible Gaming
  </a>

  <a href="/legal/cookie-policy" className="transition hover:text-cyan-300">
    Cookie Policy
  </a>
</div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#1E293B] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-slate-500">
            © {new Date().getFullYear()} AI Betting Platform
          </p>

          <div className="text-[12px] text-slate-500">
            Built with AI + Data Analytics
          </div>
        </div>

      </div>
    </footer>
  );
}