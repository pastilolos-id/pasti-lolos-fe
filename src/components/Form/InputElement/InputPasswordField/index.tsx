"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui";
import type { inputTextFieldType } from "../types";

export default function InputPasswordField({
  label,
  error,
  ...input
}: inputTextFieldType) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleOnClickEyeIcon = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Field key={input.name} className={input.className}>
      <FieldLabel htmlFor={input.name}>{label}</FieldLabel>

      <InputGroup>
        <InputGroupAddon
          align="inline-start"
          className="inset-shadow-primary-button"
        >
          <Icon
            viewBox="0 0 24 24"
            name={input.leftIcon ? input.leftIcon : "lock"}
            size={24}
          />
        </InputGroupAddon>

        <InputGroupInput
          id={input.name}
          type={showPassword ? "text" : "password"}
          placeholder={input.placeholder}
          name={input.name}
        />

        <InputGroupAddon
          align="inline-end"
          className="cursor-pointer bg-transparent"
        >
          <Icon
            onClick={handleOnClickEyeIcon}
            viewBox="0 0 24 24"
            name={showPassword ? "phone" : "eye-closed"}
            size={24}
          />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
