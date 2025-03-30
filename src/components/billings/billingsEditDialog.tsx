// Edit bill dialog

"use client"

import { useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

import type { Bill, BillStatus, Client, PaymentFrequency } from "@/types/billing.type"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { BillingStates } from "./billingsStates"

interface BillingsEditDialogProps {
  bill: Bill
  clients: Client[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (bill: Bill) => void
}

export function BillingsEditDialog({ bill, clients, open, onOpenChange, onSave }: BillingsEditDialogProps) {
  const {
    name, setName, clientId, setClientId, amount, setAmount, dateBilled, setDateBilled, 
    status, setStatus, frequencyType, setFrequencyType, customFrequency, setCustomFrequency, 
   } = BillingStates()

  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Update form when bill changes
  useEffect(() => {
    if (open) {
      setClientId(bill.clientId)
      setName(bill.name)
      setAmount(bill.amount.toString())
      setDateBilled(new Date(bill.dateBilled))
      setStatus(bill.status)
      setFrequencyType(bill.frequency.type)
      setCustomFrequency(bill.frequency.type === "Other" ? bill.frequency.custom : "")
    }
  }, [bill, open])

  const handleSave = () => {
    if (!name || !amount || !clientId) return

    const updatedBill: Bill = {
      ...bill,
      clientId,
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
      <DialogContent className={`${isDesktop ? "sm:max-w-[700px]" : "sm:max-w-[90vw]"} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Edit Bill</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className={`grid ${isDesktop ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
            {/* Left Column */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-client" className="text-base md:text-lg">
                  Client
                </Label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger id="edit-client" className="text-sm md:text-base">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id} className="text-sm md:text-base">
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-name" className="text-base md:text-lg">
                  Bill Name
                </Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm md:text-base h-9 md:h-10"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-amount" className="text-base md:text-lg">
                  Amount
                </Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm md:text-base h-9 md:h-10"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-date" className="text-base md:text-lg">
                  Date Billed
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="edit-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal text-sm md:text-base h-9 md:h-10",
                        !dateBilled && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3 w-3 md:h-4 md:w-4" />
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
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-base md:text-lg">Status</Label>
                <RadioGroup
                  value={status}
                  onValueChange={(value) => setStatus(value as BillStatus)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Active" id="edit-active" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="edit-active" className="text-sm md:text-base">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Paid" id="edit-paid" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="edit-paid" className="text-sm md:text-base">
                      Paid
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label className="text-base md:text-lg">Payment Frequency</Label>
                <RadioGroup
                  value={frequencyType}
                  onValueChange={(value) => setFrequencyType(value as PaymentFrequency["type"])}
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Monthly" id="edit-monthly" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="edit-monthly" className="text-sm md:text-base">
                      Monthly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Annually" id="edit-annually" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="edit-annually" className="text-sm md:text-base">
                      Annually
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Semi-Annually" id="edit-semi-annually" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="edit-semi-annually" className="text-sm md:text-base">
                      Semi-Annually
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Quarterly" id="edit-quarterly" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="edit-quarterly" className="text-sm md:text-base">
                      Quarterly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="edit-other" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="edit-other" className="text-sm md:text-base">
                      Other
                    </Label>
                  </div>
                </RadioGroup>

                {frequencyType === "Other" && (
                  <div className="mt-2">
                    <Input
                      value={customFrequency}
                      onChange={(e) => setCustomFrequency(e.target.value)}
                      placeholder="Specify frequency"
                      className="text-sm md:text-base h-9 md:h-10"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-sm md:text-base h-9 md:h-10">
            Cancel
          </Button>
          <Button className="bg-indigo-900 hover:bg-indigo-800 text-sm md:text-base h-9 md:h-10" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

