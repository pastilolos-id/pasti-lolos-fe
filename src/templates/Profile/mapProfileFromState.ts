import type { User } from "@/types/user";

export interface ProfileViewModel {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  dateOfBirth: string;
  gender: string;
  profilePictureUrl: string | null;
  status: string;
  roleLabel: string;
  hasProfileData: boolean;
}

function toSafeText(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function toRoleLabel(roleId: number): string {
  if (roleId === 1) {
    return "Student";
  }

  if (roleId === 0) {
    return "-";
  }

  return `Role #${roleId}`;
}

function capitalizeWords(value: string): string {
  if (!value) return "";
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function mapProfileFromState(user: User): ProfileViewModel {
  const firstName = toSafeText(user.firstName);
  const lastName = toSafeText(user.lastName);
  const fullName =
    toSafeText(user.fullName) ||
    [firstName, lastName].filter(Boolean).join(" ");
  const email = toSafeText(user.email);
  const username = toSafeText(user.username);
  const status = toSafeText(user.status);
  const phoneNumber = toSafeText(user.phoneNumber);
  const address = toSafeText(user.address);
  const city = toSafeText(user.city);
  const province = toSafeText(user.province);
  const country = toSafeText(user.country);
  const postalCode = toSafeText(user.postalCode);
  const dateOfBirth = toSafeText(user.dateOfBirth);
  const genderRaw = toSafeText(user.gender);
  const gender = genderRaw ? capitalizeWords(genderRaw.replace(/_/g, " ")) : "";

  const apiRoleName = toSafeText(user.roleName);
  const roleLabel = apiRoleName
    ? capitalizeWords(apiRoleName)
    : toRoleLabel(user.roleId);

  const hasProfileData = Boolean(
    fullName ||
      firstName ||
      lastName ||
      phoneNumber ||
      address ||
      city ||
      province ||
      country ||
      postalCode ||
      dateOfBirth ||
      genderRaw,
  );

  return {
    id: user.id,
    email: email || "-",
    username: username || "-",
    firstName: firstName || "-",
    lastName: lastName || "-",
    fullName: fullName || "-",
    phoneNumber: phoneNumber || "-",
    address: address || "-",
    city: city || "-",
    province: province || "-",
    country: country || "-",
    postalCode: postalCode || "-",
    dateOfBirth: dateOfBirth || "-",
    gender: gender || "-",
    profilePictureUrl: user.profilePictureUrl,
    status: status || "-",
    roleLabel,
    hasProfileData,
  };
}
