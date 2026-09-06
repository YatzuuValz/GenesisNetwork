"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "@/components/ui/Img";
import { site } from "@/data";
import { Arrow } from "@/components/ui/primitives";
import { Field, TextInput } from "./fields";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).catch(() => null);

    if (res?.ok) {
      // Refresh so the server re-reads the new session cookie.
      router.replace("/admin");
      router.refresh();
      return;
    }

    const data = await res?.json().catch(() => null);
    setError(data?.error ?? "Tidak bisa terhubung ke server.");
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen place-items-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/gn-tile.png"
            alt=""
            width={512}
            height={512}
            className="size-9 rounded-lg ring-1 ring-white/10"
          />
          <span className="u-eyebrow text-bone-400 text-[0.5625rem]">
            {site.name} · Studio
          </span>
        </div>

        <h1 className="u-display text-bone-50 mt-8 text-3xl">Masuk</h1>
        <p className="text-bone-500 mt-2.5 text-[0.8125rem]">
          Halaman ini hanya untuk tim redaksi Genesis.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Field label="Email">
            <TextInput
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Password">
            <TextInput
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          {error && (
            <p
              role="alert"
              className="border-bear/35 bg-bear/10 text-bone-100 rounded-lg border px-3.5 py-2.5 text-[0.8125rem]"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="group bg-volt-500 hover:bg-volt-400 mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
          >
            {busy ? "Memeriksa…" : "Masuk"}
            {!busy && <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />}
          </button>
        </form>
      </div>
    </div>
  );
}
