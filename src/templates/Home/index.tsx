import CarouselSection from "./CarouselSection";
import FlashSaleSection from "./FlashSaleSection";
import RankingSection from "./RankingSection";

export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row gap-4">
      <RankingSection />
      <div className="flex flex-col gap-6 order-2 md:order-1 w-full">
        <CarouselSection />
        <FlashSaleSection />
      </div>
    </main>
  );
}
