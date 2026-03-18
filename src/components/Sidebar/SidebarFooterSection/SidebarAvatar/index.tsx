"use client";

import { useSelector } from "react-redux";
import Icon from "@/components/Icon";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  CollapsibleTrigger,
} from "@/components/ui";
import type { RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { getAvatarInitials } from "@/lib/utils/avatarInitials";

export default function SidebarAvatar(props: React.ComponentProps<"div">) {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <CollapsibleTrigger className="w-full group hover:bg-primary-5/50 active:bg-primary-3 cursor-pointer">
      <div
        {...props}
        className={cn(
          "flex gap-3 items-center p-2 justify-center",
          props.className,
        )}
      >
        <Avatar className="border border-white">
          <AvatarImage src={user.profileImg} alt={user.name} />
          <AvatarFallback>{getAvatarInitials(user.name)}</AvatarFallback>
        </Avatar>
        <p className="mr-3 group-data-[collapsible=icon]:hidden">{user.name}</p>

        <div className="ml-auto cursor-pointer group-data-[collapsible=icon]:hidden">
          <Icon
            size={16}
            viewBox="0 0 16 16"
            name="chevron-down-fill"
            className="rotate-180 group-data-[state=open]:rotate-0 ml-auto"
          />
        </div>
      </div>
    </CollapsibleTrigger>
  );
}
