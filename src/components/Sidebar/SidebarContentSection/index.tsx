import Link from "next/link";
import { Icon } from "@/components";
import {
  Accordion,
  Separator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import MenuItemWithSubMenu from "./../MenuItemWithSubMenu";
import { middleMenuItems, topMenuItems } from "./../sidebarData";

export default function SidebarContentSection() {
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
