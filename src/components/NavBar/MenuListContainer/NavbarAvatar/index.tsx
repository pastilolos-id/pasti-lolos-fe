"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import type { RootState } from "@/lib/redux/store";
import { cn } from "@/lib/utils";
import { getAvatarInitials } from "@/lib/utils/avatarInitials";

export default function NavbarAvatar(props: React.ComponentProps<"button">) {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Link href="/profile">
      <Button
        {...props}
        className={cn(
          "p-3 border border-white inset-shadow-primary-button",
          props.className,
        )}
      >
        <Avatar className="border border-white">
          <AvatarImage
            src={user.profilePictureUrl ?? undefined}
            alt={user.fullName ?? user.username}
          />
          <AvatarFallback>
            {getAvatarInitials(user.fullName ?? user.username)}
          </AvatarFallback>
        </Avatar>
        <p className="mr-3">{user.fullName ?? user.username}</p>
      </Button>
    </Link>
  );
}
