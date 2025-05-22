"use client"

import type React from "react"

import { useEffect, useRef} from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { Bill, BillStatus } from "@/types/billing.type"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BillingStates } from "./billingsStates"
import { Textarea } from "@/components/ui/textarea"
import type { Matter } from "@/types/matter.type"

interface BillingsEditDialogProps {
  bill: Bill
  matters: Matter[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (bill: Bill) => void
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function BillingsEditDialog({ bill, open, onOpenChange, onSave, onSuccess, onError }: BillingsEditDialogProps) {
  const {
    name,
    setName,
    amount,
    setAmount,
    created_at,
    setCreated_at,
    status,
    setStatus,
    remarks,
    setRemarks,
    dateString,
    setDateString,
    setMatterId,
    matter_id,
    isSubmitting,
    setIsSubmitting
  } = BillingStates()

  const dateInputRef = useRef<HTMLInputElement>(null)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    if (open) {
      setMatterId(bill.matter_id)
      setName(bill.name)
      setAmount(bill.amount.toString())
      setCreated_at(new Date(bill.created_at))
      setDateString(format(new Date(bill.created_at), "yyyy-MM-dd"))
      setStatus(bill.status)
      setRemarks(bill.remarks || "")
      setIsSubmitting(false)
    }
  }, [
    bill,
    open,
    setMatterId,
    setName,
    setAmount,
    setCreated_at,
    setDateString,
    setStatus,
    setRemarks,
    setIsSubmitting,
  ])

  const handleSave = () => {
    let hasError = false

    if (!name) {
      toast.error("Name is required. Please enter a bill name.")
      hasError = true
    }

    if (!amount) {
      toast.error("Amount is required. Please enter an amount.")
      hasError = true
    }

    if (hasError) return

    setIsSubmitting(true)

    try {
      const updatedBill: Bill = {
        ...bill,
        matter_id,
        name,
        amount: Number(amount),
        created_at: created_at.toISOString(),
        status,
        remarks,
      }

      onSave(updatedBill)
      toast.success("Bill edited successfully.")

      if (onSuccess) onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to edit bill. Please try again.")

      if (onError && error instanceof Error) onError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = e.target.value
    setDateString(newDateString)

    if (newDateString) {
      const newDate = new Date(newDateString)
      if (!isNaN(newDate.getTime())) {
        setCreated_at(newDate)
      }
    }
  }

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700 p-6 scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100 font-semibold">
            Edit Bill
          </DialogTitle>
          <DialogDescription>
            Update the details below to modify this bill.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Bill Name and Amount in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-7">
            <div className="sm:col-span-2">
              <Label htmlFor="edit-name" className="dark:text-gray-200">
                Bill Name <sup className="text-red-600">*</sup>
              </Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length > 30) {
                    toast.error("Bill name cannot exceed 30 characters");
                    return;
                  }
                  setName(value);
                }}
                placeholder="Enter bill name"
                className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
                maxLength={30}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="edit-amount" className="dark:text-gray-200">
                Amount <sup className="text-red-600">*</sup>
              </Label>
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                pattern="^\d+(\.\d{1,2})?$"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setAmount(value);
                    return;
                  }
                  if (/^\d+(\.\d{0,2})?$/.test(value)) {
                    setAmount(value);
                  }
                }}
                placeholder="Enter amount"
                className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
                maxLength={15}
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <Label htmlFor="remarks" className="dark:text-gray-200">
              Remarks
            </Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="(optional)"
              className="mt-2 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400"
              rows={3}
              maxLength={300}
            />
          </div>

          {/* Date and Status in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date-display" className="dark:text-gray-200">
                Date Billed
              </Label>
              <div className="relative mt-2 ">
                <Input
                  id="date-display"
                  readOnly
                  value={created_at ? format(created_at, "MMMM d, yyyy") : ""}
                  className="pr-10h hover:cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  placeholder="Select date"
                  onClick={openDatePicker}
                />
                <input
                  ref={dateInputRef}
                  type="date"
                  value={dateString}
                  onChange={handleDateChange}
                  className="sr-only"
                  tabIndex={-1}
                />
                <Button
                  name="dateBtn"
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={openDatePicker}
                  className=" absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="status" className="dark:text-gray-200">
                Status
              </Label>
              <Select
                defaultValue="pending"
                value={status}
                onValueChange={(value) => setStatus(value as BillStatus)}
              >
                <SelectTrigger
                  id="status"
                  className="hover:cursor-pointer mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer">
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            id="cancelBtn"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            id="saveBtn"
            className="dark:bg-indigo-700 dark:hover:bg-indigo-600 text-sm md:text-base h-9 md:h-10"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}