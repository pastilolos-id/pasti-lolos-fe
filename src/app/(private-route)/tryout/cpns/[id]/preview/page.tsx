import { Suspense } from "react";
import TryoutPreviewPage from "@/templates/Tryout/TryoutPreviewPage";

interface TryoutCpnsDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TryoutCpnsDetailRoute({
  params,
}: TryoutCpnsDetailRouteProps) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <TryoutPreviewPage category="cpns" tryoutId={id} />
    </Suspense>
  );
}
