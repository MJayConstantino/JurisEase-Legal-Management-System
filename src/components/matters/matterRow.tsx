"use client";

import type React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Eye } from "lucide-react";
import type { Matter } from "@/types/matter.type";
import { getUserDisplayName } from "@/utils/getUserDisplayName";
import { getStatusColor } from "@/utils/getStatusColor";
import { formatDateForDisplay } from "@/utils/formatDateForDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/types/user.type";
import { MatterConfirmDeletionDialog } from "./matterConfirmDeletionDialog";

interface MatterRowProps {
  matter: Matter;
  users: User[];
  isLoading: boolean;
  deletingId: string | null;
  onRowClick: (matterId: string) => void;
  onDelete: (matterId: string, e: React.MouseEvent) => void;
}

export function MatterRow({
  matter,
  users,
  isLoading,
  deletingId,
  onRowClick,
}: MatterRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div
        key={matter.matter_id}
        className="border-b p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
        onClick={() => onRowClick(matter.matter_id)}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 sm:col-span-1">
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <div title={`Case # ${matter.case_number}`} className="truncate">
                {matter.case_number}
              </div>
            )}
          </div>

          <div className="col-span-6 sm:col-span-2">
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <div title={`Matter Name: ${matter.name}`} className="truncate">
                {matter.name}
              </div>
            )}
          </div>

          <div className="hidden sm:block sm:col-span-2">
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <div title={`Client: ${matter.client}`} className="truncate">
                {matter.client}
              </div>
            )}
          </div>

          <div className="hidden sm:block sm:col-span-2">
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <div
                title={`Assigned Attorney: ${getUserDisplayName(
                  matter.assigned_attorney!,
                  users
                )}`}
                className="truncate"
              >
                {getUserDisplayName(matter.assigned_attorney!, users)}
              </div>
            )}
          </div>

          <div className="hidden sm:block sm:col-span-2">
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <div
                title={`Assigned Staff: ${getUserDisplayName(
                  matter.assigned_staff!,
                  users
                )}`}
                className="truncate"
              >
                {getUserDisplayName(matter.assigned_staff!, users)}
              </div>
            )}
          </div>

          <div className="hidden sm:block sm:col-span-1">
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <Badge
                title={`Status: ${matter.status}`}
                className={getStatusColor(matter.status)}
                variant="outline"
              >
                {matter.status}
              </Badge>
            )}
          </div>

          <div className="hidden sm:block sm:col-span-1">
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              formatDateForDisplay(matter.date_opened)
            )}
          </div>

          <div className="col-span-3 sm:col-span-1 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(matter.matter_id);
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  disabled={deletingId === matter.matter_id}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Matter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <MatterConfirmDeletionDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        matter={matter}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </>
  );
}
