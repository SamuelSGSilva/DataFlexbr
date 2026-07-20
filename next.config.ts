import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

type ImageConfig = {
  remotePatterns?: RemotePattern[];
};

type NextConfigWithImages = NextConfig & ImageConfig;

const nextConfig: NextConfig = {
  output: "standalone",
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
