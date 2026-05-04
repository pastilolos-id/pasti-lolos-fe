"use client";

import { Icon } from "@/components";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui";
import { useLogout } from "@/lib/hooks/useLogout";

export default function LogoutSidebarMenuButton() {
  const { performLogout, isLoading, errorMessage } = useLogout();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        tooltip="Keluar"
        disabled={isLoading}
        onClick={() => void performLogout()}
        className="px-2 py-3 hover:bg-red active:bg-red/70 w-full! flex group-data-[collapsible=icon]:justify-center"
      >
        <Icon size={24} viewBox="0 0 24 24" name="door" />
        <p className="group-data-[collapsible=icon]:hidden">Keluar</p>
      </SidebarMenuButton>
      {errorMessage ? (
        <p className="group-data-[collapsible=icon]:hidden px-2 pb-2 text-xs text-red">
          {errorMessage}
        </p>
      ) : null}
    </SidebarMenuItem>
  );
}
