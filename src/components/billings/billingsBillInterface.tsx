export type BillStatus = "Paid" | "Active"

export type PaymentFrequency =
  | { type: "Monthly" }
  | { type: "Annually" }
  | { type: "Semi-Annually" }
  | { type: "Quarterly" }
  | { type: "Other"; custom: string }

export interface Bill {
  id: string
  name: string
  amount: number
  dateBilled: string
  status: BillStatus
  frequency: PaymentFrequency
}