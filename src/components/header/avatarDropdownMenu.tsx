"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Signout } from "./signout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserInfoAction } from "@/actions/users";
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from "@/utils/supabase/client";

interface AvatarDropdownMenuProps {
  isLoading?: boolean;
  defaultOpen?: boolean;
  userId: string;
}

interface UserData {
  full_name: string;
  avatar_url: string;
}

function AvatarDropdownMenu({
  isLoading: propIsLoading = false,
  defaultOpen = false,
}: AvatarDropdownMenuProps){
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }
    };

    getUser();
  }, [supabase]);

  useEffect(() => {
    async function fetchUser() {
      try {
        // Call the server action directly to get the user data.
        const data: UserData = await fetchUserInfoAction();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleProfileClick = () => {
    if (!userId) {
      console.warn('User ID not available');
      return;
    }

    router.push(`/user/${userId}`);
  };

  // Combine any external loading state with our internal state.
  const isLoading = propIsLoading || loading;
  const fallbackLetter = userData?.full_name
    ? userData.full_name.charAt(0).toUpperCase()
    : "U";

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-full p-0"
          aria-label="Avatar"
        >
          {isLoading ? (
            <Skeleton className="h-10 w-10 dark:bg-gray-700 rounded-full animate-pulse" />
          ) : (
            <Avatar>
              <AvatarImage
                src={
                  userData?.avatar_url || "/placeholder.svg?height=40&width=40"
                }
                alt={userData?.full_name || "User"}
              />
              <AvatarFallback className="text-black dark:text-white">
                {fallbackLetter}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md"
      >
        <DropdownMenuLabel className="px-3 py-2 text-sm text-black dark:text-white">
          {isLoading ? <Skeleton className="w-24 h-4" /> : userData?.full_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-gray-200 dark:border-gray-600" />
        <DropdownMenuItem onClick={handleProfileClick} className="px-3 py-2 text-black dark:text-white">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-2 text-black dark:text-white">
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="md:hidden px-3 py-2 text-black dark:text-white">
          <Plus className="mr-2 h-4 w-4" />
          <span>Create New</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-2 text-black dark:text-white">
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdownMenu;
