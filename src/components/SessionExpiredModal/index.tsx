"use client";

import { AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui";
import { SESSION_EXPIRED_MESSAGE } from "@/lib/auth/session-lifecycle";
import type { RootState } from "@/lib/redux/store";

export default function SessionExpiredModal() {
  const isOpen = useSelector(
    (state: RootState) => state.session.isSessionExpiredModalOpen,
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="session-expired-title"
    >
      <Alert
        variant="destructive"
        className="max-w-md border-red bg-white text-neutral-6 shadow-lg"
      >
        <AlertCircle className="col-start-1 row-start-1" aria-hidden />
        <AlertTitle id="session-expired-title">Sesi berakhir</AlertTitle>
        <AlertDescription className="text-neutral-6">
          {SESSION_EXPIRED_MESSAGE}
          <span className="mt-2 block text-sm opacity-80">
            Mengalihkan ke halaman login...
          </span>
        </AlertDescription>
      </Alert>
    </div>
  );
}
