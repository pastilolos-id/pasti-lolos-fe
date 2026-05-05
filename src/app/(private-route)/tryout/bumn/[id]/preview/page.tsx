import TryoutPreviewPage from "@/templates/Tryout/TryoutPreviewPage";

interface TryoutBumnDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function TryoutBumnDetailRoute({
  params,
}: TryoutBumnDetailRouteProps) {
  const { id } = await params;
  return <TryoutPreviewPage category="bumn" tryoutId={id} />;
}
