import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          // current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <>
      <Toaster />
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <div className="flex p-4 flex-col h-screen">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  ),
});
