import { NextResponse } from "next/server";
import { authenticate, createSession } from "@/server/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
  }

  const user = await authenticate(email, password);

  // One message for both cases — saying which half was wrong tells an attacker
  // which emails exist.
  if (!user) {
    return NextResponse.json({ error: "Email atau password salah." }, { status: 401 });
  }

  await createSession(user.id);
  return NextResponse.json({ user });
}
