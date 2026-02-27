"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import Icon from "@/components/Icon";
import {
  Field,
  FieldError,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui";
import type { inputControlType } from "..";
import type { inputPasswordFieldType } from "../types";

export default function InputPasswordField({
  control,
  label,
  error,
  ...input
}: inputPasswordFieldType & inputControlType) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleOnClickEyeIcon = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Controller
      name={input.name}
      control={control}
      rules={{
        required: input.required ? `${label} is required` : false,
      }}
      render={({ field, fieldState }) => (
        <Field
          key={input.name}
          className={input.className}
          aria-invalid={fieldState.invalid}
        >
          <FieldLabel htmlFor={input.name} aria-invalid={fieldState.invalid}>
            {label}
          </FieldLabel>

          <InputGroup>
            <InputGroupAddon
              align="inline-start"
              aria-invalid={fieldState.invalid}
              className="inset-shadow-primary-button"
            >
              <Icon
                viewBox="0 0 24 24"
                name={input.leftIcon ? input.leftIcon : "lock"}
                size={24}
              />
            </InputGroupAddon>

            <InputGroupInput
              {...field}
              id={input.name}
              type={showPassword ? "text" : "password"}
              placeholder={input.placeholder}
              name={input.name}
              aria-invalid={fieldState.invalid}
            />

            <InputGroupAddon
              onClick={handleOnClickEyeIcon}
              align="inline-end"
              aria-invalid={fieldState.invalid}
              className="cursor-pointer bg-transparent"
            >
              <Icon
                viewBox="0 0 24 24"
                name={showPassword ? "eye-open" : "eye-closed"}
                size={24}
              />
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
