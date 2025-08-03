import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "buyer" | "seller"
}

export function DashboardLayout({ children,userRole }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full mt-[50px]">
        <AppSidebar userRole={userRole} />
        <main className="flex-1 bg-background">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
