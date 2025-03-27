"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon} from "lucide-react"

import type { Bill, BillStatus, PaymentFrequency } from "./billingsBillInterface"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { BillingStates } from "./billingsStates"

interface BillingsAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (bill: Omit<Bill, "id">) => void
}

export function BillingsAddDialog({ open, onOpenChange, onSave }: BillingsAddDialogProps) {
   const { 
      name, setName, amount, setAmount, dateBilled, setDateBilled,status, setStatus,
      frequencyType, setFrequencyType, customFrequency, setCustomFrequency
    } = BillingStates()

  const handleSave = () => {
    if (!name || !amount) return

    const newBill: Omit<Bill, "id"> = {
      name,
      amount: Number.parseFloat(amount),
      dateBilled: dateBilled.toISOString(),
      status,
      frequency: frequencyType === "Other" ? { type: "Other", custom: customFrequency } : { type: frequencyType },
    }

    onSave(newBill)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setName("")
    setAmount("")
    setDateBilled(new Date())
    setStatus("Active")
    setFrequencyType("Monthly")
    setCustomFrequency("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Bill</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter bill name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date Billed</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !dateBilled && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateBilled ? format(dateBilled, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateBilled}
                  onSelect={(date) => date && setDateBilled(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label>Status</Label>
            <RadioGroup
              defaultValue="Active"
              value={status}
              onValueChange={(value) => setStatus(value as BillStatus)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Active" id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Paid" id="paid" />
                <Label htmlFor="paid">Paid</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label>Payment Frequency</Label>
            <RadioGroup
              value={frequencyType}
              onValueChange={(value) => setFrequencyType(value as PaymentFrequency["type"])}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Annually" id="annually" />
                <Label htmlFor="annually">Annually</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Semi-Annually" id="semi-annually" />
                <Label htmlFor="semi-annually">Semi-Annually</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Quarterly" id="quarterly" />
                <Label htmlFor="quarterly">Quarterly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>

            {frequencyType === "Other" && (
              <div className="mt-2">
                <Input
                  value={customFrequency}
                  onChange={(e) => setCustomFrequency(e.target.value)}
                  placeholder="Specify frequency"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-indigo-900 hover:bg-indigo-800" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

