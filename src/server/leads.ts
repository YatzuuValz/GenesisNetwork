import "server-only";
import { randomUUID } from "node:crypto";
import { db, type Row } from "./db";
import { MESSAGE_MAX } from "@/lib/whatsapp";

export type LeadStatus = "new" | "contacted" | "won" | "archived";

const STATUSES: LeadStatus[] = ["new", "contacted", "won", "archived"];

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stream: string;
  message: string;
  status: LeadStatus;
  source: string;
  createdAt: string;
}

const str = (v: unknown) => (v == null ? "" : String(v));

function toLead(row: Row): Lead {
  return {
    id: str(row.id),
    name: str(row.name),
    company: str(row.company),
    email: str(row.email),
    phone: str(row.phone),
    stream: str(row.stream),
    message: str(row.message),
    status: str(row.status) as LeadStatus,
    source: str(row.source),
    createdAt: str(row.created_at),
  };
}

/* ------------------------------------------------------------------
   Validation.

   This is the only endpoint on the site that anyone on the internet can
   write to, so nothing from the request is trusted: every field is
   coerced to a string, trimmed, and capped before it reaches SQL.
   ------------------------------------------------------------------ */

export interface LeadInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  stream: string;
  message: string;
}

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Deliberately loose — the point is to reject junk, not to police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeLead(input: unknown): LeadInput | null {
  if (typeof input !== "object" || input === null) return null;
  const raw = input as Record<string, unknown>;

  const value: LeadInput = {
    name: clean(raw.name, 120),
    company: clean(raw.company, 120),
    email: clean(raw.email, 200),
    phone: clean(raw.phone, 30),
    stream: clean(raw.stream, 80),
    message: clean(raw.message, MESSAGE_MAX),
  };

  if (!value.name || !value.company) return null;
  if (!EMAIL.test(value.email)) return null;

  return value;
}

/* ------------------------------------------------------------------------- */

export async function createLead(input: LeadInput, source = "partnership"): Promise<string> {
  const id = randomUUID();

  await db.execute({
    sql: `INSERT INTO leads
      (id, name, company, email, phone, stream, message, status, source, created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?)`,
    args: [
      id,
      input.name,
      input.company,
      input.email,
      input.phone,
      input.stream,
      input.message,
      "new",
      source,
      new Date().toISOString(),
    ],
  });

  return id;
}

/**
 * A missing table is not an error worth a 500: the Studio should still open so
 * the fix (`npm run db:migrate`) is reachable. Same posture as the article reads.
 */
export async function listLeads(): Promise<Lead[]> {
  try {
    const { rows } = await db.execute("SELECT * FROM leads ORDER BY created_at DESC");
    return rows.map((r) => toLead(r as Row));
  } catch (err) {
    console.warn("leads: tabel belum ada? jalankan `npm run db:migrate`", err);
    return [];
  }
}

export function isLeadStatus(v: unknown): v is LeadStatus {
  return typeof v === "string" && (STATUSES as string[]).includes(v);
}

export async function setLeadStatus(id: string, status: LeadStatus): Promise<void> {
  await db.execute({
    sql: "UPDATE leads SET status = ? WHERE id = ?",
    args: [status, id],
  });
}

export async function deleteLead(id: string): Promise<void> {
  await db.execute({ sql: "DELETE FROM leads WHERE id = ?", args: [id] });
}
