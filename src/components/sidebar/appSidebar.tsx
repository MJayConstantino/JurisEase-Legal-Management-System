'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FolderClosed, ListTodo, Receipt } from 'lucide-react'
import clsx from 'clsx'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const navItems = [
  {
    title: 'Matters',
    icon: FolderClosed,
    href: '/matters',
    matchPattern: /^\/matters($|\/)/,
  },
  {
    title: 'Tasks',
    icon: ListTodo,
    href: '/tasks',
    matchPattern: /^\/tasks($|\/)/,
  },
  {
    title: 'Billings',
    icon: Receipt,
    href: '/billings',
    matchPattern: /^\/billings($|\/)/,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="h-[100vh] bg-[#1B1E4B] dark:bg-gray-900 text-white z-0 pt-16 fixed left-0 hidden md:flex w-64 transition-all duration-300 ease-in-out"
    >
      <SidebarContent className="px-2 py-6">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = item.matchPattern.test(pathname)
            const linkClasses = clsx(
              'flex items-center gap-4 py-6 rounded-l-md transition-colors w-full px-4 group-data-[state=collapsed]:justify-center',
              {
                'bg-white text-[#1B1E4B] dark:bg-gray-700 dark:text-white':
                  isActive,
                'text-white': !isActive,
              }
            )

            return (
              <SidebarMenuItem key={item.href} className="mb-4">
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.href} className={linkClasses}>
                    <item.icon
                      size={40}
                      className="h-16 w-16 max-w-[4rem] max-h-[4rem]"
                      style={{ width: 25, height: 25 }}
                    />
                    <span className="text-xl font-medium group-data-[state=collapsed]:hidden">
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
