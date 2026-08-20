import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#060B14] text-slate-200">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-16 pt-28">
        {children}
      </main>
      <Footer />
    </div>
  );
}
