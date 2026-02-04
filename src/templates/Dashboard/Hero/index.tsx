import Image from "next/image";
import HeroImageMobile from "@/assets/images/dashboard/hero-mobile.png";
import HeroImageTablet from "@/assets/images/dashboard/hero-tablet.png";
import { Icon } from "@/components";
import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <>
      <div className="mt-38.25 w-full flex flex-col gap-y-6 md:gap-0 text-white ">
        <h1 className="text-4xl md:text-h1 font-bold leading-tight md:mb-8">
          <p>Pendamping</p>
          <p>Belajarmu Menuju</p>
          <p>
            Seleksi <span className="text-yellow">BUMN & CPNS</span>
          </p>
        </h1>

        <div className="w-[35ch] md:w-[40ch] md:mb-11.25">
          <p className="text-b1 md:text-h4 font-normal tracking-[-0.4] lg:tracking-[0]">
            Buat tujuanmu tercapai dengan latihanmu yang maksimal
          </p>
        </div>

        <Button className="py-4 md:w-fit px-8">Coba Sekarang</Button>
      </div>

      <div className="relative z-0 md:-mt-54 lg:-mt-140 -mr-3 md:-mr-6 lg:-mr-17.5">
        <Image
          className="ml-auto md:hidden lg:block"
          src={HeroImageMobile}
          alt="dashboard hero"
        />
        <Image
          className="md:block lg:hidden hidden w-full"
          src={HeroImageTablet}
          alt="dashboard hero"
        />
        <Icon
          className="absolute top-24 md:top-54 lg:top-40 left-[calc(50%-46.18px)] lg:left-auto lg:right-96 z-0"
          name="bumn"
          size={92.36}
        />
        <Icon
          className="absolute bottom-1/5 md:bottom-1/3 lg:bottom-2/5 left-1/4 lg:left-auto lg:right-162"
          name="abdi-negara"
          size={50}
        />
      </div>
    </>
  );
}
