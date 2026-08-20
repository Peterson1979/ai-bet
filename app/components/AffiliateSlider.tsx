"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getSliderSites } from "@/app/lib/affiliates";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  className?: string;
  lang?: Lang;
  showDisclosure?: boolean;
  countryCode?: string;
};

const AUTO_ADVANCE_INTERVAL_MS = 4500;
const SCROLL_STEP_PX = 200;

export default function AffiliateSlider({
  className = "",
  lang = "en",
  showDisclosure = false,
  countryCode,
}: Props) {
  const sites = getSliderSites(countryCode);
  const t = translations[lang] ?? translations.en;
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isTouchingRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 10);
    setCanScrollRight(
      track.scrollLeft < track.scrollWidth - track.clientWidth - 10
    );
  };

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = direction === "right" ? SCROLL_STEP_PX : -SCROLL_STEP_PX;

    if (direction === "right" && track.scrollLeft >= track.scrollWidth - track.clientWidth - 10) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === "left" && track.scrollLeft <= 10) {
      track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
    } else {
      track.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || sites.length <= 1) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      track.addEventListener("scroll", checkScrollBounds, { passive: true });
      return () => track.removeEventListener("scroll", checkScrollBounds);
    }

    const interval = setInterval(() => {
      if (
        document.hidden ||
        isHoveredRef.current ||
        isFocusedRef.current ||
        isTouchingRef.current
      ) {
        return;
      }

      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 10) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: SCROLL_STEP_PX, behavior: "smooth" });
      }
    }, AUTO_ADVANCE_INTERVAL_MS);

    const onMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
    };
    const onFocusIn = () => {
      isFocusedRef.current = true;
    };
    const onFocusOut = () => {
      isFocusedRef.current = false;
    };
    const onTouchStart = () => {
      isTouchingRef.current = true;
    };
    const onTouchEnd = () => {
      isTouchingRef.current = false;
    };

    track.addEventListener("mouseenter", onMouseEnter);
    track.addEventListener("mouseleave", onMouseLeave);
    track.addEventListener("focusin", onFocusIn);
    track.addEventListener("focusout", onFocusOut);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("scroll", checkScrollBounds, { passive: true });

    return () => {
      clearInterval(interval);
      track.removeEventListener("mouseenter", onMouseEnter);
      track.removeEventListener("mouseleave", onMouseLeave);
      track.removeEventListener("focusin", onFocusIn);
      track.removeEventListener("focusout", onFocusOut);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("scroll", checkScrollBounds);
    };
  }, [sites.length]);

  if (!sites.length) return null;

  return (
    <section
      className={`relative w-full py-6 group/slider ${className}`}
      aria-label="Partner Sportsbooks Carousel"
    >
      {/* Desktop Previous Button */}
      <button
        type="button"
        onClick={() => scrollByAmount("left")}
        aria-label="Previous partner offers"
        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-[#060B14]/90 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md transition-all hover:scale-110 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
          !canScrollLeft ? "opacity-40 cursor-pointer" : "opacity-90"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Desktop Next Button */}
      <button
        type="button"
        onClick={() => scrollByAmount("right")}
        aria-label="Next partner offers"
        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-[#060B14]/90 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md transition-all hover:scale-110 hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
          !canScrollRight ? "opacity-40 cursor-pointer" : "opacity-90"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Scroll Track */}
      <div
        ref={trackRef}
        tabIndex={0}
        aria-label="Sportsbook offers list"
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus:ring-1 focus:ring-cyan-500/30 rounded-2xl"
      >
        {sites.map((site) => (
          <a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="snap-start shrink-0 flex flex-col items-center justify-center gap-2.5 w-[160px] md:w-[180px] h-[115px] rounded-2xl border-2 border-cyan-300/30 bg-gradient-to-b from-[#0B1220] to-[#070D18] px-4 py-3 transition-all duration-200 hover:border-cyan-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_12px_30px_rgba(56,189,248,0.25)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {site.logoUrl ? (
              <span className="flex items-center justify-center bg-[#1a2744] rounded-lg px-3 py-1.5 w-full h-[36px] border border-cyan-300/20">
                <Image
                  src={site.logoUrl}
                  alt={site.name}
                  width={110}
                  height={28}
                  className="max-h-[26px] max-w-[110px] w-auto h-auto object-contain"
                />
              </span>
            ) : (
              <span className="flex items-center justify-center bg-[#14213d] rounded-lg px-3 py-1.5 w-full h-[36px] border border-cyan-400/20 text-sm font-black text-white tracking-wide truncate">
                {site.name}
              </span>
            )}
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wide">
              {t.bettingPage.claimBonus} →
            </span>
          </a>
        ))}
      </div>

      {/* Mobile Fade indicator */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#060B14] to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 flex items-center justify-end pr-1 bg-gradient-to-l from-[#060B14] to-transparent md:hidden">
        <span className="text-cyan-300 text-sm animate-pulse">›</span>
      </div>

      {showDisclosure && (
        <p className="text-[11px] text-slate-400 text-center max-w-xl mx-auto mt-4 px-4 leading-relaxed">
          {t.affiliateDisclaimer}
        </p>
      )}
    </section>
  );
}
