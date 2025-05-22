"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Matter, SortField, SortDirection } from "@/types/matter.type";
import { useState, useEffect } from "react";
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
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const renderSortableHeader = (field: SortField, label: string) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 font-semibold hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer w-full"
    >
      <span>{label}</span>
      <span className="inline-flex items-center">{getSortIcon(field)}</span>
    </button>
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        {/* Table header */}
        <div className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 sm:col-span-1">
              {renderSortableHeader("case_number", "Case #")}
            </div>
            <div className="col-span-6 sm:col-span-2">
              {renderSortableHeader("name", "Matter Name")}
            </div>
            <div className="hidden sm:block sm:col-span-2">
              {renderSortableHeader("client", "Client")}
            </div>
            <div className="hidden sm:block sm:col-span-2">
              {renderSortableHeader("assigned_attorney", "Assigned Attorney")}
            </div>
            <div className="hidden sm:block sm:col-span-2">
              {renderSortableHeader("assigned_staff", "Assigned Staff")}
            </div>
            <div className="hidden sm:block sm:col-span-1 font-semibold">
              Status
            </div>
            <div className="hidden sm:block sm:col-span-1">
              {renderSortableHeader("date_opened", "Date Opened")}
            </div>
            <div className="col-span-3 sm:col-span-1 text-right font-semibold">
              Actions
            </div>
          </div>
        </div>

        {/* Table body */}
        {matters.length === 0 ? (
          <div className="p-4 text-center py-10">
            No matters found. Create your first matter to get started.
          </div>
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
      </div>
    </div>
  );
}
