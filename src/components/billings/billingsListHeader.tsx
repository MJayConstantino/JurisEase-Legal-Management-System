// This is the header with only the new bill button ontop the bills list.

"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BillingsListHeaderProps {
  onNewBill: () => void
}

export function BillingsListHeader({ onNewBill }: BillingsListHeaderProps) {
  return (
    <div className="flex justify-end p-4 border-b bg-gray-50">
      <Button
        onClick={onNewBill}
        className="bg-indigo-900 hover:bg-indigo-800 text-white text-sm md:text-base py-2 px-3 md:py-4 md:px-4"
      >
        <Plus className="h-4 w-4 mr-2" /> New Bill
      </Button>
    </div>
  )
}

