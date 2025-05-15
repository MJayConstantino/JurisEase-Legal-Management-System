"use client"

import { useEffect, useMemo } from "react"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"
import { useCallback } from "react"
import { BillingsRevenueHeader } from "@/components/billings/billingsRevenueHeader"
import { BillingsList } from "@/components/billings/billingsList"
import { BillingsAddDialog } from "@/components/billings/billingsAddDialog"
import { BillingsListHeader } from "@/components/billings/billingsListHeader"
import type { Bill, SortDirection, SortField, StatusFilter } from "@/types/billing.type"
import { BillingStates } from "./billingsStates"
import { BillingsActionHandlers } from "@/action-handlers/billings"
import type { Matter } from "@/types/matter.type"

interface BillWithMatter extends Bill {
  matter?: Matter
}

interface BillingsPageProps {
  bills: BillWithMatter[]
  allMatters?: Matter[]
}

export function BillingInterface({ bills, allMatters }: BillingsPageProps) {
  const {
    filteredBills,
    setFilteredBills,
    currentDateTime,
    setCurrentDateTime,
    isNewBillDialogOpen,
    setIsNewBillDialogOpen,
    isLoading,
    timeFilter,
    setTimeFilter,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    statusFilter,
    setStatusFilter,
    setBills,
    selectedMatterId,
    setSelectedMatterId,
    setMatters,
  } = BillingStates()

  const { addBill, updateBill, deleteBill } = BillingsActionHandlers()

  const mattersList = useMemo(() => {
    const mattersMap = new Map<string, Matter>()

    if (allMatters && allMatters.length > 0) {
      allMatters.forEach((matter) => {
        if (!mattersMap.has(matter.matter_id)) {
          mattersMap.set(matter.matter_id, matter)
        }
      })
    }

    bills.forEach((bill) => {
      if (bill.matter && bill.matter.matter_id && !mattersMap.has(bill.matter.matter_id)) {
        mattersMap.set(bill.matter.matter_id, bill.matter)
      }
    })

    return Array.from(mattersMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [bills, allMatters])

  useEffect(() => {
    if (bills && bills.length > 0) {
      setBills(bills)
    }

    if (mattersList.length > 0) {
      setMatters(mattersList)
    }
  }, [bills, mattersList, setBills, setMatters])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [setCurrentDateTime])

  const sortBills = useCallback((billsToSort: BillWithMatter[], field: SortField, direction: SortDirection) => {
    return [...billsToSort].sort((a, b) => {
      let comparison = 0

      switch (field) {
        case "matterName":
          const matterA = a.matter?.name || ""
          const matterB = b.matter?.name || ""
          comparison = matterA.localeCompare(matterB)
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "amount":
          comparison = a.amount - b.amount
          break
        case "created_at":
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "remarks":
          comparison = (a.remarks || "").localeCompare(b.remarks || "")
          break
      }

      return direction === "asc" ? comparison : -comparison
    })
  }, [])

  useEffect(() => {
    let result = [...bills]

    if (timeFilter !== "all") {
      const today = new Date()

      if (timeFilter === "today") {
        result = result.filter((bill) => {
          const billDate = new Date(bill.created_at)
          return format(billDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
        })
      } else if (timeFilter === "week") {
        const weekStart = startOfWeek(today)
        const weekEnd = endOfWeek(today)

        result = result.filter((bill) => {
          const billDate = new Date(bill.created_at)
          return isWithinInterval(billDate, { start: weekStart, end: weekEnd })
        })
      } else if (timeFilter === "month") {
        const monthStart = startOfMonth(today)
        const monthEnd = endOfMonth(today)

        result = result.filter((bill) => {
          const billDate = new Date(bill.created_at)
          return isWithinInterval(billDate, {
            start: monthStart,
            end: monthEnd,
          })
        })
      }
    }

    if (statusFilter !== "all") {
      const statusMap: Record<StatusFilter, string> = {
        all: "",
        active: "active",
        paid: "paid",
        pending: "pending",
        overdue: "overdue",
      }

      const filterStatus = statusMap[statusFilter]
      if (filterStatus) {
        result = result.filter((bill) => bill.status === filterStatus)
      }
    }

    if (selectedMatterId) {
      result = result.filter((bill) => bill.matter_id === selectedMatterId)
    }

    if (sortField) {
      result = sortBills(result, sortField, sortDirection)
    }

    setFilteredBills(result)
  }, [bills, timeFilter, statusFilter, sortField, sortDirection, selectedMatterId, setFilteredBills, sortBills])

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleMatterFilterChange = (matterId: string) => {
    setSelectedMatterId(matterId === "all" ? null : matterId)
  }

  const totalRevenue = useMemo(() => {
    return filteredBills.reduce((sum, bill) => sum + Number(bill.amount), 0)
  }, [filteredBills])

  const todayRevenue = useMemo(() => {
    const today = new Date()
    return bills
      .filter((bill) => {
        const billDate = new Date(bill.created_at)
        return format(billDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      })
      .reduce((sum, bill) => sum + Number(bill.amount), 0)
  }, [bills])

  const weekRevenue = useMemo(() => {
    const today = new Date()
    const weekStart = startOfWeek(today)
    const weekEnd = endOfWeek(today)

    return bills
      .filter((bill) => {
        const billDate = new Date(bill.created_at)
        return isWithinInterval(billDate, { start: weekStart, end: weekEnd })
      })
      .reduce((sum, bill) => sum + Number(bill.amount), 0)
  }, [bills])

  const monthRevenue = useMemo(() => {
    const today = new Date()
    const monthStart = startOfMonth(today)
    const monthEnd = endOfMonth(today)

    return bills
      .filter((bill) => {
        const billDate = new Date(bill.created_at)
        return isWithinInterval(billDate, { start: monthStart, end: monthEnd })
      })
      .reduce((sum, bill) => sum + Number(bill.amount), 0)
  }, [bills])

  return (
    <div className="py-0 px-0">
      <div className="max-w-auto mx-auto">
        <BillingsRevenueHeader
          totalRevenue={totalRevenue}
          todayRevenue={todayRevenue}
          weekRevenue={weekRevenue}
          monthRevenue={monthRevenue}
          currentDateTime={currentDateTime}
          activeFilter={timeFilter}
          onFilterChange={setTimeFilter}
          activeMatterFilter={
            selectedMatterId ? mattersList.find((m) => m.matter_id === selectedMatterId)?.name || selectedMatterId : ""
          }
          matterFilteredRevenues={{
            total: totalRevenue,
            today: selectedMatterId
              ? bills
                  .filter(
                    (bill) =>
                      bill.matter_id === selectedMatterId &&
                      format(new Date(bill.created_at), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
                  )
                  .reduce((sum, bill) => sum + Number(bill.amount), 0)
              : todayRevenue,
            week: selectedMatterId
              ? bills
                  .filter((bill) => {
                    const billDate = new Date(bill.created_at)
                    const today = new Date()
                    const weekStart = startOfWeek(today)
                    const weekEnd = endOfWeek(today)
                    return (
                      bill.matter_id === selectedMatterId &&
                      isWithinInterval(billDate, { start: weekStart, end: weekEnd })
                    )
                  })
                  .reduce((sum, bill) => sum + Number(bill.amount), 0)
              : weekRevenue,
            month: selectedMatterId
              ? bills
                  .filter((bill) => {
                    const billDate = new Date(bill.created_at)
                    const today = new Date()
                    const monthStart = startOfMonth(today)
                    const monthEnd = endOfMonth(today)
                    return (
                      bill.matter_id === selectedMatterId &&
                      isWithinInterval(billDate, { start: monthStart, end: monthEnd })
                    )
                  })
                  .reduce((sum, bill) => sum + Number(bill.amount), 0)
              : monthRevenue,
          }}
        />

        <div className="border dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mt-4">
          <BillingsListHeader
            onNewBill={() => setIsNewBillDialogOpen(true)}
            statusFilter={statusFilter}
            onStatusFilterChange={(filter) => setStatusFilter(filter as StatusFilter)}
            matters={mattersList}
            selectedMatterId={selectedMatterId || "all"}
            onMatterFilterChange={handleMatterFilterChange}
          />

          <div className="max-h-[600px] overflow-y-auto">
            <BillingsList
              bills={filteredBills}
              matters={mattersList}
              onUpdate={updateBill}
              onDelete={deleteBill}
              isLoading={isLoading}
              sortField={sortField}
              onSortChange={handleSortChange} 
              sortDirection={sortDirection}            
            />
          </div>
        </div>

        <BillingsAddDialog
          open={isNewBillDialogOpen}
          onOpenChange={setIsNewBillDialogOpen}
          onSave={addBill}
          matters={mattersList}
          matterBillingMatterId={selectedMatterId || ""}
        />
      </div>
    </div>
  )
}