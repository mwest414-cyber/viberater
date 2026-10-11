import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Page transitions between routes via React <ViewTransition> (wrapped in app/layout.tsx).
  experimental: {
    viewTransition: true,
  },
  outputFileTracingIncludes: {
    "/blog/**": ["./content/posts/**/*"],
  },
};

export default nextConfig;
