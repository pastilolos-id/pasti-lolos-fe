import { Icon } from "@/components";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn, formatToCurrency } from "@/lib/utils";
import { planData } from "./pricingData";
import Link from "next/link";

export default function Pricing() {
  return (
    <section
      id="plans"
      className="rounded-card-large font-bold py-13 px-4 bg-white"
    >
      <h2 className="mb-10 -tracking-wide md:-tracking-wider text-2xl md:text-h2 max-w-sm text-center mx-auto">
        Pilih Paket Sesuai Kebutuhanmu
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-11">
        {planData.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "w-max shrink-0 rounded-card-medium p-8 gap-0",
              plan.isRecommended
                ? "bg-gradient-pricing-card-recommended shadow-pricing-card-recommended text-white lg:rotate-1 lg:translate-y-1"
                : "bg-inherit text-neutral-6",
            )}
          >
            <CardHeader className="mb-6.5 min-w-max p-0 @container-normal">
              <CardTitle className="mb-3 gap-0 whitespace-nowrap font-extrabold text-2xl leading-1.4 tracking-normal">
                {plan.title}
              </CardTitle>
              <CardDescription className="whitespace-nowrap font-extrabold text-h2">
                {formatToCurrency(plan.price)}
              </CardDescription>
            </CardHeader>

            <CardContent className="mb-13 flex w-full flex-col gap-4 p-0">
              {plan.benefitList.map((benefit) => (
                <div
                  key={benefit.order}
                  className={`flex w-full items-center gap-3 rounded-full border border-[#E3E3E3] p-4 inset-shadow-secondary-button ${benefit.isInclude ? "bg-white text-neutral-6" : "bg-red text-white"}`}
                >
                  <Icon
                    name={
                      benefit.isInclude
                        ? "checklist-circle-fill-green"
                        : "cross-circle-fill"
                    }
                  />
                  <p>{benefit.name}</p>
                </div>
              ))}
            </CardContent>

            <CardFooter className="p-0">
              {plan.isRecommended ? (
              <Button
                  variant="primary"
                  className="w-full rounded-full text-2xl border border-white"
                >
                  <Link href="/login">
                    Beli Sekarang
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full rounded-full text-2xl border border-[#80B0FF80]"
                >
                  <Link href="/login">
                    Beli Sekarang
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
