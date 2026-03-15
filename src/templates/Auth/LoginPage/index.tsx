"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@/components";
import { Button } from "@/components/ui";
import { setToken } from "@/lib/cookies";
import { setUser } from "@/lib/redux/slices/userSlice";
import { delay } from "@/lib/utils";
import userData from "@/mock-data/user";
import AuthLeftSection from "../LeftSection";
import { loginInputData } from "./inputData";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOnClickGoogleButton = () => {
    console.log("Google button clicked");
  };

  const handleOnSubmitForm = async (payload: Record<string, unknown>) => {
    setLoading(true);
    const isSuccess = await delay(3);

    const { token, ...user } = userData;

    if (
      isSuccess &&
      payload.email === "user@gmail.com" &&
      payload.password === "user123"
    ) {
      dispatch(setUser(user));
      setToken(token);
      console.log("Berhasil login");
      router.push("/");
    } else {
      console.log("Gagal login, pastikan username dan password benar");
    }

    console.log({ payload });
    console.log(isSuccess);

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
