import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

// Served from the custom domain root (robertcoffman.cacherefresh.io), so no
// basePath/assetPrefix subpath is needed — unlike a bare *.github.io/<repo>/ URL.
const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
