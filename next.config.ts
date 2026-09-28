import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@neondatabase/serverless", "@aws-sdk/client-s3"],
  webpack: (config, { dev }) => {
    if (dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        three$: path.resolve(
          process.cwd(),
          "node_modules/three/build/three.module.min.js"
        ),
      };
    }
    return config;
  },
};

export default nextConfig;
