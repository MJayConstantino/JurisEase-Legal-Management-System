import Link from "next/link";
import { Calendar, FileText, FolderClosed, ListTodo } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="h-[100vh] bg-[#1B1E4B] text-white border-r-0 z-0 pt-16 fixed left-0 hidden md:flex"
    >
      <SidebarContent className="px-2 py-6">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href} className="mb-4">
              <SidebarMenuButton asChild className="w-full">
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 py-6 rounded-tl-md rounded-bl-md transition-colors w-full
                    group-data-[state=collapsed]:justify-center px-4
                    [&.active]:bg-white [&.active]:text-[#1B1E4B] dark:[&.active]:bg-gray-700 dark:[&.active]:text-white
                    text-white hover:text-[#A8B5DE]`}
                >
                  <item.icon className="h-12 w-12" />
                  <span className="text-xl font-medium group-data-[state=collapsed]:hidden">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
