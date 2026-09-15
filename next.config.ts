import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Stamped at build time so the homepage can state when the page was last
    // rebuilt, rather than implying content is fresher than it is.
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
};

export default nextConfig;
