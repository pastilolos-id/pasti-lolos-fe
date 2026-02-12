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
import { cn } from "@/lib/utils";
import { planData } from "./pricingData";

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
              "max-w-136 rounded-card-medium p-8 gap-0", // Class dasar
              plan.isRecommended
                ? "bg-gradient-pricing-card-recommended shadow-pricing-card-recommended text-white lg:rotate-1 lg:translate-y-1"
                : "bg-inherit text-neutral-6",
            )}
            // className={`max-w-136 rounded-card-medium p-8 gap-0 ${plan.isRecommended ? "bg-gradient-pricing-card-recommended shadow-pricing-card-recommended inset-shadow-pricing-card-recommended text-white lg:rotate-1 lg:translate-y-1" : "bg-inherit text-neutral-6"}`}
          >
            <CardHeader className="mb-6.5 p-0">
              <CardTitle className="mb-3 gap-0 font-extrabold text-2xl leading-1.4 tracking-normal">
                {plan.title}
              </CardTitle>
              <CardDescription className="font-extrabold text-h2">
                {plan.price}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 mb-13 p-0 ">
              {plan.benefitList.map((benefit) => (
                <div
                  key={benefit.order}
                  className={`rounded-full p-4 flex items-center gap-3 border border-[#E3E3E3] inset-shadow-secondary-button ${benefit.isInclude ? "bg-white text-neutral-6" : "bg-red text-white"}`}
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
                  Beli Sekarang
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full rounded-full text-2xl border border-[#80B0FF80]"
                >
                  Beli Sekarang
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
