import Link from "next/link";
import { Button } from "@/components/ui";
import type { menuListContainerType } from "./index";

export default function DesktopMenuList({
  leftMenu,
  rightMenu,
}: menuListContainerType) {
  return (
    <div className="hidden md:flex justify-between items-center grow ml-8">
      <div className="flex items-center gap-4 text-xl font-semibold">
        {leftMenu.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="w-full h-auto text-[1.25rem] font-semi bold text-center rounded-full py-4 leading-5">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        {rightMenu.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant={item.label === "Daftar" ? "primary" : "secondary"}
              className="w-28 h-auto text-[1.25rem] font-semibold text-center rounded-full py-4 leading-5"
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
