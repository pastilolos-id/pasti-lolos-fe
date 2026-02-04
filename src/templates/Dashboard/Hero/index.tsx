import Image from "next/image";
import HeroImage from "@/assets/images/dashboard/hero.png";
import { Icon } from "@/components";
import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <>
      <div className="mt-38.25 w-full flex flex-col gap-6 text-white ">
        <h1 className="text-4xl font-bold leading-tight">
          <p>Pendamping</p>
          <p>Belajarmu Menuju</p>
          <p>
            Seleksi <span className="text-yellow">BUMN & CPNS</span>
          </p>
        </h1>
        <div className="w-[35ch]">
          <p className="text-b1 tracking-[-4%]">
            Buat tujuanmu tercapai dengan latihanmu yang maksimal
          </p>
        </div>
        <Button className="py-4 ">Coba Sekarang</Button>
      </div>

      <div className="relative z-0">
        <Image className="ml-auto" src={HeroImage} alt="dashboard hero" />
        <Icon
          className="absolute top-24 left-[calc(50%-46.18px)] z-0"
          name="bumn"
          size={92.36}
        />
        <Icon
          className="absolute bottom-1/5 left-1/4"
          name="abdi-negara"
          size={50}
        />
      </div>
    </>
  );
}
