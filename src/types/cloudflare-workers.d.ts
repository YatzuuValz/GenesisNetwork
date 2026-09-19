/**
 * `cloudflare:workers` exists only inside Cloudflare's runtime. This is the
 * sliver of it the D1 driver uses; the bindings themselves are declared in
 * wrangler.jsonc and narrowed where they are read.
 */
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>;
}
