import { Skeleton } from '@/components/ui/skeleton'

export default function LoginSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-8 text-center">
          <Skeleton className="mx-auto h-10 w-3/4 rounded-lg" />
          <Skeleton className="mx-auto mt-2 h-8 w-1/2 rounded-lg" />
          <Skeleton className="mx-auto mt-3 h-4 w-5/6 rounded-lg" />
        </div>

        <div className="rounded-lg bg-[#e1e5f2] p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-16 rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </div>

            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-4 text-center">
          <Skeleton className="mx-auto h-4 w-48 rounded" />
        </div>
      </div>
    </div>
  )
}
