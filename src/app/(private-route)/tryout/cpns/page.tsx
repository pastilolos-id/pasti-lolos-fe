import { Suspense } from "react";
import CpnsPage from "@/templates/Tryout/CpnsPage";

export default function TryoutCpnsRoute() {
  return (
    <Suspense fallback={null}>
      <CpnsPage />
    </Suspense>
  );
}
