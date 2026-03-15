import type { inputDataType } from "@/components/Form/InputElement/types";

const registerInputData: inputDataType[] = [
  {
    type: "text",
    label: "Nama",
    placeholder: "Nama Lengkap",
    className: "",
    name: "username",
    leftIcon: "profile-circle",
    required: true,
  },
  {
    type: "text",
    label: "No.Handphone",
    placeholder: "089XXXXXXXXX",
    className: "",
    name: "phone",
    leftIcon: "phone",
    required: true,
  },
  {
    type: "email",
    label: "Email",
    placeholder: "contoh@gmail.com",
    className: "",
    name: "email",
    leftIcon: "mail",
    required: true,
  },
  {
    type: "password",
    label: "Password",
    placeholder: "********",
    className: "col-span-6",
    name: "password",
    leftIcon: "lock",
    rightIcon: "eye-closed",
    required: true,
  },
  {
    type: "password",
    label: "Konfirmasi Password",
    placeholder: "********",
    className: "col-span-6",
    name: "confirmPassword",
    leftIcon: "lock",
    rightIcon: "eye-closed",
    required: true,
  },
  {
    type: "checkbox",
    label: "Setujui syarat dan ketentuan",
    className: "col-span-12",
    name: "agreement",
    trueValue: true,
    falseValue: false,
    description:
      "Dengan mencentang kotak ini, Anda menyatakan telah membaca dan menyetujui Syarat dan Ketentuan serta Kebijakan Privasi. Jika Anda berusia di bawah 18 tahun, Anda menyatakan telah mendapatkan persetujuan dari orang tua atau wali.",
    required: true,
  },
];

export { registerInputData };
