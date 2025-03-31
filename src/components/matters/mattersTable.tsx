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
import { deleteMatter } from "@/actions/matters";
import { Matter } from "@/types/matter.type";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fetchUsersAction } from "@/actions/users";
import { MatterRow } from "./matterRow";
import { User } from "@/types/user.type";

interface MattersTableProps {
  matters: Matter[];
}

export function MattersTable({ matters }: MattersTableProps) {
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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Case Number</TableHead>
            <TableHead className="font-semibold">Matter Name</TableHead>
            <TableHead className="font-semibold">Client</TableHead>
            <TableHead className="font-semibold">Assigned Attorney</TableHead>
            <TableHead className="font-semibold">Assigned Staff</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Date Opened</TableHead>
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
