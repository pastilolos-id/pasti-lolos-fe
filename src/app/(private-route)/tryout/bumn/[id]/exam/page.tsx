import ExamPage from "@/templates/Tryout/ExamPage";

interface BumnExamPageProps {
  params: Promise<{ id: string }>;
}

export default async function BumnExamPage({ params }: BumnExamPageProps) {
  const { id } = await params;

  return <ExamPage category="bumn" id={id} />;
}
