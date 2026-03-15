import type { Control, FieldValues } from "react-hook-form";
import InputCheckBox from "./InputCheckbox";
import InputPasswordField from "./InputPasswordField";
import InputTextField from "./InputTextField";
import type { inputDataType } from "./types";

export type inputControlType = {
  // biome-ignore lint/suspicious/noExplicitAny: false-positive
  control: Control<FieldValues, any, FieldValues>;
};

type InputElementType = inputControlType & {
  input: inputDataType;
};

export default function InputElement({ control, input }: InputElementType) {
  switch (input.type) {
    case "text":
    case "email":
    case "number":
      return <InputTextField {...input} control={control} />;

    case "password":
      return <InputPasswordField {...input} control={control} />;

    case "checkbox":
      return <InputCheckBox {...input} control={control} />;

    default:
      return (
        <p className="text-red-500 col-span-12">
          Invalid input type or input type is not set yet
        </p>
      );
  }
}
