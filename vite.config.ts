import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { cdnAdapter } from "@vinext/cloudflare/cache/cdn-adapter";

/**
 * The Cloudflare build (vinext). The GitHub Pages export still builds with
 * `next build` — see next.config.ts — so the two coexist until Pages retires.
 *
 * `cdnAdapter` puts rendered pages in Workers Cache: a reader's request is
 * answered at Cloudflare's edge without running the Worker, so it costs no CPU
 * against the Free plan's 10 ms. `revalidatePath` purges it after an edit.
 */
export default defineConfig({
  plugins: [
    vinext({
      cache: { cdn: cdnAdapter() },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
