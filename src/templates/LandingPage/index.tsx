import { Navbar } from "@/components";
import Features from "./Features";
import Hero from "./Hero";
import { leftMenuItems, rightMenuItems } from "./menuItems";
import Pricing from "./Pricing";
import ProblemSolutionSection from "./ProblemSolutionSection";

export default function LandingPage() {
  return (
    <div className="min-h-500 overflow-hidden">
      <Navbar leftMenu={leftMenuItems} rightMenu={rightMenuItems} />
      <Hero />
      <ProblemSolutionSection />
      <Features />

      {/* Quotes Section */}
      <section className="my-12 md:my-25 lg:my-35 lg:mx-auto p-6 text-white text-center lg:max-w-6xl">
        <h2 className="text-h4 md:text-h2 mb-11">
          Lebih dari Sekadar Latihan Soal
        </h2>
        <p className="text-b1 md:text-4xl lg:text-h3 md:leading-[1.4] tracking-[0] lg:font-normal">
          &ldquo; Kami percaya kelulusan bukan hasil kebetulan. Dengan latihan
          yang terarah, evaluasi yang tepat, dan konsistensi, peluangmu untuk
          lolos jadi lebih besar. &rdquo;
        </p>
      </section>

      <Pricing />
    </div>
  );
}
