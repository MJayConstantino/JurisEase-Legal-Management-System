"use client"

import type React from "react"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StatusFilter } from "@/types/billing.type"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Matter } from "@/types/matter.type"
import { BillingStates } from "./billingsStates"
import { Label } from "@radix-ui/react-label"

interface BillingsListHeaderProps {
  onNewBill: () => void
  statusFilter: StatusFilter
  onStatusFilterChange: (filter: StatusFilter) => void
  matters: Matter[]
  selectedMatterId: string
  onMatterFilterChange: (matterId: string) => void
  hideMatterFilter?: boolean
}

export function BillingsListHeader({ onNewBill, statusFilter, onStatusFilterChange,  matters, selectedMatterId, onMatterFilterChange, hideMatterFilter = false, }: BillingsListHeaderProps) {
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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 w-full">
      <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
        <Button
          onClick={onNewBill}
          className="bg-indigo-900 hover:bg-indigo-800 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white text-sm md:text-base py-2 px-3 md:py-4 md:px-4 mr-3 md:mr-6 whitespace-nowrap"
        >
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">New Bill</span>
        </Button>

        <div className="hidden md:flex space-x-2 overflow-x-auto">
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

        <div className="md:hidden flex-grow">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
             <Button
                variant="outline"
                className="w-full justify-between dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              >
                <span>{getStatusLabel(statusFilter)}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full dark:bg-gray-800 dark:border-gray-700">
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className={`${statusFilter === (option.value as StatusFilter) ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100 font-medium" : "dark:text-gray-100"}`}
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
      {!hideMatterFilter && (
        <div className="w-full md:w-auto flex items-center space-x-4">
          <Label htmlFor="matter" className="text-base md:text-lg">
            Filter by Matter:
          </Label>
          <Select value={selectedMatterId} onValueChange={(value) => onMatterFilterChange(value)}>
            <SelectTrigger className="w-full md:w-[220px] dark:bg-gray-800 dark:border-gray-700 text-sm md:text-base">
              <SelectValue placeholder="Filter by matter" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectItem value="all" className="text-sm md:text-base">
                All
              </SelectItem>
              {matters.map((matter) => (
                <SelectItem key={matter.matter_id} value={matter.matter_id} className="text-sm md:text-base">
                  {matter.name} [{matter.case_number}]
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
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
        isActive
          ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100 font-medium"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {children}
    </button>
  )
}

