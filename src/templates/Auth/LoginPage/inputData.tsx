import type { inputDataType } from "@/components/Form/InputElement/types";

const loginInputData: inputDataType[] = [
  {
    type: "email",
    label: "Email",
    placeholder: "contoh@gmail.com",
    className: "",
    name: "username",
    leftIcon: "mail",
  },
  {
    type: "password",
    label: "Password",
    placeholder: "********",
    className: "",
    name: "password",
  },
];

export { loginInputData };
