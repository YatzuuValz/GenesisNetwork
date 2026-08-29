import Link from "next/link";
import { categories } from "@/data";

export default function CategoryTabs({
  base,
  active,
  counts,
}: {
  /** "/artikel" or "/research" */
  base: string;
  active?: string;
  counts?: Record<string, number>;
}) {
  const items = [
    { slug: "", label: "Semua", href: base },
    ...categories.map((c) => ({
      slug: c.slug,
      label: c.navLabel,
      href: `${base}/kategori/${c.slug}`,
    })),
  ];

  return (
    <nav className="flex flex-wrap gap-2.5" aria-label="Filter kategori">
      {items.map((item) => {
        const isActive = (active ?? "") === item.slug;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`u-eyebrow inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.625rem] transition-all duration-300 ${
              isActive
                ? "border-volt-500/50 bg-volt-500/12 text-volt-400"
                : "text-bone-500 hover:text-bone-100 border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
            }`}
          >
            {item.label}
            {counts?.[item.slug] !== undefined && (
              <span className={isActive ? "text-volt-400/60" : "text-bone-700"}>
                {counts[item.slug]}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
