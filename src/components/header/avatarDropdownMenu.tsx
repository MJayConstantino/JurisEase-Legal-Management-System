"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/utils/supabase/client";
import { fetchUserName } from "@/actions/userProfile";

interface AvatarDropdownMenuProps {
  isLoading?: boolean;
  defaultOpen?: boolean;
}

interface UserData {
  full_name: string;
  avatar_url: string;
}

export default function AvatarDropdownMenu({
  isLoading: propIsLoading = false,
  defaultOpen = false,
}: AvatarDropdownMenuProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createSupabaseClient();

  // fetch user ID and display name
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const name = await fetchUserName(user.id);
        setUserName(name);
      }
    };
    getUser();
  }, [supabase]);

  // fetch avatar + full name
  useEffect(() => {
    async function fetchUser() {
      try {
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
      console.warn("User ID not available");
      return;
    }
    router.push(`/${userId}`);
  };

  const isLoading = propIsLoading || loading;
  const fallbackLetter = userName
    ? userName.charAt(0).toUpperCase()
    : userData?.full_name
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
        className="
          bg-white dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-md shadow-md
          min-w-[12rem] max-w-[12rem]
        "
      >
        <DropdownMenuLabel
          title={userData?.full_name}
          className="px-3 py-2 text-sm text-black dark:text-white"
        >
          {isLoading ? (
            <Skeleton className="w-24 h-4" />
          ) : (
            <span className="block w-full truncate">
              {userName || userData?.full_name}
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="border-gray-200 dark:border-gray-600" />

        <DropdownMenuItem
          onClick={handleProfileClick}
          className="px-3 py-2 text-black dark:text-white"
        >
          <User className="mr-2" /> Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="px-3 py-2 text-black dark:text-white">
          <LogOut className="mr-2" />
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
