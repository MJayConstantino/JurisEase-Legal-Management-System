import { Bill, BillStatus } from "@/types/billing.type"
import type { Matter } from "@/types/matter.type"

export const mockMatters: Matter[] = [
  {
      matter_id: "1",
      name: "Mock Matter no.1",
      case_number: "CV-0001",
      client: "Mock Client no.1",
      status: "pending",
      created_at: new Date(),
      description: "Info here"
  },
  {
      matter_id: "2",
      name: "Mock Matter no.2",
      case_number: "CV-0002",
      client: "Mock Client no.2",
      status: "closed",
      created_at: new Date(),
      description: "Info here"
  },
  {
      matter_id: "3",
      name: "Mock Matter no.3",
      case_number: "CV-0003",
      client: "Mock Client no.3",
      status: "open",
      created_at: new Date(),
      description: "Info here"
  }
]

export const mockBills: Bill[] = [
    {
        bill_id: "1",
        matter_id: "1",
        name: "Active Bill",
        amount: 1230,
        created_at: "2025-08-15",
        status: BillStatus.active,
        remarks: "This bill has remarks"
    },
    {
        bill_id: "2",
        matter_id: "2",
        name: "Pending Bill",
        amount: 5090,
        created_at: "2025-06-01",
        status: BillStatus.pending,
        remarks: "This bill has remarks"
    },
    {
        bill_id: "3",
        matter_id: "3",
        name: "Paid Bill",
        amount: 9203,
        created_at: "2025-09-13",
        status: BillStatus.paid,
        remarks: "-"
    },
    {
        bill_id: "4",
        matter_id: "2",
        name: "Overdue Bill",
        amount: 2931,
        created_at: "2025-03-22",
        status: BillStatus.overdue,
        remarks: "something something"
    },
    {
        bill_id: "5",
        matter_id: "1",
        name: "Default Bill",
        amount: 76,
        created_at: "2025-01-01",
        status: BillStatus.pending,
        remarks: "This is a default bill"
    }
]
