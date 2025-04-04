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
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { deleteMatter } from "@/actions/matters";
import type { Matter, SortField, SortDirection } from "@/types/matter.type";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fetchUsersAction } from "@/actions/users";
import { MatterRow } from "./matterRow";
import type { User } from "@/types/user.type";

interface MattersTableProps {
  matters: Matter[];
  onSort: (field: SortField) => void;
  sortField: SortField;
  sortDirection: SortDirection;
}

export function MattersTable({
  matters,
  onSort,
  sortField,
  sortDirection,
}: MattersTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const userData = await fetchUsersAction();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

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
      console.error(error);
      toast.error("Failed to delete matter. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  const renderSortableHeader = (field: SortField, label: string) => (
    <Button
      variant="ghost"
      onClick={() => onSort(field)}
      className="p-0 h-auto font-semibold flex items-center hover:bg-transparent"
    >
      {label} {getSortIcon(field)}
    </Button>
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {renderSortableHeader("case_number", "Case Number")}
            </TableHead>
            <TableHead>{renderSortableHeader("name", "Matter Name")}</TableHead>
            <TableHead>{renderSortableHeader("client", "Client")}</TableHead>
            <TableHead>
              {renderSortableHeader("assigned_attorney", "Assigned Attorney")}
            </TableHead>
            <TableHead>
              {renderSortableHeader("assigned_staff", "Assigned Staff")}
            </TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead>
              {renderSortableHeader("date_opened", "Date Opened")}
            </TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matters.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                No matters found. Create your first matter to get started.
              </TableCell>
            </TableRow>
          ) : (
            matters.map((matter) => (
              <MatterRow
                key={matter.matter_id}
                matter={matter}
                users={users}
                isLoading={isLoading}
                deletingId={deletingId}
                onRowClick={handleRowClick}
                onDelete={handleDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
