/**
 * The ATS brand mark as raw SVG markup, shared by the favicon, the Apple
 * touch icon and the Open Graph image (components/Logo.tsx draws the same
 * geometry as JSX for the header/footer).
 *
 * Concept: a gold "A" whose two legs meet at the summit (Alliance → Success),
 * locked together by a rising cyan crossbar (the Technology that links them,
 * angled upward like a growth line).
 */

const shapes = (bgRadius: number, border: boolean) => `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14233f"/><stop offset="1" stop-color="#05080f"/></linearGradient>
    <linearGradient id="au" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2a0"/><stop offset=".55" stop-color="#f5b942"/><stop offset="1" stop-color="#c98a14"/></linearGradient>
    <linearGradient id="tc" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>
    <clipPath id="hull"><path d="M16 5.2 L26.2 26.6 H5.8 Z"/></clipPath>
  </defs>
  ${
    border
      ? `<rect x=".4" y=".4" width="31.2" height="31.2" rx="${bgRadius}" fill="url(#bg)" stroke="#f5b942" stroke-opacity=".35" stroke-width=".6"/>`
      : `<rect width="32" height="32" rx="${bgRadius}" fill="url(#bg)"/>`
  }
  <path d="M16 5.2 L26.2 26.6 H21.3 L16 15.3 L10.7 26.6 H5.8 Z" fill="url(#au)"/>
  <g clip-path="url(#hull)">
    <path d="M4 23.4 L28 17.2" stroke="#0b1428" stroke-width="4.6"/>
    <path d="M4 23.4 L28 17.2" stroke="url(#tc)" stroke-width="2.6"/>
  </g>`;

/** Rounded app-icon tile with a hairline gold border (favicon, OG image). */
export const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${shapes(8, true)}</svg>`;

/** Full-bleed square, no border (iOS masks its own rounded corners). */
export const MARK_SVG_SQUARE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${shapes(0, false)}</svg>`;

export const svgDataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
