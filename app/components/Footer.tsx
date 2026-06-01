// app/components/Footer.tsx
import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/legal/privacy-policy",      label: "Privacy Policy"       },
  { href: "/legal/terms-of-use",        label: "Terms of Use"         },
  { href: "/legal/affiliate-disclosure",label: "Affiliate Disclosure" },
  { href: "/legal/responsible-gambling",label: "Responsible Gambling" },
  { href: "/legal/cookie-policy",       label: "Cookie Policy"        },
  { href: "/legal/ai-disclaimer",       label: "AI Disclaimer"        },
  { href: "/legal/earnings-disclaimer", label: "Earnings Disclaimer"  },
  { href: "/legal/contact",             label: "Contact"              },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#1E293B] bg-[#060B14]">

      {/* GLOSSARY */}
      <div className="border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1500px] px-4 py-14 md:px-6">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-white">Betting Metrics Explained</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Understanding the AI betting metrics helps evaluate prediction quality,
              value opportunities and overall betting risk.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "AI Edge", desc: "Difference between implied bookmaker probability and estimated AI probability. Higher edge may indicate stronger betting value." },
              { title: "Confidence", desc: "AI confidence score from 0–100 based on statistical signals, historical data and market analysis." },
              { title: "Implied Probability", desc: "Probability calculated from bookmaker odds. Lower implied probability usually means higher odds." },
              { title: "Risk", desc: "Estimated volatility and uncertainty level of the prediction. Lower risk indicates more stable betting conditions." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-cyan-400/10 bg-[#0F172A] p-5">
                <h4 className="text-sm font-black text-cyan-300">{item.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-6">

        {/* MAIN FOOTER ROW */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <h4 className="text-lg font-black text-white">AI Betting Insights</h4>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              This platform provides AI-generated sports betting analysis for informational
              purposes only. No guarantee of winnings. Gamble responsibly. 18+
            </p>
          </div>

          {/* LEGAL LINKS GRID */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[#1E293B] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-slate-500">
            © {new Date().getFullYear()} AI Betting Platform. All rights reserved.
          </p>
          <p className="text-[12px] text-slate-500">
            Built with AI + Data Analytics · For entertainment purposes only
          </p>
        </div>

      </div>
    </footer>
  );
}
