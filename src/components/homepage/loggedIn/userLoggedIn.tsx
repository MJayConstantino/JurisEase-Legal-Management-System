"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Header from "@/components/homepage/header";
import { Card, CardContent } from "@/components/ui/card";
import { fetchUserInfoAction } from "@/actions/users";
import WelcomeHeader from "@/components/homepage/loggedIn/welcomeHeader";
import UserProfile from "@/components/homepage/loggedIn/userProfile";
import ActionButtons from "@/components/homepage/loggedIn/actionButtons";

interface UserData {
  full_name: string;
  avatar_url: string;
}

export default function UserLoggedIn() {
  const supabase = createSupabaseClient();
  const router = useRouter();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
  ];

  useEffect(() => {
    async function fetchUser() {
      try {
        const data: UserData = await fetchUserInfoAction();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    setSignOutLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error signing out:", error.message);
        router.push("/documents?message=Failed to sign out");
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Exception during sign out:", error);
      router.push("/documents?message=Failed to sign out");
    } finally {
      setSignOutLoading(false);
    }
  };

  const handleMatters = async () => {
    setDashboardLoading(true);
    router.push("/matters");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Header logoText="JurisEase" navItems={navItems} />

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-200">
          <CardContent className="p-6 sm:p-8">
            <WelcomeHeader />

            <UserProfile userData={userData} loadingUser={loadingUser} />

            <ActionButtons
              handleMatters={handleMatters}
              handleSignOut={handleSignOut}
              dashboardLoading={dashboardLoading}
              signOutLoading={signOutLoading}
              isLoading={signOutLoading || dashboardLoading}
            />
          </CardContent>
        </Card>
      </main>

      <footer className="py-4 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
        <p>
          © {new Date().getFullYear()} Dianson Law Office. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
