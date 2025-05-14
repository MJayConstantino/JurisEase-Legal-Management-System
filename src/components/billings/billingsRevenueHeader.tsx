"use client"

import { useState } from "react"
import { format, startOfWeek, endOfWeek } from "date-fns"
import type { TimeFilter } from "@/types/billing.type"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CombinedRevenueHeaderProps {
  totalRevenue: number
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number
  currentDateTime: Date
  activeFilter: TimeFilter
  onFilterChange: (filter: TimeFilter) => void
  activeMatterFilter: string
  matterFilteredRevenues: {
    total: number
    today: number
    week: number
    month: number
  }
}

export function BillingsRevenueHeader({
  totalRevenue,
  todayRevenue,
  weekRevenue,
  monthRevenue,
  currentDateTime,
  activeFilter,
  onFilterChange,
  activeMatterFilter,
  matterFilteredRevenues,
}: CombinedRevenueHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(true)

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mt-4">
      <div
        className="bg-[#1B1E4B] text-white p-4 md:p-6 rounded-t-md cursor-pointer transition-all hover:bg-[#1B1E4B] dark:bg-[var(--totalrev)] dark:hover:bg-[var(--totalrev-hover)]"
        onClick={toggleExpand}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-lg md:text-xl font-bold mb-1">
              Total Revenue{activeMatterFilter ? ` (${activeMatterFilter})` : ""}
            </div>
            <div className="text-base md:text-lg text-indigo-200 dark:text-indigo-100 mt-2 md:mt-3">
              As of {format(currentDateTime, "MMMM d, yyyy")} at {format(currentDateTime, "h:mm a")}
            </div>
            <div
              className="overflow-hidden text-2xl md:text-4xl font-bold"
              title={formatAmount(activeMatterFilter ? matterFilteredRevenues.total : totalRevenue)}
            >
              ${formatAmount(activeMatterFilter ? matterFilteredRevenues.total : totalRevenue)}
            </div>
          </div>
          <div className="flex items-center justify-center">
            {isExpanded ? <ChevronUp className="h-6 w-6 text-white" /> : <ChevronDown className="h-6 w-6 text-white" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-x border-b rounded-b-md overflow-hidden">
          <div
            className={`border-r dark:border-gray-700 text-gray-800 dark:text-gray-100 p-4 cursor-pointer transition-all ${
              activeFilter === "today"
                 ? "bg-indigo-100 dark:bg-[var(--selectrev)] text-indigo-900 dark:text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange("today")}
          >
            <div className="text-base md:text-lg font-semibold">Today's Revenue</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{format(today, "MMMM d, yyyy")}</div>
            <div
              className="overflow-hidden text-xl md:text-3xl font-bold mt-1 md:mt-2 text-[#2D336B] dark:text-indigo-300"
              title={formatAmount(activeMatterFilter ? matterFilteredRevenues.today : todayRevenue)}
            >
              ${formatAmount(activeMatterFilter ? matterFilteredRevenues.today : todayRevenue)}
            </div>
          </div>

          <div
            className={`border-r dark:border-gray-700 text-gray-800 dark:text-gray-100 p-4 cursor-pointer transition-all ${
              activeFilter === "week"
                ? "bg-indigo-100 dark:bg-[var(--selectrev)] text-indigo-900 dark:text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange("week")}
          >
            <div className="text-base md:text-lg font-semibold">Weekly Revenue</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
            </div>
            <div
              className="overflow-hidden text-xl md:text-3xl font-bold mt-1 md:mt-2 text-[#2D336B] dark:text-indigo-300"
              title={formatAmount(activeMatterFilter ? matterFilteredRevenues.week : weekRevenue)}
            >
              ${formatAmount(activeMatterFilter ? matterFilteredRevenues.week : weekRevenue)}
            </div>
          </div>

          <div
            className={`text-gray-800 dark:text-gray-100 p-4 cursor-pointer transition-all ${
              activeFilter === "month"
                ? "bg-indigo-100 dark:bg-[var(--selectrev)] text-indigo-900 dark:text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange("month")}
          >
            <div className="text-base md:text-lg font-semibold">Monthly Revenue</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{format(today, "MMMM yyyy")}</div>
            <div
              className="overflow-hidden text-xl md:text-3xl font-bold mt-1 md:mt-2 text-[#2D336B] dark:text-indigo-300"
              title={formatAmount(activeMatterFilter ? matterFilteredRevenues.month : monthRevenue)}
            >
              ${formatAmount(activeMatterFilter ? matterFilteredRevenues.month : monthRevenue)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
