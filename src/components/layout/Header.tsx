"use client";

import Image from "@/components/ui/Img";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categories, site } from "@/data";
import { Arrow } from "@/components/ui/primitives";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; blurb: string }[];
}

const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Artikel",
    href: "/artikel",
    children: categories.map((c) => ({
      label: c.navLabel,
      href: `/artikel/kategori/${c.slug}`,
      blurb: c.blurb,
    })),
  },
  {
    label: "Free Research",
    href: "/research",
    children: categories.map((c) => ({
      label: `${c.navLabel} Research`,
      href: `/research/kategori/${c.slug}`,
      blurb: c.blurb,
    })),
  },
  { label: "Partnership", href: "/partnership" },
  { label: "About Us", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /** Navigating from inside the header always dismisses whatever is open. */
  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  /** Small grace period so the pointer can travel into the panel. */
  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-ink-950/80 border-b border-white/[0.07] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-8 px-5 sm:px-8">
        <Link
          href="/"
          onClick={closeAll}
          className="group flex items-center gap-3"
          aria-label={site.name}
        >
          <Image
            src="/brand/gn-tile.png"
            alt=""
            width={512}
            height={512}
            priority
            className="size-9 rounded-[11px] ring-1 ring-white/10 transition-all duration-500 group-hover:ring-volt-500/60 group-hover:shadow-[0_0_26px_-4px_rgba(0,95,247,0.75)]"
          />
          <span className="hidden leading-none sm:block">
            <span className="u-display text-bone-50 block text-[0.95rem] tracking-tight">
              Genesis
            </span>
            <span className="u-eyebrow text-bone-500 mt-1 block text-[0.5rem]">Network</span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && hoverOpen(item.label)}
              onMouseLeave={hoverClose}
            >
              <Link
                href={item.href}
                onClick={closeAll}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive(item.href) ? "text-bone-50" : "text-bone-400 hover:text-bone-50"
                }`}
              >
                {item.label}
                {item.children && (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden
                    className={`transition-transform duration-300 ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                {isActive(item.href) && (
                  <span className="bg-volt-500 absolute inset-x-4 -bottom-px h-px shadow-[0_0_12px_1px_rgba(0,95,247,0.9)]" />
                )}
              </Link>

              {item.children && openMenu === item.label && (
                <div className="absolute top-full left-1/2 z-50 w-[330px] -translate-x-1/2 pt-3">
                  <div className="u-panel overflow-hidden rounded-2xl p-2 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeAll}
                        className="group/i block rounded-xl px-3.5 py-3 transition-colors duration-200 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-bone-50 text-[0.9rem] font-semibold">
                            {child.label}
                          </span>
                          <Arrow className="text-bone-600 group-hover/i:text-volt-400 -translate-x-1 opacity-0 transition-all duration-300 group-hover/i:translate-x-0 group-hover/i:opacity-100" />
                        </div>
                        <p className="text-bone-500 mt-1 text-xs leading-relaxed">{child.blurb}</p>
                      </Link>
                    ))}
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      className="text-bone-400 hover:text-bone-50 mt-1 flex items-center justify-between border-t border-white/[0.07] px-3.5 pt-3 pb-2 text-xs transition-colors"
                    >
                      Lihat semua {item.label.toLowerCase()}
                      <Arrow />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/partnership"
            onClick={closeAll}
            className="border-volt-500/45 bg-volt-500/10 text-bone-50 hover:border-volt-500 hover:bg-volt-500/20 hidden items-center gap-2 rounded-full border px-4.5 py-2 text-sm font-semibold transition-all duration-300 sm:inline-flex"
          >
            Kerja sama
            <Arrow className="text-volt-400" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            className="text-bone-200 grid size-9 place-items-center rounded-lg border border-white/10 transition-colors hover:bg-white/5 lg:hidden"
          >
            <span className="relative block h-[9px] w-4">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${
                  mobileOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`bg-ink-950/97 overflow-hidden border-t border-white/[0.07] backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="max-h-[80vh] overflow-y-auto px-5 py-6 sm:px-8">
          {nav.map((item) => (
            <div key={item.label} className="border-b border-white/[0.06] py-1 last:border-0">
              <Link
                href={item.href}
                onClick={closeAll}
                className={`u-display block py-3 text-2xl ${
                  isActive(item.href) ? "text-volt-400" : "text-bone-50"
                }`}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="flex flex-wrap gap-2 pb-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeAll}
                      className="text-bone-400 hover:text-bone-50 rounded-full border border-white/10 px-3 py-1.5 text-xs transition-colors hover:border-white/25"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/partnership"
            onClick={closeAll}
            className="bg-volt-500 mt-7 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
          >
            Mulai kerja sama <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}
