/**
 * WhatsApp hand-off.
 *
 * `wa.me` is WhatsApp's own universal link: on a phone it opens the app, on a
 * desktop browser it hands off to WhatsApp Web or the installed desktop app.
 * Nothing is ever sent by the link — it only pre-fills the draft, and the
 * person still presses send themselves.
 *
 * Deliberately no API, no token, no server: this file works identically on the
 * static GitHub Pages build and on a hosted server.
 */

/** International format, digits only — no `+`, spaces or dashes. */
export const WA_NUMBER = "6287772743216";
export const WA_DISPLAY = "+62 877-7274-3216";

/**
 * The whole link travels in a URL, and very long URLs are unreliable in
 * Android's intent handler. Capping the free-text field keeps the draft intact
 * rather than silently truncating someone's brief.
 */
export const MESSAGE_MAX = 700;

export interface Inquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  stream: string;
  message: string;
}

export function waLink(text?: string, number: string = WA_NUMBER): string {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Indonesian numbers get written every possible way. Reduce to what wa.me
 * wants: `0877…` and `+62 877…` and `62-877…` all become `62877…`.
 * Returns "" when there is nothing usable, so callers can just check truthiness.
 */
export function toWaNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

/** The message a prospect arrives with — structured so it reads at a glance. */
export function composeInquiry(i: Inquiry): string {
  const lines = ["Halo Genesis Network 👋", "", "Saya ingin membahas kerja sama.", ""];

  lines.push(`Nama: ${i.name.trim()}`);
  lines.push(`Brand: ${i.company.trim()}`);
  lines.push(`Email: ${i.email.trim()}`);
  if (i.stream.trim()) lines.push(`Jenis kerja sama: ${i.stream.trim()}`);

  const note = i.message.trim();
  if (note) lines.push("", note);

  return lines.join("\n");
}
