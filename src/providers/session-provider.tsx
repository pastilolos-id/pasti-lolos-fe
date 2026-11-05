"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import SessionExpiredModal from "@/components/SessionExpiredModal";
import { LOGIN_PATH } from "@/constants/routes";
import { setSessionExpiredRedirect } from "@/lib/auth/session-lifecycle";

type SessionProviderProps = {
  children: React.ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const router = useRouter();

  useEffect(() => {
    setSessionExpiredRedirect(() => {
      router.replace(LOGIN_PATH);
    });
  }, [router]);

  return (
    <>
      <SessionExpiredModal />
      {children}
    </>
  );
}
