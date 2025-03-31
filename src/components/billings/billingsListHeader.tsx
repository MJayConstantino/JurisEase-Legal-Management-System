// This is the header for the new bill button and sorting tabs ontop the bills list.

"use client"

import type React from "react"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StatusFilter } from "@/types/billing.type"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillingStates } from "./billingsStates"

interface BillingsListHeaderProps {
  onNewBill: () => void
  statusFilter: StatusFilter
  onStatusFilterChange: (filter: StatusFilter) => void
}

export function BillingsListHeader({ onNewBill, statusFilter, onStatusFilterChange }: BillingsListHeaderProps) {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const {isDropdownOpen, setIsDropdownOpen}= BillingStates()

  const statusOptions = [
    { value: "all", label: "All Bills" },
    { value: "active", label: "Active" },
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    { value: "overdue", label: "Overdue" },
  ]

  const getStatusLabel = (value: StatusFilter) => {
    return statusOptions.find((option) => option.value === value)?.label || "All Bills"
  }

  return (
    <div className="flex justify-between items-center p-4 border-b bg-gray-50 w-full">
      <div className="flex items-center w-[98%]">
        <Button
          onClick={onNewBill}
          className="bg-indigo-900 hover:bg-indigo-800 text-white text-sm md:text-base py-2 px-3 md:py-4 md:px-4 mr-3 md:mr-6 whitespace-nowrap"
        >
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">New Bill</span>
        </Button>

        {/* Desktop Tabs */}
        <div className="hidden md:flex space-x-2 overflow-x-auto flex-grow">
          {statusOptions.map((option) => (
            <TabButton
              key={option.value}
              isActive={statusFilter === (option.value as StatusFilter)}
              onClick={() => onStatusFilterChange(option.value as StatusFilter)}
            >
              {option.label}
            </TabButton>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden flex-grow">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>{getStatusLabel(statusFilter)}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className={
                    statusFilter === (option.value as StatusFilter) ? "bg-indigo-100 text-indigo-900 font-medium" : ""
                  }
                  onClick={() => {
                    onStatusFilterChange(option.value as StatusFilter)
                    setIsDropdownOpen(false)
                  }}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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

