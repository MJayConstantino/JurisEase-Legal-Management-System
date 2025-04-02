export type BillStatus = "Active" | "Paid" | "Pending" | "Overdue"

export interface Bill {
  bill_id: string
  name: string
  amount: number
  created_at: string
  status: BillStatus
  remarks: string
}

export type SortDirection = "asc" | "desc"

export type SortField = "name" | "amount" | "created_at" | "status" | "remarks"

export type TimeFilter = "all" | "today" | "week" | "month"

export type StatusFilter = "all" | "active" | "paid" | "pending" | "overdue"