"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form } from "@/components";
import { Button } from "@/components/ui";
import { delay } from "@/lib/utils";
import AuthLeftSection from "../LeftSection";
import { registerInputData } from "./inputData";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleOnClickGoogleButton = () => {
    console.log("Google button clicked");
  };

  const handleOnSubmitForm = async (payload: Record<string, unknown>) => {
    setLoading(true);
    const isSuccess = await delay(3);

    if (isSuccess) {
      console.log("Berhasil Register");
      router.push("/login");
    } else {
      console.log("Gagal Register");
    }

    console.log({ payload });
    setLoading(false);
  };

  return (
    <AuthLeftSection
      title="Register"
      googleButton={{
        onClick: handleOnClickGoogleButton,
        text: "Daftar Dengan Akun Google",
      }}
    >
      <Form inputData={registerInputData} onSubmitForm={handleOnSubmitForm}>
        <Button
          text="Daftar"
          type="submit"
          className="col-span-12 mt-6"
          isLoading={loading}
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
