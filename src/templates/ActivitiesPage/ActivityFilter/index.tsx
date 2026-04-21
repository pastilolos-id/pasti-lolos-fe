"use client";

import { useState } from "react";
import { Icon } from "@/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { FilterType } from "../types";

interface ActivityFilterProps {
  value: FilterType;
  onChange: (filter: FilterType) => void;
}

const filterOptions: Array<{ value: FilterType; label: string }> = [
  { value: "semua", label: "Semua" },
  { value: "tryout", label: "Tryout" },
  { value: "materi", label: "Materi" },
];

export default function ActivityFilter({
  value,
  onChange,
}: ActivityFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = filterOptions.find((opt) => opt.value === value)?.label;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          style={{
            boxShadow: "-7px -10px 12.6px 0px rgba(128, 176, 255, 0.18) inset",
          }}
          className="sm:w-45 w-full rounded-full border border-neutral-3 bg-white px-6 py-3 text-left transition-colors duration-200 hover:bg-neutral-2 focus:outline-none focus:ring-2 focus:ring-primary-5 focus:ring-offset-2 flex items-center justify-between gap-4 cursor-pointer"
          aria-label="Filter activities"
        >
          <span className="text-c1 font-semibold text-neutral-6">
            {currentLabel}
          </span>
          <Icon
            name="chevron-down-fill"
            size={16}
            viewBox="0 0 16 16"
            fill="black"
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="sm:w-50.5 w-(--radix-popover-trigger-width) rounded-2xl border border-primary-4/50 p-0 overflow-hidden [&_button]:cursor-pointer"
        style={{
          boxShadow:
            "-7px -10px 12.6px 0px rgba(128, 176, 255, 0.18) inset, 0px 4px 14.5px 0px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="flex flex-col w-full">
          {filterOptions.map((option, index) => (
            <div
              className={cn(
                "px-6",
                value === option.value
                  ? "bg-primary-5 text-white"
                  : "text-neutral-6 hover:bg-neutral-2",
              )}
              key={option.value}
            >
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-0 py-4 text-c1 font-semibold transition-colors duration-200",
                  index < filterOptions.length - 1
                    ? "border-b border-primary-4/50"
                    : "",
                )}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
