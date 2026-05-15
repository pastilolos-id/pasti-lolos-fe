"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, type FormHandle } from "@/components";
import { Alert, AlertDescription, AlertTitle, Button } from "@/components/ui";
import { mapMyProfileToStateUser } from "@/lib/redux/api/mapLoginApiErrors";
import { useUpdateProfileMutation } from "@/lib/redux/api/profileApi";
import type {
  UpdateProfileErrorResponse,
  UpdateProfileRequest,
} from "@/lib/redux/api/types/profile";
import { setUser } from "@/lib/redux/slices/userSlice";
import type { RootState } from "@/lib/redux/store";
import { createProfileEditInputData } from "./inputData";

type ProfileEditPayload = Partial<UpdateProfileRequest>;

function normalizeEditPayload(
  payload: Record<string, unknown>,
): ProfileEditPayload {
  const keys: (keyof UpdateProfileRequest)[] = [
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
    "city",
    "province",
    "country",
    "postalCode",
  ];
  const normalized: ProfileEditPayload = {};

  for (const key of keys) {
    const value = String(payload[key] ?? "").trim();
    if (value) {
      normalized[key] = value;
    }
  }

  return normalized;
}

function isPayloadEmpty(payload: ProfileEditPayload): boolean {
  return Object.keys(payload).length === 0;
}

function parseUpdateProfileError(
  error: unknown,
): UpdateProfileErrorResponse | null {
  if (!error || typeof error !== "object") return null;

  const err = error as { data?: unknown; status?: unknown; message?: unknown };
  const data = err.data;

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const raw = data as UpdateProfileErrorResponse;
    return {
      statusCode:
        typeof raw.statusCode === "number"
          ? raw.statusCode
          : typeof err.status === "number"
            ? err.status
            : undefined,
      message: typeof raw.message === "string" ? raw.message : undefined,
      errors: raw.errors,
    };
  }

  if (typeof err.message === "string") {
    return {
      statusCode: typeof err.status === "number" ? err.status : undefined,
      message: err.message,
    };
  }

  return null;
}

type ProfileEditPageProps = {
  onSuccess?: () => void;
  onResult?: (result: { type: "success" | "error"; message: string }) => void;
  showWrapper?: boolean;
};

export default function ProfileEditPage({
  onSuccess,
  onResult,
  showWrapper = true,
}: ProfileEditPageProps) {
  const user = useSelector((state: RootState) => state.user.user);
  const inputData = useMemo(
    () =>
      createProfileEditInputData({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phoneNumber: user.phoneNumber ?? "",
        address: user.address ?? "",
        city: user.city ?? "",
        province: user.province ?? "",
        country: user.country ?? "",
        postalCode: user.postalCode ?? "",
      }),
    [
      user.firstName,
      user.lastName,
      user.phoneNumber,
      user.address,
      user.city,
      user.province,
      user.country,
      user.postalCode,
    ],
  );
  const dispatch = useDispatch();
  const formRef = useRef<FormHandle>(null);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    content: string;
  } | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = async (rawPayload: Record<string, unknown>) => {
    setMessage(null);
    formRef.current?.clearErrors();
    const payload = normalizeEditPayload(rawPayload);

    if (isPayloadEmpty(payload)) {
      setMessage({
        type: "error",
        content: "Isi minimal satu field untuk memperbarui profile.",
      });
      return;
    }

    try {
      const result = await updateProfile(payload).unwrap();
      const successMessage =
        result.message.trim() || "Profile berhasil diperbarui.";

      setMessage({
        type: result.success ? "success" : "error",
        content: successMessage,
      });

      dispatch(setUser(mapMyProfileToStateUser(result.data)));
      onResult?.({
        type: "success",
        message: successMessage,
      });
      onSuccess?.();
    } catch (error) {
      const parsed = parseUpdateProfileError(error);
      const phoneError = parsed?.errors?.phoneNumber?.[0];

      if (phoneError && formRef.current) {
        formRef.current.setError("phoneNumber", {
          type: "server",
          message: phoneError,
        });
      }

      const errorMessage =
        parsed?.message?.trim() ||
        phoneError ||
        "Gagal memperbarui profile. Silakan coba lagi.";

      setMessage({
        type: "error",
        content: errorMessage,
      });
      onResult?.({
        type: "error",
        message: errorMessage,
      });
    }
  };

  const content = (
    <div className="pb-2">
      {message ? (
        <Alert
          variant={message.type === "error" ? "destructive" : "default"}
          className="mb-4"
        >
          {message.type === "error" ? (
            <AlertCircle className="col-start-1 row-start-1" aria-hidden />
          ) : (
            <CheckCircle2 className="col-start-1 row-start-1" aria-hidden />
          )}
          <AlertTitle>
            {message.type === "error"
              ? "Perubahan gagal"
              : "Perubahan tersimpan"}
          </AlertTitle>
          <AlertDescription>{message.content}</AlertDescription>
        </Alert>
      ) : null}

      <Form ref={formRef} inputData={inputData} onSubmitForm={handleSubmit}>
        <div className="col-span-12 mt-3 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button type="submit" isLoading={isLoading}>
            Simpan Perubahan
          </Button>
        </div>
      </Form>
    </div>
  );

  if (!showWrapper) {
    return content;
  }

  return (
    <section className="rounded-card-medium border border-neutral-3 bg-neutral-1 p-4 sm:p-6">
      <div className="mb-4">
        <h1 className="text-h4 font-semibold text-neutral-6">Edit Profile</h1>
        <p className="mt-1 text-b3 text-neutral-5">
          Isi field yang ingin diperbarui, tidak harus semuanya.
        </p>
      </div>
      {content}
    </section>
  );
}
