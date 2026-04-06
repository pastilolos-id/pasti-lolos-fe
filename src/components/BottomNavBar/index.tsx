"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import Link from "next/link";
import { useState } from "react"; // Tambahan import
import { useSelector } from "react-redux";
import { Icon } from "@/components";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import type { RootState } from "@/lib/redux/store";
import { getAvatarInitials } from "@/lib/utils";
import { menuItems } from "./bottomNavBarData";

export default function BottomNavBar() {
  const user = useSelector((state: RootState) => state.user.user);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({}); // State baru untuk melacak popover per menu

  return (
    <nav
      className="
        fixed bottom-0 left-0 
        w-full 
        bg-primary-5 
        border-t border-primary-4
        z-50
        p-3 flex justify-around
        lg:hidden
      "
    >
      {menuItems.map((menu) => {
        if (menu.subMenu === undefined) {
          return (
            <Link
              key={menu.title}
              href={menu.href}
              className="flex flex-col items-center flex-1 text-neutral-1 hover:text-neutral-2"
            >
              <Icon name={menu.icon} size={24} viewBox="0 0 24 24" />
              <p className="text-c1">{menu.title}</p>
            </Link>
          );
        } else {
          return (
            <Popover
              key={menu.title}
              open={openStates[menu.title] || false} // Controlled open
              onOpenChange={(isOpen) =>
                setOpenStates((prev) => ({ ...prev, [menu.title]: isOpen }))
              } // Update state
            >
              <PopoverTrigger
                className={`flex flex-col items-center flex-1 text-neutral-1 hover:text-neutral-2 cursor-pointer ${openStates[menu.title] ? "justify-center" : ""}`}
              >
                <div
                  className={`flex flex-col items-center w-fit ${openStates[menu.title] ? "border border-primary-4 rounded-full p-3" : ""}`}
                >
                  <Icon name={menu.icon} size={24} viewBox="0 0 24 24" />
                  <p
                    className={`text-c1 ${openStates[menu.title] ? "hidden" : ""}`}
                  >
                    {menu.title}
                  </p>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto bg-primary-5 flex gap-4 rounded-3xl border-0">
                <PopoverPrimitive.Arrow
                  width={41}
                  height={9}
                  className="fill-primary-4 z-20"
                />
                <PopoverPrimitive.Arrow
                  width={40}
                  height={8}
                  className="fill-primary-5 z-20"
                />
                {menu.subMenu.map((subMenu) => {
                  return (
                    <Link
                      key={subMenu.title}
                      href={subMenu.href}
                      className="flex flex-col items-center text-neutral-1 hover:text-neutral-2"
                    >
                      <Icon name={subMenu.icon} size={24} viewBox="0 0 24 24" />
                      <p className="text-c1">{subMenu.title}</p>
                    </Link>
                  );
                })}
              </PopoverContent>
            </Popover>
          );
        }
      })}

      <Link
        href={"/profile"}
        className="flex flex-col items-center flex-1 text-neutral-1 hover:text-neutral-2"
      >
        <Avatar className="border border-white size-6">
          <AvatarImage src={user.profileImg} alt={user.name} />
          <AvatarFallback>{getAvatarInitials(user.name)}</AvatarFallback>
        </Avatar>
        <p className="text-c1">akun</p>
      </Link>
    </nav>
  );
}
