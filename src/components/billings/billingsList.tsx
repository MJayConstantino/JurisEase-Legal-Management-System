"use client"

import type React from "react"

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import type { Bill, SortDirection, SortField } from "@/types/billing.type"
import { BillingsItem } from "@/components/billings/billingsItem"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Matter } from "@/types/matter.type"
import { Button } from "../ui/button"

interface BillingsListProps {
  matters: Matter[]
  matter?: Matter
  bills: Bill[]
  onUpdate: (bill: Bill) => void
  onDelete: (id: string) => void
  sortField: SortField | null
  sortDirection: SortDirection
  onSortChange: (field: SortField) => void
  hideMatterColumn?: boolean
  isLoading?:boolean
}

export function BillingsList({
  bills,
  matters,
  onUpdate,
  onDelete,
  sortField,
  onSortChange,
  sortDirection,
  isLoading,
  hideMatterColumn = false
}: BillingsListProps) {

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
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
      onClick={() => onSortChange(field)}
      className="p-0 h-auto font-semibold flex items-center whitespace-nowrap overflow-hidden text-ellipsis"
    >
      {label} {getSortIcon(field)}
    </Button>
  );

  return (
    <div className="overflow-x-auto overflow-y-auto w-full" data-cy="scroll-container">
      <Table className="table-auto">
        <TableHeader className="bg-gray-100 dark:bg-gray-900 sticky top-0 z-10">
          <TableRow className="text-sm md:text-base">
            <TableHead className="w-[20%]">
              {renderSortableHeader("name", "Bill Name")}
            </TableHead>
            {!hideMatterColumn && (
              <TableHead className="w-[25%]">
                {renderSortableHeader("matterName", "Matter Name")}
              </TableHead>
            )}
            <TableHead className="w-[15%]">
              {renderSortableHeader("amount", "Amount")}
            </TableHead>
            <TableHead className={`${hideMatterColumn ? "w-[20%]" : "w-[15%]"}`}>
              {renderSortableHeader("remarks", "Remarks")}
            </TableHead>
            <TableHead className="w-[10%]">Status</TableHead>
            <TableHead className="w-[10%]">
              {renderSortableHeader("created_at", "Date Billed")}
            </TableHead>
            <TableHead className="w-[5%] pr-5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={hideMatterColumn ? 7 : 8}
                className="text-center py-6 md:py-8 text-muted-foreground text-sm md:text-base"
              >
                Loading Bills...
              </TableCell>
            </TableRow>
          ) : bills.length > 0 ? (
            bills.map((bill, index) => (
              <BillingsItem
                key={bill.bill_id}
                bill={bill}
                matters={matters}
                onUpdate={onUpdate}
                onDelete={onDelete}
                index={index + 1}
                hideMatterColumn={hideMatterColumn}
              />
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={hideMatterColumn ? 7 : 8}
                className="text-center py-6 md:py-8 text-muted-foreground text-sm md:text-base"
              >
                No bills found. Add a new bill to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

