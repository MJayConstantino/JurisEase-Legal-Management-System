import { Skeleton } from "@/components/ui/skeleton";

export default function MattersLoading() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow mx-auto">
        {/* MattersHeader skeleton */}
        <div className="p-4 border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-t-lg">
          {/* Mobile View */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <Skeleton className="h-9 w-28" /> {/* Add Matter button */}
            <Skeleton className="h-9 w-9 rounded-md" /> {/* Hamburger menu */}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Skeleton className="h-9 w-32" /> {/* Add Matter button */}
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-700 rounded-md p-1">
              <Skeleton className="h-9 w-40 md:w-72" />
            </div>
          </div>
        </div>

        {/* MattersTable skeleton */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table header */}
            <div className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 py-5 px-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3 sm:col-span-1">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-5 w-16" /> {/* Case # */}
                    <Skeleton className="h-4 w-4 rounded-full" />{" "}
                    {/* Sort icon */}
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-5 w-24" /> {/* Matter Name */}
                    <Skeleton className="h-4 w-4 rounded-full" />{" "}
                    {/* Sort icon */}
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-2">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-5 w-16" /> {/* Client */}
                    <Skeleton className="h-4 w-4 rounded-full" />{" "}
                    {/* Sort icon */}
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-2">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-5 w-32" /> {/* Attorney */}
                    <Skeleton className="h-4 w-4 rounded-full" />{" "}
                    {/* Sort icon */}
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-2">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-5 w-24" /> {/* Staff */}
                    <Skeleton className="h-4 w-4 rounded-full" />{" "}
                    {/* Sort icon */}
                  </div>
                </div>
                <div className="hidden sm:block sm:col-span-1">
                  <Skeleton className="h-5 w-16" /> {/* Status */}
                </div>
                <div className="hidden sm:block sm:col-span-1">
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-5 w-24" /> {/* Date */}
                    <Skeleton className="h-4 w-4 rounded-full" />{" "}
                    {/* Sort icon */}
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-1 flex justify-end">
                  <Skeleton className="h-5 w-16" /> {/* Actions */}
                </div>
              </div>
            </div>

            {/* Table rows */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border-b p-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 sm:col-span-1">
                    <Skeleton className="h-5 w-full" /> {/* Case # */}
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <Skeleton className="h-5 w-full" /> {/* Matter Name */}
                  </div>
                  <div className="hidden sm:block sm:col-span-2">
                    <Skeleton className="h-5 w-full" /> {/* Client */}
                  </div>
                  <div className="hidden sm:block sm:col-span-2">
                    <Skeleton className="h-5 w-full" /> {/* Attorney */}
                  </div>
                  <div className="hidden sm:block sm:col-span-2">
                    <Skeleton className="h-5 w-full" /> {/* Staff */}
                  </div>
                  <div className="hidden sm:block sm:col-span-1">
                    <Skeleton className="h-5 w-full" /> {/* Status */}
                  </div>
                  <div className="hidden sm:block sm:col-span-1">
                    <Skeleton className="h-5 w-full" /> {/* Date */}
                  </div>
                  <div className="col-span-3 sm:col-span-1 flex justify-end">
                    <Skeleton className="h-5 w-8" /> {/* Actions */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
