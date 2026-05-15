import type { MyProfileResponse } from "./auth";

export type UpdateProfileRequest = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
};

export type UpdateProfileResponse = {
  success: boolean;
  message: string;
  data: MyProfileResponse;
};

export type UpdateProfileErrorResponse = {
  statusCode?: number;
  message?: string;
  errors?: Partial<Record<keyof UpdateProfileRequest, string[]>>;
};
