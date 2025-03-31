// Revenue headers

"use client"

import { format, startOfWeek, endOfWeek } from "date-fns"
import type { TimeFilter } from "@/types/billing.type"

interface CombinedRevenueHeaderProps {
  totalRevenue: number
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number
  currentDateTime: Date
  activeFilter: TimeFilter
  onFilterChange: (filter: TimeFilter) => void
}

export function BillingsRevenueHeader({
  totalRevenue,
  todayRevenue,
  weekRevenue,
  monthRevenue,
  currentDateTime,
  activeFilter,
  onFilterChange,
}: CombinedRevenueHeaderProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const today = new Date()
  const weekStart = startOfWeek(today)
  const weekEnd = endOfWeek(today)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
      {/* Total Revenue - Main Header */}
      <div
        className="bg-indigo-900 text-white p-4 md:p-6 rounded-md cursor-pointer transition-all hover:bg-indigo-800 md:col-span-1"
        onClick={() => onFilterChange("all")}
      >
        <div className="flex flex-col">
          <div className="text-lg md:text-xl font-bold mb-1">Total Revenue:</div>
          <div className="text-2xl md:text-4xl font-bold">{formatAmount(totalRevenue)}</div>
          <div className="text-base md:text-lg text-indigo-200 mt-2 md:mt-3">
            As of {format(currentDateTime, "MMMM d, yyyy")} at {format(currentDateTime, "h:mm a")}
          </div>
        </div>
      </div>

      {/* Today's Revenue - Mini Header */}
      <div
        className={`bg-white border text-gray-800 p-4 rounded-md flex-1 cursor-pointer transition-all shadow-sm ${
          activeFilter === "today" ? "ring-2 ring-indigo-500" : "hover:bg-gray-50"
        }`}
        onClick={() => onFilterChange("today")}
      >
        <div className="text-base md:text-lg font-semibold">Today's Revenue</div>
        <div className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{formatAmount(todayRevenue)}</div>
        <div className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">{format(today, "MMMM d, yyyy")}</div>
      </div>

      {/* This Week's Revenue - Mini Header */}
      <div
        className={`bg-white border text-gray-800 p-4 rounded-md flex-1 cursor-pointer transition-all shadow-sm ${
          activeFilter === "week" ? "ring-2 ring-indigo-500" : "hover:bg-gray-50"
        }`}
        onClick={() => onFilterChange("week")}
      >
        <div className="text-base md:text-lg font-semibold">This Week's Revenue</div>
        <div className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{formatAmount(weekRevenue)}</div>
        <div className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
          {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
        </div>
      </div>

      {/* This Month's Revenue - Mini Header */}
      <div
        className={`bg-white border text-gray-800 p-4 rounded-md flex-1 cursor-pointer transition-all shadow-sm ${
          activeFilter === "month" ? "ring-2 ring-indigo-500" : "hover:bg-gray-50"
        }`}
        onClick={() => onFilterChange("month")}
      >
        <div className="text-base md:text-lg font-semibold">This Month's Revenue</div>
        <div className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{formatAmount(monthRevenue)}</div>
        <div className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">{format(today, "MMMM yyyy")}</div>
      </div>
    </div>
  )
}

