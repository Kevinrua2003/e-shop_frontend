import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Backend local (blobs de imágenes).
      { protocol: "http", hostname: "localhost" },
      // Backend desplegado.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
