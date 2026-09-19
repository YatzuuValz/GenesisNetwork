import "server-only";

/**
 * A sliding-window counter per key (an IP address here).
 *
 * In-process: on a single server it is a real limit; on a serverless host each
 * instance counts separately, so it is a speed bump rather than a wall. For the
 * login on a serverless host, a platform rate-limit rule in front of
 * /api/auth/login is the proper wall — this still slows a naive attack.
 */
export function createLimiter({ windowMs, max }: { windowMs: number; max: number }) {
  const hits = new Map<string, number[]>();

  const recent = (key: string, now: number) =>
    (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  return {
    /** Whether `key` has used up its budget. Checking does not spend any. */
    blocked(key: string): boolean {
      const now = Date.now();
      const r = recent(key, now);
      hits.set(key, r);
      return r.length >= max;
    },

    /** Spend one unit of `key`'s budget. */
    hit(key: string): void {
      const now = Date.now();
      const r = recent(key, now);
      r.push(now);
      hits.set(key, r);

      // Keep the map from growing without bound on a long-lived server.
      if (hits.size > 5000) {
        for (const [k, times] of hits) {
          if (times.every((t) => now - t >= windowMs)) hits.delete(k);
        }
      }
    },
  };
}

/**
 * Who is asking, as far as the platform can vouch for it.
 *
 * `cf-connecting-ip` is set by Cloudflare and overwritten on every request, so a
 * client cannot forge it. `x-forwarded-for` is a list that proxies append to:
 * its first entry is whatever the client sent — trusting it let a test bypass
 * the login limit with a made-up header — while the last entry is the one the
 * nearest proxy added. With no proxy in front at all, every header here is the
 * client's to invent, and the limiter is advisory.
 */
export function clientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf;

  const forwarded = request.headers.get("x-forwarded-for");
  const nearest = forwarded?.split(",").at(-1)?.trim();
  return nearest || request.headers.get("x-real-ip") || "unknown";
}
