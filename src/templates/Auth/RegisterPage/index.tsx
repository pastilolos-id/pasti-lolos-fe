"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { Form } from "@/components";
import { Button } from "@/components/ui";
import AuthLeftSection from "../LeftSection";
import { registerInputData } from "./inputData";

export default function RegisterPage() {
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
      title="Register"
      googleButton={{
        onClick: handleOnClickGoogleButton,
        text: "Daftar Dengan Akun Google",
      }}
    >
      <Form
        inputData={registerInputData}
        onSubmitForm={(e) => handleOnSubmitForm(e)}
      >
        <Button type="submit" className="col-span-12 mt-6">
          Daftar
        </Button>
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
