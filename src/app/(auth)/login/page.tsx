import { Suspense } from "react";
import LoginPage from "@/templates/Auth/LoginPage";

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
