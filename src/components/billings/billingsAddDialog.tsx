"use client";

import type React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type Bill, BillStatus } from "@/types/billing.type";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BillingStates } from "./billingsStates";
import { Textarea } from "@/components/ui/textarea";
import type { Matter } from "@/types/matter.type";
import { useEffect, useState, useRef, useCallback } from "react";

export interface BillingsAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bill: Omit<Bill, "bill_id">) => void;
  matters: Matter[];
  matterBillingMatterId: string;
  disableMatterColumn?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
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
    setCurrentPage,
  } = BillingStates();

  const [matter_id, setMatterId] = useState(matterBillingMatterId || "");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const mattersPerPage = 5;
  const totalPages = Math.ceil(matters.length / mattersPerPage);

  useEffect(() => {
    if (open) {
      setMatterId(matterBillingMatterId);
    }
  }, [open, matterBillingMatterId]);

  const updateVisibleMatters = useCallback(
    (page: number) => {
      const startIndex = (page - 1) * mattersPerPage;
      const endIndex = Math.min(page * mattersPerPage, matters.length);
      setVisibleMatters(matters.slice(startIndex, endIndex));
      setCurrentPage(page);
    },
    [matters, mattersPerPage, setCurrentPage, setVisibleMatters]
  );

  useEffect(() => {
    if (matters.length > 0) {
      updateVisibleMatters(1);
    }
  }, [matters, updateVisibleMatters]);

  const goToNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentPage < totalPages) {
      updateVisibleMatters(currentPage + 1);
    }
  };

  const goToPrevPage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentPage > 1) {
      updateVisibleMatters(currentPage - 1);
    }
  };

  const handleSave = () => {
    let hasError = false;

    if (!matter_id) {
      toast.error("Matter is required. Please select a matter.");
      hasError = true;
    }

    if (!name) {
      toast.error("Name is required. Please enter a bill name.");
      hasError = true;
    }

    if (!amount) {
      toast.error("Amount is required. Please enter an amount.");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const newBill: Omit<Bill, "bill_id"> = {
        matter_id,
        name,
        amount: Number(amount),
        created_at: created_at.toISOString(),
        status,
        remarks,
      };

      onSave(newBill);

      toast.success(`"${name}"  has been added successfully.`);

      if (onSuccess) onSuccess();
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to create bill. Please try again.");

      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!matterBillingMatterId) {
      setMatterId("");
    }
    setName("");
    setAmount("");
    setCreated_at(new Date());
    setDateString(format(new Date(), "yyyy-MM-dd"));
    setStatus(BillStatus.unpaid);
    setRemarks("");
    updateVisibleMatters(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = e.target.value;
    setDateString(newDateString);

    if (newDateString) {
      const newDate = new Date(newDateString);
      if (!isNaN(newDate.getTime())) {
        setCreated_at(newDate);
      }
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const selectedMatter = matters.find((m) => m.matter_id === matter_id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700 p-6 scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="dark:text-gray-100 font-semibold">
            Add New Bill
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new bill.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Bill Name and Amount in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-7">
            <div className="sm:col-span-2">
              <Label htmlFor="name" className="dark:text-gray-200">
                Bill Name <sup className="text-red-600">*</sup>
              </Label>
              <Input
                id="name"
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
              <Label htmlFor="amount" className="dark:text-gray-200">
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

          {/* Matter Selection */}
          <div>
            <Label htmlFor="matter" className="dark:text-gray-200">
              Matter <sup className="text-red-600">*</sup>
            </Label>
            <Select
              value={matter_id}
              onValueChange={setMatterId}
              disabled={disableMatterColumn}
            >
              <SelectTrigger
                id="matter"
                className="mt-2 text-sm md:text-base hover:cursor-pointer dark:bg-gray-700 dark:border-gray-600 w-full"
              >
                <SelectValue placeholder="Select matter">
                  {selectedMatter && (
                    <span
                      className="truncate inline-block max-w-[250px]"
                      title={selectedMatter.name}
                    >
                      [{selectedMatter.case_number}] {selectedMatter.name}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600 overflow-hidden w-auto h-auto">
                <div className="flex flex-col h-auto overflow-y-auto">
                  {visibleMatters.map((matter) => (
                    <SelectItem
                      key={matter.matter_id}
                      value={matter.matter_id}
                      className="text-sm md:text-base"
                      title={matter.name}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="ml-1 text-xs text-gray-500 whitespace-nowrap">
                          [{matter.case_number}]
                        </span>
                        <span className="truncate inline-block max-w-[150px] xs:max-w-[180px] md:max-w-[250px]">
                          {matter.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </div>

                {/* Pagination */}
                {matters.length > mattersPerPage && (
                  <div className="flex items-center hover:cursor-pointer justify-between py-2 px-3 border-t mt-1 bg-gray-50 dark:bg-gray-800">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="h-8 min-w-[60px] px-2 hover:cursor-pointer text-xs md:min-w-[80px] md:text-sm"
                    >
                      <ChevronLeftIcon className="h-4 w-4 mr-1" />
                      Prev
                    </Button>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mx-2">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="h-8 min-w-[60px] px-2 hover:cursor-pointer text-xs md:min-w-[80px] md:text-sm"
                    >
                      Next
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>
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
                defaultValue="unpaid"
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
            disabled={isSubmitting}
            className="cursor-pointer w-full sm:w-auto dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            id="saveBtn"
            onClick={handleSave}
            disabled={isSubmitting}
            className={
              isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }
          >
            {isSubmitting ? "Saving..." : "Save Bill"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
