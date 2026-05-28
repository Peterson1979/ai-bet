export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1E293B] bg-[#060B14]">
      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-6">
        
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          <div>
            <h4 className="text-sm font-semibold text-white">
              AI Betting Insights
            </h4>

            <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500">
              This platform provides AI-generated sports betting analysis for informational purposes only. 
              No guarantee of winnings. Gamble responsibly.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-cyan-300 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-cyan-300 transition">
              Terms
            </a>

            <a href="#" className="hover:text-cyan-300 transition">
              Affiliate Disclosure
            </a>

            <a href="#" className="hover:text-cyan-300 transition">
              18+ Responsible Gaming
            </a>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#1E293B] pt-6">
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} AI Betting Platform
          </p>

          <div className="text-[11px] text-slate-600">
            Built with AI + Data Analytics
          </div>
        </div>

      </div>
    </footer>
  );
}