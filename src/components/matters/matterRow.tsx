"use client";

import type React from "react";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <TableRow
        key={matter.matter_id}
        className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => onRowClick(matter.matter_id)}
      >
        <TableCell className="font-medium w-[10%]">
          {isLoading ? (
            <div className="pl-6">
              <Skeleton className="w-24 h-4" />
            </div>
          ) : (
            <div
              title={`Case # ${matter.case_number}`}
              className="truncate max-w-[120px] pl-6"
            >
              {matter.case_number}
            </div>
          )}
        </TableCell>
        <TableCell className="w-[18%]">
          {isLoading ? (
            <div className="pl-12">
              <Skeleton className="w-32 h-4" />
            </div>
          ) : (
            <div
              title={`Matter Name: ${matter.name}`}
              className="truncate max-w-[220px] pl-12"
            >
              {matter.name}
            </div>
          )}
        </TableCell>
        <TableCell className="w-[18%]">
          {isLoading ? (
            <div className="pl-12">
              <Skeleton className="w-32 h-4" />
            </div>
          ) : (
            <div
              title={`Client: ${matter.client}`}
              className="truncate max-w-[220px] pl-12"
            >
              {matter.client}
            </div>
          )}
        </TableCell>
        <TableCell className="w-[18%]">
          {isLoading ? (
            <div className="pl-9">
              <Skeleton className="w-24 h-4" />
            </div>
          ) : (
            <div
              title={`Assigned Attorney: ${getUserDisplayName(
                matter.assigned_attorney!,
                users
              )}`}
              className="truncate max-w-[220px] pl-9"
            >
              {getUserDisplayName(matter.assigned_attorney!, users)}
            </div>
          )}
        </TableCell>
        <TableCell className="w-[18%]">
          {isLoading ? (
            <div className="pl-7">
              <Skeleton className="w-24 h-4" />
            </div>
          ) : (
            <div
              title={`Assigned Staff: ${getUserDisplayName(
                matter.assigned_staff!,
                users
              )}`}
              className="truncate max-w-[220px] pl-7"
            >
              {getUserDisplayName(matter.assigned_staff!, users)}
            </div>
          )}
        </TableCell>
        <TableCell className="w-[8%]">
          {isLoading ? (
            <div className="pl-8">
              <Skeleton className="w-12 h-4" />
            </div>
          ) : (
            <div className="pl-8">
              <Badge
                title={`Status: ${matter.status}`}
                className={getStatusColor(matter.status)}
                variant="outline"
              >
                {matter.status}
              </Badge>
            </div>
          )}
        </TableCell>
        <TableCell className="w-[10%]">
          {isLoading ? (
            <div className="pl-8">
              <Skeleton className="w-20 h-4" />
            </div>
          ) : (
            <div className="pl-8">
              {formatDateForDisplay(matter.date_opened)}
            </div>
          )}
        </TableCell>
        <TableCell className="text-center w-[8%]">
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
        </TableCell>
      </TableRow>

      <MatterConfirmDeletionDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        matter={matter}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </>
  );
}
