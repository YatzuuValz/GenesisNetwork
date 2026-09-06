import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { db } from "./db";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

const KEYLEN = 64;
const SESSION_COOKIE = "gn_session";
const SESSION_DAYS = 14;

/* ---------------------------------------------------------------- passwords */

/** Stored as `scrypt$<salt hex>$<hash hex>` — salt is per-user and random. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, KEYLEN);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;

  const expected = Buffer.from(hashHex, "hex");
  const actual = await scryptAsync(password, Buffer.from(saltHex, "hex"), KEYLEN);

  // Constant-time: a length check first, because timingSafeEqual throws on a
  // mismatch and that throw would itself leak information.
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

/* ----------------------------------------------------------------- sessions */

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000);

  await db.execute({
    sql: "INSERT INTO sessions (token, user_id, expires_at) VALUES (?,?,?)",
    args: [token, userId, expires.toISOString()],
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true, // never readable from JavaScript
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.execute({ sql: "DELETE FROM sessions WHERE token = ?", args: [token] });
  }
  jar.delete(SESSION_COOKIE);
}

/** The only way the app learns who is signed in. Returns null when nobody is. */
export async function currentUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const { rows } = await db.execute({
    sql: `SELECT u.id, u.email, u.name, s.expires_at
            FROM sessions s JOIN users u ON u.id = s.user_id
           WHERE s.token = ?`,
    args: [token],
  });

  const row = rows[0];
  if (!row) return null;

  // Expired sessions are removed rather than merely rejected.
  if (new Date(String(row.expires_at)) < new Date()) {
    await db.execute({ sql: "DELETE FROM sessions WHERE token = ?", args: [token] });
    return null;
  }

  return { id: String(row.id), email: String(row.email), name: String(row.name) };
}

export async function authenticate(email: string, password: string): Promise<SessionUser | null> {
  const { rows } = await db.execute({
    sql: "SELECT id, email, name, password_hash FROM users WHERE email = ?",
    args: [email.trim().toLowerCase()],
  });

  const row = rows[0];

  // Hash even when the user is missing, so a bad email and a bad password take
  // the same time and can't be told apart.
  const stored = row ? String(row.password_hash) : "scrypt$00$00";
  const ok = await verifyPassword(password, stored);

  if (!row || !ok) return null;
  return { id: String(row.id), email: String(row.email), name: String(row.name) };
}
