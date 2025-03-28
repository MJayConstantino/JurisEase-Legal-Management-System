"use client"

import { useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon} from "lucide-react"

import type { Bill, BillStatus, PaymentFrequency } from "@/types/billing.type"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BillingStates } from "./billingsStates"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface BillingsEditDialogProps {
  bill: Bill
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (bill: Bill) => void
}

export function BillingsEditDialog({ bill, open, onOpenChange, onSave }: BillingsEditDialogProps) {
  const { 
    name, setName, amount, setAmount, dateBilled, setDateBilled,status, setStatus,
    frequencyType, setFrequencyType, customFrequency, setCustomFrequency
  } = BillingStates()


  // Update form when bill changes
  useEffect(() => {
    if (open) {
      setName(bill.name)
      setAmount(bill.amount.toString())
      setDateBilled(new Date(bill.dateBilled))
      setStatus(bill.status)
      setFrequencyType(bill.frequency.type)
      setCustomFrequency(bill.frequency.type === "Other" ? bill.frequency.custom : "")
    }
  }, [bill, open])

  const handleSave = () => {
    if (!name || !amount) return

    const updatedBill: Bill = {
      ...bill,
      name,
      amount: Number.parseFloat(amount),
      dateBilled: dateBilled.toISOString(),
      status,
      frequency: frequencyType === "Other" ? { type: "Other", custom: customFrequency } : { type: frequencyType },
    }

    onSave(updatedBill)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Bill</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-amount">Amount</Label>
            <Input id="edit-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-date">Date Billed</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="edit-date"
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
            <RadioGroup value={status} onValueChange={(value) => setStatus(value as BillStatus)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Active" id="edit-active" />
                <Label htmlFor="edit-active">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Paid" id="edit-paid" />
                <Label htmlFor="edit-paid">Paid</Label>
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
                <RadioGroupItem value="Monthly" id="edit-monthly" />
                <Label htmlFor="edit-monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Annually" id="edit-annually" />
                <Label htmlFor="edit-annually">Annually</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Semi-Annually" id="edit-semi-annually" />
                <Label htmlFor="edit-semi-annually">Semi-Annually</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Quarterly" id="edit-quarterly" />
                <Label htmlFor="edit-quarterly">Quarterly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="edit-other" />
                <Label htmlFor="edit-other">Other</Label>
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

