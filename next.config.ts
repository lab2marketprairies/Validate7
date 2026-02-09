import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removing output: 'export' to support Clerk Authentication
  // images: {
  //   unoptimized: true,
  // },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
