import { BillingInterface } from "@/components/billings/billingsPage";

// export default function BillingsPage() {
//   return (
//     <div className="flex flex-col gap-6 w-full h-full">
//       <BillingInterface />
//     </div>
//   );
// }

import type { Metadata } from "next";
import { handleFetchBills } from "@/action-handlers/billings";

export const metadata: Metadata = {
  title: "Billings | Dianson Law Office",
  description: "View and manage your bills",
};

export default async function BillingsPage() {
  const { bills = [] } = await handleFetchBills();

  return (
    <div className="flex flex-col gap-6 h-full">
      <BillingInterface bills={bills} />
    </div>
  );
}

