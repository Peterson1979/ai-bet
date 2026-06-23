"use client";

import { useEffect, useState } from "react";

const banners = [
  "https://js.commissionkings.ag/javascript.php?prefix=6DV8-IUj_sYoAmwrkE6KlGNd7ZgqdRLk&media=1534&campaign=1",
  "https://js.commissionkings.ag/javascript.php?prefix=6DV8-IUj_saL0SnolwIJemNd7ZgqdRLk&media=2079&campaign=1",
];

export default function AffiliateSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = document.getElementById("affiliate-banner");

    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = banners[index];
    script.async = true;

    container.appendChild(script);

  }, [index]);


  return (
    <div className="my-8 flex justify-center">

      <div
        id="affiliate-banner"
        className="flex min-h-[90px] w-full max-w-[798px] items-center justify-center overflow-hidden"
      />

    </div>
  );
}