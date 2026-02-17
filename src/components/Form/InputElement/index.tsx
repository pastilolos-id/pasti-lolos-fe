import InputPasswordField from "./InputPasswordField";
import InputTextField from "./InputTextField";
import type { inputDataType } from "./types";

type InputElementType = {
  input: inputDataType;
};

export default function InputElement({ input }: InputElementType) {
  console.log({ input });

  switch (input.type) {
    case "text":
    case "email":
    case "number":
      return <InputTextField {...input} />;

    case "password":
      return <InputPasswordField {...input} />;

    default:
      return (
        <p className="text-red-500 col-span-12">
          Invalid input type or input type is not set yet
        </p>
      );
  }
}
