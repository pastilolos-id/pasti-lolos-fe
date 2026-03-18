import { Sidebar } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";

export default function PrivateRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-primary-5">
      <Sidebar />
      <div className="w-full h-screen py-4 pr-4">
        <div className="fixed h-screen flex items-center">
          <SidebarTrigger className="" />
        </div>
        <div className="w-full h-full bg-white rounded-card-medium pl-8 pt-7">
          {/* <p>PrivateRouteLayout</p> */}
          <div>Halaman {children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
