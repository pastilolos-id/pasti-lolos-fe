import { Suspense } from "react";
import NotificationsPage from "@/templates/Notifications/NotificationsPage";

export default function Notifications() {
  return (
    <Suspense fallback={null}>
      <NotificationsPage />
    </Suspense>
  );
}
