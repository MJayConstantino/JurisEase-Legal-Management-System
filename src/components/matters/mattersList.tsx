"use client";

import { useState, useEffect } from "react";
import { MattersHeader } from "./mattersHeader";
import { MattersTable } from "./mattersTable";
import type { Matter, SortField, SortDirection } from "@/types/matter.type";
import { Loader2 } from "lucide-react";
import { handleFetchMatters } from "@/action-handlers/matters";

export function MattersList() {
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("date_opened");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { matters: fetchedMatters, error } = await handleFetchMatters();
      if (!error) {
        setMatters(fetchedMatters);
      } else {
        setMatters([]);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [statusFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredMatters = matters.filter((matter) => {
    return statusFilter === "all" || matter.status === statusFilter;
  });

  const sortedMatters = [...filteredMatters].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    switch (sortField) {
      case "date_opened":
        return (
          multiplier *
          (new Date(a.date_opened || a.created_at).getTime() -
            new Date(b.date_opened || b.created_at).getTime())
        );
      case "name":
        return multiplier * a.name.localeCompare(b.name);
      case "client":
        return multiplier * a.client.localeCompare(b.client);
      case "case_number":
        return (
          multiplier * (a.case_number || "").localeCompare(b.case_number || "")
        );
      case "assigned_attorney":
        return (
          multiplier *
          (a.assigned_attorney || "").localeCompare(b.assigned_attorney || "")
        );
      case "assigned_staff":
        return (
          multiplier *
          (a.assigned_staff || "").localeCompare(b.assigned_staff || "")
        );
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
      <MattersHeader onStatusChange={setStatusFilter} />
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <MattersTable
          matters={sortedMatters}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      )}
    </div>
  );
}
