"use client"

import { format } from "date-fns"

import type { Bill } from "./billingsBillInterface"
import { BillingsButtons } from "@/components/billings/billingsButtons"
import { BillingsEditDialog } from "@/components/billings/billingsEditDialog"
import { Badge } from "@/components/ui/badge"
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
  onUpdate: (bill: Bill) => void
  onDelete: (id: string) => void
}

export function BillingsItem({ bill, onUpdate, onDelete }: BillingsItemProps) {
  const {
    isEditDialogOpen, setIsEditDialogOpen, 
    isDeleteDialogOpen, setIsDeleteDialogOpen
  } = BillingStates()

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <TableRow>
      <TableCell className="font-medium break-words pl-8">{bill.name}</TableCell>
      <TableCell>{formatAmount(bill.amount)}</TableCell>
      <TableCell>{format(new Date(bill.dateBilled), "MMM d, yyyy")}</TableCell>
      <TableCell>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            bill.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {bill.status}
        </span>
      </TableCell>
      <TableCell>{bill.frequency.type === "Other" ? bill.frequency.custom : bill.frequency.type}</TableCell>
      <TableCell className="text-right">
        <BillingsButtons onEdit={() => setIsEditDialogOpen(true)} onDelete={() => setIsDeleteDialogOpen(true)} />

        <BillingsEditDialog bill={bill} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} onSave={onUpdate} />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This will permanently delete the bill "{bill.name}".</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(bill.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}

