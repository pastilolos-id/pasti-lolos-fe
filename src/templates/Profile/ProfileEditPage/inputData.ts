import type { inputDataType } from "@/components/Form/InputElement/types";
import type { UpdateProfileRequest } from "@/lib/redux/api/types/profile";

type EditProfileDefaults = Partial<UpdateProfileRequest>;

export function createProfileEditInputData(
  defaults: EditProfileDefaults,
): inputDataType[] {
  return [
    {
      type: "text",
      label: "Nama Depan",
      placeholder: "Masukkan nama depan",
      className: "col-span-12 md:col-span-6",
      name: "firstName",
      required: false,
      defaultValue: defaults.firstName ?? "",
    },
    {
      type: "text",
      label: "Nama Belakang",
      placeholder: "Masukkan nama belakang",
      className: "col-span-12 md:col-span-6",
      name: "lastName",
      required: false,
      defaultValue: defaults.lastName ?? "",
    },
    {
      type: "text",
      label: "Nomor Handphone",
      placeholder: "Contoh: +6281234567890",
      className: "col-span-12 md:col-span-6",
      name: "phoneNumber",
      required: false,
      defaultValue: defaults.phoneNumber ?? "",
    },
    {
      type: "text",
      label: "Kode Pos",
      placeholder: "Contoh: 10220",
      className: "col-span-12 md:col-span-6",
      name: "postalCode",
      required: false,
      defaultValue: defaults.postalCode ?? "",
    },
    {
      type: "text",
      label: "Alamat",
      placeholder: "Masukkan alamat lengkap",
      className: "col-span-12",
      name: "address",
      required: false,
      defaultValue: defaults.address ?? "",
    },
    {
      type: "text",
      label: "Kota",
      placeholder: "Masukkan kota",
      className: "col-span-12 md:col-span-4",
      name: "city",
      required: false,
      defaultValue: defaults.city ?? "",
    },
    {
      type: "text",
      label: "Provinsi",
      placeholder: "Masukkan provinsi",
      className: "col-span-12 md:col-span-4",
      name: "province",
      required: false,
      defaultValue: defaults.province ?? "",
    },
    {
      type: "text",
      label: "Negara",
      placeholder: "Masukkan negara",
      className: "col-span-12 md:col-span-4",
      name: "country",
      required: false,
      defaultValue: defaults.country ?? "",
    },
  ];
}
