// This is the header with only the new bill button ontop the bills list.

"use client"

import type React from "react"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StatusFilter } from "@/lib/types"

interface BillingsListHeaderProps {
  onNewBill: () => void
  statusFilter: StatusFilter
  onStatusFilterChange: (filter: StatusFilter) => void
}

export function BillingsListHeader({ onNewBill, statusFilter, onStatusFilterChange }: BillingsListHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-gray-50">
      <div className="flex items-center">
        <Button
          onClick={onNewBill}
          className="bg-indigo-900 hover:bg-indigo-800 text-white text-sm md:text-base py-2 px-3 md:py-4 md:px-4 mr-6"
        >
          <Plus className="h-4 w-4 mr-2" /> New Bill
        </Button>

        <div className="flex space-x-1 md:space-x-2">
          <TabButton isActive={statusFilter === "all"} onClick={() => onStatusFilterChange("all")}>
            All Bills
          </TabButton>
          <TabButton isActive={statusFilter === "active"} onClick={() => onStatusFilterChange("active")}>
            Active
          </TabButton>
          <TabButton isActive={statusFilter === "paid"} onClick={() => onStatusFilterChange("paid")}>
            Paid
          </TabButton>
          <TabButton isActive={statusFilter === "pending"} onClick={() => onStatusFilterChange("pending")}>
            Pending
          </TabButton>
          <TabButton isActive={statusFilter === "overdue"} onClick={() => onStatusFilterChange("overdue")}>
            Overdue
          </TabButton>
        </div>
      </div>
    </div>
  )
}

interface TabButtonProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

function TabButton({ isActive, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm md:text-base rounded-md transition-colors ${
        isActive ? "bg-indigo-100 text-indigo-900 font-medium" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  )
}


