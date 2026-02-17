"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { Form } from "@/components";
import { Button } from "@/components/ui";
import AuthLeftSection from "../LeftSection";
import { loginInputData } from "./inputData";

export default function LoginPage() {
  const handleOnClickGoogleButton = () => {
    console.log("Google button clicked");
  };

  const handleOnSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "========================  Form Submitted  ========================\n",
    );
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
        <Button type="submit" className="col-span-12 mt-6">
          Masuk
        </Button>
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
