import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Stamped at build time so the homepage can state when the page was last
    // rebuilt, rather than implying content is fresher than it is.
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  async redirects() {
    return [
      // The homepage is the store now: it lists all 23 guides and both
      // bundles. /store had become a second, worse copy of it. 308 so the
      // move is permanent and the link equity follows. /store/success is a
      // different route and is untouched — it is where a buyer lands.
      { source: '/store', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
