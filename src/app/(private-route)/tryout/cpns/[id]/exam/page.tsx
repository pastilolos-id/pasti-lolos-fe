import { Suspense } from "react";
import ExamPage from "@/templates/Tryout/ExamPage";

interface CpnsExamPageProps {
  params: Promise<{ id: string }>;
}

export default async function CpnsExamPage({ params }: CpnsExamPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={null}>
      <ExamPage category="cpns" id={id} />
    </Suspense>
  );
}
