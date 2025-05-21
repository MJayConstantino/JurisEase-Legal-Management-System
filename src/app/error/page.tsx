'use client'

import ErrorPage from '@/components/auth/ErrorPage'
import { ErrorPageSkeleton } from '@/components/auth/ErrorPageSkeleton'
import { Suspense } from 'react'

export default function Error() {
  return (
    <>
      <Suspense fallback={<ErrorPageSkeleton />}>
        <ErrorPage />
      </Suspense>
    </>
  )
}
