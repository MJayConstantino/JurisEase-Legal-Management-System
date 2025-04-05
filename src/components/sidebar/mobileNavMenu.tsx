import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Receipt, X } from "lucide-react";
import { FolderClosed, ListTodo } from "lucide-react";

const navItems = [

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
    title: "Billings",
    icon: Receipt,
    href: "/billings",
  },
];

export function MobileNavMenu() {
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
        <SheetHeader className="p-6 border-b border-white/10 text-left">
          <SheetTitle className="text-2xl font-bold text-white">
            Dianson Law Office
          </SheetTitle>
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-5 w-5 text-white" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100%-80px)]">
          <nav className="flex-1 p-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-4 rounded-md transition-colors
                      [&.active]:bg-white [&.active]:text-[#1B1E4B]
                      text-white hover:text-[#A8B5DE]`}
                  >
                    <item.icon className="h-8 w-8" />
                    <span className="text-xl font-medium">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
