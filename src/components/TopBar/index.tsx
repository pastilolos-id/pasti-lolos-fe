"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components";
import { Card, CardContent } from "@/components/ui";

export default function TopBar({ ...props }: React.ComponentProps<"div">) {
  const [dataState, setDataState] = useState<boolean>(false);
  return (
    <Card
      data-state={dataState ? "open" : "closed"}
      className="
        fixed z-50
        mx-auto
        lg:hidden
        w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)]
        rounded-full
        p-2
        bg-white/15
        border border-white/25 backdrop-blur-2xl shadow-[0_4px_34.1px_0_rgba(0,0,0,0.15)]
      "
      {...props}
    >
      <CardContent
        data-state={dataState ? "open" : "closed"}
        className="p-3 rounded-full bg-white"
      >
        <div className="ml-1">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl sm:text-[2rem] sm:ml-7 font-bold text-primary-4 -tracking-widest"
            >
              pastilolos
            </Link>

            <button
              type="button"
              onClick={() => setDataState(!dataState)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setDataState(!dataState);
                }
              }}
              className="p-3 border border-primary-4/50 rounded-full cursor-pointer"
            >
              <Icon
                viewBox="0 0 24 24"
                name="notification"
                pathClassName="fill-primary-5"
                size={20}
              />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
