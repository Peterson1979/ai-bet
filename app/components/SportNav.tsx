// app/components/SportNav.tsx

import {
  FaFutbol,
  FaBasketballBall,
  FaFootballBall,
  FaHockeyPuck,
} from "react-icons/fa";

import { GiTennisBall } from "react-icons/gi";

const sports = [
  {
    name: "Football",
    icon: FaFutbol,
    color: "text-green-400",
  },
  {
    name: "NBA",
    icon: FaBasketballBall,
    color: "text-orange-400",
  },
  {
    name: "NFL",
    icon: FaFootballBall,
    color: "text-red-400",
  },
  {
    name: "Hockey",
    icon: FaHockeyPuck,
    color: "text-cyan-300",
  },
  {
    name: "Tennis",
    icon: GiTennisBall,
    color: "text-yellow-300",
  },
];

export default function SportNav() {
  return (
    <div className="space-y-5">

      {/* SPORT NAV */}
      <nav className="flex flex-wrap items-center justify-center gap-3 px-2 py-3">

        {sports.map((sport) => {
          const Icon = sport.icon;

          return (
            <a
              key={sport.name}
              href={`#${sport.name.toLowerCase()}`}
              className="
                group
                relative overflow-hidden

                flex items-center gap-2

                rounded-full

                border border-cyan-400/20
                bg-gradient-to-b from-[#0B1220] to-[#0F172A]

                px-5 py-2

                text-sm font-semibold text-white

                shadow-[0_0_15px_rgba(56,189,248,0.05)]

                transition-all duration-300

                hover:border-cyan-400/60
                hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]
                hover:-translate-y-0.5

                active:scale-95
              "
            >
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -top-6 left-2 h-10 w-10 rounded-full bg-cyan-400/10 blur-xl" />
              </div>

              <Icon
                size={18}
                className={`
                  relative z-10
                  transition-transform duration-300
                  group-hover:scale-110
                  ${sport.color}
                `}
              />

              <span className="relative z-10">
                {sport.name}
              </span>
            </a>
          );
        })}
      </nav>

      {/* BANNER AREA */}
      <div
        className="
          relative overflow-hidden

          rounded-[24px]
          border border-cyan-400/20

          bg-gradient-to-r
          from-[#0B1220]
          via-[#0F172A]
          to-[#111827]

          px-6 py-10

          shadow-[0_0_30px_rgba(56,189,248,0.08)]
        "
      >
        {/* background glow */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 text-center">

          <h3 className="text-2xl font-black text-white">
            Premium Betting Offers
          </h3>

          <p className="mt-3 text-sm text-slate-200">
            Place your affiliate banners, sportsbook promos or rotating offers here.
          </p>

        </div>
      </div>

    </div>
  );
}