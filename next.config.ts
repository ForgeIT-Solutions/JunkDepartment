import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Pin the workspace root to this project — a stray lockfile in the home
  // directory was causing Next to infer the wrong root.
  turbopack: { root: path.resolve(import.meta.dirname) },
};

export default nextConfig;
