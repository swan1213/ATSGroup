/**
 * The sky the characters are actually standing in.
 *
 * Replaces the three.js particle wave. That wave was a *tech* background —
 * a cyan dot grid on near-black — and the artwork is the opposite: blue sky,
 * snow peaks and golden-hour light. The images sat on it as bright rectangles
 * pasted onto a dark slab.
 *
 * So the page background is now a dusk sky, taken from the artwork itself:
 * deep blue overhead, warming toward the horizon, with the sun low and to the
 * right. It stays dark enough that every light-on-dark rule in the stylesheet
 * keeps working — this is a change of *world*, not a change of contrast.
 *
 * Fixed and non-scrolling on purpose: a background that travels as you scroll
 * reads as a journey, and this is one place, seen from one spot.
 *
 * Pure CSS/SVG, no WebGL, no canvas, and a server component with no state —
 * the cloud positions below are hand-placed, never random.
 */

/** x / y as %, scale, and drift duration in seconds. */
const CLOUDS = [
  { x: -8, y: 12, s: 1.0, d: 190 },
  { x: 58, y: 7, s: 0.62, d: 240 },
  { x: 22, y: 30, s: 0.8, d: 300 },
  { x: 74, y: 24, s: 1.15, d: 215 },
  { x: 4, y: 52, s: 0.7, d: 275 },
  { x: 62, y: 46, s: 0.9, d: 330 },
] as const;

/** A flat cartoon cloud — overlapping rounds, no outline, no blur. */
function Cloud() {
  return (
    <svg viewBox="0 0 220 90" width="220" height="90" fill="currentColor">
      <ellipse cx="62" cy="58" rx="58" ry="28" />
      <ellipse cx="108" cy="42" rx="44" ry="34" />
      <ellipse cx="152" cy="56" rx="46" ry="26" />
      <ellipse cx="96" cy="64" rx="70" ry="22" />
    </svg>
  );
}

export function SkyBackground() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sky-sun" />
      <div className="sky-haze" />
      <div className="sky-clouds">
        {CLOUDS.map((c, i) => (
          <span
            key={i}
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              scale: `${c.s}`,
              animationDuration: `${c.d}s`,
              animationDelay: `${-c.d * (i / CLOUDS.length)}s`,
            }}
          >
            <Cloud />
          </span>
        ))}
      </div>
    </div>
  );
}
