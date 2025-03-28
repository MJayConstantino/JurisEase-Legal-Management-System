"use client"

import { Search, Plus } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BillingsHeaderProps {
  onNewBill: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  activeTab: string
  onTabChange: (tab: string) => void
  totalRevenue: number
  currentDateTime: Date
}

export function BillingsHeader({
  onNewBill,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  totalRevenue,
  currentDateTime,
}: BillingsHeaderProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="p-4 border-b bg-white">
      <div className="flex flex-col gap-4">
        {/* Mobile layout - stacked */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex items-center gap-2">
            <Button onClick={onNewBill} className="bg-indigo-900 hover:bg-indigo-800 text-white">
              <Plus className="h-4 w-4" />
              <span className="sr-only md:not-sr-only md:ml-1">New Bill</span>
            </Button>

            <Tabs value={activeTab} className="flex-1" onValueChange={onTabChange}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All Bills
                </TabsTrigger>
                <TabsTrigger value="paid" className="flex-1">
                  Paid
                </TabsTrigger>
                <TabsTrigger value="active" className="flex-1">
                  Active
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bills..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="bg-indigo-900 text-white rounded-md w-full min-w-[250px] max-w-[350px] pl-1.5">
            <div className="p-3">
              <div className="font-medium">Total Revenue: {formatAmount(totalRevenue)}</div>
              <div className="text-sm text-indigo-200 mt-1">
                As of {format(currentDateTime, "MMM d, yyyy")} at {format(currentDateTime, "h:mm a")}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout - horizontal */}
        <div className="hidden md:flex md:flex-row md:justify-between md:items-start w-full">
          <Button onClick={onNewBill} className="bg-indigo-900 hover:bg-indigo-800 text-white">
            <Plus className="h-4 w-4" />
            <span className="ml-1">New Bill</span>
          </Button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Tabs value={activeTab} onValueChange={onTabChange}>
              <TabsList>
                <TabsTrigger value="all">All Bills</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bills..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-md min-w-[250px] w-auto flex-grow max-w-[400px] pl-1.5">
            <div className="p-3">
              <div className="font-medium">Total Revenue: {formatAmount(totalRevenue)}</div>
              <div className="text-sm text-indigo-200 mt-1">
                As of {format(currentDateTime, "MMM d, yyyy")} at {format(currentDateTime, "h:mm a")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}