"use client"

import type React from "react"

import { format } from "date-fns"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { type Bill, BillStatus } from "@/types/billing.type"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BillingStates } from "./billingsStates"
import { Textarea } from "@/components/ui/textarea"
import type { Matter } from "@/types/matter.type"
import { useEffect, useState, useRef, useCallback } from "react"

export interface BillingsAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (bill: Omit<Bill, "bill_id">) => void
  matters: Matter[]
  matterBillingMatterId: string
  disableMatterColumn?: boolean
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function BillingsAddDialog({
  open,
  onOpenChange,
  onSave,
  matters,
  matterBillingMatterId,
  disableMatterColumn = false,
  onSuccess,
  onError,
}: BillingsAddDialogProps) {
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
    isSubmitting,
    setIsSubmitting,
    visibleMatters,
    setVisibleMatters,
    currentPage,
    setCurrentPage
  } = BillingStates()

  const [matter_id, setMatterId] = useState(matterBillingMatterId || "")
  const dateInputRef = useRef<HTMLInputElement>(null)

  const isDesktop = useMediaQuery("(min-width: 768px)")
  const mattersPerPage = 5
  const totalPages = Math.ceil(matters.length / mattersPerPage)

  useEffect(() => {
    if (open) {
      setMatterId(matterBillingMatterId)
    }
  }, [open, matterBillingMatterId])

  const updateVisibleMatters = useCallback((page: number) => {
  const startIndex = (page - 1) * mattersPerPage
  const endIndex = Math.min(page * mattersPerPage, matters.length)
    setVisibleMatters(matters.slice(startIndex, endIndex))
    setCurrentPage(page)
  }, [matters, mattersPerPage, setCurrentPage, setVisibleMatters ])

  useEffect(() => {
    if (matters.length > 0) {
      updateVisibleMatters(1)
    }
  }, [matters, updateVisibleMatters ])

  
  const goToNextPage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentPage < totalPages) {
      updateVisibleMatters(currentPage + 1)
    }
  }

  const goToPrevPage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentPage > 1) {
      updateVisibleMatters(currentPage - 1)
    }
  }

  const handleSave = () => {
    let hasError = false

    if (!matter_id) {
      toast.error("Matter is required. Please select a matter.")
      hasError = true
    }

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
      const newBill: Omit<Bill, "bill_id"> = {
        matter_id,
        name,
        amount: Number(amount),
        created_at: created_at.toISOString(),
        status,
        remarks,
      }

      onSave(newBill)

      toast.success(`"${name}"  has been added successfully.`)

      if (onSuccess) onSuccess()
      resetForm()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to create bill. Please try again.")

      if (onError && error instanceof Error) onError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    if (!matterBillingMatterId) {
      setMatterId("")
    }
    setName("")
    setAmount("")
    setCreated_at(new Date())
    setDateString(format(new Date(), "yyyy-MM-dd"))
    setStatus(BillStatus.pending)
    setRemarks("")
    updateVisibleMatters(1)
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

  const selectedMatter = matters.find((m) => m.matter_id === matter_id)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${
          isDesktop ? "sm:max-w-[700px]" : "sm:max-w-[90vw]"
        } max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Add New Bill</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className={`grid ${isDesktop ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
            <div className="space-y-4">
              
              <div className="grid gap-2 overflow-hidden mb-6">
                <div className="flex items-center space-x-1">
                  <Label htmlFor="matter" className="text-base md:text-lg">
                    Matter
                  </Label>
                  <sup className="text-red-600">*</sup>
                </div>
                <Select value={matter_id} onValueChange={setMatterId} disabled={disableMatterColumn}>
                  <SelectTrigger id="matter" className="text-sm md:text-base dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue placeholder="Select matter">
                      {selectedMatter && (
                        <span className="truncate inline-block max-w-[250px]" title={selectedMatter.name}>
                          {selectedMatter.name} [{selectedMatter.case_number}]
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600 overflow-hidden">
                    <div className="flex flex-col">
                      {visibleMatters.map((matter) => (
                        <SelectItem
                          key={matter.matter_id}
                          value={matter.matter_id}
                          className="text-sm md:text-base"
                          title={matter.name}
                        >
                          <span className="truncate inline-block max-w-[250px]">{matter.name}</span>[{matter.case_number}]
                        </SelectItem>
                      ))}
                    </div>

                    {/* Pagination */}
                    {matters.length > mattersPerPage && (
                      <div className="flex items-center justify-between py-2 px-2 border-t mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className="h-8 px-2"
                        >
                          <ChevronLeftIcon className="h-4 w-4 mr-1" />
                          Prev
                        </Button>
                        <span className="text-xs text-gray-500">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="h-8 px-2"
                        >
                          Next
                          <ChevronRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 overflow-hidden mb-6">
                <div className="flex items-center space-x-1">
                  <Label htmlFor="matter" className="text-base md:text-lg">
                    Bill Name
                  </Label>
                  <sup className="text-red-600">*</sup>
                </div>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value.length > 30) {
                      toast.error("Bill name cannot exceed 30 characters")
                      return
                    }
                    setName(value)
                  }}
                  placeholder="Enter bill name"
                  className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:border-gray-600"
                  maxLength={30}
                />
              </div>

              <div className="grid gap-2 overflow-hidden mb-6">
                <div className="flex items-center space-x-1">
                  <Label htmlFor="matter" className="text-base md:text-lg">
                    Amount
                  </Label>
                  <sup className="text-red-600">*</sup>
                </div>
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
                  className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:border-gray-600"
                  maxLength={15}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date-display" className="text-base md:text-lg">
                  Date Billed 
                </Label>
                <div className="relative">
                  <Input
                    id="date-display"
                    readOnly
                    value={created_at ? format(created_at, "MMMM d, yyyy") : ""}
                    className="text-sm md:text-base h-9 md:h-10 pr-10 dark:bg-gray-700 dark:border-gray-600"
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
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="grid gap-2 mb-4 space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="pending" value={status} onValueChange={(value) => setStatus(value as BillStatus)}>
                  <SelectTrigger id="status" className="text-sm md:text-base dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem value="active" className="text-sm md:text-base">
                      Active
                    </SelectItem>
                    <SelectItem value="paid" className="text-sm md:text-base">
                      Paid
                    </SelectItem>
                    <SelectItem value="pending" className="text-sm md:text-base">
                      Pending
                    </SelectItem>
                    <SelectItem value="overdue" className="text-sm md:text-base">
                      Overdue
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-0">
                  <Label htmlFor="remarks" className="text-base md:text-lg">
                    Remarks
                  </Label>
                </div>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="(optional)"
                  className="mt-2 flex-grow min-h-[130px] overflow-y-auto resize-none text-sm md:text-base dark:bg-gray-700 dark:border-gray-600 placeholder:italic"
                  maxLength={300}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            id="cancelBtn"
            variant="outline"
            onClick={() => {
              onOpenChange(false)
            }}
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