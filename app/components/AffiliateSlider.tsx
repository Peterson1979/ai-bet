"use client";

import { useEffect, useState } from "react";

const banners = [
  {
    href: "https://record.betonlineaffiliates.ag/_6DV8-IUj_sYeEUhaOBLMuPriQBoxlSRK/1/",
    img: "https://media.commissionkings.ag/uploads/BOL_AQC_banner_468x601.gif",
  },
  {
    href: "https://record.betonlineaffiliates.ag/_6DV8-IUj_saL0SnolwIJemNd7ZgqdRLk/1/",
    img: "https://media.commissionkings.ag/uploads/BOL_AQC_banner_468x601.gif",
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
    <div className="my-8 flex justify-center">

      <a
        href={banner.href}
        target="_blank"
        rel="noopener noreferrer"
      >

        <img
          src={banner.img}
          alt="Affiliate offer"
          className="
            h-auto
            w-[320px]
            sm:w-[468px]
            max-w-full
          "
        />

      </a>

    </div>
  );
}