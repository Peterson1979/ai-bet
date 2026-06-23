"use client";

import { useEffect, useState } from "react";

const banners = [
  {
    href: "https://record.betonlineaffiliates.ag/_6DV8-IUj_sYeEUhaOBLMuPriQBoxlSRK/1/",
    img: "https://media.commissionkings.ag/uploads/BOL_AQC_banner_468x60.gif",
  },
  {
    href: "https://record.sportsbettingaffiliates.ag/_6DV8-IUj_sbgvJkXWt21LsKHjvjtg3Pf/1/",
    img: "https://media.commissionkings.ag/uploads/SB_AQC_banner_468x60__1220261.gif",
  },
];

export default function AffiliateSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const banner = banners[index];

  return (
    <section className="relative z-30 mt-10 mb-10 flex justify-center">
      <a
        href={banner.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          key={banner.img}
          src={banner.img}
          alt="Affiliate betting offer"
          className="
            h-auto
            w-[320px]
            sm:w-[468px]
            max-w-full
            rounded-xl
            shadow-lg
          "
        />
      </a>
    </section>
  );
}