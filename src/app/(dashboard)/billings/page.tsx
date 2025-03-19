import { BillingInterface } from "@/components/features/billingspage/billings-page-interface";


export default function BillingsPage() {
    return (
      <div className="flex flex-col gap-6 w-full h-full">
        <h1 className="text-3xl text-black dark:text-white font-bold">
          Billings Page
        </h1>
        <BillingInterface/>
      </div>
    );
  }
  