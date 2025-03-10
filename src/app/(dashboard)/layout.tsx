"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header/header";
import { ToastProvider } from "@/components/toast-provider";
import "../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex h-screen w-screen flex-col">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="flex flex-1 overflow-hidden">
            <div
              className={`transition-all duration-300 ${
                isSidebarOpen ? "w-64" : "w-0"
              }`}
            >
              {isSidebarOpen && <AppSidebar />}
            </div>
            <main className="flex-1 overflow-auto bg-white p-6">
              {children}
            </main>
          </div>
        </div>
        <ToastProvider />
      </SidebarProvider>
    </ThemeProvider>
  );
}
