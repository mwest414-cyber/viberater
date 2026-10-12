import type { Metadata } from "next";

const SITE = "https://www.getviberater.co";
const IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "viberater: know the vibe before you come inside." };

// Share tags (link previews in messages and social, plus og:url) for one page.
// Next replaces the whole openGraph/twitter object per page rather than merging it with the layout's,
// so every indexable page sets its own with this, or it would show the homepage's title and URL.
export function shareMeta({ title, description, path }: { title: string; description: string; path: string }): Pick<
  Metadata,
  "openGraph" | "twitter"
> {
  const url = path === "/" ? SITE : `${SITE}${path}`;
  return {
    openGraph: { type: "website", siteName: "viberater", url, title, description, images: [IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [IMAGE.url] },
  };
}
