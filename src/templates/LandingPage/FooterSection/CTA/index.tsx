import { Button } from "@/components/ui";

export default function CTA() {
  return (
    <div className="flex flex-col items-center text-white pt-10 px-3 text-center">
      <h2 className="max-w-2xl text-2xl -tracking-wide md:text-h2 font-bold mb-6">
        Saatnya Mengubah Usaha dan Do&rsquo;a Menjadi Hasil Nyata
      </h2>
      <div className="text-b3 md:text-b1 mb-11">
        <p>Jangan menunggu sampai hari ujian untuk tahu kesiapanmu.</p>
        <p> Mulai latihan sekarang dan tingkatkan peluang kelulusanmu.</p>
      </div>
      <Button className="mb-8.5 border border-white inset-shadow-primary-button text-base px-8">
        Belajar Sekarang
      </Button>
    </div>
  );
}
