// This is the main table and header row for the list of bills.

"use client"

import type React from "react"

import { ArrowUpDown } from "lucide-react"
import type { Bill, Client, SortDirection, SortField } from "@/types/billing.type"
import { BillingsItem } from "@/components/billings/billingsItem"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface BillingsListProps {
  bills: Bill[]
  clients: Client[]
  onUpdate: (bill: Bill) => void
  onDelete: (id: string) => void
  isLoading?: boolean
  sortField: SortField | null
  sortDirection: SortDirection
  onSortChange: (field: SortField) => void
}

export function BillingsList({
  bills,
  clients,
  onUpdate,
  onDelete,
  isLoading = false,
  sortField,
  sortDirection,
  onSortChange,
}: BillingsListProps) {
  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead className="cursor-pointer text-sm md:text-base">
      <div className="flex items-center" onClick={() => onSortChange(field)}>
        {children}
        <ArrowUpDown
          className={`ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 ${sortField === field ? "text-indigo-900" : "text-gray-400"}`}
        />
        {sortField === field && (
          <span className="ml-1 text-xs md:text-sm text-indigo-900 font-bold">
            {sortDirection === "asc" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </TableHead>
  )

  return (
    <div className="overflow-x-auto dark:hover:bg-gray-800">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="text-sm md:text-base">
          <TableHead className="w-12 text-center text-sm md:text-base">#</TableHead>
            <SortableHeader field="clientName">Client Name</SortableHeader>
            <SortableHeader field="name">Bill Name</SortableHeader>
            <SortableHeader field="amount">Amount</SortableHeader>
            <SortableHeader field="dateBilled">Date Billed</SortableHeader>
            <SortableHeader field="status">Status</SortableHeader>
            <SortableHeader field="frequency">Frequency</SortableHeader>
            <TableHead className="text-right text-sm md:text-base"></TableHead>
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
            bills.map((bill, index) => (
              <BillingsItem
                key={bill.id}
                bill={bill}
                client={clients.find((c) => c.id === bill.clientId)}
                onUpdate={onUpdate}
                onDelete={onDelete}
                index={index + 1}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

