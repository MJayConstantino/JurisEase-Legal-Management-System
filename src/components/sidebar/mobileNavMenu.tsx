"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Calendar, FileText, FolderClosed, ListTodo } from "lucide-react";

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

export function MobileNavMenu() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-7 w-7" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-[#1B1E4B] text-white p-0 w-[300px]"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold">Dianson Law Office</h2>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-4 px-4 py-4 rounded-md transition-colors ${
                        isActive
                          ? "bg-white text-[#1B1E4B]"
                          : "text-white hover:text-[#A8B5DE]"
                      }`}
                    >
                      <item.icon className="h-8 w-8" />
                      <span className="text-xl font-medium">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="p-6 border-t border-white/10">
            <p className="text-sm opacity-70">© 2023 Dianson Law Office</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
