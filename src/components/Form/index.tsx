"use client";

import {
  type DetailedHTMLProps,
  type FormHTMLAttributes,
  forwardRef,
  type ReactNode,
  useImperativeHandle,
} from "react";
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormClearErrors,
  type UseFormSetError,
  useForm,
} from "react-hook-form";
import { FieldGroup } from "@/components/ui";
import { cn } from "@/lib/utils";
import InputElement from "./InputElement";
import type { inputDataType } from "./InputElement/types";

export type FormHandle = {
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
};

export type formType = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  inputData: inputDataType[];
  onSubmitForm: (data: Record<string, unknown>) => void | Promise<void>;
  error?: string | Record<string, string[]>;
  children?: ReactNode;
};

const Form = forwardRef<FormHandle, formType>(function Form(
  { inputData, onSubmitForm, error: _error, children, className, ...props },
  ref,
) {
  const { control, handleSubmit, setError, clearErrors } = useForm<
    Record<string, unknown>
  >({
    mode: "onSubmit",
  });

  useImperativeHandle(
    ref,
    () => ({
      setError,
      clearErrors,
    }),
    [setError, clearErrors],
  );

  const onSubmitHandler: SubmitHandler<Record<string, unknown>> = async (
    data: Record<string, unknown>,
  ) => {
    await onSubmitForm(data);
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
});

export default Form;
