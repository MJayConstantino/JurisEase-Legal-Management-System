"use client"

import type React from "react"

import { ChevronLeftIcon, ChevronRightIcon, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StatusFilter } from "@/types/billing.type"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Matter } from "@/types/matter.type"
import { Label } from "@radix-ui/react-label"
import { useCallback, useEffect, useState } from "react"
import { BillingStates } from "./billingsStates"

interface BillingsListHeaderProps {
  onNewBill: () => void
  statusFilter: StatusFilter | string
  onStatusFilterChange: (filter: StatusFilter | string) => void
  matters: Matter[]
  selectedMatterId: string
  onMatterFilterChange: (matterId: string) => void
  hideMatterFilter?: boolean
}

export function BillingsListHeader({ onNewBill, statusFilter, onStatusFilterChange,  matters, selectedMatterId, onMatterFilterChange, hideMatterFilter = false, }: BillingsListHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const {visibleMatters, setVisibleMatters, currentPage, setCurrentPage} = BillingStates()

  const handleFilterChange = (filter: string) => {
    onStatusFilterChange(filter);
    setMenuOpen(false);
  };

  const mattersPerPage = 5
  const totalPages = Math.ceil(matters.length / mattersPerPage)
  const updateVisibleMatters = useCallback((page: number) => {
    const startIndex = (page - 1) * mattersPerPage
    const endIndex = Math.min(page * mattersPerPage, matters.length)
      setVisibleMatters(matters.slice(startIndex, endIndex))
      setCurrentPage(page)
    }, [matters, mattersPerPage, setCurrentPage, setVisibleMatters ])
  
    useEffect(() => {
      if (matters.length > 0) {
        updateVisibleMatters(1)
      }
    }, [matters, updateVisibleMatters ])
  
    
    const goToNextPage = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (currentPage < totalPages) {
        updateVisibleMatters(currentPage + 1)
      }
    }
  
    const goToPrevPage = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (currentPage > 1) {
        updateVisibleMatters(currentPage - 1)
      }
    }

  return (
    <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
      <div className="hidden lg:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4">
          
          <Button
            variant="blue"
            size="sm"
            onClick={onNewBill}
            className="h-9 px-3 font-semibold rounded-md flex items-center"
          >
            <Plus className="h-3 w-3 md:mr-1" />
            <span className="hidden md:inline">Add Bill</span>
          </Button>
          {!hideMatterFilter && (
            <div className="flex items-center space-x-2">
              
              <Label htmlFor="matter" className="text-sm md:text-base whitespace-nowrap">
                Filter by Matter:
              </Label>
              <div className="w-[250px]">
                
                <Select value={selectedMatterId} onValueChange={onMatterFilterChange}>
                  <SelectTrigger className="hover:cursor-pointer w-full dark:bg-gray-800 dark:border-gray-700 text-sm md:text-base">
                    <SelectValue placeholder="Filter by matter" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600 overflow-hidden w-[350px] h-[300px]">
                    
                    <SelectItem value="all" className="text-sm md:text-base hover:cursor-pointer">
                      All
                    </SelectItem>
                    <div className="flex flex-col h-[200px] overflow-y-auto">
                      
                      {visibleMatters.map((matter) => (
                        <SelectItem
                          key={matter.matter_id}
                          value={matter.matter_id}
                          className="text-sm md:text-base hover:cursor-pointer"
                          title={matter.name}
                        >
                          <div className="flex items-center justify-between w-full">
                            
                            <span className="truncate inline-block max-w-[250px]">{matter.name}</span>
                            <span className="ml-1 text-xs text-gray-500 whitespace-nowrap">[{matter.case_number}]</span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                    {/* Pagination */}
                    {matters.length > mattersPerPage && (
                      <div className="flex items-center justify-between py-2 px-2 border-t mt-auto">
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className="h-8 w-20 px-2 text-xs"
                        >
                          <ChevronLeftIcon className="h-4 w-4 mr-1" />
                          Prev
                        </Button>
                        <span className="text-xs text-gray-500">
                          {currentPage}/{totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="h-8 w-20 px-2 text-xs"
                        >
                          Next
                          <ChevronRightIcon className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Filter Desktop */}
        <div className="flex flex-wrap gap-2 bg-gray-100 shadow dark:bg-gray-700 rounded-md justify-center sm:justify-start">
          <Button
            variant={statusFilter === "all" ? "blue" : "ghost"}
            size="sm"
            className="px-3 py-1 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("all")}
          >
            All Bills
          </Button>
          <Button
            variant={statusFilter === "paid" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("paid")}
          >
            Paid
          </Button>
          <Button
            variant={statusFilter === "unpaid" ? "blue" : "ghost"}
            size="sm"
            className="px-3 h-9 text-xs font-semibold rounded-md flex-1 sm:flex-none hover:cursor-pointer"
            onClick={() => handleFilterChange("unpaid")}
          >
            Unpaid
          </Button>
        </div>
      </div>

      {/* Filter mobile */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="flex items-center justify-between">
          <Button variant="blue" size="sm" onClick={onNewBill}>
            <Plus className="h-3 w-3 mr-1" />
            <span className="text-xs">Add Bill</span>
          </Button>

          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              
              <DropdownMenuLabel>Filter Bills</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["all", "paid", "unpaid"].map((filter) => (
                <DropdownMenuItem
                  key={filter}
                  className={statusFilter === filter ? "bg-[#1B1E4B] text-white" : ""}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {!hideMatterFilter && (
          <div className="flex flex-col gap-1">
            <Label htmlFor="mobile-matter" className="text-xs">
              Filter by Matter:
            </Label>
            <div className="w-full">
              <Select value={selectedMatterId} onValueChange={onMatterFilterChange}>
                <SelectTrigger id="mobile-matter" className="w-full text-xs h-9 dark:bg-gray-800 dark:border-gray-700">
                  <SelectValue placeholder="Filter by matter" />
                </SelectTrigger>
                <SelectContent
                  className="dark:bg-gray-800 dark:border-gray-700 w-[300px] p-0 overflow-hidden"
                  align="start"
                  side="bottom"
                  sideOffset={5}
                >
                  <div className="p-0">
                    <SelectItem value="all" className="text-xs rounded-none border-b">
                      All
                    </SelectItem>
                  </div>
                  <div className="p-0">
                    {visibleMatters.map((matter) => (
                      <SelectItem
                        key={matter.matter_id}
                        value={matter.matter_id}
                        className="text-xs rounded-none border-b last:border-b-0"
                        title={matter.name}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate inline-block max-w-[150px]">{matter.name}</span>
                          <span className="ml-1 text-xs text-gray-500 whitespace-nowrap">[{matter.case_number}]</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>

                        {/* Pagination */}
                        {matters.length > mattersPerPage && (
                          <div className="flex items-center justify-between py-2 px-2 border-t mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={goToPrevPage}
                              disabled={currentPage === 1}
                              className="h-8 px-2"
                            >
                              <ChevronLeftIcon className="h-4 w-4 mr-1" />
                              Prev
                            </Button>
                            <span className="text-xs text-gray-500">
                              {currentPage}/{totalPages}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={goToNextPage}
                              disabled={currentPage === totalPages}
                              className="h-8 px-2"
                            >
                              Next
                              <ChevronRightIcon className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        )}
                      </SelectContent>
                  </Select>
                </div>
              </div>
            )}
      </div>
    </div>
  )
}

