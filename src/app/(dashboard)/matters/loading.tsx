import { Skeleton } from "@/components/ui/skeleton";

export default function MattersLoading() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
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
              <Skeleton className="h-9 w-40 md:w-64" />
            </div>
          </div>
        </div>

        {/* MattersTable skeleton */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Table header */}
            <div className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
              <div className="grid grid-cols-12 gap-4">
                <Skeleton className="h-5 col-span-3 sm:col-span-1" />{" "}
                {/* Case # */}
                <Skeleton className="h-5 col-span-6 sm:col-span-2" />{" "}
                {/* Matter Name */}
                <Skeleton className="h-5 hidden sm:block sm:col-span-2" />{" "}
                {/* Client */}
                <Skeleton className="h-5 hidden sm:block sm:col-span-2" />{" "}
                {/* Attorney */}
                <Skeleton className="h-5 hidden sm:block sm:col-span-2" />{" "}
                {/* Staff */}
                <Skeleton className="h-5 hidden sm:block sm:col-span-1" />{" "}
                {/* Status */}
                <Skeleton className="h-5 hidden sm:block sm:col-span-1" />{" "}
                {/* Date */}
                <Skeleton className="h-5 col-span-3 sm:col-span-1 text-right" />{" "}
                {/* Actions */}
              </div>
            </div>

            {/* Table rows */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="border-b p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="grid grid-cols-12 gap-4">
                  <Skeleton className="h-5 col-span-3 sm:col-span-1" />{" "}
                  {/* Case # */}
                  <Skeleton className="h-5 col-span-6 sm:col-span-2" />{" "}
                  {/* Matter Name */}
                  <Skeleton className="h-5 hidden sm:block sm:col-span-2" />{" "}
                  {/* Client */}
                  <Skeleton className="h-5 hidden sm:block sm:col-span-2" />{" "}
                  {/* Attorney */}
                  <Skeleton className="h-5 hidden sm:block sm:col-span-2" />{" "}
                  {/* Staff */}
                  <Skeleton className="h-5 hidden sm:block sm:col-span-1" />{" "}
                  {/* Status */}
                  <Skeleton className="h-5 hidden sm:block sm:col-span-1" />{" "}
                  {/* Date */}
                  <div className="col-span-3 sm:col-span-1 flex justify-end">
                    <Skeleton className="h-5 w-20" /> {/* Actions */}
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
