import { Skeleton } from "@/components/ui/skeleton";

export function MatterNotFoundSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg bg-card p-4 sm:p-6 shadow-sm">
        {/* Header Skeleton */}
        <div className="space-y-2 mb-6">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        {/* Content Skeleton */}
        <div className="rounded-lg bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-12 w-12 sm:h-18 sm:w-18 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />

            <div className="flex flex-col space-y-3 pt-4 w-full max-w-sm">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
