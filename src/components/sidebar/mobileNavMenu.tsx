"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FolderClosed, ListTodo, Receipt } from "lucide-react";

const navItems = [
  {
    title: "Matters",
    icon: FolderClosed,
    href: "/matters",
    matchPattern: /^\/matters($|\/)/,
  },
  {
    title: "Tasks",
    icon: ListTodo,
    href: "/tasks",
    matchPattern: /^\/tasks($|\/)/,
  },
  {
    title: "Billings",
    icon: Receipt,
    href: "/billings",
    matchPattern: /^\/billings($|\/)/,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden z-20">
      <nav className="h-full">
        <ul className="flex items-center justify-around h-full">
          {navItems.map((item) => {
            const isActive = item.matchPattern.test(pathname);

            return (
              <li key={item.href} className="flex-1 h-full">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center justify-center h-full px-2
                    ${
                      isActive
                        ? "text-primary font-medium"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                >
                  <item.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
