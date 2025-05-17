import { Skeleton } from "@/components/ui/skeleton";

export default function MatterDetailLoading() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Matter header skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />{" "}
          {/* Back button */}
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-7 sm:h-8 w-40 sm:w-48" />{" "}
            {/* Matter title */}
            <Skeleton className="h-6 w-20" /> {/* Status badge */}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-12" /> {/* Case label */}
            <Skeleton className="h-4 w-24" /> {/* Case number */}
          </div>
          <Skeleton className="hidden sm:block h-4 w-4 rounded-full" />{" "}
          {/* Bullet */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-14" /> {/* Client label */}
            <Skeleton className="h-4 w-32" /> {/* Client name */}
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
        <div className="border-b">
          <div className="flex gap-2 p-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-[390px]" />
            ))}
          </div>
        </div>

        {/* Dashboard content skeleton */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case details card skeleton */}
            <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" /> {/* Card title */}
                <Skeleton className="h-8 w-8 rounded-md" /> {/* Edit button */}
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" /> {/* Field label */}
                  <Skeleton className="h-5 w-full" /> {/* Field value */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" /> {/* Field label */}
                  <Skeleton className="h-20 w-full" /> {/* Field value */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Opposing council card skeleton */}
              <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-40" /> {/* Card title */}
                  <Skeleton className="h-8 w-8 rounded-md" />{" "}
                  {/* Edit button */}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                </div>
              </div>

              {/* Court details card skeleton */}
              <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-6 w-32" /> {/* Card title */}
                  <Skeleton className="h-8 w-8 rounded-md" />{" "}
                  {/* Edit button */}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Field label */}
                    <Skeleton className="h-5 w-full" /> {/* Field value */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
