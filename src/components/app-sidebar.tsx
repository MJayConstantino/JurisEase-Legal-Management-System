"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, FileText, FolderClosed, ListTodo } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <div className="bg-[#1B1E4B] text-white h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-tl-md rounded-bl-md transition-colors ${
                      isActive
                        ? "bg-white text-[#1B1E4B]"
                        : "text-white hover:text-[#A8B5DE]"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-lg">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>{"U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold">User</span>
            <span className="text-sm opacity-70">Paralegals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
