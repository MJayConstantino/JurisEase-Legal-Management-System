
import { Skeleton } from "@/components/ui/skeleton"

export default function BillingsLoading() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Revenue Header */}
      <Skeleton className="h-32 w-full p-4 border-b rounded-t-lg"/>

      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
        <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">

          {/* Mobile View - Header*/}
          <div className="flex flex-col lg:hidden">
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-9 rounded-md" />
            </div>
            <div className="flex">
                <Skeleton className="h-5 w-32 md:w-64 mr-3" />
                <Skeleton className="h-9 w-full" />
            </div>
          </div>
          
          {/* Desktop View - Header */}
          <div className="hidden lg:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-row gap-4">
                <Skeleton className="h-9 w-32" />
                <div className="flex flex-row w-[300px]">
                    <Skeleton className="h-5 w-24 md:w-32 mr-3" />
                    <Skeleton className="h-9 w-full" />
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2 w-[200px] bg-gray-100 dark:bg-gray-700 rounded-md p-1">
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table Column Header */}
            <div className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
              <div className="grid grid-cols-12 gap-4">
                <Skeleton className="h-5 col-span-6 sm:col-span-2" />
                <Skeleton className="h-5 hidden sm:block sm:col-span-2" />
                <Skeleton className="h-5 col-span-3 sm:col-span-1" />
                <Skeleton className="h-5 hidden sm:block sm:col-span-4" />
                <Skeleton className="h-5 hidden sm:block sm:col-span-1" />
                <Skeleton className="h-5 hidden sm:block sm:col-span-1" />
                <Skeleton className="h-5 col-span-3 sm:col-span-1 text-right" />
              </div>
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="border-b p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="grid grid-cols-12 gap-4">
                  <Skeleton className="h-5 col-span-6 sm:col-span-2" />
                  <Skeleton className="h-5 hidden sm:block sm:col-span-2" />
                  <Skeleton className="h-5 col-span-3 sm:col-span-1" />
                  <Skeleton className="h-5 hidden sm:block sm:col-span-4" />
                  <Skeleton className="h-5 hidden sm:block sm:col-span-1" />
                  <Skeleton className="h-5 hidden sm:block sm:col-span-1" />
                  <div className="col-span-3 sm:col-span-1 flex justify-end">
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}