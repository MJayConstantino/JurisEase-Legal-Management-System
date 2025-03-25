import { redirect } from 'next/navigation'

export const redirectToHome = () => {
  redirect('/test/userpage')
}
