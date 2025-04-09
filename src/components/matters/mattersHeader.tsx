"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddMatterDialog } from "./addMatterDialog";

interface MattersHeaderProps {
  onStatusChange: (status: string) => void;
}

export function MattersHeader({ onStatusChange }: MattersHeaderProps) {
  const [isAddMatterOpen, setIsAddMatterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onStatusChange(filter);
  };

  return (
    <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
            className="px-3 py-1 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("all")}
          >
            All Matters
          </Button>
          <Button
            variant={activeFilter === "open" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("open")}
          >
            Open
          </Button>
          <Button
            variant={activeFilter === "pending" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            variant={activeFilter === "closed" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-medium rounded-md flex-1 sm:flex-none hover:cursor-pointer"
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
