import type { ComponentProps } from "react";
import type { IconProps } from "@/components/Icon";

type inputType = {
  name: string;
  className: string;
  label?: string;
  description?: string;
  helperText?: string;
  error?: boolean;
  leftIcon?: IconProps["name"];
  rightIcon?: IconProps["name"];
};

export type inputTextFieldType = ComponentProps<"input"> &
  inputType & {
    type: "text" | "email" | "password" | "number";
  };

export type inputPasswordFieldType = ComponentProps<"input"> &
  inputType & {
    type: "password";
  };

export type inputDataType = inputTextFieldType | inputPasswordFieldType;
