"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, type FormHandle } from "@/components";
import { Alert, AlertDescription, AlertTitle, Button } from "@/components/ui";
import { useLoginMutation } from "@/lib/redux/api/authApi";
import {
  applyLoginFieldErrors,
  mapApiUserToStateUser,
  normalizeLoginPayload,
} from "@/lib/redux/api/mapLoginApiErrors";
import { parseLoginMutationError } from "@/lib/redux/api/parseLoginMutationError";
import { setUser } from "@/lib/redux/slices/userSlice";
import AuthLeftSection from "../LeftSection";
import { loginInputData } from "./inputData";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef<FormHandle>(null);
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);

  const [loginUser, { isLoading }] = useLoginMutation();

  const handleOnClickGoogleButton = () => {
    console.log("Google button clicked");
  };

  const handleOnSubmitForm = async (payload: Record<string, unknown>) => {
    setGlobalMessage(null);
    formRef.current?.clearErrors();

    const body = normalizeLoginPayload(payload);

    try {
      const res = await loginUser(body).unwrap();
      dispatch(setUser(mapApiUserToStateUser(res.user)));
      router.push("/home");
    } catch (err) {
      const parsed = parseLoginMutationError(err);

      if (parsed?.message?.trim()) {
        setGlobalMessage(parsed.message.trim());
      }

      if (parsed?.errors && formRef.current) {
        applyLoginFieldErrors(formRef.current.setError, parsed.errors);
      }

      if (
        !parsed?.message?.trim() &&
        (!parsed?.errors || Object.keys(parsed.errors).length === 0)
      ) {
        setGlobalMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <AuthLeftSection
      title="Masuk"
      googleButton={{
        onClick: handleOnClickGoogleButton,
        text: "Masuk Dengan Akun Google",
      }}
    >
      {globalMessage ? (
        <Alert variant="destructive" className="col-span-12 mb-4">
          <AlertCircle className="col-start-1 row-start-1" aria-hidden />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{globalMessage}</AlertDescription>
        </Alert>
      ) : null}

      <Form
        ref={formRef}
        inputData={loginInputData}
        onSubmitForm={handleOnSubmitForm}
      >
        <Button
          isLoading={isLoading}
          text="Masuk"
          type="submit"
          className="col-span-12 mt-6"
        />
      </Form>
      <p className="text-center lg:text-left text-sm lg:text-base mt-7">
        Belum punya akun ?{" "}
        <Link href="/register" className="font-semibold hover:underline">
          Daftar Sekarang
        </Link>
      </p>
    </AuthLeftSection>
  );
}
