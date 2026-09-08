import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChromeGate from "@/components/layout/ChromeGate";
import { withBasePath } from "@/components/ui/Img";
import { site } from "@/data";
import { getPublishedArticles } from "@/server/articles";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://genesisnetwork.id"),
  title: {
    default: `${site.name} — Media finansial independen Indonesia`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["crypto", "saham", "makroekonomi", "literasi finansial", "Indonesia", "IHSG"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: `${site.name} — Crypto · Saham · Makro`,
    description: site.description,
  },
  icons: {
    icon: withBasePath("/brand/gn-tile.png"),
    apple: withBasePath("/brand/gn-tile.png"),
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // One query for the whole shell: nav and footer both need to know whether the
  // Artikel section has anything in it yet.
  const hasArticles = (await getPublishedArticles()).length > 0;

  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-ink-950 flex min-h-full flex-col">
        <ChromeGate
          header={<Header hasArticles={hasArticles} />}
          footer={<Footer hasArticles={hasArticles} />}
        >
          {children}
        </ChromeGate>
      </body>
    </html>
  );
}
