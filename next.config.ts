import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Empty on the normal build; "/<client-name>" on the demo build (demo.thrio.co/<client-name>).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Photos change rarely: let browsers and the CDN keep them for a week instead of re-checking each visit.
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
