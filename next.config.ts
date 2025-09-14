import type { NextConfig } from "next";
import { config } from "process";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8888",
        pathname: "/mage_Blog/**"
      }
    ]
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
