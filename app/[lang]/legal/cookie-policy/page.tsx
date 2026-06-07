export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="text-3xl font-black text-white mb-6">
        Cookie Policy
      </h1>

      <p className="mb-6">
        MatchSignal uses cookies to improve user experience, analyze traffic,
        and serve relevant advertising through Google AdSense.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        What are cookies
      </h2>

      <p className="mb-4">
        Cookies are small text files stored on your device when you visit our website.
        They help us understand how users interact with the platform.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Types of cookies we use
      </h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          <b>Essential cookies</b> – required for basic site functionality
        </li>
        <li>
          <b>Analytics cookies (Google Analytics)</b> – measure traffic and usage
        </li>
        <li>
          <b>Advertising cookies (Google AdSense)</b> – show relevant ads
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Cookie consent
      </h2>

      <p className="mb-4">
        You can accept or reject non-essential cookies using the cookie banner.
        Your preferences are stored locally in your browser.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Third-party cookies
      </h2>

      <p className="mb-4">
        We use third-party services such as Google Analytics and Google AdSense,
        which may place cookies according to their own policies.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-2 text-white">
        Your control
      </h2>

      <p className="mb-4">
        You can disable cookies in your browser settings at any time.
      </p>

      <p className="mt-10 text-sm text-slate-400">
        Operator: MatchSignal<br />
        Contact: kicksignalhq@gmail.com
      </p>
    </main>
  );
}