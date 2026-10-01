import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Les visuels du site vivent sur R2, pas dans le dépôt. Sans cette
    // autorisation, next/image répond 400 sur une source distante.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-d3c23de249e5498eab4f6104d29b82ab.r2.dev",
        pathname: "/**",
      },
    ],
    // Next 16 impose de lister les qualités autorisées. 82 plutôt que les 75
    // par défaut : ces pages sont des pages d'arrivée publicitaires, et la
    // marge de qualité coûte quelques kilo-octets sur des images qui passent
    // déjà de 1,8 Mo à moins de 100 Ko.
    qualities: [75, 82],
  },
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
