import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/server/auth";
import { clientIp, createLimiter } from "@/server/rate-limit";

/**
 * Only failed attempts spend the budget, so a person who signs in and out
 * repeatedly is never locked out — someone guessing passwords is.
 */
const failures = createLimiter({ windowMs: 15 * 60_000, max: 10 });

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (failures.blocked(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi dalam 15 menit." },
      { status: 429 },
    );
  }

  const { email, password } = await request.json().catch(() => ({}));

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
  }

  const user = await authenticate(email, password);

  // One message for both cases — saying which half was wrong tells an attacker
  // which emails exist.
  if (!user) {
    failures.hit(ip);
    return NextResponse.json({ error: "Email atau password salah." }, { status: 401 });
  }

  await createSession(user.id);
  return NextResponse.json({ user });
}
