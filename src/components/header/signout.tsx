'use client'

import { signOutAction } from '@/actions/users'

export function Signout() {
  return (
    <form action={signOutAction}>
      <button type="submit">Sign out</button>
    </form>
  )
}
