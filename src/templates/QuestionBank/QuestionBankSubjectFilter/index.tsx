"use client";

import { cn } from "@/lib/utils";
import type { QuestionBankSubjectFilterOption } from "../types";

type QuestionBankSubjectFilterProps = {
  options: QuestionBankSubjectFilterOption[];
  value: "all" | number;
  onChange: (value: "all" | number) => void;
  className?: string;
};

export default function QuestionBankSubjectFilter({
  options,
  value,
  onChange,
  className,
}: QuestionBankSubjectFilterProps) {
  if (options.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-c1 font-semibold text-neutral-5">Subjek</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-c1 font-semibold transition-colors",
            value === "all"
              ? "border-primary-5 bg-primary-5 text-white"
              : "border-neutral-3 bg-white text-neutral-6 hover:border-primary-4/60",
          )}
        >
          Semua
        </button>
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-c1 font-semibold transition-colors",
              value === opt.id
                ? "border-primary-5 bg-primary-5 text-white"
                : "border-neutral-3 bg-white text-neutral-6 hover:border-primary-4/60",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
