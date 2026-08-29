import { ButtonLink, Bloom, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="u-noise relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <div aria-hidden className="u-grid-field u-mask-fade-b absolute inset-0 opacity-45" />
      <Bloom className="top-1/4 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2" opacity={0.22} />

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
        <Eyebrow dot>Error 404</Eyebrow>
        <h1 className="u-display text-bone-50 mt-6 text-[clamp(2.6rem,7vw,5rem)]">
          Halaman ini tidak
          <br />
          <span className="u-accent text-volt-400 font-normal">ada di indeks kami.</span>
        </h1>
        <p className="text-bone-400 mt-7 max-w-md text-[1.0125rem] leading-relaxed">
          Mungkin tautannya berubah, atau kontennya belum terbit. Coba mulai dari halaman utama.
        </p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <ButtonLink href="/">Kembali ke home</ButtonLink>
          <ButtonLink href="/artikel" variant="outline">
            Lihat artikel
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
