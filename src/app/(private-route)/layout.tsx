import { BottomNavBar, Sidebar, TokenValidator, TopBar } from "@/components";
import NotificationsRealtimeBridge from "@/components/Notifications/NotificationsRealtimeBridge";
import { SidebarProvider } from "@/components/ui";

export default function PrivateRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-primary-5 relative">
      <TokenValidator />
      <NotificationsRealtimeBridge />
      <Sidebar />
      <div className="w-full min-h-screen h-full py-4 pr-4 lg:pl-0 sm:p-6 p-3">
        <TopBar />

        <div className="w-full min-h-full bg-white rounded-card-medium lg:p-3 sm:p-6 p-3 mt-28 lg:mt-0">
          {children}
        </div>

        <BottomNavBar />
      </div>
    </SidebarProvider>
  );
}
