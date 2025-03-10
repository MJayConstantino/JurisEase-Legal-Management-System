"use client";
import { Menu, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import CreateNewButton from "./createNewButton";
import HeaderAvatar from "./headerAvatar";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="w-full h-28 bg-[#2D336B] text-white flex items-center justify-between px-8 py-2 z-10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-[#2D336B]"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="font-bold">
          <span className="text-3xl">Dianson </span>
          <div className="text-2xl">Law Office</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Input
            placeholder="Search"
            className="h-10 bg-white text-[#1B1E4B] pl-10 rounded-md"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B1E4B]" />
        </div>

        <CreateNewButton />
        <ModeToggle />
        <HeaderAvatar />
      </div>
    </header>
  );
}
