import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import LatestArticles from "@/components/home/LatestArticles";
import SeriesStrip from "@/components/home/SeriesStrip";
import ResearchTeaser from "@/components/home/ResearchTeaser";
import Founders from "@/components/home/Founders";
import PartnershipTeaser from "@/components/home/PartnershipTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <LatestArticles />
      <SeriesStrip />
      <ResearchTeaser />
      <Founders />
      <PartnershipTeaser />
    </>
  );
}
