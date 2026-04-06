import { Sidebar, TokenValidator, TopBar } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";

export default function PrivateRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-primary-5 relative">
      <TokenValidator />
      <Sidebar />
      <div className="w-full min-h-screen h-full py-4 pr-4 lg:pl-0 sm:p-6 p-3">
        <div className="fixed h-screen items-center z-50 hidden lg:flex">
          <SidebarTrigger className="" />
        </div>
        <TopBar />
        <div className="w-full min-h-full bg-white rounded-card-medium lg:p-3 sm:p-6 p-3 mt-28 lg:mt-0">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
