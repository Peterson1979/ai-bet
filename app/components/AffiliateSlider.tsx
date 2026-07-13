"use client";

import { useEffect, useRef } from "react";
import { getSliderSites } from "@/app/lib/affiliates";
import { translations, Lang } from "@/app/lib/i18n";

type Props = {
  className?: string;
  lang?: Lang;
};

export default function AffiliateSlider({ className = "", lang = "en" }: Props) {
  const sites = getSliderSites();
  const t = translations[lang] ?? translations.en;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    let frame: number;
    let paused = false;
    const speed = 0.4;
    const step = () => {
      if (!paused && track) {
        track.scrollLeft += speed;
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 1) {
          track.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(step);
    };
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  if (!sites.length) return null;

  const looped = [...sites, ...sites];

  return (
    <section className={`relative w-full py-6 ${className}`}>
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {looped.map((site, i) => (
          <a
            key={`${site.id}-${i}`}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="snap-start shrink-0 flex flex-col items-center justify-center gap-3 w-[150px] h-[110px] rounded-2xl border-2 border-cyan-300/30 bg-gradient-to-b from-[#0B1220] to-[#070D18] px-4 py-3 transition-all duration-200 hover:border-cyan-200 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_12px_30px_rgba(56,189,248,0.25)]"
          >
            {site.logoUrl ? (
              <span className="flex items-center justify-center bg-[#1a2744] rounded-lg px-3 py-2 w-full border border-cyan-300/20">
                <img
                  src={site.logoUrl}
                  alt={site.name}
                  className="max-h-[28px] max-w-[100px] object-contain"
                />
              </span>
            ) : (
              <span className="text-sm font-black text-white">{site.name}</span>
            )}
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wide">
              {t.bettingPage.claimBonus} →
            </span>
          </a>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#060B14] to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 flex items-center justify-end pr-1 bg-gradient-to-l from-[#060B14] to-transparent md:hidden">
        <span className="text-cyan-300 text-lg animate-pulse">›</span>
      </div>
    </section>
  );
}
