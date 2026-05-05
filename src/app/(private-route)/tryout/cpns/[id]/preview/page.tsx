import TryoutPreviewPage from "@/templates/Tryout/TryoutPreviewPage";

interface TryoutCpnsDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TryoutCpnsDetailRoute({
  params,
}: TryoutCpnsDetailRouteProps) {
  const { id } = await params;
  return <TryoutPreviewPage category="cpns" tryoutId={id} />;
}
