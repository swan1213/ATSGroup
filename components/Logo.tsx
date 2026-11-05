import { useId } from "react";

type LogoProps = {
  size?: number;
};

/**
 * ATS brand mark: a gold "A" whose two legs meet at the summit
 * (Alliance → Success), locked together by a rising cyan crossbar
 * (Technology). Same geometry as lib/brandMark.ts, drawn as JSX so the
 * gradient ids can be unique per instance (header + footer on one page).
 */
export function Logo({ size = 34 }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const bg = `${id}-bg`, au = `${id}-au`, tc = `${id}-tc`, hull = `${id}-hull`;

  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="ATS · Alliance, Technology, Success"
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14233f" />
          <stop offset="1" stopColor="#05080f" />
        </linearGradient>
        <linearGradient id={au} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe2a0" />
          <stop offset=".55" stopColor="#f5b942" />
          <stop offset="1" stopColor="#c98a14" />
        </linearGradient>
        <linearGradient id={tc} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <clipPath id={hull}>
          <path d="M16 5.2 L26.2 26.6 H5.8 Z" />
        </clipPath>
      </defs>
      <rect x=".4" y=".4" width="31.2" height="31.2" rx="8" fill={`url(#${bg})`} stroke="#f5b942" strokeOpacity=".35" strokeWidth=".6" />
      {/* the A: two partners meeting at the summit */}
      <path d="M16 5.2 L26.2 26.6 H21.3 L16 15.3 L10.7 26.6 H5.8 Z" fill={`url(#${au})`} />
      {/* rising crossbar: the technology that links them */}
      <g clipPath={`url(#${hull})`}>
        <path d="M4 23.4 L28 17.2" stroke="#0b1428" strokeWidth="4.6" />
        <path d="M4 23.4 L28 17.2" stroke={`url(#${tc})`} strokeWidth="2.6" />
      </g>
    </svg>
  );
}
