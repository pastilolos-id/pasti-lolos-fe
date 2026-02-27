import { Controller } from "react-hook-form";
import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import type { inputControlType } from "..";
import type { inputCheckboxType } from "../types";

export default function InputCheckBox({
  control,
  ...input
}: inputCheckboxType & inputControlType) {
  return (
    <Controller
      name={input.name}
      control={control}
      rules={{
        required: input.required ? `${input.label} harus dicentang` : false,
      }}
      render={({ field, fieldState }) => (
        <div className={cn("flex flex-col gap-3", input.className)}>
          <Field
            orientation="horizontal"
            className="flex-wrap"
            aria-invalid={fieldState.invalid}
          >
            <Checkbox
              {...field}
              checked={field.value === "Y"}
              onCheckedChange={(checked) => {
                const newValue = checked ? "Y" : undefined;
                field.onChange(newValue);
              }}
              id={input.name}
              name={input.name}
              className=""
              aria-invalid={fieldState.invalid}
            />
            <FieldContent>
              <FieldLabel
                className="cursor-pointer"
                aria-invalid={fieldState.invalid}
                htmlFor={input.name}
              >
                {input.label}
              </FieldLabel>
              <FieldDescription className="text-c1">
                {input.description}
              </FieldDescription>
            </FieldContent>
          </Field>
          {fieldState.invalid && (
            <FieldError
              className="rounded-full bg-red w-full text-center text-white p-1 text-c1 font-bold"
              errors={[fieldState.error]}
            />
          )}
        </div>
      )}
    />
  );
}
