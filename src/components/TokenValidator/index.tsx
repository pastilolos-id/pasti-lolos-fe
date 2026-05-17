"use client";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { redirectStaffToAdminApp } from "@/lib/auth/admin-app-url";
import { handleSessionExpired } from "@/lib/auth/session-lifecycle";
import { STUDENT_ROLE_ID } from "@/lib/auth/types";
import { useLazyGetMyProfileQuery } from "@/lib/redux/api/authApi";
import { mapMyProfileToStateUser } from "@/lib/redux/api/mapLoginApiErrors";
import { setUser } from "@/lib/redux/slices/userSlice";

function isUnauthorizedError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 401
  );
}

export default function TokenValidator() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const hasValidatedOnce = useRef(false);
  const [getMyProfile, { isFetching }] = useLazyGetMyProfileQuery();

  useEffect(() => {
    let cancelled = false;

    async function validateSession() {
      if (!pathname) {
        return;
      }

      try {
        const profile = await getMyProfile().unwrap();

        if (cancelled) {
          return;
        }

        if (profile.userRoleId !== STUDENT_ROLE_ID) {
          redirectStaffToAdminApp();
          return;
        }

        dispatch(setUser(mapMyProfileToStateUser(profile)));
      } catch (err) {
        if (cancelled) {
          return;
        }
        if (isUnauthorizedError(err)) {
          void handleSessionExpired();
        }
      } finally {
        if (!cancelled) {
          hasValidatedOnce.current = true;
        }
      }
    }

    void validateSession();

    return () => {
      cancelled = true;
    };
  }, [pathname, getMyProfile, dispatch]);

  if (!hasValidatedOnce.current || isFetching) {
    return (
      <div className="fixed bottom-4 right-4 z-60 rounded-md bg-white/90 px-3 py-2 shadow-sm">
        <p className="text-xs text-primary-90">Memverifikasi sesi...</p>
      </div>
    );
  }

  return null;
}
