import React from "react";
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

interface AvatarDropdownMenuProps {
  isLoading?: boolean;
  defaultOpen?: boolean;
}

function AvatarDropdownMenu({
  isLoading = false,
  defaultOpen = false,
}: AvatarDropdownMenuProps) {
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
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback className="text-black dark:text-white">
                U
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
          {isLoading ? <Skeleton className="w-24 h-4" /> : "User Email"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-gray-200 dark:border-gray-600" />
        <DropdownMenuItem className="px-3 py-2 text-black dark:text-white">
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
