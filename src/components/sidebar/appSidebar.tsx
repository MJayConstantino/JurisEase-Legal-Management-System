"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, FileText, FolderClosed, ListTodo } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

// Navigation items
const navItems = [
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Matters",
    icon: FolderClosed,
    href: "/matters",
  },
  {
    title: "Tasks",
    icon: ListTodo,
    href: "/tasks",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/documents",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="h-[100vh] bg-[#1B1E4B] text-white border-r-0 z-0 pt-16 fixed left-0"
    >
      <SidebarContent className="px-2 py-6">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href} className="mb-4">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={isCollapsed ? item.title : undefined}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 py-6 rounded-tl-md rounded-bl-md transition-colors w-full
                      ${isCollapsed ? "justify-center px-4" : "px-4"}
                      ${
                        isActive
                          ? "bg-white text-[#1B1E4B] dark:bg-gray-700 dark:text-white"
                          : "text-white hover:text-[#A8B5DE]"
                      }`}
                  >
                    <item.icon className="h-12 w-12" />
                    {!isCollapsed && (
                      <span className="text-xl font-medium">{item.title}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
