import NextImage, { type ImageProps } from "next/image";

/**
 * Drop-in replacement for next/image that prefixes root-relative sources with
 * the deploy base path.
 *
 * Next normally injects `basePath` into the optimizer URL for us, but the
 * GitHub Pages build sets `images.unoptimized`, which bypasses the loader
 * entirely and emits `src` verbatim — so `/media/foo.webp` would 404 under
 * `/GenesisNetwork/`. Prefixing here is safe because `basePath` is only ever
 * set together with `unoptimized` (see next.config.ts); on dev, Vercel, or any
 * future server deploy NEXT_PUBLIC_BASE_PATH is empty and this is a no-op.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return path.startsWith("/") ? `${BASE}${path}` : path;
}

export default function Img({ src, ...rest }: ImageProps) {
  return <NextImage src={typeof src === "string" ? withBasePath(src) : src} {...rest} />;
}
