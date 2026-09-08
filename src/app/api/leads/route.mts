import { NextResponse } from "next/server";
import { currentUser } from "@/server/auth";
import { createLead, listLeads, normalizeLead } from "@/server/leads";

/**
 * The partnership inquiry endpoint.
 *
 * POST is the one route on this site that is intentionally unauthenticated —
 * it is a public form. Three cheap layers keep it from becoming an open door:
 *
 *   1. a honeypot field the form hides from people (bots fill it in)
 *   2. per-IP rate limiting, below
 *   3. strict validation and length caps in @/server/leads
 *
 * GET stays behind the session, because reading other people's contact details
 * is not public business.
 */

const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

/**
 * In-process, so on a serverless host each instance counts separately — this
 * is a speed bump against a naive flood, not a wall. The honeypot and the size
 * caps are what actually keep the table clean.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived server.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "terlalu banyak pengajuan" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);

  // A filled honeypot means a bot. Answer 201 anyway: telling it apart from a
  // real submission only teaches the next attempt to avoid the trap.
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const input = normalizeLead(body);
  if (!input) return NextResponse.json({ error: "data tidak lengkap" }, { status: 400 });

  await createLead(input);
  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  if (!(await currentUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ leads: await listLeads() });
}
