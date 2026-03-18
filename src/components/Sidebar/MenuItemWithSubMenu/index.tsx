import Link from "next/link";
import { Icon } from "@/components";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui";
import type { menuItemsType } from "../sidebarData";

export default function MenuItemWithSubMenu(menu: menuItemsType) {
  return (
    <AccordionItem
      key={menu.title}
      value={menu.title}
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className="w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:flex-col border-0"
      asChild
    >
      <SidebarMenuItem>
        <AccordionTrigger asChild className="w-full group p-2">
          <SidebarMenuButton tooltip={menu.title} className="cursor-pointer">
            <Icon
              name={menu.icon}
              size={24}
              viewBox="0 0 24 24"
              className="group-data-[state=open]:rotate-0!"
            />
            <p>{menu.title}</p>
            <Icon
              name="chevron-down-fill"
              size={16}
              viewBox="0 0 16 16"
              className="ml-auto group-data-[state=open]:rotate-180"
            />
          </SidebarMenuButton>
        </AccordionTrigger>

        <AccordionContent>
          <SidebarMenuSub>
            {menu.subMenu?.map((subMenu) => (
              <SidebarMenuSubItem key={subMenu.title}>
                <SidebarMenuSubButton
                  tooltip={`${menu.title} ${subMenu.title}`}
                  asChild
                  className="text-white"
                >
                  <Link
                    className="flex gap-3 w-full cursor-pointer"
                    href={subMenu.href}
                  >
                    <Icon viewBox="0 0 24 24" size={24} name={subMenu.icon} />
                    <p>{subMenu.title}</p>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </AccordionContent>
      </SidebarMenuItem>
    </AccordionItem>
  );
}
