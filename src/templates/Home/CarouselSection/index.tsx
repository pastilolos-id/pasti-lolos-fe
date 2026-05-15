import Image from "next/image";
import carouselImage from "@/assets/images/home-page/hero-1.png";
import textHero from "@/assets/images/home-page/hero-text.png";
import textHeroMobile from "@/assets/images/home-page/hero-text-mobile.png";
import type { HomeBannerViewModel } from "../mapHomeFromApi";

interface CarouselSectionProps {
  heroBanner: HomeBannerViewModel | null;
  banners: HomeBannerViewModel[];
}

export default function CarouselSection({
  heroBanner,
  banners,
}: CarouselSectionProps) {
  const selectedBanner = heroBanner ?? banners[0] ?? null;
  const hasRemoteImage =
    selectedBanner?.imageUrl != null && selectedBanner.imageUrl.length > 0;

  return (
    <section className="relative flex justify-center w-full text-white bg-[linear-gradient(117.08deg,#25A0AB_33.09%,#1C2954_53.66%,#448AFF_77.66%)] rounded-[38px] h-91 sm:h-101">
      {hasRemoteImage ? (
        <Image
          src={selectedBanner.imageUrl as string}
          alt={selectedBanner?.title ?? "Banner Home"}
          className="object-cover object-[center_90%] rounded-4xl"
          fill
          loader={({ src }) => src}
          unoptimized
        />
      ) : (
        <Image
          src={carouselImage}
          alt="Banner Home"
          className="object-cover object-[center_90%] rounded-4xl"
          fill
          priority
        />
      )}
      <Image
        src={textHero}
        alt="Hero Text"
        className="absolute bottom-20 hidden sm:block z-10"
      />
      <Image
        src={textHeroMobile}
        alt="Hero Text Mobile"
        className="absolute bottom-20  block sm:hidden z-10"
      />
    </section>
  );
}
