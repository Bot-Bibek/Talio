import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  images: {
    remotePatterns: [{ hostname: "gdaprwrev5.ufs.sh", protocol: "https" }],
  },
};

export default nextConfig;
