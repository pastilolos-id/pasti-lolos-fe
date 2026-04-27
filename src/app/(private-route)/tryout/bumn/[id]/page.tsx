import { notFound } from "next/navigation";

import TryoutDetailPage from "@/templates/Tryout/TryoutDetailPage";
import { getTryoutById } from "@/templates/Tryout/data";

interface TryoutBumnDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TryoutBumnDetailRoute({ params }: TryoutBumnDetailRouteProps) {
  const { id } = await params;
  const tryout = getTryoutById("bumn", id);

  if (!tryout) {
    notFound();
  }

  return <TryoutDetailPage category="bumn" tryout={tryout} />;
}
