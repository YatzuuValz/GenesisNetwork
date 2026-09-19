import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminApp from "@/components/admin/AdminApp";
import LoginForm from "@/components/admin/LoginForm";
import { currentUser } from "@/server/auth";
import { listArticles } from "@/server/articles";
import { listLeads } from "@/server/leads";

/**
 * The Studio needs a server, so the static export that ships to GitHub Pages
 * leaves it out. Every server build has it; the login is what protects it.
 *
 * This used to be opt-in through an ENABLE_STUDIO variable, which had to be set
 * at build time — set only at runtime, the page stayed a prerendered 404.
 */
const enabled = process.env.DEPLOY_TARGET !== "github-pages";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!enabled) notFound();

  // Signed out, the Studio shows its login form in place rather than redirecting
  // to /admin/login. Behind vinext's page cache on Cloudflare a server redirect
  // loops until it fails ("Too many redirects", cloudflare/vinext#3243, fix not
  // yet released) — rendering the form sidesteps it on every host.
  const user = await currentUser();
  if (!user) return <LoginForm />;

  const [articles, leads] = await Promise.all([listArticles(), listLeads()]);

  return <AdminApp user={user} articles={articles} leads={leads} />;
}
