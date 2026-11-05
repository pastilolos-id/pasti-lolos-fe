"use client";

import Link from "next/link";
import { Logo } from "@/components";[cite: 2]
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui";[cite: 2]
import SidebarContentSection from "./SidebarContentSection";[cite: 2]
import SidebarFooterSection from "./SidebarFooterSection";[cite: 2]

export default function Sidebar() {[cite: 2]
  return (
    <SidebarContainer collapsible="icon" className="py-4 hidden lg:flex">[cite: 2]
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