import Image from "next/image";
import Link from "next/link";
import { categories, site } from "@/data";
import { Arrow, Bloom } from "@/components/ui/primitives";

const columns = [
  {
    title: "Artikel",
    links: categories.map((c) => ({ label: c.navLabel, href: `/artikel/kategori/${c.slug}` })),
  },
  {
    title: "Free Research",
    links: categories.map((c) => ({
      label: `${c.navLabel} Research`,
      href: `/research/kategori/${c.slug}`,
    })),
  },
  {
    title: "Perusahaan",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Partnership", href: "/partnership" },
      { label: "Media Kit", href: "/partnership#formats" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: site.instagram, handle: site.instagramHandle },
  { label: "TikTok", href: "https://www.tiktok.com/@genesisnetwork.id", handle: site.tiktokHandle },
  { label: "YouTube", href: "https://www.youtube.com/@genesisnetwork", handle: site.youtubeHandle },
];

export default function Footer() {
  return (
    <footer className="u-noise relative isolate mt-32 overflow-hidden border-t border-white/[0.07]">
      <Bloom className="-top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2" opacity={0.16} />

      <div className="relative mx-auto max-w-[1320px] px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/gn-tile.png"
                alt=""
                width={512}
                height={512}
                className="size-10 rounded-xl ring-1 ring-white/10"
              />
              <span className="leading-none">
                <span className="u-display text-bone-50 block text-base">Genesis</span>
                <span className="u-eyebrow text-bone-500 mt-1 block text-[0.5rem]">Network</span>
              </span>
            </Link>

            <p className="text-bone-400 mt-7 max-w-sm text-[0.95rem] leading-relaxed">
              Media finansial independen untuk generasi muda Indonesia.{" "}
              <span className="u-accent text-bone-200">
                Indonesia deserves better financial literacy.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-bone-400 hover:text-bone-50 flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04]"
                >
                  {s.label}
                  <span className="text-bone-600 group-hover:text-volt-400 transition-colors">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="u-eyebrow text-bone-600">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-bone-400 hover:text-bone-50 text-sm transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/[0.07] pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-bone-600 text-xs">
              © {new Date().getFullYear()} {site.legalName}. Seluruh hak cipta dilindungi.
            </p>
            <p className="text-bone-600 max-w-xl text-[0.7rem] leading-relaxed">
              Seluruh konten Genesis Network bersifat edukatif dan bukan merupakan saran investasi.
              Keputusan investasi sepenuhnya menjadi tanggung jawab pembaca.
            </p>
          </div>

          <a
            href={`mailto:${site.partnershipEmail}`}
            className="group text-bone-300 hover:text-bone-50 inline-flex items-center gap-2 text-sm transition-colors"
          >
            {site.partnershipEmail}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* oversized wordmark, cropped by the viewport edge */}
      <div
        aria-hidden
        className="u-mask-fade-b pointer-events-none -mt-4 select-none overflow-hidden"
      >
        <div className="u-display text-center text-[clamp(3.5rem,13.5vw,12rem)] leading-[0.85] whitespace-nowrap text-white/[0.035]">
          GENESIS NETWORK
        </div>
      </div>
    </footer>
  );
}
