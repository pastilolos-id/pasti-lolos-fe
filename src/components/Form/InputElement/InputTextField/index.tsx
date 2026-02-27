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
import type { inputTextFieldType } from "../types";

export default function InputTextField({
  control,
  label,
  error,
  ...input
}: inputTextFieldType & inputControlType) {
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
            {input.leftIcon && (
              <InputGroupAddon
                aria-invalid={fieldState.invalid}
                align="inline-start"
                className="inset-shadow-primary-button"
              >
                <Icon viewBox="0 0 24 24" name={input.leftIcon} size={24} />
              </InputGroupAddon>
            )}

            <InputGroupInput
              {...field}
              id={input.name}
              type={input.type}
              aria-invalid={fieldState.invalid}
              placeholder={input.placeholder}
              name={input.name}
            />

            {input.rightIcon && (
              <InputGroupAddon
                align="inline-end"
                className="inset-shadow-primary-button"
              >
                <Icon viewBox="0 0 24 24" name={input.rightIcon} size={24} />
              </InputGroupAddon>
            )}
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
