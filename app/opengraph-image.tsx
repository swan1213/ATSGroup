import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { MARK_SVG, svgDataUri } from "@/lib/brandMark";

export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 85% 15%, rgba(59,130,246,.35), transparent 45%), radial-gradient(circle at 10% 95%, rgba(245,185,66,.22), transparent 40%), #060a13",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* top row: logo + locale */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={svgDataUri(MARK_SVG)} width={72} height={72} alt="" />
            <div style={{ fontSize: 34, fontWeight: 700, color: "#e9edf5" }}>
              ATS Group
            </div>
          </div>
          <div style={{ fontSize: 24, color: "#8391a7", letterSpacing: 4 }}>
            TOKYO, JAPAN
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 70,
              fontWeight: 700,
              color: "#e9edf5",
              lineHeight: 1.08,
              maxWidth: 900,
            }}
          >
            <span>Software Engineering &amp; AI,</span>
            <span style={{ color: "#f5b942" }}>built in Japan.</span>
          </div>
          <div style={{ fontSize: 30, color: "#b4bfd0", maxWidth: 820 }}>
            Alliance · Technology · Success
          </div>
        </div>

        {/* accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#8391a7",
          }}
        >
          <div style={{ width: 60, height: 6, background: "linear-gradient(90deg, #22d3ee, #3b82f6, #f5b942)" }} />
          atsgroup.world
        </div>
      </div>
    ),
    { ...size }
  );
}
