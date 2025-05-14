"use client"

import type React from "react"

import { Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StatusFilter } from "@/types/billing.type"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Matter } from "@/types/matter.type"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"

interface BillingsListHeaderProps {
  onNewBill: () => void
  statusFilter: StatusFilter | string
  onStatusFilterChange: (filter: StatusFilter | string) => void
  matters: Matter[]
  selectedMatterId: string
  onMatterFilterChange: (matterId: string) => void
  hideMatterFilter?: boolean
}

export function BillingsListHeader({ onNewBill, onStatusFilterChange,  matters, selectedMatterId, onMatterFilterChange, hideMatterFilter = false, }: BillingsListHeaderProps) {
  const [activeFilter, setActiveFilter] = useState<StatusFilter|string>("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onStatusFilterChange(filter);
    setMenuOpen(false);
  };

  return (
    <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
      <div className="hidden lg:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button
          variant="blue"
          size="lg"
          onClick={onNewBill}
          className="bg-[#1B1E4B] hover:bg-[#16183F] dark:bg-primary dark:hover:bg-gray-100 cursor-pointer text-sm md:text-base py-1 px-2 md:py-3 md:px-3 mr-4 md:mr-5 whitespace-nowrap"
        >
          <Plus className="h-3 w-3 md:mr-1" />
          <span className="hidden md:inline">Add Bill</span>
        </Button>

        {!hideMatterFilter && (
        <div className=" flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
          <Label htmlFor="matter" className="text-sm md:text-base">
            Filter by Matter:
          </Label>
          <div className="w-full md:w-[250px]">
            <Select value={selectedMatterId} onValueChange={onMatterFilterChange}>
              <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 text-sm md:text-base">
                <SelectValue placeholder="Filter by matter" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all" className="text-sm md:text-base">
                  All
                </SelectItem>
                {matters.map((matter) => (
                  <SelectItem
                    key={matter.matter_id}
                    value={matter.matter_id}
                    className="text-sm md:text-base"
                  >
                    <span className="truncate inline-block max-w-[250px]">{matter.name}</span>[{matter.case_number}]
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

        {/* Filter Desktop */}

        <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md justify-center sm:justify-start">
          <Button
            variant={activeFilter === "all" ? "blue" : "ghost"}
            size="sm"
            className="px-3 py-1 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("all")}
          >
            All Bills
          </Button>
          <Button
            variant={activeFilter === "active" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("active")}
          >
            Active
          </Button>
          <Button
            variant={activeFilter === "paid" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("paid")}
          >
            Paid
          </Button>
          <Button
            variant={activeFilter === "pending" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </Button>
          <Button
            variant={activeFilter === "overdue" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("overdue")}
          >
            Overdue
          </Button>
        </div>
      </div>



        {/* Filter mobile */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <Button
          variant="blue"
          size="sm"
          onClick={onNewBill}
        >
          <Plus className="h-3 w-3 mr-1" />
          <span className="text-xs">Add Bill</span>
        </Button>

        {!hideMatterFilter && (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
          <Label htmlFor="matter" className="text-sm md:text-base">
            Filter by Matter:
          </Label>
          <div className="w-full md:w-[150px]">
            <Select value={selectedMatterId} onValueChange={onMatterFilterChange}>
              <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 text-sm md:text-base">
                <SelectValue placeholder="Filter by matter" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="all" className="text-sm md:text-base">
                  All
                </SelectItem>
                {matters.map((matter) => (
                  <SelectItem
                    key={matter.matter_id}
                    value={matter.matter_id}
                    className="text-sm md:text-base"
                  >
                    <span className="truncate inline-block max-w-[250px]">{matter.name}</span>[{matter.case_number}]
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open filters</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Filter Bills</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["all", "active", "paid", "pending", "overdue"].map((filter) => (
              <DropdownMenuItem
                key={filter}
                className={
                  activeFilter === filter ? "bg-[#1B1E4B] text-white" : ""
                }
                onClick={() => handleFilterChange(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

