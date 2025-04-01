"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Header from "@/components/homepage/header";
import { Card, CardContent } from "@/components/ui/card";
<<<<<<< HEAD
import { CalendarDays, LogOut, User, Loader2 } from "lucide-react";
import UserInfo from "./user-info";
import { useState } from "react";
=======
import { CalendarDays, LogOut, User } from "lucide-react";
import UserInfo from "./user-info";
>>>>>>> main

export default function UserLoggedIn() {
  const supabase = createSupabaseClient();
  const router = useRouter();
<<<<<<< HEAD
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(false);
=======
>>>>>>> main

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
  ];

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
<<<<<<< HEAD
    e.preventDefault();
    setSignOutLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
=======
    e.preventDefault(); // Prevent form submission

    try {
      const { error } = await supabase.auth.signOut(); // Wait for sign-out to complete
>>>>>>> main

      if (error) {
        console.error("Error signing out:", error.message);
        router.push("/documents?message=Failed to sign out");
        return;
      }

<<<<<<< HEAD
=======
      // Only redirect after successful sign-out
>>>>>>> main
      router.push("/login");
    } catch (error) {
      console.error("Exception during sign out:", error);
      router.push("/documents?message=Failed to sign out");
<<<<<<< HEAD
    } finally {
      setSignOutLoading(false);
=======
>>>>>>> main
    }
  };

  const handleMatters = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
<<<<<<< HEAD
    setDashboardLoading(true);

    try {
      router.push("/calendar");
    } finally {
      setDashboardLoading(false);
    }
  };

  // Either button is loading
  const isLoading = signOutLoading || dashboardLoading;
=======
    router.push("/matters");
  };
>>>>>>> main

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header logoText="JurisEase" navItems={navItems} />

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-[#2D336B] mb-2">
                Welcome to{" "}
                <span className="text-[#1B1E4B] font-black">JurisEase</span>
              </h1>
              <div className="h-1 w-24 bg-[#2D336B] mx-auto my-4 rounded-full"></div>
              <p className="text-gray-600 max-w-sm mx-auto">
                Your comprehensive legal management platform designed for modern
                law practices.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[#2D336B]/10 flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-[#2D336B]" />
              </div>
              <p className="text-gray-500 mb-2">
                We&apos;re glad to see you again
              </p>
              <div className="text-xl font-bold text-[#2D336B]">
                <UserInfo />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Button
                type="button"
                className="bg-[#2a3563] hover:cursor-pointer hover:bg-[#1e2547] text-white py-6 rounded-lg flex items-center justify-center gap-2 transition-all"
                onClick={handleMatters}
                disabled={isLoading}
              >
                {dashboardLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading Dashboard</span>
                  </>
                ) : (
                  <>
                    <CalendarDays className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-[#2a3563] hover:cursor-pointer text-[#2a3563] hover:bg-[#2a3563]/10 py-6 rounded-lg flex items-center justify-center gap-2 transition-all"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                {signOutLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing Out</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Dianson Law Office. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
