import { BillingInterface } from "@/components/billings/billingsPage";
import type { Metadata } from "next";
import { handleFetchBills } from "@/action-handlers/billings";
import { BillingsSkeleton } from "@/components/billings/billingsSkeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Billings | Dianson Law Office",
  description: "View and manage your bills",
};

export default async function BillingsPage() {
  const { bills = [], allMatters = [] } = await handleFetchBills()

  return (
    <div className="flex flex-col gap-6 h-full">
      <Suspense fallback={<BillingsSkeleton/>}>
        <BillingInterface bills={bills} allMatters={allMatters} />
      </Suspense>
    </div>
  )
}
