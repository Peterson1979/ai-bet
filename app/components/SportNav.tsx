const sports = ["Football", "NBA", "NFL", "Hockey", "Tennis"];

export default function SportNav() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-3">
      {sports.map((sport) => (
        <a
          key={sport}
          href={`#${sport.toLowerCase()}`}
          className="
            rounded-full border border-cyan-400/20
            bg-[#0F172A]
            px-4 py-2
            text-sm font-semibold text-slate-300

            transition
            hover:border-cyan-400/50
            hover:text-cyan-300
          "
        >
          {sport}
        </a>
      ))}
    </nav>
  );
}