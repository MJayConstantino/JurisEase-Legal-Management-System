// Edit bill dialog

"use client"

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


interface BillingsAddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (bill: Omit<Bill, "id">) => void
  clients: Client[]
}

export function BillingsEditDialog({ open, onOpenChange, onSave, clients }: BillingsAddDialogProps) {
  const {
    name, setName, clientId, setClientId, amount, setAmount, dateBilled, setDateBilled, 
    status, setStatus, frequencyType, setFrequencyType, customFrequency, setCustomFrequency, 
   } = BillingStates()

  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleSave = () => {
    if (!name || !amount || !clientId) return

    const newBill: Omit<Bill, "id"> = {
      clientId,
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
    setClientId("")
    setName("")
    setAmount("")
    setDateBilled(new Date())
    setStatus("Active")
    setFrequencyType("Monthly")
    setCustomFrequency("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isDesktop ? "sm:max-w-[700px]" : "sm:max-w-[90vw]"} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Add New Bill</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className={`grid ${isDesktop ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
            {/* Left Column */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="client" className="text-base md:text-lg">
                  Client
                </Label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger id="client" className="text-sm md:text-base">
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
                <Label htmlFor="name" className="text-base md:text-lg">
                  Bill Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter bill name"
                  className="text-sm md:text-base h-9 md:h-10"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="amount" className="text-base md:text-lg">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="text-sm md:text-base h-9 md:h-10"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date" className="text-base md:text-lg">
                  Date Billed
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
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
                  defaultValue="Active"
                  value={status}
                  onValueChange={(value) => setStatus(value as BillStatus)}
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Active" id="active" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="active" className="text-sm md:text-base">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Paid" id="paid" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="paid" className="text-sm md:text-base">
                      Paid
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Pending" id="pending" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="pending" className="text-sm md:text-base">
                      Pending
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Overdue" id="overdue" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="overdue" className="text-sm md:text-base">
                      Overdue
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
                    <RadioGroupItem value="Monthly" id="monthly" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="monthly" className="text-sm md:text-base">
                      Monthly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Annually" id="annually" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="annually" className="text-sm md:text-base">
                      Annually
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Semi-Annually" id="semi-annually" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="semi-annually" className="text-sm md:text-base">
                      Semi-Annually
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Quarterly" id="quarterly" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="quarterly" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="quarterly" className="text-sm md:text-base">
                      Quarterly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other" className="h-3 w-3 md:h-4 md:w-4" />
                    <Label htmlFor="other" className="text-sm md:text-base">
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