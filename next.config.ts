import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/blog/.*": ["./content/posts/**/*"],
  },
};

export default nextConfig;
