"use client";

import Link from "next/link";
import { Logo } from "@/components";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui";
import SidebarContentSection from "./SidebarContentSection";
import SidebarFooterSection from "./SidebarFooterSection";

export default function Sidebar() {
  return (
    <SidebarContainer collapsible="icon" className="py-4 hidden lg:flex">
      <SidebarHeader>
        <Link
          href="/home"
          className="block outline-none ring-offset-primary-5 focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <Logo className="text-center" />
        </Link>
      </SidebarHeader>

      <SidebarContentSection />

      <SidebarFooterSection />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-30 flex w-0 items-center">
        <div className="pointer-events-auto translate-x-1/2">
          <SidebarTrigger />
        </div>
      </div>
    </SidebarContainer>
  );
}
