
import {
    createBill as addBillToDb,
    updateBill as updateBillInDb,
    deleteBill as deleteBillFromDb,
  } from "@/actions/billing";
import { Bill } from "@/types/billing.type";
import { toast } from "sonner";
import { BillingStates } from "@/components/billings/billingsStates";


export function BillingsActionHandlers(){
     const {setBills, setIsLoading,} = BillingStates();


      const addBill = async (bill: Omit<Bill, "bill_id">) => {
        setIsLoading(true);
        try {
          const newBill = await addBillToDb(bill);
          if (newBill) {
            setBills((prev) => [...prev, newBill]);
          }
          toast.success("Bill added successfully!");
        } catch (error) {
          console.error("Failed to add bill:", error);
          toast.error("Failed to add bill. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
    
      const updateBill = async (updatedBill: Bill) => {
        setIsLoading(true);
        try {
          const result = await updateBillInDb(updatedBill);
          if (result) {
            setBills((prev) =>
              prev.map((bill) =>
                bill.bill_id === updatedBill.bill_id ? updatedBill : bill
              )
            );
          }
          toast.success("Bill updated successfully!");
        } catch (error) {
          console.error("Failed to update bill:", error);
          toast.error("Failed to update bill. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
    
      const deleteBill = async (id: string) => {
        setIsLoading(true);
        try {
          const success = await deleteBillFromDb(id);
          if (success) {
            setBills((prev) => prev.filter((bill) => bill.bill_id !== id));
          }
          toast.success("Bill deleted successfully!");
        } catch (error) {
          console.error("Failed to delete bill:", error);
          toast.error("Failed to delete bill. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      

      return{addBill, updateBill, deleteBill}
}








