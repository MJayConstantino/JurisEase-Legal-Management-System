//This Header shows the revenue for Current/Today, Weekly and Monthly 

"use client"

import { format, startOfWeek, endOfWeek } from "date-fns"
import type { TimeFilter } from "@/types/billing.type"

interface TimeFilterHeaderProps {
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number
  activeFilter: TimeFilter
  onFilterChange: (filter: TimeFilter) => void
}

export function TimeFilterHeader({
  todayRevenue,
  weekRevenue,
  monthRevenue,
  activeFilter,
  onFilterChange,
}: TimeFilterHeaderProps) {
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
    <div className="flex flex-col md:flex-row justify-between w-full mt-3 mb-4 gap-2">
      <div
        className={`bg-indigo-500 text-white p-3 rounded-md flex-1 md:mr-2 cursor-pointer transition-all ${
          activeFilter === "today" ? "ring-2 ring-white" : "hover:bg-indigo-400"
        }`}
        onClick={() => onFilterChange("today")}
      >
        <div className="text-base md:text-lg font-semibold">Today's Revenue</div>
        <div className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{formatAmount(todayRevenue)}</div>
        <div className="text-sm md:text-base text-indigo-100 mt-1 md:mt-2">{format(today, "MMMM d, yyyy")}</div>
      </div>

      <div
        className={`bg-indigo-500 text-white p-3 rounded-md flex-1 md:mx-2 cursor-pointer transition-all ${
          activeFilter === "week" ? "ring-2 ring-white" : "hover:bg-indigo-400"
        }`}
        onClick={() => onFilterChange("week")}
      >
        <div className="text-base md:text-lg font-semibold">This Week's Revenue</div>
        <div className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{formatAmount(weekRevenue)}</div>
        <div className="text-sm md:text-base text-indigo-100 mt-1 md:mt-2">
          {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
        </div>
      </div>

      <div
        className={`bg-indigo-500 text-white p-3 rounded-md flex-1 md:ml-2 cursor-pointer transition-all ${
          activeFilter === "month" ? "ring-2 ring-white" : "hover:bg-indigo-400"
        }`}
        onClick={() => onFilterChange("month")}
      >
        <div className="text-base md:text-lg font-semibold">This Month's Revenue</div>
        <div className="text-xl md:text-3xl font-bold mt-1 md:mt-2">{formatAmount(monthRevenue)}</div>
        <div className="text-sm md:text-base text-indigo-100 mt-1 md:mt-2">{format(today, "MMMM yyyy")}</div>
      </div>
    </div>
  )
}

