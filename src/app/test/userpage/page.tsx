"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import UserInfo from "./user-info";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Header from "@/components/homepage/header";
export default function UserLoggedIn() {
  const supabase = createSupabaseClient();
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
  ];

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission

    try {
      const { error } = await supabase.auth.signOut(); // Wait for sign-out to complete [^1][^3]

      if (error) {
        console.error("Error signing out:", error.message);
        router.push("/documents?message=Failed to sign out");
        return;
      }

      // Only redirect after successful sign-out
      router.push("/login");
    } catch (error) {
      console.error("Exception during sign out:", error);
      router.push("/documents?message=Failed to sign out");
    }
  };

  const handleMatters = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/calendar");
  };

  return (
    <>
      <Header logoText="Dianson Law Office" navItems={navItems} />
      <div className="container mx-auto flex items-center justify-center flex-col mt-40">
        <div className="flex items-center justify-center mb-8 flex-col text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#2D336B]">
        Good to see you again at
          </h1>
          <h1 className="text-4xl font-black tracking-tight text-[#1B1E4B]">
        Dianson Law Office
          </h1>
        </div>

        <div className="flex items-center justify-center flex-col p-6 text-center">
          <div className="font-black text-2xl font-aileron items-center flex justify-center flex-col text-[#2D336B]">
        Welcome, <UserInfo />
          </div>
          <div className="flex flex-row space-x-4 mt-4">
        <Button
          type="button"
          variant="outline"
          className="bg-[#2a3563] hover:bg-[#1e2547] text-white hover:text-white text-lg"
          onClick={handleMatters}
        >
          Go to Dashboard
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bg-[#2a3563] hover:bg-[#1e2547] text-white hover:text-white text-lg"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
          </div>
        </div>
      </div>
    </>
  );
}
