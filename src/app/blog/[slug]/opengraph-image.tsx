import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import fs from "fs";
import path from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "viberater";

  const fontBold = fs.readFileSync(
    path.join(process.cwd(), "public/fonts/SpaceGrotesk-Bold.ttf")
  );
  const fontMedium = fs.readFileSync(
    path.join(process.cwd(), "public/fonts/SpaceGrotesk-Medium.ttf")
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
          justifyContent: "space-between",
          padding: "64px 80px",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "SpaceGrotesk",
              fontWeight: 700,
              fontSize: 22,
              color: "#D7FF3A",
              letterSpacing: "-0.03em",
            }}
          >
            viberater
          </span>
          <span style={{ color: "#2E2E2C", fontSize: 16, fontFamily: "SpaceGrotesk" }}>·</span>
          <span
            style={{
              fontFamily: "SpaceGrotesk",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.12em",
              color: "#7A7A75",
              textTransform: "uppercase",
            }}
          >
            blog
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "SpaceGrotesk",
            fontWeight: 700,
            fontSize: title.length > 50 ? 52 : title.length > 35 ? 60 : 72,
            color: "#FAFAF7",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 960,
          }}
        >
          {title}
        </div>

        {/* Bottom */}
        <div
          style={{
            fontFamily: "SpaceGrotesk",
            fontWeight: 500,
            fontSize: 16,
            color: "#7A7A75",
            letterSpacing: "0.02em",
          }}
        >
          getviberater.co
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SpaceGrotesk", data: fontBold, weight: 700, style: "normal" },
        { name: "SpaceGrotesk", data: fontMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
