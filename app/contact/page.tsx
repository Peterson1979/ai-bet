"use client";

import { useState } from "react";

export default function ContactPage() {
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
      // honeypot (bot trap)
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
    <main className="min-h-screen bg-[#050A12] text-white px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black mb-6">Contact</h1>

        {sent ? (
          <p className="text-emerald-400 font-bold">
            Message sent successfully.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* HONEYPOT (hidden field) */}
            <input
              name="company"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              name="name"
              placeholder="Your name"
              className="w-full p-3 rounded bg-[#0B1220] border border-cyan-500/30"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="w-full p-3 rounded bg-[#0B1220] border border-cyan-500/30"
              required
            />

            <textarea
              name="message"
              placeholder="Your message"
              className="w-full p-3 rounded bg-[#0B1220] border border-cyan-500/30 h-40"
              required
            />

            <button
              disabled={loading}
              className="px-6 py-3 rounded bg-cyan-500 text-black font-bold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      {/* TOAST */}
      {toast === "success" && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-black px-4 py-2 rounded-xl font-bold shadow-xl">
          Message sent successfully
        </div>
      )}

      {toast === "error" && (
        <div className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow-xl">
          Failed to send message
        </div>
      )}
    </main>
  );
}