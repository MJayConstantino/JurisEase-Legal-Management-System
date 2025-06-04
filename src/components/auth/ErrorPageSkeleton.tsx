'use client'

export function ErrorPageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 sm:p-6 shadow-sm">
        {/* Error Section Skeleton */}
        <div className="rounded-lg bg-[#ffffff] p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            {/* Error Code Skeleton */}
            <div className="h-8 w-16 animate-pulse rounded-md bg-gray-200" />

            {/* Icon Circle Skeleton */}
            <div className="h-12 w-12 sm:h-18 sm:w-18 animate-pulse rounded-full bg-gray-200" />

            {/* Error Cause Skeleton */}
            <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />

            {/* Error Message Skeleton */}
            <div className="flex flex-col space-y-2 w-full items-center">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-200" />
            </div>

            {/* Button Skeleton */}
            <div className="flex flex-col space-y-3 pt-4 max-w-sm w-full">
              <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
