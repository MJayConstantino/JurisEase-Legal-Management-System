import { BillingInterface } from "@/components/billings/billingsPage";
import type { Metadata } from "next";
import { handleFetchBills } from "@/action-handlers/billings";

export const metadata: Metadata = {
  title: "Billings | Dianson Law Office",
  description: "View and manage your bills",
};

export default async function BillingsPage() {
  const { bills = [], allMatters = [] } = await handleFetchBills()

  return (
    <div className="flex flex-col gap-6 h-full">
      <BillingInterface bills={bills} allMatters={allMatters} />
    </div>
  )
}
