import Link from "next/link";

import { Icon } from "@/components";
import { buttonVariants } from "@/components/ui";
import { cn, formatToCurrency } from "@/lib/utils";
import { getPurchaseIdFromTryout } from "@/templates/Purchases/purchasesData";
import type { TryoutCategory, TryoutItem } from "../data";

interface TryoutDetailPageProps {
  category: TryoutCategory;
  tryout: TryoutItem;
}

export default function TryoutDetailPage({
  category,
  tryout,
}: TryoutDetailPageProps) {
  const hasSpecialPrice =
    typeof tryout.specialPrice === "number" &&
    typeof tryout.originalPrice === "number";
  const purchaseId = getPurchaseIdFromTryout(category, tryout.id);

  return (
    <section className="space-y-4">
      <Link
        href={`/tryout/${category}`}
        className="group inline-flex items-center gap-2 mt-3 ml-3 text-s1 text-neutral-6"
      >
        <div className="bg-primary-4 group-hover:bg-primary-5 rounded-full p-2.25 transition-colors">
          <Icon name="arrow-left-circle" size={15} />
        </div>
        <span>Kembali</span>
      </Link>

      <div className="mb-6 rounded-3xl border border-neutral-3 p-4">
        <div className="mb-4 flex gap-4 sm:items-center">
          <Icon name="text-box-edit-blue" size={150} />

          <div>
            <h1 className="text-h4 text-neutral-6 mb-2">{tryout.title}</h1>
            <div className="mb-3 flex items-center gap-4 text-c1 text-neutral-5">
              <div className="flex items-center gap-1">
                <Icon name="exam-multiple-choice-outline" size={20} />
                <span>{tryout.totalQuestions} Soal</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="time-outlined" size={20} />
                <span>{tryout.durationMinutes} Menit</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-b2 text-neutral-6">
                {hasSpecialPrice ? "Harga Spesial" : "Harga"}
              </p>
              <p
                className={
                  hasSpecialPrice
                    ? "text-h4 text-red"
                    : "text-h4 text-neutral-6"
                }
              >
                {formatToCurrency(
                  hasSpecialPrice ? (tryout.specialPrice ?? 0) : tryout.price,
                )}
              </p>
              {hasSpecialPrice ? (
                <p className="text-b2 text-neutral-6 line-through">
                  {formatToCurrency(tryout.originalPrice ?? 0)}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <Link
          href={`/purchases/${purchaseId}`}
          className={cn(
            buttonVariants({ size: "default" }),
            "w-full rounded-full text-s1 text-white bg-red hover:bg-red/75",
          )}
        >
          Beli Sekarang
        </Link>
      </div>

      <div className="rounded-3xl border-6 border-primary-4 p-6 space-y-3">
        {tryout.sections.map((section) => (
          <article
            key={section.id}
            className="rounded-3xl border border-neutral-3 p-6"
          >
            <h2 className="mb-4 text-h4">{section.title}</h2>
            <div className="flex items-center gap-4 text-b2">
              <span className="flex items-center gap-1">
                <Icon
                  name="exam-multiple-choice-outline"
                  size={32}
                  fill="white"
                />
                {section.totalQuestions} Soal
              </span>
              <span className="flex items-center gap-2">
                <span className="text-yellow text-3xl">★</span>
                <span>Passing Grade {section.passingGrade}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
