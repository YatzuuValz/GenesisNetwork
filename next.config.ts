import type { NextConfig } from "next";

/**
 * GitHub Pages needs a fully static export served from a repo subpath, and it
 * has no image-optimization server. Those settings would also leak into local
 * dev (and into any future Vercel/Payload deploy, where they'd be wrong), so
 * they're applied only when DEPLOY_TARGET=github-pages — which the Pages
 * workflow sets and nothing else does.
 */
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

/** Single source of truth: also read by components/ui/Img.tsx via NEXT_PUBLIC_BASE_PATH. */
const basePath = isGithubPages ? "/GenesisNetwork" : "";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        // Emit /artikel/index.html so nested routes resolve without a server.
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
