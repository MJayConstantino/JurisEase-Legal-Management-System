"use client"

import type React from "react"

import { ArrowUpDown } from "lucide-react"
import type { Bill, SortDirection, SortField } from "@/types/billing.type"
import { BillingsItem } from "@/components/billings/billingsItem"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Matter } from "@/types/matter.type"

interface BillingsListProps {
  matters: Matter[]
  matter?: Matter
  bills: Bill[]
  onUpdate: (bill: Bill) => void
  onDelete: (id: string) => void
  isLoading?: boolean
  sortField: SortField | null
  sortDirection: SortDirection
  onSortChange: (field: SortField) => void
}

export function BillingsList({
  bills,
  matters,
  onUpdate,
  onDelete,
  isLoading = false,
  sortField,
  sortDirection,
  onSortChange,
}: BillingsListProps) {

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[800px]">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-gray-100 dark:bg-gray-900">
            <TableRow className="text-sm md:text-base">
              <TableHead className="w-[5%] text-center text-sm md:text-base">#</TableHead>
              <TableHead className="w-[20%]">
              <div className="flex items-center cursor-pointer" onClick={() => onSortChange("matterName")}>
                  Matter Name
                  <ArrowUpDown
                    className={`ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 ${sortField === "matterName" ? "text-indigo-900 dark:text-indigo-300" : "text-gray-400 dark:text-gray-500"}`}
                  />
                </div>
              </TableHead>
              <TableHead className="w-[15%]">
                <div className="flex items-center cursor-pointer" onClick={() => onSortChange("name")}>
                  Bill Name
                  <ArrowUpDown
                    className={`ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 ${sortField === "name" ? "text-indigo-900 dark:text-indigo-300" : "text-gray-400 dark:text-gray-500"}`}
                  />

                </div>
              </TableHead>
              <TableHead className="w-[10%]">
                <div className="flex items-center cursor-pointer" onClick={() => onSortChange("amount")}>
                  Amount
                  <ArrowUpDown
                    className={`ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 ${sortField === "amount" ? "text-indigo-900 dark:text-indigo-300" : "text-gray-400 dark:text-gray-500"}`}
                  />
                  
                </div>
              </TableHead>
              <TableHead className="w-[10%]">
                <div className="flex items-center cursor-pointer" onClick={() => onSortChange("created_at")}>
                  Created At
                  <ArrowUpDown
                    className={`ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 ${sortField === "created_at" ? "text-indigo-900 dark:text-indigo-300" : "text-gray-400 dark:text-gray-500"}`}
                  />
                 
                </div>
              </TableHead>
              <TableHead className="w-[10%]">
                <div className="flex items-center cursor-pointer" onClick={() => onSortChange("status")}>
                  Status
                  <ArrowUpDown
                    className={`ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 ${sortField === "status" ? "text-indigo-900 dark:text-indigo-300" : "text-gray-400 dark:text-gray-500"}`}
                  />
                 
                </div>
              </TableHead>
              <TableHead className="w-[15%]">
                <div className="flex items-center cursor-pointer" onClick={() => onSortChange("remarks")}>
                  Remarks
                  <ArrowUpDown
                    className={`ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 ${sortField === "remarks" ? "text-indigo-900 dark:text-indigo-300" : "text-gray-400 dark:text-gray-500"}`}
                  />
                  
                </div>
              </TableHead>
              <TableHead className="w-[13%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 md:py-8 text-muted-foreground text-sm md:text-base">
                  Loading bills...
                </TableCell>
              </TableRow>
            ) : bills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 md:py-8 text-muted-foreground text-sm md:text-base">
                  No bills found. Add a new bill to get started.
                </TableCell>
              </TableRow>
            ) : (
              bills.map((bill, index) => {
                const currentMatter = matters.find((m) => m.matter_id === bill.matter_id)
                return (
                  <BillingsItem
                    key={bill.bill_id}
                    bill={bill}
                    matter={currentMatter}
                    matters={matters}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    index={index + 1}
                />
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

