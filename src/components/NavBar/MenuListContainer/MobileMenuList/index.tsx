"use server";

import { cookies } from "next/headers";
import Link from "next/link";
import { Button, CollapsibleContent } from "@/components/ui";
import type { menuListContainerType } from "../index";
import NavbarAvatar from "../NavbarAvatar";

export default async function MobileMenuList({
  leftMenu,
  rightMenu,
}: typeof CollapsibleContent & menuListContainerType) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <CollapsibleContent className="flex flex-col gap-5 mt-5 md:hidden">
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
        {token ? (
          <NavbarAvatar className="w-full" />
        ) : (
          rightMenu.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant={item.label === "Daftar" ? "primary" : "secondary"}
                className="w-full h-auto text-[1.25rem] font-semibold text-center rounded-full py-4 leading-5"
              >
                {item.label}
              </Button>
            </Link>
          ))
        )}
      </div>
    </CollapsibleContent>
  );
}
