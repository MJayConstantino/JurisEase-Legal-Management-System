"use client";

import { format } from "date-fns";

import type { Bill } from "@/types/billing.type";
import { BillingsButtons } from "@/components/billings/billingsButtons";
import { BillingsEditDialog } from "@/components/billings/billingsEditDialog";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BillingStates } from "./billingsStates";
import { Matter } from "@/types/matter.type";

interface BillingsItemProps {
  bill: Bill & { matter?: Matter }
  matters?: Matter[]
  onUpdate: (bill: Bill) => void;
  onDelete: (id: string) => void;
  index: number;
  hideMatterColumn?: boolean;
}

export function BillingsItem({
  bill,
  matters = [],
  onUpdate,
  onDelete,
  hideMatterColumn = false,
}: BillingsItemProps) {
  const {
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  } = BillingStates();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "unpaid":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const billMatter = bill.matter || matters.find((m) => m.matter_id === bill.matter_id)
  const matterDisplay = billMatter ? `[${billMatter.case_number}] ${billMatter.name} ` : `Matter ID: ${bill.matter_id}`

  return (
    <TableRow className="text-xs md:text-sm dark:border-gray-700" data-testid={`billing-row-${bill.bill_id}`}>
      <TableCell className="font-medium max-w-[200px] truncate text-center w-[20%]" title={`Bill Name: ${bill.name}`}>
        <div className="mx-auto max-w-full truncate">
          {bill.name}
        </div>
      </TableCell>
      {!hideMatterColumn && (
        <TableCell className="max-w-[200px] truncate text-center w-[25%]" title={`Matter Name: ${matterDisplay}`}>
          <div className="mx-auto max-w-full truncate">
            {matterDisplay}
          </div>
        </TableCell>
      )}
      <TableCell title={`Amount: ${formatAmount(bill.amount)}`} className="overflow-hidden text-center w-[15%]">
        <div className="mx-auto max-w-full truncate">
          {formatAmount(bill.amount)}
        </div>
      </TableCell>
      <TableCell
        className={`${hideMatterColumn ? "max-w-[250px]" : "max-w-[200px]"} truncate text-center w-[15%]`}
        title={`Remarks: ${bill.remarks || "No Remarks"}`}
      >
        <div className="mx-auto max-w-full truncate">
          {bill.remarks ? (
            bill.remarks
          ) : (
            <span className="text-gray-500">No remarks</span>
          )}
        </div>
      </TableCell>
      <TableCell className="text-center w-[10%]">
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs ${getStatusStyles(bill.status)}`}
            title={`Status: ${bill.status}`}
          >
            {bill.status}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-center w-[10%]">
        <div className="mx-auto max-w-full truncate">
          {format(new Date(bill.created_at), "MMM d, yyyy")}
        </div>
      </TableCell>
      <TableCell className="text-center w-[5%]">
        <div className="flex justify-center">
          <BillingsButtons onEdit={() => setIsEditDialogOpen(true)} onDelete={() => setIsDeleteDialogOpen(true)} />
        </div>

        <BillingsEditDialog
          bill={bill}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={onUpdate}
          matters={matters}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="max-w-md dark:bg-gray-800 dark:border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg md:text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-base dark:text-gray-300">
                This will permanently delete the bill &quot;{bill.name}&quot;.
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