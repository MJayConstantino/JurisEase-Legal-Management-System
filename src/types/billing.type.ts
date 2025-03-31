export type BillStatus = "Active" | "Paid" | "Pending" | "Overdue"

export type PaymentFrequency =
  | { type: "Monthly" }
  | { type: "Annually" }
  | { type: "Semi-Annually" }
  | { type: "Quarterly" }
  | { type: "Other"; custom: string }

export interface Client {
  id: string
  name: string
}

export interface Bill {
  id: string
  clientId: string
  name: string
  amount: number
  dateBilled: string
  status: BillStatus
  frequency: PaymentFrequency
}

// Sorting
export type SortDirection = "asc" | "desc"

export type SortField = "clientName" | "name" | "amount" | "dateBilled" | "status" | "frequency"

export type TimeFilter = "all" | "today" | "week" | "month"

export type StatusFilter = "all" | "active" | "paid" | "pending" | "overdue"

export const frequencyRank = {
  Monthly: 1,
  Quarterly: 2,
  "Semi-Annually": 3,
  Annually: 4,
  Other: 5,
}

