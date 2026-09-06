/**
 * Creates (or updates) an admin account.
 *
 * The password is never stored in this repo — it comes from the environment and
 * is written to the database only as a scrypt hash.
 *
 *   ADMIN_EMAIL=nama@genesisnetwork.id ADMIN_PASSWORD='…' node scripts/create-admin.mjs
 */
import { createClient } from "@libsql/client";
import { randomBytes, randomUUID, scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "";
const name = process.env.ADMIN_NAME ?? email.split("@")[0] ?? "Admin";

if (!email || !password) {
  console.error("Butuh ADMIN_EMAIL dan ADMIN_PASSWORD.\n");
  console.error("  ADMIN_EMAIL=kamu@genesisnetwork.id ADMIN_PASSWORD='…' node scripts/create-admin.mjs");
  process.exit(1);
}
if (password.length < 10) {
  console.error("Password minimal 10 karakter.");
  process.exit(1);
}

const db = createClient({
  url: process.env.DATABASE_URL ?? "file:./data/genesis.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const salt = randomBytes(16);
const hash = await scryptAsync(password, salt, 64);
const stored = `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;

const existing = await db.execute({ sql: "SELECT id FROM users WHERE email = ?", args: [email] });

if (existing.rows.length) {
  await db.execute({
    sql: "UPDATE users SET password_hash = ?, name = ? WHERE email = ?",
    args: [stored, name, email],
  });
  console.log(`create-admin: password ${email} diperbarui`);
} else {
  await db.execute({
    sql: "INSERT INTO users (id, email, name, password_hash, created_at) VALUES (?,?,?,?,?)",
    args: [randomUUID(), email, name, stored, new Date().toISOString()],
  });
  console.log(`create-admin: akun ${email} dibuat`);
}
