import PurchaseDetailPage from "@/templates/Purchases/PurchaseDetailPage";

interface PurchaseDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function PurchaseDetailRoute({
  params,
}: PurchaseDetailRouteProps) {
  await params;
  return <PurchaseDetailPage />;
}
