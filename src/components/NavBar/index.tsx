"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type menuItemType = {
  label: string;
  href: string;
};

type NavBarProps = React.ComponentPropsWithoutRef<"div"> & {
  leftMenu: menuItemType[];
  rightMenu: menuItemType[];
};

export default function NavBar({ leftMenu, rightMenu }: NavBarProps) {
  const [dataState, setDataState] = useState<boolean>(false);

  return (
    <Card
      data-state={dataState ? "open" : "closed"}
      className="fixed top-0 right-3 left-3 mx-auto w-[calc(100%-1.5rem)] data-[state=open]:rounded-[2rem] rounded-full max-w-sm p-2 mt-3 bg-white/15 border border-white/25 backdrop-blur-2xl shadow-[0_4px_34.1px_0_rgba(0,0,0,0.15)]"
    >
      <CardContent
        data-state={dataState ? "open" : "closed"}
        className="p-3 data-[state=open]:rounded-[1.5rem] rounded-full bg-white"
      >
        <Collapsible className="ml-1">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-primary-4 -tracking-widest">
              pastilolos
            </p>
            <CollapsibleTrigger
              onClick={() => setDataState(!dataState)}
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
          <CollapsibleContent className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col gap-4">
              {leftMenu.map((item) => (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant="secondary"
                    className="w-full h-auto text-[1.25rem] font-semi bold text-center rounded-full py-4 leading-5"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {rightMenu.map((item) => (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant={item.label === "Daftar" ? "primary" : "secondary"}
                    className="w-full h-auto text-[1.25rem] font-semibold text-center rounded-full py-4 leading-5"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

export type { menuItemType };
