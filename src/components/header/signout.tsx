'use client'

import { handleSignOut } from '@/action-handlers/users'
import { useTransition } from 'react'
interface SignoutProps {
  signOutfn?: () => Promise<void>
}
export function Signout({ signOutfn = handleSignOut }: SignoutProps) {
  const [isPending, startTransition] = useTransition()
  const onSignOut = async () => {
    startTransition(async () => {
      await signOutfn()
    })
  }
  return (
    <button type="button" onClick={onSignOut} disabled={isPending}>
      Sign out
    </button>
  )
}
