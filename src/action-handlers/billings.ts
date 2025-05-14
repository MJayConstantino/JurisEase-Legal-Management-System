import {
  createBill as addBillToDb,
  updateBill as updateBillInDb,
  deleteBill as deleteBillFromDb,
  getBills,
  getBillsByMatterId,
} from "@/actions/billing"
import type { Bill } from "@/types/billing.type"
import { toast } from "sonner"
import { BillingStates } from "@/components/billings/billingsStates"
import { Matter } from "@/types/matter.type"
import { getMatters } from "@/actions/matters"

export function BillingsActionHandlers() {
  const { setBills, setIsLoading } = BillingStates()

  const addBill = async (bill: Omit<Bill, "bill_id">) => {
    setIsLoading(true)
    try {
      const newBill = await addBillToDb(bill)
      if (newBill) {
        setBills((prev) => [...prev, newBill])
      }
    } catch (error) {
      console.error("Failed to add bill:", error)
      toast.error("Failed to add bill. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const updateBill = async (updatedBill: Bill) => {
    setIsLoading(true)
    try {
      const result = await updateBillInDb(updatedBill)
      if (result) {
        setBills((prev) => prev.map((bill) => (bill.bill_id === updatedBill.bill_id ? updatedBill : bill)))
      }
    } catch (error) {
      console.error("Failed to update bill:", error)
      toast.error("Failed to update bill. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBill = async (id: string) => {
    setIsLoading(true)
    try {
      const success = await deleteBillFromDb(id)
      if (success) {
        setBills((prev) => prev.filter((bill) => bill.bill_id !== id))
      }
      toast.success("Bill deleted successfully!")
    } catch (error) {
      console.error("Failed to delete bill:", error)
      toast.error("Failed to delete bill. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return { addBill, updateBill, deleteBill }
}

export const handleFetchBills = async (): Promise<{
  bills: Bill[]
  allMatters: Matter[]
  error: string | null
}> => {
  try {
    const [bills, allMatters] = await Promise.all([getBills(), getMatters()])
    return { bills, allMatters, error: null }
  } catch (error: any) {
    toast.error("Failed to fetch data. Please try again.")
    return { bills: [], allMatters: [], error: "Failed to fetch data." }
  }
}

export const handleFetchBillsByMatterId = async (
  matterId: string
): Promise<{ bills: Bill[]; error: string | null }> => {
  try {
    const bills = await getBillsByMatterId(matterId);

    if (!bills) throw new Error("Failed to fetch bills for the matter");

    return { bills, error: null };
  } catch (error: any) {
    return { bills: [], error: "Failed to fetch bills for the matter." };
  }
};
