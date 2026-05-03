import Link from "next/link";

import { Icon } from "@/components";
import { Button } from "@/components/ui";
import type { TryoutCategory } from "../data";
import RulesSection from "./RulesSection";

interface ExamPageProps {
  category: TryoutCategory;
  id: string;
}

const standardScores: { key: string; value: string }[] = [
  { key: "TWK", value: "65" },
  { key: "TIU", value: "80" },
  { key: "TKP", value: "166" },
];

export default function ExamPage({ category, id }: ExamPageProps) {
  return (
    <section className="rounded-card-medium min-h-[calc(100vh-75px)] border border-neutral-3 bg-neutral-1 p-4 sm:p-10">
      <RulesSection
        title="Tryout Pertama"
        totalQuestions={110}
        durationMinutes={150}
        standardScores={standardScores}
      />

      <div className="mt-15 flex flex-col gap-3  sm:flex-row sm:justify-between">
        <Link href={`/tryout/${category}/${id}/preview`}>
          <Button
            variant="outline"
            size="default"
            className="w-full sm:w-41 px-6 py-3 sm:justify-between text-s1 rounded-full border-primary-4/50"
          >
            <Icon
              name="arrow-left-circle-bg-blue"
              size={24}
              fill="#80B0FF"
              stroke="#80B0FF"
            />
            Kembali
          </Button>
        </Link>

        <Button
          variant="primary"
          size="default"
          className="w-full sm:w-41 px-6 py-3 sm:justify-between text-s1 rounded-full text-neutral-1"
        >
          Mulai
          <Icon name="arrow-left-circle" size={24} className="rotate-180" />
        </Button>
      </div>
    </section>
  );
}
