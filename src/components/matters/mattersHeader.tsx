"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Menu } from "lucide-react";
import { AddMatterDialog } from "./addMatterDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface MattersHeaderProps {
  onStatusChange: (status: string) => void;
}

export function MattersHeader({ onStatusChange }: MattersHeaderProps) {
  const [isAddMatterOpen, setIsAddMatterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onStatusChange(filter);
    setMenuOpen(false);
  };

  return (
    <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
      {/* Mobile View */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <Button
          variant="blue"
          size="sm"
          onClick={() => setIsAddMatterOpen(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          <span className="text-xs">Add Matter</span>
        </Button>

        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open filters</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Filter Matters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["all", "open", "pending", "closed"].map((filter) => (
              <DropdownMenuItem
                key={filter}
                className={
                  activeFilter === filter ? "bg-[#1B1E4B] text-white" : ""
                }
                onClick={() => handleFilterChange(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Add Matter Button */}
        <Button
          variant="blue"
          size="sm"
          className="sm:h-9"
          onClick={() => setIsAddMatterOpen(true)}
        >
          <Plus className="h-3 w-3 mr-1 sm:mr-2" />
          <span className="text-xs sm:text-sm">Add Matter</span>
        </Button>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md justify-center sm:justify-start">
          <Button
            variant={activeFilter === "all" ? "blue" : "ghost"}
            size="sm"
            className="px-3 py-1 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("all")}
          >
            All Matters
          </Button>
          <Button
            variant={activeFilter === "open" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("open")}
          >
            Open
          </Button>
          <Button
            variant={activeFilter === "pending" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            variant={activeFilter === "closed" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("closed")}
          >
            Closed
          </Button>
        </div>
      </div>

      <AddMatterDialog
        open={isAddMatterOpen}
        onOpenChange={setIsAddMatterOpen}
      />
    </div>
  );
}
