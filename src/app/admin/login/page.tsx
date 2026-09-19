import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@/server/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Masuk · Studio", robots: { index: false } };

/**
 * Kept for old bookmarks: /admin itself shows the form when signed out. No
 * server redirects here — see the note in ../page.tsx.
 */
export default async function LoginPage() {
  if (process.env.DEPLOY_TARGET === "github-pages") notFound();

  const user = await currentUser();
  if (!user) return <LoginForm />;

  return (
    <div className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-sm text-center">
        <p className="text-bone-400 text-sm">
          Kamu sudah masuk sebagai <span className="text-bone-100">{user.name}</span>.
        </p>
        <Link
          href="/admin"
          className="bg-volt-500 hover:bg-volt-400 mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          Buka Studio
        </Link>
      </div>
    </div>
  );
}
