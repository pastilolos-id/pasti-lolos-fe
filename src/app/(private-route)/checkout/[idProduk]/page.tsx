import CheckoutPage, {
  type CheckoutProductType,
} from "@/templates/Checkout/CheckoutPage";

interface CheckoutRouteProps {
  params: Promise<{ idProduk: string }>;
  searchParams: Promise<{ productType?: string }>;
}

function mapProductType(value?: string): CheckoutProductType {
  if (value === "course") {
    return "course";
  }

  return "tryout";
}

export default async function CheckoutRoute({
  params,
  searchParams,
}: CheckoutRouteProps) {
  const { idProduk } = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <CheckoutPage
      idProduk={idProduk}
      productType={mapProductType(resolvedSearchParams.productType)}
    />
  );
}
