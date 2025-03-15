"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/utils/supabase/client";

export default function UserInfo() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createSupabaseClient();

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email || "User");
      setIsLoading(false);
    };

    getUserInfo(); 
  }, [supabase.auth]);

  if (isLoading) {
    return <p>Loading user information...</p>;
  }

  return (
    <h2 className="text-xl font-semibold mb-4 text-[#1B1E4B]">
      Welcome, {userEmail}
    </h2>
  );
}