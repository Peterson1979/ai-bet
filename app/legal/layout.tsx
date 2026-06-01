export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#060B14] text-slate-200">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {children}
      </div>
    </main>
  );
}