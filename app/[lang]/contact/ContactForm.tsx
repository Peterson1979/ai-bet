"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { translations, Lang } from "@/app/lib/i18n";

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = translations[lang] ?? translations.en;

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      company: form.get("company"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
      setToast("success");
    } else {
      setToast("error");
    }

    setTimeout(() => setToast(null), 3000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060B14] via-[#070D18] to-[#050A12] text-white">
      <Header />

      <div className="pt-[100px] pb-20 max-w-5xl mx-auto px-4 md:px-6">
        
        {/* HEADER */}
        <div className="mb-10 text-left">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 mb-3">
            Get in Touch
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            {t.contactTitle ?? "Contact MatchSignal"}
          </h1>
          <p className="mt-4 text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Have questions regarding our mathematical methodology, sports data feeds, partnership opportunities, or privacy policies? Contact our editorial and technical team.
          </p>
        </div>

        {/* 2-COLUMN GRID: CONTACT INFO & CONTACT FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* OPERATOR DETAILS & TRUST SIGNALS */}
          <div className="space-y-6">
            <div className="rounded-[24px] border-2 border-cyan-400/20 bg-[#0B1220] p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🏢</span>
                Platform Operator & Editorial Office
              </h2>
              
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Controller / Operator</div>
                  <div className="font-semibold text-white mt-0.5">MatchSignal</div>
                </div>

                <div className="border-t border-cyan-400/10 pt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">General Inquiries</div>
                  <a href="mailto:contact@matchsignal.pro" className="font-mono text-cyan-300 hover:underline">
                    contact@matchsignal.pro
                  </a>
                </div>

                <div className="border-t border-cyan-400/10 pt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Privacy & GDPR Rights</div>
                  <a href="mailto:privacy@matchsignal.pro" className="font-mono text-cyan-300 hover:underline">
                    privacy@matchsignal.pro
                  </a>
                </div>

                <div className="border-t border-cyan-400/10 pt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal & Affiliate Compliance</div>
                  <a href="mailto:legal@matchsignal.pro" className="font-mono text-cyan-300 hover:underline">
                    legal@matchsignal.pro
                  </a>
                </div>

                <div className="border-t border-cyan-400/10 pt-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Expected Response Time</div>
                  <div className="text-xs text-slate-300 mt-0.5">Within 24 to 48 business hours.</div>
                </div>
              </div>
            </div>

            {/* RESPONSIBLE GAMING NOTICE */}
            <div className="rounded-2xl border border-rose-400/20 bg-rose-950/10 p-5 text-xs text-slate-300 leading-relaxed">
              <h3 className="font-bold text-rose-300 mb-1 text-sm">Need Help with Problem Gambling?</h3>
              <p>
                MatchSignal is an informational analysis site, not a gambling operator. If gambling is causing you distress, seek independent support at{" "}
                <Link href={`/${lang}/legal/responsible-gambling`} className="text-rose-200 underline font-semibold">
                  Responsible Gambling Resources
                </Link>{" "}
                or contact Gambling Therapy (gamblingtherapy.org).
              </p>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="rounded-[24px] border-2 border-cyan-400/25 bg-gradient-to-b from-[#0B1220] to-[#070B14] p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-2">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the form below and our team will review your inquiry.
            </p>

            {sent ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-950/20 p-6 text-center">
                <div className="text-3xl mb-2">✅</div>
                <h3 className="text-lg font-bold text-emerald-300 mb-1">
                  {t.contactSuccess ?? "Message Sent Successfully"}
                </h3>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. We will get back to you within 24-48 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="company"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    placeholder="Jane Doe"
                    className="w-full p-3 rounded-xl bg-[#060B14] border border-cyan-400/30 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full p-3 rounded-xl bg-[#060B14] border border-cyan-400/30 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Message / Inquiry *
                  </label>
                  <textarea
                    name="message"
                    placeholder="How can we assist you with MatchSignal analysis, methodology, or data feeds?"
                    className="w-full p-3 rounded-xl bg-[#060B14] border border-cyan-400/30 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none text-sm h-36"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm transition shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50"
                >
                  {loading ? (t.sending ?? "Sending...") : (t.send ?? "Send Message")}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {toast === "success" && (
        <div className="fixed bottom-6 right-6 bg-emerald-400 text-black px-5 py-3 rounded-xl font-bold shadow-2xl z-50 animate-bounce">
          {t.contactSuccess ?? "Message sent successfully"}
        </div>
      )}

      {toast === "error" && (
        <div className="fixed bottom-6 right-6 bg-rose-500 text-white px-5 py-3 rounded-xl font-bold shadow-2xl z-50">
          Failed to send message. Please try emailing contact@matchsignal.pro directly.
        </div>
      )}

      <Footer />
    </main>
  );
}
