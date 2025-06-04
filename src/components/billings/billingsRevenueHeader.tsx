"use client";

import { useState } from "react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import type { TimeFilter } from "@/types/billing.type";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { PhilippinePeso } from "lucide-react";

interface CombinedRevenueHeaderProps {
  totalRevenue: number;
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  currentDateTime: Date;
  activeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
  activeMatterFilter: string;
  matterFilteredRevenues: {
    total: number;
    today: number;
    week: number;
    month: number;
  };
  defaultExpandedState?: boolean;
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
  defaultExpandedState = false,
}: CombinedRevenueHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpandedState);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-0">
      <div
        className={`bg-[#1B1E4B] text-white p-2 md:p-4 rounded-none md:rounded-t-md overflow-hidden cursor-pointer transition-all hover:bg-[#25305B] dark:bg-[var(--totalrev)] dark:hover:bg-[var(--totalrev-hover)] ${
          activeFilter === "all"
            ? "bg-[#1B1E4B] dark:bg-[var(--selectrev)] text-indigo-900 dark:text-white"
            : ""
        }`}
        onClick={() => {
          toggleExpand();
          onFilterChange("all");
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div>
              <div className="text-lg md:text-xl font-semibold mb-1">
                Total Revenue
              </div>
              <div className="truncate w-64" title={activeMatterFilter}>
                {activeMatterFilter ? `for: "${activeMatterFilter}"` : ""}
              </div>
              <div className="text-base md:text-lg text-indigo-200 dark:text-indigo-100 mt-0">
                As of {format(currentDateTime, "MMMM d, yyyy")} at{" "}
                {format(currentDateTime, "h:mm a")}
              </div>
            </div>

            <div className="flex items-baseline overflow-hidden text-xl md:text-2xl font-semibold mt-0.5 md:mt-1">
              <PhilippinePeso className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5] mr-1" />
              <span
                title={formatAmount(
                  activeMatterFilter
                    ? matterFilteredRevenues.total
                    : totalRevenue
                )}
              >
                {formatAmount(
                  activeMatterFilter
                    ? matterFilteredRevenues.total
                    : totalRevenue
                )}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
            className="text-white bg-none hover:bg-[#25305B] cursor-pointer"
            aria-label="Toggle details"
          >
            {isExpanded ? (
              <ChevronUp className="h-6 w-6 text-white" />
            ) : (
              <ChevronDown className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-x border-b rounded-b-md overflow-hidden">
          <div
            className={`border-r dark:border-gray-700 text-gray-800 dark:text-gray-100 p-2.5 md:p-3 cursor-pointer transition-all ${
              activeFilter === "today"
                ? "bg-indigo-100 dark:bg-[var(--selectrev)] text-indigo-900 dark:text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange("today")}
          >
            <div className="text-base md:text-lg font-semibold">
              Today&apos;s Revenue
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {format(today, "MMMM d, yyyy")}
            </div>
            <div
              className="inline-flex items-center overflow-hidden text-xl md:text-2xl font-semibold mt-0.5 md:mt-1 text-[#2D336B] dark:text-indigo-300 whitespace-nowrap"
              title={formatAmount(
                activeMatterFilter ? matterFilteredRevenues.today : todayRevenue
              )}
            >
              <PhilippinePeso className="w-6 h-6 font-semibold stroke-[2.5]" />
              {formatAmount(
                activeMatterFilter ? matterFilteredRevenues.today : todayRevenue
              )}
            </div>
          </div>

          <div
            className={`border-r dark:border-gray-700 text-gray-800 dark:text-gray-100 p-2.5 md:p-3 cursor-pointer transition-all ${
              activeFilter === "week"
                ? "bg-indigo-100 dark:bg-[var(--selectrev)] text-indigo-900 dark:text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange("week")}
          >
            <div className="text-base md:text-lg font-semibold">
              Weekly Revenue
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
            </div>
            <div
              className="inline-flex items-center overflow-hidden text-xl md:text-2xl font-semibold mt-0.5 md:mt-1 text-[#2D336B] dark:text-indigo-300 whitespace-nowrap"
              title={formatAmount(
                activeMatterFilter ? matterFilteredRevenues.week : weekRevenue
              )}
            >
              <PhilippinePeso className="w-6 h-6 font-semibold stroke-[2.5]" />
              {formatAmount(
                activeMatterFilter ? matterFilteredRevenues.week : weekRevenue
              )}
            </div>
          </div>

          <div
            className={`border-r dark:border-gray-700 text-gray-800 dark:text-gray-100 p-2.5 md:p-3 cursor-pointer transition-all ${
              activeFilter === "month"
                ? "bg-indigo-100 dark:bg-[var(--selectrev)] text-indigo-900 dark:text-white"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => onFilterChange("month")}
          >
            <div className="text-base md:text-lg font-semibold">
              Monthly Revenue
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {format(today, "MMMM yyyy")}
            </div>
            <div
              className="inline-flex items-center overflow-hidden text-xl md:text-2xl font-semibold mt-0.5 md:mt-1 text-[#2D336B] dark:text-indigo-300 whitespace-nowrap"
              title={formatAmount(
                activeMatterFilter ? matterFilteredRevenues.month : monthRevenue
              )}
            >
              <PhilippinePeso className="w-6 h-6 stroke-[2.5] mr-1" />
              {formatAmount(
                activeMatterFilter ? matterFilteredRevenues.month : monthRevenue
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
