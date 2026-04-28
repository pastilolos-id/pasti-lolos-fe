import { notFound } from "next/navigation";
import { getTryoutById } from "@/templates/Tryout/data";
import TryoutPreviewPage from "@/templates/Tryout/TryoutPreviewPage";

interface TryoutCpnsDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TryoutCpnsDetailRoute({
  params,
}: TryoutCpnsDetailRouteProps) {
  const { id } = await params;
  const tryout = getTryoutById("cpns", id);

  if (!tryout) {
    notFound();
  }

  return <TryoutPreviewPage category="cpns" tryout={tryout} />;
}
