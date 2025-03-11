"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, FileText, FolderClosed, ListTodo } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

  return (
    <Sidebar
      variant="sidebar"
      collapsible={isMobile ? "offcanvas" : "icon"}
      className={`h-[calc(100vh)] bg-[#1B1E4B] text-white border-r-0 z-10 ${
        isMobile ? "" : "pt-16 fixed left-0"
      }`}
    >
      <SidebarContent className="px-2 py-4">
        {isMobile && (
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-xl font-bold">Dianson Law Office</h1>
          </div>
        )}
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={!isMobile && isCollapsed ? item.title : undefined}
                  className={`flex items-center gap-3 ${
                    !isMobile && isCollapsed ? "justify-center" : "px-4"
                  } py-3 rounded-tl-md rounded-bl-md transition-colors ${
                    isActive
                      ? "bg-white dark:bg-gray-700 text-[#1B1E4B] dark:text-white"
                      : "text-white hover:text-[#A8B5DE]"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 w-full"
                  >
                    <item.icon
                      className={`h-7 w-7 ${
                        !isMobile && isCollapsed ? "mr-0" : ""
                      }`}
                    />
                    {(isMobile || !isCollapsed) && (
                      <span className="text-lg font-medium">{item.title}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter
        className={`border-t border-white/10 p-4 mt-auto ${
          !isMobile && isCollapsed ? "items-center justify-center" : ""
        }`}
      >
        {!isMobile && isCollapsed ? (
          <Avatar className="h-10 w-10 border-2 border-white">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt={"User"}
            />
            <AvatarFallback className="text-black dark:text-white">
              {"U"}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={"User"}
              />
              <AvatarFallback className="text-black dark:text-white">
                {"U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold">{"User"}</span>
              <span className="text-sm opacity-70">Paralegals</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
