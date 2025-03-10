"use client";
import { PlusCircle, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";

// Mock user data
const user = {
  name: "Jane Smith",
  avatar: "/placeholder.svg?height=40&width=40",
};

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center w-full justify-between border-b bg-[#2D336B] px-4 text-white">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-white/20">
            {/* Logo placeholder */}
          </div>
          <span className="text-lg font-bold">Dianson Law Firm</span>
        </div>
      </div>

      <div className="relative mx-4 flex-1 max-w-md">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        <Input
          placeholder="Search..."
          className="h-9 w-full bg-white/10 pl-8 text-white placeholder:text-white/50 focus-visible:ring-white/30"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button className="bg-white/20 text-white hover:bg-white/30">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New
        </Button>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
