import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pasti Lolos",
  description:
    "Pendamping Belajarmu Menuju Seleksi BUMN & CPNS - Buat tujuanmu tercapai dengan latihanmu yang maksimal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${robotoMono.variable} antialiased bg-gradient-root-layout`}
      >
        <div className="mx-auto">{children}</div>
      </body>
    </html>
  );
}
