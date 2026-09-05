"use client";

import type { ReactNode } from "react";

/* Admin UI primitives. Denser and plainer than the marketing site — same tokens,
   but no display type, no blooms, no reveal animations. A CMS is a tool. */

export function Field({
  label,
  hint,
  derived,
  children,
}: {
  label: string;
  hint?: string;
  /** Marks a value the system computes, so nobody types it by hand. */
  derived?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3">
        <span className="u-eyebrow text-bone-500 text-[0.5625rem]">{label}</span>
        {derived && (
          <span className="u-eyebrow text-volt-400/70 text-[0.5rem]">otomatis</span>
        )}
      </span>
      <span className="mt-2 block">{children}</span>
      {hint && <span className="text-bone-600 mt-1.5 block text-[0.6875rem]">{hint}</span>}
    </label>
  );
}

const base =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-bone-100 placeholder:text-bone-700 transition-colors duration-200 focus:border-volt-500/60 focus:bg-white/[0.05] focus:outline-none";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${base} resize-none ${props.className ?? ""}`} />;
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select {...props} className={`${base} ${props.className ?? ""}`}>
      {children}
    </select>
  );
}

/** Read-only value the CMS derives — shown so editors can see it, not edit it. */
export function Derived({ value }: { value: string }) {
  return (
    <div className="u-num text-bone-400 rounded-lg border border-dashed border-white/10 bg-white/[0.015] px-3 py-2 text-sm">
      {value}
    </div>
  );
}

export type Status = "draft" | "published" | "changed";

export const statusLabel: Record<Status, string> = {
  draft: "Draft",
  published: "Terbit",
  changed: "Ada perubahan",
};

export function StatusBadge({ status }: { status: Status }) {
  const tone: Record<Status, string> = {
    draft: "border-white/12 bg-white/[0.04] text-bone-400",
    published: "border-bull/35 bg-bull/10 text-bull",
    changed: "border-volt-500/40 bg-volt-500/12 text-volt-400",
  };
  return (
    <span
      className={`u-eyebrow inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[0.5rem] ${tone[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 py-1"
    >
      <span className="text-bone-300 text-[0.8125rem]">{label}</span>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-volt-500" : "bg-white/12"
        }`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="u-panel rounded-xl">
      <h3 className="u-eyebrow text-bone-500 border-b border-white/[0.07] px-5 py-3.5 text-[0.5625rem]">
        {title}
      </h3>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}
