import { notFound } from "next/navigation";
import { getTryoutById } from "@/templates/Tryout/data";
import TryoutPreviewPage from "@/templates/Tryout/TryoutPreviewPage";

interface TryoutBumnDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TryoutBumnDetailRoute({
  params,
}: TryoutBumnDetailRouteProps) {
  const { id } = await params;
  const tryout = getTryoutById("bumn", id);

  if (!tryout) {
    notFound();
  }

  return <TryoutPreviewPage category="bumn" tryout={tryout} />;
}
