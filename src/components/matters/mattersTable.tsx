"use client";

import type React from "react";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { MoreHorizontal, FileEdit, Trash2, Eye } from "lucide-react";
import { deleteMatter } from "@/actions/matters";
import { Matter } from "@/types/matter.type";
import { useState } from "react";
import { toast } from "sonner";

interface MattersTableProps {
  matters: Matter[];
}

export function MattersTable({ matters }: MattersTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };

  const handleRowClick = (matterId: string) => {
    router.push(`/matters/${matterId}`);
  };

  const handleDelete = async (matterId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(matterId);

    try {
      await deleteMatter(matterId);
      toast.success("The matter has been deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete matter. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Matter ID</TableHead>
            <TableHead>Matter Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matters.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                No matters found. Create your first matter to get started.
              </TableCell>
            </TableRow>
          ) : (
            matters.map((matter) => (
              <TableRow
                key={matter.id}
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleRowClick(matter.id)}
              >
                <TableCell className="font-medium">{matter.id}</TableCell>
                <TableCell>{matter.name}</TableCell>
                <TableCell>{matter.client}</TableCell>
                <TableCell>
                  <Badge
                    className={getStatusColor(matter.status)}
                    variant="outline"
                  >
                    {matter.status.charAt(0).toUpperCase() +
                      matter.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(matter.dateOpened).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" className="h-8 w-8 p-0">
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
                          router.push(`/matters/${matter.id}`);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit Matter
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => handleDelete(matter.id, e)}
                        disabled={deletingId === matter.id}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === matter.id
                          ? "Deleting..."
                          : "Delete Matter"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
