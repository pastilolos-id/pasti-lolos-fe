"use client";

import type { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui";
import { cn } from "@/lib/utils";
import InputElement from "./InputElement";
import type { inputDataType } from "./InputElement/types";

export type formType = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  inputData: inputDataType[];
  onSubmitForm: (data: Record<string, unknown>) => void;
  error?: string | Record<string, string[]>;
  children?: ReactNode;
};

export default function Form({
  inputData,
  onSubmitForm,
  error,
  children,
  className,
  ...props
}: formType) {
  const { control, handleSubmit } = useForm();

  const onSubmitHandler: SubmitHandler<Record<string, unknown>> = async (
    data: Record<string, unknown>,
  ) => {
    console.log("Berhasil submit form");
    onSubmitForm(data);
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      <FieldGroup className={cn("w-full", className)}>
        {inputData.map((input) => (
          <InputElement control={control} key={input.name} input={input} />
        ))}

        {children}
      </FieldGroup>
    </form>
  );
}
