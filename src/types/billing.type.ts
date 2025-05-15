
export enum BillStatus {
  unpaid = "unpaid",
  paid = "paid",
}

export interface Bill {
  bill_id: string
  matter_id: string
  name: string
  amount: number
  created_at: Date | string
  status: BillStatus
  remarks: string
}

export type SortDirection = "asc" | "desc"

export type SortField = "matterName" | "name" | "amount" | "created_at" | "status" | "remarks"

export type TimeFilter = "all" | "today" | "week" | "month"

export type StatusFilter = "all" | "paid" | "unpaid"
