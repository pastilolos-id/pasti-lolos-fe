"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@/components";
import Notifications from "@/components/Notifications";
import NotificationIconBadge from "@/components/Notifications/NotificationIconBadge";
import {
  Accordion,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { useGetNotificationsUnreadCountQuery } from "@/lib/redux/api/notificationsApi";
import type { RootState } from "@/lib/redux/store";
import MenuItemWithSubMenu from "./../MenuItemWithSubMenu";
import { middleMenuItems, topMenuItems } from "./../sidebarData";

export default function SidebarContentSection() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const isAuthenticated = useSelector((s: RootState) => s.user.isAuthenticated);
  const { data: unreadData } = useGetNotificationsUnreadCountQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const unreadCount = unreadData?.count ?? 0;

  return (
    <SidebarContent className="grid grid-rows-3">
      <SidebarGroup>
        <SidebarMenu>
          <Accordion type="single" collapsible>
            {topMenuItems.map((menu) => {
              if (!menu.subMenu) {
                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton tooltip={menu.title} asChild>
                      <Link href={menu.href}>
                        <Icon size={24} viewBox="0 0 24 24" name={menu.icon} />
                        <p>{menu.title}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              } else {
                return <MenuItemWithSubMenu key={menu.title} {...menu} />;
              }
            })}
          </Accordion>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="mt-3">
        <Separator className="data-[orientation=horizontal]:w-auto mx-4 bg-primary-4 mb-6" />
        <SidebarGroupLabel>Lainnya</SidebarGroupLabel>
        <SidebarMenu>
          {middleMenuItems.map((menu) => {
            if (menu.title === "Notifikasi") {
              return (
                <SidebarMenuItem key={menu.title}>
                  <Popover
                    open={isNotificationsOpen}
                    onOpenChange={setIsNotificationsOpen}
                  >
                    <PopoverTrigger asChild>
                      <SidebarMenuButton
                        tooltip={menu.title}
                        className="relative overflow-visible"
                      >
                        <Icon size={24} viewBox="0 0 24 24" name={menu.icon} />
                        <NotificationIconBadge
                          count={unreadCount}
                          className="right-1 top-1"
                        />
                        <p>{menu.title}</p>
                      </SidebarMenuButton>
                    </PopoverTrigger>
                    <PopoverContent
                      side="right"
                      align="center"
                      sideOffset={12}
                      className="w-98.5 border-none bg-transparent p-0 shadow-none"
                    >
                      <Notifications
                        onItemClick={() => setIsNotificationsOpen(false)}
                        onSeeAllClick={() => setIsNotificationsOpen(false)}
                      />
                    </PopoverContent>
                  </Popover>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={menu.title}>
                <SidebarMenuButton tooltip={menu.title} asChild>
                  <Link href={menu.href}>
                    <Icon size={24} viewBox="0 0 24 24" name={menu.icon} />
                    <p>{menu.title}</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
