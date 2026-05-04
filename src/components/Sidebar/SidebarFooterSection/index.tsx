import Link from "next/link";
import { Icon } from "@/components";
import {
  Collapsible,
  CollapsibleContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import LogoutSidebarMenuButton from "./LogoutSidebarMenuButton";
import SidebarAvatar from "./SidebarAvatar";

export default function SidebarFooterSection() {
  return (
    <SidebarFooter className="px-4 py-0 relative">
      <Collapsible
        key="Sidebar Footer"
        className="bg-primary-4 border border-white rounded-full data-[state=open]:rounded-3xl inset-shadow-primary-button w-[calc(100%-32px)] overflow-hidden absolute bottom-0"
      >
        <CollapsibleContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Akun"
                className="px-2 py-3 hover:bg-primary-5/50 w-full!"
              >
                <Link
                  href="/profile"
                  className="w-full flex group-data-[collapsible=icon]:justify-center"
                >
                  <Icon
                    size={24}
                    viewBox="0 0 24 24"
                    name="people-circle-fill"
                  />
                  <p className="group-data-[collapsible=icon]:hidden">Akun</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <LogoutSidebarMenuButton />
          </SidebarMenu>
        </CollapsibleContent>

        <SidebarAvatar />
      </Collapsible>
    </SidebarFooter>
  );
}
