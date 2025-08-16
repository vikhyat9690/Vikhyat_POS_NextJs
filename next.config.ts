import type { NextConfig } from "next";
import { config } from "process";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.module.rules.push({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: ["graphql-tag/loader"],
    })
    return config;
  }
};

export default nextConfig;
