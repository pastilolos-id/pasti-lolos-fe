import { Suspense } from "react";
import BumnPage from "@/templates/Tryout/BumnPage";

export default function TryoutBumnRoute() {
  return (
    <Suspense fallback={null}>
      <BumnPage />
    </Suspense>
  );
}
