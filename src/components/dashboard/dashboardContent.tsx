import type React from "react";
import { AppSidebar } from "@/components/sidebar/appSidebar";
import { Header } from "@/components/header/header";

export function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-16">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-white dark:bg-neutral-800 p-6 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
