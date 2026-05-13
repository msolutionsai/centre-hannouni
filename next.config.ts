import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force the apex domain as the single canonical origin. The www variant
  // currently answers 200 on Vercel, which caused Google to flag duplicate
  // pages in Search Console even though the canonical link tag points to
  // the apex. 308 preserves method/body so POSTs to the API also redirect.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.centrehannouni.com" }],
        destination: "https://centrehannouni.com/:path*",
        permanent: true,
      },
    ];
  },

  // Stop search engines from indexing the JSON API surface. Robots.txt
  // disallows /api/* but Google occasionally indexes URLs it has seen
  // referenced elsewhere; the noindex header is the authoritative signal.
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
