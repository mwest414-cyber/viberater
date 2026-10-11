# fonts

Web fonts are not served from this folder. They are self-hosted by next/font in src/app/layout.tsx.

The Space Grotesk TTFs here are read only at build time by the two opengraph-image routes
(src/app/opengraph-image.tsx and src/app/blog/[slug]/opengraph-image.tsx) to render social cards.
