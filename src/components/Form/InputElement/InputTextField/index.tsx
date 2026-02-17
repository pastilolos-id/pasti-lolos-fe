import Icon from "@/components/Icon";
import {
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui";
import type { inputTextFieldType } from "../types";

export default function InputTextField({
  label,
  error,
  ...input
}: inputTextFieldType) {
  return (
    <Field key={input.name} className={input.className}>
      <FieldLabel htmlFor={input.name}>{label}</FieldLabel>

      <InputGroup>
        {input.leftIcon && (
          <InputGroupAddon
            align="inline-start"
            className="inset-shadow-primary-button"
          >
            <Icon viewBox="0 0 24 24" name={input.leftIcon} size={24} />
          </InputGroupAddon>
        )}

        <InputGroupInput
          id={input.name}
          type={input.type}
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
    </Field>
  );
}
