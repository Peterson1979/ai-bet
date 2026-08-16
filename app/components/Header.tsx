"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { translations, Lang } from "@/app/lib/i18n";
export default function Header() {
  const params = useParams();
  const lang = (params?.lang as Lang) || "en";
  const t = translations[lang] ?? translations.en;
  const nav = [
    { href: "/", label: t.system.navHome },
    { href: "/betting", label: t.system.navBetting },
    { href: "/tools", label: t.system.navTools },
    { href: "/betting-glossary", label: t.system.navGlossary },
  ];
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        backgroundColor: "rgba(6,11,20,0.75)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          color: "white",
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: 22,
            flexWrap: "nowrap",
            overflowX: "auto",
            whiteSpace: "nowrap",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {nav.map((item) => {
            const href =
              item.href === "/"
                ? `/${lang}`
                : `/${lang}${item.href}`;
            return (
              <Link key={item.href} href={href} style={linkStyle}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 14,
};
