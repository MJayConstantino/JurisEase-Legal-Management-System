"use client";

import { useState, useEffect } from "react";
import { MattersHeader } from "./mattersHeader";
import { MattersTable } from "./mattersTable";
import { getMatters } from "@/actions/matters";
import { Matter } from "@/types/matter.type";
import { Loader2 } from "lucide-react";

export function MattersList() {
  const [matters, setMatters] = useState<Matter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchMatters = async () => {
      setIsLoading(true);
      try {
        const data = await getMatters();
        setMatters(data);
      } catch (error) {
        console.error("Error fetching matters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatters();
  }, []);

  // Filter and sort matters based on search, status, and sort order
  const filteredMatters = matters
    .filter((matter) => {
      // Filter by search term
      const matchesSearch =
        searchTerm === "" ||
        matter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matter.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        matter.matter_id.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by status
      const matchesStatus =
        statusFilter === "all" || matter.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date_opened).getTime();
      const dateB = new Date(b.date_opened).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
      <MattersHeader
        onSearch={setSearchTerm}
        onStatusChange={setStatusFilter}
        onSortChange={setSortOrder}
      />
      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <MattersTable matters={filteredMatters} />
      )}
    </div>
  );
}
