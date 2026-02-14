import Image from "next/image";
import authImage from "@/assets/images/auth-page/hero.jpg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-white">
      <div>{children}</div>

      <div className="bg-white hidden lg:block fixed h-screen w-1/2 right-0 top-0 px-5 pt-6 pb-6.5">
        <div className="relative w-full h-[calc(100vh-50px)] rounded-4xl">
          <Image
            src={authImage}
            alt="Auth Image"
            className="object-cover rounded-4xl"
            fill
            priority
          />

          <div className="absolute top-0 bottom-0 pb-18.5 px-20 w-full text-white flex flex-col justify-end bg-gradient-auth-layout-hero rounded-4xl">
            <h2 className="text-h1 font-bold max-w-110">
              Usaha Dan Do&rsquo;a Bisa Menjadi Nyata
            </h2>
            <p className="text-b1 max-w-100">
              Buat tujuanmu tercapai dengan latihanmu yang maksimal{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
