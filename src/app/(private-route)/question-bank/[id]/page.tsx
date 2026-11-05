import QuestionBankDetailPage from "@/templates/QuestionBank/QuestionBankDetailPage";

type QuestionBankDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function QuestionBankDetailRoute({
  params,
}: QuestionBankDetailRouteProps) {
  const { id } = await params;
  return <QuestionBankDetailPage bankId={id} />;
}
