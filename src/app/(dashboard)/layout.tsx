import type React from 'react'
// import { useRouter } from 'next/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ToastProvider } from '@/components/toast-provider'
import { DashboardContent } from '@/components/dashboard/dashboardContent'
import '../globals.css'
import { protectRoute } from '@/utils/supabase/server'
// import { useEffect } from 'react'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await protectRoute()
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
  )
}
