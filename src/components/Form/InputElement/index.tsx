import InputTextField from "./InputTextField";
import type { inputDataType } from "./types";

type InputElementType = {
  input: inputDataType;
};

export default function InputElement({ input }: InputElementType) {
  switch (input.type) {
    case "text":
      return <InputTextField {...input} />;

    default:
      return (
        <p className="text-red-500">
          Invalid input type or input type is not set yet
        </p>
      );
  }
}
