'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { BillingsAddDialog } from '@/components/billings/billingsAddDialog'
import { BillingsListHeader } from '@/components/billings/billingsListHeader'
import { BillingsList } from '@/components/billings/billingsList'
import type {
  Bill,
  SortDirection,
  SortField,
  StatusFilter,
} from '@/types/billing.type'
import { deleteBill, getBillsByMatterId } from '@/actions/billing'
import { getMatters } from '@/actions/matters'
import { toast } from 'sonner'
import { BillingStates } from '@/components/billings/billingsStates'
import { supabase } from '@/lib/supabase'

export function MatterBillingPage() {
  const {
    bills,
    setBills,
    filteredBills,
    setFilteredBills,
    matters,
    setMatters,
    setCurrentDateTime,
    isNewBillDialogOpen,
    setIsNewBillDialogOpen,
    setIsLoadingMatters,
    isLoadingBills,
    setIsLoadingBills,
    statusFilter,
    setStatusFilter,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
  } = BillingStates()

  const params = useParams()
  const paramsMatterId = params.matterId as string
  const fetchBills = useCallback(async () => {
    try {
      setIsLoadingBills(true)
      const billsData = await getBillsByMatterId(paramsMatterId)
      setBills(billsData)
    } catch (error) {
      console.error('Error fetching bills:', error)
      toast.error('Failed to load bills')
    } finally {
      setIsLoadingBills(false)
    }
  }, [paramsMatterId, setBills, setIsLoadingBills])

  const fetchMatters = useCallback(async () => {
    try {
      setIsLoadingMatters(true)
      const mattersData = await getMatters()
      setMatters(mattersData)
    } catch (error) {
      console.error('Error fetching matters:', error)
      toast.error('Failed to load matters')
    } finally {
      setIsLoadingMatters(false)
    }
  }, [setIsLoadingMatters, setMatters])

  useEffect(() => {
    fetchBills()
    fetchMatters()
  }, [fetchBills, fetchMatters])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [setCurrentDateTime])

  const sortBills = useCallback(
    (billsToSort: Bill[], field: SortField, direction: SortDirection) => {
      return [...billsToSort].sort((a, b) => {
        let comparison = 0

        switch (field) {
          case 'matterName':
            const matterA =
              matters.find((m) => m.matter_id === a.matter_id)?.name || ''
            const matterB =
              matters.find((m) => m.matter_id === b.matter_id)?.name || ''
            comparison = matterA.localeCompare(matterB)
            break
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          case 'amount':
            comparison = a.amount - b.amount
            break
          case 'created_at':
            comparison =
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            break
          case 'status':
            comparison = a.status.localeCompare(b.status)
            break
          case 'remarks':
            comparison = (a.remarks || '').localeCompare(b.remarks || '')
            break
        }

        return direction === 'asc' ? comparison : -comparison
      })
    },
    [matters]
  )

  const getFilteredBills = useMemo(() => {
    let result = [...bills]

    if (statusFilter !== 'all') {
      const statusMap: Record<StatusFilter, string> = {
        all: '',
        paid: 'paid',
        unpaid: 'unpaid',
      }

      const filterStatus = statusMap[statusFilter]
      if (filterStatus) {
        result = result.filter((bill) => bill.status === filterStatus)
      }
    }

    if (sortField) {
      result = sortBills(result, sortField, sortDirection)
    }

    return result
  }, [bills, statusFilter, sortField, sortDirection, sortBills])

  useEffect(() => {
    setFilteredBills(getFilteredBills)
  }, [getFilteredBills, setFilteredBills])

  const handleBillCreated = useCallback(
    async (newBill: Omit<Bill, 'bill_id'>) => {
      const { data, error } = await supabase
        .from('billings')
        .insert([newBill])
        .select()

      if (error) {
        console.error('Insert failed', error)
        return
      }

      if (data && data[0]) {
        setBills((prev) => [data[0], ...prev])
      }
    },
    [setBills]
  )

  const handleBillUpdated = useCallback(
    (updatedBill: Bill) => {
      setBills((prev) =>
        prev.map((bill) =>
          bill.bill_id === updatedBill.bill_id ? updatedBill : bill
        )
      )
    },
    [setBills]
  )

  const handleBillDeleted = useCallback(
    async (billId: string) => {
      try {
        const success = await deleteBill(billId)
        if (success) {
          setBills((prev) => prev.filter((b) => b.bill_id !== billId))
          toast.success('Bill deleted successfully!')
        } else {
          toast.error('Failed to delete bill.')
        }
      } catch (error) {
        console.error('Delete failed', error)
        toast.error('Failed to delete bill. Please try again.')
      }
    },
    [setBills]
  )

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  return (
    <div className="pt-0 w-full mx-auto overflow-auto">
      <div className="w-full mx-auto">
        <div className="border dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 ">
          <BillingsListHeader
            statusFilter={statusFilter}
            onStatusFilterChange={(filter) =>
              setStatusFilter(filter as StatusFilter)
            }
            onNewBill={() => setIsNewBillDialogOpen(true)}
            matters={matters}
            selectedMatterId={paramsMatterId}
            onMatterFilterChange={() => {}}
            hideMatterFilter={true}
          />

          <div className="overflow-y-auto h-full">
            <BillingsList
              bills={filteredBills}
              matters={matters}
              onUpdate={handleBillUpdated}
              onDelete={handleBillDeleted}
              isLoading={isLoadingBills}
              sortField={sortField}
              onSortChange={handleSortChange}
              hideMatterColumn={true}
              sortDirection={sortDirection}
            />
          </div>
        </div>

        <BillingsAddDialog
          open={isNewBillDialogOpen}
          onOpenChange={setIsNewBillDialogOpen}
          onSave={handleBillCreated}
          matters={matters}
          disableMatterColumn={true}
          matterBillingMatterId={paramsMatterId}
        />
      </div>
    </div>
  )
}
