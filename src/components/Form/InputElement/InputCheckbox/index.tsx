import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui";
import type { inputCheckboxType } from "../types";

export default function InputCheckBox(input: inputCheckboxType) {
  return (
    <Field orientation="horizontal" className="flex-wrap">
      <Checkbox id={input.name} name={input.name} className="" />
      <FieldContent>
        <FieldLabel htmlFor={input.name}>{input.label}</FieldLabel>
        <FieldDescription>{input.description}</FieldDescription>
      </FieldContent>
    </Field>
  );
}
