import type { NextConfig } from "next";

/** Server-side rewrite target only (LAN URL ok). Client uses NEXT_PUBLIC_API_URL=/api/backend */
const backendProxyTarget =
  typeof process.env.BACKEND_PROXY_TARGET === "string"
    ? process.env.BACKEND_PROXY_TARGET.replace(/\/$/, "")
    : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    if (!backendProxyTarget.startsWith("http")) return [];
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendProxyTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
