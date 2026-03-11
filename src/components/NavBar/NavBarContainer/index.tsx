"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components";
import { Button, Collapsible, CollapsibleTrigger } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";

export default function NavbarContainer({
  desktopMenu,
  mobileMenu,
  ...props
}: React.ComponentProps<"div"> & {
  desktopMenu: React.ReactNode;
  mobileMenu: React.ReactNode;
}) {
  const [dataState, setDataState] = useState<boolean>(false);
  return (
    <Card
      data-state={dataState ? "open" : "closed"}
      className="
        fixed z-50 top-3 right-3 left-3 md:top-6 md:right-6 md:left-6 lg:top-10 lg:left-17.5 lg:right-17.5
        mx-auto
        w-[calc(100%-1.5rem)] md:w-[calc(100%-3rem)] lg:w-[calc(100%-8.75rem)]
        data-[state=open]:rounded-4xl md:data-[state=open]:rounded-full rounded-full
        p-2
        bg-white/15
        border border-white/25 backdrop-blur-2xl shadow-[0_4px_34.1px_0_rgba(0,0,0,0.15)]
      "
      {...props}
    >
      <CardContent
        data-state={dataState ? "open" : "closed"}
        className="p-3 data-[state=open]:rounded-3xl md:data-[state=open]:rounded-full rounded-full bg-white"
      >
        <Collapsible className="ml-1">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl sm:text-[2rem] sm:ml-7 font-bold text-primary-4 -tracking-widest"
            >
              pastilolos
            </Link>

            {desktopMenu}

            <CollapsibleTrigger
              onClick={() => setDataState(!dataState)}
              className="md:hidden"
              asChild
            >
              <Button
                size="icon-lg"
                variant="primary"
                className="rounded-full size-13 cursor-pointer"
              >
                <Icon name="hamburger-menu-toggle" fill="black" size={20} />
              </Button>
            </CollapsibleTrigger>
          </div>
          {mobileMenu}
        </Collapsible>
      </CardContent>
    </Card>
  );
}
