import type {
  DetailedHTMLProps,
  FormEvent,
  FormHTMLAttributes,
  ReactNode,
} from "react";
import { FieldGroup } from "@/components/ui";
import { cn } from "@/lib/utils";
import InputElement from "./InputElement";
import type { inputDataType } from "./InputElement/types";

export type formType = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  inputData: inputDataType[];
  onSubmitForm: (data: FormEvent<HTMLFormElement>) => void;
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
  const onSubmitHandler = (data: FormEvent<HTMLFormElement>) => {
    console.log("Berhasil submit form dengan data:", data);
  };

  return (
    <form {...props} onSubmit={(e) => onSubmitHandler(e)} noValidate>
      <FieldGroup className={cn("w-full", className)}>
        {inputData.map((input) => (
          <InputElement key={input.name} input={input} />
        ))}

        {children}
      </FieldGroup>
    </form>
  );
}
