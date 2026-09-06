import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@/server/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Masuk · Studio", robots: { index: false } };

export default async function LoginPage() {
  if (process.env.NODE_ENV === "production" && !process.env.ENABLE_STUDIO) notFound();
  if (await currentUser()) redirect("/admin");
  return <LoginForm />;
}
