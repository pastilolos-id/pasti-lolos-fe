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
import { useLogout } from "@/lib/hooks/useLogout";
import type { RootState } from "@/lib/redux/store";
import { getAvatarInitials } from "@/lib/utils";
import { menuItems } from "./bottomNavBarData";

export default function BottomNavBar() {
  const user = useSelector((state: RootState) => state.user.user);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const [accountOpen, setAccountOpen] = useState(false);
  const {
    performLogout,
    isLoading: isLogoutLoading,
    errorMessage,
  } = useLogout();

  return (
    <nav
      className={`
        fixed bottom-0 left-0 
        w-full 
        bg-primary-5 
        border-t border-primary-4
        z-50
        p-3 flex justify-around
        lg:hidden
      `}
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

      <Popover open={accountOpen} onOpenChange={setAccountOpen}>
        <PopoverTrigger
          className={`flex flex-col items-center flex-1 text-neutral-1 hover:text-neutral-2 cursor-pointer ${accountOpen ? "justify-center" : ""}`}
        >
          <div
            className={`flex flex-col items-center w-fit ${accountOpen ? "border border-primary-4 rounded-full p-3" : ""}`}
          >
            <Avatar className="border border-white size-6">
              <AvatarImage
                src={user.profilePictureUrl ?? undefined}
                alt={user.fullName ?? user.username}
              />
              <AvatarFallback>
                {getAvatarInitials(user.fullName ?? user.username)}
              </AvatarFallback>
            </Avatar>
            <p className={`text-c1 ${accountOpen ? "hidden" : ""}`}>akun</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto min-w-40 bg-primary-5 flex flex-col gap-2 rounded-3xl border-0 p-3">
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
          <Link
            href="/profile"
            onClick={() => setAccountOpen(false)}
            className="flex items-center gap-2 rounded-2xl px-3 py-2 text-neutral-1 hover:bg-primary-4/30 hover:text-neutral-2"
          >
            <Icon name="people-circle-fill" size={24} viewBox="0 0 24 24" />
            <span className="text-c1 font-medium">Profil</span>
          </Link>
          <button
            type="button"
            disabled={isLogoutLoading}
            onClick={() => void performLogout()}
            className="flex items-center gap-2 rounded-2xl px-3 py-2 text-left text-red hover:bg-red/20 disabled:opacity-50"
          >
            <Icon name="door" size={24} viewBox="0 0 24 24" />
            <span className="text-c1 font-medium">Keluar</span>
          </button>
          {errorMessage ? (
            <p className="text-xs text-red px-1">{errorMessage}</p>
          ) : null}
        </PopoverContent>
      </Popover>
    </nav>
  );
}
