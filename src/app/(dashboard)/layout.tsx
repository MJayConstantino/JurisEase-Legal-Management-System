"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToastProvider } from "@/components/toast-provider";
import { DashboardContent } from "@/components/dashboard/dashboardContent";
import "../globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
        <ToastProvider />
      </SidebarProvider>
    </ThemeProvider>
  );
}
