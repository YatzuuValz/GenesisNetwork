"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The Studio route needs its own shell, not the marketing header and footer.
 *
 * Header and Footer are rendered on the server and passed in as props, so this
 * client component decides whether to show them without either of them having
 * to become a client component itself.
 */
export default function ChromeGate({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const bare = usePathname()?.startsWith("/admin") ?? false;

  if (bare) return <main className="flex-1">{children}</main>;

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
