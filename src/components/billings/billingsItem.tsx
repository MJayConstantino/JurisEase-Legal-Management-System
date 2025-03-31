// This is the bill column/table format for each bill and the bill deletion alert popup

"use client"

import { format } from "date-fns"

import type { Bill, Client } from "@/types/billing.type"
import { BillingsButtons } from "@/components/billings/billingsButtons"
import { BillingsEditDialog } from "@/components/billings/billingsEditDialog"
import { TableCell, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { BillingStates } from "./billingsStates"

interface BillingsItemProps {
  bill: Bill
  client?: Client
  onUpdate: (bill: Bill) => void
  onDelete: (id: string) => void
}

export function BillingsItem({ bill, client, onUpdate, onDelete }: BillingsItemProps) {
  const {isEditDialogOpen, setIsEditDialogOpen, isDeleteDialogOpen, setIsDeleteDialogOpen,} = BillingStates()

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800"
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <TableRow className="text-sm md:text-base">
      <TableCell className="font-medium">{client?.name || "Unknown Client"}</TableCell>
      <TableCell>{bill.name}</TableCell>
      <TableCell>{formatAmount(bill.amount)}</TableCell>
      <TableCell>{format(new Date(bill.dateBilled), "MMM d, yyyy")}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${getStatusStyles(bill.status)}`}
        >
          {bill.status}
        </span>
      </TableCell>
      <TableCell>{bill.frequency.type === "Other" ? bill.frequency.custom : bill.frequency.type}</TableCell>
      <TableCell className="text-right">
        <BillingsButtons onEdit={() => setIsEditDialogOpen(true)} onDelete={() => setIsDeleteDialogOpen(true)} />

        <BillingsEditDialog
          bill={bill}
          clients={[client].filter(Boolean) as Client[]}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={onUpdate}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg md:text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-base">
                This will permanently delete the bill "{bill.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-sm md:text-base">Cancel</AlertDialogCancel>
              <AlertDialogAction className="text-sm md:text-base" onClick={() => onDelete(bill.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}

