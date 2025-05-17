import { Skeleton } from "@/components/ui/skeleton";

export default function MatterDetailLoading() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Matter header skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="hidden sm:block h-4 w-4 rounded-full" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="hidden sm:block h-4 w-4 rounded-full" />
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
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case details card skeleton */}
            <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>

            {/* Opposing council card skeleton */}
            <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-4">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            </div>

            {/* Court details card skeleton */}
            <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-sm p-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
