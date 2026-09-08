import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AdminApp from "@/components/admin/AdminApp";
import { currentUser } from "@/server/auth";
import { listArticles } from "@/server/articles";
import { listLeads } from "@/server/leads";

/**
 * The Studio needs a server, so it is absent from the static export that ships
 * to GitHub Pages. `ENABLE_STUDIO` opts it in on a host that has one.
 */
const enabled = process.env.NODE_ENV !== "production" || Boolean(process.env.ENABLE_STUDIO);

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!enabled) notFound();

  const user = await currentUser();
  if (!user) redirect("/admin/login");

  const [articles, leads] = await Promise.all([listArticles(), listLeads()]);

  return <AdminApp user={user} articles={articles} leads={leads} />;
}
