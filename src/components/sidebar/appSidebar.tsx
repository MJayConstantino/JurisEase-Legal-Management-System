import Link from "next/link";
import { Calendar, FileText, FolderClosed, ListTodo, Receipt } from "lucide-react";
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
  {
    title: "Billings",
    icon: Receipt,
    href: "/billings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="h-[100vh] bg-[#1B1E4B] text-white z-0 pt-16 fixed left-0 hidden md:flex w-64 transition-all duration-300 ease-in-out"
    >
      <SidebarContent className="px-2 py-6">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href} className="mb-4">
              <SidebarMenuButton asChild>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 py-6 rounded-l-md transition-colors w-full px-4
                    group-data-[state=collapsed]:justify-center
                    [&.active]:bg-white [&.active]:text-[#1B1E4B] dark:[&.active]:bg-gray-700 dark:[&.active]:text-white
                    text-white hover:text-[#A8B5DE]`}
                >
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
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
