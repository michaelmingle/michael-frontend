import { useMemo } from "react";

const PALETTES = [
  ["#ff5a1f", "#ff8a5c"],
  ["#0d0d0d", "#ff5a1f"],
  ["#7c2d12", "#ff5a1f"],
  ["#1a1a1d", "#ff8a5c"],
];

function hashSeed(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Deterministic gradient + initials placeholder used everywhere a real
// screenshot/photo hasn't been supplied yet. Swap for real asset URLs
// once Phase 2 wires the media library.
export function GeneratedCover({ seed = "", label = "", className }) {
  const { colors, angle, initials } = useMemo(() => {
    const h = hashSeed(seed || label);
    const palette = PALETTES[h % PALETTES.length];
    const words = label.split(/[\s—-]+/).filter(Boolean);
    const init = (words[0]?.[0] ?? "") + (words[1]?.[0] ?? "");
    return { colors: palette, angle: (h % 6) * 30, initials: init.toUpperCase() };
  }, [seed, label]);

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`,
        position: "relative",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-${seed}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
      </svg>
      <span className="absolute bottom-4 right-5 font-display text-4xl font-extrabold text-white/25">
        {initials}
      </span>
    </div>
  );
}
