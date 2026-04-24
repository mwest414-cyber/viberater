import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "viberater — know the vibe before you come inside.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontBold = await readFile(
    join(process.cwd(), "public/fonts/SpaceGrotesk-Bold.ttf")
  );
  const fontRegular = await readFile(
    join(process.cwd(), "public/fonts/SpaceGrotesk-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          fontFamily: "Space Grotesk",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            width: 800,
            height: 500,
            background: "radial-gradient(ellipse at center, rgba(215,255,58,0.12) 0%, transparent 70%)",
            transform: "translateX(-50%)",
          }}
        />

        {/* Logo mark */}
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 4 C20.4 4, 12 12.8, 12 24 C12 36, 22 46, 31 58.5 C31.5 59.2, 32.5 59.2, 33 58.5 C42 46, 52 36, 52 24 C52 12.8, 43.6 4, 32 4 Z"
            fill="#D7FF3A"
          />
          <circle cx="32" cy="23" r="6" fill="#0A0A0A" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#FAFAF7",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          viberater
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#7A7A75",
            letterSpacing: "-0.01em",
            display: "flex",
          }}
        >
          know the vibe before you come inside.
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            fontSize: 18,
            color: "#2E2E2C",
            letterSpacing: "0.04em",
            display: "flex",
          }}
        >
          getviberater.co
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: fontBold, weight: 700 },
        { name: "Space Grotesk", data: fontRegular, weight: 400 },
      ],
    }
  );
}
