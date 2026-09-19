import { NextResponse } from "next/server";
import { currentUser } from "@/server/auth";
import { createLead, listLeads, normalizeLead } from "@/server/leads";
import { clientIp, createLimiter } from "@/server/rate-limit";

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

/** Every submission spends the budget, valid or not — junk is what it is for. */
const submissions = createLimiter({ windowMs: 10 * 60_000, max: 5 });

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (submissions.blocked(ip)) {
    return NextResponse.json({ error: "terlalu banyak pengajuan" }, { status: 429 });
  }
  submissions.hit(ip);

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
