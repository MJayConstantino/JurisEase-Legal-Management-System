"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SortDirection, SortField } from "@/types/task.type";

interface TaskTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function TaskTableHeader({
  sortField,
  sortDirection,
  onSort,
}: TaskTableHeaderProps) {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const renderSortableHeader = (field: SortField, label: string) => (
    <Button
      variant="ghost"
      onClick={() => onSort(field)}
      className=" text-sm items-center hover:bg-transparent dark:hover:bg-transparent dark:text-gray-300"
    >
      {label} {getSortIcon(field)}
    </Button>
  );

  return (
    <div className="border-b-1 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-x-auto">
      <div className="grid grid-cols-12 gap-3 py-0 min-w-[600px]">
        <div className="col-span-1">
          <span className="sr-only">Status</span>
        </div>
        <div className="col-span-3 truncate">
          {renderSortableHeader("name", "Task Name")}
        </div>
        <div className="hidden md:block col-span-2 truncate">
          {renderSortableHeader("matter_id", "Matter")}
        </div>
        <div className="col-span-2 sm:col-span-2 text-center truncate">
          {renderSortableHeader("status", "Status")}
        </div>
        <div className="hidden sm:block col-span-2 truncate">
          {renderSortableHeader("due_date", "Due Date")}
        </div>
        <div className="col-span-2 sm:col-span-1 text-center truncate">
          {renderSortableHeader("priority", "Priority")}
        </div>
      </div>
    </div>
  );
}