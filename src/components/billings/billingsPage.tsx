"use client"

import { useEffect, useMemo } from "react"
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"
import { useCallback } from 'react';
import { BillingsRevenueHeader } from "@/components/billings/billingsRevenueHeader"
import { BillingsList } from "@/components/billings/billingsList"
import { BillingsAddDialog } from "@/components/billings/billingsAddDialog"
import { BillingsListHeader } from "@/components/billings/billingsListHeader"
import type { Bill, SortDirection, SortField, StatusFilter } from "@/types/billing.type"
import { BillingStates } from "./billingsStates"
import { getMatters } from "@/actions/matters"
import { getBills, createBill as addBillToDb, updateBill as updateBillInDb, deleteBill as deleteBillFromDb } from "@/actions/billing"


export function BillingInterface() {
  const {
    bills, setBills, filteredBills, setFilteredBills, currentDateTime, setCurrentDateTime, isNewBillDialogOpen, 
    setIsNewBillDialogOpen, isLoading, setIsLoading, timeFilter, setTimeFilter, sortField, setSortField, sortDirection, setSortDirection,
    statusFilter, setStatusFilter, matters, setMatters, selectedMatterId, setSelectedMatterId
  } = BillingStates()

  useEffect(() => {
    async function loadData() {
        setIsLoading(true)
        try {
          const [billsData, mattersData] = await Promise.all([
            getBills(),
            getMatters()
          ])
          setBills(billsData)
          setMatters(mattersData)
        } catch (error) {
          console.error('Failed to load data:', error)
        } finally {
          setIsLoading(false)
        }
      }
    loadData()

  }, [setBills, setIsLoading, setMatters])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [setCurrentDateTime])

const sortBills = useCallback((billsToSort: Bill[], field: SortField, direction: SortDirection) => {
  return [...billsToSort].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case "matterName":
        const matterA = matters.find((m) => m.matter_id === a.matter_id)?.name || "";
        const matterB = matters.find((m) => m.matter_id === b.matter_id)?.name || "";
        comparison = matterA.localeCompare(matterB);
        break;
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "amount":
        comparison = a.amount - b.amount;
        break;
      case "created_at":
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "remarks":
        comparison = (a.remarks || "").localeCompare(b.remarks || "");
        break;
    }

    return direction === "asc" ? comparison : -comparison;
  });
}, [matters]);


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
          return isWithinInterval(billDate, { start: monthStart, end: monthEnd })
        })
      }
    }

    if (statusFilter !== "all") {
      const statusMap: Record<StatusFilter, string> = {
        all: "",
        active: "Active",
        paid: "Paid",
        pending: "Pending",
        overdue: "Overdue",
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
  }, [bills, timeFilter, statusFilter, sortField, sortDirection, selectedMatterId,
    setFilteredBills, sortBills])


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
    return filteredBills.reduce((sum, bill) => sum +  Number(bill.amount), 0)
  }, [filteredBills])


  const todayRevenue = useMemo(() => {
    const today = new Date()
    return bills
      .filter((bill) => {
        const billDate = new Date(bill.created_at)
        return format(billDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      })
      .reduce((sum, bill) => sum +  Number(bill.amount), 0)
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
      .reduce((sum, bill) => sum +  Number(bill.amount), 0)
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
      .reduce((sum, bill) => sum +  Number(bill.amount), 0)
  }, [bills])


  const addBill = async (bill: Omit<Bill, "bill_id">) => {
    setIsLoading(true)
    try {
      const newBill = await addBillToDb(bill)
      if (newBill) {
        setBills(prev => [...prev, newBill])
      }
    } catch (error) {
      console.error('Failed to add bill:', error)
    } finally {
      setIsLoading(false)
    }

  }

  const updateBill = async (updatedBill: Bill) => {
    setIsLoading(true)
    try {
      const result = await updateBillInDb(updatedBill)
      if (result) {
        setBills(prev => prev.map(bill => bill.bill_id === updatedBill.bill_id ? updatedBill : bill))
      }
    } catch (error) {
      console.error('Failed to update bill:', error)
    } finally {
      setIsLoading(false)
    }

  }

  const deleteBill = async (id: string) => {
    setIsLoading(true)
    try {
      const success = await deleteBillFromDb(id)
      if (success) {
        setBills(prev => prev.filter(bill => bill.bill_id !== id))
      }
    } catch (error) {
      console.error('Failed to delete bill:', error)
    } finally {
      setIsLoading(false)
    }
    
  }
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
        />

  
        <div className="border dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mt-4">
  
          <BillingsListHeader
            onNewBill={() => setIsNewBillDialogOpen(true)}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            matters={matters}
            selectedMatterId={selectedMatterId || "all"}
            onMatterFilterChange={handleMatterFilterChange}
          />

          <div className="max-h-[600px] overflow-y-auto">
            <BillingsList
              bills={filteredBills}
              matters={matters}
              onUpdate={updateBill}
              onDelete={deleteBill}
              isLoading={isLoading}
              sortField={sortField}
              onSortChange={handleSortChange}          
            />
          </div>
        </div>

        <BillingsAddDialog
          open={isNewBillDialogOpen}
          onOpenChange={setIsNewBillDialogOpen}
          onSave={addBill}
          matters={matters} 
          matterBillingMatterId={""}        />
      </div>
    </div>
  )
};