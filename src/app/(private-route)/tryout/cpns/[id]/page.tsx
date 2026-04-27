import { notFound } from "next/navigation";

import TryoutDetailPage from "@/templates/Tryout/TryoutDetailPage";
import { getTryoutById } from "@/templates/Tryout/data";

interface TryoutCpnsDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TryoutCpnsDetailRoute({ params }: TryoutCpnsDetailRouteProps) {
  const { id } = await params;
  const tryout = getTryoutById("cpns", id);

  if (!tryout) {
    notFound();
  }

  return <TryoutDetailPage category="cpns" tryout={tryout} />;
}
