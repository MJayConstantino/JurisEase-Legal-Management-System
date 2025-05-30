'use client'

export function NotFoundSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg bg-card p-4 sm:p-6 shadow-sm">
        {/* Not Found Section Skeleton */}
        <div className="rounded-lg bg-card p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            {/* 404 Code Skeleton */}
            <div className="h-8 w-16 animate-pulse rounded-md bg-muted" />

            {/* Icon Circle Skeleton */}
            <div className="h-12 w-12 sm:h-18 sm:w-18 animate-pulse rounded-full bg-muted" />

            {/* Title Skeleton */}
            <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

            {/* Message Skeleton */}
            <div className="flex flex-col space-y-2 w-full items-center">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
            </div>

            {/* Button Skeleton */}
            <div className="flex flex-col space-y-3 pt-4 max-w-sm w-full">
              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
