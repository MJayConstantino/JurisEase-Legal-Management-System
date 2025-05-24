"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SortDirection, SortField } from "@/types/task.type";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TaskTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  hideMatterColumn?: boolean;
}

export function TaskTableHeader({
  sortField,
  sortDirection,
  onSort,
  hideMatterColumn = false,
}: TaskTableHeaderProps) {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <ArrowUpDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
      );
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
    );
  };

  const renderSortableHeader = (field: SortField, label: string) => {
    return (
      <Button
        variant="ghost"
        onClick={() => onSort(field)}
        className="p-0 h-auto text-xs md:text-sm font-semibold hover:bg-transparent focus:bg-transparent dark:hover:bg-transparent dark:focus:bg-transparent dark:text-gray-white whitespace-nowrap"
      >
        <span className="max-w-[60px] md:max-w-none truncate">{label}</span>{" "}
        {getSortIcon(field)}
      </Button>
    );
  };

  return (
    <TableHeader className="bg-gray-100 dark:bg-gray-900">
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-[50px] p-1 md:p-2 text-center">
          <span className="sr-only">Checkbox</span>
        </TableHead>
        <TableHead
          className={`p-1 md:p-2 ${
            hideMatterColumn ? "w-[40%] md:w-[45%] text-center" : "w-[25%] md:w-[30%] text-center"
          }`}
        >
          {renderSortableHeader("name", "Task Name")}
        </TableHead>

        {!hideMatterColumn && (
          <TableHead className="w-[20%] text-center md:table-cell">
            {renderSortableHeader("matter_id", "Matter")}
          </TableHead>
        )}

        <TableHead className="p-1 md:p-2 w-[15%] text-center">
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
            Status
          </span>
        </TableHead>
        <TableHead className="p-1 md:p-2 w-[15%] text-center">
          {renderSortableHeader("priority", "Priority")}
        </TableHead>
        <TableHead className="p-1 md:p-2 w-[15%] text-center sm:table-cell">
          {renderSortableHeader("due_date", "Due Date")}
        </TableHead>
        <TableHead className="p-1 md:p-2 w-[50px] md:w-[80px] text-right">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
