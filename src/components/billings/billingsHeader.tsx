"use client"

import { format } from "date-fns"

interface BillingsHeaderProps {
  totalRevenue: number
  currentDateTime: Date
  onFilterChange: () => void
}

export function BillingsHeader({ totalRevenue, currentDateTime, onFilterChange }: BillingsHeaderProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div
      className="bg-indigo-900 text-white p-4 md:p-6 w-full mt-4 rounded-md cursor-pointer transition-all hover:bg-indigo-800"
      onClick={onFilterChange}
    >
      <div className="flex flex-col">
        <div className="text-lg md:text-xl font-bold mb-1">Total Revenue:</div>
        <div className="text-2xl md:text-4xl font-bold">{formatAmount(totalRevenue)}</div>
        <div className="text-base md:text-lg text-indigo-200 mt-2 md:mt-3">
          As of {format(currentDateTime, "MMMM d, yyyy")} at {format(currentDateTime, "h:mm a")}
        </div>
      </div>
    </div>
  )
}

