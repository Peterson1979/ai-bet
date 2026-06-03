export default function SimpleFooter() {
  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">

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
            <a
              href="/legal/privacy-policy"
              className="transition hover:text-cyan-300"
            >
              Privacy Policy
            </a>

            <a
              href="/legal/terms"
              className="transition hover:text-cyan-300"
            >
              Terms
            </a>

            <a
              href="/legal/affiliate-disclosure"
              className="transition hover:text-cyan-300"
            >
              Affiliate Disclosure
            </a>

            <a
              href="/legal/responsible-gambling"
              className="transition hover:text-cyan-300"
            >
              Responsible Gaming
            </a>

            <a
              href="/legal/cookie-policy"
              className="transition hover:text-cyan-300"
            >
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