import { Navbar } from "@/components";
import Hero from "./Hero";
import { leftMenuItems, rightMenuItems } from "./menuItems";

export default function Dashboard() {
  return (
    <div className="h-500 px-3">
      <Navbar leftMenu={leftMenuItems} rightMenu={rightMenuItems} />
      <Hero />
    </div>
  );
}
