import { Skeleton } from "@/components/ui/skeleton";

export default function MattersLoading() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Filter bar skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow p-4">
        <div className="flex items-center justify-between">
          {/* Mobile: Hamburger menu, Desktop: Filter buttons */}
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Skeleton className="h-9 w-9 rounded-md" />{" "}
              {/* Hamburger menu skeleton */}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Skeleton className="h-9 w-24" /> {/* "Add Matter" button */}
            </div>
          </div>

          {/* Search input */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-40 md:w-64" /> {/* Search input */}
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50">
          <Skeleton className="h-5 col-span-4 md:col-span-2" />{" "}
          {/* Case Number */}
          <Skeleton className="h-5 col-span-8 md:col-span-3" />{" "}
          {/* Matter Name */}
          <Skeleton className="h-5 hidden md:block md:col-span-2" />{" "}
          {/* Client - Hidden on mobile */}
          <Skeleton className="h-5 hidden md:block md:col-span-1" />{" "}
          {/* Status - Hidden on mobile */}
          <Skeleton className="h-5 hidden md:block md:col-span-2" />{" "}
          {/* Date - Hidden on mobile */}
          <Skeleton className="h-5 hidden md:block md:col-span-1" />{" "}
          {/* Actions - Hidden on mobile */}
        </div>

        {/* Table rows */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Skeleton className="h-5 col-span-4 md:col-span-2" />{" "}
            {/* Case Number */}
            <Skeleton className="h-5 col-span-7 md:col-span-3" />{" "}
            {/* Matter Name */}
            <Skeleton className="h-5 col-span-1 md:hidden" />{" "}
            {/* Mobile action button */}
            <Skeleton className="h-5 hidden md:block md:col-span-2" />{" "}
            {/* Client - Hidden on mobile */}
            <Skeleton className="h-5 hidden md:block md:col-span-1" />{" "}
            {/* Status - Hidden on mobile */}
            <Skeleton className="h-5 hidden md:block md:col-span-2" />{" "}
            {/* Date - Hidden on mobile */}
            <Skeleton className="h-5 hidden md:block md:col-span-1 justify-self-end" />{" "}
            {/* Actions - Hidden on mobile */}
          </div>
        ))}
      </div>
    </div>
  );
}
