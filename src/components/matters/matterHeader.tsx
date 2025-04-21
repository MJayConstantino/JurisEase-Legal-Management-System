"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Matter } from "@/types/matter.type";
import { getStatusColor } from "@/utils/getStatusColor";
import { MatterConfirmDeletionDialog } from "./matterConfirmDeletionDialog";

interface MatterHeaderProps {
  matter: Matter;
}

export function MatterHeader({ matter }: MatterHeaderProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Link href="/matters">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to matters</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete Matter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Matter title and badge */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h1 className="text-xl sm:text-2xl font-bold mr-2">{matter.name}</h1>
          <Badge className={getStatusColor(matter.status)} variant="outline">
            {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
          </Badge>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="font-medium">ID:</span>
            <span className="truncate">{matter.matter_id.substring(0, 8)}</span>
          </div>

          <span className="hidden sm:inline">•</span>

          <div className="flex items-center gap-1">
            <span className="font-medium">Case:</span>
            <span className="truncate">{matter.case_number}</span>
          </div>

          <span className="hidden sm:inline">•</span>

          <div className="flex items-center gap-1">
            <span className="font-medium">Client:</span>
            <span className="truncate">{matter.client}</span>
          </div>
        </div>
      </div>

      <MatterConfirmDeletionDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        matter={matter}
        redirectToList={true}
      />
    </>
  );
}
