import { Sidebar, TokenValidator } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";

export default function PrivateRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-primary-5">
      <TokenValidator />
      <Sidebar />
      <div className="w-full min-h-screen py-4 pr-4 md:pl-0 sm:p-6 p-3">
        <div className="fixed h-screen flex items-center z-50">
          <SidebarTrigger className="" />
        </div>
        <div className="w-full min-h-full bg-white rounded-card-medium md:p-3 sm:p-6 p-3">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
