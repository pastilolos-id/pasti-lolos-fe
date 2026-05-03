type RulesSectionProps = {
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  standardScores: { key: string; value: string }[];
};

export default function RulesSection(props: RulesSectionProps) {
  return (
    <>
      <h1 className="text-h3 text-neutral-6">Aturan Tryout</h1>
      <p className="mt-4 text-neutral-5 text-b2">
        Pastikan jaringan kamu tidak dalam gangguan
      </p>

      <div className="mt-8 space-y-4 text-b2">
        <div className="flex rounded-full border border-neutral-3 px-5 py-3">
          <span className="w-40 text-neutral-5">Nama Tryout</span>
          <span className="text-neutral-5 mr-5">:</span>
          <span className="font-semibold text-neutral-6">{props.title}</span>
        </div>
        <div className="flex rounded-full border border-neutral-3 px-5 py-3">
          <span className="w-40 text-neutral-5">Jumlah Soal</span>
          <span className="text-neutral-5 mr-5">:</span>
          <span className="font-semibold text-neutral-6">
            {props.totalQuestions} Soal
          </span>
        </div>
        <div className="flex rounded-full border border-neutral-3 px-5 py-3">
          <span className="w-40 text-neutral-5">Waktu Pengerjaan</span>
          <span className="text-neutral-5 mr-5">:</span>
          <span className="font-semibold text-neutral-6">
            {props.durationMinutes} menit
          </span>
        </div>
        <div className="flex rounded-3xl border border-neutral-3 px-5 py-4">
          <span className="w-40 text-neutral-5">Nilai Standar</span>
          <span className="text-neutral-5 mr-5">:</span>
          <div className="space-y-2 font-semibold text-neutral-6">
            {props.standardScores.map((score) => (
              <p key={score.key}>
                {score.key} : {score.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
