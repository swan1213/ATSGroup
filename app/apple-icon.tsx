import { ImageResponse } from "next/og";
import { MARK_SVG_SQUARE, svgDataUri } from "@/lib/brandMark";

/** iPhone/iPad home-screen icon. iOS rounds the corners itself. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={svgDataUri(MARK_SVG_SQUARE)} width={180} height={180} alt="" />
    ),
    { ...size }
  );
}
