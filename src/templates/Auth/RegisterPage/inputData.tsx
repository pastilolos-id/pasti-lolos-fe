import type { inputDataType } from "@/components/Form/InputElement/types";

const registerInputData: inputDataType[] = [
  {
    type: "text",
    label: "Nama",
    placeholder: "Nama Lengkap",
    className: "",
    name: "username",
    leftIcon: "profile-circle",
  },
  {
    type: "text",
    label: "No.Handphone",
    placeholder: "089XXXXXXXXX",
    className: "",
    name: "phone",
    leftIcon: "phone",
  },
  {
    type: "email",
    label: "Email",
    placeholder: "contoh@gmail.com",
    className: "",
    name: "email",
    leftIcon: "mail",
  },
  {
    type: "password",
    label: "Password",
    placeholder: "********",
    className: "col-span-6",
    name: "password",
    leftIcon: "lock",
    rightIcon: "eye-closed",
  },
  {
    type: "password",
    label: "Konfirmasi Password",
    placeholder: "********",
    className: "col-span-6",
    name: "confirmPassword",
    leftIcon: "lock",
    rightIcon: "eye-closed",
  },
  {
    type: "checkbox",
    label: "Setujui syarat dan ketentuan",
    className: "",
    name: "agreement",
    description:
      "Dengan mencentang kotak ini, Anda menyatakan telah membaca dan menyetujui Syarat dan Ketentuan serta Kebijakan Privasi. Jika Anda berusia di bawah 18 tahun, Anda menyatakan telah mendapatkan persetujuan dari orang tua atau wali.",
  },
];

export { registerInputData };
