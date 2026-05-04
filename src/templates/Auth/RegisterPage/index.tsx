"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Form, type FormHandle } from "@/components";
import { Alert, AlertDescription, AlertTitle, Button } from "@/components/ui";
import { useRegisterMutation } from "@/lib/redux/api/authApi";
import {
  applyRegisterFieldErrors,
  normalizeRegisterPayload,
} from "@/lib/redux/api/mapRegisterApiErrors";
import { parseRegisterMutationError } from "@/lib/redux/api/parseRegisterMutationError";
import AuthLeftSection from "../LeftSection";
import { registerInputData } from "./inputData";

export default function RegisterPage() {
  const router = useRouter();
  const formRef = useRef<FormHandle>(null);
  const [globalMessage, setGlobalMessage] = useState<string | null>(null);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleOnClickGoogleButton = () => {
    console.log("Google button clicked");
  };

  const handleOnSubmitForm = async (payload: Record<string, unknown>) => {
    setGlobalMessage(null);
    formRef.current?.clearErrors();

    const body = normalizeRegisterPayload(payload);

    try {
      await registerUser(body).unwrap();
      router.push("/login");
    } catch (err) {
      const parsed = parseRegisterMutationError(err);

      if (parsed?.message?.trim()) {
        setGlobalMessage(parsed.message.trim());
      }

      if (parsed?.errors && formRef.current) {
        applyRegisterFieldErrors(formRef.current.setError, parsed.errors);
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
      title="Register"
      googleButton={{
        onClick: handleOnClickGoogleButton,
        text: "Daftar Dengan Akun Google",
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
        inputData={registerInputData}
        onSubmitForm={handleOnSubmitForm}
      >
        <Button
          text="Daftar"
          type="submit"
          className="col-span-12 mt-6"
          isLoading={isLoading}
        />
      </Form>

      <p className="text-center lg:text-left text-sm lg:text-base mt-7">
        Sudah punya akun ?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Masuk Sekarang
        </Link>
      </p>
    </AuthLeftSection>
  );
}
