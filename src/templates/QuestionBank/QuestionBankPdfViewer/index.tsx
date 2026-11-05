import { cn } from "@/lib/utils";

type QuestionBankPdfViewerProps = {
  pdfUrl: string;
  title: string;
  className?: string;
};

export default function QuestionBankPdfViewer({
  pdfUrl,
  title,
  className,
}: QuestionBankPdfViewerProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-neutral-3 bg-neutral-2",
        className,
      )}
    >
      <iframe
        title={title}
        src={pdfUrl}
        className="h-[min(85vh,800px)] w-full min-h-[480px] bg-white"
      />
    </div>
  );
}
