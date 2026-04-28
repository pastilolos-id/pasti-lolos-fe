import { notFound } from "next/navigation";

import PurchaseDetailPage from "@/templates/Purchases/PurchaseDetailPage";
import { getPurchaseById } from "@/templates/Purchases/purchasesData";

interface PurchaseDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function PurchaseDetailRoute({
  params,
}: PurchaseDetailRouteProps) {
  const { id } = await params;
  const purchase = getPurchaseById(id);

  if (!purchase) {
    notFound();
  }

  return <PurchaseDetailPage purchase={purchase} />;
}
