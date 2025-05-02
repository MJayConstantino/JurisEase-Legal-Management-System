import UserLoggedIn from '@/components/homepage/loggedIn/userLoggedIn'
import { protectRoute } from '@/utils/supabase/server'

export default async function LoggedInPage() {
  await protectRoute()
  return <UserLoggedIn />
}
