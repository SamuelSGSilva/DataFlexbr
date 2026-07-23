import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

type ImageConfig = {
  remotePatterns?: RemotePattern[];
};

type NextConfigWithImages = NextConfig & ImageConfig;

const nextConfig: NextConfig = {
  output: "standalone",
  // Site fica atrás do nginx + Cloudflare; sem isto o Next bloqueia os
  // Server Actions (cadastro/login) por divergência entre origin e
  // x-forwarded-host.
  experimental: {
    serverActions: {
      allowedOrigins: ["dataflexbr.com", "www.dataflexbr.com"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dataflexbr.com",
      },
    ],
  },
};

export default nextConfig;
