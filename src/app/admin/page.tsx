import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminApp from "@/components/admin/AdminApp";

/**
 * Development only. A convincing but fake admin panel on a public finance site
 * would be both confusing and a way to read the articles we deliberately
 * switched off, so the production build renders 404 here and ships no content.
 */
const enabled = process.env.NODE_ENV !== "production";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  if (!enabled) notFound();
  return <AdminApp />;
}
