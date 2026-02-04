import { Navbar } from "@/components";
import { leftMenuItems, rightMenuItems } from "./menuItems";

export default function Dashboard() {
  return (
    <div className="min-w-screen h-500 flex items-center justify-center">
      <Navbar leftMenu={leftMenuItems} rightMenu={rightMenuItems} />
    </div>
  );
}
