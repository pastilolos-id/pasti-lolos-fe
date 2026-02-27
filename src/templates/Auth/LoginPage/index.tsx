"use client";

import Link from "next/link";
import { useState } from "react";
import { Form } from "@/components";
import { Button } from "@/components/ui";
import { delay } from "@/utils";
import AuthLeftSection from "../LeftSection";
import { loginInputData } from "./inputData";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleOnClickGoogleButton = () => {
    console.log("Google button clicked");
  };

  const handleOnSubmitForm = async (payload: Record<string, unknown>) => {
    setLoading(true);
    await delay(3);

    if (
      payload.username === "user@gmail.com" &&
      payload.password === "user123"
    ) {
      console.log("Berhasil login");
    } else {
      console.log("Gagal login, pastikan username dan password benar");
    }

    console.log({ payload });

    setLoading(false);
  };

  return (
    <AuthLeftSection
      title="Masuk"
      googleButton={{
        onClick: handleOnClickGoogleButton,
        text: "Masuk Dengan Akun Google",
      }}
    >
      <Form
        inputData={loginInputData}
        onSubmitForm={(e) => handleOnSubmitForm(e)}
      >
        <Button
          isLoading={loading}
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
