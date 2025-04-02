// Contains layout for the Bill item

"use client"

import { format } from "date-fns"

import type { Bill } from "@/types/billing.type"
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
import { Matter } from "@/types/matter.type"

interface BillingsItemProps {
  bill: Bill
  matter?: Matter
  matters: Matter[]
  onUpdate: (bill: Bill) => void
  onDelete: (id: string) => void
  index: number
}

export function BillingsItem({ bill, matter, onUpdate, onDelete, index }: BillingsItemProps) {
  const {
    isEditDialogOpen, setIsEditDialogOpen, isDeleteDialogOpen, setIsDeleteDialogOpen
  } = BillingStates()

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
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
    }
  }

  
  return (
    <TableRow className="text-sm md:text-base dark:border-gray-700">
      <TableCell className="text-center text-gray-500 dark:text-gray-400 font-medium w-12">{index}</TableCell>
      <TableCell
        className="font-medium max-w-[150px] truncate"
        title={matter ? `${matter.name} [${matter.case_number}]` : `Matter ID: ${bill.matter_id}`}
      >
        {matter ? `${matter.name} [${matter.case_number}]` : `Matter ID: ${bill.matter_id}`}
      </TableCell>
      <TableCell className="font-medium max-w-[200px] truncate" title={bill.name}>
        {bill.name}
      </TableCell>
      <TableCell>{formatAmount(bill.amount)}</TableCell>
      <TableCell>{format(new Date(bill.created_at), "MMM d, yyyy")}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${getStatusStyles(bill.status)}`}
        >
          {bill.status}
        </span>
      </TableCell>
      <TableCell className="max-w-[250px] truncate" title={bill.remarks || "-"}>
        {bill.remarks || "-"}
      </TableCell>
      <TableCell className="text-right">
        <BillingsButtons onEdit={() => setIsEditDialogOpen(true)} onDelete={() => setIsDeleteDialogOpen(true)} />

        <BillingsEditDialog bill={bill} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} onSave={onUpdate} matters={[]} />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="max-w-md dark:bg-gray-800 dark:border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg md:text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-base dark:text-gray-300">
                This will permanently delete the bill "{bill.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-sm md:text-base dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="text-sm md:text-base bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                onClick={() => onDelete(bill.bill_id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}

