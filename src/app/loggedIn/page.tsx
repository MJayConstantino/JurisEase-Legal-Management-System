import UserLoggedIn from "@/components/loggedIn/userLoggedIn";
import { protectRoute } from "@/utils/supabase/server";

export default async function LoggedInPage() {
  await protectRoute();
  return <UserLoggedIn />;
}
