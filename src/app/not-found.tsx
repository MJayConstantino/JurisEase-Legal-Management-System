import NotFoundPage from '@/components/notFound'
import { Suspense } from 'react'
import { NotFoundSkeleton } from '@/components/notFoundSkeleton'

export default function NotFound() {
  return (
    <Suspense fallback={<NotFoundSkeleton />}>
      <NotFoundPage />
    </Suspense>
  )
}
