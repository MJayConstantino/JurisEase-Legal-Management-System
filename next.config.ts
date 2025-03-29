import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: [
      "src/app",
      "src/components"
    ],
  },
};

export default nextConfig;
