import Link from "next/link";
import { Button, CollapsibleContent } from "@/components/ui";
import type { menuListContainerType } from "./index";

export default function MobileMenuList({
  leftMenu,
  rightMenu,
}: typeof CollapsibleContent & menuListContainerType) {
  return (
    <CollapsibleContent className="flex flex-col gap-5 mt-5">
      <div className="flex flex-col gap-4">
        {leftMenu.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant="secondary"
              className="w-full h-auto text-[1.25rem] font-semi bold text-center rounded-full py-4 leading-5"
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rightMenu.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant={item.label === "Daftar" ? "primary" : "secondary"}
              className="w-full h-auto text-[1.25rem] font-semibold text-center rounded-full py-4 leading-5"
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </CollapsibleContent>
  );
}
