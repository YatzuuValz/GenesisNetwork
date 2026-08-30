import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import InstagramShowcase from "@/components/home/InstagramShowcase";
import SeriesStrip from "@/components/home/SeriesStrip";
import Founders from "@/components/home/Founders";
import PartnershipTeaser from "@/components/home/PartnershipTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <InstagramShowcase />
      <SeriesStrip />
      <Founders />
      <PartnershipTeaser />
    </>
  );
}
