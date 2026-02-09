import { Navbar } from "@/components";
import Hero from "./Hero";
import { leftMenuItems, rightMenuItems } from "./menuItems";
import ProblemSolutionSection from "./ProblemSolutionSection";

export default function LandingPage() {
  return (
    <div className="min-h-500 overflow-hidden">
      <Navbar leftMenu={leftMenuItems} rightMenu={rightMenuItems} />
      <Hero />
      <ProblemSolutionSection />
    </div>
  );
}
